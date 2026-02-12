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

  // Entry Fee - e.g., "Free", "$10 per person"
  @Column({ type: 'varchar', length: 255, nullable: true })
  entryFee: string | null;

  // Key Activities - An array of things to do
  @Column({ type: 'simple-array', nullable: true })
  keyActivities: string[] | null; // e.g., ["Hiking", "Swimming", "Picnicking"]

  // Rules - A short list of important rules
  @Column({ type: 'simple-array', nullable: true })
  rules: string[] | null; // e.g., ["Pets on leash", "No open fires"]

  // Best Time to Visit - A text suggestion
  @Column({ type: 'varchar', length: 500, nullable: true })
  bestTimeToVisit: string | null; // e.g., "Spring for blooms", "Sunrise"

  // Key Exhibits - (For Zoos/Gardens) A list of main attractions
  @Column({ type: 'simple-array', nullable: true })
  keyExhibits: string[] | null; // e.g., ["Panda Enclosure", "Rose Garden"]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
