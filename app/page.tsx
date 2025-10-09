import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Valley Sports Arena - Mannargudi Turf | Famous Turf in Mannargudi",
  description:
    "Valley Sports Arena is Mannargudi's famous turf and best sports arena. FIFA-certified cricket and football ground with 50mm eco-friendly grass. Book slots for cricket, football, volleyball, and private events. Open 24/7 at Mela Mottai Road, Mannargudi.",
  keywords:
    "mannargudi turf, mannargudi famous turf, famous turf in mannargudi, turf in mannargudi, mannargudi best turf, valley sports arena, mannargudi cricket ground, mannargudi football ground, sports arena mannargudi",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <PromoBanner />
      <HeroSection />
      <FeaturesSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
