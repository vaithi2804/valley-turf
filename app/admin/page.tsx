"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Clock,
  IndianRupee,
  CalendarIcon,
  User,
  Gift,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { signOut } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


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

interface Booking {
  bookingId: string
  userName: string
  userEmail: string
  userPhone: string
  startTime: string
  endTime: string
  hoursBooked: number
  amountPaid: number
  offerApplied: boolean
  status: string
  isAdminBlocked?: boolean
}

interface Analytics {
  totalHours: number
  totalRevenue: number
  totalBookings?: number
  monthYear: string
}

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [dateRangeStart, setDateRangeStart] = useState<number>(0) // Offset from today
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [visibleDatesCount, setVisibleDatesCount] = useState<number>(3)
  const [startTime, setStartTime] = useState<string>("")
  const [duration, setDuration] = useState<number>(1)
  const [customizeAmount, setCustomizeAmount] = useState<boolean>(false)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [nextDayBookedSlots, setNextDayBookedSlots] = useState<string[]>([])
  const [maxAvailableDuration, setMaxAvailableDuration] = useState<number>(0)
  const [todayBookings, setTodayBookings] = useState<Booking[]>([])
  const [analytics, setAnalytics] = useState<Analytics>({
    totalHours: 0,
    totalRevenue: 0,
    totalBookings: 0,
    monthYear: "",
  })
  const [loadingAnalytics, setLoadingAnalytics] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const { toast } = useToast()
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, loading, isAdmin, router])

  useEffect(() => {
    const calculateVisibleDates = () => {
      const width = window.innerWidth
      if (width < 640) {
        // Mobile: 3 dates
        setVisibleDatesCount(3)
      } else if (width < 1024) {
        // Tablet: 6 dates
        setVisibleDatesCount(6)
      } else {
        // Desktop: 12 dates
        setVisibleDatesCount(12)
      }
    }

    calculateVisibleDates()
    window.addEventListener("resize", calculateVisibleDates)
    return () => window.removeEventListener("resize", calculateVisibleDates)
  }, [])

  useEffect(() => {
    const dates: Date[] = []
    for (let i = 0; i < visibleDatesCount; i++) {
      const date = new Date()
      date.setDate(date.getDate() + dateRangeStart + i)
      dates.push(date)
    }
    setAvailableDates(dates)
  }, [dateRangeStart, visibleDatesCount])

  useEffect(() => {
    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
    setSelectedMonth(currentMonth)
  }, [])

  useEffect(() => {
    if (user && isAdmin && selectedMonth) {
      fetchAnalytics()
    }
  }, [user, isAdmin, selectedMonth])

  useEffect(() => {
    if (user && isAdmin) {
      fetchTodayBookings()
    }
  }, [user, isAdmin, selectedDate])

  useEffect(() => {
    fetchBookedSlots()
  }, [selectedDate])

  useEffect(() => {
    if (startTime) {
      calculateMaxDuration()
    }
  }, [startTime, bookedSlots, nextDayBookedSlots])

  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true)
      const idToken = localStorage.getItem("cognitoIdToken")
      const response = await fetch(
        `https://sx8fggh726.execute-api.ap-south-1.amazonaws.com/prod/analytics?month=${selectedMonth}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error("Analytics fetch error:", error)
    } finally {
      setLoadingAnalytics(false)
    }
  }

  const fetchTodayBookings = async () => {
    try {
      const idToken = localStorage.getItem("cognitoIdToken")

      const response = await fetch(
        `https://sx8fggh726.execute-api.ap-south-1.amazonaws.com/prod/bookings?mode=admin&date=${selectedDate.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setTodayBookings(data.bookings || [])
      }
    } catch (error) {
      console.error("Bookings fetch error:", error)
    }
  }

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

      if (response.status === 401) {
        localStorage.removeItem("cognitoAccessToken")
        localStorage.removeItem("cognitoIdToken")
        localStorage.removeItem("cognitoRefreshToken")
        await signOut()
        router.push("/auth/signin")
        return
      }

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
      setDuration(Math.max(1, maxHours))
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
    const isOvernight = timeSlots.indexOf(endTime) <= timeSlots.indexOf(startTime) && endTime !== startTime

    return { startTime, endTime, duration, isOvernight }
  }

  const bookingDetails = calculateBookingDetails()

  const handleAdminBooking = async () => {
    if (!startTime || duration === 0 || !bookingDetails) {
      toast({
        title: "Error",
        description: "Please select a start time and duration",
        variant: "destructive",
      })
      return
    }

    if (customizeAmount && (!customAmount || Number(customAmount) <= 0)) {
      toast({
        title: "Error",
        description: "Please enter a valid custom amount",
        variant: "destructive",
      })
      return
    }

    try {
      const idToken = localStorage.getItem("cognitoIdToken")
      const response = await fetch("https://sx8fggh726.execute-api.ap-south-1.amazonaws.com/prod/admin-block-slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          startTime: bookingDetails.startTime,
          endTime: bookingDetails.endTime,
          action: "block", // Required by admin-block-slot Lambda
          customAmount: customizeAmount ? Number(customAmount) : undefined,
        }),
      })

      if (!response.ok) throw new Error("Booking failed")

      toast({
        title: "Success!",
        description: "Admin booking created successfully",
      })

      setStartTime("")
      setDuration(1)
      setCustomizeAmount(false)
      setCustomAmount("")
      fetchTodayBookings()
      fetchAnalytics() // Refresh analytics after booking
    } catch (error) {
      console.error("Admin booking error:", error)
      toast({
        title: "Booking Failed",
        description: "Unable to create admin booking",
        variant: "destructive",
      })
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const idToken = localStorage.getItem("cognitoIdToken")
      const response = await fetch("https://sx8fggh726.execute-api.ap-south-1.amazonaws.com/prod/bookings/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          bookingId,
        }),
      })

      if (!response.ok) throw new Error("Cancel failed")

      toast({
        title: "Booking Cancelled",
        description: "The booking has been cancelled successfully",
      })

      fetchTodayBookings()
      fetchAnalytics()
      setCancelDialogOpen(false)
      setBookingToCancel(null)
    } catch (error) {
      console.error("Cancel booking error:", error)
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive",
      })
    }
  }

  const openCancelDialog = (bookingId: string) => {
    setBookingToCancel(bookingId)
    setCancelDialogOpen(true)
  }

  const navigateDates = (direction: "next" | "previous") => {
    if (direction === "next") {
      setDateRangeStart(dateRangeStart + visibleDatesCount)
    } else {
      const newStart = Math.max(0, dateRangeStart - visibleDatesCount)
      setDateRangeStart(newStart)
    }
  }

  const getSlotStatus = (slot: string) => {
    if (!bookingDetails) {
      return bookedSlots.includes(slot) ? "booked" : "available"
    }

    const selectedSlots = getSlotsInRange(bookingDetails.startTime, bookingDetails.endTime)
    if (selectedSlots.includes(slot)) return "selected"
    if (bookedSlots.includes(slot)) return "booked"
    return "available"
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage bookings and view analytics</p>
          </div>

          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Month for Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateMonthOptions().map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Booking Hours</CardTitle>
                <Clock className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                {loadingAnalytics ? (
                  <p className="text-2xl font-bold">Loading...</p>
                ) : (
                  <>
                    <p className="text-3xl font-bold">{analytics.totalHours}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {generateMonthOptions().find((m) => m.value === selectedMonth)?.label || "Selected month"}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <IndianRupee className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                {loadingAnalytics ? (
                  <p className="text-2xl font-bold">Loading...</p>
                ) : (
                  <>
                    <p className="text-3xl font-bold">₹{analytics.totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {generateMonthOptions().find((m) => m.value === selectedMonth)?.label || "Selected month"}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Selected Date Bookings</CardTitle>
                <CalendarIcon className="h-5 w-5 text-destructive" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{todayBookings.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create Admin Booking</CardTitle>
              <CardDescription>Book slots for phone reservations or maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                            setCustomizeAmount(false)
                            setCustomAmount("")
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

              <div>
                <h3 className="text-lg font-semibold mb-4">Select Start Time</h3>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Choose start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem
                        key={slot}
                        value={slot}
                        disabled={bookedSlots.includes(slot)}
                        className="cursor-pointer"
                      >
                        {slot} {bookedSlots.includes(slot) ? "(Booked)" : ""}
                      </SelectItem>
                    ))}
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

                  {duration >= maxAvailableDuration && maxAvailableDuration < 24 && maxAvailableDuration > 0 && (
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

              {bookingDetails && (
                <>
                  <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Time Range:</span>
                        <span className="font-bold text-lg">
                          {bookingDetails.startTime} - {bookingDetails.endTime}
                        </span>
                      </div>
                      {bookingDetails.isOvernight && (
                        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                          <AlertCircle className="h-4 w-4" />
                          <span>This booking crosses midnight</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{bookingDetails.duration} hours</span>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="customizeAmount"
                        checked={customizeAmount}
                        onChange={(e) => setCustomizeAmount(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      />
                      <Label htmlFor="customizeAmount" className="cursor-pointer">
                        Customize Amount
                      </Label>
                    </div>

                    {customizeAmount && (
                      <div className="space-y-2">
                        <Label htmlFor="customAmount">Custom Amount (₹)</Label>
                        <Input
                          id="customAmount"
                          type="text" // use text for smooth typing
                          inputMode="numeric" // still brings up numeric keyboard on mobile
                          placeholder="Enter custom amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value.replace(/[^0-9]/g, ""))} // allow only digits
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter the custom amount for this booking. This will be added to the revenue.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
              <Button
                onClick={handleAdminBooking}
                disabled={!startTime || duration === 0}
                size="lg"
                className="w-full cursor-pointer"
              >
                Create Admin Booking
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Bookings for{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardTitle>
              <CardDescription>View and manage bookings for the selected date</CardDescription>
            </CardHeader>
            <CardContent>
              {todayBookings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No bookings for this date</p>
              ) : (
                <div className="space-y-4">
                  {todayBookings.map((booking) => (
                    <Card key={booking.bookingId} className="bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Customer</p>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-primary" />
                              <div>
                                <p className="font-medium">{booking.userName}</p>
                                <p className="text-xs text-muted-foreground">{booking.userPhone}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Time Slot</p>
                            <p className="font-medium">
                              {booking.startTime} - {booking.endTime}
                            </p>
                            <p className="text-xs text-muted-foreground">{booking.hoursBooked} hours</p>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Amount</p>
                            <p className="font-bold text-lg">₹{booking.amountPaid}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            {booking.status === "cancelled" ? (
                              <Badge variant="destructive">Cancelled</Badge>
                            ) : booking.offerApplied ? (
                              <Badge
                                variant="secondary"
                                className="bg-accent text-accent-foreground flex items-center gap-1"
                              >
                                <Gift className="h-3 w-3" />
                                Offer Applied
                              </Badge>
                            ) : (
                              <Badge variant="outline">Active</Badge>
                            )}
                          </div>

                          <div className="flex justify-end">
                            {booking.status !== "cancelled" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openCancelDialog(booking.bookingId)}
                                className="cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone and the customer will be
              notified via email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBookingToCancel(null)} className="cursor-pointer">No, Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => bookingToCancel && handleCancelBooking(bookingToCancel)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
            >
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function generateMonthOptions() {
  const months = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    const monthName = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    months.push({ value: monthYear, label: monthName })
  }
  return months
}
