import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlaceReviewService } from './place-review.service';
import {
  CreatePlaceReviewDto,
  PlaceReviewQueryDto,
  UpdatePlaceReviewDto,
} from './place-review.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';
import { I18nService } from 'nestjs-i18n';

@Controller('places/:placeId/reviews')
export class PlaceReviewsController {
  constructor(
    private readonly placeReviewService: PlaceReviewService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('placeId', ParseIntPipe) placeId: number,
    @User() user: IUser,
    @Body() dto: CreatePlaceReviewDto,
  ) {
    const review = await this.placeReviewService.create(placeId, user.id, dto);
    return {
      message: this.i18n.translate('t.REVIEW_CREATED_SUCCESSFULLY'),
      data: review,
    };
  }

  @Get()
  async findAll(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Query() query: PlaceReviewQueryDto,
  ) {
    const {
      reviews,
      total,
      limit: usedLimit,
    } = await this.placeReviewService.findByPlace(placeId, query);
    const page = query.page ?? 0;
    return {
      message: this.i18n.translate('t.REVIEWS_RETRIEVED_SUCCESSFULLY'),
      data: reviews,
      pagination: {
        total,
        page,
        limit: usedLimit,
        totalPages: Math.ceil(total / usedLimit),
      },
    };
  }

  @Patch(':reviewId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @User() user: IUser,
    @Body() dto: UpdatePlaceReviewDto,
  ) {
    const review = await this.placeReviewService.update(
      placeId,
      reviewId,
      user.id,
      dto,
    );
    return {
      message: this.i18n.translate('t.REVIEW_UPDATED_SUCCESSFULLY'),
      data: review,
    };
  }
}
