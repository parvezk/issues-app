/**
 * Defines the API route for handling GraphQL requests.
 */
import { NextRequest, NextResponse } from "next/server";
import { buildSchema, graphql } from "graphql";
// locals
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { getUserFromToken } from "@/utils/auth";
// import typeDefs from "./schema.graphql";

// Create the GraphQL schema
const schema = buildSchema(typeDefs);

export async function POST(req: NextRequest) {
  try {
    const { query, variables } = await req.json();

    const context = async (req: NextRequest) => {
      const user = await getUserFromToken(
        req.headers.get("authorization") ?? ""
      );

      return { req, user };
    };

    const response = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      variableValues: variables,
      contextValue: await context(req),
    });

    const headers = new Headers();

    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error("API Error:", error); // Log error details
    return NextResponse.json(
      { errors: [{ message: error.message }] },
      { status: 500 }
    );
  }
}
