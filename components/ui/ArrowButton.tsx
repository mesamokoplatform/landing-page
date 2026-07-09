import type { ReactNode } from "react";

type Variant = "filled" | "outline";

const base =
  "label-sans inline-flex items-center gap-3 px-4 py-2.5 text-[13px] leading-none border transition-colors duration-200";
const styles: Record<Variant, string> = {
  filled: "bg-ink text-white border-ink hover:bg-transparent hover:text-ink",
  outline: "bg-transparent text-ink border-ink hover:bg-ink hover:text-white",
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
    <>
      <span>{children}</span>
      <span aria-hidden="true">&#8594;</span>
    </>
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
