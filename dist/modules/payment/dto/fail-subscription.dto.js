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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailSubscriptionDto = void 0;
const class_validator_1 = require("class-validator");
const subscription_entity_1 = require("../../subscriptions/subscription.entity");
class FailSubscriptionDto {
    transactionId;
    rawReceipt;
    productId;
    platform;
    plan;
}
exports.FailSubscriptionDto = FailSubscriptionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FailSubscriptionDto.prototype, "transactionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], FailSubscriptionDto.prototype, "rawReceipt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FailSubscriptionDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FailSubscriptionDto.prototype, "platform", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(subscription_entity_1.SubscriptionPlan),
    __metadata("design:type", String)
], FailSubscriptionDto.prototype, "plan", void 0);
//# sourceMappingURL=fail-subscription.dto.js.map