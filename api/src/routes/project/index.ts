import Elysia from 'elysia';

import { db } from '@api/db';
import * as schema from '@api/db/schema';

export const ProjectRoute = new Elysia({
    prefix: '/project',
}).get('/', async (context) => {
    return {
        status: 'ok' as const,
        data: await db.select().from(schema.projects),
    };
});
