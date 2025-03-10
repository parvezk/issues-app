"use client";

import Providers from "./providers";
import GQLProvider from "@/app/gqlProvider";
import "./reset.css";
import "./globals.css";
/**
 * Configures the urql client for making GraphQL requests from the client side.
 * Sets up the GraphQL endpoint and caching strategies.
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GQLProvider>{children}</GQLProvider>
        </Providers>
      </body>
    </html>
  );
}
