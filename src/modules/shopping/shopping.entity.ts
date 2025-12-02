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

@Entity('shopping')
export class Shopping {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-One relationship with Place
  @Column({ unique: true })
  placeId: number;

  @OneToOne(() => Place, (place) => place.shopping)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  // Product Categories (Array of strings)
  @Column({ type: 'simple-array', nullable: true })
  productCategories: string[] | null; // e.g., ["Men's Clothing", "Groceries", "Electronics"]

  // Brands Carried (Array of strings)
  @Column({ type: 'simple-array', nullable: true })
  brandsCarried: string[] | null; // e.g., ["Nike", "Adidas", "Apple"]

  // Online Store URL
  @Column({ type: 'varchar', length: 500, nullable: true })
  onlineStoreUrl: string | null;

  // Return Policy
  @Column({ type: 'text', nullable: true })
  returnPolicy: string | null;

  // Booking URL (for vehicle rentals or reservations)
  @Column({ type: 'varchar', length: 500, nullable: true })
  bookingUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
