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
exports.FacilityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_2 = require("typeorm");
const facility_entity_1 = require("./facility.entity");
let FacilityService = class FacilityService {
    facilityRepo;
    i18n;
    constructor(facilityRepo, i18n) {
        this.facilityRepo = facilityRepo;
        this.i18n = i18n;
    }
    async findAll(query) {
        const { search, limit = 100, page = 0 } = query;
        const qb = this.facilityRepo.createQueryBuilder('facility');
        if (search) {
            qb.where('(facility.name ILIKE :search OR facility.description ILIKE :search)', { search: `%${search}%` });
        }
        qb.orderBy('facility.count', 'DESC')
            .addOrderBy('facility.name', 'ASC')
            .skip(page * limit)
            .take(limit);
        const [facilities, total] = await qb.getManyAndCount();
        return { facilities, total };
    }
    async findByIds(ids) {
        if (!ids || ids.length === 0) {
            return [];
        }
        const facilities = await this.facilityRepo.find({
            where: { id: (0, typeorm_2.In)(ids) },
        });
        if (facilities.length !== ids.length) {
            const foundIds = facilities.map((f) => f.id);
            const missing = ids.filter((id) => !foundIds.includes(id));
            throw new common_1.NotFoundException(this.i18n.translate('t.FACILITY_NOT_FOUND_IDS', {
                args: { ids: missing.join(', ') },
            }));
        }
        return facilities;
    }
    async incrementCount(facilityIds) {
        if (!facilityIds || facilityIds.length === 0) {
            return;
        }
        await this.facilityRepo
            .createQueryBuilder()
            .update(facility_entity_1.Facility)
            .set({ count: () => 'count + 1' })
            .whereInIds(facilityIds)
            .execute();
    }
    async decrementCount(facilityIds) {
        if (!facilityIds || facilityIds.length === 0) {
            return;
        }
        await this.facilityRepo
            .createQueryBuilder()
            .update(facility_entity_1.Facility)
            .set({ count: () => 'GREATEST(count - 1, 0)' })
            .whereInIds(facilityIds)
            .execute();
    }
    async updateCounts(oldFacilityIds, newFacilityIds) {
        const oldSet = new Set(oldFacilityIds);
        const newSet = new Set(newFacilityIds);
        const added = newFacilityIds.filter((id) => !oldSet.has(id));
        const removed = oldFacilityIds.filter((id) => !newSet.has(id));
        await Promise.all([
            this.incrementCount(added),
            this.decrementCount(removed),
        ]);
    }
};
exports.FacilityService = FacilityService;
exports.FacilityService = FacilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(facility_entity_1.Facility)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nestjs_i18n_1.I18nService])
], FacilityService);
//# sourceMappingURL=facility.service.js.map