"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useAutoplayInView } from "@/components/sections/videos-section";
import { galleryCategories, galleryItems, type GalleryItem } from "@/lib/gallery";

const filters = ["All", "Videos", ...galleryCategories] as const;
type Filter = (typeof filters)[number];

function matches(item: GalleryItem, filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Videos") return item.type === "video";
  return item.category === filter;
}

// Fades + lifts a tile into place the first time it scrolls into view.
function Reveal({ index, children }: { index: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-3 break-inside-avoid transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:mb-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0) scale(1)" : "translate3d(0,28px,0) scale(0.97)",
        // Small stagger across neighbouring tiles so a row doesn't pop in at once
        transitionDelay: visible ? `${(index % 4) * 70}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function GridVideo({ item }: { item: Extract<GalleryItem, { type: "video" }> }) {
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplayInView(ref);
  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
  );
}

function Tile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${item.type === "video" ? "video" : "photo"}: ${item.title}`}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-secondary"
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
    >
      {item.type === "video" ? (
        <GridVideo item={item} />
      ) : (
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}

      {/* Caption: always on for touch, revealed on hover for mouse */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 pt-10 text-left transition-opacity duration-300 md:p-4 md:pt-12 md:opacity-0 md:group-hover:opacity-100">
        <p className="text-[10px] uppercase tracking-widest text-white/70 md:text-xs">{item.category}</p>
        <p className="mt-0.5 text-sm font-medium leading-snug text-white md:text-base">{item.title}</p>
      </div>

      {item.type === "video" && (
        <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md md:right-3 md:top-3 md:h-9 md:w-9">
          <Play size={14} className="ml-0.5 fill-current" />
        </span>
      )}
    </button>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const item = items[index];
  const touchStartX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => onIndex((index - 1 + items.length) % items.length), [index, items.length, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % items.length), [index, items.length, onIndex]);

  // Keyboard + lock page scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, prev, next]);

  // Keep the active thumbnail in view
  useEffect(() => {
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 animate-in fade-in-0 duration-300"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white md:px-8 md:py-5">
        <p className="text-sm tabular-nums text-white/70">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
        >
          <X size={24} />
        </button>
      </div>

      {/* Media */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20" onClick={onClose}>
        <div
          key={item.src}
          className="relative h-full w-full animate-in fade-in-0 zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <Image src={item.src} alt={item.title} fill sizes="100vw" priority className="object-contain" />
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous"
          className="absolute left-3 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:block"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next"
          className="absolute right-3 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:block"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Caption + controls */}
      <div className="px-4 pb-4 pt-3 text-center text-white md:pb-5">
        <p className="text-[11px] uppercase tracking-widest text-white/60">{item.category}</p>
        <p className="mt-1 text-base font-medium">{item.title}</p>
        <div className="mt-3 flex items-center justify-center gap-3 md:hidden">
          <button type="button" onClick={prev} aria-label="Previous" className="rounded-full bg-white/10 p-2.5">
            <ChevronLeft size={22} />
          </button>
          <span className="text-xs text-white/50">Swipe to browse</span>
          <button type="button" onClick={next} aria-label="Next" className="rounded-full bg-white/10 p-2.5">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Thumbnails (desktop) */}
      <div
        ref={thumbsRef}
        className="hidden gap-2 overflow-x-auto px-8 pb-6 [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden"
      >
        {items.map((thumb, i) => (
          <button
            key={thumb.src}
            type="button"
            onClick={() => onIndex(i)}
            aria-label={`Show ${thumb.title}`}
            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
              i === index ? "opacity-100 ring-2 ring-white" : "opacity-40 hover:opacity-80"
            }`}
          >
            <Image
              src={thumb.type === "video" ? thumb.poster : thumb.src}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(() => galleryItems.filter((item) => matches(item, filter)), [filter]);
  const counts = useMemo(
    () => Object.fromEntries(filters.map((f) => [f, galleryItems.filter((i) => matches(i, f)).length])),
    []
  );

  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      {/* Filters — a floating capsule pinned under the header while browsing */}
      <div className="pointer-events-none sticky top-[80px] z-30 mb-6 flex justify-center md:top-[88px] md:mb-8">
        <div className="pointer-events-auto max-w-full rounded-full border border-border bg-background p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="flex gap-1 overflow-x-auto rounded-full [mask-image:linear-gradient(to_right,black_calc(100%-28px),transparent)] [scrollbar-width:none] md:[mask-image:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 md:px-5 ${
                  filter === f
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {f}
                <span
                  className={`rounded-full px-1.5 text-[11px] leading-5 tabular-nums ${
                    filter === f ? "bg-background/20 text-background" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry — re-keyed per filter so tiles animate in again */}
      <div key={filter} className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {visible.map((item, i) => (
          <Reveal key={item.src} index={i}>
            <Tile item={item} onOpen={() => setOpenIndex(i)} />
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox items={visible} index={openIndex} onClose={close} onIndex={setOpenIndex} />
      )}
    </>
  );
}
