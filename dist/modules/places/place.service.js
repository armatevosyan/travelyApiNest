"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const place_entity_1 = require("./place.entity");
const nestjs_i18n_1 = require("nestjs-i18n");
const category_entity_1 = require("../categories/category.entity");
const location_service_1 = require("../locations/location.service");
const tag_service_1 = require("../tags/tag.service");
const files_service_1 = require("../files/files.service");
const file_relation_entity_1 = require("../files/entities/file-relation.entity");
const facility_service_1 = require("../facilities/facility.service");
const restaurant_service_1 = require("../restaurants/restaurant.service");
const accommodation_service_1 = require("../accommodations/accommodation.service");
const shopping_service_1 = require("../shopping/shopping.service");
const transport_service_1 = require("../transport/transport.service");
const health_wellness_service_1 = require("../health-wellness/health-wellness.service");
const nature_outdoors_service_1 = require("../nature-outdoors/nature-outdoors.service");
const entertainment_service_1 = require("../entertainment/entertainment.service");
const category_enum_1 = require("../categories/category.enum");
let PlaceService = class PlaceService {
    placeRepository;
    categoryRepository;
    i18n;
    locationService;
    tagService;
    filesService;
    facilityService;
    restaurantService;
    accommodationService;
    shoppingService;
    transportService;
    healthWellnessService;
    natureOutdoorsService;
    entertainmentService;
    constructor(placeRepository, categoryRepository, i18n, locationService, tagService, filesService, facilityService, restaurantService, accommodationService, shoppingService, transportService, healthWellnessService, natureOutdoorsService, entertainmentService) {
        this.placeRepository = placeRepository;
        this.categoryRepository = categoryRepository;
        this.i18n = i18n;
        this.locationService = locationService;
        this.tagService = tagService;
        this.filesService = filesService;
        this.facilityService = facilityService;
        this.restaurantService = restaurantService;
        this.accommodationService = accommodationService;
        this.shoppingService = shoppingService;
        this.transportService = transportService;
        this.healthWellnessService = healthWellnessService;
        this.natureOutdoorsService = natureOutdoorsService;
        this.entertainmentService = entertainmentService;
    }
    async filterRelationFields(place) {
        const filteredPlace = { ...place };
        if (place.user) {
            const userFileRelations = await this.filesService.getFileRelationsForEntity(file_relation_entity_1.FileRelationType.USER, place.user.id);
            const profileImage = userFileRelations.length > 0 ? userFileRelations[0].file : null;
            filteredPlace.user = {
                id: place.user.id,
                fullName: place.user.fullName,
                email: place.user.email,
                profileImage: profileImage,
            };
        }
        if (place.category) {
            filteredPlace.category = {
                id: place.category.id,
                name: place.category.name,
            };
        }
        if (place.subcategory) {
            filteredPlace.subcategory = {
                id: place.subcategory.id,
                name: place.subcategory.name,
            };
        }
        if (place.country) {
            filteredPlace.country = {
                id: place.country.id,
                name: place.country.name,
                type: place.country.type,
                image: place.country.image,
                imageId: place.country.imageId,
            };
        }
        if (place.state) {
            filteredPlace.state = {
                id: place.state.id,
                name: place.state.name,
                type: place.state.type,
            };
        }
        if (place.city) {
            filteredPlace.city = {
                id: place.city.id,
                name: place.city.name,
                type: place.city.type,
            };
        }
        if (place.tags && Array.isArray(place.tags)) {
            filteredPlace.tags = place.tags.map((tag) => ({
                id: tag.id,
                name: tag.name,
                slug: tag.slug,
            }));
        }
        if (place.facilities && Array.isArray(place.facilities)) {
            filteredPlace.facilities = place.facilities.map((facility) => ({
                id: facility.id,
                name: facility.name,
                icon: facility.icon,
                description: facility.description,
                count: facility.count,
            }));
        }
        const fileRelations = await this.filesService.getFileRelationsForEntity(file_relation_entity_1.FileRelationType.PLACE, place.id);
        let accommodationData = null;
        if (place.accommodation) {
            const accommodationWithPhotos = await this.accommodationService.loadRoomPhotos(place.accommodation);
            const { roomTypesWithPhotos, ...accommodationBase } = accommodationWithPhotos;
            accommodationData = {
                ...accommodationBase,
                roomTypes: roomTypesWithPhotos || accommodationWithPhotos.roomTypes,
            };
        }
        return {
            ...filteredPlace,
            images: fileRelations.map((r) => r.file),
            restaurant: place.restaurant || null,
            accommodation: accommodationData || null,
            shopping: place.shopping || null,
            transport: place.transport || null,
            healthWellness: place.healthWellness || null,
            natureOutdoors: place.natureOutdoors || null,
            entertainment: place.entertainment || null,
        };
    }
    async filterPlacesRelations(places) {
        return Promise.all(places.map((place) => this.filterRelationFields(place)));
    }
    async create(userId, data) {
        await this.locationService.validateLocationHierarchy(data.countryId, data.stateId, data.cityId);
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
        let tags = [];
        let facilities = [];
        const { tagIds, facilityIds, restaurantData, accommodationData, shoppingData, transportData, healthWellnessData, natureOutdoorsData, entertainmentData, ...placeData } = data;
        if (tagIds && tagIds.length > 0) {
            tags = await Promise.all(tagIds.map(async (tagId) => {
                return await this.tagService.findOne(tagId);
            }));
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
        if (facilityIds && facilityIds.length > 0) {
            await this.facilityService.incrementCount(facilityIds);
        }
        if (data.imageIds && data.imageIds.length > 0) {
            await Promise.all(data.imageIds.map((fileId) => this.filesService.attachFileToEntity(fileId, file_relation_entity_1.FileRelationType.PLACE, savedPlace.id)));
        }
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
        return await this.filterRelationFields(reloadedPlace);
    }
    async findAll(query) {
        const { categoryId, subcategoryId, userId, cityId, countryId, isActive, isFeatured, minPrice, maxPrice, isPriceOnRequest, page = 0, limit = 10, } = query;
        let queryBuilder = this.placeRepository.createQueryBuilder('place');
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
        if (categoryId) {
            queryBuilder = queryBuilder.andWhere('place.categoryId = :categoryId', {
                categoryId,
            });
        }
        if (subcategoryId) {
            queryBuilder = queryBuilder.andWhere('place.subcategoryId = :subcategoryId', {
                subcategoryId,
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
            queryBuilder = queryBuilder.andWhere('(place.price >= :minPrice OR (place.minPrice IS NOT NULL AND place.minPrice >= :minPrice) OR (place.maxPrice IS NOT NULL AND place.maxPrice >= :minPrice))', { minPrice });
        }
        if (maxPrice !== undefined) {
            queryBuilder = queryBuilder.andWhere('(place.price <= :maxPrice OR (place.maxPrice IS NOT NULL AND place.maxPrice <= :maxPrice) OR (place.minPrice IS NOT NULL AND place.minPrice <= :maxPrice))', { maxPrice });
        }
        if (isPriceOnRequest !== undefined) {
            queryBuilder = queryBuilder.andWhere('place.isPriceOnRequest = :isPriceOnRequest', { isPriceOnRequest });
        }
        queryBuilder = queryBuilder
            .orderBy('place.createdAt', 'DESC')
            .skip(page * limit)
            .take(limit);
        const [places, total] = await queryBuilder.getManyAndCount();
        const filteredPlaces = await this.filterPlacesRelations(places);
        return { places: filteredPlaces, total };
    }
    async findOne(id) {
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
            throw new common_1.NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
        }
        place.viewCount += 1;
        await this.placeRepository.save(place);
        return this.filterRelationFields(place);
    }
    async findBySlug(slug) {
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
            throw new common_1.NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
        }
        place.viewCount += 1;
        await this.placeRepository.save(place);
        return await this.filterRelationFields(place);
    }
    async update(id, userId, updatePlaceDto) {
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
            throw new common_1.NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
        }
        if (place.userId !== userId) {
            throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_NOT_OWNER'));
        }
        const countryId = updatePlaceDto.countryId !== undefined
            ? updatePlaceDto.countryId
            : place.countryId;
        const stateId = updatePlaceDto.stateId !== undefined
            ? updatePlaceDto.stateId
            : place.stateId;
        const cityId = updatePlaceDto.cityId !== undefined
            ? updatePlaceDto.cityId
            : place.cityId;
        await this.locationService.validateLocationHierarchy(countryId, stateId, cityId);
        if (updatePlaceDto.name && !updatePlaceDto.slug) {
            const newSlug = this.generateSlug(updatePlaceDto.name);
            const existingPlace = await this.placeRepository.findOne({
                where: { slug: newSlug },
            });
            if (!existingPlace || existingPlace.id === id) {
                updatePlaceDto.slug = newSlug;
            }
            else {
                updatePlaceDto.slug = `${newSlug}-${Date.now()}`;
            }
        }
        const { tagIds, facilityIds, restaurantData, accommodationData, shoppingData, transportData, healthWellnessData, natureOutdoorsData, entertainmentData, ...placeUpdateData } = updatePlaceDto;
        if (tagIds !== undefined) {
            if (tagIds && tagIds.length > 0) {
                place.tags = await Promise.all(tagIds.map(async (tagId) => {
                    return await this.tagService.findOne(tagId);
                }));
            }
            else {
                place.tags = [];
            }
        }
        if (facilityIds !== undefined) {
            const oldFacilityIds = place.facilities?.map((f) => f.id) || [];
            const newFacilityIds = facilityIds || [];
            if (newFacilityIds && newFacilityIds.length > 0) {
                place.facilities = await this.facilityService.findByIds(newFacilityIds);
            }
            else {
                place.facilities = [];
            }
            await this.facilityService.updateCounts(oldFacilityIds, newFacilityIds);
        }
        Object.assign(place, placeUpdateData);
        const updatedPlace = await this.placeRepository.save(place);
        if (updatePlaceDto.imageIds !== undefined) {
            const currentFiles = await this.filesService.getFilesForEntity(file_relation_entity_1.FileRelationType.PLACE, place.id);
            await Promise.all(currentFiles.map((file) => this.filesService
                .detachFileFromEntity(file.id, file_relation_entity_1.FileRelationType.PLACE, place.id)
                .catch(() => { })));
            if (updatePlaceDto.imageIds && updatePlaceDto.imageIds.length > 0) {
                await Promise.all(updatePlaceDto.imageIds.map((fileId) => this.filesService.attachFileToEntity(fileId, file_relation_entity_1.FileRelationType.PLACE, place.id)));
            }
        }
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
        return await this.filterRelationFields(reloadedPlace);
    }
    async remove(id, userId) {
        const place = await this.placeRepository.findOne({
            where: { id },
            relations: ['facilities'],
        });
        if (!place) {
            throw new common_1.NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
        }
        if (place.userId !== userId) {
            throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_NOT_OWNER'));
        }
        if (place.facilities && place.facilities.length > 0) {
            const facilityIds = place.facilities.map((f) => f.id);
            await this.facilityService.decrementCount(facilityIds);
        }
        await this.placeRepository.softDelete(id);
    }
    async findByUser(userId) {
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
    async findByCategory(categoryId) {
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
    buildCategoryMap(data) {
        return {
            [category_enum_1.MainCategoryEnum.FOOD_AND_DRINK]: {
                data: data.restaurantData,
                service: this.restaurantService,
                name: 'restaurant',
            },
            [category_enum_1.MainCategoryEnum.ACCOMMODATION]: {
                data: data.accommodationData,
                service: this.accommodationService,
                name: 'accommodation',
            },
            [category_enum_1.MainCategoryEnum.SHOPPING]: {
                data: data.shoppingData,
                service: this.shoppingService,
                name: 'shopping',
            },
            [category_enum_1.MainCategoryEnum.TRANSPORT]: {
                data: data.transportData,
                service: this.transportService,
                name: 'transport',
            },
            [category_enum_1.MainCategoryEnum.HEALTH_AND_WELLNESS]: {
                data: data.healthWellnessData,
                service: this.healthWellnessService,
                name: 'health & wellness',
            },
            [category_enum_1.MainCategoryEnum.NATURE_AND_OUTDOORS]: {
                data: data.natureOutdoorsData,
                service: this.natureOutdoorsService,
                name: 'nature & outdoors',
            },
            [category_enum_1.MainCategoryEnum.ENTERTAINMENT]: {
                data: data.entertainmentData,
                service: this.entertainmentService,
                name: 'entertainment',
            },
        };
    }
    async createCategorySpecificRecord(placeId, data) {
        const place = await this.placeRepository.findOne({
            where: { id: placeId },
            relations: ['category', 'category.parent'],
        });
        if (!place)
            return;
        const parentSlug = (place.category.parent?.slug ||
            place.category.slug);
        if (!parentSlug)
            return;
        const categoryMap = this.buildCategoryMap(data);
        const categoryInfo = categoryMap[parentSlug];
        if (categoryInfo && categoryInfo.data) {
            try {
                await categoryInfo.service.create({
                    placeId,
                    ...categoryInfo.data,
                });
            }
            catch (error) {
                console.error(`Failed to create ${categoryInfo.name} record:`, error);
            }
        }
    }
    async updateCategorySpecificRecord(placeId, categoryId, data) {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
            relations: ['parent'],
        });
        if (!category)
            return;
        const parentSlug = (category.parent?.slug ||
            category.slug);
        if (!parentSlug)
            return;
        const categoryMap = this.buildCategoryMap(data);
        const categoryInfo = categoryMap[parentSlug];
        if (categoryInfo && categoryInfo.data) {
            try {
                await categoryInfo.service.updateByPlaceId(placeId, categoryInfo.data);
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException) {
                    try {
                        await categoryInfo.service.create({
                            placeId,
                            ...categoryInfo.data,
                        });
                    }
                    catch (createError) {
                        console.error(`Failed to create ${categoryInfo.name} record:`, createError);
                    }
                }
                else {
                    console.error(`Failed to update ${categoryInfo.name} record:`, error);
                }
            }
        }
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
};
exports.PlaceService = PlaceService;
exports.PlaceService = PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_i18n_1.I18nService,
        location_service_1.LocationService,
        tag_service_1.TagService,
        files_service_1.FilesService,
        facility_service_1.FacilityService,
        restaurant_service_1.RestaurantService,
        accommodation_service_1.AccommodationService,
        shopping_service_1.ShoppingService,
        transport_service_1.TransportService,
        health_wellness_service_1.HealthWellnessService,
        nature_outdoors_service_1.NatureOutdoorsService,
        entertainment_service_1.EntertainmentService])
], PlaceService);
//# sourceMappingURL=place.service.js.map