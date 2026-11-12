import { Resend } from "resend";
import type { ContactInput } from "@/lib/contact-schema";

// Header values must stay on one line.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/** True when the env vars needed to send mail are set. */
export function isContactConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

/**
 * Sends one plain-text email to CONTACT_TO_EMAIL. The destination only ever
 * lives in the environment, never in the page or in a response.
 */
async function sendToOwner(message: {
  replyTo: string;
  subject: string;
  text: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL as string;
  // Resend's shared sender works while testing; set CONTACT_FROM_EMAIL to an
  // address on a verified domain for real use.
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: message.replyTo,
    subject: `[Portfolio] ${message.subject}`,
    text: message.text,
  });

  if (error) throw new Error(error.message);
}

/** A message from the contact form. */
export async function sendContactEmail(input: ContactInput) {
  await sendToOwner({
    replyTo: input.email,
    subject: `${oneLine(input.service)}: message from ${oneLine(input.name)}`,
    text: [
      `Name: ${oneLine(input.name)}`,
      `Email: ${input.email}`,
      `Service needed: ${oneLine(input.service)}`,
      "",
      input.message,
    ].join("\n"),
  });
}

/** A new address from the subscribe banner on blog posts. */
export async function sendSubscribeEmail(email: string) {
  await sendToOwner({
    replyTo: email,
    subject: "New blog subscriber",
    text: `${email} asked to be told about new posts.`,
  });
}
