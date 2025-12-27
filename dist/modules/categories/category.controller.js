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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./category.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorators_1 = require("../../common/decorators/roles.decorators");
const role_types_1 = require("../roles/role.types");
const nestjs_i18n_1 = require("nestjs-i18n");
let CategoryController = class CategoryController {
    categoryService;
    i18n;
    constructor(categoryService, i18n) {
        this.categoryService = categoryService;
        this.i18n = i18n;
    }
    async create(createCategoryDto) {
        const category = await this.categoryService.create(createCategoryDto);
        return {
            message: this.i18n.translate('t.CATEGORY_CREATED_SUCCESSFULLY'),
            data: category,
        };
    }
    async findAll(query) {
        const result = await this.categoryService.findAll(query);
        return {
            message: this.i18n.translate('t.CATEGORIES_RETRIEVED_SUCCESSFULLY'),
            data: result.data,
            pagination: {
                total: result.total,
                page: query.page,
                limit: query.limit,
                totalPages: Math.ceil(result.total / (query.limit || 0)),
            },
        };
    }
    async legacyList(categoryId) {
        const parentId = categoryId ? Number(categoryId) : null;
        const categories = await this.categoryService.listLegacy(parentId);
        const data = categories.map((category) => ({
            isPro: category.isPro,
            term_id: category.id,
            name: category.name,
            count: undefined,
            image: undefined,
            icon: category.icon,
            color: category.color,
            taxonomy: 'category',
            has_child: Array.isArray(category.children)
                ? category.children.length > 0
                : false,
            parent_id: category.parentId,
            subcategories: (category.children || []).map((subcat) => ({
                term_id: subcat.id,
                name: subcat.name,
                count: undefined,
                image: undefined,
                icon: subcat.icon,
                color: subcat.color,
                taxonomy: 'category',
                has_child: Array.isArray(subcat.children)
                    ? subcat.children.length > 0
                    : false,
                parent_id: subcat.parentId,
            })),
        }));
        return {
            success: true,
            data,
        };
    }
    async listDiscover(country) {
        const categories = await this.categoryService.getDiscoveryCategories(country);
        const data = categories.map((category) => ({
            term_id: category.id,
            name: category.name,
            count: 0,
            image: undefined,
            icon: category.icon,
            color: category.color,
            taxonomy: 'category',
            has_child: false,
            parent_id: category.parentId,
            featuredProducts: (category.places || []).map((product) => ({
                id: product.id,
                post_title: product.name,
                post_date: product.createdAt,
                rating_avg: product.averageRating,
                rating_count: product.reviewCount,
                wishlist: false,
                image: undefined,
                author: product.user
                    ? {
                        id: product.user.id,
                        name: product.user.name,
                        user_photo: product.user.image,
                    }
                    : undefined,
                category: product.category
                    ? {
                        term_id: product.category.id,
                        name: product.category.name,
                        taxonomy: 'category',
                    }
                    : undefined,
                price_min: product.minPrice,
                price_max: product.maxPrice,
                address: product.address,
            })),
        }));
        return {
            success: true,
            data,
        };
    }
    async findOne(id) {
        const category = await this.categoryService.findOne(id);
        return {
            message: this.i18n.translate('t.CATEGORY_RETRIEVED_SUCCESSFULLY'),
            data: category,
        };
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryService.update(id, updateCategoryDto);
        return {
            message: this.i18n.translate('t.CATEGORY_UPDATED_SUCCESSFULLY'),
            data: category,
        };
    }
    async toggleActive(id) {
        const category = await this.categoryService.toggleActive(id);
        return {
            message: this.i18n.translate('t.CATEGORY_STATUS_UPDATED_SUCCESSFULLY'),
            data: category,
        };
    }
    async remove(id) {
        await this.categoryService.remove(id);
        return {
            message: this.i18n.translate('t.CATEGORY_DELETED_SUCCESSFULLY'),
        };
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryQueryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "legacyList", null);
__decorate([
    (0, common_1.Get)('list_discover'),
    __param(0, (0, common_1.Query)('country')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "listDiscover", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-active'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        nestjs_i18n_1.I18nService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map