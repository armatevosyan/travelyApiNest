import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${originalUrl}`);

    // Optional: log request body for POST/PUT
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      console.log('Body:', req.body);
    }

    next();
  }
}
