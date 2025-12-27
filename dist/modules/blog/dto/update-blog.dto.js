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
exports.UpdateBlogDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateBlogDto {
    title;
    description;
    categoryId;
    image;
    fileId;
}
exports.UpdateBlogDto = UpdateBlogDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.BLOG_TITLE_INVALID' }),
    (0, class_validator_1.MinLength)(2, { message: 't.BLOG_TITLE_MIN_LENGTH' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.BLOG_TITLE_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.BLOG_DESCRIPTION_INVALID' }),
    __metadata("design:type", Object)
], UpdateBlogDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.BLOG_CATEGORY_INVALID' }),
    __metadata("design:type", Number)
], UpdateBlogDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.BLOG_IMAGE_INVALID' }),
    (0, class_validator_1.MaxLength)(500, { message: 't.BLOG_IMAGE_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null || value === undefined)
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 't.BLOG_FILE_ID_INVALID' }),
    __metadata("design:type", Number)
], UpdateBlogDto.prototype, "fileId", void 0);
//# sourceMappingURL=update-blog.dto.js.map