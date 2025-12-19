import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location, LocationType } from './location.entity';
import { LocationQueryDto } from './location.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
    private readonly i18n: I18nService,
  ) {}

  private async loadNestedChildren(location: Location): Promise<Location> {
    if (location.type === LocationType.COUNTRY) {
      const states = await this.locationRepo.find({
        where: { parentId: location.id, type: LocationType.STATE },
        order: { name: 'ASC' },
      });

      const statesWithCities = await Promise.all(
        states.map(async (state) => {
          const cities = await this.locationRepo.find({
            where: { parentId: state.id, type: LocationType.CITY },
            order: { name: 'ASC' },
          });
          return {
            ...state,
            children: cities,
          };
        }),
      );

      return {
        ...location,
        children: statesWithCities,
      };
    } else if (location.type === LocationType.STATE) {
      const cities = await this.locationRepo.find({
        where: { parentId: location.id, type: LocationType.CITY },
        order: { name: 'ASC' },
      });
      return {
        ...location,
        children: cities,
      };
    }

    return {
      ...location,
      children: [],
    };
  }

  async findAll(
    query: LocationQueryDto,
  ): Promise<{ data: Location[]; total: number }> {
    const { type, parentId, search } = query;

    const queryBuilder = this.locationRepo.createQueryBuilder('location');

    // Only join image for countries
    if (!type || type === LocationType.COUNTRY) {
      queryBuilder.leftJoinAndSelect('location.image', 'image');
    }

    if (type) {
      queryBuilder.andWhere('location.type = :type', { type });
    }

    if (parentId !== undefined) {
      if (parentId === null) {
        queryBuilder.andWhere('location.parentId IS NULL');
      } else {
        queryBuilder.andWhere('location.parentId = :parentId', { parentId });
      }
    }

    if (search) {
      queryBuilder.andWhere('location.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('location.name', 'ASC');

    const [data, total] = await queryBuilder.getManyAndCount();

    const processedData = await Promise.all(
      data.map((location) => this.loadNestedChildren(location)),
    );

    return { data: processedData, total };
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepo.findOne({
      where: { id },
      relations: ['parent'],
    });

    if (!location) {
      throw new NotFoundException(this.i18n.translate('t.LOCATION_NOT_FOUND'));
    }

    // Only load image for countries
    if (location.type === LocationType.COUNTRY) {
      const locationWithImage = await this.locationRepo.findOne({
        where: { id },
        relations: ['parent', 'image'],
      });
      return this.loadNestedChildren(locationWithImage!);
    }

    return this.loadNestedChildren(location);
  }

  async validateLocationHierarchy(
    countryId?: number | null,
    stateId?: number | null,
    cityId?: number | null,
  ): Promise<void> {
    if (cityId) {
      const city = await this.findOne(cityId);
      if (city.type !== LocationType.CITY) {
        throw new BadRequestException(
          this.i18n.translate('t.PLACE_CITY_INVALID_TYPE'),
        );
      }

      if (stateId) {
        if (city.parentId !== stateId) {
          throw new BadRequestException(
            this.i18n.translate('t.PLACE_CITY_STATE_MISMATCH'),
          );
        }
      } else {
        throw new BadRequestException(
          this.i18n.translate('t.PLACE_STATE_REQUIRED_FOR_CITY'),
        );
      }
    }

    if (stateId) {
      const state = await this.findOne(stateId);
      if (state.type !== LocationType.STATE) {
        throw new BadRequestException(
          this.i18n.translate('t.PLACE_STATE_INVALID_TYPE'),
        );
      }

      if (countryId) {
        if (state.parentId !== countryId) {
          throw new BadRequestException(
            this.i18n.translate('t.PLACE_STATE_COUNTRY_MISMATCH'),
          );
        }
      } else {
        throw new BadRequestException(
          this.i18n.translate('t.PLACE_COUNTRY_REQUIRED_FOR_STATE'),
        );
      }
    }

    if (countryId) {
      const country = await this.findOne(countryId);
      if (country.type !== LocationType.COUNTRY) {
        throw new BadRequestException(
          this.i18n.translate('t.PLACE_COUNTRY_INVALID_TYPE'),
        );
      }
    }
  }
}
