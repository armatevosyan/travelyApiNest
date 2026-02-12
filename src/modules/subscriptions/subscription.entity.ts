import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/modules/users/user.entity';

export enum SubscriptionPlan {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  EXPIRED = 'expired',
  FAILED = 'failed',
}

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'varchar', nullable: true })
  platform: string | null;

  @Column({ type: 'varchar', nullable: true })
  productId: string | null;

  @Column({
    type: 'enum',
    enum: SubscriptionPlan,
    nullable: true,
  })
  plan: SubscriptionPlan | null;

  @Column({ type: 'varchar', nullable: true })
  price: string | null;

  @Column({ type: 'varchar', nullable: true })
  currency: string | null;

  @Column({ type: 'varchar', unique: true })
  transactionId: string;

  @Column({ type: 'timestamp', nullable: true })
  purchaseDate: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date | null;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;

  @Column({ type: 'json', nullable: true })
  rawReceipt: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
