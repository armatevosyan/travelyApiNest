import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceOption } from './place-option.entity';
import { PlaceOptionService } from './place-option.service';
import { PlaceOptionController } from './place-option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceOption])],
  providers: [PlaceOptionService],
  controllers: [PlaceOptionController],
  exports: [PlaceOptionService, TypeOrmModule],
})
export class PlaceOptionModule {}
