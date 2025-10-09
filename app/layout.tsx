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
  title: "Valley Sports Arena - Mannargudi's Famous Turf | FIFA Certified Cricket & Football Ground",
  description:
    "Valley Sports Arena is Mannargudi's most famous turf and best sports arena. FIFA-certified turf with 50mm eco-friendly grass. Perfect for cricket, football, volleyball, and private events. Open 24/7. Located at Mela Mottai Road, Mannargudi, Tamil Nadu. The premier turf in Mannargudi for all sports enthusiasts.",
  keywords:
    "valley sports arena, valley turf, mannargudi famous turf, famous turf mannargudi, mannargudi turf, turf in mannargudi, mannargudi best turf, best turf in mannargudi, mannargudi, cricket, football, volleyball, private events, mannargudi cricket, mannargudi football, mannargudi is famous for, mannargudi visiting areas, manargudi turf, manargudi cricket, manargudi football, FIFA certified turf, sports booking, mannargudi sports, mannargudi attractions, things to do in mannargudi, sports arena mannargudi, turf booking mannargudi, famous turf in mannargudi area",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
    shortcut: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
  },
  openGraph: {
    title: "Valley Sports Arena - Mannargudi's Famous Turf",
    description:
      "Mannargudi's most famous turf - FIFA-certified cricket and football ground with 50mm eco-friendly grass. Book cricket, football, volleyball & private event slots 24/7 in Mannargudi. The best turf in Mannargudi.",
    type: "website",
    locale: "en_IN",
    url: "https://valleysportsarena.com",
    siteName: "Valley Sports Arena - Mannargudi Famous Turf",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png",
        width: 1200,
        height: 630,
        alt: "Valley Sports Arena Logo - Mannargudi's Most Famous Turf",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valley Sports Arena - Mannargudi's Famous Turf",
    description:
      "Mannargudi's most famous turf - FIFA-certified cricket and football ground. Book slots 24/7 for cricket, football, volleyball & private events.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0027.PNG-VtZRukuO9aKQpQY9F6Fbf7XCcLFwNr.png"],
    creator: "@valleysportsarena",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://valleysportsarena.com",
  },
  verification: {
    google: "your-google-verification-code",
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
