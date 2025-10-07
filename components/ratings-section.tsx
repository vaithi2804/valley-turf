"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    comment:
      "Best turf in Mannargudi! The FIFA certified grass makes a huge difference. Highly recommended for serious players.",
  },
  {
    name: "Arun Prakash",
    rating: 5,
    comment:
      "Amazing facilities and very well maintained. The 24/7 availability is perfect for our team's practice schedule.",
  },
  {
    name: "Vijay Sethupathi",
    rating: 5,
    comment:
      "Professional quality turf at reasonable prices. The booking system is super easy to use. Great experience!",
  },
]

export function RatingsSection() {
  const [averageRating] = useState(5.0)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What Our Players Say</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-lg text-muted-foreground">{averageRating} out of 5 stars from our happy customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-pretty">"{testimonial.comment}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
