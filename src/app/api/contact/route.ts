import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

const MAX_BODY_BYTES = 20_000;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
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

  return json({ ok: true }, 200);
}
