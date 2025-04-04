import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ActivityEvent {
    id: string;
    txId: string;
    type: 'mint' | 'buy' | 'burn' | 'sell';
    message: string;
    userId: string;
    createdAt: Record<string, never>;
}

interface ActivityItemProps {
    event: ActivityEvent;
}

export function ActivityItem({ event }: ActivityItemProps) {
    const getEventLabel = (type: ActivityEvent['type']) => {
        switch (type) {
            case 'mint':
                return { text: 'Minted', variant: 'default' as const };
            case 'buy':
                return { text: 'Listed', variant: 'secondary' as const };
            case 'sell':
                return { text: 'Sold', variant: 'outline' as const };
            case 'burn':
                return { text: 'Cancelled', variant: 'destructive' as const };
        }
    };

    const getEventDescription = (event: ActivityEvent) => {
        const { type, txId, message } = event;
        switch (type) {
            case 'mint':
                return message;
            case 'buy':
                return message;
            case 'sell':
                return message;
            case 'burn':
                return `Listing cancelled by ${txId}`;
        }
    };

    const label = getEventLabel(event.type);

    return (
        <Card className="p-4">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge variant={label.variant}>{label.text}</Badge>
                        <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(
                                event.createdAt as unknown as Date,
                                {
                                    addSuffix: true,
                                }
                            )}
                        </span>
                    </div>
                    <p>{getEventDescription(event)}</p>
                </div>
                <a
                    href={`https://sepolia.etherscan.io/tx/${event.txId}`}
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
