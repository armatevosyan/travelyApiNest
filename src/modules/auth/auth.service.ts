import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';

import { Role } from '@/modules/roles/role.entity';
import { EmailService } from '@/modules/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Hash a plain password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare a plain password with a hashed password
   */
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Generate a JWT access token
   */

  accessToken(
    userId: string | number,
    role: Role,
    expiresIn: JwtSignOptions['expiresIn'] = 60 * 60 * 24 * 30,
  ): string {
    const payload: { sub: string; role: string } = {
      sub: String(userId),
      role: role.name,
    };
    const options: JwtSignOptions = { expiresIn };
    return this.jwtService.sign(payload, options);
  }

  /**
   * Generate a 6-digit OTP with expiration (default 10 minutes)
   */
  generateOtp(expirationMinutes = 10): { otp: string; otpExpiration: Date } {
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + expirationMinutes);

    return { otp, otpExpiration };
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(email: string, fullName: string): Promise<boolean> {
    return this.emailService.sendWelcomeEmail(email, fullName);
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string, otp: string): Promise<boolean> {
    return this.emailService.sendPasswordResetEmail(email, otp);
  }

  /**
   * Send email verification code
   */
  async sendVerificationEmail(
    email: string,
    verificationCode: string,
  ): Promise<boolean> {
    return this.emailService.sendVerificationEmail(email, verificationCode);
  }
}
