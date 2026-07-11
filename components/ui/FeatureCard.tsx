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
  // devices (no-hover), treat the card nearest the viewport centre as "focused":
  // reveal it while it's in the central band and re-fade it once it scrolls away
  // — the touch analogue of desktop hover, where only the focused card shows
  // colour. On hover-capable devices this stays false and CSS hover drives it.
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return; // desktop keeps hover
    const el = rootRef.current;
    if (!el) return;
    // The negative rootMargin shrinks the observer's viewport to a central band,
    // so a card counts as intersecting only while it's roughly centred; toggle
    // (not one-shot) so it reverts to faded/grayscale when it leaves the band.
    const io = new IntersectionObserver(
      ([e]) => setRevealed(e.isIntersecting),
      { rootMargin: "-30% 0px -30% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reveal: grayscale cards desaturate, dim cards darken; both restore on hover
  // (desktop) or once scrolled into view (touch, via `revealed`). The transition
  // stays in both states so the touch reveal animates rather than snapping.
  // NOTE: keep each class a complete, unbroken literal — writing an arbitrary
  // value like `brightness-[0.6]` immediately before a `${}` interpolation stops
  // Tailwind's scanner from extracting it (the `]${` trips the parser), so the
  // filter classes are spelled out here and the shared transition is appended.
  const filter = grayscale
    ? revealed
      ? "grayscale-0"
      : "grayscale group-hover:grayscale-0"
    : dim
      ? revealed
        ? "brightness-100"
        : "brightness-[0.6] group-hover:brightness-100"
      : "";
  const mediaClass = `absolute inset-0 h-full w-full object-cover${
    filter ? ` ${filter} transition-[filter] duration-500 ease-out` : ""
  }`;
  // Titles may carry explicit "\n" break points; render each part on its own line.
  const titleLines = card.title.split("\n");
  const flatTitle = titleLines.join(" ");
  // Both restaurant clips and diner dishes render in the same near-square box;
  // the portrait video source is cropped to fill it via object-cover.
  const aspect = "aspect-[316/323]";
  return (
    <div ref={rootRef} className="group grid grid-rows-subgrid row-span-3 gap-y-0">
      <div className={`relative w-full ${aspect} overflow-hidden`}>
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
