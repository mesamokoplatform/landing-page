import { hero, nav } from "@/lib/content";
import { VideoLoop } from "./ui/VideoLoop";
import { ArrowButton } from "./ui/ArrowButton";

export function Hero() {
  // Split into a fixed 4-word first line and the remainder, so the headline
  // breaks as "Welcome To The Future" / "Of Smart, Visual Dining." (Figma).
  const words = hero.title.split(" ");
  const line1 = words.slice(0, 4).join(" ");
  const line2 = words.slice(4).join(" ");
  return (
    <section id="top" className="relative w-full overflow-hidden bg-black text-white">
      {/* Full-bleed background video with a dark scrim for legibility, on every
          width (bg-black is the fallback while the video loads). */}
      <VideoLoop src={hero.media} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative mx-auto flex min-h-[92vh] flex-col justify-end px-6 pb-[14vh] pt-28 md:px-10 md:max-w-[1440px]">
        {/* aria-label carries the unbroken sentence; the spans only control line wrapping */}
        <h1 aria-label={hero.title} className="font-serif font-semibold text-[32px] leading-[1.4] sm:text-[40px] md:text-[46px]">
          <span className="block">{line1}</span>
          <span className="block">{line2}</span>
        </h1>
        <div className="mt-8 font-serif font-semibold text-[22px] leading-[1.35] text-white/90">
          {hero.lines.map((l) => (<p key={l}>{l}</p>))}
        </div>
        <div className="mt-12 flex flex-wrap gap-[27px]">
          {/* Figma hero buttons (both mobile and desktop): "For Restaurants" is a
              solid WHITE fill (dark text), "For Diners" is a white outline. */}
          <ArrowButton href={nav[0].href} variant="filled" className="!bg-white !text-ink !border-white">For Restaurants</ArrowButton>
          <ArrowButton href={nav[1].href} variant="filled" className="!bg-transparent !text-white !border-white">For Diners</ArrowButton>
        </div>
      </div>
    </section>
  );
}
