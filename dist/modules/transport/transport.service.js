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
exports.TransportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transport_entity_1 = require("./transport.entity");
const place_entity_1 = require("../places/place.entity");
let TransportService = class TransportService {
    transportRepository;
    placeRepository;
    constructor(transportRepository, placeRepository) {
        this.transportRepository = transportRepository;
        this.placeRepository = placeRepository;
    }
    async create(createTransportDto) {
        const place = await this.placeRepository.findOne({
            where: { id: createTransportDto.placeId },
        });
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${createTransportDto.placeId} not found`);
        }
        const existingTransport = await this.transportRepository.findOne({
            where: { placeId: createTransportDto.placeId },
        });
        if (existingTransport) {
            throw new common_1.BadRequestException(`Transport already exists for place ID ${createTransportDto.placeId}`);
        }
        const transport = this.transportRepository.create(createTransportDto);
        return await this.transportRepository.save(transport);
    }
    async findOne(id) {
        const transport = await this.transportRepository.findOne({
            where: { id },
        });
        if (!transport) {
            throw new common_1.NotFoundException(`Transport with ID ${id} not found`);
        }
        return transport;
    }
    async updateByPlaceId(placeId, updateTransportDto) {
        const transport = await this.transportRepository.findOne({
            where: { placeId },
        });
        if (!transport) {
            throw new common_1.NotFoundException(`Transport for place ID ${placeId} not found`);
        }
        if (updateTransportDto.rentalOptions !== undefined) {
            const existingRentalOptions = transport.rentalOptions || {};
            transport.rentalOptions = {
                ...existingRentalOptions,
                ...updateTransportDto.rentalOptions,
            };
        }
        if (updateTransportDto.operator !== undefined) {
            transport.operator = updateTransportDto.operator;
        }
        if (updateTransportDto.transportLines !== undefined) {
            transport.transportLines = updateTransportDto.transportLines;
        }
        if (updateTransportDto.destinations !== undefined) {
            transport.destinations = updateTransportDto.destinations;
        }
        if (updateTransportDto.vehicleTypes !== undefined) {
            transport.vehicleTypes = updateTransportDto.vehicleTypes;
        }
        if (updateTransportDto.bookingUrl !== undefined) {
            transport.bookingUrl = updateTransportDto.bookingUrl;
        }
        return await this.transportRepository.save(transport);
    }
};
exports.TransportService = TransportService;
exports.TransportService = TransportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transport_entity_1.Transport)),
    __param(1, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TransportService);
//# sourceMappingURL=transport.service.js.map