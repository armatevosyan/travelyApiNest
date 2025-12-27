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
exports.UpdateProfileDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateProfileDto {
    fullName;
    website;
    description;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.USER_FULL_NAME_INVALID' }),
    (0, class_validator_1.MaxLength)(255, { message: 't.USER_FULL_NAME_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 't.USER_WEBSITE_INVALID' }),
    (0, class_validator_1.MaxLength)(500, { message: 't.USER_WEBSITE_MAX_LENGTH' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 't.USER_DESCRIPTION_INVALID' }),
    __metadata("design:type", Object)
], UpdateProfileDto.prototype, "description", void 0);
//# sourceMappingURL=user.dto.js.map