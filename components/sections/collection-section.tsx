"use client";

import { FadeImage } from "@/components/fade-image";

const accessories = [
  {
    id: 1,
    name: "Poolside Relaxation",
    description: "Unwind by the water, morning or evening",
    image: "/images/resort/drone-pools.jpg",
  },
  {
    id: 2,
    name: "Riverside Verandah",
    description: "Quiet views over the river",
    image: "/images/resort/verandah-river.webp",
  },
  {
    id: 3,
    name: "Courtyard Experience",
    description: "Traditional well and courtyard setting",
    image: "/images/resort/well-portrait.jpg",
  },
  {
    id: 4,
    name: "Room Stay",
    description: "A cosy, hand-painted room retreat",
    image: "/images/resort/room-portrait.webp",
  },
  {
    id: 5,
    name: "Adventure Park",
    description: "Rope bridges and climbing walls",
    image: "/images/resort/adventure-sunset-1.webp",
  },
  {
    id: 6,
    name: "Sunset Rope Course",
    description: "Evening thrills as the sky turns gold",
    image: "/images/resort/adventure-sunset-2.webp",
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
