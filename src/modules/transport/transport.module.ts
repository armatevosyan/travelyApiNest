import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportService } from './transport.service';
import { Transport } from './transport.entity';
import { Place } from '../places/place.entity';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transport, Place, Category])],
  controllers: [],
  providers: [TransportService],
  exports: [TransportService],
})
export class TransportModule {}
