import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { PlaceQueryDto, UpdatePlaceDto } from './place.dto';
import { I18nService } from 'nestjs-i18n';
import { CreatePlaceData } from '@/modules/places/place.types';
import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { LocationService } from '@/modules/locations/location.service';
import { Location } from '@/modules/locations/location.entity';
import { TagService } from '@/modules/tags/tag.service';
import { Tag } from '@/modules/tags/tag.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    private readonly i18n: I18nService,
    private readonly locationService: LocationService,
    private readonly tagService: TagService,
  ) {}

  private filterRelationFields<T extends Place>(place: T): T {
    const filteredPlace = { ...place };

    if (place.user) {
      filteredPlace.user = {
        id: place.user.id,
        fullName: place.user.fullName,
        email: place.user.email,
        image: place.user.image,
      } as User;
    }

    if (place.category) {
      filteredPlace.category = {
        id: place.category.id,
        name: place.category.name,
      } as Category;
    }

    if (place.country) {
      filteredPlace.country = {
        id: place.country.id,
        name: place.country.name,
        type: place.country.type,
      } as Location;
    }

    if (place.state) {
      filteredPlace.state = {
        id: place.state.id,
        name: place.state.name,
        type: place.state.type,
      } as Location;
    }

    if (place.city) {
      filteredPlace.city = {
        id: place.city.id,
        name: place.city.name,
        type: place.city.type,
      } as Location;
    }

    if (place.tags && Array.isArray(place.tags)) {
      filteredPlace.tags = place.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })) as Tag[];
    }

    return filteredPlace;
  }

  private filterPlacesRelations<T extends Place>(places: T[]): T[] {
    return places.map((place) => this.filterRelationFields(place));
  }

  async create(userId: number, data: CreatePlaceData): Promise<Place> {
    await this.locationService.validateLocationHierarchy(
      data.countryId,
      data.stateId,
      data.cityId,
    );

    let slug = data.slug;
    if (!slug && data.name) {
      slug = this.generateSlug(data.name);
    }

    if (slug) {
      const existingPlace = await this.placeRepository.findOne({
        where: { slug },
      });
      if (existingPlace) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    let tags: Tag[] = [];
    const tagIds = data.tagIds;
    if (tagIds && tagIds.length > 0) {
      tags = await Promise.all(
        tagIds.map(async (tagId) => {
          return await this.tagService.findOne(tagId);
        }),
      );
    }

    const { tagIds: _, ...placeData } = data;
    const place = this.placeRepository.create({
      ...placeData,
      userId,
      slug,
      tags,
    });

    const savedPlace = await this.placeRepository.save(place);

    const reloadedPlace = await this.placeRepository.findOne({
      where: { id: savedPlace.id },
      relations: ['category', 'user', 'country', 'state', 'city', 'tags'],
    });

    return this.filterRelationFields(reloadedPlace!);
  }

  async findAll(
    query: PlaceQueryDto,
  ): Promise<{ places: Place[]; total: number }> {
    const {
      categoryId,
      userId,
      cityId,
      countryId,
      isActive,
      isFeatured,
      minPrice,
      maxPrice,
      isPriceOnRequest,
      page = 0,
      limit = 10,
    } = query;

    let queryBuilder = this.placeRepository.createQueryBuilder('place');

    // Load relations
    queryBuilder = queryBuilder
      .leftJoinAndSelect('place.user', 'user')
      .leftJoinAndSelect('place.category', 'category')
      .leftJoinAndSelect('place.country', 'country')
      .leftJoinAndSelect('place.state', 'state')
      .leftJoinAndSelect('place.city', 'city')
      .leftJoinAndSelect('place.tags', 'tags');

    // Apply filters
    if (categoryId) {
      queryBuilder = queryBuilder.andWhere('place.categoryId = :categoryId', {
        categoryId,
      });
    }
    if (userId) {
      queryBuilder = queryBuilder.andWhere('place.userId = :userId', {
        userId,
      });
    }
    if (cityId) {
      queryBuilder = queryBuilder.andWhere('place.cityId = :cityId', {
        cityId,
      });
    }
    if (countryId) {
      queryBuilder = queryBuilder.andWhere('place.countryId = :countryId', {
        countryId,
      });
    }
    if (isActive !== undefined) {
      queryBuilder = queryBuilder.andWhere('place.isActive = :isActive', {
        isActive,
      });
    }
    if (isFeatured !== undefined) {
      queryBuilder = queryBuilder.andWhere('place.isFeatured = :isFeatured', {
        isFeatured,
      });
    }
    if (minPrice !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        '(place.price >= :minPrice OR (place.minPrice IS NOT NULL AND place.minPrice >= :minPrice) OR (place.maxPrice IS NOT NULL AND place.maxPrice >= :minPrice))',
        { minPrice },
      );
    }

    if (maxPrice !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        '(place.price <= :maxPrice OR (place.maxPrice IS NOT NULL AND place.maxPrice <= :maxPrice) OR (place.minPrice IS NOT NULL AND place.minPrice <= :maxPrice))',
        { maxPrice },
      );
    }

    if (isPriceOnRequest !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'place.isPriceOnRequest = :isPriceOnRequest',
        { isPriceOnRequest },
      );
    }

    queryBuilder = queryBuilder
      .orderBy('place.createdAt', 'DESC')
      .skip(page * limit)
      .take(limit);

    const [places, total] = await queryBuilder.getManyAndCount();

    const filteredPlaces = this.filterPlacesRelations(places);

    return { places: filteredPlaces, total };
  }

  async findOne(id: number): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: ['category', 'user', 'country', 'state', 'city', 'tags'],
    });

    if (!place) {
      throw new NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
    }

    place.viewCount += 1;
    await this.placeRepository.save(place);

    return this.filterRelationFields(place);
  }

  async findBySlug(slug: string): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { slug },
      relations: ['category', 'user', 'country', 'state', 'city', 'tags'],
    });

    if (!place) {
      throw new NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
    }

    place.viewCount += 1;
    await this.placeRepository.save(place);

    return this.filterRelationFields(place);
  }

  async update(
    id: number,
    userId: number,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: ['category', 'user', 'country', 'state', 'city', 'tags'],
    });

    if (!place) {
      throw new NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
    }

    if (place.userId !== userId) {
      throw new BadRequestException(this.i18n.translate('t.PLACE_NOT_OWNER'));
    }

    // Validate location hierarchy if location fields are being updated
    const countryId =
      updatePlaceDto.countryId !== undefined
        ? updatePlaceDto.countryId
        : place.countryId;
    const stateId =
      updatePlaceDto.stateId !== undefined
        ? updatePlaceDto.stateId
        : place.stateId;
    const cityId =
      updatePlaceDto.cityId !== undefined
        ? updatePlaceDto.cityId
        : place.cityId;

    await this.locationService.validateLocationHierarchy(
      countryId,
      stateId,
      cityId,
    );

    if (updatePlaceDto.name && !updatePlaceDto.slug) {
      const newSlug = this.generateSlug(updatePlaceDto.name);
      const existingPlace = await this.placeRepository.findOne({
        where: { slug: newSlug },
      });
      if (!existingPlace || existingPlace.id === id) {
        updatePlaceDto.slug = newSlug;
      } else {
        updatePlaceDto.slug = `${newSlug}-${Date.now()}`;
      }
    }

    // Handle tags if tagIds is provided
    const tagIds = updatePlaceDto.tagIds;
    if (tagIds !== undefined) {
      if (tagIds && tagIds.length > 0) {
        place.tags = await Promise.all(
          tagIds.map(async (tagId) => {
            return await this.tagService.findOne(tagId);
          }),
        );
      } else {
        place.tags = [];
      }
    }

    const { tagIds: _, ...placeUpdateData } = updatePlaceDto;
    Object.assign(place, placeUpdateData);
    const updatedPlace = await this.placeRepository.save(place);

    const reloadedPlace = await this.placeRepository.findOne({
      where: { id: updatedPlace.id },
      relations: ['category', 'user', 'country', 'state', 'city', 'tags'],
    });

    return this.filterRelationFields(reloadedPlace!);
  }

  async remove(id: number, userId: number): Promise<void> {
    const place = await this.findOne(id);

    if (place.userId !== userId) {
      throw new BadRequestException(this.i18n.translate('t.PLACE_NOT_OWNER'));
    }

    await this.placeRepository.softDelete(id);
  }

  async findByUser(userId: number): Promise<Place[]> {
    const places = await this.placeRepository.find({
      where: { userId },
      relations: ['category', 'user', 'country', 'state', 'city', 'tags'],
      order: { createdAt: 'DESC' },
    });

    return this.filterPlacesRelations(places);
  }

  async findByCategory(categoryId: number): Promise<Place[]> {
    const places = await this.placeRepository.find({
      where: { categoryId, isActive: true },
      relations: ['category', 'user', 'country', 'state', 'city', 'tags'],
      order: { createdAt: 'DESC' },
    });

    return this.filterPlacesRelations(places);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }
}
