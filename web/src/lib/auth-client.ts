import { useMutation } from '@tanstack/react-query';
import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
    // Use env instead
    baseURL: 'http://localhost:65535/api/auth',
    plugins: [adminClient()],
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

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: { currentPassword: string; newPassword: string }) =>
            authClient.changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                revokeOtherSessions: true,
            }),
    });
};

export const useAddWallet = () => {
    return;
};
