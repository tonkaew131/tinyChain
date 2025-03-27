'use client';

import Link from 'next/link';

import { useState } from 'react';

import { authClient } from '@/lib/auth-client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { WalletIcon } from '@/components/wallet';

export function UserNav() {
    // This would be replaced with actual auth state
    const { useSession, signOut } = authClient;
    const { data } = useSession();

    if (!data) {
        return (
            <div className="flex gap-2">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
        );
    }

    console.log(data);

    return (
        <>
            <WalletIcon />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                    >
                        <div>
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src="/placeholder-user.jpg"
                                    alt="User"
                                />
                                <AvatarFallback>
                                    {data.user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <span className="absolute -end-1.5 -top-1.5">
                                <span className="sr-only">Verified</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        className="fill-background"
                                        d="M3.046 8.277A4.402 4.402 0 0 1 8.303 3.03a4.4 4.4 0 0 1 7.411 0 4.397 4.397 0 0 1 5.19 3.068c.207.713.23 1.466.067 2.19a4.4 4.4 0 0 1 0 7.415 4.403 4.403 0 0 1-3.06 5.187 4.398 4.398 0 0 1-2.186.072 4.398 4.398 0 0 1-7.422 0 4.398 4.398 0 0 1-5.257-5.248 4.4 4.4 0 0 1 0-7.437Z"
                                    />
                                    <path
                                        className="fill-primary"
                                        d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
                                    />
                                    <path
                                        className="fill-background"
                                        d="M15.707 9.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {data.user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {data.user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link
                                href={
                                    data.user.role === 'farmer'
                                        ? '/dashboard/farmer'
                                        : '/user/${data.user.id}'
                                }
                            >
                                Dashboard
                            </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem asChild>
                            <Link href="/profile">Profile</Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem asChild>
                            <Link href="/settings">Settings</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
