import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Check, Sun } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { PageCta } from "@/components/page-cta";
import { CountUp, Reveal, SplitWords } from "@/components/motion";
import { Timeline } from "@/components/timeline";
import { packages, site } from "@/lib/site";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const metadata: Metadata = {
  title: "Packages & Prices | MESWO Riverside Resort by YUVA",
  description: `One Day Picnic ${inr(packages.dayPicnic.adult)} per person (${inr(packages.dayPicnic.child)} per child), breakfast to hi-tea. Night Stay ${inr(packages.nightStay.perRoom)} per Heritage Suite room.`,
};

// Dark, premium palette with the logo's gold
const BG = "bg-[#0d1717]";
const GOLD = "#e9a84a";

export default function PackagesPage() {
  const { dayPicnic, nightStay } = packages;

  return (
    <main className={`${BG} text-white`}>
      <Header />

      {/* Hero — drifting light, no photo */}
      <section className="relative flex min-h-svh items-center overflow-hidden px-6 pt-28 pb-16 md:px-12 lg:px-20">
        <div aria-hidden="true" className="animate-float-slow absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-[#e9a84a]/25 blur-[120px]" />
        <div aria-hidden="true" className="animate-float-slow absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-[#2fb8b3]/20 blur-[120px] [animation-delay:-7s]" />
        <div className="relative">
          <Reveal variant="fade">
            <p className="text-xs uppercase tracking-[0.35em]" style={{ color: GOLD }}>Packages &amp; Prices</p>
          </Reveal>
          <SplitWords
            text="Choose your escape."
            delay={200}
            className="mt-5 max-w-5xl font-display text-6xl leading-[0.95] md:text-8xl lg:text-[9.5rem]"
          />
          <Reveal variant="up" delay={800}>
            <p className="mt-8 max-w-lg text-lg text-white/70">
              A day by the pools, or a night in a Heritage Suite. Simple prices, no surprises.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The two packages */}
      <section className="grid gap-6 px-6 pb-24 md:grid-cols-2 md:px-12 md:pb-36 lg:px-20">
        {[
          {
            icon: Sun,
            name: dayPicnic.name,
            price: dayPicnic.adult,
            unit: "per person",
            extra: `${inr(dayPicnic.child)} per child`,
            image: "/images/resort/drone-pools.jpg",
            points: [dayPicnic.hours, dayPicnic.includes, "Pools, rain dance, games & zip-line"],
            href: "/inquiry?type=Day%20Picnic",
            cta: "Book a Day Picnic",
          },
          {
            icon: BedDouble,
            name: nightStay.name,
            price: nightStay.perRoom,
            unit: "per room",
            extra: `Only ${site.rooms} Heritage Suites`,
            image: "/images/resort/room.webp",
            points: [nightStay.room, `Check-in ${site.checkIn} · Check-out ${site.checkOut}`, "Experience the heritage stay with MESWO"],
            href: "/inquiry?type=Night%20Stay",
            cta: "Book a Night Stay",
          },
        ].map((pkg, i) => (
          <Reveal key={pkg.name} variant="up" delay={i * 150}>
            <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition-colors duration-500 hover:border-[#e9a84a]/60">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1717] to-transparent" />
                <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs backdrop-blur-md">
                  <pkg.icon size={14} /> {pkg.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-10">
                <p className="font-display text-6xl md:text-7xl" style={{ color: GOLD }}>
                  <CountUp to={pkg.price} prefix="₹" duration={1800} />
                </p>
                <p className="mt-1 text-white/60">
                  {pkg.unit} · {pkg.extra}
                </p>
                <ul className="mt-8 space-y-3">
                  {pkg.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-white/85">
                      <Check size={18} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pkg.href}
                  className="mt-10 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-medium text-[#0d1717] transition-transform duration-300 hover:scale-[1.02] md:mt-auto md:self-start"
                  style={{ background: GOLD }}
                >
                  {pkg.cta} <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* A day at MESWO */}
      <section className="grid gap-16 px-6 pb-24 md:grid-cols-2 md:px-12 md:pb-36 lg:px-20">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>The day picnic</p>
            <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">A day at MESWO.</h2>
            <p className="mt-4 max-w-sm text-white/60">{dayPicnic.includes}, {dayPicnic.hours}.</p>
          </Reveal>
        </div>
        <Timeline
          accent={GOLD}
          steps={[
            { time: "9:00 AM", title: "Arrive & breakfast", text: "Start the day with breakfast by the lawns." },
            { time: "Through the day", title: "Pools & rain dance", text: "Swimming pool, baby pool, rain dance and DJ." },
            { time: "Afternoon", title: "Adventure & games", text: "Zip-line, rope course, garden and indoor games." },
            { time: "Evening", title: "Riverside & nature walk", text: "Slow down at the riverside sit-out." },
            { time: "6:00 PM", title: "Hi-tea & goodbye", text: "One last cup before the drive home." },
          ]}
        />
      </section>

      {/* Good to know */}
      <section className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl">Good to know</h2>
        </Reveal>
        <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-4">
          {[
            ["Check-in", site.checkIn],
            ["Check-out", site.checkOut],
            ["Day picnic", dayPicnic.hours],
            ["Cancellation", site.cancellation],
          ].map(([term, detail], i) => (
            <Reveal key={term} variant="fade" delay={i * 100} className="bg-[#0d1717] p-6 md:p-8">
              <dt className="text-xs uppercase tracking-[0.25em] text-white/50">{term}</dt>
              <dd className="mt-3 text-lg">{detail}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <PageCta
        eyebrow={site.fromCity}
        title="Your riverside escape is one message away."
        href="/inquiry"
        label="Send an Inquiry"
        className="bg-[#e9a84a] text-[#0d1717]"
        buttonClassName="bg-[#0d1717] text-white"
      />
      <FooterSection />
    </main>
  );
}
