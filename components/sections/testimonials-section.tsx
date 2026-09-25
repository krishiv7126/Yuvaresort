"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-6 py-20 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Set on the banks of the Meswo river — just 45 minutes from Ahmedabad — MESWO Riverside Resort is a quiet retreat for those who
          want to slow down — surrounded by open skies, calm water, and green courtyards.
        </p>
      </div>

      {/* About Image */}
      <div className="relative aspect-[4/3] w-full md:aspect-[16/9]">
        <Image
          src="/images/resort/river-view.jpg"
          alt="River view near the resort"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - white at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
