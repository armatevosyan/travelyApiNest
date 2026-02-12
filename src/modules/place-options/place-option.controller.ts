import { Controller, Get, Query, Param, ParseEnumPipe } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PlaceOptionService } from './place-option.service';
import { PlaceOptionQueryDto } from './place-option.dto';
import { PlaceOptionType, PlaceOptionCategory } from './place-option-type';

@Controller('place-options')
export class PlaceOptionController {
  constructor(
    private readonly placeOptionService: PlaceOptionService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  async findAll(@Query() query: PlaceOptionQueryDto) {
    const { options, total } = await this.placeOptionService.findAll(query);
    return {
      message: this.i18n.translate('t.PLACE_OPTIONS_RETRIEVED_SUCCESSFULLY'),
      data: options,
      total,
    };
  }

  @Get('by-entity-type/:entityType')
  async findByEntityType(
    @Param('entityType', new ParseEnumPipe(PlaceOptionType))
    entityType: PlaceOptionType,
    @Query('category') category?: PlaceOptionCategory,
  ) {
    const options = await this.placeOptionService.findByEntityType(
      entityType,
      category,
    );
    return {
      message: this.i18n.translate('t.PLACE_OPTIONS_RETRIEVED_SUCCESSFULLY'),
      data: options,
      total: options.length,
    };
  }
}
