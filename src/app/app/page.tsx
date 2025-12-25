"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Brain,
  Briefcase,
  BookUser,
  Compass,
  FileText,
  LineChart,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export default function AppPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        } else {
          router.push("/auth/login")
        }
      } catch (error) {
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/auth/login")
      toast({
        title: "Déconnexion",
        description: "Vous avez été déconnecté avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary/80">
              Programme Bilan de Compétences
            </p>
            <h1 className="text-2xl font-semibold">Espace bénéficiaire</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-muted-foreground">{user?.role}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-10">
        <section className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg shadow-primary/5">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                Votre progression
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Bienvenue, {user?.firstName} !
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                Continuez votre parcours, consolidez vos apprentissages et préparez votre synthèse finale.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="rounded-xl border border-border/60 bg-background/80 p-4">
                <p className="text-muted-foreground">Synthèse prévue</p>
                <p className="text-2xl font-semibold">15 fév.</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/80 p-4">
                <p className="text-muted-foreground">Modules complétés</p>
                <p className="text-2xl font-semibold">3 / 7</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Vue d'ensemble",
              description: "Suivez vos progrès, vos actions en cours et les prochaines étapes",
              icon: LineChart,
              href: "/app/bilan",
              action: "Ouvrir",
              style: "bg-primary text-primary-foreground",
            },
            {
              title: "Parcours",
              description: "Moments clés, apprentissages, frises de vie",
              icon: BookUser,
              href: "/app/bilan/parcours",
              action: "Continuer",
            },
            {
              title: "Expériences",
              description: "Fiches détaillées, preuves, compétences mobilisées",
              icon: Briefcase,
              href: "/app/bilan/experiences",
              action: "Documenter",
            },
            {
              title: "Valeurs",
              description: "Identifiez vos repères non négociables",
              icon: Sparkles,
              href: "/app/bilan/valeurs",
              action: "Explorer",
            },
            {
              title: "Intérêts",
              description: "Cartographiez vos sources d'énergie et motivations",
              icon: Brain,
              href: "/app/bilan/interets",
              action: "Analyser",
            },
            {
              title: "Projets",
              description: "Scénarios réalistes, tests, validations",
              icon: Compass,
              href: "/app/bilan/projets",
              action: "Construire",
            },
            {
              title: "Synthèse",
              description: "Document final, plan d'action, partage CEP",
              icon: FileText,
              href: "/app/bilan/synthese",
              action: "Préparer",
            },
          ].map((module) => (
            <Card
              key={module.title}
              className={`flex flex-col justify-between border-border/70 ${module.style ?? ""}`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <module.icon className="h-5 w-5 opacity-80" />
                  <CardTitle>{module.title}</CardTitle>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant={module.style ? "secondary" : "outline"} className="w-full">
                  <Link href={module.href}>{module.action}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
