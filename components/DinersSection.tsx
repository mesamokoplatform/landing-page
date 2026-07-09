import { diners } from "@/lib/content";
import { Eyebrow } from "./ui/Eyebrow";
import { FeatureCard } from "./ui/FeatureCard";
import { Reveal } from "./ui/Reveal";
import { WaitlistForm } from "./ui/WaitlistForm";

export function DinersSection() {
  return (
    <section id="diners" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <Eyebrow>{diners.eyebrow}</Eyebrow>
        <h2 className="font-serif text-[28px] leading-tight text-balance md:text-[36px]">{diners.heading}</h2>
        {diners.intro.map((p) => (<p key={p} className="mt-5 max-w-[46ch] font-serif text-[20px] leading-snug text-ink/90">{p}</p>))}
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
