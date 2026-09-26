"use client";

// Small motion toolkit shared by the section pages. Everything is CSS
// transitions triggered by IntersectionObserver — no animation library.

import Image, { type ImageProps } from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useAutoplayInView } from "@/components/sections/videos-section";

export const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

/** True once the element has scrolled into view (stays true). */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "0px 0px -12% 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

type Variant = "up" | "fade" | "left" | "right" | "scale" | "blur";

const hidden: Record<Variant, CSSProperties> = {
  up: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
  fade: { opacity: 0 },
  left: { opacity: 0, transform: "translate3d(-48px, 0, 0)" },
  right: { opacity: 0, transform: "translate3d(48px, 0, 0)" },
  scale: { opacity: 0, transform: "scale(0.9)" },
  blur: { opacity: 0, filter: "blur(12px)", transform: "translate3d(0, 16px, 0)" },
};

/** Fades/slides its children in when scrolled into view. */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 900,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return (
    <Tag
      ref={ref}
      data-reveal
      className={className}
      style={{
        ...(inView ? { opacity: 1, transform: "none", filter: "none" } : hidden[variant]),
        transition: `opacity ${duration}ms ${EASE_OUT} ${delay}ms, transform ${duration}ms ${EASE_OUT} ${delay}ms, filter ${duration}ms ${EASE_OUT} ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/** Headline whose words rise one by one out of a mask. */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 80,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, "0px");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span
            data-reveal
            className="inline-block"
            style={{
              transform: inView ? "translate3d(0,0,0)" : "translate3d(0,110%,0)",
              transition: `transform 1100ms ${EASE_OUT} ${delay + i * stagger}ms`,
            }}
          >
            {word}
            {" "}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Image revealed by a wipe (clip-path) while it settles from a slight zoom. */
export function ClipImage({
  className,
  from = "bottom",
  delay = 0,
  ...img
}: Omit<ImageProps, "className"> & { className?: string; from?: "bottom" | "left" | "right"; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const closed = { bottom: "inset(100% 0 0 0)", left: "inset(0 100% 0 0)", right: "inset(0 0 0 100%)" }[from];
  // The observer watches the outer box: a fully clipped element reports zero
  // visible area, so observing the clipped layer itself would never fire
  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <div
        data-reveal
        className="absolute inset-0 overflow-hidden rounded-[inherit]"
        style={{
          clipPath: inView ? "inset(0 0 0 0)" : closed,
          transition: `clip-path 1300ms cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms`,
        }}
      >
        <Image
          {...img}
          className="object-cover"
          style={{
            transform: inView ? "scale(1)" : "scale(1.25)",
            transition: `transform 1800ms ${EASE_OUT} ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/** Number that counts up from 0 when it scrolls into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
  locale = "en-IN",
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  locale?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic so it slows as it lands
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {prefix}
      {value.toLocaleString(locale)}
      {suffix}
    </span>
  );
}

/** Endless horizontal ticker. Children are rendered twice for a seamless loop. */
export function Marquee({
  children,
  duration = 30,
  reverse = false,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        className="animate-marquee flex w-max"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Moves its child vertically at a different speed than the page. */
export function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // -1 when the element is a screen below the viewport, +1 a screen above
  const progress = useScrollProgress(ref, (rect, vh) => (vh - rect.top) / (vh + rect.height), 0.12);
  const offset = (progress - 0.5) * -2 * speed * 100;
  return (
    <div ref={ref} className={className}>
      <div className="h-full w-full will-change-transform" style={{ transform: `translate3d(0, ${offset}%, 0)` }}>
        {children}
      </div>
    </div>
  );
}

/** Muted looping video that only plays (and downloads) while on screen. */
export function AutoVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplayInView(ref);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={className}
    />
  );
}
