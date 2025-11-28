import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationService } from './accommodation.service';
import { Accommodation } from './accommodation.entity';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation, Place, FileEntity])],
  controllers: [],
  providers: [AccommodationService],
  exports: [AccommodationService],
})
export class AccommodationModule {}
