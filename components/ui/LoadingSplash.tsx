"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Matches the Figma loader: a plain white screen where the diamond MM monogram
// slowly, gradually fades in (~1.5s) to a faint grey, holds briefly, then the
// whole splash dissolves to reveal the page. No bar, no wordmark.
// HOLD_MS covers the full fade-in (1500ms) plus a short hold before the exit.
const HOLD_MS = 1850;
const FADE_MS = 450;

// Full-screen monogram shown on every page load while the page settles.
// Rendered in the SSR markup so it covers content on first paint, then removes
// itself once the intro has played.
export function LoadingSplash() {
  const [gone, setGone] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let fadeTimer = 0;
    const holdTimer = window.setTimeout(() => {
      setHiding(true);
      fadeTimer = window.setTimeout(() => setGone(true), FADE_MS);
    }, HOLD_MS);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      id="mm-splash"
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-white transition-opacity duration-[450ms] ease-out ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Diamond MM monogram + "MESA MOKO" wordmark (Figma loader), both
          white-background JPEGs that blend seamlessly on white. They fade in
          together over ~1.5s; each keeps its own resting opacity (the monogram
          sits fainter than the wordmark). The wrapper's base opacity is 1 so the
          marks stay visible even if the animation is throttled (backgrounded tab). */}
      <div className="flex flex-col items-center gap-6 opacity-100 motion-safe:animate-[mmFadeIn_1500ms_ease-in-out]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/monogram.jpg")}
          alt=""
          className="h-[190px] w-auto opacity-20 sm:h-[216px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/logo.jpg")}
          alt="Mesa Moko"
          className="w-[150px] max-w-[55vw] opacity-40 sm:w-[168px]"
        />
      </div>
    </div>
  );
}
