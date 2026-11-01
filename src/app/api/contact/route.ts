import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { allowRequest } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 20_000;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

function clientIp(request: Request) {
  // Vercel puts the real client first in x-forwarded-for.
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || "unknown";
}

export async function POST(request: Request) {
  if (!allowRequest(clientIp(request))) {
    return json({ error: "Too many messages. Please try again later." }, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ error: "Message too large." }, 413);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return json(
      {
        error: "Please check the form.",
        fields: z.flattenError(parsed.error).fieldErrors,
      },
      400,
    );
  }

  // Honeypot: real visitors never see this field. Pretend it worked so a bot
  // gets no signal to adapt to, but send nothing.
  if (parsed.data.website) {
    return json({ ok: true }, 200);
  }

  return json({ ok: true }, 200);
}
