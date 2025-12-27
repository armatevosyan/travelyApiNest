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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const payment_service_1 = require("./payment.service");
const confirm_subscription_dto_1 = require("./dto/confirm-subscription.dto");
const fail_subscription_dto_1 = require("./dto/fail-subscription.dto");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const user_entity_1 = require("../users/user.entity");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    getPayment() {
        const data = this.paymentService.getPaymentSettings();
        return { success: true, data };
    }
    async confirm(user, dto) {
        const result = await this.paymentService.confirmSubscription(user.id, dto);
        return { success: true, data: result };
    }
    async fail(user, dto) {
        const result = await this.paymentService.failSubscription(user?.id ?? null, dto);
        return { success: true, data: result };
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Get)('payment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "getPayment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('subscription/confirm'),
    __param(0, (0, user_decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, confirm_subscription_dto_1.ConfirmSubscriptionDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "confirm", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('subscription/fail'),
    __param(0, (0, user_decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, fail_subscription_dto_1.FailSubscriptionDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "fail", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map