import { generateResetPasswordEmail } from './email';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, openAPI } from 'better-auth/plugins';
import { Resend } from 'resend';

import { db } from '@api/db';
import * as schema from '@api/db/schema';

const resend = new Resend(process.env.RENDER_API_KEY || 're_123');

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
        sendResetPassword: async (data, request) => {
            const { data: emailData, error } = await resend.emails.send({
                from: 'noreply@athichal.com',
                to: data.user.email,
                subject: 'AkaraCarbon: Reset your password',
                html: generateResetPasswordEmail(data.user.name, data.url),
            });
        },
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
            wallet: {
                type: 'string',
                required: false,
                input: true,
            },
            balance: {
                type: 'number',
                required: true,
                defaultValue: 0,
                input: false,
            },
        },
    },
});

export type Auth = typeof auth;