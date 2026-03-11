/**
 * Lightweight in-process rate limiter for the Edge runtime.
 *
 * Works well for single-region Vercel Edge Functions where the module is kept
 * warm across requests. For multi-region deployments, replace this with a
 * distributed store (Upstash Redis, Vercel KV, etc.).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, Bucket>();

/**
 * Returns true if the request should be allowed, false if it should be blocked.
 *
 * @param key       - Identifier, e.g. IP address or username
 * @param limit     - Maximum requests allowed per window
 * @param windowMs  - Rolling window duration in milliseconds
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Prune expired buckets to prevent memory leaks on long-running instances
  if (store.size > 1000) {
    for (const [k, v] of store.entries()) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  const bucket = store.get(key);

  if (!bucket || now > bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  bucket.count++;

  if (bucket.count > limit) return false;

  return true;
}
