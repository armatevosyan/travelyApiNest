import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceOption } from './place-option.entity';
import { PlaceOptionQueryDto } from './place-option.dto';
import { PlaceOptionType, PlaceOptionCategory } from './place-option-type';

@Injectable()
export class PlaceOptionService {
  constructor(
    @InjectRepository(PlaceOption)
    private readonly placeOptionRepository: Repository<PlaceOption>,
  ) {}

  async findAll(query: PlaceOptionQueryDto): Promise<{
    options: PlaceOption[];
    total: number;
  }> {
    const { entityType, category, search, isActive } = query;

    const qb = this.placeOptionRepository.createQueryBuilder('placeOption');

    if (entityType) {
      qb.andWhere('placeOption.entityType = :entityType', { entityType });
    }

    if (category) {
      qb.andWhere('placeOption.category = :category', { category });
    }

    if (search) {
      qb.andWhere(
        '(placeOption.name ILIKE :search OR placeOption.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (isActive !== undefined) {
      qb.andWhere('placeOption.isActive = :isActive', { isActive });
    }

    qb.orderBy('placeOption.sortOrder', 'ASC').addOrderBy(
      'placeOption.name',
      'ASC',
    );

    const [options, total] = await qb.getManyAndCount();
    return { options, total };
  }

  async findByEntityType(
    entityType: PlaceOptionType,
    category?: PlaceOptionCategory,
  ): Promise<PlaceOption[]> {
    const qb = this.placeOptionRepository
      .createQueryBuilder('placeOption')
      .where('placeOption.entityType = :entityType', { entityType })
      .andWhere('placeOption.isActive = :isActive', { isActive: true });

    if (category) {
      qb.andWhere('placeOption.category = :category', { category });
    }

    qb.orderBy('placeOption.sortOrder', 'ASC').addOrderBy(
      'placeOption.name',
      'ASC',
    );

    return qb.getMany();
  }
}
