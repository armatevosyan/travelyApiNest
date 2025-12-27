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
exports.HealthWellnessService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const health_wellness_entity_1 = require("./health-wellness.entity");
const place_entity_1 = require("../places/place.entity");
let HealthWellnessService = class HealthWellnessService {
    healthWellnessRepository;
    placeRepository;
    constructor(healthWellnessRepository, placeRepository) {
        this.healthWellnessRepository = healthWellnessRepository;
        this.placeRepository = placeRepository;
    }
    async create(createHealthWellnessDto) {
        const place = await this.placeRepository.findOne({
            where: { id: createHealthWellnessDto.placeId },
        });
        console.log(1111);
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${createHealthWellnessDto.placeId} not found`);
        }
        const existingHealthWellness = await this.healthWellnessRepository.findOne({
            where: { placeId: createHealthWellnessDto.placeId },
        });
        if (existingHealthWellness) {
            throw new common_1.BadRequestException(`Health & Wellness already exists for place ID ${createHealthWellnessDto.placeId}`);
        }
        const healthWellness = this.healthWellnessRepository.create(createHealthWellnessDto);
        return await this.healthWellnessRepository.save(healthWellness);
    }
    async updateByPlaceId(placeId, updateHealthWellnessDto) {
        const healthWellness = await this.healthWellnessRepository.findOne({
            where: { placeId },
        });
        if (!healthWellness) {
            throw new common_1.NotFoundException(`Health & Wellness for place ID ${placeId} not found`);
        }
        if (updateHealthWellnessDto.membershipOptions !== undefined) {
            const existingMembershipOptions = healthWellness.membershipOptions || {};
            healthWellness.membershipOptions = {
                ...existingMembershipOptions,
                ...updateHealthWellnessDto.membershipOptions,
            };
        }
        if (updateHealthWellnessDto.practitioners !== undefined) {
            healthWellness.practitioners = updateHealthWellnessDto.practitioners;
        }
        if (updateHealthWellnessDto.servicesOffered !== undefined) {
            healthWellness.servicesOffered = updateHealthWellnessDto.servicesOffered;
        }
        if (updateHealthWellnessDto.appointmentBookingUrl !== undefined) {
            healthWellness.appointmentBookingUrl =
                updateHealthWellnessDto.appointmentBookingUrl;
        }
        if (updateHealthWellnessDto.insuranceAccepted !== undefined) {
            healthWellness.insuranceAccepted =
                updateHealthWellnessDto.insuranceAccepted;
        }
        if (updateHealthWellnessDto.bookingUrl !== undefined) {
            healthWellness.bookingUrl = updateHealthWellnessDto.bookingUrl;
        }
        return await this.healthWellnessRepository.save(healthWellness);
    }
};
exports.HealthWellnessService = HealthWellnessService;
exports.HealthWellnessService = HealthWellnessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(health_wellness_entity_1.HealthWellness)),
    __param(1, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HealthWellnessService);
//# sourceMappingURL=health-wellness.service.js.map