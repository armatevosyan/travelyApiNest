import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/users/user.service';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
