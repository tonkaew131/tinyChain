import { createAuthClient } from "better-auth/react"
import { useMutation } from "@tanstack/react-query";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: { email: string, password: string }) => authClient.signIn.email(data),
    })
}
