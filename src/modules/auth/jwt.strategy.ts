import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { ERoles } from '@/modules/roles/role.types';
import { UserService } from '@/modules/users/user.service';

dotenv.config();

export interface JwtPayload {
  sub: number; // user ID
  role: ERoles; // user role
  iat?: number; // issued at
  exp?: number; // expiration
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: JwtPayload) {
    return await this.userService.findById(payload.sub);
  }
}
