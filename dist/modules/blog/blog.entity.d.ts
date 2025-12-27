import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
export declare class Blog {
    id: number;
    title: string;
    description: string;
    image?: string;
    user: User;
    userId: number;
    category: Category;
    categoryId: number;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
