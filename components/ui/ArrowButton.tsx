import type { ReactNode } from "react";

type Variant = "filled" | "outline";

// Desktop uses the shared label-sans (14px / 0.25em tracking / 700). The Figma
// mobile CTA style is smaller and untracked (Syne 12px / 0 tracking / 600) — so
// e.g. "Become a Partner Restaurant" stays on one line instead of wrapping.
// label-sans is unlayered CSS and beats Tailwind utilities, hence the `!`.
// Horizontal padding matches the Figma inset (desktop px-4, mobile 8px per the
// mobile CTA component); vertical stays 6px. Was px-1 (4px) — too tight E/W.
const base =
  "group label-sans inline-flex items-center gap-3 px-4 py-1.5 text-[14px] leading-none border-[0.5px] max-md:!text-[12px] max-md:!font-semibold max-md:!tracking-normal max-md:px-2";
// The CTA colour is driven by the --color-cta token (see globals.css) so it can
// be revised brand-wide in one place; the hero buttons override to white via
// per-instance classes since they sit on the dark hero video.
const styles: Record<Variant, string> = {
  filled: "bg-cta text-white border-cta",
  outline: "bg-transparent text-cta border-cta",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function ArrowButton({
  children,
  href,
  variant = "filled",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  const inner = (
    // Scale the content (text + arrow) on hover; a transform doesn't reflow, so
    // the bordered box keeps its size while the label and arrow zoom together.
    <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:scale-[1.02]">
      <span>{children}</span>
      {/* Thin, elongated line-arrow; inherits currentColor for hover swaps */}
      <svg
        aria-hidden="true"
        viewBox="0 0 40 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-2.5 w-10 shrink-0 max-md:h-[5px] max-md:w-5"
      >
        <path d="M0 5h38M33 1l5 4-5 4" />
      </svg>
    </span>
  );
  if (href) {
    const linkCls = disabled ? `${cls} pointer-events-none opacity-50` : cls;
    return (
      <a href={href} className={linkCls} onClick={onClick} aria-disabled={disabled}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
