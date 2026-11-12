"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { subscribeSchema } from "@/lib/subscribe-schema";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error";

// Accent banner at the end of a post. It posts to /api/subscribe, which emails
// the address to the site owner.
export function SubscribeBanner() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const parsed = subscribeSchema.safeParse(
      Object.fromEntries(new FormData(form)),
    );
    if (!parsed.success) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      form.querySelector<HTMLElement>('[name="email"]')?.focus();
      return;
    }

    setMessage("");
    setStatus("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      setMessage(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("Could not reach the server. Check your connection.");
      setStatus("error");
    }
  }

  return (
    <aside className="bg-accent text-on-accent rounded-card mt-16 grid items-center gap-8 p-10 tablet:grid-cols-2">
      <div className="flex flex-col gap-3">
        <h2 className="type-h3">Like what you see? There’s more.</h2>
        <p className="type-small">
          Leave your email and I’ll tell you when a new post is out. No spam.
        </p>
      </div>

      {status === "success" ? (
        <p role="status" className="type-body-l font-semibold!">
          Thanks. You’re on the list.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          aria-label="Subscribe"
          className="relative flex flex-col gap-3"
        >
          <label htmlFor="subscribe-email" className="sr-only">
            Email
          </label>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Your email"
            aria-invalid={status === "error"}
            aria-describedby={message ? "subscribe-message" : undefined}
            className="h-12 w-full rounded-full bg-white px-6 text-[#303030] placeholder:text-[#707070]"
          />
          {/* Honeypot: people never see or reach it. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label htmlFor="subscribe-website">Website</label>
            <input
              id="subscribe-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <Button
            type="submit"
            variant="dark"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className="hover:text-surface-dark! hover:bg-white!"
          >
            {status === "sending" ? "Subscribing…" : "Subscribe"}
          </Button>
          <p
            id="subscribe-message"
            role="alert"
            className={cn("type-small font-semibold!", !message && "sr-only")}
          >
            {message}
          </p>
        </form>
      )}
    </aside>
  );
}
