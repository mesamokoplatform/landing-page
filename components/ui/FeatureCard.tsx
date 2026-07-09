import type { Card } from "@/lib/content";
import { VideoLoop } from "./VideoLoop";
import { asset } from "@/lib/asset";

export function FeatureCard({
  card,
  variant,
  grayscale = false,
}: {
  card: Card;
  variant: "video" | "image";
  grayscale?: boolean;
}) {
  // Grayscale cards reveal their colour on hover (transition on the whole card).
  const mediaClass = `absolute inset-0 h-full w-full object-cover${
    grayscale ? " grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0" : ""
  }`;
  // Restaurant clips are tall 9:16 portraits; diner dishes are near-square, matching the source.
  const aspect = variant === "video" ? "aspect-[9/16]" : "aspect-square";
  return (
    <div className="group flex flex-col">
      <div className={`relative w-full ${aspect} overflow-hidden`}>
        {variant === "video" ? (
          <VideoLoop src={card.media} className={mediaClass} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(card.media)} alt={card.title} className={mediaClass} />
        )}
      </div>
      <h3 className="mt-5 text-[24px] leading-tight font-serif font-semibold">{card.title}</h3>
      <p className="mt-4 text-[16px] leading-snug text-ink/90 font-serif">{card.body}</p>
    </div>
  );
}
