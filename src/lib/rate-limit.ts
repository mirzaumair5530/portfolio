// Per-IP rate limit kept in memory. Good enough to stop a script from hammering
// the form; on serverless each instance has its own counter, so it is a speed
// bump, not a guarantee. Swap for a shared store (for example Upstash) if
// abuse ever becomes real.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

/** Returns true if this request is allowed, and records it. */
export function allowRequest(key: string, now: number = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Drop idle keys so the map cannot grow without bound.
  if (hits.size > 1000) {
    for (const [id, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(id);
    }
  }
  return true;
}
