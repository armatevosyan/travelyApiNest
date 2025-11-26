import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.entity';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Place, FileEntity])],
  controllers: [],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
