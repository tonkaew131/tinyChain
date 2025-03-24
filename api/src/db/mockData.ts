import { db } from './index';
import * as schema from './schema';

// Helper function to convert THB to wei based on current ETH/THB rate
function thbToWei(thbAmount: number): string {
    // Example rate: 1 ETH = 90,000 THB
    // This should be fetched from an oracle or price feed in production
    const ethThbRate = 90000;
    const ethAmount = thbAmount / ethThbRate;
    // Convert to wei (1 ETH = 10^18 wei)
    const weiAmount = BigInt(Math.floor(ethAmount * 1e18));
    return weiAmount.toString();
}

export async function initializeMockData() {
    // Mock project data
    const [project] = await db
        .insert(schema.projects)
        .values({
            name: 'Reforestation Project Alpha',
            description: 'Forest conservation and restoration in Thailand',
            developerId: 'D1000', // Assuming this developer ID exists
        })
        .returning();

    // Mock token metadata
    const mockTokens = [
        {
            tokenId: 1,
            projectId: project.id,
            year: '2023',
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            developerAddress: '0x1234567890123456789012345678901234567890',
            carbonAmountTco2eq: 5000,
            initialPriceThb: 100000, // 1,000 THB (in satang)
            initialPriceWei: thbToWei(1000), // Convert 1,000 THB to wei
        },
        {
            tokenId: 2,
            projectId: project.id,
            year: '2024',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
            developerAddress: '0x1234567890123456789012345678901234567890',
            carbonAmountTco2eq: 7500,
            initialPriceThb: 150000, // 1,500 THB (in satang)
            initialPriceWei: thbToWei(1500), // Convert 1,500 THB to wei
        },
    ];

    await db.insert(schema.tokenMetadata).values(mockTokens);

    // Mock market activity
    const mockActivity = [
        {
            eventType: 'mint',
            tokenId: 1,
            amount: 5000,
            sellerAddress: '0x1234567890123456789012345678901234567890',
            transactionHash: '0xabc...123',
            blockTimestamp: new Date('2024-03-20T10:00:00Z'),
        },
        {
            eventType: 'list',
            tokenId: 1,
            amount: 1000,
            sellerAddress: '0x1234567890123456789012345678901234567890',
            pricePerUnitThb: 120000, // 1,200 THB (in satang)
            pricePerUnitWei: thbToWei(1200), // Convert 1,200 THB to wei
            transactionHash: '0xdef...456',
            blockTimestamp: new Date('2024-03-21T14:30:00Z'),
        },
        {
            eventType: 'sale',
            tokenId: 1,
            amount: 500,
            sellerAddress: '0x1234567890123456789012345678901234567890',
            buyerAddress: '0x9876543210987654321098765432109876543210',
            pricePerUnitThb: 120000, // 1,200 THB (in satang)
            pricePerUnitWei: thbToWei(1200), // Convert 1,200 THB to wei
            transactionHash: '0xghi...789',
            blockTimestamp: new Date('2024-03-22T09:15:00Z'),
        },
    ];

    await db.insert(schema.marketActivity).values(mockActivity);
}
