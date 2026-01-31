"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const home_controller_1 = require("./home.controller");
const home_service_1 = require("./home.service");
const category_entity_1 = require("../categories/category.entity");
const location_entity_1 = require("../locations/location.entity");
const place_entity_1 = require("../places/place.entity");
const blog_entity_1 = require("../blog/blog.entity");
const wishlist_entity_1 = require("../wishlist/wishlist.entity");
const blog_module_1 = require("../blog/blog.module");
const files_module_1 = require("../files/files.module");
let HomeModule = class HomeModule {
};
exports.HomeModule = HomeModule;
exports.HomeModule = HomeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category, location_entity_1.Location, place_entity_1.Place, blog_entity_1.Blog, wishlist_entity_1.Wishlist]),
            blog_module_1.BlogModule,
            files_module_1.FilesModule,
        ],
        controllers: [home_controller_1.HomeController],
        providers: [home_service_1.HomeService],
    })
], HomeModule);
//# sourceMappingURL=home.module.js.map