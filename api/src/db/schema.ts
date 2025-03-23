import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
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
