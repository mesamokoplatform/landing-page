import type { Card } from "@/lib/content";
import { VideoLoop } from "./VideoLoop";
import { asset } from "@/lib/asset";

export function FeatureCard({
  card,
  variant,
  grayscale = false,
  dim = false,
}: {
  card: Card;
  variant: "video" | "image";
  grayscale?: boolean;
  dim?: boolean;
}) {
  // Hover reveal: grayscale cards desaturate; dim cards darken. Both restore on hover.
  const effect = grayscale
    ? " grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
    : dim
      ? " brightness-[0.6] transition-[filter] duration-500 ease-out group-hover:brightness-100"
      : "";
  const mediaClass = `absolute inset-0 h-full w-full object-cover${effect}`;
  // Titles may carry explicit "\n" break points; render each part on its own line.
  const titleLines = card.title.split("\n");
  const flatTitle = titleLines.join(" ");
  // Restaurant clips are tall 9:16 portraits; diner dishes are near-square, matching the source.
  const aspect = variant === "video" ? "aspect-[9/16]" : "aspect-square";
  return (
    <div className="group flex flex-col">
      <div
        className={`relative w-full ${aspect} overflow-hidden${
          variant === "video" ? " border border-ink/15" : ""
        }`}
      >
        {variant === "video" ? (
          <VideoLoop src={card.media} className={mediaClass} slowMo={grayscale} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(card.media)} alt={flatTitle} className={mediaClass} />
        )}
      </div>
      <h3
        aria-label={titleLines.length > 1 ? flatTitle : undefined}
        className="mt-5 text-[26px] leading-tight font-serif font-semibold"
      >
        {titleLines.length > 1
          ? titleLines.map((l) => (<span key={l} className="block">{l}</span>))
          : card.title}
      </h3>
      <p className="mt-4 text-[20px] leading-snug text-ink/90 font-serif font-semibold">{card.body}</p>
    </div>
  );
}
