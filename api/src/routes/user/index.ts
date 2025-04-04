import Elysia, { t } from 'elysia';

import { and, count, eq, gt, sql, sum } from 'drizzle-orm';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { auth } from '@api/utils/auth';

export const UserRoute = new Elysia({
    prefix: '/user',
})
    .get(
        '/wallet',
        async (context) => {
            const session = await auth.api.getSession({
                headers: context.request.headers,
            });
            if (!session) {
                throw new Error('Unauthorized');
            }

            const wallet = await db.query.userWallets.findFirst({
                where: eq(schema.userWallets.userId, session.user.id),
            });

            if (!wallet) {
                return {
                    status: 'ok' as const,
                    data: {
                        balance: 0,
                    },
                };
            }

            return {
                status: 'ok' as const,
                data: {
                    balance: parseFloat(wallet.amount.toString()),
                },
            };
        },
        {
            response: {
                200: t.Object({
                    status: t.Literal('ok'),
                    data: t.Object({
                        balance: t.Number(),
                    }),
                }),
            },
        }
    )
    .get(
        '/stats',
        async (context) => {
            const session = await auth.api.getSession({
                headers: context.request.headers,
            });

            if (!session) {
                throw new Error('Unauthorized');
            }

            const [stats] = await db
                .select({
                    totalCarbonOffset: sum(schema.projectTokens.amount),
                    activeCredits: sum(schema.projectTokens.unsoldAmount),
                })
                .from(schema.userTokens)
                .leftJoin(
                    schema.projectTokens,
                    eq(schema.projectTokens.tokenId, schema.userTokens.tokenId)
                )
                .where(eq(schema.userTokens.userId, session.user.id));
            const [burn] = await db
                .select({
                    retiredCredits: sum(schema.projectTokens.amount),
                })
                .from(schema.userTokens)
                .leftJoin(
                    schema.projectTokens,
                    eq(schema.projectTokens.tokenId, schema.userTokens.tokenId)
                )
                .where(
                    and(
                        eq(schema.userTokens.userId, session.user.id),
                        gt(schema.projectTokens.endDate, new Date())
                    )
                );
            const [project] = await db
                .select({
                    totalProjects: count(schema.projects.id),
                })
                .from(schema.projects)
                .leftJoin(
                    schema.users,
                    eq(schema.users.developerId, schema.projects.developerId)
                );

            const tokens = await db
                .select({
                    tokenId: schema.userTokens.tokenId,
                    userId: schema.userTokens.userId,
                    amount: schema.userTokens.amount,
                    boughtAt: schema.userTokens.boughtAt,
                })
                .from(schema.userTokens)
                .where(eq(schema.users.id, schema.userTokens.userId));

            return {
                status: 'ok' as const,
                data: {
                    totalCarbonOffset: parseFloat(
                        stats.totalCarbonOffset ?? '0'
                    ),
                    activeCredits: parseFloat(stats.activeCredits ?? '0'),
                    retiredCredits: parseFloat(burn.retiredCredits ?? '0'),
                    totalProjects: project.totalProjects,
                    projectSupport: parseFloat(stats.totalCarbonOffset ?? '0'),
                    tokens: tokens,
                },
            };
        },
        {
            response: {
                200: t.Object({
                    status: t.Literal('ok'),
                    data: t.Object({
                        totalCarbonOffset: t.Number(),
                        activeCredits: t.Number(),
                        retiredCredits: t.Number(),
                        projectSupport: t.Number(),
                        tokens: t.Array(
                            t.Object({
                                tokenId: t.String(),
                                userId: t.String(),
                                amount: t.Number(),
                                boughtAt: t.String(),
                            })
                        ),
                    }),
                }),
            },
        }
    );
