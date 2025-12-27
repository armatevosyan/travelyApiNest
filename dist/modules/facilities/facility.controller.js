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
exports.FacilityController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const facility_service_1 = require("./facility.service");
const facility_dto_1 = require("./facility.dto");
let FacilityController = class FacilityController {
    facilityService;
    i18n;
    constructor(facilityService, i18n) {
        this.facilityService = facilityService;
        this.i18n = i18n;
    }
    async findAll(query) {
        const { facilities, total } = await this.facilityService.findAll(query);
        return {
            message: this.i18n.translate('t.FACILITIES_RETRIEVED_SUCCESSFULLY'),
            data: facilities,
            pagination: {
                total,
                limit: query.limit ?? 100,
                page: query.page ?? 0,
                totalPages: Math.ceil(total / (query.limit ?? 100)),
            },
        };
    }
};
exports.FacilityController = FacilityController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [facility_dto_1.FacilityQueryDto]),
    __metadata("design:returntype", Promise)
], FacilityController.prototype, "findAll", null);
exports.FacilityController = FacilityController = __decorate([
    (0, common_1.Controller)('facilities'),
    __metadata("design:paramtypes", [facility_service_1.FacilityService,
        nestjs_i18n_1.I18nService])
], FacilityController);
//# sourceMappingURL=facility.controller.js.map