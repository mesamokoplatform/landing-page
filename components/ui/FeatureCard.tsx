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
  const mediaClass = `absolute inset-0 h-full w-full object-cover${grayscale ? " grayscale" : ""}`;
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {variant === "video" ? (
          <VideoLoop src={card.media} className={mediaClass} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(card.media)} alt={card.title} className={mediaClass} />
        )}
      </div>
      <h3 className="mt-5 text-[26px] leading-tight font-serif">{card.title}</h3>
      <p className="mt-3 text-[15px] leading-snug text-muted">{card.body}</p>
    </div>
  );
}
