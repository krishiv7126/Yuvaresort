import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SmoothScroll } from '@/components/fx/smooth-scroll'
import { RouteTransition } from '@/components/fx/route-transition'
import { CursorFollower } from '@/components/fx/cursor'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
// Serif for display headings on the section pages (heritage feel)
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-cormorant' });

export const metadata: Metadata = {
  title: 'MESWO Riverside Resort by YUVA | Experience the Nature',
  description: 'Riverside resort near Talod, just 45 minutes from Ahmedabad — day picnics from ₹1,150, Heritage Suite night stays, pools, zip-line and an adventure park, and a venue for birthdays, weddings and corporate parties.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-badge.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <SmoothScroll />
        {children}
        <RouteTransition />
        <CursorFollower />
        {/* Faint film grain over everything (desktop only — it's a full-screen layer) */}
        <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-[70] hidden overflow-hidden md:block" />
        <Analytics />
      </body>
    </html>
  )
}
