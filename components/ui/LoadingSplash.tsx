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
  // Starts at scaleX(0); flipped to 1 on the next frame so the CSS transition
  // animates the fill left-to-right. Driven by inline transform (not Tailwind's
  // `scale-x-*`, which sets the independent `scale` property and would pin the
  // bar to zero width regardless of the transition).
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let fadeTimer = 0;
    const raf = requestAnimationFrame(() => {
      if (!cancelled) setFilled(true);
    });
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
      cancelAnimationFrame(raf);
      clearTimeout(barTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      id="mm-splash"
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-[#f6f4ef] transition-opacity duration-300 ease-out ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* White-background JPEG blended into the cream via multiply. Sized to
          match the mesamoko.com splash monogram (~216px). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/monogram.jpg")}
        alt=""
        className="h-[180px] w-auto mix-blend-multiply motion-safe:animate-[mmSplashIn_500ms_ease-out] sm:h-[216px]"
      />
      {/* Loading bar: fills left-to-right over BAR_MS, then the splash fades.
          Dimensions match the mesamoko.com splash bar (13px × 357px, 80vw cap). */}
      <div className="h-[13px] w-[357px] max-w-[80vw] overflow-hidden bg-ink/15">
        <div
          className="h-full w-full origin-left bg-ink transition-transform ease-in-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${filled ? 1 : 0})`, transitionDuration: `${BAR_MS}ms` }}
        />
      </div>
      <span className="font-serif font-semibold text-[26px] uppercase tracking-[0.22em] text-ink/50 sm:text-[30px]">
        Mesa Moko
      </span>
    </div>
  );
}
