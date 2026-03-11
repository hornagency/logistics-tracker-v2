import { NextResponse } from "next/server";
import { verifyCredentials, signSession, buildSessionCookie, assertProductionSecrets } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    assertProductionSecrets();
    const { username, password } = await request.json();

    if (!username?.trim() || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    if (!verifyCredentials(username.trim(), password)) {
      // Uniform delay to prevent user enumeration timing attacks
      await new Promise((r) => setTimeout(r, 400));
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signSession(username.trim());
    const cookie = buildSessionCookie(token);

    return NextResponse.json(
      { ok: true },
      { headers: { "Set-Cookie": cookie } }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
