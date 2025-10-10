import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Valley Sports Arena - Mannargudi's Most Famous Turf | Best Turf in Mannargudi",
  description:
    "Valley Sports Arena is Mannargudi's most famous and best turf. FIFA-certified cricket and football ground with 50mm eco-friendly grass. The premier sports destination in Mannargudi for cricket, football, volleyball, and private events. Open 24/7 at Mela Mottai Road, Mannargudi. Book the best turf in Mannargudi today!",
  keywords:
    "mannargudi famous turf, mannargudi best turf, best turf in mannargudi, famous turf mannargudi, mannargudi turf, turf in mannargudi, valley sports arena, mannargudi cricket ground, mannargudi football ground, sports arena mannargudi, mannargudi sports, turf booking mannargudi, mannargudi grandest turf, premier turf mannargudi",
  icons: {
    icon: "/images/design-mode/IMG_0027.PNG.png",
    shortcut: "/images/design-mode/IMG_0027.PNG.png",
    apple: "/images/design-mode/IMG_0027.PNG.png",
  },
  openGraph: {
    title: "Valley Sports Arena - Mannargudi's Most Famous & Best Turf",
    description:
      "Mannargudi's most famous and best turf - FIFA-certified cricket and football ground with 50mm eco-friendly grass. Book slots for cricket, football, volleyball & private events 24/7. The premier sports destination in Mannargudi.",
    type: "website",
    locale: "en_IN",
    url: "https://valleyturf.in",
    siteName: "Valley Sports Arena - Mannargudi's Most Famous Turf",
    images: [
      {
        url: "https://valleyturf.in/images/design-mode/IMG_0027.PNG.png",
        width: 1200,
        height: 630,
        alt: "Valley Sports Arena Logo - Mannargudi's Most Famous and Best Turf",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valley Sports Arena - Mannargudi's Most Famous & Best Turf",
    description:
      "Mannargudi's most famous and best turf - FIFA-certified cricket and football ground. Book slots 24/7 for cricket, football, volleyball & private events.",
    images: ["https://valleyturf.in/images/design-mode/IMG_0027.PNG.png"],
    creator: "@vall.eyturf",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://valleyturf.in",
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness", "SportsActivityLocation"],
              name: "Valley Sports Arena",
              alternateName: ["Mannargudi Famous Turf", "Mannargudi Best Turf", "Best Turf in Mannargudi"],
              description: "Mannargudi's most famous and best turf - FIFA-certified cricket and football ground",
              url: "https://valleyturf.in",
              logo: "https://valleyturf.in/images/design-mode/IMG_0027.PNG.png",
              image: "https://valleyturf.in/images/design-mode/IMG_0027.PNG.png",
              telephone: "+917904831017",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Mela Mottai Road",
                addressLocality: "Mannargudi",
                addressRegion: "Tamil Nadu",
                postalCode: "614001",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.6486568,
                longitude: 79.4508205,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              priceRange: "₹799–₹899",
              sameAs: [
                "https://www.instagram.com/vall.eyturf/",
                "https://www.google.com/maps/place/Valley+Sports+Arena+(TURF)/@10.6486568,79.4508205,17z/data=!3m1!4b1!4m6!3m5!1s0x3a554d3258815953:0x18743575cf932773!8m2!3d10.6486568!4d79.4508205!16s%2Fg%2F11y096yvkr",
                "https://valleyturf.in",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "50",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Rajesh Kumar",
                  },
                  datePublished: "2025-01-15",
                  reviewBody:
                    "Best turf in Mannargudi! Perfect facilities for cricket and football. Highly recommended!",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
