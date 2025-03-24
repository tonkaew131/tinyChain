import Elysia, { error, t } from 'elysia';

import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-typebox';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { auth } from '@api/utils/auth';

const projectInsertSchema = createInsertSchema(schema.projects);

export const ProjectRoute = new Elysia({
    prefix: '/project',
})
    .get('/', async () => {
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
            if (!session.user.developerId) return error(403);
            const [developer] = await db
                .select()
                .from(schema.projectDevelopers)
                .where(
                    eq(schema.projectDevelopers.id, session.user.developerId)
                );
            if (!developer) return error(403);

            const { body } = context;
            const project = await db
                .insert(schema.projects)
                .values({
                    ...body,
                    developerId: developer.id,
                })
                .returning();

            return {
                status: 'ok' as const,
                data: project,
            };
        },
        {
            body: t.Object({
                ...t.Omit(projectInsertSchema, [
                    'id',
                    'createdAt',
                    'updatedAt',
                    'developerId',
                ]).properties,
            }),
        }
    );
