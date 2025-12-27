"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const place_service_1 = require("./place.service");
const place_controller_1 = require("./place.controller");
const place_entity_1 = require("./place.entity");
const category_entity_1 = require("../categories/category.entity");
const category_module_1 = require("../categories/category.module");
const location_module_1 = require("../locations/location.module");
const tag_module_1 = require("../tags/tag.module");
const facility_module_1 = require("../facilities/facility.module");
const restaurant_module_1 = require("../restaurants/restaurant.module");
const accommodation_module_1 = require("../accommodations/accommodation.module");
const shopping_module_1 = require("../shopping/shopping.module");
const transport_module_1 = require("../transport/transport.module");
const health_wellness_module_1 = require("../health-wellness/health-wellness.module");
const nature_outdoors_module_1 = require("../nature-outdoors/nature-outdoors.module");
const entertainment_module_1 = require("../entertainment/entertainment.module");
let PlaceModule = class PlaceModule {
};
exports.PlaceModule = PlaceModule;
exports.PlaceModule = PlaceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([place_entity_1.Place, category_entity_1.Category]),
            category_module_1.CategoryModule,
            location_module_1.LocationModule,
            tag_module_1.TagModule,
            facility_module_1.FacilityModule,
            restaurant_module_1.RestaurantModule,
            accommodation_module_1.AccommodationModule,
            shopping_module_1.ShoppingModule,
            transport_module_1.TransportModule,
            health_wellness_module_1.HealthWellnessModule,
            nature_outdoors_module_1.NatureOutdoorsModule,
            entertainment_module_1.EntertainmentModule,
        ],
        providers: [place_service_1.PlaceService],
        controllers: [place_controller_1.PlaceController],
        exports: [place_service_1.PlaceService, typeorm_1.TypeOrmModule],
    })
], PlaceModule);
//# sourceMappingURL=place.module.js.map