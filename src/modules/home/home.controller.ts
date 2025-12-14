import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('init')
  async getInit(@Query('country') country?: string) {
    const data = await this.homeService.getInit(country);
    return {
      success: true,
      data,
    };
  }
}
