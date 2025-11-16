import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
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

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  // @UseGuards(RolesGuard)
  // @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN, ERoles.USER)
  @HttpCode(HttpStatus.CREATED)
  async create(@User() user: IUser, @Body() data: CreateBlogDto) {
    const blog = await this.blogService.create(user, data);
    return {
      message: this.i18n.translate('t.BLOG_CREATED_SUCCESSFULLY'),
      data: blog,
    };
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN, ERoles.USER)
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
}
