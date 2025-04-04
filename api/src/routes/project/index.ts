import Elysia, { error, t } from 'elysia';

import fs from 'node:fs/promises';
import path from 'node:path';

import { and, eq, getTableColumns, sql, sum } from 'drizzle-orm';
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

const projectDeveloperSelectSchema = createSelectSchema(
    schema.projectDevelopers
);
const projectDeveloperInsertSchema = createInsertSchema(
    schema.projectDevelopers
);

const uploadDir = process.env.UPLOAD_FOLDER || '../volume/upload';

export const ProjectRoute = new Elysia({
    prefix: '/project',
})
    .get(
        '/',
        async () => {
            const projects = await db
                .select({
                    ...getTableColumns(schema.projects),
                    soldTokens: sql<number>`SUM(COALESCE(${schema.projectTokens.amount}, 0))::int`,
                    unsoldTokens: sql<number>`SUM(COALESCE(${schema.projectTokens.unsoldAmount}, 0))::int`,
                    developer: schema.projectDevelopers.name,
                })
                .from(schema.projects)
                .innerJoin(
                    schema.projectDevelopers,
                    eq(schema.projectDevelopers.id, schema.projects.developerId)
                )
                .leftJoin(
                    schema.projectTokens,
                    eq(schema.projectTokens.projectId, schema.projects.id)
                )
                .groupBy(schema.projects.id, schema.projectDevelopers.name);

            return {
                status: 'ok' as const,
                data: projects,
            };
        },
        {
            response: t.Object({
                status: t.Literal('ok'),
                data: t.Array(
                    t.Object({
                        ...projectSelectSchema.properties,
                        developer: t.String(),
                        soldTokens: t.Number(),
                        unsoldTokens: t.Number(),
                    })
                ),
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

                const basedDir = path.join(uploadDir, 'projects', project.id);
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
                    type: ['image/jpeg'],
                }),
            }),
        }
    )
    .get(
        '/:id',
        async (context) => {
            const [project] = await db
                .select({
                    ...getTableColumns(schema.projects),
                    developer: schema.projectDevelopers.name,
                    developerJoinedAt: schema.projectDevelopers.createdAt,
                })
                .from(schema.projects)
                .innerJoin(
                    schema.projectDevelopers,
                    eq(schema.projectDevelopers.id, schema.projects.developerId)
                )
                .where(eq(schema.projects.id, context.params.id));

            if (!project) {
                throw new Error('Not found');
            }

            return {
                status: 'ok' as const,
                data: project,
            };
        },
        {
            response: t.Object({
                status: t.Literal('ok'),
                data: t.Object({
                    ...projectSelectSchema.properties,
                    developer: t.String(),
                    developerJoinedAt: t.Date(),
                }),
            }),
        }
    )
    .get('/:id/thumbnail', async (context) => {
        const {
            params: { id },
            set,
        } = context;

        const file = Bun.file(
            path.join(uploadDir, 'projects', id, 'thumbnail')
        );
        if ((await file.exists()) === false) {
            return error(404);
        }

        set.headers['content-type'] = 'image/jpeg';
        return file;
    })
    .get(
        '/:id/token',
        async (context) => {
            const [project] = await db
                .select()
                .from(schema.projects)
                .where(eq(schema.projects.id, context.params.id));
            if (!project) {
                throw new Error('Not found');
            }

            return {
                status: 'ok' as const,
                data: await db
                    .select()
                    .from(schema.projectTokens)
                    .where(eq(schema.projectTokens.projectId, project.id)),
            };
        },
        {
            response: t.Object({
                status: t.Literal('ok'),
                data: t.Array(projectTokenSelectSchema),
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
                const bcTx = await akaraCarbonContract.mint(
                    body.amount,
                    '0x',
                    new Date(body.endDate).getTime() * 1000
                );
                const receipt = await bcTx.wait();
                const event = receipt.logs.find(
                    (log: any) => log.fragment?.name === 'TokenMinted'
                );
                if (!event) {
                    throw new Error('TokenMinted event not found');
                }
                const tokenId = event.args.tokenId;

                const [token] = await tx
                    .insert(schema.projectTokens)
                    .values({
                        id: generateNanoId(),
                        projectId: id,
                        tokenId: tokenId,
                        unsoldAmount: body.amount,
                        ...body,
                    })
                    .returning();

                await tx.insert(schema.transactions).values({
                    id: generateNanoId(64),
                    txId: bcTx.hash,
                    type: 'mint',
                    message: `40 tokens listed by ${developer.name} for ${body.pricePerToken} THB`,
                    userId: session.user.id,
                });

                return { ...token, transactionHash: bcTx.hash, bcTx: bcTx };
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
                    'unsoldAmount',
                ]).properties,
            }),
        }
    )
    .post(
        '/:id/token/:tokenId/buy',
        async (context) => {
            const session = await auth.api.getSession({
                headers: context.request.headers,
            });

            if (!session) {
                throw new Error('Unauthorized');
            }

            if (!session.user.wallet) {
                throw new Error('You need to set your wallet address');
            }

            const { body } = context;
            const tokenId = parseInt(context.params.tokenId);
            const bcTx = await db.transaction(async (tx) => {
                const bcTx = await akaraCarbonContract.safeTransferFrom(
                    process.env.WALLET_PUBLIC_KEY,
                    session.user.wallet,
                    context.params.tokenId,
                    body.amount,
                    '0x'
                );
                await bcTx.wait();

                await tx.insert(schema.transactions).values({
                    id: generateNanoId(64),
                    txId: bcTx.hash,
                    type: 'buy',
                    message: `Bought ${body.amount} tokens from ${bcTx.hash}`,
                    userId: session.user.id,
                });

                const [token] = await tx
                    .select()
                    .from(schema.projectTokens)
                    .where(
                        and(
                            eq(schema.projectTokens.tokenId, tokenId),
                            eq(
                                schema.projectTokens.projectId,
                                context.params.id
                            )
                        )
                    );
                if (!token) {
                    throw new Error('Token not found');
                }

                if (parseFloat(token.unsoldAmount) < body.amount) {
                    throw new Error('Insufficient amount');
                }

                await db
                    .update(schema.projectTokens)
                    .set({
                        unsoldAmount: (
                            parseFloat(token.unsoldAmount) - body.amount
                        ).toString(),
                    })
                    .where(
                        and(
                            eq(schema.projectTokens.tokenId, tokenId),
                            eq(
                                schema.projectTokens.projectId,
                                context.params.id
                            )
                        )
                    );

                const [userToken] = await tx
                    .select()
                    .from(schema.userTokens)
                    .where(
                        and(
                            eq(schema.userTokens.tokenId, tokenId),
                            eq(schema.userTokens.userId, session.user.id)
                        )
                    );
                const oldAmount = userToken ? parseFloat(userToken.amount) : 0;

                await db
                    .insert(schema.userTokens)
                    .values({
                        tokenId: tokenId,
                        userId: session.user.id,
                        amount: body.amount.toString(),
                    })
                    .onConflictDoUpdate({
                        target: [
                            schema.userTokens.tokenId,
                            schema.userTokens.userId,
                        ],
                        set: {
                            amount: (oldAmount + body.amount).toString(),
                        },
                    });

                return bcTx;
            });

            return {
                status: 'ok' as const,
                data: {
                    transactionHash: bcTx.hash,
                },
            };
        },
        {
            body: t.Object({
                amount: t.Number(),
            }),
            response: t.Object({
                status: t.Literal('ok'),
                data: t.Object({
                    transactionHash: t.String(),
                }),
            }),
        }
    );
