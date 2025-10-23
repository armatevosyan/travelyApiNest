import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
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

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.createTransporter();
    this.testConnectionOnStartup();
  }

  private testConnectionOnStartup() {
    // Test connection after a short delay to allow the service to fully initialize
    setTimeout(() => {
      this.testConnection()
        .then((isConnected) => {
          if (!isConnected) {
            this.logger.warn(
              '⚠️ Email service is not properly configured. Check your .env file.',
            );
          }
        })
        .catch((error) => {
          this.logger.error('❌ Email service connection test failed:', error);
        });
    }, 1000);
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('✅ Email connection verified successfully');
      return true;
    } catch (error) {
      this.logger.error('❌ Email connection failed:', error);

      return false;
    }
  }

  private createTransporter() {
    const emailConfig = this.configService.get<EmailConfig>('email');
    // Log configuration (without sensitive data)
    this.logger.log('Email configuration:', {
      host: emailConfig?.host || 'smtp.gmail.com',
      port: emailConfig?.port || 587,
      secure: emailConfig?.secure || false,
      user: emailConfig?.user
        ? `${emailConfig.user.substring(0, 3)}***`
        : 'not set',
    });

    // Use port 465 with SSL for Gmail (more reliable)
    const port = emailConfig?.port || 465;
    const isSecure = port === 465;

    this.transporter = nodemailer.createTransport({
      host: emailConfig?.host || 'smtp.gmail.com',
      port: port,
      secure: isSecure, // true for 465, false for 587
      auth: {
        user: emailConfig?.user,
        pass: emailConfig?.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const emailConfig = this.configService.get<EmailConfig>('email');
      const mailOptions = {
        from: emailConfig?.from || emailConfig?.user || '',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result: IResult = await this.transporter.sendMail(mailOptions);

      this.logger.log(
        `Email sent successfully to ${options.to}: ${result?.messageId || 'unknown'}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${options.to}:`,
        error instanceof Error ? error.message : String(error),
      );

      return false;
    }
  }

  async sendWelcomeEmail(to: string, fullName: string): Promise<boolean> {
    const subject = 'Welcome to Travely!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to Travely, ${fullName}!</h1>
        <p>Thank you for joining our platform. We're excited to have you on board!</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <br>
        <p>Best regards,<br>The Travely Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject,
      html,
    });
  }

  async sendPasswordResetEmail(to: string, otp: string): Promise<boolean> {
    const subject = 'Password Reset Request';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Password Reset Request</h1>
        <p>You requested a password reset for your Travely account.</p>
        <p>Please use the following code to reset your password:</p>
        <h2 style="color: #007bff; text-align: center; background-color: #f8f9fa; padding: 20px; border-radius: 8px; font-size: 32px; letter-spacing: 4px;">
          ${otp}
        </h2>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <br>
        <p>Best regards,<br>The Travely Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject,
      html,
    });
  }

  async sendVerificationEmail(
    to: string,
    verificationCode: string,
  ): Promise<boolean> {
    const subject = 'Email Verification';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Verify Your Email</h1>
        <p>Please use the following code to verify your email address:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; margin: 20px 0;">
          ${verificationCode}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <br>
        <p>Best regards,<br>The Travely Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject,
      html,
    });
  }
}
