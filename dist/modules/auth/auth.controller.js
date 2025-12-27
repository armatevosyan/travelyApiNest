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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../users/user.service");
const role_service_1 = require("../roles/role.service");
const role_types_1 = require("../roles/role.types");
const auth_dto_1 = require("./auth.dto");
let AuthController = class AuthController {
    userService;
    authService;
    roleService;
    i18n;
    constructor(userService, authService, roleService, i18n) {
        this.userService = userService;
        this.authService = authService;
        this.roleService = roleService;
        this.i18n = i18n;
    }
    async signUp(data) {
        const existingUser = await this.userService.findByEmail(data.email);
        if (existingUser) {
            throw new common_1.BadRequestException(this.i18n.translate('t.USER_ALREADY_EXISTS'));
        }
        const role = await this.roleService.findByName(role_types_1.ERoles.USER);
        if (!role) {
            throw new common_1.BadRequestException(this.i18n.translate('t.DEFAULT_ROLE_NOT_FOUND'));
        }
        data.password = await this.authService.hashPassword(data.password);
        const { otp, otpExpiration } = this.authService.generateOtp();
        const newUser = await this.userService.create({
            ...data,
            roleId: role.id,
            verifyCode: otp,
            otpExpiration,
            isActive: false,
        });
        await this.authService.sendVerificationEmail(data.email, otp);
        return {
            message: this.i18n.translate('t.USER_REGISTERED_SUCCESS'),
            user: {
                id: newUser.id,
                email: newUser.email,
                fullName: newUser.fullName,
                isActive: false,
            },
        };
    }
    async signIn(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            throw new common_1.UnauthorizedException(this.i18n.translate('t.INVALID_EMAIL_OR_PASSWORD'));
        }
        const isPasswordValid = await this.authService.comparePassword(data.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException(this.i18n.translate('t.INVALID_EMAIL_OR_PASSWORD'));
        }
        if (!user.verifiedAt) {
            throw new common_1.UnauthorizedException(this.i18n.translate('t.EMAIL_VERIFICATION_REQUIRED'));
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException(this.i18n.translate('t.ACCOUNT_DEACTIVATED'));
        }
        const token = this.authService.accessToken(String(user.id), user.role);
        return {
            user: this.userService.runUserData(user),
            token,
        };
    }
    async verifyEmail(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            throw new common_1.BadRequestException(this.i18n.translate('t.USER_NOT_FOUND'));
        }
        if (user.verifiedAt) {
            throw new common_1.BadRequestException(this.i18n.translate('t.EMAIL_ALREADY_VERIFIED'));
        }
        if (!user.verifyCode || user.verifyCode !== data.code) {
            throw new common_1.BadRequestException(this.i18n.translate('t.INVALID_VERIFICATION_CODE'));
        }
        if (user.otpExpiration && new Date() > user.otpExpiration) {
            throw new common_1.BadRequestException(this.i18n.translate('t.VERIFICATION_CODE_EXPIRED'));
        }
        const updatedUser = await this.userService.update(user.id, {
            verifiedAt: new Date(),
            isActive: true,
            verifyCode: null,
            otpExpiration: null,
        });
        const token = this.authService.accessToken(String(user.id), user.role);
        await this.authService.sendWelcomeEmail(data.email, user.fullName);
        return {
            message: this.i18n.translate('t.EMAIL_VERIFIED_SUCCESS'),
            user: updatedUser,
            token,
        };
    }
    async resendVerification(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            throw new common_1.BadRequestException(this.i18n.translate('t.USER_NOT_FOUND'));
        }
        if (user.verifiedAt) {
            throw new common_1.BadRequestException(this.i18n.translate('t.EMAIL_ALREADY_VERIFIED'));
        }
        const { otp, otpExpiration } = this.authService.generateOtp();
        await this.userService.update(user.id, {
            verifyCode: otp,
            otpExpiration,
        });
        await this.authService.sendVerificationEmail(data.email, otp);
        return {
            message: this.i18n.translate('t.VERIFICATION_CODE_SENT'),
        };
    }
    async forgotPassword(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            return {
                message: this.i18n.translate('t.PASSWORD_RESET_EMAIL_SENT'),
            };
        }
        if (!user.verifiedAt) {
            throw new common_1.BadRequestException(this.i18n.translate('t.VERIFY_EMAIL_FIRST'));
        }
        if (!user.isActive) {
            throw new common_1.BadRequestException(this.i18n.translate('t.ACCOUNT_IS_DEACTIVATED'));
        }
        const { otp, otpExpiration } = this.authService.generateOtp();
        await this.userService.update(user.id, {
            otp,
            otpExpiration,
        });
        await this.authService.sendPasswordResetEmail(data.email, otp);
        return {
            message: this.i18n.translate('t.PASSWORD_RESET_EMAIL_SENT'),
        };
    }
    async verifyOtp(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            throw new common_1.BadRequestException(this.i18n.translate('t.INVALID_RESET_TOKEN'));
        }
        if (!user.verifyCode || user.verifyCode !== data.code) {
            throw new common_1.BadRequestException(this.i18n.translate('t.INVALID_VERIFICATION_CODE'));
        }
        if (user.otpExpiration && new Date() > user.otpExpiration) {
            throw new common_1.BadRequestException(this.i18n.translate('t.VERIFICATION_CODE_EXPIRED'));
        }
        await this.userService.update(user.id, {
            verifyCode: null,
            otpExpiration: null,
            verifiedAt: new Date(),
        });
        const token = this.authService.accessToken(String(user.id), user.role);
        return {
            message: this.i18n.translate('t.OTP_VERIFIED_SUCCESS'),
            user: this.userService.runUserData(user),
            token,
            success: true,
        };
    }
    async resetPassword(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            throw new common_1.BadRequestException(this.i18n.translate('t.INVALID_RESET_TOKEN'));
        }
        if (!user.otp || user.otp !== data.code) {
            throw new common_1.BadRequestException(this.i18n.translate('t.INVALID_VERIFICATION_CODE'));
        }
        if (user.otpExpiration && new Date() > user.otpExpiration) {
            throw new common_1.BadRequestException(this.i18n.translate('t.VERIFICATION_CODE_EXPIRED'));
        }
        const hashedPassword = await this.authService.hashPassword(data.newPassword);
        const updatedUser = await this.userService.update(user.id, {
            password: hashedPassword,
            otp: null,
            otpExpiration: null,
        });
        return {
            message: this.i18n.translate('t.PASSWORD_RESET_SUCCESS'),
            user: updatedUser,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('resend-verification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerification", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        role_service_1.RoleService,
        nestjs_i18n_1.I18nService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map