import 'reflect-metadata';
import { runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import RoleSeeder from './roles.seed';
import { databaseConfig } from '../db.config';

async function bootstrap() {
  const AppDataSource = new DataSource(databaseConfig);

  await AppDataSource.initialize();
  await runSeeder(AppDataSource, RoleSeeder);
  await AppDataSource.destroy();
}

bootstrap()
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log('error connecting to database', err);
  });
