"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const path = __importStar(require("path"));
const nestjs_i18n_1 = require("nestjs-i18n");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const logger_middleware_1 = require("../../common/middleware/logger.middleware");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const email_module_1 = require("../email/email.module");
const category_module_1 = require("../categories/category.module");
const payment_module_1 = require("../payment/payment.module");
const place_module_1 = require("../places/place.module");
const location_module_1 = require("../locations/location.module");
const blog_module_1 = require("../blog/blog.module");
const tag_module_1 = require("../tags/tag.module");
const files_module_1 = require("../files/files.module");
const facility_module_1 = require("../facilities/facility.module");
const restaurant_module_1 = require("../restaurants/restaurant.module");
const accommodation_module_1 = require("../accommodations/accommodation.module");
const shopping_module_1 = require("../shopping/shopping.module");
const transport_module_1 = require("../transport/transport.module");
const health_wellness_module_1 = require("../health-wellness/health-wellness.module");
const nature_outdoors_module_1 = require("../nature-outdoors/nature-outdoors.module");
const entertainment_module_1 = require("../entertainment/entertainment.module");
const home_module_1 = require("../home/home.module");
const place_option_module_1 = require("../place-options/place-option.module");
const wishlist_module_1 = require("../wishlist/wishlist.module");
const db_config_1 = require("../../database/db.config");
const email_config_1 = __importDefault(require("../../config/email.config"));
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: '*path', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [email_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRoot(db_config_1.databaseConfig),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: 'en',
                loaderOptions: {
                    path: path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist/i18n/' : 'src/i18n/'),
                    watch: true,
                },
                resolvers: [
                    { use: nestjs_i18n_1.QueryResolver, options: ['lang'] },
                    nestjs_i18n_1.AcceptLanguageResolver,
                    new nestjs_i18n_1.HeaderResolver(['x-lang']),
                ],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            email_module_1.EmailModule,
            category_module_1.CategoryModule,
            payment_module_1.PaymentModule,
            place_module_1.PlaceModule,
            location_module_1.LocationModule,
            blog_module_1.BlogModule,
            tag_module_1.TagModule,
            files_module_1.FilesModule,
            facility_module_1.FacilityModule,
            restaurant_module_1.RestaurantModule,
            accommodation_module_1.AccommodationModule,
            shopping_module_1.ShoppingModule,
            transport_module_1.TransportModule,
            health_wellness_module_1.HealthWellnessModule,
            nature_outdoors_module_1.NatureOutdoorsModule,
            entertainment_module_1.EntertainmentModule,
            home_module_1.HomeModule,
            place_option_module_1.PlaceOptionModule,
            wishlist_module_1.WishlistModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map