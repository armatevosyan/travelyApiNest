import { SubscriptionPlan } from '@/modules/subscriptions/subscription.entity';
export declare class FailSubscriptionDto {
    transactionId: string;
    rawReceipt?: any;
    productId?: string;
    platform?: string;
    plan?: SubscriptionPlan;
}
