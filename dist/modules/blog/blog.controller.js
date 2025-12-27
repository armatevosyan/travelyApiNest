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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorators_1 = require("../../common/decorators/roles.decorators");
const role_types_1 = require("../roles/role.types");
const blog_service_1 = require("./blog.service");
const nestjs_i18n_1 = require("nestjs-i18n");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const user_entity_1 = require("../users/user.entity");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
const common_2 = require("@nestjs/common");
let BlogController = class BlogController {
    blogService;
    i18n;
    constructor(blogService, i18n) {
        this.blogService = blogService;
        this.i18n = i18n;
    }
    async create(user, data) {
        const blog = await this.blogService.create(user, data);
        return {
            message: this.i18n.translate('t.BLOG_CREATED_SUCCESSFULLY'),
            data: blog,
        };
    }
    async home(page, limit, categoryId, category_id, s) {
        const result = await this.blogService.home({
            page: page,
            perPage: limit ?? undefined,
            categoryId: categoryId ?? category_id,
            keyword: s,
        });
        return {
            message: this.i18n.translate('t.BLOG_HOME_RETRIEVED_SUCCESSFULLY'),
            ...result,
        };
    }
    async update(id, user, data) {
        const blog = await this.blogService.update(id, user, data);
        return {
            message: this.i18n.translate('t.BLOG_UPDATED_SUCCESSFULLY'),
            data: blog,
        };
    }
    async find(id) {
        const result = await this.blogService.find(id);
        return {
            message: this.i18n.translate('t.BLOG_RETRIEVED_SUCCESSFULLY'),
            ...result,
        };
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, user_decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_blog_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('home'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('categoryId')),
    __param(3, (0, common_1.Query)('category_id')),
    __param(4, (0, common_1.Query)('s')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "home", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN, role_types_1.ERoles.USER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, user_decorators_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        update_blog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "find", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService,
        nestjs_i18n_1.I18nService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map