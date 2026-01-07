/**
 * Defines the API route for handling GraphQL requests.
 */
import { NextRequest, NextResponse } from "next/server";
import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
// locals
import resolvers from "./resolvers";
import header from "@/utils/headers";
import { getUserFromToken } from "@/utils/auth";
import typeDefs from "./typeDefs";
// import typeDefs from "./schema.graphql";

// Create the GraphQL schema with resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

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
      variableValues: variables,
      contextValue: await context(req),
    });

    const headers = new Headers(header);

    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error("API Error:", error); // Log error details
    return NextResponse.json(
      { errors: [{ message: error.message }] },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, {
    status: 204,
    headers: header,
  });
  return response;
}
