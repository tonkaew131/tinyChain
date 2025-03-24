import Elysia, { error } from 'elysia';

import { auth } from '@api/utils/auth';

export const AuthGuard = new Elysia().derive(
    {
        as: 'scoped',
    },
    async ({ request: { headers } }) => {
        const session = await auth.api.getSession({
            headers,
        });

        if (!session) return error(401);

        return {
            user: session.user,
            session: session.session,
        };
    }
);
