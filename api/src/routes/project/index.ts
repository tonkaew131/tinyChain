import Elysia, { error, t } from 'elysia';

import fs from 'node:fs/promises';
import path from 'node:path';

import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { auth } from '@api/utils/auth';

const projectSelectSchema = createSelectSchema(schema.projects);
const projectInsertSchema = createInsertSchema(schema.projects);

export const ProjectRoute = new Elysia({
    prefix: '/project',
})
    .get(
        '/',
        async () => {
            return {
                status: 'ok' as const,
                data: await db.select().from(schema.projects),
            };
        },
        {
            response: t.Object({
                status: t.Literal('ok'),
                data: t.Array(projectSelectSchema),
            }),
        }
    )
    .post(
        '/',
        async (context) => {
            const session = await auth.api.getSession({
                headers: context.request.headers,
            });

            console.log('headers', context.request.headers);

            if (!session) {
                return error(401);
            }
            if (!session.user.developerId) {
                return error(403, "You're not a developer");
            }

            const [developer] = await db
                .select()
                .from(schema.projectDevelopers)
                .where(
                    eq(schema.projectDevelopers.id, session.user.developerId)
                );
            if (!developer) return error(403);

            const { body } = context;
            const project = await db.transaction(async (tx) => {
                const [project] = await tx
                    .insert(schema.projects)
                    .values({
                        ...body,
                        developerId: developer.id,
                    })
                    .returning();

                const basedDir = path.join('volume', 'projects', project.id);
                await fs.mkdir(path.join(basedDir), {
                    recursive: true,
                });
                await Bun.write(
                    path.join(basedDir, 'thumbnail'),
                    body.thumbnail
                );

                return project;
            });

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
                thumbnail: t.File(),
            }),
        }
    );
