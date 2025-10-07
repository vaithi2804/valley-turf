import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventsSection } from "@/components/events-section"

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-12">
        <EventsSection />
      </div>
      <Footer />
    </main>
  )
}
