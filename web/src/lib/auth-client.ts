import { useMutation } from '@tanstack/react-query';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
    // Use env instead
    baseURL: 'http://localhost:65535/api/auth',
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
