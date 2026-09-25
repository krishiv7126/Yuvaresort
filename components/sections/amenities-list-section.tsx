import {
  Armchair,
  Baby,
  Camera,
  CloudRain,
  Dices,
  Flower2,
  Footprints,
  Mountain,
  MoveDiagonal,
  Music,
  ToyBrick,
  Trees,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { amenities } from "@/lib/site";

export const amenityIcons: Record<(typeof amenities)[number], LucideIcon> = {
  "Swimming pool": Waves,
  "Baby pool": Baby,
  "Rain dance": CloudRain,
  "DJ dance": Music,
  "Zip-line": MoveDiagonal,
  "Adventure activities": Mountain,
  "Outdoor activities": Trees,
  "Team building games": Users,
  "Garden games": Flower2,
  "Indoor games": Dices,
  "Children's play area": ToyBrick,
  "Nature walk": Footprints,
  "Riverside sit-out": Armchair,
  "Photoshoot point": Camera,
};

export function AmenitiesListSection() {
  return (
    <section aria-labelledby="amenities-list" className="bg-background">
      <div className="px-6 pb-16 md:px-12 md:pb-24 lg:px-20">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Amenities &amp; Activities</p>
        <h2 id="amenities-list" className="max-w-2xl text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Something for everyone.
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4 lg:grid-cols-7">
          {amenities.map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <li
                key={amenity}
                className="flex flex-col gap-4 rounded-2xl bg-secondary p-4 md:p-5"
              >
                <Icon size={22} strokeWidth={1.5} className="text-foreground" />
                <span className="text-sm font-medium leading-snug text-foreground">{amenity}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
