"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NatureOutdoorsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nature_outdoors_service_1 = require("./nature-outdoors.service");
const nature_outdoors_entity_1 = require("./nature-outdoors.entity");
const place_entity_1 = require("../places/place.entity");
const category_entity_1 = require("../categories/category.entity");
let NatureOutdoorsModule = class NatureOutdoorsModule {
};
exports.NatureOutdoorsModule = NatureOutdoorsModule;
exports.NatureOutdoorsModule = NatureOutdoorsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([nature_outdoors_entity_1.NatureOutdoors, place_entity_1.Place, category_entity_1.Category])],
        controllers: [],
        providers: [nature_outdoors_service_1.NatureOutdoorsService],
        exports: [nature_outdoors_service_1.NatureOutdoorsService],
    })
], NatureOutdoorsModule);
//# sourceMappingURL=nature-outdoors.module.js.map