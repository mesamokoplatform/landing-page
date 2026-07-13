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
      {/* White-background JPEG of the diamond MM monogram; on the white splash it
          blends seamlessly. Rendered faint to match the Figma loader, with a
          soft CSS fade-in. Base opacity is the resting value so the mark stays
          visible even if the animation is throttled (e.g. a backgrounded tab). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/monogram.jpg")}
        alt=""
        className="h-[190px] w-auto opacity-20 motion-safe:animate-[mmFadeIn_1500ms_ease-in-out] sm:h-[216px]"
      />
    </div>
  );
}
