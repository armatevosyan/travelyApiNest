import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';
import { WishlistListQueryDto, WishlistPostDto } from './wishlist.dto';
import { I18nService } from 'nestjs-i18n';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly i18n: I18nService,
  ) {}

  @Get('list')
  async list(@User() user: IUser, @Query() query: WishlistListQueryDto) {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 10;
    const { items, total, hasMore } = await this.wishlistService.list(
      user.id,
      page,
      perPage,
    );

    return {
      message: this.i18n.translate('t.WISHLIST_RETRIEVED_SUCCESSFULLY'),
      data: items,
      pagination: {
        page,
        perPage,
        total,
        hasMore,
      },
    };
  }

  @Post('save')
  @HttpCode(HttpStatus.OK)
  async save(@User() user: IUser, @Body() body: WishlistPostDto) {
    const row = await this.wishlistService.add(user.id, body.post_id);
    return {
      message: this.i18n.translate('t.ADDED_TO_WISHLIST_SUCCESSFULLY'),
      data: row,
    };
  }

  @Post('remove')
  @HttpCode(HttpStatus.OK)
  async remove(@User() user: IUser, @Body() body: WishlistPostDto) {
    await this.wishlistService.remove(user.id, body.post_id);
    return {
      message: this.i18n.translate('t.REMOVED_FROM_WISHLIST_SUCCESSFULLY'),
    };
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async reset(@User() user: IUser) {
    await this.wishlistService.clear(user.id);
    return {
      message: this.i18n.translate('t.WISHLIST_CLEARED_SUCCESSFULLY'),
    };
  }
}
