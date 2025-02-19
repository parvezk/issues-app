import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
/**
 * Database configuration and connection setup
 * Uses Drizzle ORM to interact with TursoDB/SQLite
 * Handles database operations and data modeling
 */

export const dbClient = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(dbClient);
