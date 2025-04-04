import Elysia from 'elysia';

import { AuthGuard } from '../auth/guard';
import { and, isNotNull, lt } from 'drizzle-orm';

import { akaraCarbonContract } from '@api/contracts/AkaraCarbon';
import { db } from '@api/db';
import * as schema from '@api/db/schema';

export const AdminRoute = new Elysia({
    prefix: '/admin',
})
    .use(AuthGuard)
    .post('/destroy-expired-tokens', async (context) => {
        const { user } = context;
        if (user.role !== 'admin') {
            throw new Error('Unauthorized');
        }

        return {
            status: 'ok' as const,
            data: await destroyExpiredTokens(),
        };
    });

export const destroyExpiredTokens = async () => {
    const expiredTokens = await db.query.projectTokens.findMany({
        with: {
            users: true,
        },
        where: and(
            lt(schema.projectTokens.endDate, new Date()),
            isNotNull(schema.projectTokens.tokenId)
        ),
    });

    const tokensToDestroy = expiredTokens.flatMap((t) =>
        t.users.map((u) => ({
            tokenId: t.tokenId,
            userId: u.userId,
        }))
    );

    const bcTx = await akaraCarbonContract.destoryExpired(
        tokensToDestroy.map((token) => token.tokenId),
        tokensToDestroy.map((token) => token.userId)
    );

    return { tokens: tokensToDestroy, txId: bcTx.hash };
};
