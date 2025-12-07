import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthWellness } from './health-wellness.entity';
import {
  CreateHealthWellnessDto,
  UpdateHealthWellnessDto,
} from './health-wellness.dto';
import { Place } from '../places/place.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class HealthWellnessService {
  constructor(
    @InjectRepository(HealthWellness)
    private healthWellnessRepository: Repository<HealthWellness>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createHealthWellnessDto: CreateHealthWellnessDto,
  ): Promise<HealthWellness> {
    // Check if place exists
    const place = await this.placeRepository.findOne({
      where: { id: createHealthWellnessDto.placeId },
    });
    console.log(1111);
    if (!place) {
      throw new NotFoundException(
        `Place with ID ${createHealthWellnessDto.placeId} not found`,
      );
    }

    // Check if health wellness already exists for this place
    const existingHealthWellness = await this.healthWellnessRepository.findOne({
      where: { placeId: createHealthWellnessDto.placeId },
    });

    if (existingHealthWellness) {
      throw new BadRequestException(
        `Health & Wellness already exists for place ID ${createHealthWellnessDto.placeId}`,
      );
    }

    const healthWellness = this.healthWellnessRepository.create(
      createHealthWellnessDto,
    );

    return await this.healthWellnessRepository.save(healthWellness);
  }

  async updateByPlaceId(
    placeId: number,
    updateHealthWellnessDto: UpdateHealthWellnessDto,
  ): Promise<HealthWellness> {
    const healthWellness = await this.healthWellnessRepository.findOne({
      where: { placeId },
    });

    if (!healthWellness) {
      throw new NotFoundException(
        `Health & Wellness for place ID ${placeId} not found`,
      );
    }

    // Handle nested membershipOptions merge if provided
    if (updateHealthWellnessDto.membershipOptions !== undefined) {
      const existingMembershipOptions = healthWellness.membershipOptions || {};
      healthWellness.membershipOptions = {
        ...existingMembershipOptions,
        ...updateHealthWellnessDto.membershipOptions,
      };
    }

    // Handle nested practitioners - replace entire array if provided
    if (updateHealthWellnessDto.practitioners !== undefined) {
      healthWellness.practitioners = updateHealthWellnessDto.practitioners;
    }

    // Update other fields (only if they are provided in the DTO)
    if (updateHealthWellnessDto.servicesOffered !== undefined) {
      healthWellness.servicesOffered = updateHealthWellnessDto.servicesOffered;
    }
    if (updateHealthWellnessDto.appointmentBookingUrl !== undefined) {
      healthWellness.appointmentBookingUrl =
        updateHealthWellnessDto.appointmentBookingUrl;
    }
    if (updateHealthWellnessDto.insuranceAccepted !== undefined) {
      healthWellness.insuranceAccepted =
        updateHealthWellnessDto.insuranceAccepted;
    }
    if (updateHealthWellnessDto.bookingUrl !== undefined) {
      healthWellness.bookingUrl = updateHealthWellnessDto.bookingUrl;
    }

    return await this.healthWellnessRepository.save(healthWellness);
  }

  /**
   * Check if a category is a health & wellness category
   * Categories: Hospital, Clinic, Pharmacy, Gym, Spa, Dental, etc.
   */
  async isHealthWellnessCategory(categoryId: number): Promise<boolean> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return false;

    // First, check if parent category is "Health & Wellness" (most reliable check)
    if (category.parent) {
      const parentName = category.parent.name.toLowerCase();
      if (
        parentName.includes('health') ||
        parentName.includes('wellness') ||
        parentName.includes('medical')
      ) {
        return true;
      }
    }

    // Then check if category name contains health & wellness-related keywords
    const categoryName = category.name.toLowerCase();
    const healthWellnessKeywords = [
      'health',
      'wellness',
      'hospital',
      'clinic',
      'pharmacy',
      'gym',
      'fitness',
      'spa',
      'dental',
      'dentist',
      'doctor',
      'medical',
      'therapy',
      'massage',
      'physiotherapy',
      'chiropractic',
      'optometry',
      'veterinary',
      'vet',
      'urgent care',
      'emergency',
    ];

    if (
      healthWellnessKeywords.some((keyword) => categoryName.includes(keyword))
    ) {
      return true;
    }

    return false;
  }
}
