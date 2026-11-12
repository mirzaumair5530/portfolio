import { allowRequest } from "@/lib/rate-limit";
import { clientIp, json, readJson } from "@/lib/request";
import {
  isContactConfigured,
  sendSubscribeEmail,
} from "@/lib/send-contact-email";
import { subscribeSchema } from "@/lib/subscribe-schema";

// There is no mailing-list service yet: a subscription is an email to
// CONTACT_TO_EMAIL with the new address, to be added to a list by hand.
export async function POST(request: Request) {
  if (!allowRequest(`subscribe:${clientIp(request)}`)) {
    return json({ error: "Too many requests. Please try again later." }, 429);
  }

  const body = await readJson(request, 2_000);
  if ("error" in body) return body.error;

  const parsed = subscribeSchema.safeParse(body.data);
  if (!parsed.success) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  // Honeypot: answer as if it worked, send nothing.
  if (parsed.data.website) {
    return json({ ok: true }, 200);
  }

  if (!isContactConfigured()) {
    return json(
      { error: "Subscribing is not available right now. The RSS feed is." },
      503,
    );
  }

  try {
    await sendSubscribeEmail(parsed.data.email);
  } catch (error) {
    console.error(
      "Subscribe email failed:",
      error instanceof Error ? error.message : error,
    );
    return json({ error: "Could not subscribe you. Please try again." }, 502);
  }

  return json({ ok: true }, 200);
}
