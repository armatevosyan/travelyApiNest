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
import { RestaurantSpecialDish } from './restaurant-special-dish.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantSpecialDish)
    private restaurantSpecialDishRepository: Repository<RestaurantSpecialDish>,
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

    const { menuImageIds, dishImageIds, specialDishes, ...restaurantData } =
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

    const savedRestaurant = await this.restaurantRepository.save(restaurant);

    if (Array.isArray(specialDishes) && specialDishes.length > 0) {
      await this.replaceSpecialDishes(savedRestaurant.id, specialDishes);
    }

    return await this.restaurantRepository.findOneOrFail({
      where: { id: savedRestaurant.id },
      relations: [
        'menuImages',
        'dishImages',
        'specialDishes',
        'specialDishes.file',
      ],
    });
  }

  async updateByPlaceId(
    placeId: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { placeId },
      relations: ['menuImages', 'dishImages', 'specialDishes', 'specialDishes.file'],
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant for place ID ${placeId} not found`,
      );
    }

    const { menuImageIds, dishImageIds, specialDishes, ...updateData } =
      updateRestaurantDto;

    // Update file relations
    await this.updateFileRelations(restaurant, menuImageIds, dishImageIds);

    // Update other fields
    Object.assign(restaurant, updateData);

    const saved = await this.restaurantRepository.save(restaurant);

    // Replace special dishes only when explicitly provided
    if (specialDishes !== undefined) {
      await this.replaceSpecialDishes(saved.id, specialDishes || []);
    }

    return await this.restaurantRepository.findOneOrFail({
      where: { id: saved.id },
      relations: [
        'menuImages',
        'dishImages',
        'specialDishes',
        'specialDishes.file',
      ],
    });
  }

  private async replaceSpecialDishes(
    restaurantId: number,
    specialDishes: {
      imageId: number;
      title?: string | null;
      description?: string | null;
    }[],
  ): Promise<void> {
    await this.restaurantSpecialDishRepository.delete({ restaurantId });

    if (!specialDishes.length) return;

    const fileIds = Array.from(
      new Set(
        specialDishes
          .map((d) => d?.imageId)
          .filter(
            (v): v is number => typeof v === 'number' && Number.isFinite(v),
          ),
      ),
    );
    const files = fileIds.length
      ? await this.fileRepository.findByIds(fileIds)
      : [];
    const fileById = new Map(files.map((f) => [f.id, f] as const));

    const rows = specialDishes
      .filter((d) => fileById.has(d.imageId))
      .map((d) =>
        this.restaurantSpecialDishRepository.create({
          restaurantId,
          fileId: d.imageId,
          file: fileById.get(d.imageId)!,
          title:
            typeof d.title === 'string' ? d.title.trim().slice(0, 255) : null,
          description:
            typeof d.description === 'string' ? d.description.trim() : null,
        }),
      );

    if (rows.length) {
      await this.restaurantSpecialDishRepository.save(rows);
    }
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
