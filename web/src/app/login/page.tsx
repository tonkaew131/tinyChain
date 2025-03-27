"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/lib/auth-client"
import { useState } from "react"

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        login.mutate({ email, password },{
            onSuccess: (data) => {
                console.log(data);
                alert("Login Success");
            },
            onError: (error) => {
                alert(error.message);
            }
        }
);
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Login</h1>
            <form className="flex flex-col space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-sm font-medium">
                    Email
                </label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className="text-sm font-medium">
                    Password
                </label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" size="sm" >Login</Button>
            </form>
        </div>
    );
}
