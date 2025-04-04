import Elysia, { error, t } from 'elysia';

import { and, count, eq, gt, sql, sum } from 'drizzle-orm';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { auth } from '@api/utils/auth';

export const DeveloperRoute = new Elysia({
    prefix: '/developer',
})
    .get('/', async () => {
        const developers = await db.select().from(schema.projectDevelopers);

        return {
            status: 'ok' as const,
            data: developers,
        };
    })
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
                    revenue: sum(
                        sql`CAST(${schema.projectTokens.amount} AS FLOAT) * ${schema.projectTokens.pricePerToken}`
                    ),
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

            return {
                status: 'ok' as const,
                data: {
                    totalCarbonOffset: parseFloat(
                        stats.totalCarbonOffset ?? '0'
                    ),
                    activeCredits: parseFloat(stats.activeCredits ?? '0'),
                    retiredCredits: parseFloat(burn.retiredCredits ?? '0'),
                    totalProjects: project.totalProjects,
                    revenue: parseFloat(stats.revenue ?? '0'),
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
                        totalProjects: t.Number(),
                        revenue: t.Number(),
                    }),
                }),
            },
        }
    );
