import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { PaymentService } from './payment.service';
import { ConfirmSubscriptionDto } from './dto/confirm-subscription.dto';
import { FailSubscriptionDto } from './dto/fail-subscription.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // GET /payment
  @Get('payment')
  async getPayment() {
    const data = await this.paymentService.getPaymentSettings();
    return { success: true, data };
  }

  // POST /subscription/confirm
  @UseGuards(JwtAuthGuard)
  @Post('subscription/confirm')
  async confirm(@Req() req: Request, @Body() dto: ConfirmSubscriptionDto) {
    const userId = (req.user as any)?.userId as number | undefined;
    if (!userId) {
      return { success: false, message: 'Unauthorized' };
    }
    const result = await this.paymentService.confirmSubscription(userId, dto);
    return { success: true, data: result };
  }

  // POST /subscription/fail
  @UseGuards(JwtAuthGuard)
  @Post('subscription/fail')
  async fail(@Req() req: Request, @Body() dto: FailSubscriptionDto) {
    const userId = (req.user as any)?.userId as number | undefined;
    const result = await this.paymentService.failSubscription(userId ?? null, dto);
    return { success: true, data: result };
  }
}
