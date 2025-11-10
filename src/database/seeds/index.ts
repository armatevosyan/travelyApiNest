import 'reflect-metadata';
import { runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import RoleSeeder from './roles.seed';
import UserSeeder from './users.seed';
import CategorySeeder from './category.seed';
import LocationSeeder from './location.seed';
import { databaseConfig } from '../db.config';

async function bootstrap() {
  console.log('🟢 Starting database seeding...');

  const AppDataSource = new DataSource(databaseConfig);

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established.');

    // Run all seeders here
    await runSeeder(AppDataSource, RoleSeeder);
    await runSeeder(AppDataSource, UserSeeder);
    await runSeeder(AppDataSource, CategorySeeder);
    await runSeeder(AppDataSource, LocationSeeder);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1); // Exit with error code
  } finally {
    await AppDataSource.destroy();
    console.log('🛑 Database connection closed.');
  }
}

bootstrap()
  .then(() => {
    console.log('🎉 Database seeding completed successfully.');
  })
  .catch((err) => {
    console.log('❌ Error seeding database:', err);
  });
