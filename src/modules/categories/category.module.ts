import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { Location } from '../locations/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Location])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService, TypeOrmModule],
})
export class CategoryModule {}
