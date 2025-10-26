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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryQueryDto,
} from './category.dto';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorators';
import { ERoles } from '@/modules/roles/role.types';
import { I18nService } from 'nestjs-i18n';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      message: this.i18n.translate('t.CATEGORY_CREATED_SUCCESSFULLY'),
      data: category,
    };
  }

  @Get()
  async findAll(@Query() query: CategoryQueryDto) {
    const result = await this.categoryService.findAll(query);
    return {
      message: this.i18n.translate('t.CATEGORIES_RETRIEVED_SUCCESSFULLY'),
      data: result.data,
      pagination: {
        total: result.total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(result.total / (query.limit || 0)),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.findOne(id);
    return {
      message: this.i18n.translate('t.CATEGORY_RETRIEVED_SUCCESSFULLY'),
      data: category,
    };
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(id, updateCategoryDto);
    return {
      message: this.i18n.translate('t.CATEGORY_UPDATED_SUCCESSFULLY'),
      data: category,
    };
  }

  @Patch(':id/toggle-active')
  @UseGuards(RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.toggleActive(id);
    return {
      message: this.i18n.translate('t.CATEGORY_STATUS_UPDATED_SUCCESSFULLY'),
      data: category,
    };
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.remove(id);
    return {
      message: this.i18n.translate('t.CATEGORY_DELETED_SUCCESSFULLY'),
    };
  }
}
