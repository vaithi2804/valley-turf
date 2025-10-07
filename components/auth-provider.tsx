"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { cognitoAuth, type CognitoUser } from "@/lib/cognito"

interface AuthContextType {
  user: CognitoUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ requiresPasswordChange?: boolean; session?: string }>
  signUp: (name: string, email: string, phone: string, password: string) => Promise<void>
  confirmSignUp: (email: string, code: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  confirmForgotPassword: (email: string, code: string, newPassword: string) => Promise<void>
  completeNewPassword: (email: string, newPassword: string, session: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CognitoUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem("cognitoAccessToken")
      if (accessToken) {
        try {
          const userData = await cognitoAuth.getUserFromToken(accessToken)
          setUser(userData)
        } catch (tokenError: any) {
          // Token is invalid or expired
          console.log("[v0] Token validation failed, clearing tokens")
          // Clear invalid tokens but don't set user to null (prevents logout on refresh)
          localStorage.removeItem("cognitoAccessToken")
          localStorage.removeItem("cognitoIdToken")
          localStorage.removeItem("cognitoRefreshToken")
          // Don't throw error - just silently clear tokens
        }
      }
    } catch (error) {
      console.error("[v0] Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await cognitoAuth.signIn(email, password)

      if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
        return {
          requiresPasswordChange: true,
          session: response.session,
        }
      }

      if (response.accessToken) {
        localStorage.setItem("cognitoAccessToken", response.accessToken)
        localStorage.setItem("cognitoIdToken", response.idToken || "")
        localStorage.setItem("cognitoRefreshToken", response.refreshToken || "")

        const userData = await cognitoAuth.getUserFromToken(response.accessToken)
        setUser(userData)
      }

      return {}
    } catch (error) {
      console.error("[v0] Sign in error:", error)
      throw error
    }
  }

  const signUp = async (name: string, email: string, phone: string, password: string) => {
    try {
      const response = await fetch("https://sx8fggh726.execute-api.ap-south-1.amazonaws.com/prod/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Sign up failed")
      }
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  const confirmSignUp = async (email: string, code: string) => {
    try {
      await cognitoAuth.confirmSignUp(email, code)
    } catch (error) {
      console.error("[v0] Confirm sign up error:", error)
      throw error
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await cognitoAuth.forgotPassword(email)
    } catch (error) {
      console.error("[v0] Forgot password error:", error)
      throw error
    }
  }

  const confirmForgotPassword = async (email: string, code: string, newPassword: string) => {
    try {
      await cognitoAuth.confirmForgotPassword(email, code, newPassword)
    } catch (error) {
      console.error("[v0] Confirm forgot password error:", error)
      throw error
    }
  }

  const completeNewPassword = async (email: string, newPassword: string, session: string) => {
    try {
      const response = await cognitoAuth.respondToNewPasswordChallenge(email, newPassword, session)

      if (response.accessToken) {
        localStorage.setItem("cognitoAccessToken", response.accessToken)
        localStorage.setItem("cognitoIdToken", response.idToken || "")
        localStorage.setItem("cognitoRefreshToken", response.refreshToken || "")

        const userData = await cognitoAuth.getUserFromToken(response.accessToken)
        setUser(userData)
      }
    } catch (error) {
      console.error("[v0] Complete new password error:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      localStorage.removeItem("cognitoAccessToken")
      localStorage.removeItem("cognitoIdToken")
      localStorage.removeItem("cognitoRefreshToken")
      setUser(null)
    } catch (error) {
      console.error("[v0] Sign out error:", error)
      throw error
    }
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        confirmSignUp,
        forgotPassword,
        confirmForgotPassword,
        completeNewPassword,
        signOut,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
