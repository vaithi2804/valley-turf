import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Valley Sports Arena - Mannargudi's Grandest Turf | FIFA Certified Cricket & Football Ground",
  description:
    "Book your slot at Valley Sports Arena, Mannargudi's premier FIFA-certified turf with 50mm eco-friendly grass. Perfect for cricket, football, volleyball, and private events. Open 24/7. Located at Mela Mottai Road, Mannargudi, Tamil Nadu. Mannargudi is famous for its sports culture and Valley Sports Arena is the best visiting area for sports enthusiasts.",
  keywords:
    "valley sports arena, valley turf, mannargudi turf, mannargudi famous turf, turf in mannargudi, mannargudi, cricket, football, volleyball, private events, mannargudi cricket, mannargudi football, mannargudi is famous for, mannargudi visiting areas, manargudi turf, manargudi cricket, manargudi football, FIFA certified turf, sports booking, mannargudi sports, best turf in mannargudi, mannargudi attractions, things to do in mannargudi, famous turf mannargudi, mannargudi best turf, sports arena mannargudi, turf booking mannargudi",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
    shortcut: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
  },
  openGraph: {
    title: "Valley Sports Arena - Mannargudi's Grandest Turf",
    description:
      "FIFA-certified turf with 50mm eco-friendly grass. Book cricket, football, volleyball & private event slots 24/7 in Mannargudi.",
    type: "website",
    locale: "en_IN",
    siteName: "Valley Sports Arena",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
        width: 1200,
        height: 630,
        alt: "Valley Sports Arena Logo - Mannargudi's Premier Turf",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valley Sports Arena - Mannargudi's Grandest Turf",
    description:
      "FIFA-certified turf with 50mm eco-friendly grass. Book cricket, football, volleyball & private event slots 24/7 in Mannargudi.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://valleysportsarena.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
