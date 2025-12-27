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
exports.EntertainmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entertainment_entity_1 = require("./entertainment.entity");
const place_entity_1 = require("../places/place.entity");
let EntertainmentService = class EntertainmentService {
    entertainmentRepository;
    placeRepository;
    constructor(entertainmentRepository, placeRepository) {
        this.entertainmentRepository = entertainmentRepository;
        this.placeRepository = placeRepository;
    }
    async create(createEntertainmentDto) {
        const place = await this.placeRepository.findOne({
            where: { id: createEntertainmentDto.placeId },
        });
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${createEntertainmentDto.placeId} not found`);
        }
        const existingEntertainment = await this.entertainmentRepository.findOne({
            where: { placeId: createEntertainmentDto.placeId },
        });
        if (existingEntertainment) {
            throw new common_1.BadRequestException(`Entertainment already exists for place ID ${createEntertainmentDto.placeId}`);
        }
        const entertainment = this.entertainmentRepository.create(createEntertainmentDto);
        return await this.entertainmentRepository.save(entertainment);
    }
    async updateByPlaceId(placeId, updateEntertainmentDto) {
        const entertainment = await this.entertainmentRepository.findOne({
            where: { placeId },
        });
        if (!entertainment) {
            throw new common_1.NotFoundException(`Entertainment for place ID ${placeId} not found`);
        }
        Object.assign(entertainment, updateEntertainmentDto);
        return await this.entertainmentRepository.save(entertainment);
    }
};
exports.EntertainmentService = EntertainmentService;
exports.EntertainmentService = EntertainmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entertainment_entity_1.Entertainment)),
    __param(1, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EntertainmentService);
//# sourceMappingURL=entertainment.service.js.map