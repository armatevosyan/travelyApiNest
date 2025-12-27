"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const jwt_1 = require("@nestjs/jwt");
const role_entity_1 = require("../roles/role.entity");
const auth_service_1 = require("../auth/auth.service");
const email_module_1 = require("../email/email.module");
let UsersModule = class UsersModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'users/me', method: common_1.RequestMethod.GET }, { path: 'users/profile', method: common_1.RequestMethod.PATCH }, { path: 'users/profile-image', method: common_1.RequestMethod.POST }, { path: 'users/change-password', method: common_1.RequestMethod.POST }, { path: 'users/deactivate-account', method: common_1.RequestMethod.POST });
    }
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, role_entity_1.Role]), email_module_1.EmailModule],
        providers: [user_service_1.UserService, jwt_1.JwtService, auth_service_1.AuthService],
        controllers: [user_controller_1.UserController],
        exports: [typeorm_1.TypeOrmModule, user_service_1.UserService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map