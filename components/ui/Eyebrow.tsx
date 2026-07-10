import type { ReactNode } from "react";
export function Eyebrow({ children }: { children: ReactNode }) {
  // Syne label styling without label-sans' 0.25em tracking (buttons/nav keep that).
  return <p className="font-sans font-bold uppercase text-[12px] text-ink/70 mb-4">{children}</p>;
}
