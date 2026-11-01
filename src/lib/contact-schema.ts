import { z } from "zod";

// Shared by the form (client) and /api/contact (server), so both agree.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  subject: z.string().trim().max(150).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(5000, "Please keep the message under 5000 characters."),
  // Honeypot: hidden from people, so only bots fill it in.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
