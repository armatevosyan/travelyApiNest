"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_service_1 = require("./blog.service");
const blog_controller_1 = require("./blog.controller");
const blog_entity_1 = require("./blog.entity");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const users_module_1 = require("../users/users.module");
const category_module_1 = require("../categories/category.module");
const jwt_1 = require("@nestjs/jwt");
const files_module_1 = require("../files/files.module");
let BlogModule = class BlogModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'blog', method: common_1.RequestMethod.POST });
    }
};
exports.BlogModule = BlogModule;
exports.BlogModule = BlogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([blog_entity_1.Blog]),
            users_module_1.UsersModule,
            category_module_1.CategoryModule,
            files_module_1.FilesModule,
        ],
        providers: [blog_service_1.BlogService, jwt_1.JwtService],
        controllers: [blog_controller_1.BlogController],
        exports: [blog_service_1.BlogService, typeorm_1.TypeOrmModule],
    })
], BlogModule);
//# sourceMappingURL=blog.module.js.map