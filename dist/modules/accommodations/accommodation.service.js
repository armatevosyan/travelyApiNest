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
exports.AccommodationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const accommodation_entity_1 = require("./accommodation.entity");
const place_entity_1 = require("../places/place.entity");
const file_entity_1 = require("../files/entities/file.entity");
let AccommodationService = class AccommodationService {
    accommodationRepository;
    placeRepository;
    fileRepository;
    constructor(accommodationRepository, placeRepository, fileRepository) {
        this.accommodationRepository = accommodationRepository;
        this.placeRepository = placeRepository;
        this.fileRepository = fileRepository;
    }
    async create(createAccommodationDto) {
        const place = await this.placeRepository.findOne({
            where: { id: createAccommodationDto.placeId },
        });
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${createAccommodationDto.placeId} not found`);
        }
        const existingAccommodation = await this.accommodationRepository.findOne({
            where: { placeId: createAccommodationDto.placeId },
        });
        if (existingAccommodation) {
            throw new common_1.BadRequestException(`Accommodation already exists for place ID ${createAccommodationDto.placeId}`);
        }
        const accommodation = this.accommodationRepository.create(createAccommodationDto);
        return await this.accommodationRepository.save(accommodation);
    }
    async findOne(id) {
        const accommodation = await this.accommodationRepository.findOne({
            where: { id },
        });
        if (!accommodation) {
            throw new common_1.NotFoundException(`Accommodation with ID ${id} not found`);
        }
        return accommodation;
    }
    async update(id, updateAccommodationDto) {
        const accommodation = await this.findOne(id);
        Object.assign(accommodation, updateAccommodationDto);
        return await this.accommodationRepository.save(accommodation);
    }
    async updateByPlaceId(placeId, updateAccommodationDto) {
        const accommodation = await this.accommodationRepository.findOne({
            where: { placeId },
        });
        if (!accommodation) {
            throw new common_1.NotFoundException(`Accommodation for place ID ${placeId} not found`);
        }
        Object.assign(accommodation, updateAccommodationDto);
        return await this.accommodationRepository.save(accommodation);
    }
    async loadRoomPhotos(accommodation) {
        if (!accommodation.roomTypes || accommodation.roomTypes.length === 0) {
            return accommodation;
        }
        const allPhotoIds = [];
        accommodation.roomTypes.forEach((roomType) => {
            if (roomType.photos && Array.isArray(roomType.photos)) {
                allPhotoIds.push(...roomType.photos);
            }
        });
        if (allPhotoIds.length === 0) {
            return accommodation;
        }
        const photoFiles = await this.fileRepository.find({
            where: { id: (0, typeorm_2.In)(allPhotoIds) },
        });
        const photoMap = new Map(photoFiles.map((file) => [file.id, file]));
        const roomTypesWithPhotos = accommodation.roomTypes.map((roomType) => ({
            ...roomType,
            photos: roomType.photos
                ? roomType.photos
                    .map((photoId) => photoMap.get(photoId))
                    .filter((photo) => photo !== undefined)
                : [],
        }));
        return {
            ...accommodation,
            roomTypesWithPhotos,
        };
    }
};
exports.AccommodationService = AccommodationService;
exports.AccommodationService = AccommodationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accommodation_entity_1.Accommodation)),
    __param(1, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __param(2, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccommodationService);
//# sourceMappingURL=accommodation.service.js.map