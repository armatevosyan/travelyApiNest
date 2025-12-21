import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurant.dto';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    // Check if place exists
    const place = await this.placeRepository.findOne({
      where: { id: createRestaurantDto.placeId },
    });

    if (!place) {
      throw new NotFoundException(
        `Place with ID ${createRestaurantDto.placeId} not found`,
      );
    }

    // Check if restaurant already exists for this place
    const existingRestaurant = await this.restaurantRepository.findOne({
      where: { placeId: createRestaurantDto.placeId },
    });

    if (existingRestaurant) {
      throw new BadRequestException(
        `Restaurant already exists for place ID ${createRestaurantDto.placeId}`,
      );
    }

    const { menuImageIds, dishImageIds, ...restaurantData } =
      createRestaurantDto;

    // Load file entities for relations
    const menuImages = menuImageIds
      ? await this.fileRepository.findByIds(menuImageIds)
      : [];
    const dishImages = dishImageIds
      ? await this.fileRepository.findByIds(dishImageIds)
      : [];

    const restaurant = this.restaurantRepository.create({
      ...restaurantData,
      menuImages,
      dishImages,
    });

    return await this.restaurantRepository.save(restaurant);
  }

  async updateByPlaceId(
    placeId: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { placeId },
      relations: ['menuImages', 'dishImages'],
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant for place ID ${placeId} not found`,
      );
    }

    const { menuImageIds, dishImageIds, ...updateData } = updateRestaurantDto;

    // Update file relations
    await this.updateFileRelations(restaurant, menuImageIds, dishImageIds);

    // Update other fields
    Object.assign(restaurant, updateData);

    return await this.restaurantRepository.save(restaurant);
  }

  /**
   * Helper method to update file relations
   */
  private async updateFileRelations(
    restaurant: Restaurant,
    menuImageIds?: number[],
    dishImageIds?: number[],
  ): Promise<void> {
    // Update menu images if provided
    if (menuImageIds !== undefined) {
      restaurant.menuImages = menuImageIds.length
        ? await this.fileRepository.findByIds(menuImageIds)
        : [];
    }

    // Update dish images if provided
    if (dishImageIds !== undefined) {
      restaurant.dishImages = dishImageIds.length
        ? await this.fileRepository.findByIds(dishImageIds)
        : [];
    }
  }
}
