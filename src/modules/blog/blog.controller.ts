import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorators';
import { ERoles } from '@/modules/roles/role.types';
import { BlogService } from '@/modules/blog/blog.service';
import { I18nService } from 'nestjs-i18n';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';
import { CreateBlogDto } from '@/modules/blog/dto/create-blog.dto';
import { UpdateBlogDto } from '@/modules/blog/dto/update-blog.dto';
import { ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN, ERoles.USER)
  @HttpCode(HttpStatus.CREATED)
  async create(@User() user: IUser, @Body() data: CreateBlogDto) {
    const blog = await this.blogService.create(user, data);
    return {
      message: this.i18n.translate('t.BLOG_CREATED_SUCCESSFULLY'),
      data: blog,
    };
  }

  @Get('home')
  @HttpCode(HttpStatus.OK)
  async home(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('categoryId') categoryId?: number,
    @Query('category_id') category_id?: number,
    @Query('s') s?: string,
  ) {
    const result = await this.blogService.home({
      page: page as any,
      perPage: (limit as any) ?? (undefined as any),
      categoryId: (categoryId as any) ?? (category_id as any),
      keyword: s,
    });

    return {
      message: this.i18n.translate('t.BLOG_HOME_RETRIEVED_SUCCESSFULLY'),
      ...result,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @User() user: IUser,
    @Body() data: UpdateBlogDto,
  ) {
    const blog = await this.blogService.update(id, user, data);
    return {
      message: this.i18n.translate('t.BLOG_UPDATED_SUCCESSFULLY'),
      data: blog,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async find(@Param('id', ParseIntPipe) id: number) {
    const result = await this.blogService.find(id);
    return {
      message: this.i18n.translate('t.BLOG_RETRIEVED_SUCCESSFULLY'),
      ...result,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number, @User() user: IUser) {
    await this.blogService.remove(id, user);
    return {
      message: this.i18n.translate('t.BLOG_DELETED_SUCCESSFULLY'),
    };
  }
}
