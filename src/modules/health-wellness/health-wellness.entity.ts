import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Place } from '../places/place.entity';

@Entity('health_wellness')
export class HealthWellness {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-One relationship with Place
  @Column({ unique: true })
  placeId: number;

  @OneToOne(() => Place, (place) => place.healthWellness)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  // Services Offered - An array of key services
  @Column({ type: 'simple-array', nullable: true })
  servicesOffered: string[] | null; // e.g., ["Emergency Care", "Prescriptions", "Deep Tissue Massage", "Dental Cleaning"]

  // Appointment Booking URL
  @Column({ type: 'varchar', length: 500, nullable: true })
  appointmentBookingUrl: string | null;

  // Insurance Accepted - Can be boolean or array of providers (stored as JSON)
  @Column({ type: 'json', nullable: true })
  insuranceAccepted:
    | boolean
    | string[]
    | {
        accepted: boolean;
        providers?: string[];
      }
    | null;

  // Practitioners - For clinics/dentists: An array of doctors/specialists
  @Column({ type: 'json', nullable: true })
  practitioners:
    | {
        name: string;
        specialty?: string;
        qualifications?: string;
        yearsOfExperience?: number;
      }[]
    | null;

  // Membership Options - For gyms/spas: Details on memberships
  @Column({ type: 'json', nullable: true })
  membershipOptions: {
    monthly?: number;
    yearly?: number;
    weekly?: number;
    dayPass?: number;
    trialPeriod?: number; // days
    features?: string[];
  } | null;

  // Booking URL - A link to reserve/book
  @Column({ type: 'varchar', length: 500, nullable: true })
  bookingUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
