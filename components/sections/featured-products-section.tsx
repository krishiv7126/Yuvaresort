"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    title: "Swimming Pool",
    description: "Leisure",
    image: "/images/resort/pool-3.jpg",
  },
  {
    title: "Heritage Entrance",
    description: "Heritage",
    image: "/images/resort/entrance.webp",
  },
  {
    title: "Riverside Views",
    description: "Location",
    image: "/images/resort/verandah-river.webp",
  },
  {
    title: "Adventure Park",
    description: "Adventure",
    image: "/images/resort/adventure-park.webp",
  },
  {
    title: "Heritage Suites",
    description: "Comfort",
    image: "/images/resort/room.webp",
  },
  {
    title: "Sunset by the Pool",
    description: "Relaxation",
    image: "/images/resort/aerial-2.jpg",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="facilities" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-16 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="font-display text-4xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
          Comfort in Every Corner.
          <br />
          Nature All Around.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
          Facilities
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-2 px-6 pb-12 md:gap-4 md:pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div key={feature.title} className="group">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="py-4 md:py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {feature.description}
              </p>
              <h3 className="text-foreground text-xl font-semibold">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 md:px-12 md:pb-28 lg:px-20">
        
      </div>
    </section>
  );
}
