import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transport } from './transport.entity';
import { CreateTransportDto, UpdateTransportDto } from './transport.dto';
import { Place } from '../places/place.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class TransportService {
  constructor(
    @InjectRepository(Transport)
    private transportRepository: Repository<Transport>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createTransportDto: CreateTransportDto): Promise<Transport> {
    // Check if place exists
    const place = await this.placeRepository.findOne({
      where: { id: createTransportDto.placeId },
    });

    if (!place) {
      throw new NotFoundException(
        `Place with ID ${createTransportDto.placeId} not found`,
      );
    }

    // Check if transport already exists for this place
    const existingTransport = await this.transportRepository.findOne({
      where: { placeId: createTransportDto.placeId },
    });

    if (existingTransport) {
      throw new BadRequestException(
        `Transport already exists for place ID ${createTransportDto.placeId}`,
      );
    }

    const transport = this.transportRepository.create(createTransportDto);

    return await this.transportRepository.save(transport);
  }

  async findOne(id: number): Promise<Transport> {
    const transport = await this.transportRepository.findOne({
      where: { id },
    });

    if (!transport) {
      throw new NotFoundException(`Transport with ID ${id} not found`);
    }

    return transport;
  }

  async updateByPlaceId(
    placeId: number,
    updateTransportDto: UpdateTransportDto,
  ): Promise<Transport> {
    const transport = await this.transportRepository.findOne({
      where: { placeId },
    });

    if (!transport) {
      throw new NotFoundException(
        `Transport for place ID ${placeId} not found`,
      );
    }

    // Handle nested rentalOptions merge if provided
    if (updateTransportDto.rentalOptions !== undefined) {
      const existingRentalOptions = transport.rentalOptions || {};
      transport.rentalOptions = {
        ...existingRentalOptions,
        ...updateTransportDto.rentalOptions,
      };
    }

    // Update other fields (only if they are provided in the DTO)
    if (updateTransportDto.operator !== undefined) {
      transport.operator = updateTransportDto.operator;
    }
    if (updateTransportDto.transportLines !== undefined) {
      transport.transportLines = updateTransportDto.transportLines;
    }
    if (updateTransportDto.destinations !== undefined) {
      transport.destinations = updateTransportDto.destinations;
    }
    if (updateTransportDto.vehicleTypes !== undefined) {
      transport.vehicleTypes = updateTransportDto.vehicleTypes;
    }
    if (updateTransportDto.bookingUrl !== undefined) {
      transport.bookingUrl = updateTransportDto.bookingUrl;
    }

    return await this.transportRepository.save(transport);
  }

  /**
   * Check if a category is a transport category
   * Categories: Bus Station, Train Station, Airport, Car Rental, Bike Rental, Taxi Service, etc.
   */
  async isTransportCategory(categoryId: number): Promise<boolean> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return false;

    // First, check if parent category is "Transport" (most reliable check)
    if (category.parent) {
      const parentName = category.parent.name.toLowerCase();
      if (
        parentName.includes('transport') ||
        parentName.includes('transportation')
      ) {
        return true;
      }
    }

    // Then check if category name contains transport-related keywords
    const categoryName = category.name.toLowerCase();
    const transportKeywords = [
      'transport',
      'transportation',
      'bus',
      'train',
      'airport',
      'station',
      'rental',
      'taxi',
      'metro',
      'subway',
      'ferry',
      'port',
      'terminal',
      'shuttle',
      'transit',
      'bike',
      'bicycle',
      'car',
    ];

    if (transportKeywords.some((keyword) => categoryName.includes(keyword))) {
      return true;
    }

    return false;
  }
}
