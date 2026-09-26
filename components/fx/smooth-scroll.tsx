"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Buttery wheel/trackpad scrolling on desktop. Touch devices keep their
// native scrolling (it already has momentum and feels right).
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    // The menu and gallery viewer lock the page via body overflow — pause
    // Lenis then too, or the page would keep scrolling behind them
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // New page → start at the top (unless we're heading to a #section)
  useEffect(() => {
    if (!window.location.hash) window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
