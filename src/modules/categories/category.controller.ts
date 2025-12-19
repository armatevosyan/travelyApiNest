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

@Controller('category')
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

  @Get('list')
  async legacyList(@Query('category_id') categoryId?: string) {
    const parentId = categoryId ? Number(categoryId) : null;
    const categories = await this.categoryService.listLegacy(parentId);

    const data = categories.map((category) => ({
      isPro: category.isPro,
      term_id: category.id,
      name: category.name,
      count: undefined as unknown as number | undefined,
      image: undefined as unknown as
        | {
            id: number;
            full: { url: string };
            thumb: { url: string };
          }
        | undefined,
      icon: category.icon,
      color: category.color,
      taxonomy: 'category',
      has_child: Array.isArray(category.children)
        ? category.children.length > 0
        : false,
      parent_id: category.parentId,
      subcategories: (category.children || []).map((subcat) => ({
        term_id: subcat.id,
        name: subcat.name,
        count: undefined as unknown as number | undefined,
        image: undefined as unknown as
          | {
              id: number;
              full: { url: string };
              thumb: { url: string };
            }
          | undefined,
        icon: subcat.icon,
        color: subcat.color,
        taxonomy: 'category',
        has_child: Array.isArray(subcat.children)
          ? subcat.children.length > 0
          : false,
        parent_id: subcat.parentId,
      })),
    }));

    return {
      success: true,
      data,
    };
  }

  @Get('list_discover')
  async listDiscover(@Query('country') country?: string) {
    const categories =
      await this.categoryService.getDiscoveryCategories(country);

    const data = categories.map((category) => ({
      term_id: category.id,
      name: category.name,
      count: 0,
      image: undefined as any,
      icon: category.icon,
      color: category.color,
      taxonomy: 'category',
      has_child: false,
      parent_id: category.parentId,
      featuredProducts: (category.places || []).map((product: any) => ({
        id: product.id,
        post_title: product.name,
        post_date: product.createdAt,
        rating_avg: product.averageRating,
        rating_count: product.reviewCount,
        wishlist: false,
        image: undefined as any,
        author: product.user
          ? {
              id: product.user.id,
              name: product.user.name,
              user_photo: product.user.image,
            }
          : undefined,
        category: product.category
          ? {
              term_id: product.category.id,
              name: product.category.name,
              taxonomy: 'category',
            }
          : undefined,
        price_min: product.minPrice,
        price_max: product.maxPrice,
        address: product.address,
      })),
    }));

    return {
      success: true,
      data,
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
