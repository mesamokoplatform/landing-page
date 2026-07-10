import { problem, nav } from "@/lib/content";
import { VideoLoop } from "./ui/VideoLoop";
import { ArrowButton } from "./ui/ArrowButton";
import { Reveal } from "./ui/Reveal";

export function ProblemSection() {
  // Fixed 6 / 3 / 4-word line breaks so the heading always reads:
  // "Menus Have Not Kept Up With" / "The Visual, Personalised" / "Expectations Of Today's Diners."
  const words = problem.heading.split(" ");
  const headingLines = [
    words.slice(0, 6).join(" "),
    words.slice(6, 9).join(" "),
    words.slice(9).join(" "),
  ];
  // Fixed 5 / 6 / 5-word body line breaks:
  // "Mesa Moko transforms your static" / "menu into a live, curated experience" / "– tailored to each guest."
  const bodyWords = problem.body.split(" ");
  const bodyLines = [
    bodyWords.slice(0, 5).join(" "),
    bodyWords.slice(5, 11).join(" "),
    bodyWords.slice(11).join(" "),
  ];
  return (
    <section className="mx-auto px-6 py-20 md:px-[11%]">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className="w-full">
          {/* Sized/offset so the phone graphic lands between "k" in Moko and the
              middle of "a" in Restaurants of the heading below, matching Wix. */}
          <div className="relative aspect-[59/55] w-[84%] ml-[6.5%] overflow-hidden">
            {/* The source clip has a ~2px dark line baked into its bottom edge.
                Anchor to the top and run a few px taller so overflow-hidden
                clips that line off. */}
            <VideoLoop src={problem.media} className="absolute inset-x-0 top-0 h-[calc(100%+6px)] w-full object-cover object-top" />
          </div>
        </Reveal>
        <Reveal>
          <h2 aria-label={problem.heading} className="font-serif font-semibold text-[30px] leading-tight sm:text-[36px] md:text-[42px]">
            {headingLines.map((l) => (<span key={l} className="block">{l}</span>))}
          </h2>
          <p className="mt-6 font-serif font-semibold text-[24px] leading-snug text-ink/90">
            {bodyLines.map((l) => (<span key={l} className="block">{l}</span>))}
          </p>
          <div className="mt-10 flex flex-wrap gap-[27px]">
            <ArrowButton href={nav[0].href} variant="filled">For Restaurants</ArrowButton>
            <ArrowButton href={nav[1].href} variant="outline">For Diners</ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
