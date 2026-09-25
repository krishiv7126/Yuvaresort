"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { label: "Rooms", href: "/#rooms", image: "/images/resort/room.webp" },
  { label: "Amenities", href: "/#amenities", image: "/images/resort/drone-pools.jpg" },
  { label: "Packages", href: "/#packages", image: "/images/resort/pool-trees.jpg" },
  { label: "Gallery", href: "/gallery", image: "/images/resort/aerial-1.jpg" },
  { label: "Experiences", href: "/#experiences", image: "/images/resort/adventure-sunset-2.webp" },
  { label: "Events", href: "/#events", image: "/images/resort/entrance.webp" },
];

// Same curve for the reveal and the text — slow start, fast middle, soft landing
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const REVEAL_MS = 850;

export function MenuOverlay({
  open,
  origin,
  onClose,
}: {
  open: boolean;
  origin: { x: number; y: number };
  onClose: () => void;
}) {
  // `mounted` keeps the overlay in the DOM while it animates closed;
  // `shown` flips a frame after mounting so the opening transition runs
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(0);
  const [radius, setRadius] = useState(0);
  // Respect the OS "reduce motion" setting: open/close instantly
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (open) {
      // Circle big enough to cover the farthest corner from the button
      const w = window.innerWidth;
      const h = window.innerHeight;
      setRadius(Math.hypot(Math.max(origin.x, w - origin.x), Math.max(origin.y, h - origin.y)) + 40);
      setMounted(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const timer = setTimeout(() => setMounted(false), reduceMotion ? 0 : REVEAL_MS);
    return () => clearTimeout(timer);
  }, [open, origin.x, origin.y, reduceMotion]);

  // Esc to close + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  const pathname = usePathname();

  // Same-page section links: release the scroll lock first, then jump there
  // instantly while the closing circle still covers the screen — so the menu
  // shrinks away to reveal the section instead of a long scroll past everything
  const go = (e: MouseEvent, href: string) => {
    const [path, hash] = href.split("#");
    if (hash && (path || "/") === pathname) {
      e.preventDefault();
      document.body.style.overflow = "";
      document.getElementById(hash)?.scrollIntoView({ behavior: "instant", block: "start" });
      history.replaceState(null, "", `#${hash}`);
      onClose();
    } else {
      onClose();
    }
  };

  if (!mounted) return null;

  const at = `at ${origin.x}px ${origin.y}px`;
  // Opening: items follow the reveal in. Closing: they leave quickly, before the circle shrinks.
  const itemStyle = (i: number) => reduceMotion ? {} : ({
    transform: shown ? "translate3d(0,0,0)" : "translate3d(0,110%,0)",
    opacity: shown ? 1 : 0,
    transition: shown
      ? `transform 900ms ${EASE} ${260 + i * 70}ms, opacity 600ms ease ${260 + i * 70}ms`
      : `transform 350ms ${EASE}, opacity 250ms ease`,
  });
  const fadeStyle = (delay: number) => reduceMotion ? {} : ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
    transition: shown
      ? `opacity 700ms ease ${delay}ms, transform 900ms ${EASE} ${delay}ms`
      : "opacity 200ms ease, transform 300ms ease",
  });

  return (
    <div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[45] overflow-hidden bg-[#0e3a3b] text-white"
      style={{
        clipPath: shown ? `circle(${radius}px ${at})` : `circle(0px ${at})`,
        transition: reduceMotion ? "none" : `clip-path ${REVEAL_MS}ms ${EASE}`,
      }}
    >
      {/* Soft glow + river-wave texture so the colour field isn't flat */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(233,168,74,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(56,160,160,0.25),transparent_60%)]" />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col px-6 pt-28 pb-8 md:px-12 md:pt-32 lg:flex-row lg:items-center lg:gap-16 lg:pb-12">
        {/* Links */}
        <nav className="group/menu flex flex-1 flex-col justify-center gap-1 md:gap-2">
          {links.map((link, i) => (
            <div key={link.href} className="overflow-hidden py-1">
              <div style={itemStyle(i)}>
                <Link
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group/link flex items-baseline gap-4 transition-opacity duration-300 group-hover/menu:opacity-40 hover:!opacity-100 focus-visible:!opacity-100 md:gap-6"
                >
                  <span className="w-7 text-xs tabular-nums text-white/50 md:w-9 md:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[2.6rem] font-medium leading-[1.05] tracking-tight md:text-7xl">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={32}
                    className="hidden -translate-x-3 self-center text-[#e9a84a] opacity-0 transition-all duration-500 group-hover/link:translate-x-0 group-hover/link:opacity-100 md:block"
                  />
                </Link>
              </div>
            </div>
          ))}

          {/* Mobile: book button + contact row */}
          <div className="mt-8 flex flex-col gap-5 lg:hidden" style={fadeStyle(620)}>
            <Link
              href="/inquiry"
              onClick={onClose}
              className="rounded-full bg-white py-4 text-center text-base font-medium text-[#0e3a3b]"
            >
              Book Your Stay
            </Link>
            <div className="flex justify-between gap-2 text-sm text-white/75">
              <a href={site.phoneHref} className="flex items-center gap-1.5 py-2">
                <Phone size={16} /> Call
              </a>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 py-2">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={site.directionsHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 py-2">
                <MapPin size={16} /> Directions
              </a>
            </div>
          </div>
        </nav>

        {/* Desktop: photo preview that follows the hovered link */}
        <div className="hidden w-[38%] flex-col gap-6 lg:flex" style={fadeStyle(450)}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            {links.map((link, i) => (
              <Image
                key={link.image}
                src={link.image}
                alt=""
                fill
                sizes="40vw"
                className="object-cover transition-[opacity,transform] duration-700 ease-out"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "scale(1)" : "scale(1.08)",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <p className="absolute bottom-5 left-6 text-sm uppercase tracking-widest text-white/85">
              {links[active].label}
            </p>
          </div>
          <div className="flex items-end justify-between gap-6 text-sm text-white/70">
            <div>
              <p className="text-white">{site.fullName}</p>
              <p className="mt-1">Talod, Gujarat</p>
            </div>
            <a href={site.phoneHref} className="whitespace-nowrap text-white hover:text-[#e9a84a]">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
