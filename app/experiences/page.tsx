import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { PageCta } from "@/components/page-cta";
import { Reveal, SplitWords } from "@/components/motion";
import { StackCards } from "@/components/stack-cards";
import { experiences } from "@/lib/experiences";

export const metadata: Metadata = {
  title: "Experiences | MESWO Riverside Resort by YUVA",
  description:
    "Poolside afternoons, riverside evenings, a heritage courtyard, hand-painted suites and a sunset rope course — moments at MESWO Riverside Resort.",
};

// Editorial cream palette
const CREAM = "bg-[#f7f2ea]";
const INK = "text-[#2b2620]";

export default function ExperiencesPage() {
  return (
    <main className={`${CREAM} ${INK}`}>
      <Header solid />

      {/* Editorial hero */}
      <section className="px-6 pt-36 pb-16 md:px-12 md:pt-48 md:pb-24 lg:px-20">
        <Reveal variant="fade">
          <p className="text-xs uppercase tracking-[0.35em] text-[#2b2620]/60">Experiences</p>
        </Reveal>
        <SplitWords
          text="Moments worth slowing down for."
          delay={150}
          className="mt-5 max-w-5xl font-display text-6xl leading-[0.95] md:text-8xl lg:text-[8.5rem]"
        />

        {/* Three photos drift up under the headline */}
        <div className="mt-14 grid grid-cols-3 gap-3 md:mt-20 md:gap-6">
          {[
            { src: "/images/resort/verandah-river.webp", alt: "Verandah over the river", cls: "aspect-[3/4]" },
            { src: "/images/resort/well-portrait.jpg", alt: "The courtyard well", cls: "aspect-[3/4] translate-y-8 md:translate-y-16" },
            { src: "/images/resort/adventure-sunset-2.webp", alt: "Rope course at sunset", cls: "aspect-[3/4]" },
          ].map((img, i) => (
            <Reveal key={img.src} variant="up" delay={500 + i * 150} duration={1200}>
              <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl ${img.cls}`}>
                <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pt-10 pb-24 md:px-12 md:pb-32 lg:px-20">
        <Reveal>
          <p className="mx-auto mb-16 max-w-2xl text-center font-display text-3xl italic leading-snug md:mb-24 md:text-5xl">
            Six ways to spend a day by the Meswo — scroll through them.
          </p>
        </Reveal>
        <StackCards cards={experiences} />
      </section>

      {/* Quote */}
      <section className="px-6 pb-24 md:px-12 md:pb-36 lg:px-20">
        <Reveal variant="blur" duration={1300}>
          <p className="mx-auto max-w-4xl text-center font-display text-5xl leading-[1.05] md:text-8xl">
            Escape. Relax. <em className="text-[#9a6b3f]">Reconnect.</em>
          </p>
        </Reveal>
      </section>

      <PageCta
        eyebrow="MESWO — Experience the Nature"
        title="Come and make your own."
        href="/inquiry"
        label="Plan Your Visit"
        className="bg-[#2b2620] text-[#f7f2ea]"
        buttonClassName="bg-[#f7f2ea] text-[#2b2620]"
      />
      <FooterSection />
    </main>
  );
}
