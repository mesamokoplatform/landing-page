import { social } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="font-serif text-2xl font-bold tracking-[0.06em]">Mesa Moko</span>
        <nav className="flex gap-8">
          {social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
               className="label-sans inline-flex items-center gap-2 text-[13px]">
              {s.label} <span aria-hidden="true">&#8594;</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
