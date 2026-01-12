# Product Overview

Parallel App is a full-stack issue tracking application built with Next.js. It provides CRUD operations for managing issues with status tracking (BACKLOG, TODO, IN_PROGRESS, DONE).

## Core Features

- User authentication (signup/signin with JWT)
- Issue creation, updating, and deletion
- Issue status management with dropdown selection
- User-specific issue filtering
- Real-time GraphQL data fetching with URQL client

## Architecture

The app follows a modern full-stack architecture:

- Client-side rendering with Next.js App Router
- GraphQL API layer for type-safe data operations
- URQL for efficient client-side data fetching and caching
- Drizzle ORM for database operations
- TursoDB/SQLite for data persistence

## Data Flow

Browser UI → URQL Client → GraphQL API → Drizzle ORM → TursoDB/SQLite
