import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription, SubscriptionStatus } from '@/modules/subscriptions/subscription.entity';
import { User } from '@/modules/users/user.entity';
import { ConfirmSubscriptionDto } from './dto/confirm-subscription.dto';
import { FailSubscriptionDto } from './dto/fail-subscription.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepo: Repository<Subscription>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async getPaymentSettings() {
    // No Payment settings entities in Nest app yet; return default structure like Express fallback
    return {
      use: false,
      term_condition_page: '',
      url_success: '',
      url_cancel: '',
      list: [],
      bank_account_list: [],
    };
  }

  private parseDate(value?: string | Date | null): Date | null {
    if (!value) return null;
    if (value instanceof Date) return value;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  async confirmSubscription(userId: number, dto: ConfirmSubscriptionDto) {
    const {
      transactionId,
      productId,
      platform,
      plan,
      price,
      currency,
      purchaseDate,
      expiryDate,
      status = SubscriptionStatus.ACTIVE,
      rawReceipt,
    } = dto;

    let subscription = await this.subscriptionsRepo.findOne({ where: { transactionId } });

    if (subscription) {
      subscription.userId = userId;
      subscription.productId = productId ?? null;
      subscription.platform = platform ?? null;
      subscription.plan = plan ?? null as any;
      subscription.price = price ?? null;
      subscription.currency = currency ?? null;
      subscription.purchaseDate = this.parseDate(purchaseDate);
      subscription.expiryDate = this.parseDate(expiryDate);
      subscription.status = status;
      subscription.rawReceipt = rawReceipt ?? null;
      await this.subscriptionsRepo.save(subscription);
    } else {
      subscription = this.subscriptionsRepo.create({
        userId,
        transactionId,
        productId: productId ?? null,
        platform: platform ?? null,
        plan: plan ?? null as any,
        price: price ?? null,
        currency: currency ?? null,
        purchaseDate: this.parseDate(purchaseDate),
        expiryDate: this.parseDate(expiryDate),
        status,
        rawReceipt: rawReceipt ?? null,
      });
      await this.subscriptionsRepo.save(subscription);
    }

    // Set user as pro
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (user) {
      user.isPro = true;
      await this.usersRepo.save(user);
    }

    return { subscription, user };
  }

  async failSubscription(userId: number | null, dto: FailSubscriptionDto) {
    const { transactionId, rawReceipt, productId, platform, plan } = dto;

    const subscription = this.subscriptionsRepo.create({
      userId: userId ?? (null as any),
      transactionId,
      productId: productId ?? null,
      platform: platform ?? null,
      plan: plan ?? null as any,
      status: SubscriptionStatus.FAILED,
      rawReceipt: rawReceipt ?? null,
    });
    await this.subscriptionsRepo.save(subscription);
    return { subscription };
  }
}
