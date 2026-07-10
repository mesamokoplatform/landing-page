import { restaurants } from "@/lib/content";
import { Eyebrow } from "./ui/Eyebrow";
import { FeatureCard } from "./ui/FeatureCard";
import { Reveal } from "./ui/Reveal";
import { WaitlistForm } from "./ui/WaitlistForm";

export function RestaurantsSection() {
  return (
    <section id="restaurants" className="mx-auto px-6 py-20 md:px-[11%]">
      <Reveal>
        <Eyebrow>{restaurants.eyebrow}</Eyebrow>
        <h2 className="font-serif font-semibold text-[30px] leading-tight text-balance sm:text-[36px] md:text-[42px]">{restaurants.heading}</h2>
        <p className="mt-5 max-w-[46ch] font-serif text-[20px] leading-snug text-ink/90">{restaurants.intro}</p>
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
