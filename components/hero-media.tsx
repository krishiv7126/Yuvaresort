"use client";

import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

// Full-bleed hero background: a portrait video on phones (where it fits the
// screen), a photo on wider screens (where the portrait clip would be blurry).
// The video isn't rendered at all on desktop, so it never downloads there.
export function HeroMedia({
  video,
  poster,
  image,
  alt,
  className = "animate-kenburns",
}: {
  video: string;
  poster: string;
  image: string;
  alt: string;
  className?: string;
}) {
  const isMobile = useIsMobile();
  return (
    <>
      <Image src={image} alt={alt} fill priority sizes="100vw" className={`object-cover ${className}`} />
      {isMobile && (
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
}
