import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { databaseConfig } from './db.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function clearDatabase() {
  console.log('Start clearing database...');
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Clearing the database in production is not allowed!');
  }
  const dataSource = new DataSource(databaseConfig);
  await dataSource.initialize();

  // Disable FK constraints temporarily
  await dataSource.query(`DO $$ DECLARE
    r RECORD;
  BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
      EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
    END LOOP;
  END $$;`);

  await dataSource.destroy();
  console.log('Database cleared!');
}

clearDatabase()
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log('error connecting to database', err);
  });
