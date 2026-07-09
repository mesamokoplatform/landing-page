import { social } from "@/lib/content";
import { asset } from "@/lib/asset";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/images/logo-white.png")} alt="Mesa Moko" className="h-10 w-auto" />
        <nav className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
          {social.map((s) => {
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.label}
                href={s.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="label-sans inline-flex items-center gap-2 text-[13px]"
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
