'use client';

import { useRouter } from 'next/navigation';

import * as React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import { useSignUp } from '@/lib/auth-client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z
    .object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(8, { message: 'Password must be at least 8 characters' }),
        confirmPassword: z
            .string()
            .min(1, { message: 'Please confirm your password' }),
        role: z.enum(['farmer', 'customer']).default('customer'),
        termsAccepted: z.boolean().refine((val) => val === true, {
            message: 'You must accept the terms and conditions',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export function SignupForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const { mutate, isPending } = useSignUp();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'customer',
            termsAccepted: false,
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        mutate(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            },
            {
                onSuccess: ({ data: _, error }) => {
                    if (error) {
                        toast.error(error.message);
                        return;
                    }
                    toast.success('Successfully signed up!');
                    router.push('/projects');
                },
                onError: (error) => {
                    toast.error(
                        error?.message || 'An error occurred during signup'
                    );
                },
            }
        );
    };

    // async function onSubmit(values: z.infer<typeof formSchema>) {
    //   setIsLoading(true)

    //   try {
    //   //   const response = await fetch('/api/auth/register', {
    //   //     method: 'POST',
    //   //     headers: {
    //   //       'Content-Type': 'application/json',
    //   //     },
    //   //     body: JSON.stringify({
    //   //       name: values.name,
    //   //       email: values.email,
    //   //       password: values.password,
    //   //       role: values.role,
    //   //     }),
    //   //   })

    //   //   const data = await response.json()

    //   //   if (!response.ok) {
    //   //     throw new Error(data.error || 'Registration failed')
    //   //   }

    //     toast.success("Account created", {
    //       description: "Your account has been created successfully. You can now log in.",
    //     })

    //     // Redirect to login page
    //     router.push("/login")
    //   } catch (error) {
    //     toast.error("Registration failed", {
    //       description: error instanceof Error ? error.message : "An unexpected error occurred",
    //     })
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                    Create your AkaraCarbon account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* <Tabs
                            defaultValue="customer"
                            onValueChange={(value) =>
                                form.setValue(
                                    'role',
                                    value as 'farmer' | 'customer'
                                )
                            }
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="customer">
                                    Customer
                                </TabsTrigger>
                                <TabsTrigger value="farmer">Farmer</TabsTrigger>
                            </TabsList>
                        </Tabs> */}

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name@example.com"
                                            type="email"
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="••••••••"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                autoComplete="new-password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <Eye
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <span className="sr-only">
                                                    {showPassword
                                                        ? 'Hide password'
                                                        : 'Show password'}
                                                </span>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="••••••••"
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                autoComplete="new-password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <Eye
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <span className="sr-only">
                                                    {showConfirmPassword
                                                        ? 'Hide password'
                                                        : 'Show password'}
                                                </span>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            I agree to the{' '}
                                            <a
                                                href="/terms"
                                                className="text-primary underline underline-offset-4"
                                            >
                                                terms of service
                                            </a>{' '}
                                            and{' '}
                                            <a
                                                href="/privacy"
                                                className="text-primary underline underline-offset-4"
                                            >
                                                privacy policy
                                            </a>
                                        </FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
