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
exports.PlaceController = void 0;
const common_1 = require("@nestjs/common");
const place_service_1 = require("./place.service");
const place_dto_1 = require("./place.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const user_entity_1 = require("../users/user.entity");
const nestjs_i18n_1 = require("nestjs-i18n");
const category_service_1 = require("../categories/category.service");
let PlaceController = class PlaceController {
    placeService;
    categoryService;
    i18n;
    constructor(placeService, categoryService, i18n) {
        this.placeService = placeService;
        this.categoryService = categoryService;
        this.i18n = i18n;
    }
    async create(user, data) {
        const category = await this.categoryService.findOne(data.categoryId);
        if (!category) {
            throw new common_1.HttpException(this.i18n.translate('t.CATEGORY_NOT_FOUND'), common_1.HttpStatus.NOT_FOUND);
        }
        const place = await this.placeService.create(user.id, data);
        return {
            message: this.i18n.translate('t.PLACE_CREATED_SUCCESSFULLY'),
            data: place,
        };
    }
    async findAll(query) {
        const { places, total } = await this.placeService.findAll(query);
        return {
            message: this.i18n.translate('t.PLACES_RETRIEVED_SUCCESSFULLY'),
            data: places,
            pagination: {
                total,
                page: query.page || 0,
                limit: query.limit || 10,
                totalPages: Math.ceil(total / (query.limit || 10)),
            },
        };
    }
    async findMyPlaces(user) {
        const places = await this.placeService.findByUser(user.id);
        return {
            message: this.i18n.translate('t.MY_PLACES_RETRIEVED_SUCCESSFULLY'),
            data: places,
        };
    }
    async findBySlug(slug) {
        const place = await this.placeService.findBySlug(slug);
        return {
            message: this.i18n.translate('t.PLACE_RETRIEVED_SUCCESSFULLY'),
            data: place,
        };
    }
    async findOne(id) {
        const place = await this.placeService.findOne(id);
        return {
            message: this.i18n.translate('t.PLACE_RETRIEVED_SUCCESSFULLY'),
            data: place,
        };
    }
    async update(id, user, data) {
        if (data.categoryId) {
            const category = await this.categoryService.findOne(data.categoryId);
            if (!category) {
                throw new common_1.HttpException(this.i18n.translate('t.CATEGORY_NOT_FOUND'), common_1.HttpStatus.NOT_FOUND);
            }
        }
        const place = await this.placeService.update(id, user.id, data);
        return {
            message: this.i18n.translate('t.PLACE_UPDATED_SUCCESSFULLY'),
            data: place,
        };
    }
    async remove(id, user) {
        await this.placeService.remove(id, user.id);
        return {
            message: this.i18n.translate('t.PLACE_DELETED_SUCCESSFULLY'),
        };
    }
};
exports.PlaceController = PlaceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, user_decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, place_dto_1.CreatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_dto_1.PlaceQueryDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findMyPlaces", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorators_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        place_dto_1.UpdatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "remove", null);
exports.PlaceController = PlaceController = __decorate([
    (0, common_1.Controller)('places'),
    __metadata("design:paramtypes", [place_service_1.PlaceService,
        category_service_1.CategoryService,
        nestjs_i18n_1.I18nService])
], PlaceController);
//# sourceMappingURL=place.controller.js.map