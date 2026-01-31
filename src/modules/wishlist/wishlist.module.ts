import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './wishlist.entity';
import { Place } from '@/modules/places/place.entity';
import { FileRelation } from '@/modules/files/entities/file-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Place, FileRelation])],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}
