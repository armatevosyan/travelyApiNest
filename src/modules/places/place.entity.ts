import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Location } from '../locations/location.entity';
import { Tag } from '../tags/tag.entity';
import { Facility } from '@/modules/facilities/facility.entity';
import { Restaurant } from '@/modules/restaurants/restaurant.entity';
import { Accommodation } from '@/modules/accommodations/accommodation.entity';
import { Shopping } from '@/modules/shopping/shopping.entity';
import { Transport } from '@/modules/transport/transport.entity';

@Entity('places')
@Index(['latitude', 'longitude'])
@Index(['categoryId'])
@Index(['userId'])
@Index(['price'])
@Index(['minPrice', 'maxPrice'])
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  // Basic Information
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  // Location Information
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string | null;

  @Column({ type: 'int', nullable: true })
  countryId: number | null;

  @ManyToOne(() => Location, { nullable: true })
  @JoinColumn({ name: 'countryId' })
  country: Location | null;

  @Column({ type: 'int', nullable: true })
  stateId: number | null;

  @ManyToOne(() => Location, { nullable: true })
  @JoinColumn({ name: 'stateId' })
  state: Location | null;

  @Column({ type: 'int', nullable: true })
  cityId: number | null;

  @ManyToOne(() => Location, { nullable: true })
  @JoinColumn({ name: 'cityId' })
  city: Location | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  postalCode: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number | null;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number | null;

  // Contact Information
  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website: string | null;

  // Category & Ownership
  @Column()
  categoryId: number;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  // Media (stored as file IDs, actual files managed through file_relations table)
  @Column({ type: 'simple-array', nullable: true })
  imageIds: number[] | null;

  // Rating & Reviews
  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ type: 'int', default: 0 })
  reviewCount: number;

  // Status & Visibility
  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  // Operating Hours (stored as JSON)
  @Column({ type: 'json', nullable: true })
  openingHours: Record<string, any> | null;

  // Social Media Links (stored as JSON)
  @Column({ type: 'json', nullable: true })
  social: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  } | null;

  // SEO & Search
  @Column({ type: 'varchar', length: 255, nullable: true })
  slug: string | null;

  // Tags (Many-to-Many relationship)
  @ManyToMany(() => Tag, (tag) => tag.places)
  @JoinTable({
    name: 'place_tags',
    joinColumn: { name: 'placeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @ManyToMany(() => Facility, (facility) => facility.places)
  @JoinTable({
    name: 'place_facilities',
    joinColumn: { name: 'placeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'facilityId', referencedColumnName: 'id' },
  })
  facilities: Facility[];

  // Category-specific relations
  @OneToOne(() => Restaurant, (restaurant) => restaurant.place, {
    nullable: true,
  })
  restaurant?: Restaurant | null;

  @OneToOne(() => Accommodation, (accommodation) => accommodation.place, {
    nullable: true,
  })
  accommodation?: Accommodation | null;

  @OneToOne(() => Shopping, (shopping) => shopping.place, {
    nullable: true,
  })
  shopping?: Shopping | null;

  @OneToOne(() => Transport, (transport) => transport.place, {
    nullable: true,
  })
  transport?: Transport | null;

  // Pricing
  @Column({ type: 'varchar', length: 20, nullable: true })
  priceType: string | null; // 'range', 'fixed', 'onRequest', 'free', 'discounted'

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number | null; // Main/base price (for fixed price)

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  minPrice: number | null; // Minimum price (for price ranges)

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxPrice: number | null; // Maximum price (for price ranges)

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  oldPrice: number | null; // Old price (for discounted items)

  @Column({ default: false })
  isPriceOnRequest: boolean; // When price is negotiable/on request

  // Metadata
  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @Column({ type: 'int', default: 0 })
  favoriteCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
