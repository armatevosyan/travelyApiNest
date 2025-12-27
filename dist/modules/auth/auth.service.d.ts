import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Role } from '@/modules/roles/role.entity';
import { EmailService } from '@/modules/email/email.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly emailService;
    constructor(jwtService: JwtService, emailService: EmailService);
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    accessToken(userId: string | number, role: Role, expiresIn?: JwtSignOptions['expiresIn']): string;
    generateOtp(expirationMinutes?: number): {
        otp: string;
        otpExpiration: Date;
    };
    sendWelcomeEmail(email: string, fullName: string): Promise<boolean>;
    sendPasswordResetEmail(email: string, otp: string): Promise<boolean>;
    sendVerificationEmail(email: string, verificationCode: string): Promise<boolean>;
}
