import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export interface EmailConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string | undefined;
    pass: string | undefined;
    from: string | undefined;
    frontendUrl: string;
}
export interface IResult {
    messageId?: string;
    envelope?: any;
    accepted?: string[];
    rejected?: string[];
    pending?: string[];
    response?: string;
}
export interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    template?: string;
    context?: Record<string, any>;
}
export declare class EmailService implements OnModuleInit {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    private testConnectionOnStartup;
    testConnection(): Promise<boolean>;
    private createTransporter;
    sendEmail(options: EmailOptions): Promise<boolean>;
    sendWelcomeEmail(to: string, fullName: string): Promise<boolean>;
    sendPasswordResetEmail(to: string, otp: string): Promise<boolean>;
    sendVerificationEmail(to: string, verificationCode: string): Promise<boolean>;
}
