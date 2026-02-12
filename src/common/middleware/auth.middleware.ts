import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@/modules/auth/jwt.strategy';
import { UserService } from '@/modules/users/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      req.role = payload.role;
      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid user');
      }
      req.user = user;

      next();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
