import { z } from "zod";

// Shared by the subscribe banner (client) and /api/subscribe (server).
export const subscribeSchema = z.object({
  email: z.email("Please enter a valid email address.").max(200),
  // Honeypot: hidden from people, so only bots fill it in.
  website: z.string().max(200).optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
