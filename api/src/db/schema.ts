import { relations, sql } from 'drizzle-orm';
import {
    boolean,
    decimal,
    integer,
    pgEnum,
    pgSequence,
    pgTable,
    primaryKey,
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
    wallet: text(),
    balance: decimal({
        mode: 'number',
    })
        .default(0)
        .notNull(),

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
export const projectTypeEnum = pgEnum('project_type', [
    'agriculture',
    'forestry',
    'livestock',
    'renewable',
    'conservation',
]);
export const projects = pgTable('project', {
    id: text()
        .primaryKey()
        .default(sql.raw(`'P' || nextval('project_id_seq')::TEXT`)),
    type: projectTypeEnum().default('agriculture').notNull(),
    name: text().notNull(),
    location: text().notNull(),
    description: text().default('').notNull(),

    developerId: text()
        .notNull()
        .references(() => projectDevelopers.id),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const projectTokens = pgTable('project_token', {
    id: text().primaryKey(),
    tokenId: integer().unique(),
    projectId: text()
        .notNull()
        .references(() => projects.id, { onDelete: 'cascade' }),

    name: text().notNull(),
    amount: decimal().notNull(),
    unsoldAmount: decimal().notNull(),
    pricePerToken: decimal().default('0').notNull(),
    startDate: timestamp({
        mode: 'date',
    }).notNull(),
    endDate: timestamp({
        mode: 'date',
    }).notNull(),

    createdAt: timestamp().defaultNow().notNull(),
});

export const projectTokensRelations = relations(projectTokens, ({ many }) => ({
    users: many(userTokens),
}));

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

export const userTokens = pgTable(
    'user_token',
    {
        tokenId: integer()
            .notNull()
            .references(() => projectTokens.tokenId),
        userId: text()
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        amount: decimal().notNull(),
        boughtAt: timestamp().defaultNow().notNull(),
    },
    (table) => [
        primaryKey({
            columns: [table.tokenId, table.userId],
        }),
    ]
);

export const userTokensRelations = relations(userTokens, ({ one }) => ({
    token: one(projectTokens, {
        fields: [userTokens.tokenId],
        references: [projectTokens.tokenId],
    }),
}));

export const userWallets = pgTable('user_wallet', {
    id: text().primaryKey(),
    userId: text()
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    amount: decimal().notNull().default('0'),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
});
