"use client";
import { useState, type FormEvent } from "react";
import { ArrowButton } from "./ArrowButton";

const CTA = { restaurant: "Become a Partner Restaurant", diner: "Join the Waitlist" };
const SUBJECT = {
  restaurant: "New restaurant partner waitlist signup",
  diner: "New diner waitlist signup",
};

export function WaitlistForm({ audience }: { audience: "restaurant" | "diner" }) {
  // Read literally (not via a computed key) so Next's build-time NEXT_PUBLIC_
  // inlining still applies, and so tests can vi.stubEnv() per-test without a
  // module-level const capturing a stale value at import time.
  const key =
    audience === "restaurant"
      ? process.env.NEXT_PUBLIC_WEB3FORMS_KEY_RESTAURANT
      : process.env.NEXT_PUBLIC_WEB3FORMS_KEY_DINER;
  const [email, setEmail] = useState("");
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
          email,
          subject: SUBJECT[audience],
          from_name: "Mesa Moko Website",
          botcheck: "",
        }),
      });
      const data = await res.json();
      setState(res.ok && data.success ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="text-[15px] text-ink">You&apos;re on the list — thank you.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-stretch gap-3">
      <input
        type="email"
        required
        aria-label="Email address"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-[240px] flex-1 border border-ink/40 px-4 py-2.5 text-[15px] outline-none focus:border-ink"
      />
      {/* honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <ArrowButton type="submit" onClick={() => {}} disabled={!key || state === "sending"}>
        {CTA[audience]}
      </ArrowButton>
      {!key && <p className="w-full text-[13px] text-muted">Waitlist not yet configured.</p>}
      {state === "error" && <p className="w-full text-[13px] text-red-700">Something went wrong — please try again.</p>}
    </form>
  );
}
