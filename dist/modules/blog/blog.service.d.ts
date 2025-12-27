import { UserService } from '@/modules/users/user.service';
import { CategoryService } from '@/modules/categories/category.service';
import { CreateBlogDto } from '@/modules/blog/dto/create-blog.dto';
import { UpdateBlogDto } from '@/modules/blog/dto/update-blog.dto';
import { Blog } from '@/modules/blog/blog.entity';
import { User } from '@/modules/users/user.entity';
import { Repository } from 'typeorm';
import { FilesService } from '@/modules/files/files.service';
export declare class BlogService {
    private readonly userService;
    private readonly categoryService;
    private readonly blogRepo;
    private readonly filesService;
    constructor(userService: UserService, categoryService: CategoryService, blogRepo: Repository<Blog>, filesService: FilesService);
    create(userDto: User, createBlogDto: CreateBlogDto): Promise<Blog>;
    update(blogId: number, userDto: User, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    home({ page, perPage, categoryId, keyword, }: {
        page?: number;
        perPage?: number;
        categoryId?: number;
        keyword?: string;
    }): Promise<any>;
    find(id: number): Promise<any>;
}
