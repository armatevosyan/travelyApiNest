import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface IRequest extends Omit<Request, 'body'> {
  body: object;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: IRequest, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${originalUrl}`);

    // Optional Log sanitized body for POST/PUT/PATCH
    // if (['POST', 'PUT', 'PATCH'].includes(method)) {
    //   const body = { ...req.body };
    //
    //   if ('password' in body && body?.password) {
    //     delete body.password;
    //   }
    //   console.log('Body:', body);
    // }

    next();
  }
}
