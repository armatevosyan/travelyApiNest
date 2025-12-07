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

@Entity('nature_outdoors')
export class NatureOutdoors {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-One relationship with Place
  @Column({ unique: true })
  placeId: number;

  @OneToOne(() => Place, (place) => place.natureOutdoors)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  // Activities Offered - An array of key activities
  @Column({ type: 'simple-array', nullable: true })
  activitiesOffered: string[] | null; // e.g., ["Hiking", "Camping", "Fishing", "Rock Climbing", "Bird Watching", "Kayaking"]

  // Equipment Rental - Available equipment for rent
  @Column({ type: 'json', nullable: true })
  equipmentRental: {
    available: boolean;
    items?: {
      name: string;
      price?: number;
      priceUnit?: string; // "per_hour", "per_day", "per_week"
    }[];
  } | null;

  // Guided Tours - Information about guided tours
  @Column({ type: 'json', nullable: true })
  guidedTours: {
    available: boolean;
    tours?: {
      name: string;
      duration?: string; // e.g., "2 hours", "Half day", "Full day"
      price?: number;
      description?: string;
    }[];
  } | null;

  // Trail Information - Details about trails
  @Column({ type: 'json', nullable: true })
  trailInformation: {
    difficulty?: string[]; // e.g., ["Easy", "Moderate", "Difficult"]
    totalLength?: number; // in kilometers or miles
    elevationGain?: number;
    estimatedTime?: string;
  } | null;

  // Permits Required - Information about permits
  @Column({ type: 'json', nullable: true })
  permitsRequired: {
    required: boolean;
    types?: string[]; // e.g., ["Camping Permit", "Fishing License", "Park Entry"]
    whereToObtain?: string;
    cost?: number;
  } | null;

  // Best Season - Best time to visit
  @Column({ type: 'simple-array', nullable: true })
  bestSeason: string[] | null; // e.g., ["Spring", "Summer", "Fall"]

  // Camping Options - Camping details
  @Column({ type: 'json', nullable: true })
  campingOptions: {
    available: boolean;
    sites?: number;
    facilities?: string[]; // e.g., ["Restrooms", "Fire Pits", "Picnic Tables", "Water Access"]
    reservationRequired?: boolean;
  } | null;

  // Booking URL - A link to book/reserve
  @Column({ type: 'varchar', length: 500, nullable: true })
  bookingUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
