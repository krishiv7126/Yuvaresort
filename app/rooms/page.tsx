import type { Metadata } from "next";
import Image from "next/image";
import { BedDouble, Clock, Paintbrush, Snowflake, Trees } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { PageCta } from "@/components/page-cta";
import { ClipImage, CountUp, Parallax, Reveal, SplitWords } from "@/components/motion";
import { packages, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Heritage Suites | MESWO Riverside Resort by YUVA",
  description: `Specially designed, hand-painted Heritage Suite rooms by the Meswo river — ₹${packages.nightStay.perRoom.toLocaleString("en-IN")} per room. Only ${site.rooms} suites.`,
};

const features = [
  { icon: Paintbrush, title: "Hand-painted interiors", text: "Folk motifs, peacocks and trees of life on every wall." },
  { icon: Snowflake, title: "Air-conditioned comfort", text: "Cool, calm rooms after a day in the sun." },
  { icon: Clock, title: `Check-in ${site.checkIn}`, text: `Check-out ${site.checkOut} — a slow morning included.` },
  { icon: Trees, title: "Steps from the lawns", text: "Pools, gardens and the river a short walk away." },
];

// Warm heritage palette for this page only
const SAND = "bg-[#f5eee4]";
const INK = "text-[#3b2a1f]";

export default function RoomsPage() {
  return (
    <main className={`${SAND} ${INK}`}>
      <Header />

      {/* Hero — slow zoom-out on the room photo, words rise in */}
      <section className="relative h-svh overflow-hidden">
        <Image
          src="/images/resort/room.webp"
          alt="A hand-painted Heritage Suite at MESWO"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a10]/85 via-[#2a1a10]/25 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 text-[#f5eee4] md:px-12 md:pb-20 lg:px-20">
          <Reveal variant="fade" delay={200}>
            <p className="text-xs uppercase tracking-[0.35em] text-[#f5eee4]/80">The Heritage Stay</p>
          </Reveal>
          <SplitWords
            text="Heritage Suites"
            delay={350}
            className="mt-4 font-display text-6xl italic leading-[0.95] md:text-8xl lg:text-[9rem]"
          />
          <Reveal variant="up" delay={900}>
            <p className="mt-6 max-w-md text-base text-[#f5eee4]/85 md:text-lg">
              Specially designed Heritage Suite rooms with MESWO — only {site.rooms} of them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro statement */}
      <section className="px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <Reveal variant="blur" duration={1200}>
          <p className="mx-auto max-w-4xl text-center font-display text-3xl leading-snug md:text-5xl">
            Experience the heritage stay with MESWO — painted walls, carved doors and quiet
            mornings by the <em className="text-[#b5552c]">Meswo river</em>.
          </p>
        </Reveal>
      </section>

      {/* Split: tall photo + features */}
      <section className="grid items-center gap-12 px-6 pb-24 md:grid-cols-2 md:gap-16 md:px-12 md:pb-36 lg:px-20">
        <ClipImage
          src="/images/resort/room-portrait.webp"
          alt="Heritage Suite with painted walls"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[3/4] w-full rounded-[2rem]"
        />
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#b5552c]">Inside the suite</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">Made by hand, meant for rest.</h2>
          </Reveal>
          <ul className="mt-10 space-y-8">
            {features.map((f, i) => (
              <Reveal key={f.title} as="li" variant="left" delay={i * 120} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b5552c]/10 text-[#b5552c]">
                  <f.icon size={22} strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-lg font-medium">{f.title}</p>
                  <p className="mt-1 text-[#3b2a1f]/70">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Parallax collage of heritage details */}
      <section className="overflow-hidden px-6 pb-24 md:px-12 md:pb-36 lg:px-20">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">
            Every wall <em className="text-[#b5552c]">tells a story.</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          <Parallax speed={0.08} className="aspect-[3/5] overflow-hidden rounded-3xl">
            <Image src="/images/resort/cottage-1.jpg" alt="Painted cottage doorway" fill sizes="33vw" className="object-cover" />
          </Parallax>
          <Parallax speed={0.2} className="mt-16 aspect-[3/5] overflow-hidden rounded-3xl md:mt-28">
            <Image src="/images/resort/cottage-2.jpg" alt="Cottage details" fill sizes="33vw" className="object-cover" />
          </Parallax>
          <Parallax speed={0.12} className="col-span-2 aspect-[16/10] overflow-hidden rounded-3xl md:col-span-1 md:aspect-[3/5]">
            <Image src="/images/resort/garden-cottage.jpg" alt="Cottage on the lawn" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </Parallax>
        </div>
      </section>

      {/* Numbers */}
      <section className="grid grid-cols-2 border-y border-[#3b2a1f]/15 md:grid-cols-4">
        {[
          { value: <CountUp to={site.rooms} />, label: "Heritage Suites" },
          { value: <CountUp to={45} suffix=" min" />, label: "From Ahmedabad" },
          { value: site.checkIn, label: "Check-in" },
          { value: site.checkOut, label: "Check-out" },
        ].map((stat, i) => (
          <Reveal
            key={stat.label}
            variant="up"
            delay={i * 100}
            className="border-[#3b2a1f]/15 px-6 py-10 text-center even:border-l md:border-l md:first:border-l-0 md:py-14"
          >
            <p className="font-display text-5xl md:text-6xl">{stat.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#3b2a1f]/60">{stat.label}</p>
          </Reveal>
        ))}
      </section>

      {/* Price */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <Reveal variant="scale" duration={1100}>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#b5552c] px-8 py-14 text-[#f5eee4] md:px-16 md:py-20">
            <BedDouble className="absolute -right-6 -bottom-6 h-48 w-48 opacity-10 md:h-72 md:w-72" strokeWidth={1} />
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5eee4]/80">Night Stay</p>
            <p className="mt-4 font-display text-6xl md:text-8xl">
              <CountUp to={packages.nightStay.perRoom} prefix="₹" duration={2000} />
            </p>
            <p className="mt-2 text-lg text-[#f5eee4]/85">per room · {packages.nightStay.room}</p>
          </div>
        </Reveal>
      </section>

      <PageCta
        eyebrow="Only three suites"
        title="Reserve your suite by the river."
        href="/inquiry?type=Night%20Stay"
        label="Book a Night Stay"
        note={site.cancellation}
        className="bg-[#2a1a10] text-[#f5eee4]"
        buttonClassName="bg-[#f5eee4] text-[#2a1a10]"
      />
      <FooterSection />
    </main>
  );
}
