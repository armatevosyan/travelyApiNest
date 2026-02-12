import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatureOutdoorsService } from './nature-outdoors.service';
import { NatureOutdoors } from './nature-outdoors.entity';
import { Place } from '../places/place.entity';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NatureOutdoors, Place, Category])],
  controllers: [],
  providers: [NatureOutdoorsService],
  exports: [NatureOutdoorsService],
})
export class NatureOutdoorsModule {}
