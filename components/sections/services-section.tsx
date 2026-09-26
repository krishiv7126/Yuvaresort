import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Cake,
  Camera,
  Gem,
  Heart,
  PartyPopper,
  Sprout,
  Tent,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { occasions } from "@/lib/site";

export const occasionIcons: Record<(typeof occasions)[number], LucideIcon> = {
  "Birthday Party": Cake,
  "Anniversary Party": Heart,
  "Pool Party": Waves,
  "Kitty Party": PartyPopper,
  "Corporate Party": Briefcase,
  "Get-Togethers": Users,
  "Wedding Destination": Gem,
  "Pre-Wedding Destination": Camera,
  "Party Plots": Tent,
  Farm: Sprout,
};

export function ServicesSection() {
  return (
    <section id="events" className="bg-background">
      <div className="px-6 pt-16 pb-8 md:px-12 md:pt-28 md:pb-12 lg:px-20">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
          Events &amp; Celebrations
        </p>
        <h2 className="max-w-2xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">
          Celebrate every occasion by the river.
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 px-6 pb-16 md:grid-cols-3 md:gap-4 md:px-12 md:pb-24 lg:grid-cols-5 lg:px-20">
        {occasions.map((occasion) => {
          const Icon = occasionIcons[occasion];
          return (
            <Link
              key={occasion}
              href={`/inquiry?occasion=${encodeURIComponent(occasion)}`}
              className="group flex min-h-32 flex-col justify-between rounded-2xl border border-border p-4 transition-colors hover:border-foreground hover:bg-secondary md:min-h-40 md:p-5"
            >
              <div className="flex items-start justify-between">
                <Icon size={22} strokeWidth={1.5} className="text-foreground" />
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </div>
              <span className="mt-6 text-base font-medium leading-snug text-foreground">
                {occasion}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
