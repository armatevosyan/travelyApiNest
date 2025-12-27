"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    jwtService;
    emailService;
    constructor(jwtService, emailService) {
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    accessToken(userId, role, expiresIn = 60 * 60 * 24 * 30) {
        const payload = {
            sub: String(userId),
            role: role.name,
        };
        const options = { expiresIn };
        return this.jwtService.sign(payload, options);
    }
    generateOtp(expirationMinutes = 10) {
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + expirationMinutes);
        return { otp, otpExpiration };
    }
    async sendWelcomeEmail(email, fullName) {
        return this.emailService.sendWelcomeEmail(email, fullName);
    }
    async sendPasswordResetEmail(email, otp) {
        return this.emailService.sendPasswordResetEmail(email, otp);
    }
    async sendVerificationEmail(email, verificationCode) {
        return this.emailService.sendVerificationEmail(email, verificationCode);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map