import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto, UpdatePlaceDto, PlaceQueryDto } from './place.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';
import { I18nService } from 'nestjs-i18n';
import { CategoryService } from '@/modules/categories/category.service';

@Controller('places')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly categoryService: CategoryService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@User() user: IUser, @Body() data: CreatePlaceDto) {
    const category = await this.categoryService.findOne(data.categoryId);
    if (!category) {
      throw new HttpException(
        this.i18n.translate('t.CATEGORY_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    const place = await this.placeService.create(user.id, data);
    return {
      message: this.i18n.translate('t.PLACE_CREATED_SUCCESSFULLY'),
      data: place,
    };
  }

  @Get()
  async findAll(@Query() query: PlaceQueryDto) {
    const { places, total } = await this.placeService.findAll(query);
    return {
      message: this.i18n.translate('t.PLACES_RETRIEVED_SUCCESSFULLY'),
      data: places,
      pagination: {
        total,
        page: query.page || 0,
        limit: query.limit || 10,
        totalPages: Math.ceil(total / (query.limit || 10)),
      },
    };
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findMyPlaces(@User() user: IUser) {
    const places = await this.placeService.findByUser(user.id);
    return {
      message: this.i18n.translate('t.MY_PLACES_RETRIEVED_SUCCESSFULLY'),
      data: places,
    };
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const place = await this.placeService.findBySlug(slug);
    return {
      message: this.i18n.translate('t.PLACE_RETRIEVED_SUCCESSFULLY'),
      data: place,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const place = await this.placeService.findOne(id);
    return {
      message: this.i18n.translate('t.PLACE_RETRIEVED_SUCCESSFULLY'),
      data: place,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @User() user: IUser,
    @Body() data: UpdatePlaceDto,
  ) {
    if (data.categoryId) {
      const category = await this.categoryService.findOne(data.categoryId);
      if (!category) {
        throw new HttpException(
          this.i18n.translate('t.CATEGORY_NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const place = await this.placeService.update(id, user.id, data);
    return {
      message: this.i18n.translate('t.PLACE_UPDATED_SUCCESSFULLY'),
      data: place,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number, @User() user: IUser) {
    await this.placeService.remove(id, user.id);
    return {
      message: this.i18n.translate('t.PLACE_DELETED_SUCCESSFULLY'),
    };
  }
}
