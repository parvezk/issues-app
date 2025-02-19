import { randomUUID } from "crypto";
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
/**
 * Defines the GraphQL schema, including queries, and mutations.
 * Contains type definitions and resolvers
 * Maps GraphQL operations to database operations
 * @returns
 */

export type IssueStatus = "BACKLOG" | "TODO" | "INPROGRESS" | "DONE";

const id = () =>
  text("id")
    .primaryKey()
    .$default(() => randomUUID());

const createdAt = () =>
  text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull();

export const users = sqliteTable("users", {
  id: id(),
  createdAt: createdAt(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  issues: many(issues),
}));

export const issues = sqliteTable("issues", {
  id: id(),
  title: text("title").notNull(),
  userId: text("userId").notNull(),
  content: text("content").notNull(),
  status: text("status", { enum: ["BACKLOG", "TODO", "INPROGRESS", "DONE"] })
    .default("BACKLOG")
    .notNull(),
  createdAt: createdAt(),
});

export const issueRelations = relations(issues, ({ one }) => ({
  user: one(users, {
    fields: [issues.userId],
    references: [users.id],
  }),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertIssues = typeof issues.$inferInsert;
export type SelectIssues = typeof issues.$inferSelect;
