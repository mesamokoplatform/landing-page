"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  // Fraction of the element that must be visible before it fades in. Defaults
  // to 0.15 for full-width blocks; the mobile carousel passes 0 so a card that's
  // only peeking on the edge (~13% visible, below 0.15) still reveals instead of
  // staying blank until it's scrolled fully into view.
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
