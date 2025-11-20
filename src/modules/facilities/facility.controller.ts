import { Controller, Get, Query } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { FacilityService } from './facility.service';
import { FacilityQueryDto } from './facility.dto';

@Controller('facilities')
export class FacilityController {
  constructor(
    private readonly facilityService: FacilityService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  async findAll(@Query() query: FacilityQueryDto) {
    const { facilities, total } = await this.facilityService.findAll(query);
    return {
      message: this.i18n.translate('t.FACILITIES_RETRIEVED_SUCCESSFULLY'),
      data: facilities,
      pagination: {
        total,
        limit: query.limit ?? 100,
        page: query.page ?? 0,
        totalPages: Math.ceil(total / (query.limit ?? 100)),
      },
    };
  }
}
