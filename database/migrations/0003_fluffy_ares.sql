ALTER TABLE "locations" ADD COLUMN "latitude" text NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "longitude" text NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;