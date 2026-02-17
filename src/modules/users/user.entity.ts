import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Role } from 'modules/roles/role.entity';
import { FileEntity } from '@/modules/files/entities/file.entity';

@Entity('users')
@Unique(['email', 'provider'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'varchar', nullable: true })
  email: string | null;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'en' })
  language: string;

  @Column({ type: 'varchar', nullable: true })
  verifyCode: string | null;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isPro: boolean;

  @Column({ type: 'varchar', nullable: true })
  googleId: string | null;

  @Column({ type: 'varchar', nullable: true })
  appleId: string | null;

  @Column({ type: 'varchar', nullable: true })
  provider: string | null;

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  @Column()
  roleId: number;

  @Column({ type: 'varchar', nullable: true })
  otp: string | null;

  @Column({ type: 'timestamp', nullable: true })
  otpExpiration: Date | null;

  @ManyToOne(() => FileEntity, { eager: true })
  @JoinColumn({ name: 'profileImageId' })
  profileImage: FileEntity;

  @Column({ type: 'int', nullable: true })
  profileImageId: number | null;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  deactivatedAt: Date | null;

  @Column({ type: 'boolean', nullable: true, default: true })
  notificationsEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
