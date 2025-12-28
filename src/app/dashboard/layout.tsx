"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Home, User, LogOut, Sun, Moon } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("perspecta-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = saved === "dark" || (!saved && prefersDark)
    setDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("perspecta-theme", newMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newMode)
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <nav className="flex h-14 items-center justify-between">
            {/* Logo / App Name */}
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="font-semibold text-lg text-primary">PERSPECTA</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              <Link 
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Accueil</span>
              </Link>
              
              <Link 
                href="/dashboard/profile"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profil</span>
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-primary" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
