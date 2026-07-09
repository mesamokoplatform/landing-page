"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Deterministic intro capped under 2s: the bar fills, then a short fade.
const BAR_MS = 1550;
const FADE_MS = 300;

// Full-screen monogram + loading bar + wordmark shown on every page load while
// the page settles. Rendered in the SSR markup so it covers content on first
// paint, then removes itself once the bar has filled.
export function LoadingSplash() {
  const [gone, setGone] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let fadeTimer = 0;
    const barTimer = window.setTimeout(() => {
      if (cancelled) return;
      setHiding(true);
      fadeTimer = window.setTimeout(() => {
        if (cancelled) return;
        setGone(true);
      }, FADE_MS);
    }, BAR_MS);
    return () => {
      cancelled = true;
      clearTimeout(barTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      id="mm-splash"
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-7 bg-[#f6f4ef] transition-opacity duration-300 ease-out ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* White-background JPEG blended into the cream via multiply. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/monogram.jpg")}
        alt=""
        className="h-24 w-auto mix-blend-multiply motion-safe:animate-[mmSplashIn_500ms_ease-out] sm:h-28"
      />
      {/* Loading bar: fills left-to-right over BAR_MS, then the splash fades. */}
      <div className="h-0.5 w-44 overflow-hidden bg-ink/15">
        <div className="h-full w-full origin-left scale-x-0 bg-ink motion-safe:animate-[mmLoadBar_1550ms_ease-in-out_forwards] motion-reduce:scale-x-100" />
      </div>
      <span className="font-serif text-[22px] uppercase tracking-[0.22em] text-ink/50 sm:text-[26px]">
        Mesa Moko
      </span>
    </div>
  );
}
