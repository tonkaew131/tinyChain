import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '@api/db/schema';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});
export const db = drizzle({
    client: pool,
    casing: 'snake_case',
    schema: schema,
});
