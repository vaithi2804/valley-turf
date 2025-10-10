import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Valley Sports Arena - Mannargudi's Most Famous & Best Turf | Premier Sports Ground",
  description:
    "Valley Sports Arena is Mannargudi's most famous turf and the best turf in Mannargudi. FIFA-certified cricket and football ground with 50mm eco-friendly grass. The premier and grandest sports destination in Mannargudi for cricket, football, volleyball, and private events. Open 24/7 at Mela Mottai Road, Mannargudi. Experience the best turf facilities in Mannargudi! Book your slot at Mannargudi's famous turf today.",
  keywords:
    "mannargudi famous turf, mannargudi best turf, best turf in mannargudi, famous turf mannargudi, mannargudi turf, turf in mannargudi, mannargudi grandest turf, valley sports arena, mannargudi cricket ground, mannargudi football ground, premier turf mannargudi, sports arena mannargudi, mannargudi sports, turf booking mannargudi, fifa certified turf mannargudi, top turf mannargudi, mannargudi sports ground, famous sports turf mannargudi",
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
            name: "Valley Sports Arena",
            alternateName: [
              "Mannargudi Famous Turf",
              "Mannargudi Best Turf",
              "Best Turf in Mannargudi",
              "Mannargudi's Grandest Turf",
              "Famous Turf Mannargudi",
              "Top Turf Mannargudi",
            ],
            description:
              "Mannargudi's most famous and best turf - FIFA-certified cricket and football ground with 50mm eco-friendly grass. The premier sports destination in Mannargudi.",
            image: "https://valleyturf.in/logo.png",
            logo: "https://valleyturf.in/logo.png",
            url: "https://valleyturf.in",
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
            priceRange: "₹799-₹899",
            sameAs: [
              "https://www.instagram.com/vall.eyturf/",
              "https://valleyturf.in",
              "https://www.google.com/maps/place/Valley+Sports+Arena+(TURF)/@10.6486568,79.4508205,17z/data=!3m1!4b1!4m6!3m5!1s0x3a554d3258815953:0x18743575cf932773!8m2!3d10.6486568!4d79.4508205!16s%2Fg%2F11y096yvkr",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "50",
              bestRating: "5",
            },
            keywords:
              "mannargudi famous turf, mannargudi best turf, best turf in mannargudi, famous turf mannargudi, top turf mannargudi",
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
