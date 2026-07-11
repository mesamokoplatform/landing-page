import { diners } from "@/lib/content";
import { Eyebrow } from "./ui/Eyebrow";
import { FeatureCard } from "./ui/FeatureCard";
import { Reveal } from "./ui/Reveal";
import { WaitlistForm } from "./ui/WaitlistForm";

export function DinersSection() {
  return (
    <section id="diners" className="mx-auto px-6 py-20 md:px-[11%]">
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
          so every card's body text starts on the same line. max-w caps the four
          columns at Wix's native 316px image width (4×316 + 3×32 gap) so images
          don't stretch larger than the reference on wide screens. */}
      <div className="mt-14 grid grid-rows-[auto_auto_auto] gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-[1360px]">
        {diners.cards.map((card) => (
          <Reveal key={card.title} className="row-span-3 grid grid-rows-subgrid gap-y-0"><FeatureCard card={card} variant="image" dim /></Reveal>
        ))}
      </div>
      <div className="mt-14 max-w-[520px]">
        <WaitlistForm audience="diner" />
      </div>
    </section>
  );
}
