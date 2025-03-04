import { NextRequest, NextResponse } from "next/server";
import { buildSchema, graphql } from "graphql";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
/**
 * Defines the API route for handling GraphQL requests.
 */

// Create the GraphQL schema
const schema = buildSchema(typeDefs);

export async function POST(req: NextRequest) {
  try {
    const { query, variables } = await req.json();

    const response = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      variableValues: variables,
    });

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
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
