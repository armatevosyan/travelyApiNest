import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationQueryDto } from './location.dto';
import { I18nService } from 'nestjs-i18n';
import { LocationType } from './location.entity';

@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  async findAll(@Query() query: LocationQueryDto) {
    const result = await this.locationService.findAll(query);
    return {
      message: this.i18n.translate('t.LOCATIONS_RETRIEVED_SUCCESSFULLY'),
      data: result.data,
      total: result.total,
    };
  }

  @Get('list')
  async getLocations(
    @Query('parent_id') parentId?: string,
    @Query('type') type: LocationType = LocationType.COUNTRY,
  ) {
    const allowed = Object.values(LocationType);
    const resolvedType = allowed.includes(type) ? type : LocationType.COUNTRY;

    if (
      (resolvedType === LocationType.STATE ||
        resolvedType === LocationType.CITY) &&
      !parentId
    ) {
      throw new BadRequestException(
        `parent_id is required when type is '${resolvedType}'`,
      );
    }

    const locations = await this.locationService.listLegacy(
      parentId ? Number(parentId) : undefined,
      resolvedType,
    );

    const data = locations.map((loc) => ({
      term_id: loc.id,
      name: loc.name,
      type: loc.type,
      parent_id: loc.parentId ?? null,
    }));

    return { success: true, data };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const location = await this.locationService.findOne(id);
    return {
      message: this.i18n.translate('t.LOCATION_RETRIEVED_SUCCESSFULLY'),
      data: location,
    };
  }
}
