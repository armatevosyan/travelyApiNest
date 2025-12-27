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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./category.entity");
const location_entity_1 = require("../locations/location.entity");
let CategoryService = class CategoryService {
    categoryRepo;
    locationRepo;
    constructor(categoryRepo, locationRepo) {
        this.categoryRepo = categoryRepo;
        this.locationRepo = locationRepo;
    }
    async create(createCategoryDto) {
        const existingCategory = await this.categoryRepo.findOne({
            where: { name: createCategoryDto.name },
        });
        if (existingCategory) {
            throw new common_1.BadRequestException('Category with this name already exists');
        }
        if (createCategoryDto.parentId) {
            const parent = await this.categoryRepo.findOne({
                where: { id: createCategoryDto.parentId },
            });
            if (!parent) {
                throw new common_1.BadRequestException('Parent category not found');
            }
        }
        const category = this.categoryRepo.create(createCategoryDto);
        return this.categoryRepo.save(category);
    }
    async findAll(query = {}) {
        const { search, isActive, parentId, onlyParents, onlyChildren, page, limit, } = query;
        const queryBuilder = this.categoryRepo
            .createQueryBuilder('category')
            .leftJoinAndSelect('category.parent', 'parent')
            .leftJoinAndSelect('category.children', 'children');
        if (search) {
            queryBuilder.andWhere('(category.name ILIKE :search OR category.description ILIKE :search)', { search: `%${search}%` });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('category.isActive = :isActive', { isActive });
        }
        if (parentId !== undefined) {
            if (parentId === null) {
                queryBuilder.andWhere('category.parentId IS NULL');
            }
            else {
                queryBuilder.andWhere('category.parentId = :parentId', { parentId });
            }
        }
        if (onlyParents) {
            queryBuilder.andWhere('category.parentId IS NULL');
        }
        if (onlyChildren) {
            queryBuilder.andWhere('category.parentId IS NOT NULL');
        }
        if (page && limit) {
            const skip = (page - 1) * limit;
            queryBuilder.skip(skip).take(limit);
        }
        queryBuilder
            .orderBy('category.sortOrder', 'ASC')
            .addOrderBy('category.name', 'ASC');
        const [data, total] = await queryBuilder.getManyAndCount();
        return { data, total };
    }
    async findOne(id) {
        const category = await this.categoryRepo.findOne({
            where: { id },
            relations: ['parent', 'children'],
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
            const existingCategory = await this.categoryRepo.findOne({
                where: { name: updateCategoryDto.name },
            });
            if (existingCategory) {
                throw new common_1.BadRequestException('Category with this name already exists');
            }
        }
        if (updateCategoryDto.parentId !== undefined) {
            if (updateCategoryDto.parentId === id) {
                throw new common_1.BadRequestException('Category cannot be its own parent');
            }
            if (updateCategoryDto.parentId !== null) {
                const parent = await this.categoryRepo.findOne({
                    where: { id: updateCategoryDto.parentId },
                });
                if (!parent) {
                    throw new common_1.BadRequestException('Parent category not found');
                }
                if (await this.wouldCreateCircularReference(id, updateCategoryDto.parentId)) {
                    throw new common_1.BadRequestException('Cannot set parent: would create circular reference');
                }
            }
        }
        Object.assign(category, updateCategoryDto);
        return this.categoryRepo.save(category);
    }
    async remove(id) {
        const category = await this.findOne(id);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const childrenCount = await this.categoryRepo.count({
            where: { parentId: id },
        });
        if (childrenCount > 0) {
            throw new common_1.BadRequestException('Cannot delete category with children. Please delete or move children first.');
        }
        await this.categoryRepo.softDelete(id);
    }
    async findChildren(parentId) {
        return this.categoryRepo.find({
            where: { parentId, isActive: true },
            order: { sortOrder: 'ASC', name: 'ASC' },
        });
    }
    async listLegacy(categoryId) {
        const qb = this.categoryRepo
            .createQueryBuilder('category')
            .leftJoinAndSelect('category.children', 'children')
            .where('category.isActive = :isActive', { isActive: true });
        if (categoryId === null || categoryId === undefined) {
            qb.andWhere('category.parentId IS NULL');
        }
        else {
            qb.andWhere('category.parentId = :parentId', { parentId: categoryId });
        }
        qb.orderBy('category.sortOrder', 'ASC').addOrderBy('category.name', 'ASC');
        const categories = await qb.getMany();
        for (const c of categories) {
            if (Array.isArray(c.children)) {
                c.children = c.children
                    .filter((ch) => ch.isActive)
                    .sort((a, b) => {
                    if (a.sortOrder !== b.sortOrder)
                        return a.sortOrder - b.sortOrder;
                    return a.name.localeCompare(b.name);
                });
            }
        }
        return categories;
    }
    async toggleActive(id) {
        const category = await this.findOne(id);
        category.isActive = !category.isActive;
        return this.categoryRepo.save(category);
    }
    async getDiscoveryCategories(country) {
        let location = null;
        if (country) {
            location = await this.locationRepo.findOne({
                where: {
                    name: country,
                    type: location_entity_1.LocationType.COUNTRY,
                },
            });
        }
        const categories = await this.categoryRepo
            .createQueryBuilder('category')
            .leftJoinAndSelect('category.places', 'featuredProducts')
            .leftJoinAndSelect('featuredProducts.user', 'author')
            .leftJoinAndSelect('featuredProducts.category', 'placeCategory')
            .where('category.parentId IS NULL')
            .andWhere('category.isActive = :isActive', { isActive: true })
            .andWhere('(featuredProducts.id IS NULL OR (featuredProducts.countryId = :countryId AND featuredProducts.isActive = :isActive))', {
            countryId: location?.id || null,
            isActive: true,
        })
            .orderBy('category.sortOrder', 'ASC')
            .addOrderBy('category.name', 'ASC')
            .getMany();
        return categories.slice(0, 10);
    }
    async wouldCreateCircularReference(categoryId, newParentId) {
        let currentParentId = newParentId;
        while (currentParentId !== null) {
            if (currentParentId === categoryId) {
                return true;
            }
            const parent = await this.categoryRepo.findOne({
                where: { id: currentParentId },
                select: ['parentId'],
            });
            currentParentId = parent?.parentId || null;
        }
        return false;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map