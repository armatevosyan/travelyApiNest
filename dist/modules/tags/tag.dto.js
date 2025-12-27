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
exports.TagQueryDto = exports.CreateTagDto = void 0;
const class_validator_1 = require("class-validator");
class CreateTagDto {
    name;
    slug;
}
exports.CreateTagDto = CreateTagDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 't.TAG_NAME_INVALID' }),
    (0, class_validator_1.MinLength)(2, { message: 't.TAG_NAME_MIN_LENGTH' }),
    (0, class_validator_1.MaxLength)(100, { message: 't.TAG_NAME_MAX_LENGTH' }),
    __metadata("design:type", String)
], CreateTagDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.TAG_SLUG_INVALID' }),
    (0, class_validator_1.MaxLength)(100, { message: 't.TAG_SLUG_MAX_LENGTH' }),
    __metadata("design:type", Object)
], CreateTagDto.prototype, "slug", void 0);
class TagQueryDto {
    search;
}
exports.TagQueryDto = TagQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TagQueryDto.prototype, "search", void 0);
//# sourceMappingURL=tag.dto.js.map