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
exports.HealthWellness = void 0;
const typeorm_1 = require("typeorm");
const place_entity_1 = require("../places/place.entity");
let HealthWellness = class HealthWellness {
    id;
    placeId;
    place;
    servicesOffered;
    appointmentBookingUrl;
    insuranceAccepted;
    practitioners;
    membershipOptions;
    bookingUrl;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.HealthWellness = HealthWellness;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HealthWellness.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], HealthWellness.prototype, "placeId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => place_entity_1.Place, (place) => place.healthWellness),
    (0, typeorm_1.JoinColumn)({ name: 'placeId' }),
    __metadata("design:type", place_entity_1.Place)
], HealthWellness.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], HealthWellness.prototype, "servicesOffered", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], HealthWellness.prototype, "appointmentBookingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], HealthWellness.prototype, "insuranceAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], HealthWellness.prototype, "practitioners", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], HealthWellness.prototype, "membershipOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], HealthWellness.prototype, "bookingUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HealthWellness.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HealthWellness.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], HealthWellness.prototype, "deletedAt", void 0);
exports.HealthWellness = HealthWellness = __decorate([
    (0, typeorm_1.Entity)('health_wellness')
], HealthWellness);
//# sourceMappingURL=health-wellness.entity.js.map