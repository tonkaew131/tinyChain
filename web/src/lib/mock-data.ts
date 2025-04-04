export const projects = [
    {
        id: 'P1006',
        type: 'agriculture',
        name: 'Wow',
        location: 'Wongsawang 11',
        description: 'test',
        developerId: 'D1000',
        image: '',
        createdAt: '2025-03-27T18:49:27.725Z',
        updatedAt: '2025-03-27T18:49:27.725Z',
        developer: 'TPI Polene Power Public Company Limited',
    },
] as const;

export const tokens = [
    {
        id: 'Md1fCrPNcmT1',
        tokenId: 2,
        projectId: 'P1006',
        name: 'ปลูกต้นไม้ 2567',
        amount: '500',
        unsoldAmount: '439',
        pricePerToken: '50',
        startDate: '2025-03-26T17:00:00.000Z',
        endDate: '2025-05-30T17:00:00.000Z',
        createdAt: '2025-03-27T18:52:42.268Z',
    },
    {
        id: 'NIQTJ22FEymX',
        tokenId: 3,
        projectId: 'P1006',
        name: 'MY NEW TOKEN',
        amount: '1500',
        unsoldAmount: '1500',
        pricePerToken: '500',
        startDate: '2025-04-03T17:00:00.000Z',
        endDate: '2025-04-03T00:00:00.000Z',
        createdAt: '2025-04-04T14:27:10.838Z',
    },
];

export const activities = [
    {
        id: 'iyvoQ0jTwhL1TYNKRtvBdiEFa7HF5XmK9ryZDtCAgdjgOe8Xg79H9Z99Lpc4fbpZ',
        txId: '0x3189858a45ebca7d4980c85f3cbdb3ba2fd4c0ba205760260e295c7dd67d35ac',
        type: 'mint',
        message:
            '40 tokens listed by TPI Polene Power Public Company Limited for 50 THB',
        userId: 'cAucYYwtVQTef4gtkLCwPUP0pycbR2K2',
        createdAt: '2025-04-04T16:39:36.664Z',
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
