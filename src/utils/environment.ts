import * as dotenv from 'dotenv';
dotenv.config();

export class EnvironmentConfig {
    private static instance: EnvironmentConfig;

    static getInstance(): EnvironmentConfig {
        if (!EnvironmentConfig.instance) {
            EnvironmentConfig.instance = new EnvironmentConfig();
        }
        return EnvironmentConfig.instance;
    }

    getPort(): number {
        return Number(process.env.PORT) || 8080;
    }

    getLogLevel(): string {
        return process.env.LOG_LEVEL || 'info';
    }

    getDatabaseConfig(): DatabaseConfig {
        return {
            host: process.env.DATABASE_HOST || 'localhost',
            port: Number(process.env.DATABASE_PORT) || 5432,
            database: process.env.DATABASE_NAME || 'clientes',
            user: process.env.DATABASE_USER || 'postgres',
            password: process.env.DATABASE_PASSWORD || ''
        };
    }
}

export interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

export const environmentConfig = EnvironmentConfig.getInstance();
