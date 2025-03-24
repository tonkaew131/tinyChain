import { Context, Elysia } from 'elysia';

import { auth } from '@api/utils/auth';

const betterAuthView = (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET'];
    // validate request method
    if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return auth.handler(context.request);
    } else {
        context.error(405);
    }
};

export const AuthRoute = new Elysia().all('/auth/*', betterAuthView);
