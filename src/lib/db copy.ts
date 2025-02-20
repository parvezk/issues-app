import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
/**
 * Database configuration and connection setup
 * Uses Drizzle ORM to interact with TursoDB/SQLite
 * Handles database operations and data modeling
 */

// Make sure to access environment variables this way
const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Debug the environment variables
console.log("-----DB URL:", url);
console.log("-----Auth token exists:", !!authToken);

export const dbClient = createClient({
  url,
  authToken,
});

export const db = drizzle(dbClient);
