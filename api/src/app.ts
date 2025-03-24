import { Elysia } from 'elysia';

import { AuthRoute } from './routes/auth';
import { HelloWorldRoute } from './routes/hello-world';
import { ProjectRoute } from './routes/project';
import swagger from '@elysiajs/swagger';

const app = new Elysia()
    .use(swagger())
    .use(AuthRoute)
    .use(ProjectRoute)
    .use(HelloWorldRoute)
    .get('/', () => 'Hello Elysia')
    .listen(3001);

const { ALCHEMY_API_URL, WALLET_PRIVATE_KEY } = process.env;

console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
