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
exports.NatureOutdoorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nature_outdoors_entity_1 = require("./nature-outdoors.entity");
const place_entity_1 = require("../places/place.entity");
let NatureOutdoorsService = class NatureOutdoorsService {
    natureOutdoorsRepository;
    placeRepository;
    constructor(natureOutdoorsRepository, placeRepository) {
        this.natureOutdoorsRepository = natureOutdoorsRepository;
        this.placeRepository = placeRepository;
    }
    async create(createNatureOutdoorsDto) {
        const place = await this.placeRepository.findOne({
            where: { id: createNatureOutdoorsDto.placeId },
        });
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${createNatureOutdoorsDto.placeId} not found`);
        }
        const existingNatureOutdoors = await this.natureOutdoorsRepository.findOne({
            where: { placeId: createNatureOutdoorsDto.placeId },
        });
        if (existingNatureOutdoors) {
            throw new common_1.BadRequestException(`Nature & Outdoors already exists for place ID ${createNatureOutdoorsDto.placeId}`);
        }
        const natureOutdoors = this.natureOutdoorsRepository.create(createNatureOutdoorsDto);
        return await this.natureOutdoorsRepository.save(natureOutdoors);
    }
    async updateByPlaceId(placeId, updateNatureOutdoorsDto) {
        const natureOutdoors = await this.natureOutdoorsRepository.findOne({
            where: { placeId },
        });
        if (!natureOutdoors) {
            throw new common_1.NotFoundException(`Nature & Outdoors for place ID ${placeId} not found`);
        }
        if (updateNatureOutdoorsDto.entryFee !== undefined) {
            natureOutdoors.entryFee = updateNatureOutdoorsDto.entryFee;
        }
        if (updateNatureOutdoorsDto.keyActivities !== undefined) {
            natureOutdoors.keyActivities = updateNatureOutdoorsDto.keyActivities;
        }
        if (updateNatureOutdoorsDto.rules !== undefined) {
            natureOutdoors.rules = updateNatureOutdoorsDto.rules;
        }
        if (updateNatureOutdoorsDto.bestTimeToVisit !== undefined) {
            natureOutdoors.bestTimeToVisit = updateNatureOutdoorsDto.bestTimeToVisit;
        }
        if (updateNatureOutdoorsDto.keyExhibits !== undefined) {
            natureOutdoors.keyExhibits = updateNatureOutdoorsDto.keyExhibits;
        }
        return await this.natureOutdoorsRepository.save(natureOutdoors);
    }
};
exports.NatureOutdoorsService = NatureOutdoorsService;
exports.NatureOutdoorsService = NatureOutdoorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nature_outdoors_entity_1.NatureOutdoors)),
    __param(1, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NatureOutdoorsService);
//# sourceMappingURL=nature-outdoors.service.js.map