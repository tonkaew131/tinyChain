import { Elysia } from 'elysia';

import { AdminRoute, destroyExpiredTokens } from './routes/admin';
import { AuthRoute } from './routes/auth';
import { DeveloperRoute } from './routes/developer';
import { HelloWorldRoute } from './routes/hello-world';
import { PaymentRoute } from './routes/payment';
import { ProjectRoute } from './routes/project';
import { TransactionRoute } from './routes/transaction';
import { auth } from './utils/auth';
import { cron } from '@elysiajs/cron';
import swagger from '@elysiajs/swagger';
import { merge } from 'openapi-merge';

const app = new Elysia()
    .use(
        cron({
            name: 'Destroy expired tokens',
            pattern: '1 0 */1 * *',
            async run() {
                await destroyExpiredTokens();
            },
        })
    )
    .use(
        swagger({
            scalarConfig: {
                spec: {
                    url: '/api/swagger/all-json',
                },
                servers: [
                    {
                        url: process.env.NEXT_PUBLIC_API_URL,
                    },
                ],
            },
        })
    )
    .get('/swagger/all-json', async () => {
        const result = merge([
            {
                oas: await auth.api.generateOpenAPISchema(),
                pathModification: {
                    prepend: '/auth',
                },
            },
            {
                oas: await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/swagger/json`
                ).then((res) => res.json()),
                pathModification: {
                    prepend: '',
                },
            },
        ]);

        return 'output' in result ? result.output : result;
    })
    .use(AuthRoute)
    .use(ProjectRoute)
    .use(DeveloperRoute)
    .use(PaymentRoute)
    .use(AdminRoute)
    .use(TransactionRoute)
    .use(HelloWorldRoute)
    .get('/', () => 'Hello Elysia')
    .listen(process.env.PORT || 3001);

console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
