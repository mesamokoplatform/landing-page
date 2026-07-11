"use client";
import { useEffect, useRef, useState } from "react";
import type { Card } from "@/lib/content";
import { VideoLoop } from "./VideoLoop";
import { asset } from "@/lib/asset";

export function FeatureCard({
  card,
  variant,
  grayscale = false,
  dim = false,
}: {
  card: Card;
  variant: "video" | "image";
  grayscale?: boolean;
  dim?: boolean;
}) {
  // Touch devices have no hover, so the reveal below never fires there. On such
  // devices (no-hover), reveal each card once it scrolls into view instead; on
  // hover-capable devices this stays false and the CSS hover drives everything.
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return; // desktop keeps hover
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); io.disconnect(); } },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reveal: grayscale cards desaturate, dim cards darken; both restore on hover
  // (desktop) or once scrolled into view (touch, via `revealed`). The transition
  // stays in both states so the touch reveal animates rather than snapping.
  const transition = " transition-[filter] duration-500 ease-out";
  const effect = grayscale
    ? revealed
      ? ` grayscale-0${transition}`
      : ` grayscale${transition} group-hover:grayscale-0`
    : dim
      ? revealed
        ? ` brightness-100${transition}`
        : ` brightness-[0.6]${transition} group-hover:brightness-100`
      : "";
  const mediaClass = `absolute inset-0 h-full w-full object-cover${effect}`;
  // Titles may carry explicit "\n" break points; render each part on its own line.
  const titleLines = card.title.split("\n");
  const flatTitle = titleLines.join(" ");
  // Restaurant clips are tall 9:16 portraits; diner dishes are near-square, matching the source.
  const aspect = variant === "video" ? "aspect-[9/16]" : "aspect-[316/323]";
  return (
    <div ref={rootRef} className="group grid grid-rows-subgrid row-span-3 gap-y-0">
      <div
        className={`relative w-full ${aspect} overflow-hidden${
          variant === "video" ? " border border-ink/15" : ""
        }`}
      >
        {variant === "video" ? (
          <VideoLoop src={card.media} className={mediaClass} slowMo={grayscale} revealed={revealed} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(card.media)} alt={flatTitle} className={mediaClass} />
        )}
      </div>
      <h3
        aria-label={titleLines.length > 1 ? flatTitle : undefined}
        className="mt-2.5 text-[26px] leading-tight font-serif font-bold"
      >
        {titleLines.length > 1
          ? titleLines.map((l) => (<span key={l} className="block">{l}</span>))
          : card.title}
      </h3>
      {/* Body starts flush with the image/title left edge; a small right inset preserves Wix's line wrapping. */}
      <p className="mt-[23px] pr-[7px] text-[20px] leading-[28px] text-ink/90 font-serif font-semibold">{card.body}</p>
    </div>
  );
}
