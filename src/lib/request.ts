// Small helpers shared by the API routes.

export function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

export function clientIp(request: Request) {
  // Vercel puts the real client first in x-forwarded-for.
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || "unknown";
}

/**
 * Reads a JSON body of at most `maxBytes`. Returns the parsed value, or a
 * ready-made error response to send back.
 */
export async function readJson(
  request: Request,
  maxBytes: number,
): Promise<{ data: unknown } | { error: Response }> {
  const raw = await request.text();
  if (raw.length > maxBytes) {
    return { error: json({ error: "Request too large." }, 413) };
  }
  try {
    return { data: JSON.parse(raw) };
  } catch {
    return { error: json({ error: "Invalid request." }, 400) };
  }
}
