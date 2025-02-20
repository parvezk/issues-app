import { NextRequest, NextResponse } from "next/server";
import { buildSchema, graphql } from "graphql";
import resolvers from "./resolvers";
import typeDefs from "./schema";

/**
 * Defines the API route for handling GraphQL requests.
 */

// Debug environment variables in route handler
console.log("[ROUTE] Environment variables check:");
console.log("TURSO_CONNECTION_URL exists:", !!process.env.TURSO_CONNECTION_URL);
console.log("TURSO_AUTH_TOKEN exists:", !!process.env.TURSO_AUTH_TOKEN);

// Create the GraphQL schema
const schema = buildSchema(typeDefs);

export async function POST(req: NextRequest) {
  try {
    // Validate database connection environment variables first
    if (
      !process.env.TURSO_CONNECTION_URL ||
      process.env.TURSO_CONNECTION_URL === "undefined"
    ) {
      console.error(
        "[ROUTE ERROR] Database configuration issue: TURSO_CONNECTION_URL is missing"
      );
      return NextResponse.json(
        {
          errors: [
            { message: "Server configuration error: Database URL missing" },
          ],
        },
        { status: 500 }
      );
    }

    const { query, variables } = await req.json();
    console.log("POST API hit");
    const response = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      variableValues: variables,
    });

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "POST");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error("API Error:", error); // Log error details
    return NextResponse.json(
      { errors: [{ message: error.message }] },
      { status: 500 }
    );
  }
}
