import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import type React from 'react';

import QueryProvider from '@/components/query-provider';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AkaraCarbon - Carbon Credit Marketplace',
    description:
        'Connect with sustainable farming projects and purchase carbon credits to offset your carbon footprint.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="relative flex min-h-screen flex-col">
                            <SiteHeader />
                            <div className="flex-1">{children}</div>
                            <SiteFooter />
                        </div>
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
