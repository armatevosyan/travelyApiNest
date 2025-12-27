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
exports.Transport = void 0;
const typeorm_1 = require("typeorm");
const place_entity_1 = require("../places/place.entity");
let Transport = class Transport {
    id;
    placeId;
    place;
    operator;
    transportLines;
    destinations;
    vehicleTypes;
    rentalOptions;
    bookingUrl;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Transport = Transport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Transport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Transport.prototype, "placeId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => place_entity_1.Place, (place) => place.transport),
    (0, typeorm_1.JoinColumn)({ name: 'placeId' }),
    __metadata("design:type", place_entity_1.Place)
], Transport.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Transport.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Transport.prototype, "transportLines", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Transport.prototype, "destinations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Transport.prototype, "vehicleTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Transport.prototype, "rentalOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Transport.prototype, "bookingUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Transport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Transport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], Transport.prototype, "deletedAt", void 0);
exports.Transport = Transport = __decorate([
    (0, typeorm_1.Entity)('transport')
], Transport);
//# sourceMappingURL=transport.entity.js.map