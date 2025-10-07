"use client"

import { useEffect, useState } from "react"
import { Gift, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if offer is still active (until 30-10-2025)
    const offerEndDate = new Date("2025-10-30T23:59:59")
    const now = new Date()

    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem("promoBannerDismissed")

    if (now <= offerEndDate && !dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    localStorage.setItem("promoBannerDismissed", "true")
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="bg-gradient-to-r from-accent via-primary to-accent text-white py-3 px-4 relative animate-in slide-in-from-top duration-500">
      <div className="container mx-auto flex items-center justify-center gap-3 text-center">
        <Gift className="h-5 w-5 flex-shrink-0 animate-bounce" />
        <p className="text-sm md:text-base font-semibold text-balance">
          Opening Offer: Pay for 2 Hours, Play for 3 Hours! Limited Time Only!
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-white hover:bg-white/20"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
