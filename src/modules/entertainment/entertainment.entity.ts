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

@Entity('entertainment')
export class Entertainment {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-One relationship with Place
  @Column({ unique: true })
  placeId: number;

  @OneToOne(() => Place, (place) => place.entertainment)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  // Event Schedule - A URL or structured data for current and upcoming shows/events
  @Column({ type: 'text', nullable: true })
  eventSchedule: string | null;

  // Ticket Price - Structured data like {"adult": 20, "child": 10}
  @Column({ type: 'json', nullable: true })
  ticketPrice: Record<string, any> | null;

  // Ticket Booking URL
  @Column({ type: 'varchar', length: 500, nullable: true })
  ticketBookingUrl: string | null;

  // Current Exhibits - For museums, a list of current special exhibits
  @Column({ type: 'simple-array', nullable: true })
  currentExhibits: string[] | null;

  // Age Restriction
  @Column({ type: 'varchar', length: 100, nullable: true })
  ageRestriction: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
