"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { MenuOverlay } from "@/components/menu-overlay";

const navLinks = [
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Experiences", href: "/experiences" },
  { label: "Events", href: "/events" },
];

// Three lines that fold into an X
function MenuIcon({ open }: { open: boolean }) {
  const line = "absolute left-0 h-[2px] w-full rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]";
  return (
    <span className="relative block h-4 w-[22px]" aria-hidden="true">
      <span className={`${line} ${open ? "top-[7px] rotate-45" : "top-0"}`} />
      <span className={`${line} top-[7px] origin-right ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} />
      <span className={`${line} ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`} />
    </span>
  );
}

// `solid` starts the bar in its opaque style — for pages without a dark hero photo
export function Header({ solid = false }: { solid?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(solid);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(solid || window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [solid]);

  const toggleMenu = () => {
    // The reveal grows out of (and shrinks back into) the button itself
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setIsMenuOpen((open) => !open);
  };
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // While the menu is open the bar floats over the dark teal overlay
  const onDark = isMenuOpen || !isScrolled;

  return (
    <>
      {/* Scrim so the light header stays legible over bright hero photos */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 h-24 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-300 pointer-events-none ${isScrolled || isMenuOpen ? "opacity-0" : "opacity-100"}`}
      />

      <MenuOverlay open={isMenuOpen} origin={origin} onClose={closeMenu} />

      <header
        className={`fixed top-4 left-4 right-4 mx-auto max-w-5xl md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[92%] z-50 rounded-full transition-all duration-500 ${!isMenuOpen && isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"}`}
        style={{
          boxShadow: !isMenuOpen && isScrolled ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
        }}
      >
      <div className="flex items-center justify-between gap-4 transition-all duration-300 px-2 pl-5 py-2">
        {/* Logo */}
        <Link
          href="/"
          aria-label={site.fullName}
          onClick={closeMenu}
          className={`-ml-2 flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors duration-500 ${onDark ? "text-white" : "text-foreground"} ${!isScrolled && !isMenuOpen ? "drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" : ""}`}
        >
          <Image src="/logo-badge.png" alt="" width={36} height={36} priority className="h-9 w-9 shrink-0 rounded-full shadow-sm" />
          <span className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold tracking-tight">{site.shortName}</span>
            <span className="text-xs font-medium opacity-70">{site.byline}</span>
          </span>
        </Link>

        {/* Desktop Navigation — only once there's room for all links beside the logo;
            it steps aside while the full-screen menu is open */}
        <nav
          className={`mx-auto hidden items-center gap-6 whitespace-nowrap transition-opacity duration-300 lg:flex xl:gap-8 ${isMenuOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3 lg:ml-0">
          {/* CTA */}
          <Link
            href="/inquiry"
            onClick={closeMenu}
            className={`hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 md:block ${
              isMenuOpen
                ? "bg-[#e9a84a] text-[#0e3a3b] hover:opacity-90"
                : isScrolled
                  ? "bg-foreground text-background hover:opacity-80"
                  : "bg-white text-foreground hover:bg-white/90"
            }`}
          >
            Book Now
          </Link>

          {/* Menu toggle — on every screen size */}
          <button
            ref={buttonRef}
            type="button"
            onClick={toggleMenu}
            className={`group flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ${
              isMenuOpen
                ? "bg-white/10 text-white hover:bg-white/20"
                : isScrolled
                  ? "text-foreground hover:bg-secondary"
                  : "bg-black/25 text-white backdrop-blur-sm hover:bg-black/40"
            }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>
      </div>
      </header>
    </>
  );
}
