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

// Debug logging for environment variables
console.log("[DB] TURSO_CONNECTION_URL type:", typeof url);
console.log("[DB] TURSO_CONNECTION_URL exists:", !!url);
console.log("[DB] TURSO_AUTH_TOKEN exists:", !!authToken);

// Validate URL before creating client
if (!url || url === "undefined") {
  console.error("[DB ERROR] TURSO_CONNECTION_URL is missing or invalid");
  throw new Error(
    "Database configuration error: TURSO_CONNECTION_URL is missing or invalid"
  );
}

export const dbClient = createClient({
  url,
  authToken: authToken || undefined, // Use undefined if empty string
});

export const db = drizzle(dbClient);
