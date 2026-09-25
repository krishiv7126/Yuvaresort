import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Stay | MESWO Riverside Resort by YUVA",
  description: "Send us your dates and we'll get back to you with availability and rates.",
};

export default function InquiryPage() {
  return (
    <main className="min-h-svh bg-background">
      <header className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <Link href="/" aria-label={site.fullName} className="flex items-baseline gap-1.5 text-foreground">
          <span className="text-lg font-semibold tracking-tight">{site.shortName}</span>
          <span className="text-xs font-medium opacity-70">{site.byline}</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </header>

      <div className="mx-auto max-w-2xl px-6 pt-8 pb-20 md:pt-16 md:pb-28">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
          Book Your Stay
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
          Plan your escape.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Tell us when you&apos;d like to visit and we&apos;ll get back to you with
          availability and rates. Prefer to talk?{" "}
          <a href={site.phoneHref} className="whitespace-nowrap text-foreground underline underline-offset-4">
            Call {site.phoneDisplay}
          </a>
        </p>

        <InquiryForm />
      </div>
    </main>
  );
}
