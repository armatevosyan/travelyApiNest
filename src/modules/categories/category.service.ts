import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './category.entity';
import { Location, LocationType } from '../locations/location.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryQueryDto,
} from './category.dto';
import {
  FileRelation,
  FileRelationType,
} from '../files/entities/file-relation.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
    @InjectRepository(FileRelation)
    private readonly fileRelationRepo: Repository<FileRelation>,
    private readonly filesService: FilesService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepo.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new BadRequestException('Category with this name already exists');
    }

    if (createCategoryDto.parentId) {
      const parent = await this.categoryRepo.findOne({
        where: { id: createCategoryDto.parentId },
      });

      if (!parent) {
        throw new BadRequestException('Parent category not found');
      }
    }

    const category = this.categoryRepo.create(createCategoryDto);
    return this.categoryRepo.save(category);
  }

  async findAll(
    query: CategoryQueryDto = {},
  ): Promise<{ data: Category[]; total: number }> {
    const {
      search,
      isActive,
      parentId,
      onlyParents,
      onlyChildren,
      page,
      limit,
    } = query;

    const queryBuilder = this.categoryRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children');

    if (search) {
      queryBuilder.andWhere(
        '(category.name ILIKE :search OR category.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('category.isActive = :isActive', { isActive });
    }

    if (parentId !== undefined) {
      if (parentId === null) {
        queryBuilder.andWhere('category.parentId IS NULL');
      } else {
        queryBuilder.andWhere('category.parentId = :parentId', { parentId });
      }
    }

    if (onlyParents) {
      queryBuilder.andWhere('category.parentId IS NULL');
    }

    if (onlyChildren) {
      queryBuilder.andWhere('category.parentId IS NOT NULL');
    }

    if (page && limit) {
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).take(limit);
    }

    queryBuilder
      .orderBy('category.sortOrder', 'ASC')
      .addOrderBy('category.name', 'ASC');

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoryRepo.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (existingCategory) {
        throw new BadRequestException('Category with this name already exists');
      }
    }

    if (updateCategoryDto.parentId !== undefined) {
      if (updateCategoryDto.parentId === id) {
        throw new BadRequestException('Category cannot be its own parent');
      }

      if (updateCategoryDto.parentId !== null) {
        const parent = await this.categoryRepo.findOne({
          where: { id: updateCategoryDto.parentId },
        });

        if (!parent) {
          throw new BadRequestException('Parent category not found');
        }

        if (
          await this.wouldCreateCircularReference(
            id,
            updateCategoryDto.parentId,
          )
        ) {
          throw new BadRequestException(
            'Cannot set parent: would create circular reference',
          );
        }
      }
    }

    Object.assign(category, updateCategoryDto);
    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const childrenCount = await this.categoryRepo.count({
      where: { parentId: id },
    });

    if (childrenCount > 0) {
      throw new BadRequestException(
        'Cannot delete category with children. Please delete or move children first.',
      );
    }

    await this.categoryRepo.softDelete(id);
  }

  async findChildren(parentId: number): Promise<Category[]> {
    return this.categoryRepo.find({
      where: { parentId, isActive: true },
      order: { sortOrder: 'ASC', name: 'ASC' },
    });
  }

  async listLegacy(categoryId?: number | null): Promise<Category[]> {
    const qb = this.categoryRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'children')
      .where('category.isActive = :isActive', { isActive: true });

    if (categoryId === null || categoryId === undefined) {
      qb.andWhere('category.parentId IS NULL');
    } else {
      qb.andWhere('category.parentId = :parentId', { parentId: categoryId });
    }

    qb.orderBy('category.sortOrder', 'ASC').addOrderBy('category.name', 'ASC');

    const categories = await qb.getMany();

    for (const c of categories) {
      if (Array.isArray(c.children)) {
        c.children = c.children
          .filter((ch) => ch.isActive)
          .sort((a, b) => {
            if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
            return a.name.localeCompare(b.name);
          });
      }
    }

    return categories;
  }

  async toggleActive(id: number): Promise<Category> {
    const category = await this.findOne(id);
    category.isActive = !category.isActive;
    return this.categoryRepo.save(category);
  }

  async getDiscoveryCategories(
    country?: string,
    search?: string,
  ): Promise<any[]> {
    let location: Location | null = null;
    if (country) {
      location = await this.locationRepo.findOne({
        where: {
          name: country,
          type: LocationType.COUNTRY,
        },
      });
    }

    const qb = this.categoryRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.places', 'featuredProducts')
      .leftJoinAndSelect('featuredProducts.user', 'author')
      .leftJoinAndSelect('featuredProducts.category', 'placeCategory')
      .where('category.parentId IS NULL')
      .andWhere('category.isActive = :isActive', { isActive: true })
      .andWhere(
        '(featuredProducts.id IS NULL OR (featuredProducts.countryId = :countryId AND featuredProducts.isActive = :isActive))',
        {
          countryId: location?.id || null,
          isActive: true,
        },
      );

    if (search?.trim()) {
      const searchTerm = `%${search.trim()}%`;
      qb.andWhere(
        '(featuredProducts.id IS NOT NULL AND (featuredProducts.name ILIKE :searchTerm OR featuredProducts.description ILIKE :searchTerm))',
        { searchTerm },
      );
    }

    const categories = await qb
      .orderBy('category.sortOrder', 'ASC')
      .addOrderBy('category.name', 'ASC')
      .getMany();

    const placeIds = categories.flatMap((c) =>
      (c.places || []).map((p) => p.id),
    );
    const placeImagesMap = await this.loadPlaceImagesMap(placeIds);

    for (const category of categories) {
      for (const place of category.places || []) {
        place.placeImages = placeImagesMap.get(place.id) ?? [];
      }
    }

    return categories.slice(0, 10);
  }

  private async loadPlaceImagesMap(
    placeIds: number[],
  ): Promise<
    Map<
      number,
      Array<{ id: number; full: { url: string }; thumb: { url: string } }>
    >
  > {
    if (placeIds.length === 0) return new Map();

    const relations = await this.fileRelationRepo.find({
      where: {
        entityType: FileRelationType.PLACE,
        entityId: In(placeIds),
      },
      relations: ['file'],
      order: { createdAt: 'DESC' },
    });

    const map = new Map<
      number,
      Array<{ id: number; full: { url: string }; thumb: { url: string } }>
    >();
    for (const rel of relations) {
      if (!rel.file) continue;
      if (map.has(rel.entityId)) continue;
      const url = this.filesService.generatePublicUrl(rel.file.bucketPath);
      map.set(rel.entityId, [
        { id: rel.file.id, full: { url }, thumb: { url } },
      ]);
    }
    return map;
  }

  private async wouldCreateCircularReference(
    categoryId: number,
    newParentId: number,
  ): Promise<boolean> {
    let currentParentId: number | null = newParentId;

    while (currentParentId !== null) {
      if (currentParentId === categoryId) {
        return true;
      }

      const parent = await this.categoryRepo.findOne({
        where: { id: currentParentId },
        select: ['parentId'],
      });

      currentParentId = parent?.parentId || null;
    }

    return false;
  }
}
