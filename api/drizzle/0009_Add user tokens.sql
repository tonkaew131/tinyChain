CREATE TABLE "user_token" (
	"token_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"bought_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_token_token_id_user_id_pk" PRIMARY KEY("token_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_token_id_project_token_token_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."project_token"("token_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;