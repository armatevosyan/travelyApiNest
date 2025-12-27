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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
const location_dto_1 = require("./location.dto");
const nestjs_i18n_1 = require("nestjs-i18n");
const location_entity_1 = require("./location.entity");
let LocationController = class LocationController {
    locationService;
    i18n;
    constructor(locationService, i18n) {
        this.locationService = locationService;
        this.i18n = i18n;
    }
    async findAll(query) {
        const result = await this.locationService.findAll(query);
        return {
            message: this.i18n.translate('t.LOCATIONS_RETRIEVED_SUCCESSFULLY'),
            data: result.data,
            total: result.total,
        };
    }
    async getLocations(parentId, type = location_entity_1.LocationType.COUNTRY) {
        const allowed = Object.values(location_entity_1.LocationType);
        const resolvedType = allowed.includes(type) ? type : location_entity_1.LocationType.COUNTRY;
        if ((resolvedType === location_entity_1.LocationType.STATE ||
            resolvedType === location_entity_1.LocationType.CITY) &&
            !parentId) {
            throw new common_1.BadRequestException(`parent_id is required when type is '${resolvedType}'`);
        }
        const locations = await this.locationService.listLegacy(parentId ? Number(parentId) : undefined, resolvedType);
        const data = locations.map((loc) => ({
            term_id: loc.id,
            name: loc.name,
            type: loc.type,
            parent_id: loc.parentId ?? null,
        }));
        return { success: true, data };
    }
    async findOne(id) {
        const location = await this.locationService.findOne(id);
        return {
            message: this.i18n.translate('t.LOCATION_RETRIEVED_SUCCESSFULLY'),
            data: location,
        };
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationQueryDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('parent_id')),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findOne", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('location'),
    __metadata("design:paramtypes", [location_service_1.LocationService,
        nestjs_i18n_1.I18nService])
], LocationController);
//# sourceMappingURL=location.controller.js.map