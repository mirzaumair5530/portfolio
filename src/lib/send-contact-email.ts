import { Resend } from "resend";
import type { ContactInput } from "@/lib/contact-schema";

// Header values must stay on one line.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/** True when the env vars needed to send mail are set. */
export function isContactConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

/**
 * Sends the message to CONTACT_TO_EMAIL. The destination only ever lives in
 * the environment, never in the page or in a response.
 */
export async function sendContactEmail(input: ContactInput) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL as string;
  // Resend's shared sender works while testing; set CONTACT_FROM_EMAIL to an
  // address on a verified domain for real use.
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const subject = input.subject
    ? oneLine(input.subject)
    : `New message from ${oneLine(input.name)}`;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `[Portfolio] ${subject}`,
    text: [
      `Name: ${oneLine(input.name)}`,
      `Email: ${input.email}`,
      "",
      input.message,
    ].join("\n"),
  });

  if (error) throw new Error(error.message);
}
