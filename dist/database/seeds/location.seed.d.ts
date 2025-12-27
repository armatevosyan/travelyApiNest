import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
export default class LocationSeeder implements Seeder {
    run(dataSource: DataSource): Promise<void>;
}
