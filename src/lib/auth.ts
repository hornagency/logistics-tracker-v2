import { createHmac, timingSafeEqual } from "crypto";

export const COOKIE_NAME = "csl_session";
const SESSION_MS = 8 * 60 * 60 * 1000; // 8 hours

function secret(): string {
  return process.env.ADMIN_SECRET ?? "dev-secret-change-in-production";
}

/** Sign a session token for the given username. */
export function signSession(username: string): string {
  const expires = Date.now() + SESSION_MS;
  const payload = `${username}:${expires}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64");
}

/** Returns true if the token has a valid HMAC and has not expired. */
export function verifySession(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const lastColon = decoded.lastIndexOf(":");
    const payload = decoded.slice(0, lastColon);
    const sigHex = decoded.slice(lastColon + 1);

    const expected = createHmac("sha256", secret()).update(payload).digest("hex");
    if (sigHex.length !== expected.length) return false;
    const valid = timingSafeEqual(Buffer.from(sigHex, "hex"), Buffer.from(expected, "hex"));
    if (!valid) return false;

    const parts = payload.split(":");
    const expires = parseInt(parts[parts.length - 1], 10);
    return Date.now() <= expires;
  } catch {
    return false;
  }
}

/** Constant-time credential comparison. */
export function verifyCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME ?? "admin";
  const adminPass = process.env.ADMIN_PASSWORD ?? "CrystalSky2025!";
  try {
    const uOk =
      username.length === adminUser.length &&
      timingSafeEqual(Buffer.from(username), Buffer.from(adminUser));
    const pOk =
      password.length === adminPass.length &&
      timingSafeEqual(Buffer.from(password), Buffer.from(adminPass));
    return uOk && pOk;
  } catch {
    return false;
  }
}

/** Build the Set-Cookie header string for the session token. */
export function buildSessionCookie(token: string, maxAge = SESSION_MS / 1000): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`;
}

/** Build a cookie header that immediately clears the session. */
export function clearSessionCookie(): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secure}`;
}

/**
 * Warn loudly at startup if the app is running in production with the
 * default dev secret. A forged session token would be trivial with this.
 */
export function assertProductionSecrets(): void {
  if (process.env.NODE_ENV !== "production") return;
  const devSecret = "dev-secret-change-in-production";
  if (!process.env.ADMIN_SECRET || process.env.ADMIN_SECRET === devSecret) {
    throw new Error(
      "[Crystal Sky] ADMIN_SECRET is not set or uses the default dev value. " +
        "Set a strong random secret before deploying: openssl rand -hex 32"
    );
  }
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    throw new Error(
      "[Crystal Sky] ADMIN_USERNAME and ADMIN_PASSWORD must be set in production."
    );
  }
}
