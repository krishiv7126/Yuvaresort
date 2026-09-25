"use client";

import Image from "next/image";

const specs = [
  { label: "Google Rating", value: "4.4★" },
  { label: "Riverside", value: "Meswo" },
  { label: "Check-in", value: "12 PM" },
  { label: "Check-out", value: "11 AM" },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Newsletter Banner */}
      

      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-10 md:pb-20">
        
        
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-6 text-center even:border-r-0 md:p-8 md:border-b-0 md:even:border-r md:last:border-r-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-3xl md:text-4xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Image */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          src="/images/resort/entrance.webp"
          alt="Heritage-style entrance to the resort"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
