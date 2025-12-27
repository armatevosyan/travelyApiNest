"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LoggerMiddleware = class LoggerMiddleware {
    logger = new common_1.Logger('HTTP');
    use(req, res, next) {
        const startTime = Date.now();
        req.startTime = startTime;
        res.on('finish', () => {
            const duration = Date.now() - startTime;
            this.logRequest(req, res, duration);
        });
        next();
    }
    logRequest(req, res, duration) {
        const { method, originalUrl, ip, headers } = req;
        const statusCode = res.statusCode;
        const clientIp = headers['x-forwarded-for']?.split(',')[0]?.trim() ||
            headers['x-real-ip'] ||
            req.socket.remoteAddress ||
            ip ||
            'unknown';
        const logMessage = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;
        const logDetails = [`IP: ${clientIp}`].join(' | ');
        if (statusCode >= 500) {
            this.logger.error(`${logMessage} | ${logDetails}`);
        }
        else if (statusCode >= 400) {
            this.logger.warn(`${logMessage} | ${logDetails}`);
        }
        else {
            this.logger.log(`${logMessage} | ${logDetails}`);
        }
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map