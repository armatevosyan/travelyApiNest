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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accommodation = void 0;
const typeorm_1 = require("typeorm");
const place_entity_1 = require("../places/place.entity");
let Accommodation = class Accommodation {
    id;
    placeId;
    place;
    roomTypes;
    bookingUrl;
    checkInTime;
    checkOutTime;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Accommodation = Accommodation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Accommodation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Accommodation.prototype, "placeId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => place_entity_1.Place, (place) => place.accommodation),
    (0, typeorm_1.JoinColumn)({ name: 'placeId' }),
    __metadata("design:type", place_entity_1.Place)
], Accommodation.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Accommodation.prototype, "roomTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Accommodation.prototype, "bookingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], Accommodation.prototype, "checkInTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], Accommodation.prototype, "checkOutTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Accommodation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Accommodation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], Accommodation.prototype, "deletedAt", void 0);
exports.Accommodation = Accommodation = __decorate([
    (0, typeorm_1.Entity)('accommodations')
], Accommodation);
//# sourceMappingURL=accommodation.entity.js.map