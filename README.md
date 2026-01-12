# Parallel App

This next.js app fetches data using URQL (GraphQL client and front end data layer) and performs CRUD operation on Turso DB using GraphQL API and Drizzle ORM (back-end data layer)

## Tech Stack

Client (Browser) <-> Next.js App <-> URQL Client <-> GraphQL API <-> Drizzle ORM <-> TursoDB/SQLite

- **Frontend**: Next.js
- **API Layer**: GraphQL
- **Data Fetching**: URQL Client
- **Database**: TursoDB/SQLite
- **ORM**: Drizzle
- **Language**: TypeScript

## Project Structure

Key components and their roles:

### Frontend Layer

- `src/app/page.tsx`: Main page component for UI rendering
- `src/lib/urqlClient.ts`: URQL client configuration for GraphQL operations

### API Layer

- `src/app/api/graphql/route.ts`: GraphQL API endpoint handler

### Schema Layer

- `src/lib/schema.ts`: GraphQL schema definitions and resolvers

### Database Layer

- `src/lib/db.ts`: Database configuration and Drizzle ORM setup

## Data Flow

1. User interaction in UI (page.tsx)
2. URQL client sends GraphQL request
3. GraphQL route processes request
4. Schema handles operation
5. Drizzle ORM executes database queries
6. Data returns through the same path

## Key Features

- Type-safe end-to-end development with TypeScript
- Modern data fetching with GraphQL
- Efficient database access via Drizzle ORM
- Server-side rendering with Next.js
- Built-in API routing
- Efficient caching with URQL

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

[Add development guidelines here]

## Deployment

[Add deployment instructions here]

## Contributing

[Add contribution guidelines here]

## License

[Add license information here]
# parallel-app
