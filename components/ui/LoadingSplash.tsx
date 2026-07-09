"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Minimum time the monogram stays up so it reads as intentional, not a flash.
const MIN_DISPLAY_MS = 1200;
// Fade-out duration; keep in sync with the `duration-500` class below.
const FADE_MS = 500;
const SEEN_KEY = "mm-splash-seen";

// Full-screen monogram shown once per browser session while the page settles.
// Rendered in the SSR markup so it covers content on first paint; an inline
// <head> script (see layout) adds `splash-seen` to <html> to skip it instantly
// on repeat visits this session, avoiding a flash.
export function LoadingSplash() {
  const [gone, setGone] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Repeat visit this session: the inline head script + CSS already hide the
    // overlay instantly, so there's nothing to animate or dismiss.
    if (document.documentElement.classList.contains("splash-seen")) return;
    let cancelled = false;
    const start = performance.now();
    const dismiss = () => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_DISPLAY_MS - (performance.now() - start));
      window.setTimeout(() => {
        if (cancelled) return;
        setHiding(true);
        window.setTimeout(() => {
          if (cancelled) return;
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {
            /* storage unavailable — still dismiss */
          }
          document.documentElement.classList.add("splash-seen");
          setGone(true);
        }, FADE_MS);
      }, wait);
    };
    // Dismiss once fonts have loaded (content is styled), with a load fallback.
    if (document.fonts?.ready) {
      document.fonts.ready.then(dismiss).catch(dismiss);
    } else {
      dismiss();
    }
    return () => {
      cancelled = true;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      id="mm-splash"
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#f6f4ef] transition-opacity duration-500 ease-out ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* White-background JPEG blended into the cream via multiply. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/monogram.jpg")}
        alt=""
        className="h-24 w-auto mix-blend-multiply motion-safe:animate-[mmSplashIn_600ms_ease-out] sm:h-28"
      />
    </div>
  );
}
