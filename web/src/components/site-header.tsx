import Link from 'next/link';

import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center">
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <nav className="hidden gap-2 md:flex">
                        <Button asChild variant="ghost">
                            <Link href="/projects">Browse Projects</Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/about">About</Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/contact">Contact</Link>
                        </Button>
                    </nav>
                    <ModeToggle />
                    <UserNav />
                </div>
            </div>
        </header>
    );
}
