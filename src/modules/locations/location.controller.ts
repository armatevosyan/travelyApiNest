import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationQueryDto } from './location.dto';
import { I18nService } from 'nestjs-i18n';

@Controller('locations')
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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const location = await this.locationService.findOne(id);
    return {
      message: this.i18n.translate('t.LOCATION_RETRIEVED_SUCCESSFULLY'),
      data: location,
    };
  }
}
