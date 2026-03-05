import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { AdminPlacesController } from './admin-places.controller';
import { Place } from './place.entity';
import { PlaceReview } from './place-review.entity';
import { PlaceReviewService } from './place-review.service';
import { PlaceReviewsController } from './place-reviews.controller';
import { Category } from '@/modules/categories/category.entity';
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
import { EntertainmentModule } from '@/modules/entertainment/entertainment.module';
import { Wishlist } from '@/modules/wishlist/wishlist.entity';
import { FilesModule } from '@/modules/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place, PlaceReview, Category, Wishlist]),
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
    EntertainmentModule,
    FilesModule,
  ],
  providers: [PlaceService, PlaceReviewService],
  controllers: [PlaceController, PlaceReviewsController, AdminPlacesController],
  exports: [PlaceService, PlaceReviewService, TypeOrmModule],
})
export class PlaceModule {}
