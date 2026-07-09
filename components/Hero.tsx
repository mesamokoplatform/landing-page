import { hero, nav } from "@/lib/content";
import { VideoLoop } from "./ui/VideoLoop";
import { ArrowButton } from "./ui/ArrowButton";

export function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden bg-ink text-white">
      <div className="mx-auto grid min-h-[88vh] max-w-[1400px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-10">
        <div className="flex flex-col justify-center">
          <h1 className="max-w-[18ch] font-serif text-[44px] leading-[1.08] md:text-[64px]">
            {hero.title}
          </h1>
          <div className="mt-8 space-y-1 font-serif text-white/90 text-[20px] md:text-[24px]">
            {hero.lines.map((l) => (<p key={l}>{l}</p>))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ArrowButton href={nav[0].href} variant="filled" className="!bg-white !text-ink !border-white hover:!bg-transparent hover:!text-white">For Restaurants</ArrowButton>
            <ArrowButton href={nav[1].href} variant="outline" className="!border-white text-white hover:bg-white hover:text-ink">For Diners</ArrowButton>
          </div>
        </div>
        {/* Hero video (placeholder clip until the new hero video is supplied) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-[70vh]">
          <VideoLoop src={hero.media} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
