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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
let Category = class Category {
    id;
    name;
    slug;
    description;
    icon;
    color;
    isActive;
    isPro;
    sortOrder;
    parentId;
    parent;
    children;
    places;
    deletedAt;
    createdAt;
    updatedAt;
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true, nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Category.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Category.prototype, "isPro", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Category.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category, (category) => category.children, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    __metadata("design:type", Object)
], Category.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Category, (category) => category.parent),
    __metadata("design:type", Array)
], Category.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Place', 'category'),
    __metadata("design:type", Array)
], Category.prototype, "places", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], Category.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)('categories')
], Category);
//# sourceMappingURL=category.entity.js.map