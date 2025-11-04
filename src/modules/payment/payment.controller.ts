import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { PaymentService } from './payment.service';
import { ConfirmSubscriptionDto } from './dto/confirm-subscription.dto';
import { FailSubscriptionDto } from './dto/fail-subscription.dto';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // GET /payment
  @Get('payment')
  getPayment() {
    const data = this.paymentService.getPaymentSettings();
    return { success: true, data };
  }

  // POST /subscription/confirm
  @UseGuards(JwtAuthGuard)
  @Post('subscription/confirm')
  async confirm(@User() user: IUser, @Body() dto: ConfirmSubscriptionDto) {
    const result = await this.paymentService.confirmSubscription(user.id, dto);
    return { success: true, data: result };
  }

  // POST /subscription/fail
  @UseGuards(JwtAuthGuard)
  @Post('subscription/fail')
  async fail(@User() user: IUser, @Body() dto: FailSubscriptionDto) {
    const result = await this.paymentService.failSubscription(
      user?.id ?? null,
      dto,
    );
    return { success: true, data: result };
  }
}
