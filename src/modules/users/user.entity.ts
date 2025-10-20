import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from 'modules/roles/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

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

  @Column({ type: 'varchar', nullable: true })
  googleId: string | null;

  @Column({ type: 'varchar', nullable: true })
  appleId: string | null;

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  @Column()
  roleId: number;

  @Column({ type: 'varchar', nullable: true })
  otp: string | null;

  @Column({ type: 'timestamp', nullable: true })
  otpExpiration: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  deactivatedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
