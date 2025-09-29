import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';

import { Role } from '@/modules/roles/role.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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
  accessToken(userId: number, role: Role): string {
    const payload = { sub: userId, role: role.name };
    return this.jwtService.sign(payload);
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
}
