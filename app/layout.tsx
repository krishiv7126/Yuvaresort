import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { amenities, brandAliases, nearbyCities, packages, seoKeywords, site, siteUrl } from '@/lib/site'
import { SmoothScroll } from '@/components/fx/smooth-scroll'
import { RouteTransition } from '@/components/fx/route-transition'
import { CursorFollower } from '@/components/fx/cursor'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
// Serif for display headings on the section pages (heritage feel)
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-cormorant' });

const description =
  'MESWO Riverside Resort by YUVA — a riverside resort near Talod, just 45 minutes from Ahmedabad and under an hour from Himmatnagar. One day picnic from ₹1,150, Heritage Suite night stays, swimming pools, rain dance, zip-line, adventure park, and a venue for birthdays, weddings and corporate parties.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MESWO Riverside Resort | Resort near Ahmedabad & Himmatnagar',
    template: '%s | MESWO Riverside Resort',
  },
  description,
  keywords: seoKeywords,
  applicationName: site.fullName,
  authors: [{ name: site.fullName }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: site.name,
    title: 'MESWO Riverside Resort | Resort near Ahmedabad & Himmatnagar',
    description,
    images: [{ url: '/images/resort/drone-pools.jpg', alt: 'MESWO Riverside Resort pools from above' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MESWO Riverside Resort | Resort near Ahmedabad & Himmatnagar',
    description,
    images: ['/images/resort/drone-pools.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  other: {
    'geo.region': 'IN-GJ',
    'geo.placename': 'Talod, Gujarat',
    'geo.position': `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-badge.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

// Tells Google this is a real place (a resort) with an address, map pin,
// phone and prices — what powers local results like "resort near Ahmedabad"
const resortSchema = {
  '@context': 'https://schema.org',
  '@type': 'Resort',
  '@id': `${siteUrl}/#resort`,
  name: site.fullName,
  alternateName: [...brandAliases, 'YUVA Resort Talod'],
  description,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: [
    `${siteUrl}/images/resort/drone-pools.jpg`,
    `${siteUrl}/images/resort/room.webp`,
    `${siteUrl}/images/resort/pool-1.jpg`,
  ],
  telephone: site.phoneHref.replace('tel:', ''),
  priceRange: '₹1,150 – ₹5,500',
  currenciesAccepted: 'INR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'At Javanpura, Near Javanpura Check Dam, Prantij Road',
    addressLocality: site.locality,
    addressRegion: site.region,
    postalCode: site.postalCode,
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapsHref,
  areaServed: nearbyCities.map((name) => ({ '@type': 'City', name })),
  checkinTime: '12:00',
  checkoutTime: '10:00',
  numberOfRooms: site.rooms,
  amenityFeature: amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  makesOffer: [
    {
      '@type': 'Offer',
      name: `${packages.dayPicnic.name} (adult)`,
      price: packages.dayPicnic.adult,
      priceCurrency: 'INR',
      description: `${packages.dayPicnic.hours}, ${packages.dayPicnic.includes.toLowerCase()}`,
    },
    {
      '@type': 'Offer',
      name: `${packages.nightStay.name} — Heritage Suite`,
      price: packages.nightStay.perRoom,
      priceCurrency: 'INR',
      description: 'Per room, per night',
    },
  ],
  sameAs: [site.instagramHref, site.mapsHref],
}

// Gives Google the name to show for the site in results ("MESWO Riverside
// Resort" rather than the bare domain)
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: site.name,
  alternateName: [...brandAliases, 'mesworesort.com'],
  url: siteUrl,
  inLanguage: 'en-IN',
  publisher: { '@id': `${siteUrl}/#resort` },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, resortSchema]) }}
        />
        <SmoothScroll />
        {children}
        <RouteTransition />
        <CursorFollower />
        <Analytics />
      </body>
    </html>
  )
}
