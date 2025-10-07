"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { ChevronLeft, ChevronRight, Gift, Plus, Minus, AlertCircle, Info, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const timeSlots = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
]

const calculateEndTime = (startTime: string, durationHours: number): string => {
  const [hours, minutes] = startTime.split(":").map(Number)
  const totalMinutes = hours * 60 + minutes + durationHours * 60
  const endHours = Math.floor(totalMinutes / 60) % 24
  const endMinutes = totalMinutes % 60
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`
}

const getRoundedCurrentHour = (): string => {
  const now = new Date()
  const hours = now.getHours()
  return `${String(hours).padStart(2, "0")}:00`
}

const isTimeSlotPast = (slot: string, selectedDate: Date): boolean => {
  const now = new Date()
  const slotDate = new Date(selectedDate)
  const [hours] = slot.split(":").map(Number)
  slotDate.setHours(hours, 0, 0, 0)

  if (selectedDate.toDateString() === now.toDateString()) {
    const currentHour = now.getHours()
    return hours < currentHour
  }

  return selectedDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const openingDate = new Date("2025-10-09")
    const today = new Date()
    return today >= openingDate ? today : openingDate
  })
  const [dateRangeStart, setDateRangeStart] = useState<number>(0)
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [visibleDatesCount, setVisibleDatesCount] = useState<number>(3)
  const [startTime, setStartTime] = useState<string>("")
  const [duration, setDuration] = useState<number>(1)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [nextDayBookedSlots, setNextDayBookedSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [isOfferActive, setIsOfferActive] = useState(false)
  const [maxAvailableDuration, setMaxAvailableDuration] = useState<number>(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const calculateVisibleDates = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleDatesCount(3)
      } else if (width < 1024) {
        setVisibleDatesCount(6)
      } else {
        setVisibleDatesCount(12)
      }
    }

    calculateVisibleDates()
    window.addEventListener("resize", calculateVisibleDates)
    return () => window.removeEventListener("resize", calculateVisibleDates)
  }, [])

  useEffect(() => {
    const dates: Date[] = []
    const openingDate = new Date("2025-10-09")
    const startDate = new Date()

    if (startDate < openingDate) {
      startDate.setTime(openingDate.getTime())
    }

    for (let i = 0; i < visibleDatesCount; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + dateRangeStart + i)
      dates.push(date)
    }
    setAvailableDates(dates)
  }, [dateRangeStart, visibleDatesCount])

  useEffect(() => {
    const offerEndDate = new Date("2025-10-30T23:59:59")
    setIsOfferActive(new Date() <= offerEndDate)
  }, [])

  useEffect(() => {
    fetchBookedSlots()
  }, [selectedDate])

  useEffect(() => {
    if (startTime) {
      calculateMaxDuration()
    }
  }, [startTime, bookedSlots, nextDayBookedSlots])

  const fetchBookedSlots = async () => {
    try {
      const idToken = localStorage.getItem("cognitoIdToken")

      const response = await fetch(
        `https://sx8fggh726.execute-api.ap-south-1.amazonaws.com/prod/bookings?date=${selectedDate.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        const booked: string[] = []
        data.bookings?.forEach((booking: any) => {
          const slots = getSlotsInRange(booking.startTime, booking.endTime)
          booked.push(...slots)
        })
        setBookedSlots(booked)
      }

      const nextDay = new Date(selectedDate)
      nextDay.setDate(nextDay.getDate() + 1)
      const nextDayResponse = await fetch(
        `https://sx8fggh726.execute-api.ap-south-1.amazonaws.com/prod/bookings?date=${nextDay.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      )

      if (nextDayResponse.ok) {
        const nextDayData = await nextDayResponse.json()
        const nextDayBooked: string[] = []
        nextDayData.bookings?.forEach((booking: any) => {
          const slots = getSlotsInRange(booking.startTime, booking.endTime)
          nextDayBooked.push(...slots)
        })
        setNextDayBookedSlots(nextDayBooked)
      }
    } catch (error) {
      console.error("Fetch booked slots error:", error)
    }
  }

  const calculateMaxDuration = () => {
    if (!startTime) return

    const startIdx = timeSlots.indexOf(startTime)
    let maxSlots = 0

    for (let i = 0; i < timeSlots.length; i++) {
      const currentIdx = (startIdx + i) % timeSlots.length
      const currentSlot = timeSlots[currentIdx]

      const isNextDay = currentIdx < startIdx
      const relevantBookedSlots = isNextDay ? nextDayBookedSlots : bookedSlots

      if (relevantBookedSlots.includes(currentSlot)) {
        break
      }
      maxSlots++
    }

    const maxHours = maxSlots * 1
    setMaxAvailableDuration(maxHours)

    if (duration > maxHours) {
      setDuration(maxHours)
    }
  }

  const increaseDuration = () => {
    if (duration < maxAvailableDuration) {
      setDuration(duration + 1)
    }
  }

  const decreaseDuration = () => {
    if (duration > 1) {
      setDuration(duration - 1)
    }
  }

  const calculateBookingDetails = () => {
    if (!startTime || duration === 0) return null

    const endTime = calculateEndTime(startTime, duration)
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6
    const hourlyRate = isWeekend ? 899 : 799

    let totalCost = duration * hourlyRate
    let offerApplied = false

    if (isOfferActive && duration === 3) {
      totalCost = 2 * hourlyRate
      offerApplied = true
    }

    const isOvernight = timeSlots.indexOf(endTime) <= timeSlots.indexOf(startTime) && endTime !== startTime

    return {
      startTime,
      endTime,
      duration,
      totalCost,
      offerApplied,
      isOvernight,
    }
  }

  const bookingDetails = calculateBookingDetails()

  const navigateDates = (direction: "next" | "previous") => {
    if (direction === "next") {
      setDateRangeStart(dateRangeStart + visibleDatesCount)
    } else {
      const newStart = Math.max(0, dateRangeStart - visibleDatesCount)
      setDateRangeStart(newStart)
    }
  }

  const getSlotsInRange = (startTime: string, endTime: string): string[] => {
    const startIdx = timeSlots.indexOf(startTime)
    const endIdx = timeSlots.indexOf(endTime)

    if (startIdx === -1) return []

    const slots: string[] = []

    if (endIdx <= startIdx && endTime !== startTime) {
      for (let i = startIdx; i < timeSlots.length; i++) {
        slots.push(timeSlots[i])
      }
      for (let i = 0; i < endIdx; i++) {
        slots.push(timeSlots[i])
      }
    } else {
      for (let i = startIdx; i < endIdx; i++) {
        slots.push(timeSlots[i])
      }
    }

    return slots
  }

  const getAvailableTimeSlots = () => {
    const openingDate = new Date("2025-10-09")
    const isOpeningDay = selectedDate.toDateString() === openingDate.toDateString()

    return timeSlots.filter((slot) => {
      if (isOpeningDay) {
        const [hours] = slot.split(":").map(Number)
        if (hours < 22) return false
      }

      const isPast = isTimeSlotPast(slot, selectedDate)
      const isBooked = bookedSlots.includes(slot)
      return !isPast && !isBooked
    })
  }

  const availableTimeSlots = getAvailableTimeSlots()

  const handleBooking = async () => {
    if (!startTime || duration === 0 || !bookingDetails) {
      toast({
        title: "Error",
        description: "Please select a start time and duration",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const idToken = localStorage.getItem("cognitoIdToken")

      const response = await fetch("https://sx8fggh726.execute-api.ap-south-1.amazonaws.com/prod/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          startTime: bookingDetails.startTime,
          endTime: bookingDetails.endTime,
          hoursBooked: bookingDetails.duration,
          amountPaid: bookingDetails.totalCost,
          offerApplied: bookingDetails.offerApplied,
          userEmail: user?.email,
          userName: user?.name,
          userPhone: user?.phone,
          isOvernightBooking: bookingDetails.isOvernight,
        }),
      })

      if (response.status === 401) {
        localStorage.removeItem("cognitoAccessToken")
        localStorage.removeItem("cognitoIdToken")
        localStorage.removeItem("cognitoRefreshToken")
        window.location.href = "/auth/signin"
        return
      }

      if (!response.ok) throw new Error("Booking failed")

      setShowSuccessModal(true)
      setStartTime("")
      setDuration(1)
      fetchBookedSlots()
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: "Booking Failed",
        description: "Unable to complete booking. Please contact us at +91 7904831017",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {isOfferActive && (
        <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20 p-4">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-accent flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Opening Offer Active!</p>
              <p className="text-sm text-muted-foreground">Book exactly 3 hours and pay for only 2 hours!</p>
            </div>
          </div>
        </Card>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">Select Date</h3>

        <div className="relative flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 flex-shrink-0 cursor-pointer bg-transparent"
            onClick={() => navigateDates("previous")}
            disabled={dateRangeStart === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {availableDates.map((date, index) => {
              const isSelected = date.toDateString() === selectedDate.toDateString()
              const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
              const dayNumber = date.getDate()
              const monthName = date.toLocaleDateString("en-US", { month: "short" })

              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDate(date)
                    setStartTime("")
                    setDuration(1)
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center p-2.5 rounded-lg border-2 transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-card border-border hover:border-primary/50 hover:shadow-md",
                  )}
                >
                  <span className="text-xs font-medium opacity-80">{dayName}</span>
                  <span className="text-xl font-bold my-0.5">{dayNumber}</span>
                  <span className="text-xs opacity-80">{monthName}</span>
                </button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 flex-shrink-0 cursor-pointer bg-transparent"
            onClick={() => navigateDates("next")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Select Start Time</h3>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Choose start time" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot} className="cursor-pointer">
                    {slot}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-sm text-muted-foreground text-center">No available slots for this date</div>
              )}
            </SelectContent>
          </Select>
        </div>

        {startTime && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseDuration}
                disabled={duration <= 1}
                className="cursor-pointer bg-transparent"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="flex-1 text-center">
                <p className="text-3xl font-bold">{duration}</p>
                <p className="text-sm text-muted-foreground">hours</p>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={increaseDuration}
                disabled={duration >= maxAvailableDuration}
                className="cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {duration >= maxAvailableDuration && maxAvailableDuration < 24 && (
              <Card className="bg-destructive/10 border-destructive/20 p-3 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-destructive">Maximum duration reached</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Next time slot is already booked. Maximum available: {maxAvailableDuration} hours
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      {bookingDetails && (
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 p-6">
          <h4 className="font-semibold mb-4 text-lg">Booking Summary</h4>
          <div className="space-y-3">
            {bookingDetails.isOvernight ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">
                    {new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Time Range:</span>
              <span className="font-bold text-lg">
                {bookingDetails.startTime} - {bookingDetails.endTime}
              </span>
            </div>
            {bookingDetails.isOvernight && (
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <span>This booking crosses midnight into the next day</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{bookingDetails.duration} hours</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-muted-foreground">Total Cost:</span>
              <div className="text-right">
                <span className="font-bold text-2xl text-primary">₹{bookingDetails.totalCost}</span>
                {bookingDetails.offerApplied && (
                  <Badge variant="secondary" className="ml-2 bg-accent text-accent-foreground">
                    <Gift className="h-3 w-3 mr-1" />
                    Offer Applied!
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {bookingDetails && (
        <Card className="bg-info/10 border-info/20 p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Payment Information</p>
              <p className="text-sm text-muted-foreground mt-1">
                You don't need to make payment now. Pay after you play.
              </p>
            </div>
          </div>
        </Card>
      )}

      <Button
        onClick={handleBooking}
        disabled={!startTime || duration === 0 || loading}
        size="lg"
        className="w-full cursor-pointer"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </Button>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              Make sure to be on time. Enjoy your game!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccessModal(false)} className="w-full cursor-pointer">
            Got it!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
