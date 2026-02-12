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

@Entity('transport')
export class Transport {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-One relationship with Place
  @Column({ unique: true })
  placeId: number;

  @OneToOne(() => Place, (place) => place.transport)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  // Operator - The company that runs it (e.g., "Amtrak", "Greyhound")
  @Column({ type: 'varchar', length: 255, nullable: true })
  operator: string | null;

  // Transport Lines - An array of key routes or lines (e.g., "Red Line", "Route 5B")
  @Column({ type: 'simple-array', nullable: true })
  transportLines: string[] | null;

  // Destinations - An array of major destinations served
  @Column({ type: 'simple-array', nullable: true })
  destinations: string[] | null;

  // Vehicle Types - For Rentals (Car, Bike, Taxi): An array of options (e.g., "Sedan", "Mountain Bike", "Van")
  @Column({ type: 'simple-array', nullable: true })
  vehicleTypes: string[] | null;

  // Rental Options - Structured pricing (e.g., {"per_hour": 10, "per_day": 50})
  @Column({ type: 'json', nullable: true })
  rentalOptions: {
    perHour?: number;
    perDay?: number;
    perWeek?: number;
    perMonth?: number;
  } | null;

  // Booking URL - A link to reserve a vehicle
  @Column({ type: 'varchar', length: 500, nullable: true })
  bookingUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
