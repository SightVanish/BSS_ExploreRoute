import { relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const locations = pgTable("locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  user_id: text("user_id").notNull().references(() => users.id),
  location: text("location").notNull(), // Storing latitude,longitude as text
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
});

// Create relations between locations and users
export const locationsRelations = relations(locations, ({ one }) => ({
  user: one(users, {
    fields: [locations.user_id],
    references: [users.id],
  }),
}));