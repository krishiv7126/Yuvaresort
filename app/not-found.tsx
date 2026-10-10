import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { site } from "@/lib/site";

// A broken or old link lands here — keep the visitor on the site instead of
// Next's bare black 404
export const metadata: Metadata = { title: "Page not found" };

const shortcuts = [
  { label: "Day picnic & prices", href: "/packages" },
  { label: "Heritage Suite rooms", href: "/rooms" },
  { label: "Birthdays & events", href: "/events" },
  { label: "How to reach", href: "/how-to-reach" },
];

export default function NotFound() {
  return (
    <main className="bg-background">
      <Header solid />
      <section className="px-6 pt-40 pb-24 md:px-12 md:pt-52 lg:px-20">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Page not found</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] text-foreground md:text-7xl">
          This path wandered off by the river.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          The page you were looking for isn&apos;t here. Try one of these, or call us on{" "}
          <a href={site.phoneHref} className="text-foreground underline underline-offset-4">
            {site.phoneDisplay}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-80"
          >
            Back to home
          </Link>
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-full border border-border px-6 py-3 text-base text-foreground transition-colors hover:border-foreground"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
