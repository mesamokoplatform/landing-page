"use client";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

// Playback rate while not hovered (slow-motion); restored to 1x on hover.
const SLOW_RATE = 0.5;

export function VideoLoop({
  src,
  className = "",
  slowMo = false,
  revealed = false,
}: {
  src: string;
  className?: string;
  slowMo?: boolean;
  // Touch-device reveal (card scrolled into view): force full speed, since the
  // hover events below never fire without a pointer.
  revealed?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Some browsers ignore the `muted` attribute in JSX and gate autoplay behind a
  // gesture — enforce muted and kick off playback imperatively so the loop starts.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.volume = 0;
    // Some browsers expose native controls (PiP / media session) that can unmute.
    // Re-clamp on any volume change so audio can never be turned on.
    const forceMute = () => {
      if (!v.muted || v.volume !== 0) {
        v.muted = true;
        v.volume = 0;
      }
    };
    v.addEventListener("volumechange", forceMute);
    const play = () => {
      try {
        // play() returns a promise in modern browsers, undefined in older ones.
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch {
        /* autoplay blocked or unsupported — ignore */
      }
    };
    play();
    // Retry once the frame is decodable, in case the first attempt was too early.
    v.addEventListener("canplay", play, { once: true });
    return () => {
      v.removeEventListener("canplay", play);
      v.removeEventListener("volumechange", forceMute);
    };
  }, []);

  // Slow-motion until hovered: run at SLOW_RATE by default and restore to 1x
  // while the surrounding card (the same `.group` that reveals colour) is hovered.
  useEffect(() => {
    const v = ref.current;
    if (!v || !slowMo) return;
    // Touch reveal: run at full speed and skip the hover wiring entirely.
    if (revealed) {
      v.playbackRate = 1;
      return;
    }
    const slow = () => {
      v.playbackRate = SLOW_RATE;
    };
    const normal = () => {
      v.playbackRate = 1;
    };
    slow();
    // playbackRate can reset to 1 when the media (re)loads — re-apply.
    v.addEventListener("loadedmetadata", slow);
    // Tie speed to the same hover target as the colour reveal.
    const card = (v.closest(".group") as HTMLElement | null) ?? v;
    card.addEventListener("mouseenter", normal);
    card.addEventListener("mouseleave", slow);
    return () => {
      v.removeEventListener("loadedmetadata", slow);
      card.removeEventListener("mouseenter", normal);
      card.removeEventListener("mouseleave", slow);
    };
  }, [slowMo, revealed]);

  return (
    <video
      ref={ref}
      src={asset(src)}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      controls={false}
      disableRemotePlayback
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
