import { User } from '@/modules/users/user.entity';
export declare enum SubscriptionPlan {
    MONTHLY = "monthly",
    YEARLY = "yearly"
}
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    CANCELED = "canceled",
    EXPIRED = "expired",
    FAILED = "failed"
}
export declare class Subscription {
    id: number;
    userId: number;
    user: User;
    platform: string | null;
    productId: string | null;
    plan: SubscriptionPlan | null;
    price: string | null;
    currency: string | null;
    transactionId: string;
    purchaseDate: Date | null;
    expiryDate: Date | null;
    status: SubscriptionStatus;
    rawReceipt: any;
    createdAt: Date;
    updatedAt: Date;
}
