import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Trophy, Users, Clock } from "lucide-react"

const features = [
  {
    icon: Trophy,
    title: "FIFA Certified Grass",
    description: "Premium 50mm eco-friendly turf that meets international FIFA standards for optimal play.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable and environmentally conscious artificial turf that's safe for players and the planet.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Book your slot anytime, day or night. We're open round the clock for your convenience.",
  },
  {
    icon: Users,
    title: "Multi-Sport Facility",
    description:
      "Perfect for Cricket, Football, Volleyball, and Private Events. Professional-grade facilities for all skill levels.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">World-Class Facilities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience the best sports infrastructure in Mannargudi with our state-of-the-art turf and amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm text-pretty">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sports Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src="/cricket-match-on-turf-ground.jpg"
              alt="Cricket at Valley Sports Arena"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white text-xl font-semibold p-6">Cricket Excellence</p>
            </div>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src="/football-match-on-turf-ground.jpg"
              alt="Football at Valley Sports Arena"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white text-xl font-semibold p-6">Football Action</p>
            </div>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src="/volleyball-match-on-turf-ground.jpg"
              alt="Volleyball at Valley Sports Arena"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white text-xl font-semibold p-6">Volleyball Games</p>
            </div>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src="/private-event-celebration-on-sports-turf.jpg"
              alt="Private Events at Valley Sports Arena"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white text-xl font-semibold p-6">Private Events</p>
            </div>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-6">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">Weekdays</p>
                <p className="text-4xl font-bold text-primary">₹799</p>
                <p className="text-sm text-muted-foreground mt-2">per hour</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-accent/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">Weekends</p>
                <p className="text-4xl font-bold text-accent">₹899</p>
                <p className="text-sm text-muted-foreground mt-2">per hour</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
