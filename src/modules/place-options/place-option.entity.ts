import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { PlaceOptionType, PlaceOptionCategory } from './place-option-type';

@Entity('place_options')
@Index(['category'])
@Index(['entityType'])
@Index(['category', 'entityType'])
@Index(['slug'])
export class PlaceOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: PlaceOptionCategory,
  })
  category: PlaceOptionCategory;

  @Column({
    type: 'enum',
    enum: PlaceOptionType,
    default: PlaceOptionType.RESTAURANT,
  })
  entityType: PlaceOptionType;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
