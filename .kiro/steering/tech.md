# Tech Stack

## Core Technologies

- **Framework**: Next.js 15.1.3 (App Router)
- **Language**: TypeScript 5
- **Runtime**: Node.js (ES2017 target)
- **UI Library**: React 19, NextUI
- **Icons**: Lucide React

## Data Layer

- **API**: GraphQL with Apollo Server
- **Client**: URQL with GraphCache for caching
- **Database**: TursoDB/SQLite
- **ORM**: Drizzle ORM
- **Migrations**: Drizzle Kit

## Authentication

- JWT tokens (jsonwebtoken)
- bcrypt for password hashing
- Middleware-based route protection

## Testing

- **Framework**: Jest 29 with jsdom environment
- **Testing Library**: React Testing Library
- **Coverage**: lcov reports
- **Watch Plugins**: typeahead, select-projects

## Code Quality

- **Linting**: ESLint with Next.js config
- **Git Hooks**: Husky for pre-commit hooks
- **TypeScript**: Strict mode disabled, paths configured with @ aliases

## Common Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Building
npm run build            # Production build
npm start                # Start production server

# Database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio

# Testing
npm test                 # Run tests
npm run test:coverage    # Run with coverage report
npm run test:watch       # Watch mode
npm run test:debug       # Debug mode

# Code Quality
npm run lint             # Run ESLint
```

## Environment Variables

Required in `.env` or `.env.local`:

- `TURSO_CONNECTION_URL` - TursoDB connection string
- `TURSO_AUTH_TOKEN` - TursoDB authentication token
- `NEXT_PUBLIC_GRAPHQL_API_URL` - GraphQL endpoint (defaults to /api/graphql)

## Path Aliases

TypeScript paths configured with @ prefix:

- `@/api/*` → `src/app/api/*`
- `@/app/*` → `src/app/*`
- `@/components/*` → `src/app/components/*`
- `@/context/*` → `src/app/context/*`
- `@/lib/*` → `src/db/*`
- `@/gql/*` → `src/gql/*`
- `@/types/*` → `src/types/*`
- `@/utils/*` → `src/utils/*`
