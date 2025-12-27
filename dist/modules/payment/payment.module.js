"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_controller_1 = require("./payment.controller");
const payment_service_1 = require("./payment.service");
const subscription_entity_1 = require("../subscriptions/subscription.entity");
const user_entity_1 = require("../users/user.entity");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const email_module_1 = require("../email/email.module");
const user_service_1 = require("../users/user.service");
let PaymentModule = class PaymentModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'subscription/confirm', method: common_1.RequestMethod.POST }, { path: 'subscription/fail', method: common_1.RequestMethod.POST });
    }
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subscription_entity_1.Subscription, user_entity_1.User]), email_module_1.EmailModule],
        controllers: [payment_controller_1.PaymentController],
        providers: [payment_service_1.PaymentService, jwt_1.JwtService, user_service_1.UserService, auth_service_1.AuthService],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map