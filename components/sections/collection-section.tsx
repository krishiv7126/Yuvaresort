"use client";

import { FadeImage } from "@/components/fade-image";

const accessories = [
  {
    id: 1,
    name: "Poolside Relaxation",
    description: "Unwind by the water, morning or evening",
    price: "[TBD]",
    image: "/images/resort/pool-1.jpg",
  },
  {
    id: 2,
    name: "Riverside Walk",
    description: "A calm stroll along the riverbank",
    price: "[TBD]",
    image: "/images/resort/river-view.jpg",
  },
  {
    id: 3,
    name: "Courtyard Experience",
    description: "Traditional well and courtyard setting",
    price: "[TBD]",
    image: "/images/resort/well-portrait.jpg",
  },
  {
    id: 4,
    name: "Cottage Stay",
    description: "A cosy, hand-painted cottage retreat",
    price: "[TBD]",
    image: "/images/resort/cottage-2.jpg",
  },
  {
    id: 5,
    name: "Sunset by the Water",
    description: "Evenings by the pool as the sun sets",
    price: "[TBD]",
    image: "/images/resort/pool-2.jpg",
  },
  {
    id: 6,
    name: "Nature Trail",
    description: "Open grounds and green surroundings",
    price: "[TBD]",
    image: "/images/resort/well-landscape.jpg",
  },
];

export function CollectionSection() {
  return (
    <section id="experiences" className="bg-background">
      {/* Section Title */}
      <div className="px-6 pt-16 pb-8 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Experiences
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-16 md:pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-4 overflow-x-auto overscroll-x-contain px-6 pb-4 scroll-px-6 md:hidden snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group flex-shrink-0 w-[78vw] max-w-sm snap-start">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-base font-medium text-foreground">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="font-medium text-foreground text-2xl">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
