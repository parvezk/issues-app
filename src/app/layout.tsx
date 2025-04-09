"use client";
import { useState, useEffect } from "react";

import Providers from "./providers";

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <body>{isClient ? <Providers>{children}</Providers> : <></>}</body>
    </html>
  );
}
