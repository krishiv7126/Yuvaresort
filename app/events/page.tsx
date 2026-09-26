import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, CloudRain, Music, Trees, Users } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { PageCta } from "@/components/page-cta";
import { Marquee, Reveal, SplitWords } from "@/components/motion";
import { occasionIcons } from "@/components/sections/services-section";
import { occasions, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events & Celebrations | MESWO Riverside Resort by YUVA",
  description:
    "Birthdays, anniversaries, pool and kitty parties, corporate get-togethers, weddings and pre-wedding shoots by the Meswo river — just 45 minutes from Ahmedabad.",
};

// Celebration palette: night sky + gold
const NIGHT = "#120e16";
const GOLD = "#e9a84a";

const venueShots = [
  { src: "/images/resort/entrance.webp", alt: "Heritage-style entrance", w: 1360, h: 608 },
  { src: "/images/resort/drone-pools.jpg", alt: "Pools from above", w: 720, h: 1280 },
  { src: "/images/resort/aerial-2.jpg", alt: "Grounds by the river", w: 2400, h: 1350 },
  { src: "/images/resort/well-landscape.jpg", alt: "Painted courtyard", w: 2000, h: 900 },
  { src: "/images/resort/pool-trees.jpg", alt: "Pool lined with trees", w: 720, h: 1280 },
  { src: "/images/resort/garden-cottage.jpg", alt: "Lawns and cottage", w: 720, h: 1280 },
];

const perks = [
  { icon: Music, title: "DJ dance", text: "Turn the lawns into a dance floor." },
  { icon: CloudRain, title: "Rain dance", text: "The pool-side party everyone remembers." },
  { icon: Users, title: "Team building games", text: "Made for offices and big groups." },
  { icon: Camera, title: "Photoshoot point", text: "Heritage walls, river views, golden hour." },
  { icon: Trees, title: "Open lawns", text: "Space to gather, eat and celebrate." },
];

export default function EventsPage() {
  return (
    <main className="text-white" style={{ background: NIGHT }}>
      <Header />

      {/* Hero */}
      <section className="relative flex h-svh items-end overflow-hidden">
        <Image
          src="/images/resort/entrance.webp"
          alt="The heritage entrance at MESWO"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120e16] via-[#120e16]/60 to-[#120e16]/30" />
        {/* Drifting celebration glow */}
        <div aria-hidden="true" className="animate-float-slow absolute top-1/4 -left-24 h-80 w-80 rounded-full bg-[#e9a84a]/30 blur-[100px]" />
        <div aria-hidden="true" className="animate-float-slow absolute right-0 bottom-1/3 h-96 w-96 rounded-full bg-[#c2477a]/25 blur-[110px] [animation-delay:-5s]" />

        <div className="relative px-6 pb-14 md:px-12 md:pb-20 lg:px-20">
          <Reveal variant="fade" delay={200}>
            <p className="text-xs uppercase tracking-[0.35em]" style={{ color: GOLD }}>Events &amp; Celebrations</p>
          </Reveal>
          <SplitWords
            text="Celebrate by the river."
            delay={300}
            className="mt-4 max-w-5xl font-display text-6xl leading-[0.92] md:text-8xl lg:text-[9rem]"
          />
          <Reveal variant="up" delay={900}>
            <p className="mt-6 max-w-lg text-base text-white/75 md:text-lg">
              Birthdays to weddings, kitty parties to corporate days — {site.fromCity.toLowerCase()}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Occasions */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">
            What are we <em style={{ color: GOLD }}>celebrating?</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {occasions.map((occasion, i) => {
            const Icon = occasionIcons[occasion];
            return (
              <Reveal key={occasion} variant="up" delay={(i % 5) * 80}>
                <Link
                  href={`/inquiry?occasion=${encodeURIComponent(occasion)}`}
                  data-cursor="Plan"
                  className="group flex min-h-40 flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#e9a84a]/70 hover:bg-[#e9a84a]/10 md:min-h-48 md:p-6"
                >
                  <div className="flex items-start justify-between">
                    <Icon size={26} strokeWidth={1.4} className="transition-transform duration-500 group-hover:scale-110" style={{ color: GOLD }} />
                    <ArrowUpRight size={18} className="text-white/40 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                  <span className="mt-8 font-display text-2xl leading-tight md:text-3xl">{occasion}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Venue photos, drifting past */}
      <section className="pb-24 md:pb-32">
        <Marquee duration={50}>
          {venueShots.map((shot) => (
            <div
              key={shot.src}
              className="relative mr-4 h-64 shrink-0 overflow-hidden rounded-3xl md:mr-6 md:h-96"
              style={{ aspectRatio: `${Math.min(shot.w / shot.h, 1.6)}` }}
            >
              <Image src={shot.src} alt={shot.alt} fill sizes="40vw" className="object-cover" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* Why here */}
      <section className="grid gap-12 px-6 pb-24 md:grid-cols-5 md:px-12 md:pb-36 lg:px-20">
        <Reveal className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>Made for gatherings</p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">Everything the party needs.</h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 md:col-span-3">
          {perks.map((perk, i) => (
            <Reveal
              key={perk.title}
              as="li"
              variant="blur"
              delay={i * 110}
              className="rounded-3xl border border-white/10 p-6"
            >
              <perk.icon size={24} strokeWidth={1.5} style={{ color: GOLD }} />
              <p className="mt-5 text-xl font-medium">{perk.title}</p>
              <p className="mt-1 text-white/60">{perk.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <PageCta
        eyebrow="Plan your event"
        title="Tell us the date. We'll set the stage."
        href="/inquiry?type=Event%20%2F%20Party"
        label="Plan an Event"
        className="bg-gradient-to-br from-[#e9a84a] to-[#c9803a] text-[#120e16]"
        buttonClassName="bg-[#120e16] text-white"
      />
      <FooterSection />
    </main>
  );
}
