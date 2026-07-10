import { problem, nav } from "@/lib/content";
import { VideoLoop } from "./ui/VideoLoop";
import { ArrowButton } from "./ui/ArrowButton";
import { Reveal } from "./ui/Reveal";

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-[1728px] px-6 py-20 md:px-[11%]">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className="w-full">
          <div className="relative aspect-[59/55] w-full overflow-hidden">
            {/* The source clip has a ~2px dark line baked into its bottom edge.
                Anchor to the top and run a few px taller so overflow-hidden
                clips that line off. */}
            <VideoLoop src={problem.media} className="absolute inset-x-0 top-0 h-[calc(100%+6px)] w-full object-cover object-top" />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="max-w-[18ch] font-serif text-[28px] leading-tight text-balance md:text-[36px]">{problem.heading}</h2>
          <p className="mt-6 max-w-[36ch] font-serif text-[20px] leading-snug text-ink/90">{problem.body}</p>
          <div className="mt-10 flex flex-wrap gap-[27px]">
            <ArrowButton href={nav[0].href} variant="filled">For Restaurants</ArrowButton>
            <ArrowButton href={nav[1].href} variant="outline">For Diners</ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
