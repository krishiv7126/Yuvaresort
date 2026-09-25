import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { FooterSection } from "@/components/sections/footer-section";
import { galleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery | MESWO Riverside Resort by YUVA",
  description:
    "Photos and videos of MESWO Riverside Resort — pools, hand-painted rooms, the adventure park and views over the Meswo river.",
};

const photoCount = galleryItems.filter((i) => i.type === "photo").length;
const videoCount = galleryItems.length - photoCount;

export default function GalleryPage() {
  return (
    <main className="min-h-svh bg-background">
      <Header solid />

      <div className="px-6 md:px-12 lg:px-20">
        {/* Intro */}
        <div className="pt-32 pb-8 md:pt-40 md:pb-12">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
            Gallery
          </p>
          <h1 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-700 md:text-6xl lg:text-7xl">
            Moments at MESWO.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 md:text-lg">
            Pools from above, hand-painted rooms, sunset rope courses and quiet
            evenings by the river — {photoCount} photos and {videoCount} videos.
          </p>
        </div>

        <GalleryGrid />

        {/* Closing call to action */}
        <div className="relative mt-10 mb-16 overflow-hidden rounded-3xl md:mt-16 md:mb-24">
          <Image
            src="/images/resort/aerial-1.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/30 md:bg-gradient-to-r" />
          <div className="relative flex flex-col items-start gap-6 px-6 py-12 text-white md:flex-row md:items-center md:justify-between md:px-12 md:py-16">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">MESWO Riverside Resort</p>
              <p className="mt-3 text-3xl font-medium tracking-tight md:text-5xl">See it in person.</p>
              <p className="mt-2 text-base text-white/80 md:text-lg">Escape. Relax. Reconnect.</p>
            </div>
            <Link
              href="/inquiry"
              className="w-full shrink-0 rounded-full bg-white px-8 py-4 text-center text-base font-medium text-foreground transition-opacity hover:opacity-90 md:w-auto"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
