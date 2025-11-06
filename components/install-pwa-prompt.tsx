"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

export function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  const forceInstall = params.get("install") === "1"

  const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  if (isIOSDevice) {
    setIsIOS(true)
    setShowPrompt(true)
    return
  }

  const handleBeforeInstallPrompt = async (e: any) => {
    e.preventDefault()
    setDeferredPrompt(e)

    if (forceInstall) {
      // ✅ Immediately show the real native install popup
      e.prompt()
      const { outcome } = await e.userChoice
      if (outcome === "accepted") {
        console.log("PWA installed automatically via ?install=1")
      } else {
        console.log("User dismissed install via ?install=1")
      }
      setShowPrompt(false)
    } else {
      // Normal flow → show your custom React banner
      setShowPrompt(true)
    }
  }

  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

  return () => {
    window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
  }
}, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setDeferredPrompt(null)
      }
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  if (isIOS) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-primary text-white p-4 rounded-lg shadow-lg flex items-start gap-3">
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1">Install Valley Sports Arena</p>
            <p className="text-xs opacity-90">
              Tap the Share button, then select "Add to Home Screen" to install the app.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/20 flex-shrink-0"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-primary text-white p-4 rounded-lg shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <Download className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">Install App</p>
            <p className="text-xs opacity-90">Get instant access to Valley Sports Arena</p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleInstall}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Install
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={handleDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
