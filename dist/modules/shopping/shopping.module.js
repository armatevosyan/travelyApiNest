"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shopping_service_1 = require("./shopping.service");
const shopping_entity_1 = require("./shopping.entity");
const place_entity_1 = require("../places/place.entity");
const category_entity_1 = require("../categories/category.entity");
let ShoppingModule = class ShoppingModule {
};
exports.ShoppingModule = ShoppingModule;
exports.ShoppingModule = ShoppingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([shopping_entity_1.Shopping, place_entity_1.Place, category_entity_1.Category])],
        controllers: [],
        providers: [shopping_service_1.ShoppingService],
        exports: [shopping_service_1.ShoppingService],
    })
], ShoppingModule);
//# sourceMappingURL=shopping.module.js.map