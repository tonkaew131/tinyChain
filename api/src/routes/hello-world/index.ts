import { helloWorldContract } from '@/contracts/HelloWorld';
import Elysia from 'elysia';

export const HelloWorldRoute = new Elysia({
    prefix: 'hello-world',
}).get('/', async () => {
    const message = await helloWorldContract.message()
    console.log("The message is: " + message)
});
