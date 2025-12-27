import { SubscriptionPlan, SubscriptionStatus } from '@/modules/subscriptions/subscription.entity';
export declare class ConfirmSubscriptionDto {
    transactionId: string;
    productId?: string;
    platform?: string;
    plan?: SubscriptionPlan;
    price?: string;
    currency?: string;
    purchaseDate?: string;
    expiryDate?: string;
    status?: SubscriptionStatus;
    rawReceipt?: any;
}
