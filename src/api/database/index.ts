import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './Schema';

const connection = await mysql.createConnection({
	host: Bun.env.DATABASE_HOST,
	user: Bun.env.DATABASE_USER,
	database: Bun.env.DATABASE_NAME,
	password: Bun.env.DATABASE_PASSWORD,
});

export const db = drizzle(connection, { schema, mode: 'default' });
