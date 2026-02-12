import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface IRequest extends Request {
  body: any;
  startTime?: number;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: IRequest, res: Response, next: NextFunction) {
    const startTime = Date.now();
    req.startTime = startTime;

    // Capture response finish event
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      this.logRequest(req, res, duration);
    });

    next();
  }

  private logRequest(req: IRequest, res: Response, duration: number): void {
    const { method, originalUrl, ip, headers } = req;
    const statusCode = res.statusCode;

    // Get client IP (considering proxy headers)
    const clientIp =
      (headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      ip ||
      'unknown';

    // Build log message with key information
    const logMessage = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;

    // Build detailed context for debugging
    const logDetails = [`IP: ${clientIp}`].join(' | ');

    // Use appropriate log level based on status code
    if (statusCode >= 500) {
      this.logger.error(`${logMessage} | ${logDetails}`);
    } else if (statusCode >= 400) {
      this.logger.warn(`${logMessage} | ${logDetails}`);
    } else {
      this.logger.log(`${logMessage} | ${logDetails}`);
    }
  }
}
