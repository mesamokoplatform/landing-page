import type { ReactNode } from "react";
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label-sans text-[12px] text-ink/70 mb-4">{children}</p>;
}
