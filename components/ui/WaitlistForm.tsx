"use client";
import { useEffect, useState, type FormEvent } from "react";
import { asset } from "@/lib/asset";
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
    { name: "restaurant_name", label: "Restaurant Name", required: true, placeholder: "Your Name" },
    { name: "contact_name", label: "Contact Name", required: true, placeholder: "Your Name" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "Your Email" },
    { name: "postcode", label: "Postcode", placeholder: "Your Postcode" },
    { name: "city", label: "City", placeholder: "Your City" },
  ],
  diner: [
    { name: "name", label: "Full Name", required: true, placeholder: "Your Name" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "Your Email" },
    { name: "city", label: "City (Optional)", placeholder: "Your City" },
    { name: "instagram", label: "Instagram (Optional)", placeholder: "Your Instagram" },
    { name: "tiktok", label: "Tik Tok (Optional)", placeholder: "Your Tik Tok" },
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

  // Lock body scroll and allow Escape to close while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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

  // Collapsed: a filled CTA button (matching the section on the Wix site).
  if (!open) {
    return <ArrowButton onClick={() => setOpen(true)}>{CTA[audience]}</ArrowButton>;
  }

  // Open: a centered white card over a dimmed backdrop, with the MM monogram.
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/50"
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-[480px] bg-white px-6 py-10 sm:px-10 sm:py-12">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 text-ink/60 transition-colors hover:text-ink sm:right-8 sm:top-8"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M5 5L19 19M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/monogram.jpg")} alt="Mesa Moko" className="mx-auto h-16 w-auto sm:h-20" />

          {state === "done" ? (
            <p className="mt-14 text-center font-serif text-[22px] text-ink">
              You&apos;re on the list — thank you.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-10 flex max-w-[440px] flex-col gap-5">
              {fields.map((f) => {
                const id = `${audience}-${f.name}`;
                return (
                  <div key={f.name} className="flex flex-col gap-2.5">
                    <label htmlFor={id} className="font-serif text-[15px] text-ink">{f.label}</label>
                    <input
                      id={id}
                      type={f.type ?? "text"}
                      name={f.name}
                      required={f.required}
                      placeholder={f.placeholder ?? f.label}
                      value={values[f.name] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                      className="border-b border-ink/30 bg-transparent pb-2 font-serif text-[17px] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink"
                    />
                  </div>
                );
              })}
              {/* honeypot */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <ArrowButton
                variant="outline"
                type="submit"
                disabled={!key || state === "sending"}
                className="mt-4 w-full justify-center"
              >
                {CTA[audience]}
              </ArrowButton>
              {!key && <p className="text-[13px] text-muted">Waitlist not yet configured.</p>}
              {state === "error" && (
                <p className="text-[13px] text-red-700">Something went wrong — please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
