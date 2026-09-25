import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { VideosSection } from "@/components/sections/videos-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PackagesSection } from "@/components/sections/packages-section";
import { AmenitiesListSection } from "@/components/sections/amenities-list-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { LocationSection } from "@/components/sections/location-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <FeaturedProductsSection />
      <TechnologySection />
      <AmenitiesListSection />
      <GallerySection />
      <VideosSection />
      <CollectionSection />
      <PackagesSection />
      <ServicesSection />
      <EditorialSection />
      <TestimonialsSection />
      <LocationSection />
      <FooterSection />
    </main>
  );
}
