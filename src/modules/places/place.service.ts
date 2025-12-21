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
import { Category } from '@/modules/categories/category.entity';
import { LocationService } from '@/modules/locations/location.service';
import { Location } from '@/modules/locations/location.entity';
import { TagService } from '@/modules/tags/tag.service';
import { Tag } from '@/modules/tags/tag.entity';
import { FilesService } from '@/modules/files/files.service';
import { FileRelationType } from '@/modules/files/entities/file-relation.entity';
import { FacilityService } from '@/modules/facilities/facility.service';
import { Facility } from '@/modules/facilities/facility.entity';
import { RestaurantService } from '@/modules/restaurants/restaurant.service';
import { AccommodationService } from '@/modules/accommodations/accommodation.service';
import { ShoppingService } from '@/modules/shopping/shopping.service';
import { TransportService } from '@/modules/transport/transport.service';
import { HealthWellnessService } from '@/modules/health-wellness/health-wellness.service';
import { NatureOutdoorsService } from '@/modules/nature-outdoors/nature-outdoors.service';
import { EntertainmentService } from '@/modules/entertainment/entertainment.service';
import { MainCategoryEnum } from '@/modules/categories/category.enum';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly i18n: I18nService,
    private readonly locationService: LocationService,
    private readonly tagService: TagService,
    private readonly filesService: FilesService,
    private readonly facilityService: FacilityService,
    private readonly restaurantService: RestaurantService,
    private readonly accommodationService: AccommodationService,
    private readonly shoppingService: ShoppingService,
    private readonly transportService: TransportService,
    private readonly healthWellnessService: HealthWellnessService,
    private readonly natureOutdoorsService: NatureOutdoorsService,
    private readonly entertainmentService: EntertainmentService,
  ) {}

  private async filterRelationFields<T extends Place>(place: T): Promise<T> {
    const filteredPlace = { ...place };

    if (place.user) {
      // Load file relations for user profile image
      const userFileRelations =
        await this.filesService.getFileRelationsForEntity(
          FileRelationType.USER,
          place.user.id,
        );
      const profileImage =
        userFileRelations.length > 0 ? userFileRelations[0].file : null;

      filteredPlace.user = {
        id: place.user.id,
        fullName: place.user.fullName,
        email: place.user.email,
        profileImage: profileImage,
      } as any;
    }

    if (place.category) {
      filteredPlace.category = {
        id: place.category.id,
        name: place.category.name,
      } as Category;
    }

    if (place.subcategory) {
      filteredPlace.subcategory = {
        id: place.subcategory.id,
        name: place.subcategory.name,
      } as Category;
    }

    if (place.country) {
      filteredPlace.country = {
        id: place.country.id,
        name: place.country.name,
        type: place.country.type,
        image: place.country.image,
        imageId: place.country.imageId,
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

    if (place.facilities && Array.isArray(place.facilities)) {
      filteredPlace.facilities = place.facilities.map((facility) => ({
        id: facility.id,
        name: facility.name,
        icon: facility.icon,
        description: facility.description,
        count: facility.count,
      })) as Facility[];
    }

    // Load file relations attached to this place
    const fileRelations = await this.filesService.getFileRelationsForEntity(
      FileRelationType.PLACE,
      place.id,
    );

    // Load accommodation with room photos if accommodation exists
    let accommodationData: any = null;
    if (place.accommodation) {
      const accommodationWithPhotos =
        await this.accommodationService.loadRoomPhotos(place.accommodation);
      const { roomTypesWithPhotos, ...accommodationBase } =
        accommodationWithPhotos;
      accommodationData = {
        ...accommodationBase,
        roomTypes: roomTypesWithPhotos || accommodationWithPhotos.roomTypes,
      };
    }

    return {
      ...filteredPlace,
      images: fileRelations.map((r) => r.file),
      // Restaurant data loaded via relation (if exists)
      restaurant: place.restaurant || null,
      // Accommodation data loaded via relation with room photos (if exists)
      accommodation: accommodationData || null,
      // Shopping data loaded via relation (if exists)
      shopping: place.shopping || null,
      // Transport data loaded via relation (if exists)
      transport: place.transport || null,
      // Health & Wellness data loaded via relation (if exists)
      healthWellness: place.healthWellness || null,
      // Nature & Outdoors data loaded via relation (if exists)
      natureOutdoors: place.natureOutdoors || null,
      // Entertainment data loaded via relation (if exists)
      entertainment: place.entertainment || null,
    };
  }

  private async filterPlacesRelations<T extends Place>(
    places: T[],
  ): Promise<T[]> {
    return Promise.all(places.map((place) => this.filterRelationFields(place)));
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
    let facilities: Facility[] = [];
    const {
      tagIds,
      facilityIds,
      restaurantData,
      accommodationData,
      shoppingData,
      transportData,
      healthWellnessData,
      natureOutdoorsData,
      entertainmentData,
      ...placeData
    } = data;
    if (tagIds && tagIds.length > 0) {
      tags = await Promise.all(
        tagIds.map(async (tagId) => {
          return await this.tagService.findOne(tagId);
        }),
      );
    }

    if (facilityIds && facilityIds.length > 0) {
      facilities = await this.facilityService.findByIds(facilityIds);
    }

    const place = this.placeRepository.create({
      ...placeData,
      userId,
      slug,
      tags,
      facilities,
    });

    const savedPlace = await this.placeRepository.save(place);

    // Increment facility counts for newly associated facilities
    if (facilityIds && facilityIds.length > 0) {
      await this.facilityService.incrementCount(facilityIds);
    }

    // Attach images if provided
    if (data.imageIds && data.imageIds.length > 0) {
      await Promise.all(
        data.imageIds.map((fileId) =>
          this.filesService.attachFileToEntity(
            fileId,
            FileRelationType.PLACE,
            savedPlace.id,
          ),
        ),
      );
    }

    // Create category-specific record based on parent category slug
    await this.createCategorySpecificRecord(savedPlace.id, {
      restaurantData,
      accommodationData,
      shoppingData,
      transportData,
      healthWellnessData,
      natureOutdoorsData,
      entertainmentData,
    });

    const reloadedPlace = await this.placeRepository.findOne({
      where: { id: savedPlace.id },
      relations: [
        'category',
        'subcategory',
        'user',
        'country',
        'state',
        'city',
        'tags',
        'facilities',
        'restaurant',
        'restaurant.menuImages',
        'restaurant.dishImages',
        'accommodation',
        'shopping',
        'transport',
        'healthWellness',
        'natureOutdoors',
        'entertainment',
      ],
    });

    return await this.filterRelationFields(reloadedPlace!);
  }

  async findAll(
    query: PlaceQueryDto,
  ): Promise<{ places: Place[]; total: number }> {
    const {
      categoryId,
      subcategoryId,
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
      .leftJoinAndSelect('place.subcategory', 'subcategory')
      .leftJoinAndSelect('place.country', 'country')
      .leftJoinAndSelect('country.image', 'countryImage')
      .leftJoinAndSelect('place.state', 'state')
      .leftJoinAndSelect('place.city', 'city')
      .leftJoinAndSelect('place.tags', 'tags')
      .leftJoinAndSelect('place.facilities', 'facilities')
      .leftJoinAndSelect('place.restaurant', 'restaurant')
      .leftJoinAndSelect('restaurant.menuImages', 'restaurantMenuImages')
      .leftJoinAndSelect('restaurant.dishImages', 'restaurantDishImages')
      .leftJoinAndSelect('place.accommodation', 'accommodation')
      .leftJoinAndSelect('place.shopping', 'shopping')
      .leftJoinAndSelect('place.transport', 'transport')
      .leftJoinAndSelect('place.healthWellness', 'healthWellness')
      .leftJoinAndSelect('place.natureOutdoors', 'natureOutdoors')
      .leftJoinAndSelect('place.entertainment', 'entertainment');

    // Apply filters
    if (categoryId) {
      queryBuilder = queryBuilder.andWhere('place.categoryId = :categoryId', {
        categoryId,
      });
    }
    if (subcategoryId) {
      queryBuilder = queryBuilder.andWhere(
        'place.subcategoryId = :subcategoryId',
        {
          subcategoryId,
        },
      );
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

    const filteredPlaces = await this.filterPlacesRelations(places);

    return { places: filteredPlaces, total };
  }

  async findOne(id: number): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: [
        'category',
        'subcategory',
        'user',
        'country',
        'country.image',
        'state',
        'city',
        'tags',
        'facilities',
        'restaurant',
        'restaurant.menuImages',
        'restaurant.dishImages',
        'accommodation',
        'shopping',
        'transport',
        'healthWellness',
        'natureOutdoors',
        'entertainment',
      ],
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
      relations: [
        'category',
        'subcategory',
        'user',
        'country',
        'country.image',
        'state',
        'city',
        'tags',
        'facilities',
        'restaurant',
        'restaurant.menuImages',
        'restaurant.dishImages',
        'accommodation',
        'shopping',
        'transport',
        'healthWellness',
        'natureOutdoors',
        'entertainment',
      ],
    });

    if (!place) {
      throw new NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
    }

    place.viewCount += 1;
    await this.placeRepository.save(place);

    return await this.filterRelationFields(place);
  }

  async update(
    id: number,
    userId: number,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: [
        'category',
        'subcategory',
        'user',
        'country',
        'country.image',
        'state',
        'city',
        'tags',
        'facilities',
        'restaurant',
        'restaurant.menuImages',
        'restaurant.dishImages',
        'accommodation',
        'shopping',
        'transport',
        'healthWellness',
        'natureOutdoors',
        'entertainment',
      ],
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
    const {
      tagIds,
      facilityIds,
      restaurantData,
      accommodationData,
      shoppingData,
      transportData,
      healthWellnessData,
      natureOutdoorsData,
      entertainmentData,
      ...placeUpdateData
    } = updatePlaceDto;

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

    // Handle facilities and update counts
    if (facilityIds !== undefined) {
      const oldFacilityIds = place.facilities?.map((f) => f.id) || [];
      const newFacilityIds = facilityIds || [];

      if (newFacilityIds && newFacilityIds.length > 0) {
        place.facilities = await this.facilityService.findByIds(newFacilityIds);
      } else {
        place.facilities = [];
      }

      // Update facility counts (increment added, decrement removed)
      await this.facilityService.updateCounts(oldFacilityIds, newFacilityIds);
    }

    Object.assign(place, placeUpdateData);
    const updatedPlace = await this.placeRepository.save(place);

    // Update file attachments if provided
    if (updatePlaceDto.imageIds !== undefined) {
      // Get current images
      const currentFiles = await this.filesService.getFilesForEntity(
        FileRelationType.PLACE,
        place.id,
      );

      // Remove old image relations
      await Promise.all(
        currentFiles.map((file) =>
          this.filesService
            .detachFileFromEntity(file.id, FileRelationType.PLACE, place.id)
            .catch(() => {}),
        ),
      );

      // Attach new images
      if (updatePlaceDto.imageIds && updatePlaceDto.imageIds.length > 0) {
        await Promise.all(
          updatePlaceDto.imageIds.map((fileId) =>
            this.filesService.attachFileToEntity(
              fileId,
              FileRelationType.PLACE,
              place.id,
            ),
          ),
        );
      }
    }

    // Update category-specific record based on parent category slug
    await this.updateCategorySpecificRecord(place.id, place.category.id, {
      restaurantData,
      accommodationData,
      shoppingData,
      transportData,
      healthWellnessData,
      natureOutdoorsData,
      entertainmentData,
    });

    const reloadedPlace = await this.placeRepository.findOne({
      where: { id: updatedPlace.id },
      relations: [
        'category',
        'subcategory',
        'user',
        'country',
        'country.image',
        'state',
        'city',
        'tags',
        'facilities',
        'restaurant',
        'restaurant.menuImages',
        'restaurant.dishImages',
        'accommodation',
        'shopping',
        'transport',
        'healthWellness',
        'natureOutdoors',
        'entertainment',
      ],
    });

    return await this.filterRelationFields(reloadedPlace!);
  }

  async remove(id: number, userId: number): Promise<void> {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: ['facilities'],
    });

    if (!place) {
      throw new NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
    }

    if (place.userId !== userId) {
      throw new BadRequestException(this.i18n.translate('t.PLACE_NOT_OWNER'));
    }

    // Decrement facility counts before deleting
    if (place.facilities && place.facilities.length > 0) {
      const facilityIds = place.facilities.map((f) => f.id);
      await this.facilityService.decrementCount(facilityIds);
    }

    await this.placeRepository.softDelete(id);
  }

  async findByUser(userId: number): Promise<Place[]> {
    const places = await this.placeRepository.find({
      where: { userId },
      relations: [
        'category',
        'subcategory',
        'user',
        'country',
        'state',
        'city',
        'tags',
        'facilities',
        'restaurant',
        'restaurant.menuImages',
        'restaurant.dishImages',
        'accommodation',
        'shopping',
        'transport',
        'healthWellness',
        'natureOutdoors',
        'entertainment',
      ],
      order: { createdAt: 'DESC' },
    });

    return await this.filterPlacesRelations(places);
  }

  async findByCategory(categoryId: number): Promise<Place[]> {
    const places = await this.placeRepository.find({
      where: { categoryId, isActive: true },
      relations: [
        'category',
        'user',
        'country',
        'state',
        'city',
        'tags',
        'facilities',
        'restaurant',
        'restaurant.menuImages',
        'restaurant.dishImages',
        'accommodation',
        'shopping',
        'transport',
        'healthWellness',
        'natureOutdoors',
        'entertainment',
      ],
      order: { createdAt: 'DESC' },
    });

    return await this.filterPlacesRelations(places);
  }

  /**
   * Build category map for category-specific data handling
   */
  private buildCategoryMap(data: {
    restaurantData?: any;
    accommodationData?: any;
    shoppingData?: any;
    transportData?: any;
    healthWellnessData?: any;
    natureOutdoorsData?: any;
    entertainmentData?: any;
  }): Record<MainCategoryEnum, { data: any; service: any; name: string }> {
    return {
      [MainCategoryEnum.FOOD_AND_DRINK]: {
        data: data.restaurantData,
        service: this.restaurantService,
        name: 'restaurant',
      },
      [MainCategoryEnum.ACCOMMODATION]: {
        data: data.accommodationData,
        service: this.accommodationService,
        name: 'accommodation',
      },
      [MainCategoryEnum.SHOPPING]: {
        data: data.shoppingData,
        service: this.shoppingService,
        name: 'shopping',
      },
      [MainCategoryEnum.TRANSPORT]: {
        data: data.transportData,
        service: this.transportService,
        name: 'transport',
      },
      [MainCategoryEnum.HEALTH_AND_WELLNESS]: {
        data: data.healthWellnessData,
        service: this.healthWellnessService,
        name: 'health & wellness',
      },
      [MainCategoryEnum.NATURE_AND_OUTDOORS]: {
        data: data.natureOutdoorsData,
        service: this.natureOutdoorsService,
        name: 'nature & outdoors',
      },
      [MainCategoryEnum.ENTERTAINMENT]: {
        data: data.entertainmentData,
        service: this.entertainmentService,
        name: 'entertainment',
      },
    };
  }

  /**
   * Create category-specific record based on parent category slug
   */
  private async createCategorySpecificRecord(
    placeId: number,
    data: {
      restaurantData?: any;
      accommodationData?: any;
      shoppingData?: any;
      transportData?: any;
      healthWellnessData?: any;
      natureOutdoorsData?: any;
      entertainmentData?: any;
    },
  ): Promise<void> {
    const place = await this.placeRepository.findOne({
      where: { id: placeId },
      relations: ['category', 'category.parent'],
    });

    if (!place) return;

    // Get parent category slug
    const parentSlug = (place.category.parent?.slug ||
      place.category.slug) as MainCategoryEnum;

    if (!parentSlug) return;

    // Get category map
    const categoryMap = this.buildCategoryMap(data);
    const categoryInfo = categoryMap[parentSlug];

    if (categoryInfo && categoryInfo.data) {
      try {
        await categoryInfo.service.create({
          placeId,
          ...categoryInfo.data,
        });
      } catch (error) {
        console.error(`Failed to create ${categoryInfo.name} record:`, error);
      }
    }
  }

  /**
   * Update category-specific record based on parent category slug
   */
  private async updateCategorySpecificRecord(
    placeId: number,
    categoryId: number,
    data: {
      restaurantData?: any;
      accommodationData?: any;
      shoppingData?: any;
      transportData?: any;
      healthWellnessData?: any;
      natureOutdoorsData?: any;
      entertainmentData?: any;
    },
  ): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return;

    // Get parent category slug
    const parentSlug = (category.parent?.slug ||
      category.slug) as MainCategoryEnum;

    if (!parentSlug) return;

    // Get category map
    const categoryMap = this.buildCategoryMap(data);
    const categoryInfo = categoryMap[parentSlug];

    if (categoryInfo && categoryInfo.data) {
      try {
        await categoryInfo.service.updateByPlaceId(placeId, categoryInfo.data);
      } catch (error) {
        // If doesn't exist, create it
        if (error instanceof NotFoundException) {
          try {
            await categoryInfo.service.create({
              placeId,
              ...categoryInfo.data,
            });
          } catch (createError) {
            console.error(
              `Failed to create ${categoryInfo.name} record:`,
              createError,
            );
          }
        } else {
          console.error(`Failed to update ${categoryInfo.name} record:`, error);
        }
      }
    }
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
