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

@Injectable()
export class BlogService {
  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
  ) {}

  async create(userDto: User, createBlogDto: CreateBlogDto): Promise<Blog> {
    const { title, description, image, categoryId } = createBlogDto;
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

    return this.blogRepo.save(blog);
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

    const { title, description, image, categoryId } = updateBlogDto;

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

    return this.blogRepo.save(blog);
  }
}
