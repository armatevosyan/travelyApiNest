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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const location_entity_1 = require("./location.entity");
const nestjs_i18n_1 = require("nestjs-i18n");
let LocationService = class LocationService {
    locationRepo;
    i18n;
    constructor(locationRepo, i18n) {
        this.locationRepo = locationRepo;
        this.i18n = i18n;
    }
    async loadNestedChildren(location) {
        if (location.type === location_entity_1.LocationType.COUNTRY) {
            const states = await this.locationRepo.find({
                where: { parentId: location.id, type: location_entity_1.LocationType.STATE },
                order: { name: 'ASC' },
            });
            const statesWithCities = await Promise.all(states.map(async (state) => {
                const cities = await this.locationRepo.find({
                    where: { parentId: state.id, type: location_entity_1.LocationType.CITY },
                    order: { name: 'ASC' },
                });
                return {
                    ...state,
                    children: cities,
                };
            }));
            return {
                ...location,
                children: statesWithCities,
            };
        }
        else if (location.type === location_entity_1.LocationType.STATE) {
            const cities = await this.locationRepo.find({
                where: { parentId: location.id, type: location_entity_1.LocationType.CITY },
                order: { name: 'ASC' },
            });
            return {
                ...location,
                children: cities,
            };
        }
        return {
            ...location,
            children: [],
        };
    }
    async findAll(query) {
        const { type, parentId, search } = query;
        const queryBuilder = this.locationRepo.createQueryBuilder('location');
        if (!type || type === location_entity_1.LocationType.COUNTRY) {
            queryBuilder.leftJoinAndSelect('location.image', 'image');
        }
        if (type) {
            queryBuilder.andWhere('location.type = :type', { type });
        }
        if (parentId !== undefined) {
            if (parentId === null) {
                queryBuilder.andWhere('location.parentId IS NULL');
            }
            else {
                queryBuilder.andWhere('location.parentId = :parentId', { parentId });
            }
        }
        if (search) {
            queryBuilder.andWhere('location.name ILIKE :search', {
                search: `%${search}%`,
            });
        }
        queryBuilder.orderBy('location.name', 'ASC');
        const [data, total] = await queryBuilder.getManyAndCount();
        const processedData = await Promise.all(data.map((location) => this.loadNestedChildren(location)));
        return { data: processedData, total };
    }
    async listLegacy(parentId, type = location_entity_1.LocationType.COUNTRY) {
        const where = { type };
        if (parentId) {
            where.parentId = parentId;
        }
        return this.locationRepo.find({
            where,
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const location = await this.locationRepo.findOne({
            where: { id },
            relations: ['parent'],
        });
        if (!location) {
            throw new common_1.NotFoundException(this.i18n.translate('t.LOCATION_NOT_FOUND'));
        }
        if (location.type === location_entity_1.LocationType.COUNTRY) {
            const locationWithImage = await this.locationRepo.findOne({
                where: { id },
                relations: ['parent', 'image'],
            });
            return this.loadNestedChildren(locationWithImage);
        }
        return this.loadNestedChildren(location);
    }
    async validateLocationHierarchy(countryId, stateId, cityId) {
        if (cityId) {
            const city = await this.findOne(cityId);
            if (city.type !== location_entity_1.LocationType.CITY) {
                throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_CITY_INVALID_TYPE'));
            }
            if (stateId) {
                if (city.parentId !== stateId) {
                    throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_CITY_STATE_MISMATCH'));
                }
            }
            else {
                throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_STATE_REQUIRED_FOR_CITY'));
            }
        }
        if (stateId) {
            const state = await this.findOne(stateId);
            if (state.type !== location_entity_1.LocationType.STATE) {
                throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_STATE_INVALID_TYPE'));
            }
            if (countryId) {
                if (state.parentId !== countryId) {
                    throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_STATE_COUNTRY_MISMATCH'));
                }
            }
            else {
                throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_COUNTRY_REQUIRED_FOR_STATE'));
            }
        }
        if (countryId) {
            const country = await this.findOne(countryId);
            if (country.type !== location_entity_1.LocationType.COUNTRY) {
                throw new common_1.BadRequestException(this.i18n.translate('t.PLACE_COUNTRY_INVALID_TYPE'));
            }
        }
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nestjs_i18n_1.I18nService])
], LocationService);
//# sourceMappingURL=location.service.js.map