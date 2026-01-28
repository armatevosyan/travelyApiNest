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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const user_service_1 = require("./user.service");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const user_entity_1 = require("./user.entity");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorators_1 = require("../../common/decorators/roles.decorators");
const role_types_1 = require("../roles/role.types");
const auth_service_1 = require("../auth/auth.service");
const nestjs_i18n_1 = require("nestjs-i18n");
const auth_dto_1 = require("../auth/auth.dto");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    userService;
    authService;
    i18n;
    constructor(userService, authService, i18n) {
        this.userService = userService;
        this.authService = authService;
        this.i18n = i18n;
    }
    me(user, role) {
        console.log(role, 'role');
        return this.userService.runUserData(user);
    }
    async updateProfile(user, data) {
        const updatedUser = await this.userService.update(user.id, {
            ...data,
            description: data.description ?? undefined,
        });
        return {
            message: this.i18n.translate('t.PROFILE_UPDATED_SUCCESSFULLY'),
            data: updatedUser,
        };
    }
    async updateProfileImage(user, file) {
        if (!file) {
            throw new common_1.BadRequestException(this.i18n.translate('t.FILE_REQUIRED'));
        }
        const allowedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/avif',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(this.i18n.translate('t.INVALID_IMAGE_TYPE'));
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException(this.i18n.translate('t.IMAGE_TOO_LARGE'));
        }
        const updatedUser = await this.userService.updateProfileImage(user.id, file);
        return {
            message: this.i18n.translate('t.PROFILE_IMAGE_UPDATED_SUCCESSFULLY'),
            data: updatedUser,
        };
    }
    async changePassword(data, user) {
        const hashedNewPassword = await this.authService.hashPassword(data.password);
        await this.userService.update(user.id, {
            password: hashedNewPassword,
        });
        return {
            message: this.i18n.translate('t.PASSWORD_CHANGED_SUCCESSFULLY'),
        };
    }
    async deactivateAccount(user) {
        await this.userService.update(user.id, {
            isActive: false,
            deactivatedAt: new Date(),
        });
        return {
            message: this.i18n.translate('t.ACCOUNT_DEACTIVATED_SUCCESSFULLY'),
        };
    }
    async updateNotificationSetting(user, data) {
        const updatedUser = await this.userService.updateNotificationSetting(user.id, data.notificationsEnabled);
        return {
            message: this.i18n.translate('t.NOTIFICATION_UPDATE_SUCCESS'),
            data: updatedUser,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.USER, role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __param(0, (0, user_decorators_1.User)()),
    __param(1, (0, user_decorators_1.User)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "me", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.USER, role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, user_decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, user_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('profile-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, user_decorators_1.User)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfileImage", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ChangePasswordDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('deactivate-account'),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.USER, role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __param(0, (0, user_decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivateAccount", null);
__decorate([
    (0, common_1.Post)('notification-setting'),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.USER, role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, user_decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        user_dto_1.UpdateNotificationSettingDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateNotificationSetting", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        nestjs_i18n_1.I18nService])
], UserController);
//# sourceMappingURL=user.controller.js.map