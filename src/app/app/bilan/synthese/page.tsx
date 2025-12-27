"use client"

import { Download, FileSignature, NotebookPen, ShieldCheck } from "lucide-react"

import { ModulePageHeader } from "@/components/module-page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

const sections = [
  {
    title: "Profil & intentions",
    content:
      "Benjamin, 32 ans, professionnel hybride design/produit. Quête : consolider un rôle d'orchestrateur de transformations utiles.",
  },
  {
    title: "Forces & atouts",
    content:
      "Leadership bienveillant, capacité à créer de la clarté, approche systémique, pédagogie naturelle.",
  },
  {
    title: "Points de vigilance",
    content:
      "Veiller à conserver un espace de création et éviter la saturation opérationnelle. Besoin de sens fort.",
  },
]

export default function SyntheseModulePage() {
  return (
    <div className="container py-10 space-y-8">
      <ModulePageHeader
        title="Module Synthèse"
        description="Assemblez vos éléments clés, écrivez votre narration et préparez le document officiel."
        completion={18}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter PDF
            </Button>
            <Button size="sm">
              <FileSignature className="h-4 w-4 mr-2" />
              Créer une version partagée
            </Button>
          </div>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                {section.content}
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardHeader>
              <CardTitle>Conclusion personnalisée</CardTitle>
              <CardDescription>
                Formulez en quelques phrases ce que vous retenez et vos prochaines étapes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Ce que je décide, mes engagements, ce dont j'ai besoin..." />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button>Enregistrer</Button>
              <Button variant="ghost">Prévisualiser</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan d'action</CardTitle>
              <CardDescription>
                Définissez les étapes concrètes pour les 3 prochains mois
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Action" />
                <Input placeholder="Échéance" type="date" />
              </div>
              <Textarea placeholder="Ressources nécessaires, personnes à contacter..." />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Ajouter au plan</Button>
            </CardFooter>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Checklist de publication</CardTitle>
              <CardDescription>Étapes restantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {[
                "Ajouter les mentions légales",
                "Vérifier la synthèse compétences",
                "Relire avec le CEP",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" /> {item}
                </label>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Validation CEP</CardTitle>
              <CardDescription>Prochaine rencontre</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p className="flex items-center gap-2">
                <NotebookPen className="h-4 w-4 text-primary" />
                RDV prévu : 15 janvier 2026
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Document verrouillé après validation
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ressources clés</CardTitle>
              <CardDescription>
                Documents et contacts utiles pour votre projet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                "Modèle de CV adapté",
                "Liste des réseaux professionnels",
                "Contacts CEP"
              ].map(item => (
                <p key={item} className="flex items-center gap-2">
                  <FileSignature className="h-4 w-4 text-primary" />
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historique des versions</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p className="flex items-center gap-2">
                <span className="font-medium">V1.2</span> - 10 déc. 2025
              </p>
              <p>Ajout section compétences transverses</p>
              <p className="flex items-center gap-2">
                <span className="font-medium">V1.1</span> - 5 déc. 2025
              </p>
              <p>Première version partagée avec CEP</p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}
