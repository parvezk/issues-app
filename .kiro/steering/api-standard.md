---
inclusion: always
---

---

inclusion: fileMatch
fileMatchPattern: ['**/api/**/*.ts', '**/gql/**/*.ts', '**/resolvers.ts', '**/typeDefs.ts']

---

# GraphQL API Standards

## Schema Design

- Use GraphQL schema-first approach with type definitions in `typeDefs.ts`
- Define all types, inputs, queries, and mutations in the schema string
- Use proper GraphQL naming conventions: PascalCase for types, camelCase for fields
- Group related inputs with `Input` suffix (e.g., `CreateIssueInput`, `AuthInput`)
- Use enums for fixed value sets (e.g., `IssueStatus`)

## Resolver Patterns

- All resolvers are defined in a single object exported from `resolvers.ts`
- Resolver signature: `async (args, context: GQLContext) => result`
- First parameter contains query/mutation arguments
- Second parameter is the GraphQL context containing authenticated user info

## Authentication & Authorization

- All protected resolvers MUST check `context.user` before proceeding
- Throw `GraphQLError` with code 401 for unauthorized access:
  ```typescript
  if (!context.user)
    throw new GraphQLError("UNAUTHORIZED", { extensions: { code: 401 } });
  ```
- JWT tokens are extracted from `Authorization: Bearer <token>` header
- Context is built in `route.ts` using `getUserFromToken()` utility
- Public mutations: `createUser`, `signin` (no auth check required)

## Error Handling

- Use `GraphQLError` from `graphql` package for all API errors
- Include extension codes for error categorization:
  - `401` - Unauthorized/authentication failures
  - `DB_ERROR` - Database operation failures
  - `AUTH_ERROR` - Authentication/signup errors
- Log errors to console before throwing for debugging
- Catch database errors and wrap in descriptive GraphQL errors

## Database Operations

- Use Drizzle ORM for all database interactions
- Import `db` from `@/db/db` and schema types from `@/db/schema`
- Use Drizzle query builders: `select()`, `insert()`, `update()`, `delete()`
- Use `.returning()` for mutations to get created/updated records
- Use `eq()` for equality filters, `desc()` for descending order
- Destructure single results: `const [result] = await db.insert(...).returning()`

## Client-Side Queries/Mutations

- Define all GraphQL operations in separate files under `src/gql/`
- Use `gql` from `graphql-tag` for query/mutation definitions
- Export as named constants with descriptive names (e.g., `CREATE_ISSUE_MUTATION`)
- Naming convention: `{ACTION}_{ENTITY}_{TYPE}` (e.g., `UPDATE_ISSUE_STATUS_MUTATION`)
- Barrel export all operations from `src/gql/index.ts`

## CORS Configuration

- CORS headers defined in `@/utils/headers`
- Allow Apollo Studio origin for development/testing
- Support OPTIONS preflight requests in route handlers
- Include credentials, methods, and authorization headers

## Route Handler Structure

- GraphQL endpoint at `/api/graphql/route.ts`
- Implement POST for GraphQL operations and OPTIONS for CORS
- Build schema using `buildSchema(typeDefs)`
- Execute queries with `graphql()` function passing schema, query, resolvers, variables, and context
- Return JSON responses with proper CORS headers
- Catch and format errors with 500 status code

## Context Pattern

- Context type defined in `@/types/GQLContext.ts`
- Contains optional `user` object with `id`, `email`, `createdAt`
- Built asynchronously from request headers
- Passed to all resolvers for authentication state

## Best Practices

- Keep resolvers focused on single responsibility
- Use TypeScript types from schema for type safety
- Filter data by authenticated user (e.g., only show user's own issues)
- Order results consistently (e.g., newest first with `desc(createdAt)`)
- Validate required fields in input types at schema level
- Return complete objects from mutations for cache updates
