import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NatureOutdoors } from './nature-outdoors.entity';
import {
  CreateNatureOutdoorsDto,
  UpdateNatureOutdoorsDto,
} from './nature-outdoors.dto';
import { Place } from '../places/place.entity';

@Injectable()
export class NatureOutdoorsService {
  constructor(
    @InjectRepository(NatureOutdoors)
    private natureOutdoorsRepository: Repository<NatureOutdoors>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async create(
    createNatureOutdoorsDto: CreateNatureOutdoorsDto,
  ): Promise<NatureOutdoors> {
    // Check if place exists
    const place = await this.placeRepository.findOne({
      where: { id: createNatureOutdoorsDto.placeId },
    });

    if (!place) {
      throw new NotFoundException(
        `Place with ID ${createNatureOutdoorsDto.placeId} not found`,
      );
    }

    // Check if nature outdoors already exists for this place
    const existingNatureOutdoors = await this.natureOutdoorsRepository.findOne({
      where: { placeId: createNatureOutdoorsDto.placeId },
    });

    if (existingNatureOutdoors) {
      throw new BadRequestException(
        `Nature & Outdoors already exists for place ID ${createNatureOutdoorsDto.placeId}`,
      );
    }

    const natureOutdoors = this.natureOutdoorsRepository.create(
      createNatureOutdoorsDto,
    );

    return await this.natureOutdoorsRepository.save(natureOutdoors);
  }

  async updateByPlaceId(
    placeId: number,
    updateNatureOutdoorsDto: UpdateNatureOutdoorsDto,
  ): Promise<NatureOutdoors> {
    const natureOutdoors = await this.natureOutdoorsRepository.findOne({
      where: { placeId },
    });

    if (!natureOutdoors) {
      throw new NotFoundException(
        `Nature & Outdoors for place ID ${placeId} not found`,
      );
    }

    // Update fields (only if they are provided in the DTO)
    if (updateNatureOutdoorsDto.entryFee !== undefined) {
      natureOutdoors.entryFee = updateNatureOutdoorsDto.entryFee;
    }
    if (updateNatureOutdoorsDto.keyActivities !== undefined) {
      natureOutdoors.keyActivities = updateNatureOutdoorsDto.keyActivities;
    }
    if (updateNatureOutdoorsDto.rules !== undefined) {
      natureOutdoors.rules = updateNatureOutdoorsDto.rules;
    }
    if (updateNatureOutdoorsDto.bestTimeToVisit !== undefined) {
      natureOutdoors.bestTimeToVisit = updateNatureOutdoorsDto.bestTimeToVisit;
    }
    if (updateNatureOutdoorsDto.keyExhibits !== undefined) {
      natureOutdoors.keyExhibits = updateNatureOutdoorsDto.keyExhibits;
    }

    return await this.natureOutdoorsRepository.save(natureOutdoors);
  }
}
