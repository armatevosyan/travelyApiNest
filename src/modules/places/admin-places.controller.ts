import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { AdminPlaceQueryDto, RejectPlaceDto } from './place-admin.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorators';
import { ERoles } from '@/modules/roles/role.types';
import { I18nService } from 'nestjs-i18n';

@Controller('admin/places')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
export class AdminPlacesController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  async findAll(@Query() query: AdminPlaceQueryDto) {
    const { places, total } = await this.placeService.findAll(
      query,
      undefined,
      { allowAllStatuses: true },
    );
    return {
      message: this.i18n.translate('t.PLACES_RETRIEVED_SUCCESSFULLY'),
      data: places,
      total,
      pagination: {
        total,
        page: query.page ?? 0,
        limit: query.limit ?? 10,
        totalPages: Math.ceil(total / (query.limit ?? 10)),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const place = await this.placeService.findOne(id, undefined);
    return {
      message: this.i18n.translate('t.PLACE_RETRIEVED_SUCCESSFULLY'),
      data: place,
    };
  }

  @Patch(':id/approve')
  @HttpCode(HttpStatus.OK)
  async approve(@Param('id', ParseIntPipe) id: number) {
    const place = await this.placeService.approve(id);
    return {
      message: this.i18n.translate('t.PLACE_APPROVED_SUCCESSFULLY'),
      data: place,
    };
  }

  @Patch(':id/reject')
  @HttpCode(HttpStatus.OK)
  async reject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RejectPlaceDto,
  ) {
    const place = await this.placeService.reject(id, body.reason);
    return {
      message: this.i18n.translate('t.PLACE_REJECTED_SUCCESSFULLY'),
      data: place,
    };
  }
}
