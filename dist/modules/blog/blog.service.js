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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const category_service_1 = require("../categories/category.service");
const blog_entity_1 = require("./blog.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const files_service_1 = require("../files/files.service");
const file_relation_entity_1 = require("../files/entities/file-relation.entity");
let BlogService = class BlogService {
    userService;
    categoryService;
    blogRepo;
    filesService;
    constructor(userService, categoryService, blogRepo, filesService) {
        this.userService = userService;
        this.categoryService = categoryService;
        this.blogRepo = blogRepo;
        this.filesService = filesService;
    }
    async create(userDto, createBlogDto) {
        const { title, description, image, categoryId, fileId } = createBlogDto;
        const { id } = userDto;
        const currentUser = await this.userService.findById(id);
        if (!currentUser) {
            throw new common_1.BadRequestException('t.USER_NOT_FOUND');
        }
        const existingBlog = await this.blogRepo.findOne({ where: { title } });
        if (existingBlog) {
            throw new common_1.BadRequestException('t.BLOG_TITLE_ALREADY_EXISTS');
        }
        const category = await this.categoryService.findOne(categoryId);
        if (!category) {
            throw new common_1.BadRequestException('t.CATEGORY_NOT_FOUND');
        }
        const blog = this.blogRepo.create({
            title,
            description,
            image,
            user: currentUser,
            category,
            publishedAt: null,
            userId: currentUser.id,
            categoryId: category.id,
        });
        const saved = await this.blogRepo.save(blog);
        if (fileId) {
            try {
                await this.filesService.attachFileToEntity(fileId, file_relation_entity_1.FileRelationType.BLOG, saved.id);
                const files = await this.filesService.getFilesForEntity(file_relation_entity_1.FileRelationType.BLOG, saved.id);
                if (files?.[0]?.url) {
                    saved.image = files[0].url;
                    await this.blogRepo.save(saved);
                }
            }
            catch (e) {
                console.log('Error attaching file to blog: ', e.message);
            }
        }
        return saved;
    }
    async update(blogId, userDto, updateBlogDto) {
        const { id } = userDto;
        const currentUser = await this.userService.findById(id);
        if (!currentUser) {
            throw new common_1.BadRequestException('t.USER_NOT_FOUND');
        }
        const blog = await this.blogRepo.findOne({ where: { id: blogId } });
        if (!blog) {
            throw new common_1.NotFoundException('t.BLOG_NOT_FOUND');
        }
        if (blog.userId !== currentUser.id) {
            throw new common_1.BadRequestException('t.BLOG_UPDATE_FORBIDDEN');
        }
        const { title, description, image, categoryId, fileId } = updateBlogDto;
        if (title && title !== blog.title) {
            const duplicate = await this.blogRepo.findOne({ where: { title } });
            if (duplicate && duplicate.id !== blog.id) {
                throw new common_1.BadRequestException('t.BLOG_TITLE_ALREADY_EXISTS');
            }
            blog.title = title;
        }
        if (typeof description !== 'undefined')
            blog.description = description;
        if (typeof image !== 'undefined')
            blog.image = image;
        if (typeof categoryId !== 'undefined') {
            const category = await this.categoryService.findOne(categoryId);
            if (!category) {
                throw new common_1.BadRequestException('t.CATEGORY_NOT_FOUND');
            }
            blog.categoryId = category.id;
            blog.category = category;
        }
        const updated = await this.blogRepo.save(blog);
        if (fileId) {
            try {
                await this.filesService.attachFileToEntity(fileId, file_relation_entity_1.FileRelationType.BLOG, updated.id);
                const files = await this.filesService.getFilesForEntity(file_relation_entity_1.FileRelationType.BLOG, updated.id);
                if (files?.[0]?.url) {
                    updated.image = files[0].url;
                    await this.blogRepo.save(updated);
                }
            }
            catch (e) {
                console.log('Error attaching file to blog: ', e.message);
            }
        }
        return updated;
    }
    async home({ page = 1, perPage = 10, categoryId, keyword, }) {
        const take = Math.max(1, Math.min(50, Number(perPage) || 10));
        const currentPage = Math.max(1, Number(page) || 1);
        const skip = (currentPage - 1) * take;
        const qb = this.blogRepo
            .createQueryBuilder('blog')
            .leftJoinAndSelect('blog.user', 'user')
            .leftJoinAndSelect('blog.category', 'category')
            .orderBy('blog.createdAt', 'DESC')
            .take(take)
            .skip(skip);
        if (categoryId) {
            qb.andWhere('blog.categoryId = :categoryId', { categoryId });
        }
        if (keyword) {
            qb.andWhere('(blog.title ILIKE :kw OR blog.description ILIKE :kw)', {
                kw: `%${keyword}%`,
            });
        }
        const [rows, count] = await qb.getManyAndCount();
        for (const item of rows) {
            if (!item.image) {
                try {
                    const files = await this.filesService.getFilesForEntity(file_relation_entity_1.FileRelationType.BLOG, item.id);
                    if (files?.[0]?.url)
                        item.image = files[0].url;
                }
                catch (e) {
                    console.log('Error getting files for blog: ', e.message);
                }
            }
        }
        const { data: parentCategories } = await this.categoryService.findAll({
            onlyParents: true,
            page: 1,
            limit: 100,
        });
        const categoriesWithCounts = await Promise.all(parentCategories.map(async (cat) => {
            const parentCount = await this.blogRepo.count({
                where: { categoryId: cat.id },
            });
            const children = (cat.children || []).slice();
            const childrenWithCounts = await Promise.all(children.map(async (sub) => ({
                ...sub,
                __count: await this.blogRepo.count({
                    where: { categoryId: sub.id },
                }),
            })));
            const totalCount = parentCount +
                childrenWithCounts.reduce((a, b) => a + (b.__count || 0), 0);
            return {
                ...cat,
                __count: totalCount,
                __children: childrenWithCounts,
            };
        }));
        categoriesWithCounts.sort((a, b) => (b.__count || 0) - (a.__count || 0));
        const topCategories = categoriesWithCounts.slice(0, 10);
        const formattedCategories = topCategories.map((category) => ({
            term_id: category.id,
            name: category.name,
            count: category.__count || 0,
            image: undefined,
            icon: category.icon || undefined,
            color: category.color || undefined,
            taxonomy: 'category',
            has_child: (category.__children && category.__children.length > 0) || false,
            parent_id: category.parentId || null,
            subcategories: (category.__children || []).map((sub) => ({
                term_id: sub.id,
                name: sub.name,
                count: sub.__count || 0,
                image: undefined,
                icon: sub.icon || undefined,
                color: sub.color || undefined,
                taxonomy: 'category',
                has_child: (sub.children && sub.children.length > 0) || false,
                parent_id: sub.parentId || category.id,
            })),
        }));
        const stickyQb = this.blogRepo
            .createQueryBuilder('blog')
            .leftJoinAndSelect('blog.user', 'user')
            .leftJoinAndSelect('blog.category', 'category')
            .orderBy('blog.createdAt', 'DESC')
            .take(1);
        if (keyword) {
            stickyQb.andWhere('(blog.title ILIKE :kw OR blog.description ILIKE :kw)', {
                kw: `%${keyword}%`,
            });
        }
        if (categoryId)
            stickyQb.andWhere('blog.categoryId = :categoryId', { categoryId });
        const stickyBlog = (await stickyQb.getMany())[0];
        if (stickyBlog && !stickyBlog.image) {
            try {
                const files = await this.filesService.getFilesForEntity(file_relation_entity_1.FileRelationType.BLOG, stickyBlog.id);
                if (files?.[0]?.url)
                    stickyBlog.image = files[0].url;
            }
            catch (e) {
                console.log('Error getting files for sticky blog: ', e.message);
            }
        }
        const blogs = rows.map((blog) => ({
            id: blog.id,
            title: blog.title,
            post_date: blog.createdAt,
            status: blog.publishedAt ? 'publish' : 'draft',
            description: blog.description,
            post_excerpt: (blog.description ? blog.description.substring(0, 150) : '') + '...',
            numComments: 0,
            link: undefined,
            image: blog.image
                ? {
                    id: blog.id,
                    full: { url: blog.image },
                    thumb: { url: blog.image },
                }
                : undefined,
            author: blog.user
                ? {
                    id: blog.user.id,
                    name: blog.user.fullName,
                    first_name: blog.user.fullName,
                    last_name: undefined,
                    user_photo: blog.user.profileImage?.url,
                }
                : undefined,
            categories: blog.category
                ? [
                    {
                        term_id: blog.category.id,
                        name: blog.category.name,
                        taxonomy: 'category',
                    },
                ]
                : [],
        }));
        const sticky = stickyBlog
            ? {
                id: stickyBlog.id,
                title: stickyBlog.title,
                post_date: stickyBlog.createdAt,
                status: stickyBlog.publishedAt ? 'publish' : 'draft',
                description: stickyBlog.description,
                post_excerpt: (stickyBlog.description
                    ? stickyBlog.description.substring(0, 150)
                    : '') + '...',
                numComments: 0,
                link: undefined,
                image: stickyBlog.image
                    ? {
                        id: stickyBlog.id,
                        full: { url: stickyBlog.image },
                        thumb: { url: stickyBlog.image },
                    }
                    : undefined,
                author: stickyBlog.user
                    ? {
                        id: stickyBlog.user.id,
                        name: stickyBlog.user.fullName,
                        first_name: stickyBlog.user.fullName,
                        last_name: undefined,
                        user_photo: stickyBlog.user.profileImage?.url,
                    }
                    : undefined,
                categories: stickyBlog.category
                    ? [
                        {
                            term_id: stickyBlog.category.id,
                            name: stickyBlog.category.name,
                            taxonomy: 'category',
                        },
                    ]
                    : [],
            }
            : undefined;
        return {
            success: true,
            data: blogs,
            categories: formattedCategories,
            sticky,
            pagination: {
                page: currentPage,
                per_page: take,
                total: count,
                max_page: Math.ceil(count / take),
            },
        };
    }
    async find(id) {
        const blog = await this.blogRepo.findOne({ where: { id } });
        if (!blog) {
            throw new common_1.NotFoundException('t.BLOG_NOT_FOUND');
        }
        if (!blog.image) {
            try {
                const files = await this.filesService.getFilesForEntity(file_relation_entity_1.FileRelationType.BLOG, blog.id);
                if (files?.[0]?.url)
                    blog.image = files[0].url;
            }
            catch (e) {
                console.log('Error getting files for blog: ', e.message);
            }
        }
        const relatedQb = this.blogRepo
            .createQueryBuilder('b')
            .leftJoinAndSelect('b.user', 'user')
            .leftJoinAndSelect('b.category', 'category')
            .where('b.id != :id', { id: blog.id })
            .andWhere('b.categoryId = :categoryId', { categoryId: blog.categoryId })
            .orderBy('b.createdAt', 'DESC')
            .take(5);
        const relatedRows = await relatedQb.getMany();
        for (const item of relatedRows) {
            if (!item.image) {
                try {
                    const files = await this.filesService.getFilesForEntity(file_relation_entity_1.FileRelationType.BLOG, item.id);
                    if (files?.[0]?.url)
                        item.image = files[0].url;
                }
                catch (e) {
                    console.log('Error getting files for related blog: ', e.message);
                }
            }
        }
        const response = {
            id: blog.id,
            title: blog.title,
            post_date: blog.createdAt,
            status: blog.publishedAt ? 'publish' : 'draft',
            description: blog.description,
            numComments: 0,
            link: undefined,
            image: blog.image
                ? {
                    id: blog.id,
                    full: { url: blog.image },
                    thumb: { url: blog.image },
                }
                : undefined,
            author: blog.user
                ? {
                    id: blog.user.id,
                    name: blog.user.fullName,
                    first_name: blog.user.fullName,
                    last_name: undefined,
                    user_photo: blog.user.profileImage?.url,
                    description: blog.user.description,
                }
                : undefined,
            categories: blog.category
                ? [
                    {
                        term_id: blog.category.id,
                        name: blog.category.name,
                        taxonomy: 'category',
                    },
                ]
                : [],
            comments: [],
            related: relatedRows.map((related) => ({
                id: related.id,
                post_title: related.title,
                post_date: related.createdAt,
                post_content: (related.description ? related.description.substring(0, 150) : '') +
                    '...',
                comment_count: 0,
                image: related.image
                    ? {
                        id: related.id,
                        full: { url: related.image },
                        thumb: { url: related.image },
                    }
                    : undefined,
                author: related.user
                    ? {
                        id: related.user.id,
                        name: related.user.fullName,
                        user_photo: related.user.profileImage?.url,
                    }
                    : undefined,
            })),
        };
        return {
            success: true,
            data: response,
        };
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        category_service_1.CategoryService,
        typeorm_2.Repository,
        files_service_1.FilesService])
], BlogService);
//# sourceMappingURL=blog.service.js.map