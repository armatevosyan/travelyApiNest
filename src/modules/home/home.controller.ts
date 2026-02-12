import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { OptionalJwtAuthGuard } from '@/modules/auth/optional-jwt-auth.guard';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('init')
  @UseGuards(OptionalJwtAuthGuard)
  async getInit(
    @User() user: IUser | null,
    @Query('country') country?: string,
  ) {
    const data = await this.homeService.getInit(country, user?.id ?? null);
    return {
      success: true,
      data,
    };
  }
}
