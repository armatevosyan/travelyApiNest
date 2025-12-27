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
exports.ChangePasswordDto = exports.ResetPasswordDto = exports.VerifyOtpDto = exports.ForgotPasswordDto = exports.SignUpDto = exports.SignInDto = exports.EmailPasswordDto = void 0;
const class_validator_1 = require("class-validator");
class EmailPasswordDto {
    email;
    password;
}
exports.EmailPasswordDto = EmailPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 't.EMAIL_INVALID' }),
    __metadata("design:type", String)
], EmailPasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.PASSWORD_REQUIRED' }),
    (0, class_validator_1.MinLength)(6, { message: 't.PASSWORD_MIN_LENGTH' }),
    __metadata("design:type", String)
], EmailPasswordDto.prototype, "password", void 0);
class SignInDto extends EmailPasswordDto {
}
exports.SignInDto = SignInDto;
class SignUpDto extends EmailPasswordDto {
    fullName;
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.FULL_NAME_REQUIRED' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "fullName", void 0);
class ForgotPasswordDto {
    email;
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 't.EMAIL_INVALID' }),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class VerifyOtpDto {
    email;
    code;
}
exports.VerifyOtpDto = VerifyOtpDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 't.EMAIL_INVALID' }),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.RESET_TOKEN_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 't.RESET_TOKEN_INVALID' }),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "code", void 0);
class ResetPasswordDto {
    email;
    code;
    newPassword;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 't.EMAIL_INVALID' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.RESET_TOKEN_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 't.RESET_TOKEN_INVALID' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.NEW_PASSWORD_REQUIRED' }),
    (0, class_validator_1.MinLength)(6, { message: 't.PASSWORD_MIN_LENGTH' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
class ChangePasswordDto {
    password;
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 't.NEW_PASSWORD_REQUIRED' }),
    (0, class_validator_1.MinLength)(6, { message: 't.PASSWORD_MIN_LENGTH' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "password", void 0);
//# sourceMappingURL=auth.dto.js.map