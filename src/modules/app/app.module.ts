import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerMiddleware } from 'common/middleware/logger.middleware';

import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { EmailModule } from '@/modules/email/email.module';
import { CategoryModule } from '@/modules/categories/category.module';
import { PaymentModule } from '@/modules/payment/payment.module';
import { PlaceModule } from '@/modules/places/place.module';
import { LocationModule } from '@/modules/locations/location.module';
import { BlogModule } from '@/modules/blog/blog.module';
import { TagModule } from '@/modules/tags/tag.module';
import { FilesModule } from '@/modules/files/files.module';
import { FacilityModule } from '@/modules/facilities/facility.module';
import { RestaurantModule } from '@/modules/restaurants/restaurant.module';
import { AccommodationModule } from '@/modules/accommodations/accommodation.module';
import { ShoppingModule } from '@/modules/shopping/shopping.module';
import { TransportModule } from '@/modules/transport/transport.module';
import { HealthWellnessModule } from '@/modules/health-wellness/health-wellness.module';
import { NatureOutdoorsModule } from '@/modules/nature-outdoors/nature-outdoors.module';
import { HomeModule } from '@/modules/home/home.module';

import { databaseConfig } from 'database/db.config';
import emailConfig from 'config/email.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [emailConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(
          process.cwd(),
          process.env.NODE_ENV === 'production' ? 'dist/i18n/' : 'src/i18n/',
        ),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    CategoryModule,
    PaymentModule,
    PlaceModule,
    LocationModule,
    BlogModule,
    TagModule,
    FilesModule,
    FacilityModule,
    RestaurantModule,
    AccommodationModule,
    ShoppingModule,
    TransportModule,
    HealthWellnessModule,
    NatureOutdoorsModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL }); // logs all routes
  }
}
