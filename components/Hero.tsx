import { hero, nav } from "@/lib/content";
import { VideoLoop } from "./ui/VideoLoop";
import { ArrowButton } from "./ui/ArrowButton";

export function Hero() {
  // Split into a fixed 5-word first line and the remainder, so the headline
  // always breaks as "Welcome To The Future Of" / "Smart, Visual Dining."
  const words = hero.title.split(" ");
  const line1 = words.slice(0, 5).join(" ");
  const line2 = words.slice(5).join(" ");
  return (
    <section id="top" className="relative w-full overflow-hidden bg-black text-white">
      {/* Full-bleed background video with a dark scrim for legibility. Hidden on
          mobile, where the Figma hero is a solid-black background (the section's
          bg-black shows through); desktop keeps the video. */}
      <VideoLoop src={hero.media} className="absolute inset-0 hidden h-full w-full object-cover md:block" />
      <div className="absolute inset-0 hidden bg-black/45 md:block" />
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
          {/* Desktop keeps its filled styles; on the solid-black mobile hero both
              buttons become white outlines, matching the Figma. */}
          <ArrowButton href={nav[0].href} variant="filled" className="!bg-white !text-ink !border-white max-md:!bg-transparent max-md:!text-white">For Restaurants</ArrowButton>
          <ArrowButton href={nav[1].href} variant="filled" className="max-md:!bg-transparent max-md:!border-white">For Diners</ArrowButton>
        </div>
      </div>
    </section>
  );
}
