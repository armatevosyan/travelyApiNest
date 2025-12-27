import { BlogService } from '@/modules/blog/blog.service';
import { I18nService } from 'nestjs-i18n';
import { User as IUser } from '@/modules/users/user.entity';
import { CreateBlogDto } from '@/modules/blog/dto/create-blog.dto';
import { UpdateBlogDto } from '@/modules/blog/dto/update-blog.dto';
export declare class BlogController {
    private readonly blogService;
    private readonly i18n;
    constructor(blogService: BlogService, i18n: I18nService);
    create(user: IUser, data: CreateBlogDto): Promise<{
        message: string;
        data: import("./blog.entity").Blog;
    }>;
    home(page?: number, limit?: number, categoryId?: number, category_id?: number, s?: string): Promise<any>;
    update(id: number, user: IUser, data: UpdateBlogDto): Promise<{
        message: string;
        data: import("./blog.entity").Blog;
    }>;
    find(id: number): Promise<any>;
}
