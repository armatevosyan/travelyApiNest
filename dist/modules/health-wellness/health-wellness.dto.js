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
exports.UpdateHealthWellnessDto = exports.CreateHealthWellnessDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PractitionerDto {
    name;
    specialty;
    qualifications;
    yearsOfExperience;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PractitionerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PractitionerDto.prototype, "specialty", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PractitionerDto.prototype, "qualifications", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PractitionerDto.prototype, "yearsOfExperience", void 0);
class MembershipOptionsDto {
    monthly;
    yearly;
    weekly;
    dayPass;
    trialPeriod;
    features;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MembershipOptionsDto.prototype, "monthly", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MembershipOptionsDto.prototype, "yearly", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MembershipOptionsDto.prototype, "weekly", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MembershipOptionsDto.prototype, "dayPass", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MembershipOptionsDto.prototype, "trialPeriod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], MembershipOptionsDto.prototype, "features", void 0);
class CreateHealthWellnessDto {
    placeId;
    servicesOffered;
    appointmentBookingUrl;
    insuranceAccepted;
    practitioners;
    membershipOptions;
    bookingUrl;
}
exports.CreateHealthWellnessDto = CreateHealthWellnessDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateHealthWellnessDto.prototype, "placeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateHealthWellnessDto.prototype, "servicesOffered", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateHealthWellnessDto.prototype, "appointmentBookingUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateHealthWellnessDto.prototype, "insuranceAccepted", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PractitionerDto),
    __metadata("design:type", Array)
], CreateHealthWellnessDto.prototype, "practitioners", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MembershipOptionsDto),
    __metadata("design:type", Object)
], CreateHealthWellnessDto.prototype, "membershipOptions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateHealthWellnessDto.prototype, "bookingUrl", void 0);
class UpdateHealthWellnessDto {
    servicesOffered;
    appointmentBookingUrl;
    insuranceAccepted;
    practitioners;
    membershipOptions;
    bookingUrl;
}
exports.UpdateHealthWellnessDto = UpdateHealthWellnessDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateHealthWellnessDto.prototype, "servicesOffered", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateHealthWellnessDto.prototype, "appointmentBookingUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateHealthWellnessDto.prototype, "insuranceAccepted", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PractitionerDto),
    __metadata("design:type", Array)
], UpdateHealthWellnessDto.prototype, "practitioners", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MembershipOptionsDto),
    __metadata("design:type", Object)
], UpdateHealthWellnessDto.prototype, "membershipOptions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateHealthWellnessDto.prototype, "bookingUrl", void 0);
//# sourceMappingURL=health-wellness.dto.js.map