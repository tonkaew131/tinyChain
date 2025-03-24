import { Elysia } from 'elysia';

import { AuthRoute } from './routes/auth';
import { HelloWorldRoute } from './routes/hello-world';
import { ProjectRoute } from './routes/project';
import { auth } from './utils/auth';
import swagger from '@elysiajs/swagger';
import { merge } from 'openapi-merge';

const app = new Elysia()
    .use(
        swagger({
            scalarConfig: {
                spec: {
                    url: '/swagger/all-json',
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
    .use(HelloWorldRoute)
    .get('/', () => 'Hello Elysia')
    .listen(3001);

const { ALCHEMY_API_URL, WALLET_PRIVATE_KEY } = process.env;

console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
