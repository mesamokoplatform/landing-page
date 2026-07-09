import { nav } from "@/lib/content";
import { ArrowButton } from "./ui/ArrowButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/10">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-serif text-2xl font-bold tracking-[0.06em]">Mesa Moko</a>
        <nav className="flex items-center gap-3">
          <ArrowButton href={nav[0].href} variant="filled">For Restaurants</ArrowButton>
          <ArrowButton href={nav[1].href} variant="outline">For Diners</ArrowButton>
        </nav>
      </div>
    </header>
  );
}
