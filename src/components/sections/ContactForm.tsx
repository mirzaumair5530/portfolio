"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<string, string[]>>;

const fieldClass =
  "border-border bg-background/40 text-foreground placeholder:text-muted w-full rounded-xl border px-4 py-3 text-sm aria-[invalid=true]:border-red-400";

function Field({
  id,
  label,
  errors,
  children,
}: {
  id: string;
  label: string;
  errors?: string[];
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-muted text-xs">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(errors?.length),
        "aria-describedby": errors?.length ? errorId : undefined,
      })}
      {errors?.length ? (
        <p id={errorId} className="text-xs text-red-500 dark:text-red-300">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    // Same schema as the server, so people get instant feedback.
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errors = z.flattenError(parsed.error).fieldErrors;
      setFieldErrors(errors);
      setStatus("idle");
      setMessage("");
      // Move focus to the first field that needs attention.
      const first = Object.keys(errors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setFieldErrors({});
    setMessage("");
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        fields?: FieldErrors;
      };

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (result.fields) setFieldErrors(result.fields);
      setMessage(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("Could not reach the server. Check your connection.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <p className="font-heading text-foreground text-2xl font-bold">
          Message sent.
        </p>
        <p className="text-muted">Thanks for reaching out. I’ll reply soon.</p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Contact form"
    >
      <Field id="contact-name" label="Name" errors={fieldErrors.name}>
        {(props) => (
          <input
            {...props}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClass}
          />
        )}
      </Field>
      <Field id="contact-email" label="Email" errors={fieldErrors.email}>
        {(props) => (
          <input
            {...props}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        )}
      </Field>
      <Field
        id="contact-subject"
        label="Subject (optional)"
        errors={fieldErrors.subject}
      >
        {(props) => (
          <input {...props} name="subject" type="text" className={fieldClass} />
        )}
      </Field>
      <Field id="contact-message" label="Message" errors={fieldErrors.message}>
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={5}
            required
            className={fieldClass}
          />
        )}
      </Field>

      {/* Honeypot: people never see or reach it, so only bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full"
        aria-busy={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>

      <p
        role="alert"
        className={cn(
          "text-center text-sm text-red-500 dark:text-red-300",
          !message && "sr-only",
        )}
      >
        {message}
      </p>
    </form>
  );
}
