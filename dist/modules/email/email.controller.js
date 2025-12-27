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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorators_1 = require("../../common/decorators/roles.decorators");
const role_types_1 = require("../roles/role.types");
let EmailController = class EmailController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async sendEmail(emailOptions) {
        const success = await this.emailService.sendEmail(emailOptions);
        return {
            success,
            message: success ? 'Email sent successfully' : 'Failed to send email',
        };
    }
    async sendTestEmail(body) {
        const success = await this.emailService.sendWelcomeEmail(body.to, 'Test User');
        return {
            success,
            message: success
                ? 'Test email sent successfully'
                : 'Failed to send test email',
        };
    }
    async testConnection() {
        const success = await this.emailService.testConnection();
        return {
            success,
            message: success
                ? 'Email connection successful'
                : 'Email connection failed',
        };
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('send'),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)('test'),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendTestEmail", null);
__decorate([
    (0, common_1.Post)('test-connection'),
    (0, roles_decorators_1.Roles)(role_types_1.ERoles.ADMIN, role_types_1.ERoles.SUPER_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "testConnection", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map