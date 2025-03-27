import Elysia, { error, t } from 'elysia';

import { eq, sum } from 'drizzle-orm';

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
                })
                .from(schema.userTokens)
                .leftJoin(
                    schema.projectTokens,
                    eq(schema.projectTokens.tokenId, schema.userTokens.tokenId)
                )
                .where(eq(schema.userTokens.userId, session.user.id));

            return {
                status: 'ok' as const,
                data: {
                    totalCarbonOffset: parseFloat(
                        stats.totalCarbonOffset ?? '0'
                    ),
                    activeCredits: 0,
                    retiredCredits: 0,
                    totalProjects: 0,
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
                    }),
                }),
            },
        }
    );
