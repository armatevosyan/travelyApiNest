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
exports.Tag = void 0;
const typeorm_1 = require("typeorm");
const place_entity_1 = require("../places/place.entity");
let Tag = class Tag {
    id;
    name;
    slug;
    places;
    createdAt;
    updatedAt;
};
exports.Tag = Tag;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Tag.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => place_entity_1.Place, (place) => place.tags),
    __metadata("design:type", Array)
], Tag.prototype, "places", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tag.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tag.prototype, "updatedAt", void 0);
exports.Tag = Tag = __decorate([
    (0, typeorm_1.Entity)('tags'),
    (0, typeorm_1.Index)(['name'], { unique: true }),
    (0, typeorm_1.Index)(['slug'], { unique: true })
], Tag);
//# sourceMappingURL=tag.entity.js.map