"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ease, useScrollProgress } from "@/hooks/use-scroll-progress";

const word = "SERENITY";

const sideImages = [
  {
    src: "/images/resort/drone-cottages.jpg",
    alt: "Cottages among the trees, from above",
    position: "left",
    span: 1,
  },
  {
    src: "/images/resort/verandah-river.webp",
    alt: "Verandah overlooking the river",
    position: "left",
    span: 1,
  },
  {
    src: "/images/resort/room-portrait.webp",
    alt: "Hand-painted room",
    position: "right",
    span: 1,
  },
  {
    src: "/images/resort/adventure-sunset-2.webp",
    alt: "Rope course at sunset",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  // 0 → 1 over two screen-heights of scrolling, with inertia
  const scrollProgress = useScrollProgress(sectionRef, (rect, vh) => -rect.top / (vh * 2));

  // Stage 1 (0.02–0.24): fly through the "I" of the video-filled SERENITY
  const zoomProgress = ease((scrollProgress - 0.02) / 0.22);
  const zoom = Math.pow(80, zoomProgress); // 1× → 80×, feels like accelerating in
  const maskOpacity = 1 - ease((zoomProgress - 0.8) / 0.2);
  const introOpacity = 1 - ease(scrollProgress / 0.06);

  // Stage 2: the existing layouts take over once the mask is gone
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.26) / 0.74));
  
  // Smooth interpolations (desktop bento)
  const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
  const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
  const sideWidth = imageProgress * 22; // 0% to 22%
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24; // 0px to 24px
  const gap = imageProgress * 16; // 0px to 16px
  const edgePadding = imageProgress * 16; // 0px to 16px

  // Vertical offset for side columns
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  // Phones: side columns would be slivers, so instead the main photo fades out
  // and the four photos rise into a full-screen 2x2 grid, one after another
  // Order on phones: fly through the word (0–0.24) → video fades (0.28–0.55) → tiles rise (0.34+)
  const mainFade = ease((scrollProgress - 0.28) / 0.27);
  const tileProgress = (index: number) => ease((scrollProgress - 0.34 - index * 0.06) / 0.26);

  // Zoom into the middle of the "I" stem — measured, since it depends on font size
  const iRef = useRef<HTMLSpanElement>(null);
  const [origin, setOrigin] = useState("50% 50%");
  useEffect(() => {
    const measure = () => {
      const el = iRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const parent = el.closest("[data-hero-mask]")?.getBoundingClientRect();
      if (!parent) return;
      setOrigin(`${r.left - parent.left + r.width / 2}px ${r.top - parent.top + r.height * 0.52}px`);
    };
    measure();
    // Letters slide in on load; re-measure once they've landed
    const t = setTimeout(measure, 1400);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Deep-teal layer with white letters, multiplied over the media below: the
  // teal hides the media, the white letters let it show through — so the word
  // is "filled" with the drone footage/photo underneath
  const mask = (
    <div
      aria-hidden="true"
      // The blend must sit on this outer layer: its z-index makes it a stacking
      // context, so a blend on the inner div would only see this empty layer
      className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply motion-reduce:hidden"
      style={{ opacity: maskOpacity, visibility: maskOpacity <= 0.01 ? "hidden" : "visible" }}
    >
      <div
        data-hero-mask
        className="absolute inset-0 flex items-center justify-center bg-[#051515]"
        style={{ transform: `scale(${zoom})`, transformOrigin: origin }}
      >
        <span className="whitespace-nowrap text-[21vw] font-semibold leading-none tracking-tighter text-white">
          {word.split("").map((letter, index) => (
            <span
              key={index}
              ref={letter === "I" ? iRef : undefined}
              className="inline-block animate-[slideUp_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] opacity-0"
              style={{ animationDelay: `${0.15 + index * 0.07}s` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </div>
    </div>
  );

  // Captions around the word — not blended, so they stay crisp white/gold
  const intro = (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center motion-reduce:hidden"
      style={{ opacity: introOpacity }}
    >
      <p className="-translate-y-[13vw] text-[10px] uppercase tracking-[0.4em] text-[#E9A84A] md:text-xs">
        MESWO Riverside Resort · Talod
      </p>
      <p className="translate-y-[13vw] text-[10px] uppercase tracking-[0.35em] text-white/70 md:text-xs">
        Scroll to dive in ↓
      </p>
    </div>
  );

  // Screen-reader / SEO heading (the visible word is decorative)
  const heading = <h1 className="sr-only">Serenity — MESWO Riverside Resort by YUVA</h1>;

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* The sticky photos + their scroll space get their own wrapper so the
          photos unpin before the tagline arrives — otherwise the tagline slid
          up underneath the still-pinned photo grid */}
      <div className="relative">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 isolate h-svh overflow-hidden">
        {heading}
        {mask}
        {intro}
        {isMobile ? (
          <div className="relative h-full w-full">
            {/* Main photo fades out */}
            <div
              className="absolute inset-x-0 top-0 bottom-[60px] overflow-hidden will-change-transform"
              style={{
                opacity: 1 - mainFade,
                transform: `scale(${1 + mainFade * 0.06})`,
              }}
            >
              {/* Phones: the portrait drone clip (cottages → pools from above)
                  fills the letters, then the whole screen. Poster = pools frame. */}
              <Image
                src="/images/resort/hero-pools-mobile.jpg"
                alt="The resort's pools seen from above"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <video
                src="/videos/drone-loop.mp4"
                poster="/images/resort/hero-pools-mobile.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Four photos rise into a 2x2 grid (top padding clears the header) */}
            <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 px-3 pt-20 pb-4">
              {sideImages.map((img, index) => {
                const t = tileProgress(index);
                return (
                  <div
                    key={img.src}
                    className="relative overflow-hidden rounded-2xl will-change-transform"
                    style={{
                      opacity: t,
                      transform: `translate3d(0, ${(1 - t) * 56}px, 0) scale(${0.9 + t * 0.1})`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, paddingTop: `${edgePadding}px`, paddingLeft: `${edgePadding}px`, paddingRight: `${edgePadding}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              {/* Server-rendered first paint doesn't know the screen size yet —
                  CSS picks the phone photo so there's no swap after hydration */}
              <Image
                src="/images/resort/hero-pools-mobile.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover md:hidden"
                priority
              />
              <Image
                src="/images/resort/aerial-1.jpg"
                alt="Aerial view of the resort by the river"
                fill
                sizes="100vw"
                className="hidden object-cover md:block"
                priority
              />
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
        )}
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />
      </div>

      {/* Tagline Section */}
      <div className="px-6 pt-24 pb-20 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-3xl text-center font-display text-4xl leading-[1.1] text-foreground md:text-6xl lg:text-7xl">
          Escape. Relax.
          <br />
          Reconnect.
        </p>
        <p className="mt-4 text-center text-sm uppercase tracking-widest text-muted-foreground md:mt-6">
          MESWO — Experience the Nature
        </p>
      </div>
    </section>
  );
}
