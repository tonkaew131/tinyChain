import Elysia, { t } from 'elysia';

import { eq, sql } from 'drizzle-orm';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { auth } from '@api/utils/auth';

export const PaymentRoute = new Elysia({
    prefix: '/payment',
}).post(
    '/add',
    async (context) => {
        const session = await auth.api.getSession({
            headers: context.request.headers,
        });

        if (!session) {
            throw new Error('Unauthorized');
        }

        await db
            .update(schema.users)
            .set({
                balance: sql`${schema.users.balance} + ${context.body.amount}`,
            })
            .where(eq(schema.users.id, session.user.id));

        return {
            status: 'ok' as const,
        };
    },
    {
        body: t.Object({
            amount: t.Number(),
        }),
        response: t.Object({
            status: t.Literal('ok'),
        }),
    }
);
