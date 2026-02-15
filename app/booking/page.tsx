"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Header } from "@/components/header"
import { BookingCalendar } from "@/components/booking-calendar"
import { PromoBanner } from "@/components/promo-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { OFFERS_ENABLED } from "@/lib/offer-config"


export default function BookingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <>
        <Header />
        {OFFERS_ENABLED && <PromoBanner />}
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <PromoBanner />
      <div className="min-h-screen py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Book Your Slot</h1>
            <p className="text-muted-foreground">
              Select your preferred date and time to book the turf. Each slot is 60 minutes.
            </p>
          </div>

          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you encounter any issues while booking, please contact us at{" "}
              <a href="tel:+917904831017" className="font-semibold text-primary hover:underline">
                +91 7904831017
              </a>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose your start time and adjust the duration</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingCalendar />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
