import { EmailService } from './email.service';
import type { EmailOptions } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(emailOptions: EmailOptions): Promise<{
        success: boolean;
        message: string;
    }>;
    sendTestEmail(body: {
        to: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    testConnection(): Promise<{
        success: boolean;
        message: string;
    }>;
}
