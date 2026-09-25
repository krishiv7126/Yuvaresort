"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The open mobile menu needs a solid bar so the white-on-photo styling doesn't clash
  const isSolid = isScrolled || isMenuOpen;

  return (
    <>
      {/* Scrim so the light header stays legible over bright hero photos */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 h-24 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-300 pointer-events-none ${isScrolled ? "opacity-0" : "opacity-100"}`}
      />
      <header
        className={`fixed top-4 left-4 right-4 mx-auto max-w-5xl md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[92%] z-50 transition-all duration-300 ${isMenuOpen ? "bg-background rounded-2xl" : isScrolled ? "bg-background/80 backdrop-blur-md rounded-full" : "bg-transparent"}`}
        style={{
          boxShadow: isSolid ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
        }}
      >
      <div className="flex items-center justify-between gap-4 transition-all duration-300 px-2 pl-5 py-2">
        {/* Logo */}
        <Link href="/" aria-label={site.fullName} className={`-ml-2 flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors duration-300 ${isSolid ? "text-foreground" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"}`}>
          <Image src="/logo-badge.png" alt="" width={36} height={36} priority className="h-9 w-9 shrink-0 rounded-full shadow-sm" />
          <span className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold tracking-tight">{site.shortName}</span>
            <span className="text-xs font-medium opacity-70">{site.byline}</span>
          </span>
        </Link>

        {/* Desktop Navigation — only once there's room for all links beside the logo */}
        <nav className="mx-auto hidden items-center gap-6 whitespace-nowrap lg:flex xl:gap-8">
          <Link
            href="#rooms"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Rooms
          </Link>
          <Link
            href="#amenities"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Amenities
          </Link>
          <Link
            href="#gallery"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Gallery
          </Link>
          <Link
            href="#experiences"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Experiences
          </Link>
          <Link
            href="#events"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Events
          </Link>
        </nav>

        {/* CTA */}
        <div className="ml-auto hidden shrink-0 items-center gap-6 md:flex lg:ml-0">
          <Link
            href="/inquiry"
            className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${isScrolled ? "bg-foreground text-background hover:opacity-80" : "bg-white text-foreground hover:bg-white/90"}`}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`-mr-1 rounded-full p-2 transition-colors lg:hidden ${isSolid ? "text-foreground" : "bg-black/25 text-white backdrop-blur-sm"}`}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 lg:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            <Link
              href="#rooms"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link
              href="#amenities"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Amenities
            </Link>
            <Link
              href="#gallery"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="#experiences"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Experiences
            </Link>
            <Link
              href="#events"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/inquiry"
              className="mt-4 bg-foreground px-5 py-3 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
      </header>
    </>
  );
}
