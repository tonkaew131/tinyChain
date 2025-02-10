import { helloWorldContract } from '@/contracts/HelloWorld';
import Elysia, { t } from 'elysia';

export const HelloWorldRoute = new Elysia({
    prefix: 'contracts/hello-world',
})
    .get(
        '/',
        async () => {
            const message = await helloWorldContract.message();

            return {
                message: message,
            };
        },
        { response: t.Object({ message: t.String() }) }
    )
    .post(
        '/',
        async (context) => {
            const { message } = context.body;

            const tx = await helloWorldContract.update(message);
            await tx.wait();

            return {
                message: message,
            };
        },
        {
            body: t.Object({
                message: t.String(),
            }),
            response: t.Object({ message: t.String() }),
        }
    );
