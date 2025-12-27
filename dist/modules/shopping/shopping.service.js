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
exports.ShoppingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shopping_entity_1 = require("./shopping.entity");
const place_entity_1 = require("../places/place.entity");
let ShoppingService = class ShoppingService {
    shoppingRepository;
    placeRepository;
    constructor(shoppingRepository, placeRepository) {
        this.shoppingRepository = shoppingRepository;
        this.placeRepository = placeRepository;
    }
    async create(createShoppingDto) {
        const place = await this.placeRepository.findOne({
            where: { id: createShoppingDto.placeId },
        });
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${createShoppingDto.placeId} not found`);
        }
        const existingShopping = await this.shoppingRepository.findOne({
            where: { placeId: createShoppingDto.placeId },
        });
        if (existingShopping) {
            throw new common_1.BadRequestException(`Shopping already exists for place ID ${createShoppingDto.placeId}`);
        }
        const shopping = this.shoppingRepository.create(createShoppingDto);
        return await this.shoppingRepository.save(shopping);
    }
    async findOne(id) {
        const shopping = await this.shoppingRepository.findOne({
            where: { id },
        });
        if (!shopping) {
            throw new common_1.NotFoundException(`Shopping with ID ${id} not found`);
        }
        return shopping;
    }
    async findByPlaceId(placeId) {
        const shopping = await this.shoppingRepository.findOne({
            where: { placeId },
        });
        if (!shopping) {
            throw new common_1.NotFoundException(`Shopping for place ID ${placeId} not found`);
        }
        return shopping;
    }
    async update(id, updateShoppingDto) {
        const shopping = await this.findOne(id);
        Object.assign(shopping, updateShoppingDto);
        return await this.shoppingRepository.save(shopping);
    }
    async updateByPlaceId(placeId, updateShoppingDto) {
        const shopping = await this.shoppingRepository.findOne({
            where: { placeId },
        });
        if (!shopping) {
            throw new common_1.NotFoundException(`Shopping for place ID ${placeId} not found`);
        }
        Object.assign(shopping, updateShoppingDto);
        return await this.shoppingRepository.save(shopping);
    }
};
exports.ShoppingService = ShoppingService;
exports.ShoppingService = ShoppingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shopping_entity_1.Shopping)),
    __param(1, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ShoppingService);
//# sourceMappingURL=shopping.service.js.map