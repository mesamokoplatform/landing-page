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
        {diners.intro.map((p) => (<p key={p} className="mt-5 max-w-[46ch] font-serif font-semibold text-[20px] leading-snug text-ink/90">{p}</p>))}
      </Reveal>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {diners.cards.map((card) => (
          <Reveal key={card.title}><FeatureCard card={card} variant="image" dim /></Reveal>
        ))}
      </div>
      <div className="mt-14 max-w-[520px]">
        <WaitlistForm audience="diner" />
      </div>
    </section>
  );
}
