import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
/**
 * Database configuration and connection setup
 * Uses Drizzle ORM to interact with TursoDB/SQLite
 * Handles database operations and data modeling
 */

// Make sure to access environment variables with fallbacks and debugging
const url = process.env.TURSO_CONNECTION_URL || "";
const authToken = process.env.TURSO_AUTH_TOKEN || "";

export const dbClient = createClient({
  url,
  authToken: authToken || undefined, // Use undefined if empty string
});

export const db = drizzle(dbClient);
