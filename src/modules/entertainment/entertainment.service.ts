import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entertainment } from './entertainment.entity';
import {
  CreateEntertainmentDto,
  UpdateEntertainmentDto,
} from './entertainment.dto';
import { Place } from '../places/place.entity';

@Injectable()
export class EntertainmentService {
  constructor(
    @InjectRepository(Entertainment)
    private entertainmentRepository: Repository<Entertainment>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async create(
    createEntertainmentDto: CreateEntertainmentDto,
  ): Promise<Entertainment> {
    // Check if place exists
    const place = await this.placeRepository.findOne({
      where: { id: createEntertainmentDto.placeId },
    });

    if (!place) {
      throw new NotFoundException(
        `Place with ID ${createEntertainmentDto.placeId} not found`,
      );
    }

    // Check if entertainment already exists for this place
    const existingEntertainment = await this.entertainmentRepository.findOne({
      where: { placeId: createEntertainmentDto.placeId },
    });

    if (existingEntertainment) {
      throw new BadRequestException(
        `Entertainment already exists for place ID ${createEntertainmentDto.placeId}`,
      );
    }

    const entertainment = this.entertainmentRepository.create(
      createEntertainmentDto,
    );

    return await this.entertainmentRepository.save(entertainment);
  }

  async updateByPlaceId(
    placeId: number,
    updateEntertainmentDto: UpdateEntertainmentDto,
  ): Promise<Entertainment> {
    const entertainment = await this.entertainmentRepository.findOne({
      where: { placeId },
    });

    if (!entertainment) {
      throw new NotFoundException(
        `Entertainment for place ID ${placeId} not found`,
      );
    }

    Object.assign(entertainment, updateEntertainmentDto);

    return await this.entertainmentRepository.save(entertainment);
  }
}
