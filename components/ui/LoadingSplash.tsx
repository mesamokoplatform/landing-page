"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Matches the Figma loader (two-stage reveal): on a plain white screen the logo
// fades in grayscale, then the monogram darkens to black while the wordmark
// settles; it holds briefly, then the whole splash dissolves to reveal the page.
// Deliberately unhurried — the earlier 1200ms/1800ms timing read as "too swift".
//
// Timing budget (all values also live in the animate-[…] classes / globals.css
// keyframes below — keep them in sync when retiming):
//   reveal   = 2200ms  (mmMonoReveal; the wordmark slides 620ms→1620ms finish
//                       earlier, so the monogram reveal is what gates the hold)
//   hold     =  600ms  (dwell on the fully-black state before dissolving)
//   HOLD_MS  = 2800ms  = reveal + hold — when the dissolve starts
//   FADE_MS  =  600ms  = the dissolve length; MUST equal the container's
//                       `transition-opacity duration-[600ms]` so `setGone` fires
//                       exactly when the opacity transition ends, not before/after.
const HOLD_MS = 2800;
const FADE_MS = 600;

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
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-white transition-opacity duration-[600ms] ease-out ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Diamond MM monogram + "MESA MOKO" wordmark (Figma loader), all
          white-background JPEGs that blend seamlessly on white. The monogram
          fades in grayscale then darkens to black; the wordmark is split into
          two halves so "MESA" slides in from the left and "MOKO" from the right,
          converging and settling dark (the logotype ink). Each mark's base state is
          its final resting value, so the logo stays visible even if the
          animation is throttled (backgrounded tab). */}
      <div className="flex flex-col items-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/monogram.jpg")}
          alt=""
          className="h-[190px] w-auto opacity-100 motion-safe:animate-[mmMonoReveal_2200ms_ease-in-out] sm:h-[216px]"
        />
        {/* Two halves sit flush (the split preserved the inter-word space) and
            slide in from opposite sides to form "MESA MOKO". */}
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/logo-mesa.jpg")}
            alt=""
            className="h-[18px] w-auto opacity-100 motion-safe:animate-[mmMesaSlide_1000ms_ease-out_620ms_backwards] sm:h-[21px]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/logo-moko.jpg")}
            alt="Mesa Moko"
            className="h-[18px] w-auto opacity-100 motion-safe:animate-[mmMokoSlide_1000ms_ease-out_620ms_backwards] sm:h-[21px]"
          />
        </div>
      </div>
    </div>
  );
}
