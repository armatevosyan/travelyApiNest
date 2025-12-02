import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { Place } from './place.entity';
import { CategoryModule } from '@/modules/categories/category.module';
import { LocationModule } from '@/modules/locations/location.module';
import { TagModule } from '@/modules/tags/tag.module';
import { FacilityModule } from '@/modules/facilities/facility.module';
import { RestaurantModule } from '@/modules/restaurants/restaurant.module';
import { AccommodationModule } from '@/modules/accommodations/accommodation.module';
import { ShoppingModule } from '@/modules/shopping/shopping.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    CategoryModule,
    LocationModule,
    TagModule,
    FacilityModule,
    RestaurantModule,
    AccommodationModule,
    ShoppingModule,
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService, TypeOrmModule],
})
export class PlaceModule {}
