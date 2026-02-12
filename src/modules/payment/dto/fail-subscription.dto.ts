import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { SubscriptionPlan } from '@/modules/subscriptions/subscription.entity';

export class FailSubscriptionDto {
  @IsString()
  transactionId: string;

  @IsOptional()
  @IsObject()
  rawReceipt?: any;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan;
}
