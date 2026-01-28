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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
const place_entity_1 = require("../places/place.entity");
const file_entity_1 = require("../files/entities/file.entity");
const restaurant_special_dish_entity_1 = require("./restaurant-special-dish.entity");
let RestaurantService = class RestaurantService {
    restaurantRepository;
    restaurantSpecialDishRepository;
    placeRepository;
    fileRepository;
    constructor(restaurantRepository, restaurantSpecialDishRepository, placeRepository, fileRepository) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantSpecialDishRepository = restaurantSpecialDishRepository;
        this.placeRepository = placeRepository;
        this.fileRepository = fileRepository;
    }
    async create(createRestaurantDto) {
        const place = await this.placeRepository.findOne({
            where: { id: createRestaurantDto.placeId },
        });
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${createRestaurantDto.placeId} not found`);
        }
        const existingRestaurant = await this.restaurantRepository.findOne({
            where: { placeId: createRestaurantDto.placeId },
        });
        if (existingRestaurant) {
            throw new common_1.BadRequestException(`Restaurant already exists for place ID ${createRestaurantDto.placeId}`);
        }
        const { menuImageIds, dishImageIds, specialDishes, ...restaurantData } = createRestaurantDto;
        const menuImages = menuImageIds
            ? await this.fileRepository.findByIds(menuImageIds)
            : [];
        const dishImages = dishImageIds
            ? await this.fileRepository.findByIds(dishImageIds)
            : [];
        const restaurant = this.restaurantRepository.create({
            ...restaurantData,
            menuImages,
            dishImages,
        });
        const savedRestaurant = await this.restaurantRepository.save(restaurant);
        if (Array.isArray(specialDishes) && specialDishes.length > 0) {
            await this.replaceSpecialDishes(savedRestaurant.id, specialDishes);
        }
        return await this.restaurantRepository.findOneOrFail({
            where: { id: savedRestaurant.id },
            relations: [
                'menuImages',
                'dishImages',
                'specialDishes',
                'specialDishes.file',
            ],
        });
    }
    async updateByPlaceId(placeId, updateRestaurantDto) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { placeId },
            relations: ['menuImages', 'dishImages', 'specialDishes', 'specialDishes.file'],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant for place ID ${placeId} not found`);
        }
        const { menuImageIds, dishImageIds, specialDishes, ...updateData } = updateRestaurantDto;
        await this.updateFileRelations(restaurant, menuImageIds, dishImageIds);
        Object.assign(restaurant, updateData);
        const saved = await this.restaurantRepository.save(restaurant);
        if (specialDishes !== undefined) {
            await this.replaceSpecialDishes(saved.id, specialDishes || []);
        }
        return await this.restaurantRepository.findOneOrFail({
            where: { id: saved.id },
            relations: [
                'menuImages',
                'dishImages',
                'specialDishes',
                'specialDishes.file',
            ],
        });
    }
    async replaceSpecialDishes(restaurantId, specialDishes) {
        await this.restaurantSpecialDishRepository.delete({ restaurantId });
        if (!specialDishes.length)
            return;
        const fileIds = Array.from(new Set(specialDishes
            .map((d) => d?.imageId)
            .filter((v) => typeof v === 'number' && Number.isFinite(v))));
        const files = fileIds.length
            ? await this.fileRepository.findByIds(fileIds)
            : [];
        const fileById = new Map(files.map((f) => [f.id, f]));
        const rows = specialDishes
            .filter((d) => fileById.has(d.imageId))
            .map((d) => this.restaurantSpecialDishRepository.create({
            restaurantId,
            fileId: d.imageId,
            file: fileById.get(d.imageId),
            title: typeof d.title === 'string' ? d.title.trim().slice(0, 255) : null,
            description: typeof d.description === 'string' ? d.description.trim() : null,
        }));
        if (rows.length) {
            await this.restaurantSpecialDishRepository.save(rows);
        }
    }
    async updateFileRelations(restaurant, menuImageIds, dishImageIds) {
        if (menuImageIds !== undefined) {
            restaurant.menuImages = menuImageIds.length
                ? await this.fileRepository.findByIds(menuImageIds)
                : [];
        }
        if (dishImageIds !== undefined) {
            restaurant.dishImages = dishImageIds.length
                ? await this.fileRepository.findByIds(dishImageIds)
                : [];
        }
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(restaurant_special_dish_entity_1.RestaurantSpecialDish)),
    __param(2, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __param(3, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map