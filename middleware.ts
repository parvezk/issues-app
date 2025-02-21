import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Allow all origins for local development
  const allowedOrigin = "*";

  // Define headers for CORS
  const responseHeaders = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle OPTIONS request (Preflight Request)
  if (req.method === "OPTIONS") {
    console.log("[MIDDLEWARE] Handling OPTIONS Preflight Request");
    return new NextResponse(null, { status: 204, headers: responseHeaders });
  }

  // Continue request normally
  const response = NextResponse.next();
  Object.entries(responseHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: "/api/:path*",
};
