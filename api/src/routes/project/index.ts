import Elysia, { error, t } from 'elysia';

import fs from 'node:fs/promises';
import path from 'node:path';

import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

import { akaraCarbonContract } from '@api/contracts/AkaraCarbon';
import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { generateNanoId } from '@api/utils';
import { auth } from '@api/utils/auth';

const projectSelectSchema = createSelectSchema(schema.projects);
const projectInsertSchema = createInsertSchema(schema.projects);

const projectTokenSelectSchema = createSelectSchema(schema.projectTokens);
const projectTokenInsertSchema = createInsertSchema(schema.projectTokens);

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

                const basedDir = path.join(
                    '../volume/upload',
                    'projects',
                    project.id
                );
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
                thumbnail: t.File({
                    maxSize: 1024 * 1024 * 10,
                }),
            }),
        }
    )
    .post(
        '/:id/token',
        async (context) => {
            const session = await auth.api.getSession({
                headers: context.request.headers,
            });

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
            if (!developer) {
                return error(403, "You're not a developer");
            }

            const [project] = await db
                .select()
                .from(schema.projects)
                .where(eq(schema.projects.id, context.params.id));
            if (!project || project.developerId !== developer.id) {
                return error(403, 'You do not have permission to access');
            }

            const {
                body,
                params: { id },
            } = context;
            const token = await db.transaction(async (tx) => {
                const [token] = await tx
                    .insert(schema.projectTokens)
                    .values({
                        id: generateNanoId(),
                        projectId: id,
                        tokenId: null,
                        ...body,
                    })
                    .returning();

                return token;
            });

            return {
                status: 'ok' as const,
                data: token,
            };
        },
        {
            detail: {
                summary: 'Add a token to the project',
            },
            body: t.Object({
                ...t.Omit(projectTokenInsertSchema, [
                    'id',
                    'tokenId',
                    'projectId',
                    'createdAt',
                ]).properties,
            }),
        }
    );
