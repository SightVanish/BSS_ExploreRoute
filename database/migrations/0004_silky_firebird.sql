ALTER TABLE "locations" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "location" text NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "latitude";--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "longitude";--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "updated_at";