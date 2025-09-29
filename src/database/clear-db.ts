import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { databaseConfig } from './db.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function clearDatabase() {
  console.log('🟢 Starting database clearing...');

  if (process.env.NODE_ENV === 'production') {
    throw new Error('❌ Clearing the database in production is not allowed!');
  }

  const dataSource = new DataSource(databaseConfig);

  try {
    await dataSource.initialize();
    console.log('✅ Database connection established.');

    // Disable FK constraints and truncate all tables
    await dataSource.query(`
      DO $$ 
      DECLARE r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
          EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
        END LOOP;
      END $$;
    `);
  } catch (err) {
    console.error('❌ Error clearing the database:', err);
    process.exit(1); // exit with error code
  } finally {
    await dataSource.destroy();
    console.log('🛑 Database connection closed.');
  }
}

clearDatabase()
  .then(() => {
    console.log('🎉 Database cleared successfully!');
  })
  .catch((err) => {
    console.log('❌ Error clearing the database:', err);
  });
