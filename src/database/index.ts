import dotenv from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

const { env } = process;

const dbConfig = {
  dbHost: env.DB_HOST || 'localhost',
  dbPort: parseInt(env.DB_PORT || '5432'),
  dbName: env.DB_NAME || 'test',
  dbUser: env.DB_USER || 'test',
  dbPass: env.DB_PASS || 'test',
};

const entityPath = resolve(__dirname, 'entities');
const migrationsPath = resolve(__dirname, 'migrations');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.dbHost,
  port: dbConfig.dbPort,
  username: dbConfig.dbUser,
  password: dbConfig.dbPass,
  database: dbConfig.dbName,
  entities: [`${entityPath}/**/*{.ts,.js}`],
  migrations: [`${migrationsPath}/**/*.ts`],
});
