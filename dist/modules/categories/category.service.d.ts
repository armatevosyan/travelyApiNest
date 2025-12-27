import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Location } from '../locations/location.entity';
import { CreateCategoryDto, UpdateCategoryDto, CategoryQueryDto } from './category.dto';
export declare class CategoryService {
    private readonly categoryRepo;
    private readonly locationRepo;
    constructor(categoryRepo: Repository<Category>, locationRepo: Repository<Location>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(query?: CategoryQueryDto): Promise<{
        data: Category[];
        total: number;
    }>;
    findOne(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: number): Promise<void>;
    findChildren(parentId: number): Promise<Category[]>;
    listLegacy(categoryId?: number | null): Promise<Category[]>;
    toggleActive(id: number): Promise<Category>;
    getDiscoveryCategories(country?: string): Promise<any[]>;
    private wouldCreateCircularReference;
}
