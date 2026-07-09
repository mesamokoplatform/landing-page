import { restaurants } from "@/lib/content";
import { Eyebrow } from "./ui/Eyebrow";
import { FeatureCard } from "./ui/FeatureCard";
import { Reveal } from "./ui/Reveal";
import { WaitlistForm } from "./ui/WaitlistForm";

export function RestaurantsSection() {
  return (
    <section id="restaurants" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <Reveal className="max-w-[46ch]">
        <Eyebrow>{restaurants.eyebrow}</Eyebrow>
        <h2 className="font-serif font-semibold text-[34px] leading-tight md:text-[44px]">{restaurants.heading}</h2>
        <p className="mt-5 font-serif text-[18px] leading-snug text-ink/90">{restaurants.intro}</p>
      </Reveal>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {restaurants.cards.map((card) => (
          <Reveal key={card.title}><FeatureCard card={card} variant="video" grayscale /></Reveal>
        ))}
      </div>
      <div className="mt-14 max-w-[520px]">
        <WaitlistForm audience="restaurant" />
      </div>
    </section>
  );
}
