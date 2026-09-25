import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, SplitWords } from "@/components/motion";

// Closing call-to-action shared by the section pages; each page passes its own colours
export function PageCta({
  eyebrow,
  title,
  href,
  label,
  note,
  className = "bg-foreground text-background",
  buttonClassName = "bg-background text-foreground",
}: {
  eyebrow: string;
  title: string;
  href: string;
  label: string;
  note?: string;
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <section className={`px-6 py-24 text-center md:px-12 md:py-36 ${className}`}>
      <Reveal variant="fade">
        <p className="text-xs uppercase tracking-[0.3em] opacity-70">{eyebrow}</p>
      </Reveal>
      <SplitWords
        as="h2"
        text={title}
        className="mx-auto mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-7xl lg:text-8xl"
      />
      <Reveal variant="up" delay={300}>
        <Link
          href={href}
          className={`group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-medium transition-transform duration-300 hover:scale-[1.03] ${buttonClassName}`}
        >
          {label}
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        {note && <p className="mt-6 text-sm opacity-60">{note}</p>}
      </Reveal>
    </section>
  );
}
