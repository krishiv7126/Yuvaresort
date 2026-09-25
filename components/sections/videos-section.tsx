"use client";

import { useEffect, useRef } from "react";

const videos = [
  {
    src: "/videos/rain-pool.mp4",
    poster: "/videos/rain-pool.jpg",
    title: "Rain on the Pool",
  },
  {
    src: "/videos/pool-morning.mp4",
    poster: "/videos/pool-morning.jpg",
    title: "Misty Mornings",
  },
  {
    src: "/videos/riverside-gazebo.mp4",
    poster: "/videos/riverside-gazebo.jpg",
    title: "Riverside Gazebo",
  },
  {
    src: "/videos/pool-rain-2.mp4",
    poster: "/videos/pool-rain-2.jpg",
    title: "Monsoon Days",
  },
];

function ScrollVideo({ src, poster, title }: (typeof videos)[number]) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only while on screen so off-screen clips don't burn data/battery.
  // preload="none" means nothing downloads until the card is first scrolled to.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if the browser blocks autoplay — the poster stays up
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="group w-[70vw] max-w-xs flex-shrink-0 snap-start md:w-auto md:max-w-none">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-secondary">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        <p className="absolute bottom-4 left-4 text-sm font-medium text-white md:bottom-5 md:left-5">
          {title}
        </p>
      </div>
    </div>
  );
}

export function VideosSection() {
  return (
    <section id="moments" className="bg-background">
      {/* Section Title */}
      <div className="px-6 pt-16 pb-8 md:px-12 md:pt-28 md:pb-12 lg:px-20">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
          Moments
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Life at the resort
        </h2>
      </div>

      {/* Mobile: swipeable row / Desktop: grid */}
      <div className="flex gap-4 overflow-x-auto overscroll-x-contain px-6 pb-16 scroll-px-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-12 md:pb-24 lg:px-20">
        {videos.map((video) => (
          <ScrollVideo key={video.src} {...video} />
        ))}
      </div>
    </section>
  );
}
