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
exports.Subscription = exports.SubscriptionStatus = exports.SubscriptionPlan = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["MONTHLY"] = "monthly";
    SubscriptionPlan["YEARLY"] = "yearly";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["CANCELED"] = "canceled";
    SubscriptionStatus["EXPIRED"] = "expired";
    SubscriptionStatus["FAILED"] = "failed";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
let Subscription = class Subscription {
    id;
    userId;
    user;
    platform;
    productId;
    plan;
    price;
    currency;
    transactionId;
    purchaseDate;
    expiryDate;
    status;
    rawReceipt;
    createdAt;
    updatedAt;
};
exports.Subscription = Subscription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subscription.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Subscription.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SubscriptionPlan,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Subscription.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Subscription.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "purchaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SubscriptionStatus,
        default: SubscriptionStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "rawReceipt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Subscription.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Subscription.prototype, "updatedAt", void 0);
exports.Subscription = Subscription = __decorate([
    (0, typeorm_1.Entity)('subscriptions')
], Subscription);
//# sourceMappingURL=subscription.entity.js.map