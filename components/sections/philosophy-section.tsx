"use client";

import Image from "next/image";
import { useRef } from "react";
import { clamp01, ease, useScrollProgress } from "@/hooks/use-scroll-progress";
import { useIsMobile } from "@/hooks/use-mobile";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // 0 → 1 while the sticky block is pinned, with inertia + easing so the
  // photos glide together instead of tracking every jolt of a touch scroll
  const rawProgress = useScrollProgress(sectionRef, (rect, vh, el) => -rect.top / (el.offsetHeight - vh));
  const progress = ease(rawProgress);

  // Rooms photo comes from the left, pool photo from the right
  const alpineTranslateX = (1 - progress) * -100;
  const forestTranslateX = (1 - progress) * 100;
  // -100% only moves a card its own width; the section's side padding (up to
  // 80px) left a sliver of each photo peeking in at the screen edge before the
  // animation. The extra px offset pushes them fully off-screen at the start.
  const edgePx = (1 - progress) * 96;

  // Title fades out as blocks come together
  // The photos slide in over the middle of the screen, so the title fades out
  // before they reach it. Tied to the raw (un-eased) scroll: the eased value
  // starts slowly, which let a photo edge touch the title while it still showed
  const titleOpacity = 1 - clamp01(rawProgress / (isMobile ? 0.2 : 0.25));

  return (
    <section id="rooms" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-svh flex items-center justify-center">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="font-display text-[14vw] italic leading-[0.9] text-foreground md:text-[11vw] lg:text-[9vw] text-center px-6">
                Stay. Relax. Explore.
              </h2>
            </div>

            {/* Product Grid */}
            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              {/* Alpine Image - comes from left */}
              <div 
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(calc(${alpineTranslateX}% - ${edgePx}px), 0, 0)`,
                  WebkitTransform: `translate3d(calc(${alpineTranslateX}% - ${edgePx}px), 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src="/images/resort/room.webp"
                  alt="Hand-painted room at the resort"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                    Heritage Suites
                  </span>
                </div>
              </div>

              {/* Forest Image - comes from right */}
              <div 
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(calc(${forestTranslateX}% + ${edgePx}px), 0, 0)`,
                  WebkitTransform: `translate3d(calc(${forestTranslateX}% + ${edgePx}px), 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src="/images/resort/pool-1.jpg"
                  alt="Swimming pool at the resort"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                    The Pool
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-16 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            MESWO Riverside Resort by YUVA
          </p>
          <p className="mt-6 font-display text-2xl leading-snug text-foreground/80 text-center md:mt-8 md:text-4xl">
            Set beside the Meswo river, our specially designed Heritage Suites and pools offer a quiet retreat
            surrounded by nature — the perfect place to slow down and unwind.
          </p>
        </div>
      </div>
    </section>
  );
}
