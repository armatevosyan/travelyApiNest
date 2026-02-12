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

@Injectable()
export class TransportService {
  constructor(
    @InjectRepository(Transport)
    private transportRepository: Repository<Transport>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
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
}
