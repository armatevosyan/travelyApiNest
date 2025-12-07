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
import { TransportModule } from '@/modules/transport/transport.module';
import { HealthWellnessModule } from '@/modules/health-wellness/health-wellness.module';
import { NatureOutdoorsModule } from '@/modules/nature-outdoors/nature-outdoors.module';

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
    TransportModule,
    HealthWellnessModule,
    NatureOutdoorsModule,
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService, TypeOrmModule],
})
export class PlaceModule {}
