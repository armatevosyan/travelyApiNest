import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntertainmentService } from './entertainment.service';
import { Entertainment } from './entertainment.entity';
import { Place } from '../places/place.entity';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entertainment, Place, Category])],
  controllers: [],
  providers: [EntertainmentService],
  exports: [EntertainmentService],
})
export class EntertainmentModule {}
