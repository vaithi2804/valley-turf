"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Target, Zap, Phone, IndianRupee } from "lucide-react"

export function EventsSection() {
  const [showTournament, setShowTournament] = useState(true)

  useEffect(() => {
    const tournamentEndDate = new Date("2025-10-12T23:59:59")
    const now = new Date()
    setShowTournament(now <= tournamentEndDate)
  }, [])

  if (!showTournament) {
    return (
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Upcoming Events & Tournaments</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Stay tuned for exciting tournaments and events!
            </p>
          </div>
          <p className="text-center text-muted-foreground">More events coming soon! Stay tuned for updates.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Upcoming Events & Tournaments</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join our exciting tournaments and win amazing prizes!
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-2xl md:text-3xl">Cricket Tournament</CardTitle>
              <Badge className="bg-accent text-accent-foreground">October 11-12, 2025</Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              Tournament dates: <span className="font-semibold text-foreground">11th & 12th October 2025</span>
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Prize Pool
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg border-2 border-yellow-400">
                    <p className="text-sm text-muted-foreground mb-1">1st Prize</p>
                    <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">₹5,000</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 p-4 rounded-lg border-2 border-gray-400">
                    <p className="text-sm text-muted-foreground mb-1">2nd Prize</p>
                    <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">₹3,000</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border-2 border-orange-400">
                    <p className="text-sm text-muted-foreground mb-1">3rd Prize</p>
                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">₹2,000</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Special Awards
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Trophy className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-sm font-medium">Best Batsman (Tournament)</span>
                      <p className="text-xs text-muted-foreground">₹1,000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Trophy className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-sm font-medium">Best Bowler (Tournament)</span>
                      <p className="text-xs text-muted-foreground">₹1,000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-sm font-medium">Game Changer (Each Match)</span>
                      <p className="text-xs text-muted-foreground">T-shirt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-sm font-medium">Best Bowler (Each Match)</span>
                      <p className="text-xs text-muted-foreground">T-shirt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-sm font-medium">Best Batsman (Each Match)</span>
                      <p className="text-xs text-muted-foreground">T-shirt</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tournament Conditions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>First 32 teams registered can participate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Only 7 players per team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>4 overs per match with Sixit ball</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>All matches are knockout</span>
                    </li>
                  </ul>
                </div>

                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 w-full">
                  <CardContent className="pt-6 text-center px-6 py-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      
                      <span className="text-base font-semibold text-muted-foreground">Registration Fee</span>
                    </div>
                    <p className="text-5xl font-bold text-primary mb-2">₹100</p>
                    <p className="text-sm text-muted-foreground">per team</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Registration Contact
                </h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="tel:+917904831017" className="text-primary hover:underline font-medium cursor-pointer">
                    7904831017
                  </a>
                  <span className="text-muted-foreground">/</span>
                  <a href="tel:+917904831017" className="text-primary hover:underline font-medium cursor-pointer">
                    7904831017
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground mt-8">More events coming soon! Stay tuned for updates.</p>
      </div>
    </section>
  )
}
