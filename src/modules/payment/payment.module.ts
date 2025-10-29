import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Subscription } from '@/modules/subscriptions/subscription.entity';
import { User } from '@/modules/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
