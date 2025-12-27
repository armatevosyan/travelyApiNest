import { I18nService } from 'nestjs-i18n';
export declare class AppService {
    private readonly i18n;
    constructor(i18n: I18nService);
    getHello(): string;
}
