import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ActivityEvent {
    eventType: 'mint' | 'list' | 'sale' | 'cancel';
    tokenId: number;
    amount: number;
    sellerAddress: string;
    buyerAddress?: string;
    priceFormatted?: string;
    transactionHash: string;
    blockTimestamp: Date;
}

interface ActivityItemProps {
    event: ActivityEvent;
}

export function ActivityItem({ event }: ActivityItemProps) {
    const getEventLabel = (type: ActivityEvent['eventType']) => {
        switch (type) {
            case 'mint':
                return { text: 'Minted', variant: 'default' as const };
            case 'list':
                return { text: 'Listed', variant: 'secondary' as const };
            case 'sale':
                return { text: 'Sold', variant: 'outline' as const };
            case 'cancel':
                return { text: 'Cancelled', variant: 'destructive' as const };
        }
    };

    const getEventDescription = (event: ActivityEvent) => {
        const {
            eventType,
            amount,
            sellerAddress,
            buyerAddress,
            priceFormatted,
        } = event;
        switch (eventType) {
            case 'mint':
                return `${amount} tokens minted by ${sellerAddress}`;
            case 'list':
                return `${amount} tokens listed by ${sellerAddress} for ${priceFormatted}`;
            case 'sale':
                return `${amount} tokens sold by ${sellerAddress} to ${buyerAddress} for ${priceFormatted}`;
            case 'cancel':
                return `Listing cancelled by ${sellerAddress}`;
        }
    };

    const label = getEventLabel(event.eventType);

    return (
        <Card className="p-4">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge variant={label.variant}>{label.text}</Badge>
                        <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(event.blockTimestamp, {
                                addSuffix: true,
                            })}
                        </span>
                    </div>
                    <p>{getEventDescription(event)}</p>
                </div>
                <a
                    href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                >
                    <ExternalLink className="h-4 w-4" />
                </a>
            </div>
        </Card>
    );
}
