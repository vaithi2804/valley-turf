import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"

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
