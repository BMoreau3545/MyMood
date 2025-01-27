import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

function envNotFound(name) {
    throw new Error(`Environment variable ${name} not found`);
}

export const pool = new pg.Pool({
    user: process.env.DB_USER ?? envNotFound('DB_USER'),
    host: process.env.DB_HOST ?? envNotFound('DB_HOST'),
    database: process.env.DB_DATABASE ?? envNotFound('DB_DATABASE'),
    password: process.env.DB_PASSWORD ?? envNotFound('DB_PASSWORD'),
    port: process.env.DB_PORT ?? envNotFound('DB_PORT'),
});