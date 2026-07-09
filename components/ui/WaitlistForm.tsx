"use client";
import { useState, type FormEvent } from "react";
import { ArrowButton } from "./ArrowButton";

type Field = { name: string; label: string; type?: string; required?: boolean; placeholder?: string };

const CTA = { restaurant: "Become a Partner Restaurant", diner: "Join the Waitlist" };
const SUBJECT = {
  restaurant: "New restaurant partner waitlist signup",
  diner: "New diner waitlist signup",
};

// Restaurant and diner leads capture different information.
const FIELDS: Record<"restaurant" | "diner", Field[]> = {
  restaurant: [
    { name: "contact_name", label: "Contact name", required: true, placeholder: "Your name" },
    { name: "restaurant_name", label: "Restaurant name", required: true, placeholder: "Restaurant name" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
    { name: "phone", label: "Phone", type: "tel", placeholder: "Phone number" },
    { name: "city", label: "City / area", placeholder: "e.g. Shoreditch, London" },
    { name: "postcode", label: "Postcode", placeholder: "Postcode" },
  ],
  diner: [
    { name: "name", label: "Name", required: true, placeholder: "Your name" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
    { name: "city", label: "City / area", placeholder: "Where you're based" },
    { name: "instagram", label: "Instagram", placeholder: "@instagram" },
    { name: "tiktok", label: "TikTok", placeholder: "@tiktok" },
  ],
};

export function WaitlistForm({ audience }: { audience: "restaurant" | "diner" }) {
  // Read literally (not via a computed key) so Next's build-time NEXT_PUBLIC_
  // inlining still applies, and so tests can vi.stubEnv() per-test without a
  // module-level const capturing a stale value at import time.
  const key =
    audience === "restaurant"
      ? process.env.NEXT_PUBLIC_WEB3FORMS_KEY_RESTAURANT
      : process.env.NEXT_PUBLIC_WEB3FORMS_KEY_DINER;
  const fields = FIELDS[audience];
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!key) return;
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: SUBJECT[audience],
          from_name: "Mesa Moko Website",
          botcheck: "",
          ...values,
        }),
      });
      const data = await res.json();
      setState(res.ok && data.success ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  // Match the Wix mockup: a single CTA button that expands into the capture form.
  if (!open) {
    return <ArrowButton onClick={() => setOpen(true)}>{CTA[audience]}</ArrowButton>;
  }

  if (state === "done") {
    return <p className="text-[15px] text-ink">You&apos;re on the list — thank you.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3">
      {fields.map((f) => (
        <input
          key={f.name}
          type={f.type ?? "text"}
          name={f.name}
          required={f.required}
          aria-label={f.label}
          placeholder={f.placeholder ?? f.label}
          value={values[f.name] ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
          className="w-full border border-ink/40 px-4 py-2.5 text-[15px] outline-none focus:border-ink"
        />
      ))}
      {/* honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="mt-1">
        <ArrowButton type="submit" disabled={!key || state === "sending"}>
          {CTA[audience]}
        </ArrowButton>
      </div>
      {!key && <p className="text-[13px] text-muted">Waitlist not yet configured.</p>}
      {state === "error" && <p className="text-[13px] text-red-700">Something went wrong — please try again.</p>}
    </form>
  );
}
