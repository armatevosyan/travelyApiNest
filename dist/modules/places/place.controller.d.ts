import { PlaceService } from './place.service';
import { CreatePlaceDto, UpdatePlaceDto, PlaceQueryDto } from './place.dto';
import { User as IUser } from '@/modules/users/user.entity';
import { I18nService } from 'nestjs-i18n';
import { CategoryService } from '@/modules/categories/category.service';
export declare class PlaceController {
    private readonly placeService;
    private readonly categoryService;
    private readonly i18n;
    constructor(placeService: PlaceService, categoryService: CategoryService, i18n: I18nService);
    create(user: IUser, data: CreatePlaceDto): Promise<{
        message: string;
        data: import("./place.entity").Place;
    }>;
    findAll(query: PlaceQueryDto): Promise<{
        message: string;
        data: import("./place.entity").Place[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findMyPlaces(user: IUser): Promise<{
        message: string;
        data: import("./place.entity").Place[];
    }>;
    findBySlug(slug: string): Promise<{
        message: string;
        data: import("./place.entity").Place;
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./place.entity").Place;
    }>;
    update(id: number, user: IUser, data: UpdatePlaceDto): Promise<{
        message: string;
        data: import("./place.entity").Place;
    }>;
    remove(id: number, user: IUser): Promise<{
        message: string;
    }>;
}
