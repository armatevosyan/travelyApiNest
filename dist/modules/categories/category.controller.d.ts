import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, CategoryQueryDto } from './category.dto';
import { I18nService } from 'nestjs-i18n';
export declare class CategoryController {
    private readonly categoryService;
    private readonly i18n;
    constructor(categoryService: CategoryService, i18n: I18nService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
        data: import("./category.entity").Category;
    }>;
    findAll(query: CategoryQueryDto): Promise<{
        message: string;
        data: import("./category.entity").Category[];
        pagination: {
            total: number;
            page: number | undefined;
            limit: number | undefined;
            totalPages: number;
        };
    }>;
    legacyList(categoryId?: string): Promise<{
        success: boolean;
        data: {
            isPro: boolean;
            term_id: number;
            name: string;
            count: number | undefined;
            image: {
                id: number;
                full: {
                    url: string;
                };
                thumb: {
                    url: string;
                };
            } | undefined;
            icon: string | null;
            color: string | null;
            taxonomy: string;
            has_child: boolean;
            parent_id: number | null;
            subcategories: {
                term_id: number;
                name: string;
                count: number | undefined;
                image: {
                    id: number;
                    full: {
                        url: string;
                    };
                    thumb: {
                        url: string;
                    };
                } | undefined;
                icon: string | null;
                color: string | null;
                taxonomy: string;
                has_child: boolean;
                parent_id: number | null;
            }[];
        }[];
    }>;
    listDiscover(country?: string): Promise<{
        success: boolean;
        data: {
            term_id: any;
            name: any;
            count: number;
            image: any;
            icon: any;
            color: any;
            taxonomy: string;
            has_child: boolean;
            parent_id: any;
            featuredProducts: any;
        }[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./category.entity").Category;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        message: string;
        data: import("./category.entity").Category;
    }>;
    toggleActive(id: number): Promise<{
        message: string;
        data: import("./category.entity").Category;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
