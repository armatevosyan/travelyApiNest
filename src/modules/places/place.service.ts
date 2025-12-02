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

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    private readonly i18n: I18nService,
    private readonly locationService: LocationService,
    private readonly tagService: TagService,
    private readonly filesService: FilesService,
    private readonly facilityService: FacilityService,
    private readonly restaurantService: RestaurantService,
    private readonly accommodationService: AccommodationService,
    private readonly shoppingService: ShoppingService,
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

    // Create restaurant record if category is food/drink related and restaurantData is provided
    if (restaurantData && (await this.isFoodCategory(savedPlace.categoryId))) {
      try {
        await this.restaurantService.create({
          placeId: savedPlace.id,
          ...restaurantData,
        });
      } catch (error) {
        // Log error but don't fail place creation
        console.error('Failed to create restaurant record:', error);
      }
    }

    // Create accommodation record if category is accommodation related and accommodationData is provided
    if (
      accommodationData &&
      (await this.isAccommodationCategory(savedPlace.categoryId))
    ) {
      try {
        await this.accommodationService.create({
          placeId: savedPlace.id,
          ...accommodationData,
        });
      } catch (error) {
        // Log error but don't fail place creation
        console.error('Failed to create accommodation record:', error);
      }
    }

    // Create shopping record if category is shopping related and shoppingData is provided
    if (
      shoppingData &&
      (await this.isShoppingCategory(savedPlace.categoryId))
    ) {
      try {
        await this.shoppingService.create({
          placeId: savedPlace.id,
          ...shoppingData,
        });
      } catch (error) {
        // Log error but don't fail place creation
        console.error('Failed to create shopping record:', error);
      }
    }

    const reloadedPlace = await this.placeRepository.findOne({
      where: { id: savedPlace.id },
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
      ],
    });

    return await this.filterRelationFields(reloadedPlace!);
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
      .leftJoinAndSelect('place.tags', 'tags')
      .leftJoinAndSelect('place.facilities', 'facilities')
      .leftJoinAndSelect('place.restaurant', 'restaurant')
      .leftJoinAndSelect('restaurant.menuImages', 'restaurantMenuImages')
      .leftJoinAndSelect('restaurant.dishImages', 'restaurantDishImages')
      .leftJoinAndSelect('place.accommodation', 'accommodation')
      .leftJoinAndSelect('place.shopping', 'shopping');

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

    const filteredPlaces = await this.filterPlacesRelations(places);

    return { places: filteredPlaces, total };
  }

  async findOne(id: number): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id },
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

    // Update restaurant data if provided and place is a food category
    if (restaurantData && (await this.isFoodCategory(place.categoryId))) {
      try {
        // Try to update existing restaurant
        await this.restaurantService.updateByPlaceId(place.id, restaurantData);
      } catch (error) {
        // If restaurant doesn't exist, create it
        if (error instanceof NotFoundException) {
          try {
            await this.restaurantService.create({
              placeId: place.id,
              ...restaurantData,
            });
          } catch (createError) {
            console.error('Failed to create restaurant record:', createError);
          }
        } else {
          console.error('Failed to update restaurant record:', error);
        }
      }
    }

    // Update accommodation data if provided and place is an accommodation category
    if (
      accommodationData &&
      (await this.isAccommodationCategory(place.categoryId))
    ) {
      try {
        // Try to update existing accommodation
        await this.accommodationService.updateByPlaceId(
          place.id,
          accommodationData,
        );
      } catch (error) {
        // If accommodation doesn't exist, create it
        if (error instanceof NotFoundException) {
          try {
            await this.accommodationService.create({
              placeId: place.id,
              ...accommodationData,
            });
          } catch (createError) {
            console.error(
              'Failed to create accommodation record:',
              createError,
            );
          }
        } else {
          console.error('Failed to update accommodation record:', error);
        }
      }
    }

    // Update shopping data if provided and place is a shopping category
    if (shoppingData && (await this.isShoppingCategory(place.categoryId))) {
      try {
        // Try to update existing shopping
        await this.shoppingService.updateByPlaceId(place.id, shoppingData);
      } catch (error) {
        // If shopping doesn't exist, create it
        if (error instanceof NotFoundException) {
          try {
            await this.shoppingService.create({
              placeId: place.id,
              ...shoppingData,
            });
          } catch (createError) {
            console.error('Failed to create shopping record:', createError);
          }
        } else {
          console.error('Failed to update shopping record:', error);
        }
      }
    }

    const reloadedPlace = await this.placeRepository.findOne({
      where: { id: updatedPlace.id },
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
      ],
      order: { createdAt: 'DESC' },
    });

    return await this.filterPlacesRelations(places);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Check if a category is a food/restaurant category
   * Categories: Restaurant, Coffee Shop, Bar & Pub, Fast Food, Fine Dining, Street Food
   */
  private async isFoodCategory(categoryId: number): Promise<boolean> {
    const category = await this.placeRepository.manager.findOne(Category, {
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return false;

    // Check if category name contains food-related keywords
    const categoryName = category.name.toLowerCase();
    const foodKeywords = [
      'restaurant',
      'coffee',
      'bar',
      'pub',
      'food',
      'dining',
      'cafe',
      'drink',
    ];

    if (foodKeywords.some((keyword) => categoryName.includes(keyword))) {
      return true;
    }

    // Check if parent category is "Food & Drink"
    if (category.parent) {
      const parentName = category.parent.name.toLowerCase();
      if (parentName.includes('food') || parentName.includes('drink')) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if a category is an accommodation category
   * Categories: Hotel, Hostel, Airbnb, Resort, Motel, Bed & Breakfast
   */
  private async isAccommodationCategory(categoryId: number): Promise<boolean> {
    const category = await this.placeRepository.manager.findOne(Category, {
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return false;

    // Check if category name contains accommodation-related keywords
    const categoryName = category.name.toLowerCase();
    const accommodationKeywords = [
      'hotel',
      'hostel',
      'airbnb',
      'resort',
      'motel',
      'bed',
      'breakfast',
      'accommodation',
      'lodging',
      'inn',
      'guesthouse',
    ];

    if (
      accommodationKeywords.some((keyword) => categoryName.includes(keyword))
    ) {
      return true;
    }

    // Check if parent category is "Accommodation"
    if (category.parent) {
      const parentName = category.parent.name.toLowerCase();
      if (parentName.includes('accommodation') || parentName.includes('stay')) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if a category is a shopping category
   * Categories: Shopping Mall, Store, Market, Boutique, etc.
   */
  private async isShoppingCategory(categoryId: number): Promise<boolean> {
    const category = await this.placeRepository.manager.findOne(Category, {
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return false;

    // Check if category name contains shopping-related keywords
    const categoryName = category.name.toLowerCase();
    const shoppingKeywords = [
      'shop',
      'store',
      'mall',
      'market',
      'boutique',
      'retail',
      'shopping',
      'outlet',
      'supermarket',
      'grocery',
      'department',
      'clothing',
      'fashion',
    ];

    if (shoppingKeywords.some((keyword) => categoryName.includes(keyword))) {
      return true;
    }

    // Check if parent category is "Shopping"
    if (category.parent) {
      const parentName = category.parent.name.toLowerCase();
      if (parentName.includes('shopping') || parentName.includes('retail')) {
        return true;
      }
    }

    return false;
  }
}
