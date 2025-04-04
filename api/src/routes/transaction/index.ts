import Elysia, { t } from 'elysia';

import { eq } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-typebox';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { auth } from '@api/utils/auth';

const transactionSelectSchema = createSelectSchema(schema.transactions);

export const TransactionRoute = new Elysia({
    prefix: '/transaction',
})
    .get(
        '/all',
        async () => {
            return db.select().from(schema.transactions);
        },
        {
            response: t.Array(transactionSelectSchema),
        }
    )
    .get(
        '/my',
        async (context) => {
            const session = await auth.api.getSession({
                headers: context.request.headers,
            });

            if (!session) {
                throw new Error('Unauthorized');
            }

            return db
                .select()
                .from(schema.transactions)
                .where(eq(schema.transactions.userId, session.user.id));
        },
        {
            response: t.Array(transactionSelectSchema),
        }
    );
