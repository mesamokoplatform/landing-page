import { social } from "@/lib/content";
import { asset } from "@/lib/asset";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Mobile (Figma): social links right-aligned + stacked on top, a full-width
          hairline divider, then the MESA MOKO wordmark bottom-left. Desktop:
          wordmark left, links right in a row (no divider). `order-*` reorders the
          three so the wordmark sits last on mobile, first on desktop. Horizontal
          insets live on the items (not the container) so the divider can run
          edge-to-edge like Figma's full-width footer rule. */}
      <div className="mx-auto flex flex-col gap-10 py-14 md:flex-row md:items-center md:justify-between md:gap-8 md:max-w-[1440px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/logo-white.png")}
          alt="Mesa Moko"
          className="ml-6 h-7 w-auto shrink-0 self-start order-3 md:order-1 md:ml-10 md:self-auto"
        />
        {/* Figma "Vector 9": full-width 0.75px white rule above the wordmark (mobile only). */}
        <div aria-hidden="true" className="order-2 self-stretch border-t-[0.75px] border-solid border-white md:hidden" />
        <nav className="mr-6 flex flex-col items-end gap-4 order-1 md:order-2 md:mr-10 md:flex-row md:flex-wrap md:items-center md:gap-8">
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
