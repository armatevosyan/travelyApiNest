import { PaymentService } from './payment.service';
import { ConfirmSubscriptionDto } from './dto/confirm-subscription.dto';
import { FailSubscriptionDto } from './dto/fail-subscription.dto';
import { User as IUser } from '@/modules/users/user.entity';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    getPayment(): {
        success: boolean;
        data: {
            use: boolean;
            term_condition_page: string;
            url_success: string;
            url_cancel: string;
            list: never[];
            bank_account_list: never[];
        };
    };
    confirm(user: IUser, dto: ConfirmSubscriptionDto): Promise<{
        success: boolean;
        data: {
            subscription: import("../subscriptions/subscription.entity").Subscription;
            user: IUser | null;
        };
    }>;
    fail(user: IUser, dto: FailSubscriptionDto): Promise<{
        success: boolean;
        data: {
            subscription: import("../subscriptions/subscription.entity").Subscription;
        };
    }>;
}
