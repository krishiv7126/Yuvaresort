import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { PageCta } from "@/components/page-cta";
import { HeroMedia } from "@/components/hero-media";
import { ClipImage, CountUp, Marquee, Reveal, SplitWords } from "@/components/motion";
import { amenityIcons } from "@/components/sections/amenities-list-section";
import { amenities, packages, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Amenities & Activities | MESWO Riverside Resort by YUVA",
  description:
    "Swimming pool, baby pool, rain dance, DJ, zip-line, adventure park, garden and indoor games, nature walk and a riverside sit-out — 14 ways to spend the day at MESWO.",
};

const features = [
  {
    eyebrow: "Pools",
    title: "Two pools, one long afternoon.",
    text: "A big swimming pool for the grown-ups, a baby pool for the little ones — and rain dance when the music starts.",
    image: "/images/resort/drone-pools.jpg",
    alt: "Both pools seen from above",
  },
  {
    eyebrow: "Adventure",
    title: "Zip-line, rope bridges, climbing nets.",
    text: "An adventure park built for sunsets — take on the rope course while the sky turns gold.",
    image: "/images/resort/adventure-sunset-1.webp",
    alt: "Adventure park at sunset",
  },
  {
    eyebrow: "Games",
    title: "Garden games to team building.",
    text: "Indoor games, outdoor activities and team-building games for families, friends and offices.",
    image: "/images/resort/climbing-wall.jpg",
    alt: "Climbing wall and tyre swings in the adventure park",
  },
  {
    eyebrow: "Slow down",
    title: "Nature walks & a riverside sit-out.",
    text: "Wander the grounds, then sit by the Meswo river and let the day go quiet.",
    image: "/images/resort/verandah-river.webp",
    alt: "Verandah overlooking the river",
  },
];

// Pool-water palette for this page
const DEEP = "#073b40";
const AQUA = "#2fb8b3";

export default function AmenitiesPage() {
  return (
    <main className="bg-white text-[#073b40]">
      <Header />

      {/* Hero */}
      <section className="relative h-svh overflow-hidden" style={{ background: DEEP }}>
        <HeroMedia
          video="/videos/drone-loop.mp4"
          poster="/videos/drone-loop.jpg"
          image="/images/resort/aerial-1.jpg"
          alt="The resort and its pools from above"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#073b40] via-[#073b40]/30 to-[#073b40]/40" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 text-white md:px-12 md:pb-20 lg:px-20">
          <Reveal variant="fade" delay={200}>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/80">
              <Sparkles size={14} /> Amenities &amp; Activities
            </p>
          </Reveal>
          <SplitWords
            text="Play by the river."
            delay={300}
            className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl lg:text-9xl"
          />
          <Reveal variant="up" delay={900}>
            <p className="mt-6 max-w-md text-base text-white/85 md:text-lg">
              {amenities.length} ways to spend the day — from the pool to the zip-line.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ticker of everything on offer */}
      <div className="border-b border-[#073b40]/10 py-6 md:py-8" style={{ background: AQUA }}>
        <Marquee duration={40}>
          {amenities.map((a) => (
            <span key={a} className="flex items-center gap-6 pr-6 text-2xl font-semibold text-[#073b40] md:text-4xl">
              {a}
              <span className="h-2 w-2 rounded-full bg-white md:h-3 md:w-3" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Counters */}
      <section className="grid grid-cols-3 gap-4 px-6 py-20 text-center md:px-12 md:py-28 lg:px-20">
        {[
          { to: amenities.length, label: "Activities" },
          { to: 2, label: "Pools" },
          { to: 45, label: "Min from Ahmedabad" },
        ].map((stat, i) => (
          <Reveal key={stat.label} variant="scale" delay={i * 120}>
            <p className="text-5xl font-semibold tracking-tight md:text-8xl" style={{ color: AQUA }}>
              <CountUp to={stat.to} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#073b40]/60 md:text-sm">{stat.label}</p>
          </Reveal>
        ))}
      </section>

      {/* Alternating feature rows */}
      <section className="space-y-20 px-6 pb-24 md:space-y-32 md:px-12 md:pb-36 lg:px-20">
        {features.map((f, i) => (
          <div key={f.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <ClipImage
              src={f.image}
              alt={f.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              from={i % 2 === 0 ? "left" : "right"}
              className={`aspect-[4/5] w-full rounded-[2rem] md:aspect-[4/3] ${i % 2 === 1 ? "md:order-2" : ""}`}
            />
            <Reveal variant={i % 2 === 0 ? "right" : "left"} delay={150}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: AQUA }}>
                0{i + 1} — {f.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{f.title}</h2>
              <p className="mt-4 max-w-md text-lg text-[#073b40]/70">{f.text}</p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Every amenity */}
      <section className="px-6 pb-24 md:px-12 md:pb-36 lg:px-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Everything, in one place.</h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-7">
          {amenities.map((amenity, i) => {
            const Icon = amenityIcons[amenity];
            return (
              <Reveal
                key={amenity}
                as="li"
                variant="scale"
                delay={(i % 7) * 60}
                className="group rounded-2xl bg-[#e8f7f6] p-4 transition-transform duration-300 hover:-translate-y-1 md:p-5"
              >
                <Icon size={24} strokeWidth={1.6} style={{ color: DEEP }} className="transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
                <p className="mt-5 text-sm font-medium leading-snug">{amenity}</p>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* Photo band */}
      <section className="relative h-[60svh] overflow-hidden">
        <Image src="/images/resort/pool-trees.jpg" alt="Pool lined with trees" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#073b40]/35" />
        <Reveal variant="blur" className="absolute inset-0 flex items-center justify-center px-6">
          <p className="max-w-3xl text-center text-3xl font-semibold leading-tight text-white md:text-6xl">
            Breakfast to hi-tea, {packages.dayPicnic.hours}.
          </p>
        </Reveal>
      </section>

      <PageCta
        eyebrow="One Day Picnic"
        title={`All of it, from ₹${packages.dayPicnic.adult.toLocaleString("en-IN")} a person.`}
        href="/inquiry?type=Day%20Picnic"
        label="Book a Day Picnic"
        note={`₹${packages.dayPicnic.child.toLocaleString("en-IN")} per child · ${site.cancellation}`}
        className="bg-[#073b40] text-white"
        buttonClassName="bg-[#2fb8b3] text-[#073b40]"
      />
      <FooterSection />
    </main>
  );
}
