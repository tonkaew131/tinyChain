import { WebSocketServer as WS, WebSocket } from 'ws';

interface MarketEvent {
    eventType: string;
    tokenId: number;
    amount: number;
    sellerAddress: string;
    buyerAddress?: string;
    pricePerUnit?: string;
    transactionHash: string;
    blockTimestamp: Date;
}

class WebSocketServer {
    private wss: WS;
    private clients: Set<WebSocket>;

    constructor(server: any) {
        this.wss = new WS({ server });
        this.clients = new Set();

        this.wss.on('connection', (ws: WebSocket) => {
            this.clients.add(ws);

            ws.on('close', () => {
                this.clients.delete(ws);
            });
        });
    }

    broadcastEvent(event: MarketEvent) {
        const message = JSON.stringify(event);
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

export { WebSocketServer, MarketEvent };
