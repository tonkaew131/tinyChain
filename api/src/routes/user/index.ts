import Elysia, { t } from 'elysia';

import { eq } from 'drizzle-orm';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { auth } from '@api/utils/auth';

export const UserRoute = new Elysia({
    prefix: '/user',
}).get(
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
);
