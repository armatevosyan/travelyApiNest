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

@Entity('accommodations')
export class Accommodation {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-One relationship with Place
  @Column({ unique: true })
  placeId: number;

  @OneToOne(() => Place, (place) => place.accommodation)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  // Room Types (Array of objects with name, description, capacity, and photos)
  @Column({ type: 'json', nullable: true })
  roomTypes:
    | {
        name: string;
        description?: string;
        capacity: number;
        photos?: number[]; // File IDs
      }[]
    | null;

  // Booking URL
  @Column({ type: 'varchar', length: 500, nullable: true })
  bookingUrl: string | null;

  // Check-in/Check-out
  @Column({ type: 'varchar', length: 10, nullable: true })
  checkInTime: string | null; // '14:00'

  @Column({ type: 'varchar', length: 10, nullable: true })
  checkOutTime: string | null; // '11:00'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
