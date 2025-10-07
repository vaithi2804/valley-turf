"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const address = "Valley Sports Arena (TURF), Mela mottai road, Mannargudi, Tamil Nadu 614001"
  const phoneNumber = "+91 7904831017"
  const mapUrl = "https://maps.app.goo.gl/h1TPzCXGRfst523N9"

  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Get in touch with us for bookings and inquiries
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <a
                        href={`tel:${phoneNumber}`}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {phoneNumber}
                      </a>
                      <p className="text-xs text-muted-foreground mt-2">Call us anytime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Address</h3>
                      <p className="text-muted-foreground text-sm mb-3">{address}</p>
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
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Hours</h3>
                      <p className="text-muted-foreground text-sm">Open 24/7</p>
                      <p className="text-xs text-muted-foreground mt-2">Book anytime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <Card>
              <CardContent className="p-0">
                <div className="h-[400px] md:h-[500px] rounded-lg overflow-hidden">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
