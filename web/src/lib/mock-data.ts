export const projects = [
    {
        id: 1,
        title: 'Regenerative Agriculture in Iowa',
        description:
            'No-till farming and cover crops to increase soil carbon sequestration on 5,000 acres of farmland in central Iowa.',
        location: 'Iowa, USA',
        carbonCredits: 5000,
        price: 25,
        images: ['/projects/1.jpeg', '/placeholder.svg', '/placeholder.svg'],
        type: 'Agriculture',
        certification: 'Verra',
        startDate: '2024-01-01',
        endDate: '2028-12-31',
    },
    {
        id: 2,
        title: 'Forest Conservation Project',
        description:
            'Protection and restoration of 10,000 hectares of tropical rainforest.',
        location: 'Thailand',
        carbonCredits: 8000,
        price: 30,
        images: ['/projects/2.png', '/placeholder.svg', '/placeholder.svg'],
        type: 'Forestry',
        certification: 'Gold Standard',
        startDate: '2024-03-01',
        endDate: '2029-02-28',
    },
] as const;

export const tokens = [
    {
        id: 1,
        projectId: 1,
        year: '2024',
        amount: 1000,
        price: 25,
        priceWei: '25000000000000000000',
        available: true,
    },
    {
        id: 2,
        projectId: 1,
        year: '2025',
        amount: 1500,
        price: 28,
        priceWei: '28000000000000000000',
        available: true,
    },
    {
        id: 3,
        projectId: 2,
        year: '2024',
        amount: 2000,
        price: 30,
        priceWei: '30000000000000000000',
        available: true,
    },
] as const;

export const activities = [
    {
        id: '1',
        eventType: 'mint' as const,
        tokenId: 1,
        projectId: 1,
        amount: 1000,
        sellerAddress: '0x1234...5678',
        transactionHash: '0xabc...123',
        blockTimestamp: new Date('2024-03-24T10:00:00Z'),
    },
    {
        id: '2',
        eventType: 'list' as const,
        tokenId: 1,
        projectId: 1,
        amount: 500,
        sellerAddress: '0x1234...5678',
        priceFormatted: '25.00 THB',
        transactionHash: '0xdef...456',
        blockTimestamp: new Date('2024-03-24T11:00:00Z'),
    },
    {
        id: '3',
        eventType: 'sale' as const,
        tokenId: 1,
        projectId: 1,
        amount: 200,
        sellerAddress: '0x1234...5678',
        buyerAddress: '0x9876...4321',
        priceFormatted: '25.00 THB',
        transactionHash: '0xghi...789',
        blockTimestamp: new Date('2024-03-24T12:00:00Z'),
    },
] as const;

// Generate mock price history for the last 30 days
const generatePriceHistory = (basePrice: number, volatility = 0.1) => {
    const now = new Date();
    const history = [];
    let currentPrice = basePrice;

    for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const randomChange = (Math.random() - 0.5) * basePrice * volatility;
        currentPrice = Math.max(
            basePrice * 0.7,
            Math.min(basePrice * 1.3, currentPrice + randomChange)
        );

        history.push({
            date: date.toISOString().split('T')[0],
            price: +currentPrice.toFixed(2),
            volume: Math.floor(Math.random() * 1000),
        });
    }
    return history;
};

// Generate price history for each token
export const tokenPriceHistory = {
    // Project 1 tokens
    1: generatePriceHistory(25, 0.05), // Token 1 - less volatile
    2: generatePriceHistory(28, 0.08), // Token 2 - medium volatility
    // Project 2 tokens
    3: generatePriceHistory(30, 0.12), // Token 3 - more volatile
} as const;
