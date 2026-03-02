import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlaceReviewService } from './place-review.service';
import { CreatePlaceReviewDto } from './place-review.dto';
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
}
