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
exports.Entertainment = void 0;
const typeorm_1 = require("typeorm");
const place_entity_1 = require("../places/place.entity");
let Entertainment = class Entertainment {
    id;
    placeId;
    place;
    eventSchedule;
    ticketPrice;
    ticketBookingUrl;
    currentExhibits;
    ageRestriction;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Entertainment = Entertainment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Entertainment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Entertainment.prototype, "placeId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => place_entity_1.Place, (place) => place.entertainment),
    (0, typeorm_1.JoinColumn)({ name: 'placeId' }),
    __metadata("design:type", place_entity_1.Place)
], Entertainment.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Entertainment.prototype, "eventSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Entertainment.prototype, "ticketPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Entertainment.prototype, "ticketBookingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Entertainment.prototype, "currentExhibits", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Entertainment.prototype, "ageRestriction", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Entertainment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Entertainment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], Entertainment.prototype, "deletedAt", void 0);
exports.Entertainment = Entertainment = __decorate([
    (0, typeorm_1.Entity)('entertainment')
], Entertainment);
//# sourceMappingURL=entertainment.entity.js.map