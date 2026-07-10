import type { ReactNode } from "react";

type Variant = "filled" | "outline";

const base =
  "group label-sans inline-flex items-center gap-3 px-1 py-1.5 text-[14px] leading-none border-[0.5px]";
const styles: Record<Variant, string> = {
  filled: "bg-black text-white border-black",
  outline: "bg-transparent text-ink border-black",
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
        className="h-2.5 w-10 shrink-0"
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
