import { Elysia } from 'elysia';
import { HelloWorldRoute } from './routes/hello-world';
import swagger from '@elysiajs/swagger';

const app = new Elysia()
    .use(swagger())
    .use(HelloWorldRoute)
    .get('/', () => 'Hello Elysia')
    .listen(3001);

const { ALCHEMY_API_URL, WALLET_PRIVATE_KEY } = process.env;

console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
