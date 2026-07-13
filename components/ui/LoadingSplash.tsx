"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Deterministic intro capped under 2s: the monogram fades in on white, holds,
// then the whole splash fades out. Matches the Figma loader (a plain white
// screen with the faint diamond MM monogram — no bar, no wordmark).
const HOLD_MS = 1550;
const FADE_MS = 300;

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
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-white transition-opacity duration-300 ease-out ${
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
        className="h-[190px] w-auto opacity-20 motion-safe:animate-[mmFadeIn_600ms_ease-out] sm:h-[216px]"
      />
    </div>
  );
}
