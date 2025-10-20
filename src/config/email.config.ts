import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { EmailConfig } from '@/modules/email/email.service';

dotenv.config();

export default registerAs<EmailConfig>(
  'email',
  (): EmailConfig => ({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  }),
);
