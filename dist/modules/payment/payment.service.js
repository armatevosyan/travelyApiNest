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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("../subscriptions/subscription.entity");
const user_entity_1 = require("../users/user.entity");
let PaymentService = class PaymentService {
    subscriptionsRepo;
    usersRepo;
    constructor(subscriptionsRepo, usersRepo) {
        this.subscriptionsRepo = subscriptionsRepo;
        this.usersRepo = usersRepo;
    }
    getPaymentSettings() {
        return {
            use: false,
            term_condition_page: '',
            url_success: '',
            url_cancel: '',
            list: [],
            bank_account_list: [],
        };
    }
    parseDate(value) {
        if (!value)
            return null;
        if (value instanceof Date)
            return value;
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
    }
    async confirmSubscription(userId, dto) {
        const { transactionId, productId, platform, plan, price, currency, purchaseDate, expiryDate, status = subscription_entity_1.SubscriptionStatus.ACTIVE, rawReceipt, } = dto;
        let subscription = await this.subscriptionsRepo.findOne({
            where: { transactionId },
        });
        if (subscription) {
            subscription.userId = userId;
            subscription.productId = productId ?? null;
            subscription.platform = platform ?? null;
            subscription.plan = plan ?? null;
            subscription.price = price ?? null;
            subscription.currency = currency ?? null;
            subscription.purchaseDate = this.parseDate(purchaseDate);
            subscription.expiryDate = this.parseDate(expiryDate);
            subscription.status = status;
            subscription.rawReceipt = rawReceipt;
            await this.subscriptionsRepo.save(subscription);
        }
        else {
            subscription = this.subscriptionsRepo.create({
                userId,
                transactionId,
                productId: productId ?? null,
                platform: platform ?? null,
                plan: plan ?? null,
                price: price ?? null,
                currency: currency ?? null,
                purchaseDate: this.parseDate(purchaseDate),
                expiryDate: this.parseDate(expiryDate),
                status,
                rawReceipt: rawReceipt ?? null,
            });
            await this.subscriptionsRepo.save(subscription);
        }
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (user) {
            user.isPro = true;
            await this.usersRepo.save(user);
        }
        return { subscription, user };
    }
    async failSubscription(userId, dto) {
        const { transactionId, rawReceipt, productId, platform, plan } = dto;
        const subscription = this.subscriptionsRepo.create({
            userId: userId,
            transactionId,
            productId: productId ?? null,
            platform: platform ?? null,
            plan: plan ?? null,
            status: subscription_entity_1.SubscriptionStatus.FAILED,
            rawReceipt: rawReceipt ?? null,
        });
        await this.subscriptionsRepo.save(subscription);
        return { subscription };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map