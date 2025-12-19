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
import { Category } from '../categories/category.entity';

@Injectable()
export class EntertainmentService {
  constructor(
    @InjectRepository(Entertainment)
    private entertainmentRepository: Repository<Entertainment>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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

  /**
   * Check if a category is an entertainment category
   * Categories: Cinema, Theater, Museum, Concert Hall, Amusement Park, Nightclub, etc.
   */
  async isEntertainmentCategory(categoryId: number): Promise<boolean> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return false;

    // Check if category name contains entertainment-related keywords
    const categoryName = category.name.toLowerCase();
    const entertainmentKeywords = [
      'entertainment',
      'cinema',
      'theater',
      'theatre',
      'museum',
      'concert',
      'amusement',
      'nightclub',
      'club',
      'arcade',
      'casino',
      'gallery',
      'show',
      'performance',
      'venue',
    ];

    if (
      entertainmentKeywords.some((keyword) => categoryName.includes(keyword))
    ) {
      return true;
    }

    // Check if parent category is "Entertainment"
    if (category.parent) {
      const parentName = category.parent.name.toLowerCase();
      if (parentName.includes('entertainment')) {
        return true;
      }
    }

    return false;
  }
}
