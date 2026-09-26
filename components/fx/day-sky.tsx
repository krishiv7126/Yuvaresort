"use client";

import { useEffect, useRef } from "react";

// Page background that moves through a day as you scroll: dawn → morning →
// midday → golden hour → dusk. The little clock follows the Day Picnic hours
// (9 AM → 6 PM). Styles are written straight to the DOM each frame — no
// React re-render per scroll.

const STOPS: [number, [number, number, number]][] = [
  [0.0, [251, 239, 230]], // dawn peach
  [0.25, [247, 246, 238]], // morning
  [0.5, [236, 246, 244]], // midday, a touch of pool-blue
  [0.75, [250, 236, 211]], // golden hour
  [1.0, [243, 221, 212]], // dusk rose
];

function colorAt(p: number) {
  for (let i = 1; i < STOPS.length; i++) {
    const [p1, c1] = STOPS[i];
    const [p0, c0] = STOPS[i - 1];
    if (p <= p1) {
      const t = (p - p0) / (p1 - p0);
      const c = c0.map((v, k) => Math.round(v + (c1[k] - v) * t));
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
  }
  const last = STOPS[STOPS.length - 1][1];
  return `rgb(${last.join(", ")})`;
}

function timeAt(p: number) {
  // 9:00 AM → 6:00 PM in 10-minute steps
  const minutes = 9 * 60 + Math.round((p * 9 * 60) / 10) * 10;
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = ((h24 + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
}

export function DaySky() {
  const skyRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const sunRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf: number | null = null;
    const update = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (skyRef.current) skyRef.current.style.backgroundColor = colorAt(p);
      if (clockRef.current) clockRef.current.textContent = timeAt(p);
      // Sun travels along a small arc from left to right
      if (sunRef.current) {
        const x = p * 100;
        const y = Math.sin(p * Math.PI) * 100;
        sunRef.current.style.left = `${x}%`;
        sunRef.current.style.bottom = `${y}%`;
      }
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={skyRef} aria-hidden="true" className="fixed inset-0 -z-10 transition-colors duration-700" />

      {/* Day clock — desktop only, it would crowd a phone screen */}
      <div className="pointer-events-none fixed bottom-6 left-6 z-30 hidden items-center gap-3 rounded-full border border-black/5 bg-white/70 py-2 pr-4 pl-3 shadow-sm backdrop-blur-md md:flex">
        <span className="relative block h-5 w-10" aria-hidden="true">
          <span className="absolute inset-x-0 bottom-0 h-px bg-[#0F3434]/20" />
          <span
            ref={sunRef}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#E9A84A] shadow-[0_0_10px_#E9A84A]"
          />
        </span>
        <span className="text-xs text-[#0F3434]/70">
          A day at MESWO ·{" "}
          <span ref={clockRef} className="font-medium tabular-nums text-[#0F3434]">
            9:00 AM
          </span>
        </span>
      </div>
    </>
  );
}
