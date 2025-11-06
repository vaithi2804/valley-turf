"use client"

interface CoachingProgram {
  id: string
  name: string
  image: string
}

const coachingPrograms: CoachingProgram[] = [
  {
    id: "cricket",
    name: "Cricket Training",
    image: "/cricket-training-coaching.jpg",
  },
  {
    id: "football",
    name: "Football Training",
    image: "/football-training-soccer.jpg",
  },
  {
    id: "silambam",
    name: "Silambam Training",
    image: "/silambam-martial-arts-training.jpg",
  },
  {
    id: "archery",
    name: "Archery Training",
    image: "/archery-training-coaching.jpg",
  },
  {
    id: "karate",
    name: "Karate Training",
    image: "/karate-training-kids.jpg",
  },
]

const highlights = [
  "World-class certified coaches",
  "National-level competition opportunities",
  "Admissions open for ages 5+",
]

export function CoachingProgramsSection() {
  return (
    <section id="coaching" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Coaching Programs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Professional training programs conducted by world-class certified coaches with opportunities to compete at
            national levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {coachingPrograms.map((program) => (
            <div
              key={program.id}
              className="relative h-64 md:h-72 rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={program.image || `/placeholder.svg?height=400&width=300&query=${program.name}`}
                alt={program.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg?height=400&width=300&query=${program.name}`
                }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center pb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center text-shadow">{program.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-lg shadow-md border border-primary/20">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Our Coaching Programs?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <p className="text-base text-muted-foreground font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Begin Your Training?</h3>
          <p className="text-muted-foreground mb-4">
            Contact us today to enroll in any of our coaching programs and start your journey with world-class coaches
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+917904831017"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Call Now
            </a>
            <a
              href="/#contact"
              className="inline-block px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  )
}
