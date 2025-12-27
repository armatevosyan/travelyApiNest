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
exports.CategoryQueryDto = exports.UpdateCategoryDto = exports.CreateCategoryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateCategoryDto {
    name;
    description;
    icon;
    color;
    isActive;
    sortOrder;
    parentId;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.CATEGORY_NAME_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 't.CATEGORY_NAME_INVALID' }),
    (0, class_validator_1.MinLength)(2, { message: 't.CATEGORY_NAME_MIN_LENGTH' }),
    (0, class_validator_1.MaxLength)(50, { message: 't.CATEGORY_NAME_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.CATEGORY_DESCRIPTION_INVALID' }),
    (0, class_validator_1.MaxLength)(500, { message: 't.CATEGORY_DESCRIPTION_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.CATEGORY_ICON_INVALID' }),
    (0, class_validator_1.MaxLength)(100, { message: 't.CATEGORY_ICON_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.CATEGORY_COLOR_INVALID' }),
    (0, class_validator_1.MaxLength)(20, { message: 't.CATEGORY_COLOR_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)({ message: 't.CATEGORY_IS_ACTIVE_INVALID' }),
    __metadata("design:type", Boolean)
], CreateCategoryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.CATEGORY_SORT_ORDER_INVALID' }),
    __metadata("design:type", Number)
], CreateCategoryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' ||
            value === 'null' ||
            value === null ||
            value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.CATEGORY_PARENT_ID_INVALID' }),
    __metadata("design:type", Object)
], CreateCategoryDto.prototype, "parentId", void 0);
class UpdateCategoryDto {
    name;
    description;
    icon;
    color;
    isActive;
    sortOrder;
    parentId;
}
exports.UpdateCategoryDto = UpdateCategoryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.CATEGORY_NAME_INVALID' }),
    (0, class_validator_1.MinLength)(2, { message: 't.CATEGORY_NAME_MIN_LENGTH' }),
    (0, class_validator_1.MaxLength)(50, { message: 't.CATEGORY_NAME_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.CATEGORY_DESCRIPTION_INVALID' }),
    (0, class_validator_1.MaxLength)(500, { message: 't.CATEGORY_DESCRIPTION_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.CATEGORY_ICON_INVALID' }),
    (0, class_validator_1.MaxLength)(100, { message: 't.CATEGORY_ICON_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdateCategoryDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.CATEGORY_COLOR_INVALID' }),
    (0, class_validator_1.MaxLength)(20, { message: 't.CATEGORY_COLOR_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdateCategoryDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)({ message: 't.CATEGORY_IS_ACTIVE_INVALID' }),
    __metadata("design:type", Boolean)
], UpdateCategoryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.CATEGORY_SORT_ORDER_INVALID' }),
    __metadata("design:type", Number)
], UpdateCategoryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' ||
            value === 'null' ||
            value === null ||
            value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.CATEGORY_PARENT_ID_INVALID' }),
    __metadata("design:type", Object)
], UpdateCategoryDto.prototype, "parentId", void 0);
class CategoryQueryDto {
    search;
    isActive;
    parentId;
    onlyParents;
    onlyChildren;
    page;
    limit;
}
exports.CategoryQueryDto = CategoryQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoryQueryDto.prototype, "search", void 0);
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
], CategoryQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' ||
            value === 'null' ||
            value === null ||
            value === undefined)
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CategoryQueryDto.prototype, "parentId", void 0);
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
], CategoryQueryDto.prototype, "onlyParents", void 0);
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
], CategoryQueryDto.prototype, "onlyChildren", void 0);
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
], CategoryQueryDto.prototype, "page", void 0);
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
], CategoryQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=category.dto.js.map