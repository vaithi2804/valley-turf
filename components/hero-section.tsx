import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, Award, Gift } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/football-cricket-turf-field-with-nets-on-all-sides.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-accent/90 text-white px-4 py-2 rounded-full mb-4 animate-bounce">
          <Gift className="h-4 w-4" />
          <span className="text-sm font-semibold">Opening Offer: Pay for 2, Play for 3 Hours!</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Mannargudi's Grandest Turf</h1>
        <p className="text-xl md:text-2xl mb-6 text-balance">Valley Sports Arena</p>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-pretty">
          Experience world-class sports on our 50mm Eco-friendly FIFA Certified Grass. Perfect for cricket and football
          enthusiasts.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Award className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">FIFA Certified</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Clock className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">Open 24/7</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Calendar className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">Easy Booking</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white cursor-pointer">
              Book Your Slot Now
            </Button>
          </Link>
          <Link href="/#contact">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 cursor-pointer"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
