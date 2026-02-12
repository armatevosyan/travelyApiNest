import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { Category } from '../categories/category.entity';
import { Location } from '../locations/location.entity';
import { Place } from '../places/place.entity';
import { Blog } from '../blog/blog.entity';
import { Wishlist } from '../wishlist/wishlist.entity';
import { BlogModule } from '../blog/blog.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Location, Place, Blog, Wishlist]),
    BlogModule,
    FilesModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
