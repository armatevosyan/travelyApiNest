import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.entity';
import { RestaurantSpecialDish } from './restaurant-special-dish.entity';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';
import { Category } from '../categories/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Restaurant,
      RestaurantSpecialDish,
      Place,
      FileEntity,
      Category,
    ]),
  ],
  controllers: [],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
