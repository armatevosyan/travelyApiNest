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
import { Category } from '../categories/category.entity';

@Injectable()
export class NatureOutdoorsService {
  constructor(
    @InjectRepository(NatureOutdoors)
    private natureOutdoorsRepository: Repository<NatureOutdoors>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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

    // Handle nested objects merge if provided
    if (updateNatureOutdoorsDto.equipmentRental !== undefined) {
      const existingEquipmentRental = natureOutdoors.equipmentRental || {};
      natureOutdoors.equipmentRental = {
        ...existingEquipmentRental,
        ...updateNatureOutdoorsDto.equipmentRental,
      };
    }

    if (updateNatureOutdoorsDto.guidedTours !== undefined) {
      const existingGuidedTours = natureOutdoors.guidedTours || {};
      natureOutdoors.guidedTours = {
        ...existingGuidedTours,
        ...updateNatureOutdoorsDto.guidedTours,
      };
    }

    if (updateNatureOutdoorsDto.trailInformation !== undefined) {
      const existingTrailInformation = natureOutdoors.trailInformation || {};
      natureOutdoors.trailInformation = {
        ...existingTrailInformation,
        ...updateNatureOutdoorsDto.trailInformation,
      };
    }

    if (updateNatureOutdoorsDto.permitsRequired !== undefined) {
      const existingPermitsRequired = natureOutdoors.permitsRequired || {};
      natureOutdoors.permitsRequired = {
        ...existingPermitsRequired,
        ...updateNatureOutdoorsDto.permitsRequired,
      };
    }

    if (updateNatureOutdoorsDto.campingOptions !== undefined) {
      const existingCampingOptions = natureOutdoors.campingOptions || {};
      natureOutdoors.campingOptions = {
        ...existingCampingOptions,
        ...updateNatureOutdoorsDto.campingOptions,
      };
    }

    // Update other fields (only if they are provided in the DTO)
    if (updateNatureOutdoorsDto.activitiesOffered !== undefined) {
      natureOutdoors.activitiesOffered =
        updateNatureOutdoorsDto.activitiesOffered;
    }
    if (updateNatureOutdoorsDto.bestSeason !== undefined) {
      natureOutdoors.bestSeason = updateNatureOutdoorsDto.bestSeason;
    }
    if (updateNatureOutdoorsDto.bookingUrl !== undefined) {
      natureOutdoors.bookingUrl = updateNatureOutdoorsDto.bookingUrl;
    }

    return await this.natureOutdoorsRepository.save(natureOutdoors);
  }

  /**
   * Check if a category is a nature & outdoors category
   * Categories: Park, Forest, Beach, Mountain, Trail, Campground, etc.
   */
  async isNatureOutdoorsCategory(categoryId: number): Promise<boolean> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return false;

    // First, check if parent category is "Nature & Outdoors" (most reliable check)
    if (category.parent) {
      const parentName = category.parent.name.toLowerCase();
      if (
        parentName.includes('nature') ||
        parentName.includes('outdoor') ||
        parentName.includes('recreation')
      ) {
        return true;
      }
    }

    // Then check if category name contains nature & outdoors-related keywords
    const categoryName = category.name.toLowerCase();
    const natureOutdoorsKeywords = [
      'park',
      'forest',
      'beach',
      'mountain',
      'trail',
      'campground',
      'camping',
      'hiking',
      'nature',
      'outdoor',
      'wildlife',
      'reserve',
      'sanctuary',
      'national park',
      'state park',
      'lake',
      'river',
      'waterfall',
      'canyon',
      'desert',
      'cave',
      'garden',
      'botanical',
      'zoo',
      'aquarium',
    ];

    if (
      natureOutdoorsKeywords.some((keyword) => categoryName.includes(keyword))
    ) {
      return true;
    }

    return false;
  }
}
