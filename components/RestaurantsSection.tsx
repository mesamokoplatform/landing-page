import { restaurants } from "@/lib/content";
import { Eyebrow } from "./ui/Eyebrow";
import { FeatureCard } from "./ui/FeatureCard";
import { Reveal } from "./ui/Reveal";
import { WaitlistForm } from "./ui/WaitlistForm";

export function RestaurantsSection() {
  // Fixed 7 / 8 / 5-word intro line breaks:
  // "Mesa Moko empowers visionary restaurants to deliver" /
  // "beautiful, immersive menus and provide visual storytelling to" /
  // "diners before the first bite."
  const introWords = restaurants.intro.split(" ");
  const introLines = [
    introWords.slice(0, 7).join(" "),
    introWords.slice(7, 15).join(" "),
    introWords.slice(15).join(" "),
  ];
  return (
    <section id="restaurants" className="mx-auto px-6 py-20 md:pl-[15.2%] md:pr-[14.6%]">
      <Reveal>
        <Eyebrow>{restaurants.eyebrow}</Eyebrow>
        <h2 className="font-serif font-semibold text-[30px] leading-tight text-balance sm:text-[36px] md:text-[42px]">{restaurants.heading}</h2>
        <p className="mt-5 font-serif font-semibold text-[24px] leading-snug text-ink/90">
          {introLines.map((l) => (<span key={l} className="block">{l}</span>))}
        </p>
      </Reveal>
      {/* grid-rows-subgrid on each card keeps titles a uniform height row-wide,
          so every card's body text starts on the same line. */}
      <div className="mt-14 grid grid-rows-[auto_auto_auto] gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {restaurants.cards.map((card) => (
          <Reveal key={card.title} className="row-span-3 grid grid-rows-subgrid gap-y-0"><FeatureCard card={card} variant="video" grayscale /></Reveal>
        ))}
      </div>

      <div className="mt-14 max-w-[520px]">
        <WaitlistForm audience="restaurant" />
      </div>
    </section>
  );
}
