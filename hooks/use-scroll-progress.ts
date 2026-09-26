"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

// Ease in and out (smoothstep) — motion accelerates gently and settles softly
export const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

/**
 * Scroll-linked progress with inertia.
 *
 * Touch scrolling reports positions in uneven jumps, so animations tied
 * straight to scrollY look steppy on phones. Here the returned value glides
 * toward the scroll position every frame instead of snapping to it.
 *
 * `compute` maps the element's rect + viewport height to a 0..1 target.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  compute: (rect: DOMRect, viewportHeight: number, el: T) => number,
  smoothing = 0.16,
) {
  const [progress, setProgress] = useState(0);
  const computeRef = useRef(compute);
  computeRef.current = compute;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // With a mouse/trackpad, Lenis (components/fx/smooth-scroll.tsx) already
    // smooths the scroll itself — stacking a second glide on top feels laggy
    const lenisSmoothed = window.matchMedia("(pointer: fine)").matches;
    const factor = reduceMotion ? 1 : lenisSmoothed ? Math.min(1, smoothing * 2.5) : smoothing;

    let current = 0;
    let target = 0;
    let raf: number | null = null;
    let initialized = false;

    const readTarget = () => {
      const el = ref.current;
      if (!el) return;
      target = clamp01(computeRef.current(el.getBoundingClientRect(), window.innerHeight, el));
      // Start at the real position on load (e.g. after a refresh mid-page)
      if (!initialized) {
        current = target;
        initialized = true;
        setProgress(current);
      }
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.0005) {
        current = target;
        raf = null;
      } else {
        current += diff * factor;
        raf = requestAnimationFrame(tick);
      }
      setProgress(current);
    };

    const onScroll = () => {
      readTarget();
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    readTarget();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [ref, smoothing]);

  return progress;
}
