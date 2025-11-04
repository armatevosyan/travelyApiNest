import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { PlaceQueryDto, UpdatePlaceDto } from './place.dto';
import { I18nService } from 'nestjs-i18n';
import { CreatePlaceData } from '@/modules/places/place.types';
import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    private readonly i18n: I18nService,
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

    return filteredPlace;
  }

  private filterPlacesRelations<T extends Place>(places: T[]): T[] {
    return places.map((place) => this.filterRelationFields(place));
  }

  async create(userId: number, data: CreatePlaceData): Promise<Place> {
    // Generate slug if not provided
    let slug = data.slug;
    if (!slug && data.name) {
      slug = this.generateSlug(data.name);
    }

    // Check if slug already exists
    if (slug) {
      const existingPlace = await this.placeRepository.findOne({
        where: { slug },
      });
      if (existingPlace) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const place = this.placeRepository.create({
      ...data,
      userId,
      slug,
    });

    const savedPlace = await this.placeRepository.save(place);

    const reloadedPlace = await this.placeRepository.findOne({
      where: { id: savedPlace.id },
      relations: ['category', 'user'],
    });

    return this.filterRelationFields(reloadedPlace!);
  }

  async findAll(
    query: PlaceQueryDto,
  ): Promise<{ places: Place[]; total: number }> {
    const {
      categoryId,
      userId,
      city,
      country,
      isActive,
      isFeatured,
      priceRange,
      page = 0,
      limit = 10,
    } = query;

    let queryBuilder = this.placeRepository.createQueryBuilder('place');

    // Load relations
    queryBuilder = queryBuilder
      .leftJoinAndSelect('place.user', 'user')
      .leftJoinAndSelect('place.category', 'category');

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
    if (city) {
      queryBuilder = queryBuilder.andWhere('place.city ILIKE :city', {
        city: `%${city}%`,
      });
    }
    if (country) {
      queryBuilder = queryBuilder.andWhere('place.country ILIKE :country', {
        country: `%${country}%`,
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
    // TODO: Need to change priceRange
    // TODO: Need to work on priceRange
    // TODO: Need to work Opening Hours Object, validations
    if (priceRange) {
      queryBuilder = queryBuilder.andWhere('place.priceRange = :priceRange', {
        priceRange,
      });
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
      relations: ['category', 'user'],
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
      relations: ['category', 'user'],
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
      relations: ['category', 'user'],
    });

    if (!place) {
      throw new NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
    }

    if (place.userId !== userId) {
      throw new BadRequestException(this.i18n.translate('t.PLACE_NOT_OWNER'));
    }

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

    Object.assign(place, updatePlaceDto);
    const updatedPlace = await this.placeRepository.save(place);

    const reloadedPlace = await this.placeRepository.findOne({
      where: { id: updatedPlace.id },
      relations: ['category', 'user'],
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
      relations: ['category', 'user'],
      order: { createdAt: 'DESC' },
    });

    return this.filterPlacesRelations(places);
  }

  async findByCategory(categoryId: number): Promise<Place[]> {
    const places = await this.placeRepository.find({
      where: { categoryId, isActive: true },
      relations: ['category', 'user'],
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
