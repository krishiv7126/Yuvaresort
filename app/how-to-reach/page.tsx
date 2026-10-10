import type { Metadata } from "next";
import { Car, MapPin, Navigation, Phone } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PageCta } from "@/components/page-cta";
import { Reveal, SplitWords } from "@/components/motion";
import { nearbyTowns } from "@/lib/nearby";
import { packages, site } from "@/lib/site";

const km = (town: string) => nearbyTowns.find((t) => t.name === town)?.km;

export const metadata: Metadata = {
  title: "Resort near Ahmedabad, Gandhinagar & Himmatnagar",
  description: `How far is ${site.name}? About ${km("Ahmedabad")} km from Ahmedabad, ${km("Gandhinagar")} km from Gandhinagar, ${km("Himmatnagar")} km from Himmatnagar and ${km("Mehsana")} km from Mehsana. Distances and one-tap Google Maps directions from ${nearbyTowns.length} towns within 150 km.`,
  alternates: { canonical: "/how-to-reach" },
};

export default function HowToReachPage() {
  const nearest = nearbyTowns.filter((t) => t.km <= 40);
  const further = nearbyTowns.filter((t) => t.km > 40);

  return (
    <main className="bg-background">
      <Header solid />

      <section className="px-6 pt-36 pb-12 md:px-12 md:pt-48 md:pb-16 lg:px-20">
        <Reveal variant="fade">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">How to reach</p>
        </Reveal>
        <SplitWords
          text="A riverside resort near you."
          delay={150}
          className="mt-5 max-w-5xl font-display text-5xl leading-[0.95] text-foreground md:text-7xl lg:text-8xl"
        />
        <Reveal delay={300}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {site.name} sits on the Meswo river near Talod and Prantij in north Gujarat — an easy drive for a
            one day picnic or a night away from Ahmedabad, Gandhinagar, Himmatnagar, Modasa, Mehsana and every
            town in between. Find yours below and tap for turn-by-turn directions.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-base font-medium text-background transition-opacity hover:opacity-80"
          >
            <Navigation size={18} />
            Directions from my location
          </a>
          <a
            href={site.phoneHref}
            className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 text-base font-medium text-foreground transition-colors hover:border-foreground"
          >
            <Phone size={18} />
            {site.phoneDisplay}
          </a>
        </div>

        <a
          href={site.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex max-w-2xl gap-3 text-base leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
        >
          <MapPin size={20} className="mt-0.5 shrink-0 text-foreground" />
          <span>{site.address}</span>
        </a>
      </section>

      {[
        { title: "Close by — under 40 km", towns: nearest },
        { title: "Further afield — up to 150 km", towns: further },
      ].map(({ title, towns }) => (
        <section key={title} className="px-6 pb-14 md:px-12 lg:px-20">
          <h2 className="mb-6 font-display text-3xl text-foreground md:text-4xl">{title}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {towns.map((t) => (
              <li key={t.name}>
                <a
                  href={t.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-foreground"
                >
                  <span>
                    <span className="block text-lg font-medium text-foreground">
                      Resort near {t.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      About {t.km} km · {t.district} district
                    </span>
                  </span>
                  <Car size={20} className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="px-6 pb-16 md:px-12 lg:px-20">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Distances are straight-line from each town centre; the road route is a little longer. Day picnics run{" "}
          {packages.dayPicnic.hours} — leave early to make the most of the pools and the adventure park.
        </p>
      </section>

      <FaqSection className="bg-secondary/40" />

      <PageCta
        eyebrow="MESWO — Experience the Nature"
        title="Pick a date, we'll do the rest."
        href="/inquiry"
        label="Plan Your Visit"
      />
      <FooterSection />
    </main>
  );
}
