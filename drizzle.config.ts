import 'dotenv/config'

if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URL is missing');
}

export default {
 	schema: "./src/api/database/Schema.ts",
	out: './src/api/database/migrations',
	dbCredentials: {
		uri: process.env.DATABASE_URI || "",
	},
	driver: 'mysql2',
	verbose: true,
};
