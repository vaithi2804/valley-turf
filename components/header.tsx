"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { user, signOut, isAdmin } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleBookSlotClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      router.push("/auth/signin")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png"
              alt="Valley Sports Arena Logo"
              width={50}
              height={50}
              className="h-12 w-12"
            />
            <span className="text-xl font-bold text-primary">Valley Sports Arena</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Facilities
            </Link>
            {!isAdmin && (
              <Link
                href="/booking"
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                onClick={handleBookSlotClick}
              >
                Book Slot
              </Link>
            )}
            <Link href="/#events" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Events
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Contact
            </Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={() => signOut()} className="cursor-pointer">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>

          <button className="md:hidden cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4">
            <Link
              href="/#features"
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Facilities
            </Link>
            {!isAdmin && (
              <Link
                href="/booking"
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                onClick={(e) => {
                  handleBookSlotClick(e)
                  setMobileMenuOpen(false)
                }}
              >
                Book Slot
              </Link>
            )}
            <Link
              href="/#events"
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent cursor-pointer">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full cursor-pointer"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full cursor-pointer">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
