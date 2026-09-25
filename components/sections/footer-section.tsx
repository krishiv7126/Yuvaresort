"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const footerLinks = {
  explore: [
    { label: "Rooms", href: "/#rooms" },
    { label: "Amenities", href: "/#amenities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Experiences", href: "/#experiences" },
    { label: "Events", href: "/#events" },
  ],
  about: [
    { label: "Our Story", href: "#" },
    { label: "Call Us", href: site.phoneHref },
    { label: "Directions", href: site.directionsHref },
    { label: "Policies", href: "#" },
  ],
  service: [
    { label: "FAQ", href: "#" },
    { label: "Booking", href: "/inquiry" },
    { label: "Cancellation", href: "#" },
    { label: "Check-in/out", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-12 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" aria-label={site.fullName} className="inline-block">
              <Image
                src="/logo.png"
                alt={`${site.name} — managed by YUVA`}
                width={128}
                height={128}
                className="h-28 w-28 rounded-full border border-border md:h-32 md:w-32"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A peaceful riverside retreat with pools, rooms, and an adventure park.
            </p>
            <address className="mt-4 max-w-xs text-sm not-italic leading-relaxed text-muted-foreground">
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {site.address}
              </a>
              <br />
              <a href={site.phoneHref} className="mt-2 inline-block py-1 text-foreground hover:opacity-70">
                {site.phoneDisplay}
              </a>
            </address>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Service</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 {site.fullName}. All rights reserved.
          </p>

          

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={site.phoneHref}
              className="py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Call
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              WhatsApp
            </a>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
