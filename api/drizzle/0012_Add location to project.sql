ALTER TABLE "project_token" ADD COLUMN "price_per_token" numeric DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "location" text NOT NULL;