import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

const COOKIE_NAME = "csl_session";

function hexToBytes(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes.buffer as ArrayBuffer;
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const decoded = atob(token);
    const lastColon = decoded.lastIndexOf(":");
    const payload = decoded.slice(0, lastColon);
    const sigHex = decoded.slice(lastColon + 1);

    // Check expiry
    const parts = payload.split(":");
    const expires = parseInt(parts[parts.length - 1], 10);
    if (Date.now() > expires) return false;

    // Verify HMAC-SHA256
    const secretStr = process.env.ADMIN_SECRET ?? "dev-secret-change-in-production";
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secretStr),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    return await crypto.subtle.verify("HMAC", key, hexToBytes(sigHex), enc.encode(payload));
  } catch {
    return false;
  }
}

/** Best-effort IP extraction from standard Vercel / Cloudflare headers. */
function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Rate limiting ──────────────────────────────────────────────────────────
  // Login endpoint: 10 attempts per 15 minutes per IP
  if (pathname === "/api/admin/auth/login" && request.method === "POST") {
    const ip = getIp(request);
    if (!checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 15 minutes and try again." },
        { status: 429 }
      );
    }
  }

  // Public tracking API: 60 lookups per minute per IP
  if (pathname.startsWith("/api/track/")) {
    const ip = getIp(request);
    if (!checkRateLimit(`track:${ip}`, 60, 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }
  }

  // ── Auth guard for admin routes ────────────────────────────────────────────
  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isAdminApi  = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth");

  if (isAdminPage || isAdminApi) {
    const session = request.cookies.get(COOKIE_NAME);

    if (!session?.value || !(await verifyToken(session.value))) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/track/:path*",
  ],
};
