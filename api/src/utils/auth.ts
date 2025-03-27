import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, openAPI } from 'better-auth/plugins';

import { db } from '@api/db';
import * as schema from '@api/db/schema';

export const auth = betterAuth({
    advanced: {
        cookies: {
            session_token: {
                attributes: {},
            },
        },
    },
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            user: schema.users,
            session: schema.sessions,
            account: schema.accounts,
            verification: schema.verifications,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [admin(), openAPI()],
    basePath: '/auth',
    user: {
        additionalFields: {
            developerId: {
                type: 'string',
                required: false,
                input: false,
            },
        },
    },
});
