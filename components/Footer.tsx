import { social } from "@/lib/content";
import { asset } from "@/lib/asset";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Mobile (Figma): social links right-aligned + stacked on top, MESA MOKO
          wordmark at the bottom-left. Desktop: wordmark left, links right in a
          row. `order-*` flips the two so the wordmark sits last on mobile,
          first on desktop. */}
      <div className="mx-auto flex flex-col gap-10 px-6 py-14 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:max-w-[1440px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/logo-white.png")}
          alt="Mesa Moko"
          className="h-7 w-auto shrink-0 self-start order-2 md:order-1 md:self-auto"
        />
        <nav className="flex flex-col items-end gap-4 order-1 md:order-2 md:flex-row md:flex-wrap md:items-center md:gap-8">
          {social.map((s) => {
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.label}
                href={s.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="label-sans inline-flex items-center gap-2 text-[14px]"
              >
                {s.label} <span aria-hidden="true">&#8594;</span>
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
