import { problem, nav } from "@/lib/content";
import { VideoLoop } from "./ui/VideoLoop";
import { ArrowButton } from "./ui/ArrowButton";
import { Reveal } from "./ui/Reveal";

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className="mx-auto w-full max-w-[360px]">
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.5rem] border border-black/10 shadow-xl">
            <VideoLoop src={problem.media} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="max-w-[18ch] font-serif text-[34px] leading-tight md:text-[44px]">{problem.heading}</h2>
          <p className="mt-6 max-w-[36ch] text-[18px] leading-snug text-muted">{problem.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ArrowButton href={nav[0].href} variant="filled">For Restaurants</ArrowButton>
            <ArrowButton href={nav[1].href} variant="outline">For Diners</ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
