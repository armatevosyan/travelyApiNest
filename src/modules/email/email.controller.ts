import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import type { EmailOptions } from './email.service';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorators';
import { ERoles } from '@/modules/roles/role.types';

@Controller('email')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
  async sendEmail(@Body() emailOptions: EmailOptions) {
    const success = await this.emailService.sendEmail(emailOptions);
    return {
      success,
      message: success ? 'Email sent successfully' : 'Failed to send email',
    };
  }

  @Post('test')
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
  async sendTestEmail(@Body() body: { to: string }) {
    const success = await this.emailService.sendWelcomeEmail(
      body.to,
      'Test User',
    );
    return {
      success,
      message: success
        ? 'Test email sent successfully'
        : 'Failed to send test email',
    };
  }

  @Post('test-connection')
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
  async testConnection() {
    const success = await this.emailService.testConnection();
    return {
      success,
      message: success
        ? 'Email connection successful'
        : 'Email connection failed',
    };
  }
}
