import {
  pgTable,
  text,
  serial,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

/** Anonymous usage events sent in batches from the mobile app. */
export const analyticsEventsTable = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    deviceId: text("device_id").notNull(),
    name: text("name").notNull(),
    props: jsonb("props"),
    lang: text("lang"),
    clientTs: timestamp("client_ts", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("analytics_events_name_idx").on(t.name),
    index("analytics_events_device_idx").on(t.deviceId),
  ]
);

export const insertAnalyticsEventSchema = createInsertSchema(
  analyticsEventsTable
).omit({ id: true, createdAt: true });
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEventsTable.$inferSelect;

/** Sean Ellis PMF survey responses (anonymous, device-scoped). */
export const pmfResponsesTable = pgTable(
  "pmf_responses",
  {
    id: serial("id").primaryKey(),
    deviceId: text("device_id").notNull(),
    disappointment: text("disappointment").notNull(), // "very" | "somewhat" | "not"
    feedback: text("feedback"),
    lang: text("lang"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("pmf_responses_device_idx").on(t.deviceId)]
);

export const insertPmfResponseSchema = createInsertSchema(
  pmfResponsesTable
).omit({ id: true, createdAt: true });
export type InsertPmfResponse = z.infer<typeof insertPmfResponseSchema>;
export type PmfResponse = typeof pmfResponsesTable.$inferSelect;
