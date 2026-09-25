"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Volume2, VolumeX } from "lucide-react";

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

// Play only while on screen so off-screen clips don't burn data/battery.
// preload="none" means nothing downloads until the video is first scrolled to.
// `enabled` re-attaches once a conditionally rendered video actually mounts.
export function useAutoplayInView(videoRef: RefObject<HTMLVideoElement | null>, enabled = true) {
  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;

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
  }, [videoRef, enabled]);
}

function FeaturedTour() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  useAutoplayInView(videoRef);

  // Keep the button in sync when sound is toggled from the native controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => setMuted(video.muted);
    video.addEventListener("volumechange", sync);
    return () => video.removeEventListener("volumechange", sync);
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      // Start from the beginning the first time sound is turned on
      if (video.currentTime > 1 && video.dataset.heard !== "1") video.currentTime = 0;
      video.dataset.heard = "1";
      video.muted = false;
      video.play().catch(() => {});
    } else {
      video.muted = true;
    }
  };

  return (
    <div className="grid items-center gap-8 px-6 pb-12 md:grid-cols-2 md:gap-12 md:px-12 md:pb-20 lg:px-20">
      <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl bg-secondary md:max-w-md">
        <video
          ref={videoRef}
          src="/videos/meswo-tour.mp4"
          poster="/videos/meswo-tour.jpg"
          muted
          loop
          playsInline
          controls
          preload="none"
          aria-label="Video tour of MESWO Riverside Resort"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-2 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/70"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          {muted ? "Sound on" : "Mute"}
        </button>
      </div>

      <div className="md:max-w-md">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
          Resort Tour
        </p>
        <h3 className="text-2xl font-medium tracking-tight text-foreground md:text-4xl">
          Escape. Relax. Reconnect.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Take a walk through MESWO — the riverside, the pools from above, our
          hand-painted rooms, and the green lawns where the day slows down.
        </p>
        <Link
          href="/inquiry"
          className="mt-8 inline-block rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Book Your Stay
        </Link>
      </div>
    </div>
  );
}

function ScrollVideo({ src, poster, title }: (typeof videos)[number]) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayInView(videoRef);

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

      <FeaturedTour />

      {/* Mobile: swipeable row / Desktop: grid */}
      <div className="flex gap-4 overflow-x-auto overscroll-x-contain px-6 pb-16 scroll-px-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-12 md:pb-24 lg:px-20">
        {videos.map((video) => (
          <ScrollVideo key={video.src} {...video} />
        ))}
      </div>
    </section>
  );
}
