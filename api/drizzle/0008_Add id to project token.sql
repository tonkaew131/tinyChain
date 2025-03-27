/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'project_token'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

ALTER TABLE "project_token" DROP CONSTRAINT "project_token_pkey";--> statement-breakpoint
ALTER TABLE "project_token" ALTER COLUMN "token_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_token" ALTER COLUMN "end_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_token" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "project_token" ADD COLUMN "amount" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "project_token" ADD CONSTRAINT "project_token_tokenId_unique" UNIQUE("token_id");