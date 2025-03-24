import Elysia, { t } from 'elysia';
import { eq, desc, inArray } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-typebox';

import { db } from '@api/db';
import * as schema from '@api/db/schema';
import { WebSocketServer } from '../../websocket';
import { initializeMockData } from '../../db/mockData';

const tokenMetadataSchema = createSelectSchema(schema.tokenMetadata);
const marketActivitySchema = createSelectSchema(schema.marketActivity);

// Helper function to format THB price from satang
function formatThbPrice(satang: number): string {
    return `${(satang / 100).toFixed(2)} THB`;
}

export const TokenRoute = new Elysia({
    prefix: '/token',
})
    // Development endpoint to initialize mock data
    .get(
        '/dev/init-mock-data',
        async () => {
            if (process.env.NODE_ENV === 'production') {
                throw new Error('This endpoint is not available in production');
            }
            await initializeMockData();
            return { status: 'ok' as const, message: 'Mock data initialized' };
        },
        {
            response: t.Object({
                status: t.Literal('ok'),
                message: t.String(),
            }),
        }
    )
    // Get metadata for a specific token ID (used by the contract)
    .get(
        '/:id.json',
        async ({ params }) => {
            const tokenId = parseInt(params.id);
            if (isNaN(tokenId)) {
                throw new Error('Invalid token ID');
            }

            const [metadata] = await db
                .select()
                .from(schema.tokenMetadata)
                .where(eq(schema.tokenMetadata.tokenId, tokenId));

            if (!metadata) {
                throw new Error('Token metadata not found');
            }

            return {
                name: `Carbon Credit Token #${tokenId}`,
                description: `Carbon credits for ${metadata.year}, amount: ${metadata.carbonAmountTco2eq} tCO2eq`,
                image: `https://akaracarbon.athichal.com/api/token/image/${tokenId}.png`,
                attributes: [
                    {
                        trait_type: 'Year',
                        value: metadata.year,
                    },
                    {
                        trait_type: 'Start Date',
                        value: metadata.startDate.toISOString(),
                    },
                    {
                        trait_type: 'End Date',
                        value: metadata.endDate.toISOString(),
                    },
                    {
                        trait_type: 'Carbon Amount (tCO2eq)',
                        value: metadata.carbonAmountTco2eq,
                    },
                    {
                        trait_type: 'Developer',
                        value: metadata.developerAddress,
                    },
                    {
                        trait_type: 'Initial Price',
                        value: formatThbPrice(metadata.initialPriceThb),
                    },
                ],
                properties: {
                    initialPriceThb: metadata.initialPriceThb,
                    initialPriceWei: metadata.initialPriceWei,
                },
            };
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    // Get recent activity for a project
    .get(
        '/activity/:projectId',
        async ({ params, query }) => {
            const limit = Math.min(parseInt(query?.limit || '50'), 50);
            
            // Get all token IDs for this project
            const tokens = await db
                .select({ tokenId: schema.tokenMetadata.tokenId })
                .from(schema.tokenMetadata)
                .where(eq(schema.tokenMetadata.projectId, params.projectId));

            const tokenIds = tokens.map((t) => t.tokenId);

            if (tokenIds.length === 0) {
                return {
                    status: 'ok' as const,
                    data: [],
                };
            }

            // Get recent activity for these tokens
            const activity = await db
                .select()
                .from(schema.marketActivity)
                .where(
                    inArray(schema.marketActivity.tokenId, tokenIds)
                )
                .orderBy(desc(schema.marketActivity.blockTimestamp))
                .limit(limit);

            // Format activity with THB prices
            const formattedActivity = activity.map(item => ({
                ...item,
                priceFormatted: item.pricePerUnitThb ? formatThbPrice(item.pricePerUnitThb) : undefined,
            }));

            return {
                status: 'ok' as const,
                data: formattedActivity,
            };
        },
        {
            params: t.Object({
                projectId: t.String(),
            }),
            query: t.Optional(
                t.Object({
                    limit: t.Optional(t.String()),
                })
            ),
            response: t.Object({
                status: t.Literal('ok'),
                data: t.Array(t.Object({
                    ...marketActivitySchema.properties,
                    priceFormatted: t.Optional(t.String()),
                })),
            }),
        }
    );
