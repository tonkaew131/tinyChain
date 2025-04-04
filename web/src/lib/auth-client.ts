import { type Auth } from '@api/utils/auth';
import { useMutation } from '@tanstack/react-query';
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
    // Use env instead
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://akaracarbon.athichal.com/api/auth'
            : 'http://localhost:65535/api/auth',
    plugins: [inferAdditionalFields<Auth>(), adminClient()],
});

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            authClient.signIn.email(data),
    });
};

export const useSignUp = () => {
    return useMutation({
        mutationFn: (data: {
            name: string;
            email: string;
            password: string;
            role: string;
        }) => authClient.signUp.email(data),
    });
};

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: (data: Parameters<typeof authClient.updateUser>[0]) =>
            authClient.updateUser(data),
    });
};

export const useAddWallet = () => {
    return;
};
