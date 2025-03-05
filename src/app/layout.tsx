"use client";

import { Provider } from "urql";
import urqlClient from "@/lib/urqlClient";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider value={urqlClient}>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
