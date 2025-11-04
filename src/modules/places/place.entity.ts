import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity('places')
@Index(['latitude', 'longitude'])
@Index(['categoryId'])
@Index(['userId'])
@Index(['priceRange'])
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

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string | null;

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

  // Media
  @Column({ type: 'varchar', length: 500, nullable: true })
  coverImage: string | null;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

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

  // Social Media Links
  @Column({ type: 'varchar', length: 500, nullable: true })
  facebookUrl: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  instagramUrl: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  twitterUrl: string | null;

  // SEO & Search
  @Column({ type: 'varchar', length: 255, nullable: true })
  slug: string | null;

  @Column({ type: 'text', nullable: true })
  tags: string | null;

  // Pricing
  @Column({ type: 'varchar', length: 10, nullable: true })
  priceRange: string | null; // $, $$, $$$, $$$$

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
