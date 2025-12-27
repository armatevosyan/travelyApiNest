import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
interface IRequest extends Request {
    body: any;
    startTime?: number;
}
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly logger;
    use(req: IRequest, res: Response, next: NextFunction): void;
    private logRequest;
}
export {};
