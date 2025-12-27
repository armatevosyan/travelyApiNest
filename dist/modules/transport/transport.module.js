"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transport_service_1 = require("./transport.service");
const transport_entity_1 = require("./transport.entity");
const place_entity_1 = require("../places/place.entity");
const category_entity_1 = require("../categories/category.entity");
let TransportModule = class TransportModule {
};
exports.TransportModule = TransportModule;
exports.TransportModule = TransportModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transport_entity_1.Transport, place_entity_1.Place, category_entity_1.Category])],
        controllers: [],
        providers: [transport_service_1.TransportService],
        exports: [transport_service_1.TransportService],
    })
], TransportModule);
//# sourceMappingURL=transport.module.js.map