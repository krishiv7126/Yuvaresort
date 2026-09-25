import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Check, Clock, Sun, Utensils } from "lucide-react";
import { packages, site } from "@/lib/site";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function PackagesSection() {
  const { dayPicnic, nightStay } = packages;

  return (
    <section id="packages" className="bg-background">
      <div className="px-6 pt-16 pb-8 md:px-12 md:pt-28 md:pb-12 lg:px-20">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Packages</p>
        <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Come for the day, or stay the night.
        </h2>
      </div>

      <div className="grid gap-4 px-6 md:grid-cols-2 md:gap-6 md:px-12 lg:px-20">
        {/* One Day Picnic */}
        <article className="flex flex-col overflow-hidden rounded-3xl border border-border">
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/resort/drone-pools.jpg"
              alt="The pools seen from above"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md">
              <Sun size={14} /> Day out
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <h3 className="text-2xl font-medium tracking-tight text-foreground">{dayPicnic.name}</h3>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p>
                <span className="text-3xl font-semibold text-foreground md:text-4xl">{inr(dayPicnic.adult)}</span>
                <span className="ml-1.5 text-sm text-muted-foreground">per person</span>
              </p>
              <p>
                <span className="text-xl font-semibold text-foreground">{inr(dayPicnic.child)}</span>
                <span className="ml-1.5 text-sm text-muted-foreground">per child</span>
              </p>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-foreground">
              <li className="flex items-center gap-3">
                <Clock size={18} className="shrink-0 text-muted-foreground" /> {dayPicnic.hours}
              </li>
              <li className="flex items-center gap-3">
                <Utensils size={18} className="shrink-0 text-muted-foreground" /> {dayPicnic.includes}
              </li>
              <li className="flex items-center gap-3">
                <Check size={18} className="shrink-0 text-muted-foreground" /> Pools, games, zip-line &amp; more
              </li>
            </ul>
            <Link
              href="/inquiry?type=Day%20Picnic"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition-opacity hover:opacity-85 md:mt-auto md:self-start"
            >
              Book a Day Picnic <ArrowRight size={16} />
            </Link>
          </div>
        </article>

        {/* Night Stay */}
        <article className="flex flex-col overflow-hidden rounded-3xl border border-border">
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/resort/room.webp"
              alt="Hand-painted Heritage Suite room"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md">
              <BedDouble size={14} /> Only {site.rooms} suites
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <h3 className="text-2xl font-medium tracking-tight text-foreground">{nightStay.name}</h3>
            <p className="mt-4">
              <span className="text-3xl font-semibold text-foreground md:text-4xl">{inr(nightStay.perRoom)}</span>
              <span className="ml-1.5 text-sm text-muted-foreground">per room</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground">
              <li className="flex items-center gap-3">
                <BedDouble size={18} className="shrink-0 text-muted-foreground" /> {nightStay.room}
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="shrink-0 text-muted-foreground" /> Check-in {site.checkIn} · Check-out {site.checkOut}
              </li>
              <li className="flex items-center gap-3">
                <Check size={18} className="shrink-0 text-muted-foreground" /> Experience the heritage stay with MESWO
              </li>
            </ul>
            <Link
              href="/inquiry?type=Night%20Stay"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition-opacity hover:opacity-85 md:mt-auto md:self-start"
            >
              Book a Night Stay <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </div>

      <p className="px-6 pt-6 pb-16 text-sm text-muted-foreground md:px-12 md:pb-24 lg:px-20">
        {site.cancellation} Rates may change — we&apos;ll confirm when you enquire.
      </p>
    </section>
  );
}
