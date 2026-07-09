import { hero, nav } from "@/lib/content";
import { VideoLoop } from "./ui/VideoLoop";
import { ArrowButton } from "./ui/ArrowButton";

export function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden bg-ink text-white">
      {/* Full-bleed background video with a dark scrim for legibility */}
      <VideoLoop src={hero.media} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-[14vh] pt-28 md:px-10">
        <h1 className="max-w-[16ch] font-serif text-[36px] leading-[1.2] sm:text-[42px] sm:leading-[1.25] md:text-[48px]">
          {hero.title}
        </h1>
        <div className="mt-6 space-y-1 font-serif text-[18px] text-white/90 md:text-[20px]">
          {hero.lines.map((l) => (<p key={l}>{l}</p>))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ArrowButton href={nav[0].href} variant="filled" className="!bg-white !text-ink !border-white hover:!bg-transparent hover:!text-white">For Restaurants</ArrowButton>
          <ArrowButton href={nav[1].href} variant="outline" className="!border-white text-white hover:bg-white hover:text-ink">For Diners</ArrowButton>
        </div>
      </div>
    </section>
  );
}
