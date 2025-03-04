import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // Explicitly set environment variables
    TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    NEXT_PUBLIC_GRAPHQL_API_URL:
      process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "/api/graphql",
  },
  async headers() {
    return [
      {
        source: "/api/graphql",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://studio.apollographql.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: "/api/graphql",
      },
    ];
  },
};

export default nextConfig;
