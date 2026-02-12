import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { FileEntity } from '@/modules/files/entities/file.entity';

@Entity('restaurant_special_dishes')
@Index(['restaurantId'])
@Index(['fileId'])
export class RestaurantSpecialDish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurantId: number;

  @ManyToOne(() => Restaurant, (r) => r.specialDishes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @Column()
  fileId: number;

  @ManyToOne(() => FileEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'fileId' })
  file: FileEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
