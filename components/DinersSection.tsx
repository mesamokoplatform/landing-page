import { diners } from "@/lib/content";
import { Eyebrow } from "./ui/Eyebrow";
import { FeatureCard } from "./ui/FeatureCard";
import { Reveal } from "./ui/Reveal";
import { WaitlistForm } from "./ui/WaitlistForm";

export function DinersSection() {
  return (
    <section id="diners" className="mx-auto px-6 py-20 md:px-10 md:max-w-[1440px]">
      <Reveal>
        <Eyebrow>{diners.eyebrow}</Eyebrow>
        <h2 className="font-serif font-semibold text-[30px] leading-tight text-balance sm:text-[36px] md:text-[42px]">{diners.heading}</h2>
        {diners.intro.map((p) => (
          <p key={p} className="mt-5 font-serif font-semibold text-[24px] leading-snug text-ink/90">
            {p.split("\n").map((l) => (<span key={l} className="block">{l}</span>))}
          </p>
        ))}
      </Reveal>
      {/* grid-rows-subgrid on each card keeps titles a uniform height row-wide,
          so every card's body text starts on the same line. On mobile the cards
          become a horizontal snap-scroll carousel (grid-flow-col + auto-cols so
          each card is ~80% wide and the next peeks); at sm+ it reverts to the
          normal grid. Columns cap at Wix's native 316px image width with a fixed
          32px gap (justify-start, NOT -between) so the gap never widens as the
          viewport grows; at the normal ~15% content width the columns fill it
          exactly (first image on the heading, last on the header CTA). */}
      <div className="mt-14 grid grid-rows-[auto_auto_auto] gap-8 grid-flow-col auto-cols-[80%] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid-flow-row sm:auto-cols-auto sm:snap-none sm:overflow-x-visible sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,316px))] lg:justify-start">
        {diners.cards.map((card) => (
          <Reveal key={card.title} className="row-span-3 grid grid-rows-subgrid gap-y-0 snap-start"><FeatureCard card={card} variant="image" dim /></Reveal>
        ))}
      </div>
      <div className="mt-14 max-w-[520px]">
        <WaitlistForm audience="diner" />
      </div>
    </section>
  );
}
