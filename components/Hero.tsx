import { hero, nav } from "@/lib/content";
import { VideoLoop } from "./ui/VideoLoop";
import { ArrowButton } from "./ui/ArrowButton";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[88vh] w-full overflow-hidden">
      <VideoLoop src="/video/hero.mp4" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-center px-6 md:px-10">
        <h1 className="max-w-[16ch] font-serif text-white text-[44px] leading-[1.05] md:text-[64px]">
          {hero.title}
        </h1>
        <div className="mt-6 space-y-1 font-serif text-white/90 text-[20px] md:text-[24px]">
          {hero.lines.map((l) => (<p key={l}>{l}</p>))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ArrowButton href={nav[0].href} variant="filled" className="!border-white bg-white/10 text-white hover:bg-white hover:text-ink">For Restaurants</ArrowButton>
          <ArrowButton href={nav[1].href} variant="outline" className="!border-white text-white hover:bg-white hover:text-ink">For Diners</ArrowButton>
        </div>
      </div>
    </section>
  );
}
