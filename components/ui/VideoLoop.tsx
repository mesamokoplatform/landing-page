"use client";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

export function VideoLoop({ src, className = "" }: { src: string; className?: string }) {
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
