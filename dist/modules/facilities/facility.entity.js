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
exports.Facility = void 0;
const typeorm_1 = require("typeorm");
const place_entity_1 = require("../places/place.entity");
let Facility = class Facility {
    id;
    name;
    icon;
    description;
    count;
    places;
    createdAt;
    updatedAt;
};
exports.Facility = Facility;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Facility.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Facility.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Facility.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Facility.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Facility.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => place_entity_1.Place, (place) => place.facilities),
    __metadata("design:type", Array)
], Facility.prototype, "places", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Facility.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Facility.prototype, "updatedAt", void 0);
exports.Facility = Facility = __decorate([
    (0, typeorm_1.Entity)('facilities'),
    (0, typeorm_1.Index)(['name'], { unique: true })
], Facility);
//# sourceMappingURL=facility.entity.js.map