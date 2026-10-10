import { Plus } from "lucide-react";
import { faqs, faqSchema } from "@/lib/faqs";

// Plain <details> so every answer is in the HTML Google reads, open or not
export function FaqSection({ className = "bg-background" }: { className?: string }) {
  return (
    <section id="faq" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-24">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Questions</p>
        <h2 className="font-display text-4xl leading-[1.05] text-foreground md:text-6xl">
          Good to know before you come.
        </h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-base font-medium text-foreground md:text-lg [&::-webkit-details-marker]:hidden">
                <h3>{q}</h3>
                <Plus
                  size={20}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
