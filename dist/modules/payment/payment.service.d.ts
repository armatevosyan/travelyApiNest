import { Repository } from 'typeorm';
import { Subscription } from '@/modules/subscriptions/subscription.entity';
import { User } from '@/modules/users/user.entity';
import { ConfirmSubscriptionDto } from './dto/confirm-subscription.dto';
import { FailSubscriptionDto } from './dto/fail-subscription.dto';
export declare class PaymentService {
    private readonly subscriptionsRepo;
    private readonly usersRepo;
    constructor(subscriptionsRepo: Repository<Subscription>, usersRepo: Repository<User>);
    getPaymentSettings(): {
        use: boolean;
        term_condition_page: string;
        url_success: string;
        url_cancel: string;
        list: never[];
        bank_account_list: never[];
    };
    private parseDate;
    confirmSubscription(userId: number, dto: ConfirmSubscriptionDto): Promise<{
        subscription: Subscription;
        user: User | null;
    }>;
    failSubscription(userId: number, dto: FailSubscriptionDto): Promise<{
        subscription: Subscription;
    }>;
}
