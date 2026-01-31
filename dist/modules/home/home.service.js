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
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../categories/category.entity");
const location_entity_1 = require("../locations/location.entity");
const place_entity_1 = require("../places/place.entity");
const blog_entity_1 = require("../blog/blog.entity");
const wishlist_entity_1 = require("../wishlist/wishlist.entity");
const files_service_1 = require("../files/files.service");
const file_relation_entity_1 = require("../files/entities/file-relation.entity");
let HomeService = class HomeService {
    categoryRepository;
    locationRepository;
    placeRepository;
    blogRepository;
    wishlistRepository;
    filesService;
    constructor(categoryRepository, locationRepository, placeRepository, blogRepository, wishlistRepository, filesService) {
        this.categoryRepository = categoryRepository;
        this.locationRepository = locationRepository;
        this.placeRepository = placeRepository;
        this.blogRepository = blogRepository;
        this.wishlistRepository = wishlistRepository;
        this.filesService = filesService;
    }
    async getInit(country, userId) {
        let location = null;
        if (country) {
            location = await this.locationRepository.findOne({
                where: {
                    name: country,
                    type: location_entity_1.LocationType.COUNTRY,
                },
            });
        }
        const sliders = [];
        const categories = await this.categoryRepository.find({
            where: {
                parentId: (0, typeorm_2.IsNull)(),
                isActive: true,
            },
            relations: ['children'],
            order: {
                sortOrder: 'ASC',
                name: 'ASC',
            },
        });
        const locations = await this.locationRepository.find({
            where: {
                type: location_entity_1.LocationType.COUNTRY,
            },
            relations: ['image'],
            order: {
                name: 'ASC',
            },
        });
        const locationIds = locations.map((l) => l.id);
        const placesCountByCountryId = new Map();
        if (locationIds.length > 0) {
            const rows = await this.placeRepository
                .createQueryBuilder('place')
                .select('place.countryId', 'countryId')
                .addSelect('COUNT(place.id)', 'count')
                .where('place.countryId IN (:...countryIds)', {
                countryIds: locationIds,
            })
                .andWhere('place.isActive = :isActive', { isActive: true })
                .groupBy('place.countryId')
                .getRawMany();
            for (const row of rows) {
                const countryId = Number(row.countryId);
                const count = Number(row.count);
                if (!Number.isNaN(countryId) && !Number.isNaN(count)) {
                    placesCountByCountryId.set(countryId, count);
                }
            }
        }
        const recentPostsQuery = this.placeRepository
            .createQueryBuilder('place')
            .leftJoinAndSelect('place.category', 'category')
            .leftJoinAndSelect('place.user', 'user')
            .leftJoinAndSelect('place.country', 'country')
            .where('place.isActive = :isActive', { isActive: true })
            .orderBy('place.createdAt', 'DESC')
            .take(10);
        if (location) {
            recentPostsQuery.andWhere('place.countryId = :countryId', {
                countryId: location.id,
            });
        }
        const recentPosts = await recentPostsQuery.getMany();
        const wishlistedPlaceIds = new Set();
        if (userId && recentPosts.length > 0) {
            const ids = recentPosts.map((p) => p.id);
            const rows = await this.wishlistRepository.find({
                select: ['placeId'],
                where: {
                    userId,
                    placeId: (0, typeorm_2.In)(ids),
                },
            });
            for (const row of rows)
                wishlistedPlaceIds.add(row.placeId);
        }
        const relatedBlogs = await this.blogRepository.find({
            relations: ['user', 'category'],
            order: {
                createdAt: 'DESC',
            },
            take: 5,
        });
        const formattedSliders = sliders;
        const formattedCategories = categories.map((category) => {
            const formattedChildren = (category.children || []).map((sub) => ({
                termId: sub.id,
                name: sub.name,
                count: 0,
                image: undefined,
                icon: sub.icon,
                color: sub.color,
                taxonomy: 'category',
                hasChild: false,
                id: sub.id,
            }));
            return {
                termId: category.id,
                name: category.name,
                count: 0,
                image: undefined,
                icon: category.icon,
                color: category.color,
                taxonomy: 'category',
                hasChild: category.children && category.children.length > 0,
                children: formattedChildren,
                id: category.id,
            };
        });
        const formattedLocations = locations.map((loc) => ({
            termId: loc.id,
            name: loc.name,
            count: placesCountByCountryId.get(loc.id) ?? 0,
            image: loc.image
                ? {
                    id: loc.image.id,
                    full: {
                        url: loc.image.url,
                    },
                    thumb: {
                        url: loc.image.url,
                    },
                }
                : undefined,
            icon: null,
            color: null,
            taxonomy: 'location',
            hasChild: false,
            id: loc.id,
        }));
        const formattedRecentPosts = await Promise.all(recentPosts.map(async (place) => {
            const placeFileRelations = await this.filesService.getFileRelationsForEntity(file_relation_entity_1.FileRelationType.PLACE, place.id);
            const placeImage = placeFileRelations.length > 0 ? placeFileRelations[0].file : null;
            let userImage = null;
            if (place.user?.profileImageId) {
                const userFileRelations = await this.filesService.getFileRelationsForEntity(file_relation_entity_1.FileRelationType.USER, place.user.id);
                userImage =
                    userFileRelations.length > 0 ? userFileRelations[0].file : null;
            }
            return {
                ...place,
                useViewPhone: place.phone,
                id: place.id,
                postTitle: place.name,
                postDate: place.createdAt,
                ratingAvg: place.averageRating,
                ratingCount: place.reviewCount,
                wishlist: wishlistedPlaceIds.has(place.id),
                image: placeImage
                    ? {
                        id: placeImage.id,
                        full: {
                            url: this.filesService.generatePublicUrl(placeImage.bucketPath),
                        },
                        thumb: {
                            url: this.filesService.generatePublicUrl(placeImage.bucketPath),
                        },
                    }
                    : undefined,
                author: place.user
                    ? {
                        id: place.user.id,
                        name: place.user.fullName,
                        userPhoto: userImage
                            ? this.filesService.generatePublicUrl(userImage.bucketPath)
                            : null,
                    }
                    : undefined,
                category: place.category
                    ? {
                        termId: place.category.id,
                        name: place.category.name,
                        taxonomy: 'category',
                    }
                    : undefined,
                priceMin: place.minPrice,
                priceMax: place.maxPrice,
                address: place.address,
                bookingUse: false,
                bookingPriceDisplay: place.price
                    ? `${Number(place.price).toFixed(2)}$`
                    : '0.00$',
            };
        }));
        const formattedNews = await Promise.all(relatedBlogs.map(async (blog) => {
            let blogImage = null;
            if (blog.image) {
                blogImage = blog.image;
            }
            let userImage = null;
            if (blog.user?.profileImageId) {
                const userFileRelations = await this.filesService.getFileRelationsForEntity(file_relation_entity_1.FileRelationType.USER, blog.user.id);
                userImage =
                    userFileRelations.length > 0 ? userFileRelations[0].file : null;
            }
            return {
                id: blog.id,
                postTitle: blog.title,
                postDate: blog.createdAt,
                postStatus: blog.publishedAt ? 'publish' : 'draft',
                postContent: blog.description,
                commentCount: 0,
                guid: null,
                image: blogImage
                    ? {
                        id: 0,
                        full: { url: blogImage },
                        thumb: { url: blogImage },
                    }
                    : undefined,
                author: blog.user
                    ? {
                        id: blog.user.id,
                        name: blog.user.fullName,
                        firstName: blog.user.fullName?.split(' ')[0] || '',
                        lastName: blog.user.fullName?.split(' ').slice(1).join(' ') || '',
                        userPhoto: userImage
                            ? this.filesService.generatePublicUrl(userImage.bucketPath)
                            : null,
                        description: blog.user.description || null,
                    }
                    : undefined,
                categories: blog.category
                    ? [
                        {
                            termId: blog.category.id,
                            name: blog.category.name,
                            taxonomy: 'category',
                        },
                    ]
                    : [],
                comments: [],
                related: relatedBlogs
                    .filter((b) => b.id !== blog.id)
                    .slice(0, 3)
                    .map((related) => ({
                    id: related.id,
                    postTitle: related.title,
                    postDate: related.createdAt,
                    postContent: related.description?.substring(0, 150) + '...' || '',
                    commentCount: 0,
                    image: related.image
                        ? {
                            id: 0,
                            full: { url: related.image },
                            thumb: { url: related.image },
                        }
                        : undefined,
                    author: related.user
                        ? {
                            id: related.user.id,
                            name: related.user.fullName,
                            userPhoto: null,
                        }
                        : undefined,
                })),
            };
        }));
        const formattedWidgets = [];
        return {
            sliders: formattedSliders,
            categories: formattedCategories,
            locations: formattedLocations,
            recent_posts: formattedRecentPosts,
            wishlist_places: formattedRecentPosts.filter((p) => p.wishlist),
            widgets: formattedWidgets,
            news: formattedNews,
        };
    }
};
exports.HomeService = HomeService;
exports.HomeService = HomeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __param(2, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __param(3, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __param(4, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        files_service_1.FilesService])
], HomeService);
//# sourceMappingURL=home.service.js.map