"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceQueryDto = exports.UpdatePlaceDto = exports.CreatePlaceDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const placeTypes = __importStar(require("./place.types"));
class CreatePlaceDto {
    name;
    description;
    address;
    countryId;
    stateId;
    cityId;
    postalCode;
    latitude;
    longitude;
    phone;
    email;
    website;
    categoryId;
    subcategoryId;
    imageIds;
    openingHours;
    social;
    slug;
    tagIds;
    facilityIds;
    price;
    minPrice;
    maxPrice;
    isPriceOnRequest;
    priceType;
    oldPrice;
    restaurantData;
    accommodationData;
    shoppingData;
    transportData;
    healthWellnessData;
    natureOutdoorsData;
    entertainmentData;
}
exports.CreatePlaceDto = CreatePlaceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.PLACE_NAME_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 't.PLACE_NAME_INVALID' }),
    (0, class_validator_1.MinLength)(2, { message: 't.PLACE_NAME_MIN_LENGTH' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.PLACE_NAME_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_DESCRIPTION_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_ADDRESS_INVALID' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.PLACE_ADDRESS_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_COUNTRY_ID_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "countryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_STATE_ID_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "stateId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_CITY_ID_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "cityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_POSTAL_CODE_INVALID' }),
    (0, class_validator_1.MaxLength)(20, { message: 't.PLACE_POSTAL_CODE_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "postalCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsLatitude)({ message: 't.PLACE_LATITUDE_INVALID' }),
    __metadata("design:type", Number)
], CreatePlaceDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsLongitude)({ message: 't.PLACE_LONGITUDE_INVALID' }),
    __metadata("design:type", Number)
], CreatePlaceDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_PHONE_INVALID' }),
    (0, class_validator_1.MaxLength)(50, { message: 't.PLACE_PHONE_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_EMAIL_INVALID' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.PLACE_EMAIL_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_WEBSITE_INVALID' }),
    (0, class_validator_1.MaxLength)(500, { message: 't.PLACE_WEBSITE_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.PLACE_CATEGORY_REQUIRED' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_CATEGORY_INVALID' }),
    __metadata("design:type", Number)
], CreatePlaceDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_SUBCATEGORY_INVALID' }),
    __metadata("design:type", Number)
], CreatePlaceDto.prototype, "subcategoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        if (Array.isArray(value)) {
            return value
                .map((v) => {
                const num = typeof v === 'string' ? parseInt(v, 10) : Number(v);
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((v) => parseInt(v.trim(), 10))
                .filter((v) => !isNaN(v));
        }
        return null;
    }),
    (0, class_validator_1.IsArray)({ message: 't.PLACE_IMAGE_IDS_INVALID' }),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 't.PLACE_IMAGE_IDS_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "imageIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "openingHours", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "social", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_SLUG_INVALID' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.PLACE_SLUG_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value)) {
            return value
                .map((v) => {
                const num = Number(v);
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((v) => {
                const num = Number(v.trim());
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        return value;
    }),
    (0, class_validator_1.IsArray)({ message: 't.PLACE_TAG_IDS_INVALID' }),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 't.PLACE_TAG_ID_INVALID' }),
    __metadata("design:type", Array)
], CreatePlaceDto.prototype, "tagIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value)) {
            return value
                .map((v) => {
                const num = Number(v);
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((v) => {
                const num = Number(v.trim());
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        return value;
    }),
    (0, class_validator_1.IsArray)({ message: 't.PLACE_FACILITY_IDS_INVALID' }),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 't.PLACE_FACILITY_ID_INVALID' }),
    __metadata("design:type", Array)
], CreatePlaceDto.prototype, "facilityIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_PRICE_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_MIN_PRICE_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "minPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_MAX_PRICE_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "maxPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)({ message: 't.PLACE_IS_PRICE_ON_REQUEST_INVALID' }),
    __metadata("design:type", Boolean)
], CreatePlaceDto.prototype, "isPriceOnRequest", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_PRICE_TYPE_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "priceType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_OLD_PRICE_INVALID' }),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "oldPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "restaurantData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "accommodationData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "shoppingData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "transportData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "healthWellnessData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "natureOutdoorsData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "entertainmentData", void 0);
class UpdatePlaceDto {
    name;
    description;
    address;
    countryId;
    stateId;
    cityId;
    postalCode;
    latitude;
    longitude;
    phone;
    email;
    website;
    categoryId;
    subcategoryId;
    imageIds;
    openingHours;
    social;
    slug;
    tagIds;
    facilityIds;
    price;
    minPrice;
    maxPrice;
    priceType;
    oldPrice;
    isPriceOnRequest;
    restaurantData;
    accommodationData;
    shoppingData;
    transportData;
    healthWellnessData;
    natureOutdoorsData;
    entertainmentData;
}
exports.UpdatePlaceDto = UpdatePlaceDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_NAME_INVALID' }),
    (0, class_validator_1.MinLength)(2, { message: 't.PLACE_NAME_MIN_LENGTH' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.PLACE_NAME_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_DESCRIPTION_INVALID' }),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_ADDRESS_INVALID' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.PLACE_ADDRESS_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_COUNTRY_ID_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "countryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_STATE_ID_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "stateId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_CITY_ID_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "cityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_POSTAL_CODE_INVALID' }),
    (0, class_validator_1.MaxLength)(20, { message: 't.PLACE_POSTAL_CODE_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "postalCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsLatitude)({ message: 't.PLACE_LATITUDE_INVALID' }),
    __metadata("design:type", Number)
], UpdatePlaceDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsLongitude)({ message: 't.PLACE_LONGITUDE_INVALID' }),
    __metadata("design:type", Number)
], UpdatePlaceDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_PHONE_INVALID' }),
    (0, class_validator_1.MaxLength)(50, { message: 't.PLACE_PHONE_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_EMAIL_INVALID' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.PLACE_EMAIL_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_WEBSITE_INVALID' }),
    (0, class_validator_1.MaxLength)(500, { message: 't.PLACE_WEBSITE_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_CATEGORY_INVALID' }),
    __metadata("design:type", Number)
], UpdatePlaceDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_SUBCATEGORY_INVALID' }),
    __metadata("design:type", Number)
], UpdatePlaceDto.prototype, "subcategoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        if (Array.isArray(value)) {
            return value
                .map((v) => {
                const num = typeof v === 'string' ? parseInt(v, 10) : Number(v);
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((v) => parseInt(v.trim(), 10))
                .filter((v) => !isNaN(v));
        }
        return null;
    }),
    (0, class_validator_1.IsArray)({ message: 't.PLACE_IMAGE_IDS_INVALID' }),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 't.PLACE_IMAGE_IDS_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "imageIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "openingHours", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "social", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_SLUG_INVALID' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.PLACE_SLUG_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value)) {
            return value
                .map((v) => {
                const num = Number(v);
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((v) => {
                const num = Number(v.trim());
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        return value;
    }),
    (0, class_validator_1.IsArray)({ message: 't.PLACE_TAG_IDS_INVALID' }),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 't.PLACE_TAG_ID_INVALID' }),
    __metadata("design:type", Array)
], UpdatePlaceDto.prototype, "tagIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value)) {
            return value
                .map((v) => {
                const num = Number(v);
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((v) => {
                const num = Number(v.trim());
                return isNaN(num) ? null : num;
            })
                .filter((v) => v !== null);
        }
        return value;
    }),
    (0, class_validator_1.IsArray)({ message: 't.PLACE_FACILITY_IDS_INVALID' }),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 't.PLACE_FACILITY_ID_INVALID' }),
    __metadata("design:type", Array)
], UpdatePlaceDto.prototype, "facilityIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_PRICE_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_MIN_PRICE_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "minPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_MAX_PRICE_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "maxPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.PLACE_PRICE_TYPE_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "priceType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_OLD_PRICE_INVALID' }),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "oldPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)({ message: 't.PLACE_IS_PRICE_ON_REQUEST_INVALID' }),
    __metadata("design:type", Boolean)
], UpdatePlaceDto.prototype, "isPriceOnRequest", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "restaurantData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "accommodationData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "shoppingData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "transportData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "healthWellnessData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "natureOutdoorsData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlaceDto.prototype, "entertainmentData", void 0);
class PlaceQueryDto {
    categoryId;
    subcategoryId;
    userId;
    cityId;
    countryId;
    isActive;
    isFeatured;
    minPrice;
    maxPrice;
    isPriceOnRequest;
    page;
    limit;
}
exports.PlaceQueryDto = PlaceQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "subcategoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "cityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "countryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)({ message: 't.PLACE_IS_ACTIVE_INVALID' }),
    __metadata("design:type", Boolean)
], PlaceQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PlaceQueryDto.prototype, "isFeatured", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_MIN_PRICE_FILTER_INVALID' }),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "minPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.PLACE_MAX_PRICE_FILTER_INVALID' }),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "maxPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)({ message: 't.PLACE_IS_PRICE_ON_REQUEST_FILTER_INVALID' }),
    __metadata("design:type", Boolean)
], PlaceQueryDto.prototype, "isPriceOnRequest", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=place.dto.js.map