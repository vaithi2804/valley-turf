"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const address = "Valley Sports Arena (TURF), Mela mottai road, Mannargudi, Tamil Nadu 614001"
  const phone = "+91 7904831017"
  const mapUrl = "https://maps.app.goo.gl/h1TPzCXGRfst523N9"

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Visit us or contact us for bookings and inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href={`tel:${phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {phone}
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">Call us for immediate bookings or inquiries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground mb-3">{address}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(mapUrl, "_blank")}
                      className="cursor-pointer"
                    >
                      Open in Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-muted-foreground">Open 24/7</p>
                    <p className="text-sm text-muted-foreground mt-2">Book your slot anytime, day or night</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-[400px] lg:h-full min-h-[400px] rounded-lg overflow-hidden border-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31368.864288761295!2d79.4508076!3d10.6487145!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a554d3258815953%3A0x18743575cf932773!2sValley%20Sports%20Arena%20(TURF)!5e0!3m2!1sen!2sin!4v1759565660198!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
