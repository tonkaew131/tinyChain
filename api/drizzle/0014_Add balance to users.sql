ALTER TABLE "user_wallet" ALTER COLUMN "amount" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "balance" numeric DEFAULT 0 NOT NULL;