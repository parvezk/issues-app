# Project Structure

## Root Configuration

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript config with path aliases
- `next.config.ts` - Next.js config with CORS headers for GraphQL
- `drizzle.config.ts` - Drizzle ORM configuration
- `jest.config.js` - Jest testing configuration
- `middleware.ts` - Next.js middleware (likely auth)
- `.env*` - Environment variables

## Source Directory (`src/`)

### App Directory (`src/app/`)

Next.js App Router structure with route groups:

#### Route Groups

- `(auth)/` - Authentication routes (signin, signup) with shared layout
- `(dashboard)/` - Protected dashboard routes with sidebar layout
  - `page.tsx` - Main dashboard (issues list)
  - `projects/page.tsx` - Projects view
  - `settings/page.tsx` - Settings view

#### API Routes

- `api/graphql/` - GraphQL endpoint
  - `route.ts` - API route handler
  - `typeDefs.ts` - GraphQL schema definitions
  - `resolvers.ts` - GraphQL resolvers
  - `schema.graphql` - GraphQL schema file

#### Shared Resources

- `components/` - React components (Issue, CreateIssue, Sidebar, TopBar)
  - Co-located `.test.tsx` files for component tests
- `context/` - React contexts (UserContext, UserContextType)
- `providers.tsx` - Provider wrappers
- `gqlProvider.tsx` - URQL client provider
- `layout.tsx` - Root layout
- `globals.css`, `reset.css` - Global styles

### Database (`src/db/`)

- `schema.ts` - Drizzle schema definitions (users, issues tables)
- `db.ts` - Database connection setup

### GraphQL Queries/Mutations (`src/gql/`)

- `ISSUES_QUERY.ts` - Fetch issues
- `CREATE_ISSUE_MUTATION.ts` - Create issue
- `UPDATE_ISSUE_STATUS_MUTATION.ts` - Update status
- `DELETE_ISSUE_MUTATION.ts` - Delete issue
- `SIGNIN_MUTATION.ts` - User signin
- `SIGNUP_MUTATION.ts` - User signup
- `USERS_QUERY.ts` - Fetch users
- `index.ts` - Barrel exports

### Utilities (`src/utils/`)

- `auth.ts` - Authentication helpers
- `token.ts` - JWT token utilities
- `headers.ts` - HTTP header utilities
- `testUtils.tsx` - Testing utilities

### Types (`src/types/`)

- `GQLContext.ts` - GraphQL context types

## Migrations (`migrations/`)

Drizzle ORM migration files with metadata in `meta/` subdirectory.

## Testing

- Component tests co-located with components in `src/app/components/*.test.tsx`
- Test utilities in `src/utils/testUtils.tsx`
- Coverage reports in `coverage/` directory

## Key Patterns

1. **Route Groups**: Use parentheses for layout grouping without affecting URL structure
2. **Co-located Tests**: Test files live next to components
3. **Barrel Exports**: `index.ts` files for clean imports
4. **Path Aliases**: Use `@/` prefix for absolute imports
5. **GraphQL Organization**: Separate files per query/mutation in `src/gql/`
6. **Client Components**: Dashboard uses "use client" directive for interactivity
