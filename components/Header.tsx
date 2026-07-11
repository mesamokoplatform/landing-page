import { nav } from "@/lib/content";
import { asset } from "@/lib/asset";
import { ArrowButton } from "./ui/ArrowButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/10">
      <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10 md:max-w-[1440px]">
        <a href="#top" aria-label="Mesa Moko">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/logo.jpg")} alt="Mesa Moko" className="h-7 w-auto" />
        </a>
        <nav className="hidden items-center gap-[27px] md:flex">
          <ArrowButton href={nav[0].href} variant="filled">For Restaurants</ArrowButton>
          <ArrowButton href={nav[1].href} variant="outline">For Diners</ArrowButton>
        </nav>
      </div>
    </header>
  );
}
