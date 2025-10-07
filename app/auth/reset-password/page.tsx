"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Lock } from "lucide-react"
import { Header } from "@/components/header"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isForced, setIsForced] = useState(false)
  const { confirmForgotPassword, completeNewPassword } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    // Check if this is a forced password change
    const forced = searchParams.get("forced") === "true"
    setIsForced(forced)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      if (isForced) {
        // Handle forced password change
        const session = sessionStorage.getItem("passwordChangeSession")
        const email = sessionStorage.getItem("passwordChangeEmail")

        if (!session || !email) {
          throw new Error("Session expired. Please sign in again.")
        }

        await completeNewPassword(email, newPassword, session)

        sessionStorage.removeItem("passwordChangeSession")
        sessionStorage.removeItem("passwordChangeEmail")

        toast({
          title: "Success",
          description: "Password changed successfully!",
        })

        router.push("/booking")
      } else {
        // Handle forgot password flow
        const email = sessionStorage.getItem("resetPasswordEmail")

        if (!email) {
          throw new Error("Email not found. Please start the reset process again.")
        }

        await confirmForgotPassword(email, code, newPassword)

        sessionStorage.removeItem("resetPasswordEmail")

        toast({
          title: "Success",
          description: "Password reset successfully! You can now sign in.",
        })

        router.push("/auth/signin")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">{isForced ? "Change Password" : "Reset Password"}</CardTitle>
            <CardDescription>
              {isForced
                ? "You need to change your password before continuing."
                : "Enter the code from your email and your new password."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isForced && (
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : isForced ? "Change Password" : "Reset Password"}
              </Button>
            </form>

            {!isForced && (
              <Link href="/auth/signin" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Sign In
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
