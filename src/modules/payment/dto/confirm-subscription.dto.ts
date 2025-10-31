import {
  IsEnum,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  SubscriptionPlan,
  SubscriptionStatus,
} from '@/modules/subscriptions/subscription.entity';

export class ConfirmSubscriptionDto {
  @IsString()
  transactionId: string;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsISO8601({ strict: false })
  purchaseDate?: string;

  @IsOptional()
  @IsISO8601({ strict: false })
  expiryDate?: string;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @IsOptional()
  @IsObject()
  rawReceipt?: any;
}
