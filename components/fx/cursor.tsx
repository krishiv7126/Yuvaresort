"use client";

import { useEffect, useRef } from "react";

// Desktop-only follower: over anything marked data-cursor="View" (photos,
// gallery tiles…) a gold disc with that word trails the pointer.
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    let x = -100, y = -100, tx = -100, ty = -100, scale = 0;
    let shown = false;
    let raf = 0;

    const loop = () => {
      // Trail slightly behind the pointer for a soft, weighted feel
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      scale += ((shown ? 1 : 0) - scale) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      shown = !!target;
      if (target) label.textContent = target.dataset.cursor ?? "";
    };
    const onLeave = () => (shown = false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-20 w-20 items-center justify-center rounded-full bg-[#E9A84A] text-xs font-semibold uppercase tracking-widest text-[#0F3434] shadow-lg md:flex"
      style={{ transform: "translate3d(-100px,-100px,0) scale(0)" }}
    >
      <span ref={labelRef} />
    </div>
  );
}
