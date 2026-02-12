import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingService } from './shopping.service';
import { Shopping } from './shopping.entity';
import { Place } from '../places/place.entity';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shopping, Place, Category])],
  controllers: [],
  providers: [ShoppingService],
  exports: [ShoppingService],
})
export class ShoppingModule {}
