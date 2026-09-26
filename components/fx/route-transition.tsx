"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Page-to-page transition: a teal circle grows from wherever you clicked,
// the logo shows while the next page loads, then the circle closes to reveal
// it. Same curve as the full-screen menu, so the whole site feels like one app.

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const COVER_MS = 650;
const REVEAL_MS = 700;

// "mount" paints the circle at 0 for one frame so the grow transition runs
type Phase = "idle" | "mount" | "covering" | "covered" | "revealing";

export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState({ x: 0, y: 0, r: 0 });
  const fromPath = useRef(pathname);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intercept same-site link clicks anywhere on the page
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a || a.target || a.hasAttribute("download") || a.closest("#site-menu")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (incl. #anchors and query tweaks) — let it through untouched
      if (url.pathname === window.location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Window capture phase runs before React (App Router mounts React on the
      // document itself), so stopping here keeps <Link> from navigating
      // instantly — we navigate once the circle has covered the screen
      e.preventDefault();
      e.stopPropagation();
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = e.clientX || w / 2;
      const y = e.clientY || h / 2;
      setOrigin({ x, y, r: Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 40 });
      fromPath.current = window.location.pathname;
      setPhase("mount");
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("covering")));
      // Start loading the next page while the circle grows
      router.prefetch(url.pathname);
      setTimeout(() => {
        setPhase("covered");
        router.push(url.pathname + url.search + url.hash);
      }, COVER_MS + 40);
      // Never leave the screen covered if navigation stalls
      safety.current = setTimeout(() => setPhase("revealing"), 5000);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  // New page is in — open the curtain
  useEffect(() => {
    if (phase === "covered" && pathname !== fromPath.current) {
      if (safety.current) clearTimeout(safety.current);
      const raf = requestAnimationFrame(() => setPhase("revealing"));
      return () => cancelAnimationFrame(raf);
    }
  }, [pathname, phase]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => setPhase("idle"), REVEAL_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;

  const open = phase === "covering" || phase === "covered";
  // Cover grows from the click; reveal shrinks into the middle of the screen
  const at = phase === "revealing" ? "at 50% 50%" : `at ${origin.x}px ${origin.y}px`;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0F3434]"
      style={{
        clipPath: open ? `circle(${origin.r}px ${at})` : `circle(0px ${at})`,
        transition: `clip-path ${open ? COVER_MS : REVEAL_MS}ms ${EASE}`,
      }}
    >
      <Image
        src="/logo-badge.png"
        alt=""
        width={72}
        height={72}
        className="h-16 w-16 rounded-full transition-all duration-500"
        style={{ opacity: phase === "covered" ? 1 : 0, transform: phase === "covered" ? "scale(1)" : "scale(0.85)" }}
      />
    </div>
  );
}
