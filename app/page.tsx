import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Valley Sports Arena - Mannargudi Famous Turf | Best Turf in Mannargudi",
  description:
    "Valley Sports Arena is Mannargudi's most famous turf and premier sports destination. FIFA-certified cricket and football ground with 50mm eco-friendly grass. The best turf in Mannargudi for cricket, football, volleyball, and private events. Open 24/7 at Mela Mottai Road, Mannargudi. Mannargudi famous turf for sports enthusiasts.",
  keywords:
    "mannargudi famous turf, famous turf mannargudi, mannargudi turf, turf in mannargudi, mannargudi best turf, best turf in mannargudi, valley sports arena, mannargudi cricket ground, mannargudi football ground, sports arena mannargudi, mannargudi sports, turf booking mannargudi",
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["SportsActivityLocation", "LocalBusiness", "Organization"],
            "name": "Valley Sports Arena",
            "alternateName": "Mannargudi Famous Turf",
            "description":
              "Mannargudi's most famous turf - FIFA-certified cricket and football ground with 50mm eco-friendly grass. Best turf in Mannargudi for sports.",
            "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
            "logo": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
            "url": "https://valleyturf.in",
            "telephone": "+917904831017",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Mela Mottai Road",
              "addressLocality": "Mannargudi",
              "addressRegion": "Tamil Nadu",
              "postalCode": "614001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 10.6667,
              "longitude": 79.45
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            },
            "priceRange": "₹799-₹899",
            "sameAs": [
              "https://valleyturf.in",
              "https://www.google.com/maps/place/Valley+Sports+Arena+(TURF)/@10.6486568,79.4508205,17z/data=!3m1!4b1!4m6!3m5!1s0x3a554d3258815953:0x18743575cf932773!8m2!3d10.6486568!4d79.4508205!16s%2Fg%2F11y096yvkr",
              "https://www.instagram.com/vall.eyturf/"
            ]
          }),
        }}
      />

      <main className="min-h-screen">
        <Header />
        <PromoBanner />
        <HeroSection />
        <FeaturesSection />
        <EventsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
