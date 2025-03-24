import Elysia, { error, t } from 'elysia';

import { createInsertSchema } from 'drizzle-typebox';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { auth } from '@api/utils/auth';

const projectInsertSchema = createInsertSchema(schema.projects);

export const ProjectRoute = new Elysia({
    prefix: '/project',
})
    .get('/', async (context) => {
        return {
            status: 'ok' as const,
            data: await db.select().from(schema.projects),
        };
    })
    .post(
        '/',
        async (context) => {
            const session = await auth.api.getSession({
                headers: context.request.headers,
            });

            if (!session) return error(401);
            console.log(session.user);
        },
        {
            body: t.Object({
                ...t.Omit(projectInsertSchema, ['id', 'createdAt', 'updatedAt'])
                    .properties,
            }),
        }
    );
