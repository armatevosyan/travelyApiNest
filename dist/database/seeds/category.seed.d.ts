import { DataSource } from 'typeorm';
import { Category } from 'modules/categories/category.entity';
import { Seeder } from 'typeorm-extension';
export declare const categorySeeds: Partial<Category>[];
export declare const childCategorySeeds: Partial<Category>[];
export default class CategorySeeder implements Seeder {
    run(dataSource: DataSource): Promise<void>;
}
