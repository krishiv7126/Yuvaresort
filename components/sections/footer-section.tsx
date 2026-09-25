"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { site } from "@/lib/site";

const explore = [
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Experiences", href: "/experiences" },
  { label: "Events", href: "/events" },
];

const linkClass = "text-sm text-muted-foreground transition-colors hover:text-foreground";

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
            <p className="mt-4 text-base font-medium text-foreground">
              MESWO — {site.tagline}.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A peaceful riverside retreat with pools, Heritage Suites and an
              adventure park. {site.fromCity}.
            </p>

            {/* Managed by */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Managed by</span>
              <Image
                src="/yuva-tours-logo.png"
                alt={site.managedBy}
                width={120}
                height={41}
                className="h-8 w-auto md:h-9"
              />
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={site.phoneHref} className={linkClass}>{site.phoneDisplay}</a>
              </li>
              <li>
                <a href={site.phone2Href} className={linkClass}>{site.phone2Display}</a>
              </li>
              <li>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={site.instagramHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.directionsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Stay info */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-4 text-sm font-medium text-foreground">Good to know</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Check-in {site.checkIn} · Check-out {site.checkOut}</li>
              <li>Day picnic 9 AM – 6 PM</li>
              <li>{site.cancellation}</li>
              <li>
                <Link href="/inquiry" className="text-foreground underline underline-offset-4 hover:opacity-70">
                  Book your stay
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <address className="mt-10 max-w-md text-sm not-italic leading-relaxed text-muted-foreground md:mt-12">
          <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            {site.address}
          </a>
        </address>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-xs text-muted-foreground md:text-left">
            © 2026 {site.fullName}. Managed by {site.managedBy}.
          </p>

          <a
            href={site.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram size={16} />@{site.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}
