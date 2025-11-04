import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { Place } from './place.entity';
import { CategoryModule } from '@/modules/categories/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Place]), CategoryModule],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService, TypeOrmModule],
})
export class PlaceModule {}
