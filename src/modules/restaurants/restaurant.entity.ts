import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';
import { RestaurantSpecialDish } from './restaurant-special-dish.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-One relationship with Place
  @Column({ unique: true })
  placeId: number;

  @OneToOne(() => Place)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  // Menu Images (Many-to-Many with FileEntity)
  @ManyToMany(() => FileEntity)
  @JoinTable({
    name: 'restaurant_menu_images',
    joinColumn: { name: 'restaurantId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
  })
  menuImages: FileEntity[];

  // Dish Images (Many-to-Many with FileEntity)
  @ManyToMany(() => FileEntity)
  @JoinTable({
    name: 'restaurant_dish_images',
    joinColumn: { name: 'restaurantId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
  })
  dishImages: FileEntity[];

  @OneToMany(() => RestaurantSpecialDish, (d) => d.restaurant)
  specialDishes: RestaurantSpecialDish[];

  // Cuisine Information
  @Column({ type: 'simple-array', nullable: true })
  cuisineTypes: string[] | null; // ['Italian', 'Mediterranean', 'Asian']

  @Column({ type: 'simple-array', nullable: true })
  dietaryOptions: string[] | null; // ['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Kosher']

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
