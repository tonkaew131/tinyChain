'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type React from 'react';

import {
    BarChart3,
    CreditCard,
    FileText,
    Home,
    Leaf,
    Settings,
    Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    role: 'all' | 'farmer' | 'customer';
}

export function DashboardNav() {
    const pathname = usePathname();

    // This would be determined by authentication in a real app
    const userRole = pathname.includes('/farmer') ? 'farmer' : 'customer';

    const navItems: NavItem[] = [
        {
            title: 'Overview',
            href: `/dashboard/${userRole}`,
            icon: Home,
            role: 'all',
        },
        {
            title: 'My Projects',
            href: '/dashboard/farmer/projects',
            icon: Leaf,
            role: 'farmer',
        },
        {
            title: 'New Project',
            href: '/dashboard/farmer/new-project',
            icon: FileText,
            role: 'farmer',
        },
        {
            title: 'My Credits',
            href: '/dashboard/customer/credits',
            icon: Leaf,
            role: 'customer',
        },
        {
            title: 'Transactions',
            href: `/dashboard/${userRole}/transactions`,
            icon: CreditCard,
            role: 'all',
        },
        {
            title: 'Analytics',
            href: `/dashboard/${userRole}/analytics`,
            icon: BarChart3,
            role: 'all',
        },
        {
            title: 'Team',
            href: `/dashboard/${userRole}/team`,
            icon: Users,
            role: 'all',
        },
        {
            title: 'Settings',
            href: `/dashboard/${userRole}/settings`,
            icon: Settings,
            role: 'all',
        },
    ];

    const filteredNavItems = navItems.filter(
        (item) => item.role === 'all' || item.role === userRole
    );

    return (
        <nav className="grid items-start gap-2 text-primary/75">
            {filteredNavItems.map((item) => (
                <Button
                    key={item.href}
                    variant={pathname === item.href ? 'default' : 'ghost'}
                    className={cn(
                        'justify-start',
                        pathname === item.href &&
                            'bg-muted text-primary hover:bg-muted'
                    )}
                    asChild
                >
                    <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                    </Link>
                </Button>
            ))}
        </nav>
    );
}
