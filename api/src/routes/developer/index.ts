import Elysia from 'elysia';

import { db } from '@api/db';
import * as schema from '@api/db/schema';

export const DeveloperRoute = new Elysia({
    prefix: '/developer',
}).get('/', async () => {
    const developers = await db.select().from(schema.projectDevelopers);

    return {
        status: 'ok' as const,
        data: developers,
    };
});
