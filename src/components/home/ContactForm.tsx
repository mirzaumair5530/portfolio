"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<string, string[]>>;

// Fields sit on the surface colour with no border; an invalid field gets an
// outline in the error colour. Inputs are pills; the textarea is a 20 px card.
const fieldBase =
  "bg-surface text-foreground placeholder:text-muted w-full px-6 aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-error";
const inputClass = `${fieldBase} h-12 rounded-full`;
const textareaClass = `${fieldBase} rounded-card h-[140px] resize-y py-4`;

function Field({
  id,
  label,
  errors,
  className,
  children,
}: {
  id: string;
  label: string;
  errors?: string[];
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="type-small text-accent">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(errors?.length),
        "aria-describedby": errors?.length ? errorId : undefined,
      })}
      {errors?.length ? (
        <p id={errorId} className="type-small text-error">
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
      <div role="status" className="flex flex-col items-start gap-4">
        <p className="type-h3 text-accent">Message sent.</p>
        <p className="type-body-l">Thanks for reaching out. I’ll reply soon.</p>
        <Button onClick={() => setStatus("idle")}>Send another</Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative grid gap-5 sm:grid-cols-2"
      aria-label="Contact form"
    >
      <Field id="contact-name" label="Name" errors={fieldErrors.name}>
        {(props) => (
          <input
            {...props}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            required
            className={inputClass}
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
            placeholder="jane@example.com"
            required
            className={inputClass}
          />
        )}
      </Field>
      <Field
        id="contact-service"
        label="Service needed"
        errors={fieldErrors.service}
        className="sm:col-span-2"
      >
        {(props) => (
          <div className="relative">
            <select
              {...props}
              name="service"
              required
              defaultValue=""
              className={cn(inputClass, "cursor-pointer appearance-none pr-12")}
            >
              <option value="" disabled>
                Select…
              </option>
              {site.contactServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2"
            />
          </div>
        )}
      </Field>
      <Field
        id="contact-message"
        label="Message"
        errors={fieldErrors.message}
        className="sm:col-span-2"
      >
        {(props) => (
          <textarea
            {...props}
            name="message"
            placeholder="Tell me about your project…"
            required
            className={textareaClass}
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

      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <Button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className="h-[50px] min-w-[145px]"
        >
          {status === "sending" ? "Sending…" : "Submit"}
        </Button>
        <p
          role="alert"
          className={cn("type-small text-error", !message && "sr-only")}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
