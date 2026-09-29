import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { environmentConfig } from './environment';
import { CustomerModel } from '../repositories/models/customer.model';

const dbConfig = environmentConfig.getDatabaseConfig();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    username: dbConfig.user,
    password: dbConfig.password,
    synchronize: false,
    entities: [CustomerModel]
});

export const connectToDatabase = async (): Promise<void> => {
    if (AppDataSource.isInitialized) return;
    await AppDataSource.initialize();
    console.info('[database] Conexión a PostgreSQL establecida');
};
