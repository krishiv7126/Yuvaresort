import { Car, MapPin, Navigation, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function LocationSection() {
  return (
    <section id="location" className="bg-background">
      <div className="grid gap-8 px-6 pt-16 pb-16 md:grid-cols-5 md:items-center md:gap-12 md:px-12 md:pt-28 md:pb-24 lg:px-20">
        {/* Details */}
        <div className="md:col-span-2">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Location
          </p>
          <h2 className="font-display text-4xl leading-[1.05] text-foreground md:text-6xl">
            Find us by the Meswo river.
          </h2>

          <a
            href={site.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex gap-3 text-base leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
          >
            <MapPin size={20} className="mt-0.5 shrink-0 text-foreground" />
            <span>{site.address}</span>
          </a>
          <p className="mt-3 flex gap-3 text-base text-muted-foreground">
            <Car size={20} className="mt-0.5 shrink-0 text-foreground" />
            {site.fromCity}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-base font-medium text-background transition-opacity hover:opacity-80"
            >
              <Navigation size={18} />
              Get Directions
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 text-base font-medium text-foreground transition-colors hover:border-foreground"
            >
              <Phone size={18} />
              {site.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Also on{" "}
            <a href={site.phone2Href} className="text-foreground underline underline-offset-4">
              {site.phone2Display}
            </a>
          </p>
        </div>

        {/* Map */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary md:col-span-3 md:aspect-[16/10]">
          <iframe
            src={site.mapEmbedSrc}
            title={`Map showing ${site.fullName}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
