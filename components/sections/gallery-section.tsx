"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [translateX, setTranslateX] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const images = [
    { src: "/images/resort/entrance.webp", alt: "Heritage-style entrance" },
    { src: "/images/resort/aerial-1.jpg", alt: "Aerial view of the resort" },
    { src: "/images/resort/room.webp", alt: "Hand-painted room" },
    { src: "/images/resort/river-view.jpg", alt: "River view" },
    { src: "/images/resort/well-landscape.jpg", alt: "Traditional courtyard and well" },
    { src: "/images/resort/adventure-park.webp", alt: "Adventure park" },
    { src: "/images/resort/cottage-1.jpg", alt: "Cottage exterior" },
    { src: "/images/resort/pool-1.jpg", alt: "Swimming pool" },
    { src: "/images/resort/pool-3.jpg", alt: "Pool with floats" },
    { src: "/images/resort/verandah-river.webp", alt: "Verandah overlooking the river" },
    { src: "/images/resort/aerial-2.jpg", alt: "Aerial view of the resort and river" },
  ];

  // Calculate section height based on content width
  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      // Height = viewport height + the extra scroll needed to reveal all content
      const totalHeight = viewportHeight + (containerWidth - viewportWidth);
      setSectionHeight(`${totalHeight}px`);
    };

    // Mobile browsers fire resize when the URL bar shows/hides; only width
    // changes affect the layout, and recalculating on height changes makes
    // the page jump mid-scroll
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      calculateHeight();
    };

    // Small delay to ensure container is rendered
    const timer = setTimeout(calculateHeight, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateTransform = useCallback(() => {
    if (!galleryRef.current || !containerRef.current) return;
    
    const rect = galleryRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // Total scroll distance needed to reveal all images
    const totalScrollDistance = containerWidth - viewportWidth;
    
    // Current scroll position within this section
    const scrolled = Math.max(0, -rect.top);
    
    // Progress from 0 to 1
    const progress = Math.min(1, scrolled / totalScrollDistance);
    
    // Calculate new translateX
    const newTranslateX = progress * -totalScrollDistance;
    
    setTranslateX(newTranslateX);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransform]);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
  }, [images.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => (current === null ? current : (current + 1) % images.length));
  }, [images.length]);

  // Keyboard controls + lock page scroll while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, showPrev, showNext]);

  return (
    <section 
      id="gallery"
      ref={galleryRef}
      className="relative bg-background"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="flex h-full items-center">
          {/* Horizontal scrolling container */}
          <div 
            ref={containerRef}
            className="flex gap-4 px-6 md:gap-6"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitPerspective: 1000,
              touchAction: 'pan-y',
            }}
          >
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open photo: ${image.alt}`}
                className="relative h-[65svh] w-[82vw] flex-shrink-0 cursor-zoom-in overflow-hidden rounded-2xl md:w-[60vw] lg:w-[45vw]"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index < 3}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={(e) => {
            touchStartXRef.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current === null) return;
            const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
            touchStartXRef.current = null;
            // Swipe left/right to change photos on touch devices
            if (Math.abs(deltaX) > 50) {
              if (deltaX > 0) showPrev();
              else showNext();
            }
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
          >
            <X size={28} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
            className="absolute bottom-4 left-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:bottom-auto md:left-6"
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="relative h-[70svh] w-full max-w-5xl md:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
            className="absolute bottom-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:bottom-auto md:right-6"
          >
            <ChevronRight size={32} />
          </button>

          <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-sm text-white/70 md:bottom-6">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
}
