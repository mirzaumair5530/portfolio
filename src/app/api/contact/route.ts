import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { allowRequest } from "@/lib/rate-limit";
import { clientIp, json, readJson } from "@/lib/request";
import {
  isContactConfigured,
  sendContactEmail,
} from "@/lib/send-contact-email";

export async function POST(request: Request) {
  if (!allowRequest(`contact:${clientIp(request)}`)) {
    return json({ error: "Too many messages. Please try again later." }, 429);
  }

  const body = await readJson(request, 20_000);
  if ("error" in body) return body.error;

  const parsed = contactSchema.safeParse(body.data);
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

  if (!isContactConfigured()) {
    return json(
      {
        error:
          "The contact form is not available right now. Please email me directly.",
      },
      503,
    );
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    // Log the reason server-side only; never echo provider details back.
    console.error(
      "Contact email failed:",
      error instanceof Error ? error.message : error,
    );
    return json(
      { error: "Could not send your message. Please try again." },
      502,
    );
  }

  return json({ ok: true }, 200);
}
