import Link from "next/link"
import { ArrowLeft, Settings, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ModulePageHeaderProps {
  title: string
  description: string
  completion?: number
  actions?: React.ReactNode
}

export function ModulePageHeader({
  title,
  description,
  completion,
  actions,
}: ModulePageHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary/80">
            <Link
              href="/app"
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 px-3 py-1 text-[11px] text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour
            </Link>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{title}</h1>
            <p className="text-sm text-muted-foreground md:text-base">{description}</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {actions}
            <Button
              variant="outline"
              size="sm"
              className="justify-center whitespace-nowrap sm:min-w-[150px]"
            >
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full border border-border/60 sm:hidden"
            aria-label="Plus d'actions"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {typeof completion === "number" && (
        <Card className="bg-background/70 backdrop-blur">
          <CardContent className="space-y-3 p-4">
            <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>Progression du module</span>
              <span className="font-medium text-foreground">{completion}% accompli</span>
            </div>
            <Progress value={completion} />
          </CardContent>
        </Card>
      )}
    </header>
  )
}
