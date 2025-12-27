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
exports.Place = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const category_entity_1 = require("../categories/category.entity");
const location_entity_1 = require("../locations/location.entity");
const tag_entity_1 = require("../tags/tag.entity");
const facility_entity_1 = require("../facilities/facility.entity");
const restaurant_entity_1 = require("../restaurants/restaurant.entity");
const accommodation_entity_1 = require("../accommodations/accommodation.entity");
const shopping_entity_1 = require("../shopping/shopping.entity");
const transport_entity_1 = require("../transport/transport.entity");
const health_wellness_entity_1 = require("../health-wellness/health-wellness.entity");
const nature_outdoors_entity_1 = require("../nature-outdoors/nature-outdoors.entity");
const entertainment_entity_1 = require("../entertainment/entertainment.entity");
let Place = class Place {
    id;
    name;
    description;
    address;
    countryId;
    country;
    stateId;
    state;
    cityId;
    city;
    postalCode;
    latitude;
    longitude;
    phone;
    email;
    website;
    categoryId;
    subcategoryId;
    category;
    subcategory;
    userId;
    user;
    imageIds;
    averageRating;
    reviewCount;
    isActive;
    isVerified;
    isFeatured;
    openingHours;
    social;
    slug;
    tags;
    facilities;
    restaurant;
    accommodation;
    shopping;
    transport;
    healthWellness;
    natureOutdoors;
    entertainment;
    priceType;
    price;
    minPrice;
    maxPrice;
    oldPrice;
    isPriceOnRequest;
    viewCount;
    favoriteCount;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Place = Place;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Place.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Place.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'countryId' }),
    __metadata("design:type", Object)
], Place.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'stateId' }),
    __metadata("design:type", Object)
], Place.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'cityId' }),
    __metadata("design:type", Object)
], Place.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Place.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "subcategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], Place.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'subcategoryId' }),
    __metadata("design:type", Object)
], Place.prototype, "subcategory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Place.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Place.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "imageIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Place.prototype, "averageRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Place.prototype, "reviewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Place.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Place.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Place.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "openingHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "social", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, (tag) => tag.places),
    (0, typeorm_1.JoinTable)({
        name: 'place_tags',
        joinColumn: { name: 'placeId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Place.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => facility_entity_1.Facility, (facility) => facility.places),
    (0, typeorm_1.JoinTable)({
        name: 'place_facilities',
        joinColumn: { name: 'placeId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'facilityId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Place.prototype, "facilities", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => restaurant_entity_1.Restaurant, (restaurant) => restaurant.place, {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Place.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => accommodation_entity_1.Accommodation, (accommodation) => accommodation.place, {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Place.prototype, "accommodation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => shopping_entity_1.Shopping, (shopping) => shopping.place, {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Place.prototype, "shopping", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => transport_entity_1.Transport, (transport) => transport.place, {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Place.prototype, "transport", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => health_wellness_entity_1.HealthWellness, (healthWellness) => healthWellness.place, {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Place.prototype, "healthWellness", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => nature_outdoors_entity_1.NatureOutdoors, (natureOutdoors) => natureOutdoors.place, {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Place.prototype, "natureOutdoors", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entertainment_entity_1.Entertainment, (entertainment) => entertainment.place, {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Place.prototype, "entertainment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "priceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "minPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "maxPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Place.prototype, "oldPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Place.prototype, "isPriceOnRequest", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Place.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Place.prototype, "favoriteCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Place.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Place.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], Place.prototype, "deletedAt", void 0);
exports.Place = Place = __decorate([
    (0, typeorm_1.Entity)('places'),
    (0, typeorm_1.Index)(['latitude', 'longitude']),
    (0, typeorm_1.Index)(['categoryId']),
    (0, typeorm_1.Index)(['userId']),
    (0, typeorm_1.Index)(['price']),
    (0, typeorm_1.Index)(['minPrice', 'maxPrice'])
], Place);
//# sourceMappingURL=place.entity.js.map