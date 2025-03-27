import Link from 'next/link';

import { Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function WalletIcon() {
    return (
        <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard/wallet">
                <Wallet className="h-6 w-6" />
            </Link>
        </Button>
    );
}
