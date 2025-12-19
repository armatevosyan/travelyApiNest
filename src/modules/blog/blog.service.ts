import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '@/modules/users/user.service';
import { CategoryService } from '@/modules/categories/category.service';
import { CreateBlogDto } from '@/modules/blog/dto/create-blog.dto';
import { UpdateBlogDto } from '@/modules/blog/dto/update-blog.dto';
import { Blog } from '@/modules/blog/blog.entity';
import { User } from '@/modules/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '@/modules/files/files.service';
import { FileRelationType } from '@/modules/files/entities/file-relation.entity';

@Injectable()
export class BlogService {
  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    private readonly filesService: FilesService,
  ) {}

  async create(userDto: User, createBlogDto: CreateBlogDto): Promise<Blog> {
    const { title, description, image, categoryId, fileId } = createBlogDto;
    const { id } = userDto;

    const currentUser = await this.userService.findById(id);
    if (!currentUser) {
      throw new BadRequestException('t.USER_NOT_FOUND');
    }

    const existingBlog = await this.blogRepo.findOne({ where: { title } });
    if (existingBlog) {
      throw new BadRequestException('t.BLOG_TITLE_ALREADY_EXISTS');
    }

    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new BadRequestException('t.CATEGORY_NOT_FOUND');
    }

    const blog = this.blogRepo.create({
      title,
      description,
      image,
      user: currentUser,
      category,
      publishedAt: null,
      userId: currentUser.id,
      categoryId: category.id,
    });

    const saved = await this.blogRepo.save(blog);

    if (fileId) {
      try {
        await this.filesService.attachFileToEntity(
          fileId,
          FileRelationType.BLOG,
          saved.id,
        );
        const files = await this.filesService.getFilesForEntity(
          FileRelationType.BLOG,
          saved.id,
        );
        if (files?.[0]?.url) {
          saved.image = files[0].url;
          await this.blogRepo.save(saved);
        }
      } catch (e: any) {
        console.log('Error attaching file to blog: ', e.message);
      }
    }

    return saved;
  }

  async update(
    blogId: number,
    userDto: User,
    updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    const { id } = userDto;
    const currentUser = await this.userService.findById(id);
    if (!currentUser) {
      throw new BadRequestException('t.USER_NOT_FOUND');
    }

    const blog = await this.blogRepo.findOne({ where: { id: blogId } });
    if (!blog) {
      throw new NotFoundException('t.BLOG_NOT_FOUND');
    }
    if (blog.userId !== currentUser.id) {
      throw new BadRequestException('t.BLOG_UPDATE_FORBIDDEN');
    }

    const { title, description, image, categoryId, fileId } = updateBlogDto;

    if (title && title !== blog.title) {
      const duplicate = await this.blogRepo.findOne({ where: { title } });
      if (duplicate && duplicate.id !== blog.id) {
        throw new BadRequestException('t.BLOG_TITLE_ALREADY_EXISTS');
      }
      blog.title = title;
    }

    if (typeof description !== 'undefined')
      blog.description = description as any;
    if (typeof image !== 'undefined') blog.image = image;

    if (typeof categoryId !== 'undefined') {
      const category = await this.categoryService.findOne(categoryId);
      if (!category) {
        throw new BadRequestException('t.CATEGORY_NOT_FOUND');
      }
      blog.categoryId = category.id;
      blog.category = category;
    }

    const updated = await this.blogRepo.save(blog);

    if (fileId) {
      try {
        await this.filesService.attachFileToEntity(
          fileId,
          FileRelationType.BLOG,
          updated.id,
        );
        const files = await this.filesService.getFilesForEntity(
          FileRelationType.BLOG,
          updated.id,
        );
        if (files?.[0]?.url) {
          updated.image = files[0].url;
          await this.blogRepo.save(updated);
        }
      } catch (e: any) {
        console.log('Error attaching file to blog: ', e.message);
      }
    }

    return updated;
  }

  async home({
    page = 1,
    perPage = 10,
    categoryId,
    keyword,
  }: {
    page?: number;
    perPage?: number;
    categoryId?: number;
    keyword?: string;
  }): Promise<any> {
    const take = Math.max(1, Math.min(50, Number(perPage) || 10));
    const currentPage = Math.max(1, Number(page) || 1);
    const skip = (currentPage - 1) * take;

    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .leftJoinAndSelect('blog.category', 'category')
      .orderBy('blog.createdAt', 'DESC')
      .take(take)
      .skip(skip);

    if (categoryId) {
      qb.andWhere('blog.categoryId = :categoryId', { categoryId });
    }
    if (keyword) {
      qb.andWhere('(blog.title ILIKE :kw OR blog.description ILIKE :kw)', {
        kw: `%${keyword}%`,
      });
    }

    const [rows, count] = await qb.getManyAndCount();

    for (const item of rows) {
      if (!item.image) {
        try {
          const files = await this.filesService.getFilesForEntity(
            FileRelationType.BLOG,
            item.id,
          );
          if (files?.[0]?.url) item.image = files[0].url;
        } catch (e: any) {
          console.log('Error getting files for blog: ', e.message);
        }
      }
    }

    const { data: parentCategories } = await this.categoryService.findAll({
      onlyParents: true,
      page: 1,
      limit: 100,
    } as any);

    const categoriesWithCounts = await Promise.all(
      parentCategories.map(async (cat) => {
        const parentCount = await this.blogRepo.count({
          where: { categoryId: cat.id },
        });
        const children = (cat.children || []).slice();
        const childrenWithCounts = await Promise.all(
          children.map(async (sub) => ({
            ...sub,
            __count: await this.blogRepo.count({
              where: { categoryId: sub.id },
            }),
          })),
        );
        const totalCount =
          parentCount +
          childrenWithCounts.reduce((a, b) => a + (b.__count || 0), 0);
        return {
          ...cat,
          __count: totalCount,
          __children: childrenWithCounts,
        } as any;
      }),
    );

    categoriesWithCounts.sort(
      (a: any, b: any) => (b.__count || 0) - (a.__count || 0),
    );
    const topCategories = categoriesWithCounts.slice(0, 10);

    const formattedCategories = topCategories.map((category: any) => ({
      term_id: category.id,
      name: category.name,
      count: category.__count || 0,
      image: undefined as any,
      icon: category.icon || undefined,
      color: category.color || undefined,
      taxonomy: 'category',
      has_child:
        (category.__children && category.__children.length > 0) || false,
      parent_id: category.parentId || null,
      subcategories: (category.__children || []).map((sub: any) => ({
        term_id: sub.id,
        name: sub.name,
        count: sub.__count || 0,
        image: undefined as any,
        icon: sub.icon || undefined,
        color: sub.color || undefined,
        taxonomy: 'category',
        has_child: (sub.children && sub.children.length > 0) || false,
        parent_id: sub.parentId || category.id,
      })),
    }));

    const stickyQb = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .leftJoinAndSelect('blog.category', 'category')
      .orderBy('blog.createdAt', 'DESC')
      .take(1);
    if (keyword) {
      stickyQb.andWhere(
        '(blog.title ILIKE :kw OR blog.description ILIKE :kw)',
        {
          kw: `%${keyword}%`,
        },
      );
    }
    if (categoryId)
      stickyQb.andWhere('blog.categoryId = :categoryId', { categoryId });

    const stickyBlog = (await stickyQb.getMany())[0];
    if (stickyBlog && !stickyBlog.image) {
      try {
        const files = await this.filesService.getFilesForEntity(
          FileRelationType.BLOG,
          stickyBlog.id,
        );
        if (files?.[0]?.url) stickyBlog.image = files[0].url;
      } catch (e: any) {
        console.log('Error getting files for sticky blog: ', e.message);
      }
    }

    const blogs = rows.map((blog) => ({
      id: blog.id,
      title: blog.title,
      post_date: blog.createdAt,
      status: blog.publishedAt ? 'publish' : 'draft',
      description: blog.description,
      post_excerpt:
        (blog.description ? blog.description.substring(0, 150) : '') + '...',
      numComments: 0,
      link: undefined,
      image: blog.image
        ? {
            id: blog.id,
            full: { url: blog.image },
            thumb: { url: blog.image },
          }
        : undefined,
      author: blog.user
        ? {
            id: blog.user.id,
            name: blog.user.fullName,
            first_name: blog.user.fullName,
            last_name: undefined,
            user_photo: blog.user.profileImage?.url,
          }
        : undefined,
      categories: blog.category
        ? [
            {
              term_id: blog.category.id,
              name: blog.category.name,
              taxonomy: 'category',
            },
          ]
        : [],
    }));

    const sticky = stickyBlog
      ? {
          id: stickyBlog.id,
          title: stickyBlog.title,
          post_date: stickyBlog.createdAt,
          status: stickyBlog.publishedAt ? 'publish' : 'draft',
          description: stickyBlog.description,
          post_excerpt:
            (stickyBlog.description
              ? stickyBlog.description.substring(0, 150)
              : '') + '...',
          numComments: 0,
          link: undefined,
          image: stickyBlog.image
            ? {
                id: stickyBlog.id,
                full: { url: stickyBlog.image },
                thumb: { url: stickyBlog.image },
              }
            : undefined,
          author: stickyBlog.user
            ? {
                id: stickyBlog.user.id,
                name: stickyBlog.user.fullName,
                first_name: stickyBlog.user.fullName,
                last_name: undefined,
                user_photo: stickyBlog.user.profileImage?.url,
              }
            : undefined,
          categories: stickyBlog.category
            ? [
                {
                  term_id: stickyBlog.category.id,
                  name: stickyBlog.category.name,
                  taxonomy: 'category',
                },
              ]
            : [],
        }
      : undefined;

    return {
      success: true,
      data: blogs,
      categories: formattedCategories,
      sticky,
      pagination: {
        page: currentPage,
        per_page: take,
        total: count,
        max_page: Math.ceil(count / take),
      },
    };
  }

  async find(id: number): Promise<any> {
    const blog = await this.blogRepo.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('t.BLOG_NOT_FOUND');
    }

    // Ensure image field populated from FilesService if missing
    if (!blog.image) {
      try {
        const files = await this.filesService.getFilesForEntity(
          FileRelationType.BLOG,
          blog.id,
        );
        if (files?.[0]?.url) blog.image = files[0].url;
      } catch (e: any) {
        console.log('Error getting files for blog: ', e.message);
      }
    }

    const relatedQb = this.blogRepo
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.user', 'user')
      .leftJoinAndSelect('b.category', 'category')
      .where('b.id != :id', { id: blog.id })
      .andWhere('b.categoryId = :categoryId', { categoryId: blog.categoryId })
      .orderBy('b.createdAt', 'DESC')
      .take(5);

    const relatedRows = await relatedQb.getMany();

    for (const item of relatedRows) {
      if (!item.image) {
        try {
          const files = await this.filesService.getFilesForEntity(
            FileRelationType.BLOG,
            item.id,
          );
          if (files?.[0]?.url) item.image = files[0].url;
        } catch (e: any) {
          console.log('Error getting files for related blog: ', e.message);
        }
      }
    }

    const response = {
      id: blog.id,
      title: blog.title,
      post_date: blog.createdAt,
      status: blog.publishedAt ? 'publish' : 'draft',
      description: blog.description,
      numComments: 0,
      link: undefined as any,
      image: blog.image
        ? {
            id: blog.id,
            full: { url: blog.image },
            thumb: { url: blog.image },
          }
        : undefined,
      author: blog.user
        ? {
            id: blog.user.id,
            name: blog.user.fullName,
            first_name: blog.user.fullName,
            last_name: undefined,
            user_photo: blog.user.profileImage?.url,
            description: blog.user.description,
          }
        : undefined,
      categories: blog.category
        ? [
            {
              term_id: blog.category.id,
              name: blog.category.name,
              taxonomy: 'category',
            },
          ]
        : [],
      comments: [],
      related: relatedRows.map((related) => ({
        id: related.id,
        post_title: related.title,
        post_date: related.createdAt,
        post_content:
          (related.description ? related.description.substring(0, 150) : '') +
          '...',
        comment_count: 0,
        image: related.image
          ? {
              id: related.id,
              full: { url: related.image },
              thumb: { url: related.image },
            }
          : undefined,
        author: related.user
          ? {
              id: related.user.id,
              name: related.user.fullName,
              user_photo: related.user.profileImage?.url,
            }
          : undefined,
      })),
    };

    return {
      success: true,
      data: response,
    };
  }
}
