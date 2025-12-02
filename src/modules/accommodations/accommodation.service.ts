import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import {
  CreateAccommodationDto,
  UpdateAccommodationDto,
} from './accommodation.dto';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepository: Repository<Accommodation>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createAccommodationDto: CreateAccommodationDto,
  ): Promise<Accommodation> {
    // Check if place exists
    const place = await this.placeRepository.findOne({
      where: { id: createAccommodationDto.placeId },
    });

    if (!place) {
      throw new NotFoundException(
        `Place with ID ${createAccommodationDto.placeId} not found`,
      );
    }

    // Check if accommodation already exists for this place
    const existingAccommodation = await this.accommodationRepository.findOne({
      where: { placeId: createAccommodationDto.placeId },
    });

    if (existingAccommodation) {
      throw new BadRequestException(
        `Accommodation already exists for place ID ${createAccommodationDto.placeId}`,
      );
    }

    const accommodation = this.accommodationRepository.create(
      createAccommodationDto,
    );

    return await this.accommodationRepository.save(accommodation);
  }

  async findOne(id: number): Promise<Accommodation> {
    const accommodation = await this.accommodationRepository.findOne({
      where: { id },
    });

    if (!accommodation) {
      throw new NotFoundException(`Accommodation with ID ${id} not found`);
    }

    return accommodation;
  }

  async update(
    id: number,
    updateAccommodationDto: UpdateAccommodationDto,
  ): Promise<Accommodation> {
    const accommodation = await this.findOne(id);

    Object.assign(accommodation, updateAccommodationDto);

    return await this.accommodationRepository.save(accommodation);
  }

  async updateByPlaceId(
    placeId: number,
    updateAccommodationDto: UpdateAccommodationDto,
  ): Promise<Accommodation> {
    const accommodation = await this.accommodationRepository.findOne({
      where: { placeId },
    });

    if (!accommodation) {
      throw new NotFoundException(
        `Accommodation for place ID ${placeId} not found`,
      );
    }

    Object.assign(accommodation, updateAccommodationDto);

    return await this.accommodationRepository.save(accommodation);
  }

  /**
   * Load room photos for accommodation room types
   * This method extracts all photo IDs from roomTypes and loads the FileEntity objects
   */
  async loadRoomPhotos(
    accommodation: Accommodation,
  ): Promise<Accommodation & { roomTypesWithPhotos?: any[] }> {
    if (!accommodation.roomTypes || accommodation.roomTypes.length === 0) {
      return accommodation;
    }

    // Extract all photo IDs from all room types
    const allPhotoIds: number[] = [];
    accommodation.roomTypes.forEach((roomType) => {
      if (roomType.photos && Array.isArray(roomType.photos)) {
        allPhotoIds.push(...roomType.photos);
      }
    });

    if (allPhotoIds.length === 0) {
      return accommodation;
    }

    // Load all file entities at once
    const photoFiles = await this.fileRepository.find({
      where: { id: In(allPhotoIds) },
    });

    // Create a map for quick lookup
    const photoMap = new Map(photoFiles.map((file) => [file.id, file]));

    // Map room types with loaded photo entities
    const roomTypesWithPhotos = accommodation.roomTypes.map((roomType) => ({
      ...roomType,
      photos: roomType.photos
        ? roomType.photos
            .map((photoId) => photoMap.get(photoId))
            .filter((photo) => photo !== undefined)
        : [],
    }));

    return {
      ...accommodation,
      roomTypesWithPhotos,
    };
  }

  /**
   * Check if a category is an accommodation category
   * Categories: Hotel, Hostel, Airbnb, Resort, Motel, Bed & Breakfast
   */
  async isAccommodationCategory(categoryId: number): Promise<boolean> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parent'],
    });

    if (!category) return false;

    // Check if category name contains accommodation-related keywords
    const categoryName = category.name.toLowerCase();
    const accommodationKeywords = [
      'hotel',
      'hostel',
      'airbnb',
      'resort',
      'motel',
      'bed',
      'breakfast',
      'accommodation',
      'lodging',
      'inn',
      'guesthouse',
    ];

    if (
      accommodationKeywords.some((keyword) => categoryName.includes(keyword))
    ) {
      return true;
    }

    // Check if parent category is "Accommodation"
    if (category.parent) {
      const parentName = category.parent.name.toLowerCase();
      if (parentName.includes('accommodation') || parentName.includes('stay')) {
        return true;
      }
    }

    return false;
  }
}
