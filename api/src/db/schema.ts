import { sql } from 'drizzle-orm';
import {
    boolean,
    integer,
    pgEnum,
    pgSequence,
    pgTable,
    text,
    timestamp,
} from 'drizzle-orm/pg-core';

export const userTypeEnum = pgEnum('user_type', ['admin', 'user']);
export const users = pgTable('user', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),

    developerId: text().references(() => projectDevelopers.id),

    role: text(),
    banned: boolean(),
    banReason: text(),
    banExpires: timestamp(),
});

export const sessions = pgTable('session', {
    id: text().primaryKey(),
    expiresAt: timestamp().notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text()
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    impersonatedBy: text(),
});

export const accounts = pgTable('account', {
    id: text().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp(),
    refreshTokenExpiresAt: timestamp(),
    scope: text(),
    password: text(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
});

export const verifications = pgTable('verification', {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp(),
    updatedAt: timestamp(),
});

export const projectIdSequence = pgSequence('project_id_seq', {
    startWith: 1000,
});
export const projects = pgTable('project', {
    id: text()
        .primaryKey()
        .default(sql.raw(`'P' || nextval('project_id_seq')::TEXT`)),
    developerId: text()
        .notNull()
        .references(() => projectDevelopers.id),

    name: text().notNull(),
    description: text().default('').notNull(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const projectTokens = pgTable('project_token', {
    tokenId: integer().primaryKey(),
    projectId: text()
        .notNull()
        .references(() => projects.id, { onDelete: 'cascade' }),

    name: text().notNull(),
    startDate: timestamp().notNull(),
    endDate: timestamp(),

    createdAt: timestamp().defaultNow().notNull(),
});

export const projectDeveloperIdSequence = pgSequence(
    'project_developer_id_seq',
    {
        startWith: 1000,
    }
);
export const projectDevelopers = pgTable('project_developer', {
    id: text()
        .primaryKey()
        .default(sql.raw(`'D' || nextval('project_developer_id_seq')::TEXT`)),
    name: text().notNull(),

    createdAt: timestamp().defaultNow().notNull(),
});

// Carbon credit token metadata
export const tokenMetadata = pgTable('token_metadata', {
    tokenId: integer().primaryKey(),
    projectId: text()
        .notNull()
        .references(() => projects.id, { onDelete: 'cascade' }),
    year: text().notNull(),
    startDate: timestamp().notNull(),
    endDate: timestamp().notNull(),
    developerAddress: text().notNull(),
    carbonAmountTco2eq: integer().notNull(),
    initialPriceThb: integer().notNull(), // Price in THB (satang)
    initialPriceWei: text().notNull(), // Price in wei for smart contract
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

// Market activity tracking
export const marketActivity = pgTable('market_activity', {
    id: text().primaryKey().default(sql`gen_random_uuid()`),
    eventType: text().notNull(), // 'mint', 'list', 'sale', 'cancel'
    tokenId: integer().notNull(),
    amount: integer().notNull(),
    sellerAddress: text().notNull(),
    buyerAddress: text(),
    pricePerUnitThb: integer(), // Price in THB (satang)
    pricePerUnitWei: text(), // Price in wei for smart contract
    transactionHash: text().notNull(),
    blockTimestamp: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});
