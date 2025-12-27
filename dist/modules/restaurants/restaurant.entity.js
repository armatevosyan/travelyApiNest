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
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const place_entity_1 = require("../places/place.entity");
const file_entity_1 = require("../files/entities/file.entity");
let Restaurant = class Restaurant {
    id;
    placeId;
    place;
    menuImages;
    dishImages;
    cuisineTypes;
    dietaryOptions;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Restaurant = Restaurant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Restaurant.prototype, "placeId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => place_entity_1.Place),
    (0, typeorm_1.JoinColumn)({ name: 'placeId' }),
    __metadata("design:type", place_entity_1.Place)
], Restaurant.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => file_entity_1.FileEntity),
    (0, typeorm_1.JoinTable)({
        name: 'restaurant_menu_images',
        joinColumn: { name: 'restaurantId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Restaurant.prototype, "menuImages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => file_entity_1.FileEntity),
    (0, typeorm_1.JoinTable)({
        name: 'restaurant_dish_images',
        joinColumn: { name: 'restaurantId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Restaurant.prototype, "dishImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Restaurant.prototype, "cuisineTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Restaurant.prototype, "dietaryOptions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], Restaurant.prototype, "deletedAt", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, typeorm_1.Entity)('restaurants')
], Restaurant);
//# sourceMappingURL=restaurant.entity.js.map