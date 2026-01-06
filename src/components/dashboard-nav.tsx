"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Route, 
  Briefcase, 
  Star, 
  Brain, 
  FileText,
  Award,
  Target,
  BookOpen
} from "lucide-react"

const navItems = [
  {
    title: "Vue d'ensemble",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Tableau de bord principal"
  },
  {
    title: "Parcours",
    href: "/dashboard/parcours",
    icon: Route,
    description: "Timeline de vie"
  },
  {
    title: "Expériences",
    href: "/dashboard/experiences",
    icon: Briefcase,
    description: "Méthode STAR"
  },
  {
    title: "Valeurs",
    href: "/dashboard/valeurs",
    icon: Star,
    description: "Valeurs professionnelles"
  },
  {
    title: "RIASEC",
    href: "/dashboard/riasec",
    icon: Target,
    description: "Test de personnalité"
  },
  {
    title: "Cognitif",
    href: "/dashboard/cognitive-assessment",
    icon: Brain,
    description: "Évaluation cognitive"
  },
  {
    title: "Certification",
    href: "/dashboard/certification",
    icon: Award,
    description: "Certification pro"
  },
  {
    title: "Projet Pro",
    href: "/dashboard/career-project",
    icon: Target,
    description: "Projet professionnel"
  },
  {
    title: "Formations",
    href: "/dashboard/formations",
    icon: BookOpen,
    description: "Recherche formations"
  },
  {
    title: "Rapport",
    href: "/dashboard/report",
    icon: FileText,
    description: "Synthèse PDF"
  }
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
