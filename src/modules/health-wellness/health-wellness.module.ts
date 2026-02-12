import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthWellnessService } from './health-wellness.service';
import { HealthWellness } from './health-wellness.entity';
import { Place } from '../places/place.entity';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HealthWellness, Place, Category])],
  controllers: [],
  providers: [HealthWellnessService],
  exports: [HealthWellnessService],
})
export class HealthWellnessModule {}
