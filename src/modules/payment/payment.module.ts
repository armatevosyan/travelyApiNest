import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Subscription } from '@/modules/subscriptions/subscription.entity';
import { User } from '@/modules/users/user.entity';
import { AuthMiddleware } from '@/common/middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@/modules/auth/auth.service';
import { EmailModule } from '@/modules/email/email.module';
import { UserService } from 'modules/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User]), EmailModule],
  controllers: [PaymentController],
  providers: [PaymentService, JwtService, UserService, AuthService],
})
export class PaymentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // middleware chain
      .forRoutes(
        { path: 'subscription/confirm', method: RequestMethod.POST },
        { path: 'subscription/fail', method: RequestMethod.POST },
      );
  }
}
