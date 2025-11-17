import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
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
export class EmailService implements OnModuleInit {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.logger.log('Initializing email service...');
    this.createTransporter();
    this.testConnectionOnStartup();
  }

  private testConnectionOnStartup() {
    setTimeout(() => {
      this.logger.debug('Testing email connection...');
      this.testConnection()
        .then((isConnected) => {
          if (!isConnected) {
            this.logger.warn(
              'Email service connection test failed. Email functionality may not work properly.',
            );
            this.logger.warn(
              'Please check your .env file and ensure EMAIL_USER and EMAIL_PASS are set correctly.',
            );
          }
        })
        .catch((error) => {
          this.logger.error(
            `Email service connection test failed: ${error instanceof Error ? error.message : String(error)}`,
            error instanceof Error ? error.stack : undefined,
          );
        });
    }, 1000);
  }

  async testConnection(): Promise<boolean> {
    try {
      this.logger.debug('Verifying email transporter connection...');
      await this.transporter.verify();
      this.logger.log('Email connection verified successfully');
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Email connection verification failed: ${errorMessage}`,
        errorStack,
      );

      // Provide helpful context based on error type
      if (errorMessage.includes('Invalid login')) {
        this.logger.error(
          'Authentication failed. Please check EMAIL_USER and EMAIL_PASS in your .env file.',
        );
      } else if (errorMessage.includes('ECONNREFUSED')) {
        this.logger.error(
          'Connection refused. Please check EMAIL_HOST and EMAIL_PORT in your .env file.',
        );
      } else if (errorMessage.includes('ETIMEDOUT')) {
        this.logger.error(
          'Connection timeout. Please check your network connection and EMAIL_HOST.',
        );
      }

      return false;
    }
  }

  private createTransporter() {
    const emailConfig = this.configService.get<EmailConfig>('email');
    const host = emailConfig?.host || 'smtp.gmail.com';
    const port = emailConfig?.port || 587;
    const isSecure = port === 465;
    const hasCredentials = !!(emailConfig?.user && emailConfig?.pass);
    const maskedUser = emailConfig?.user
      ? `${emailConfig.user.substring(0, 3)}***`
      : 'not set';

    this.logger.log('Creating email transporter with configuration:');
    this.logger.log(`  Host: ${host}`);
    this.logger.log(`  Port: ${port}`);
    this.logger.log(`  Secure: ${isSecure}`);
    this.logger.log(`  User: ${maskedUser}`);
    this.logger.log(
      `  Credentials: ${hasCredentials ? 'configured' : 'missing'}`,
    );

    if (!hasCredentials) {
      this.logger.warn(
        'Email credentials are missing. Email functionality will be disabled.',
      );
      this.logger.warn(
        'Please set EMAIL_USER and EMAIL_PASS in your .env file to enable email sending.',
      );
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: isSecure,
      auth: {
        user: emailConfig?.user,
        pass: emailConfig?.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.logger.log('Email transporter created successfully');
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const startTime = Date.now();
    const emailConfig = this.configService.get<EmailConfig>('email');

    // Check if email is configured
    if (!emailConfig?.user || !emailConfig?.pass) {
      this.logger.warn(
        `Cannot send email to ${options.to}: Email credentials not configured`,
      );
      this.logger.warn(
        'Please set EMAIL_USER and EMAIL_PASS in your .env file to enable email sending.',
      );
      return false;
    }

    try {
      this.logger.debug(
        `Preparing to send email to ${options.to} with subject: "${options.subject}"`,
      );

      const mailOptions = {
        from: emailConfig?.from || emailConfig?.user || '',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const result: IResult = await this.transporter.sendMail(mailOptions);

      const duration = Date.now() - startTime;
      const messageId = result?.messageId || 'unknown';
      const accepted = result?.accepted?.length || 0;
      const rejected = result?.rejected?.length || 0;

      this.logger.log(
        `Email sent successfully to ${options.to} (${duration}ms)`,
      );
      this.logger.debug(
        `  Message ID: ${messageId}, Accepted: ${accepted}, Rejected: ${rejected}`,
      );

      if (rejected > 0 && result?.rejected) {
        this.logger.warn(
          `Some recipients were rejected: ${result.rejected.join(', ')}`,
        );
      }

      return true;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Failed to send email to ${options.to} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );

      // Provide helpful context based on error type
      if (errorMessage.includes('Invalid login')) {
        this.logger.error(
          'Authentication failed. Please verify EMAIL_USER and EMAIL_PASS in your .env file.',
        );
      } else if (errorMessage.includes('ECONNREFUSED')) {
        this.logger.error(
          'Connection refused. Please check EMAIL_HOST and EMAIL_PORT settings.',
        );
      } else if (errorMessage.includes('ETIMEDOUT')) {
        this.logger.error(
          'Connection timeout. Please check your network connection.',
        );
      }

      return false;
    }
  }

  async sendWelcomeEmail(to: string, fullName: string): Promise<boolean> {
    this.logger.debug(`Sending welcome email to ${to} for user: ${fullName}`);
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

    const result = await this.sendEmail({
      to,
      subject,
      html,
    });

    if (result) {
      this.logger.log(`Welcome email sent successfully to ${to}`);
    } else {
      this.logger.error(`Failed to send welcome email to ${to}`);
    }

    return result;
  }

  async sendPasswordResetEmail(to: string, otp: string): Promise<boolean> {
    this.logger.debug(`Sending password reset email to ${to}`);
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

    const result = await this.sendEmail({
      to,
      subject,
      html,
    });

    if (result) {
      this.logger.log(`Password reset email sent successfully to ${to}`);
    } else {
      this.logger.error(`Failed to send password reset email to ${to}`);
    }

    return result;
  }

  async sendVerificationEmail(
    to: string,
    verificationCode: string,
  ): Promise<boolean> {
    this.logger.debug(`Sending verification email to ${to}`);
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

    const result = await this.sendEmail({
      to,
      subject,
      html,
    });

    if (result) {
      this.logger.log(`Verification email sent successfully to ${to}`);
    } else {
      this.logger.error(`Failed to send verification email to ${to}`);
    }

    return result;
  }
}
