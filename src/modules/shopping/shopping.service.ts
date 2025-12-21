import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shopping } from './shopping.entity';
import { CreateShoppingDto, UpdateShoppingDto } from './shopping.dto';
import { Place } from '../places/place.entity';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(Shopping)
    private shoppingRepository: Repository<Shopping>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async create(createShoppingDto: CreateShoppingDto): Promise<Shopping> {
    // Check if place exists
    const place = await this.placeRepository.findOne({
      where: { id: createShoppingDto.placeId },
    });

    if (!place) {
      throw new NotFoundException(
        `Place with ID ${createShoppingDto.placeId} not found`,
      );
    }

    // Check if shopping already exists for this place
    const existingShopping = await this.shoppingRepository.findOne({
      where: { placeId: createShoppingDto.placeId },
    });

    if (existingShopping) {
      throw new BadRequestException(
        `Shopping already exists for place ID ${createShoppingDto.placeId}`,
      );
    }

    const shopping = this.shoppingRepository.create(createShoppingDto);

    return await this.shoppingRepository.save(shopping);
  }

  async findOne(id: number): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne({
      where: { id },
    });

    if (!shopping) {
      throw new NotFoundException(`Shopping with ID ${id} not found`);
    }

    return shopping;
  }

  async findByPlaceId(placeId: number): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne({
      where: { placeId },
    });

    if (!shopping) {
      throw new NotFoundException(`Shopping for place ID ${placeId} not found`);
    }

    return shopping;
  }

  async update(
    id: number,
    updateShoppingDto: UpdateShoppingDto,
  ): Promise<Shopping> {
    const shopping = await this.findOne(id);

    Object.assign(shopping, updateShoppingDto);

    return await this.shoppingRepository.save(shopping);
  }

  async updateByPlaceId(
    placeId: number,
    updateShoppingDto: UpdateShoppingDto,
  ): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne({
      where: { placeId },
    });

    if (!shopping) {
      throw new NotFoundException(`Shopping for place ID ${placeId} not found`);
    }

    Object.assign(shopping, updateShoppingDto);

    return await this.shoppingRepository.save(shopping);
  }
}
