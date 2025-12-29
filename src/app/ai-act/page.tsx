import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AIActPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold mb-8">Conformité au Règlement Européen sur l'Intelligence Artificielle (AI Act)</h1>

        <div className="space-y-12">
          {/* SECTION 1 — INTRODUCTION */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Cette page d'information a pour objectif de vous expliquer de manière transparente 
                comment l'intelligence artificielle est utilisée au sein de la plateforme PERSPECTA.
              </p>
              <p>
                PERSPECTA s'inscrit dans une démarche de transparence totale concernant ses 
                pratiques algorithmiques, conformément aux exigences du Règlement européen sur l'IA.
              </p>
            </div>
          </section>

          {/* SECTION 2 — RÔLE DE L'IA DANS PERSPECTA */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Rôle de l'intelligence artificielle dans PERSPECTA</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Dans PERSPECTA, l'intelligence artificielle est utilisée comme un outil d'assistance 
                pour la synthèse de contenus et la reformulation explicative.
              </p>
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <p className="font-medium mb-2">Fonctions de l'IA :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Synthétiser les résultats des tests cognitifs comportementaux</li>
                  <li>Reformuler les données en langage clair et compréhensible</li>
                  <li>Générer des rapports explicatifs structurés</li>
                  <li>Proposer des pistes de réflexion professionnelles</li>
                </ul>
              </div>
              <p>
                L'intelligence artificielle n'est pas décisionnaire. Les résultats qu'elle produit 
                reposent sur les données que vous fournissez et sur des règles explicites définies 
                par la méthodologie PERSPECTA.
              </p>
            </div>
          </section>

          {/* SECTION 3 — CE QUE L'IA NE FAIT PAS */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Ce que l'IA ne fait pas</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Il est important de comprendre clairement les limites de l'utilisation de l'IA 
                dans PERSPECTA :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Pas de diagnostic médical</strong> : L'IA n'évalue aucune condition médicale ou psychologique</li>
                <li><strong>Pas de test de QI</strong> : L'IA ne mesure aucune forme d'intelligence générale</li>
                <li><strong>Pas d'évaluation clinique</strong> : L'IA ne produit aucune analyse psychologique ou psychiatrique</li>
                <li><strong>Pas de recrutement</strong> : L'IA n'est pas utilisée pour la sélection ou l'évaluation de candidats</li>
                <li><strong>Pas de prédiction de réussite professionnelle</strong> : L'IA ne garantit aucun succès ou échec professionnel</li>
                <li><strong>Pas de décision automatisée</strong> : L'IA ne prend aucune décision qui vous concernant</li>
              </ul>
            </div>
          </section>

          {/* SECTION 4 — SUPERVISION HUMAINE */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Supervision humaine</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                L'intelligence artificielle utilisée dans PERSPECTA fonctionne sous contrôle humain 
                à plusieurs niveaux :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Les algorithmes sont conçus et supervisés par des experts en orientation professionnelle</li>
                <li>Les résultats sont présentés comme des supports de réflexion, pas comme des vérités absolues</li>
                <li>Vous conservez l'entière responsabilité de vos décisions professionnelles</li>
                <li>Les contenus générés peuvent être contestés et corrigés</li>
              </ul>
              <p>
                L'humain reste toujours au centre du processus décisionnel. L'IA n'est qu'un 
                outil d'assistance pour vous aider à mieux comprendre vos propres données.
              </p>
            </div>
          </section>

          {/* SECTION 5 — CATÉGORIE DE RISQUE (AI ACT) */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Catégorie de risque (AI Act)</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Conformément au Règlement européen sur l'intelligence artificielle, PERSPECTA 
                est classé comme un système à risque limité.
              </p>
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <p className="font-medium mb-2">Conséquences de cette classification :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Seules des obligations de transparence s'appliquent</li>
                  <li>Aucun système à haut risque n'est mis en œuvre</li>
                  <li>Pas d'évaluation de conformité complexe requise</li>
                  <li>Pas de surveillance renforcée par des autorités externes</li>
                </ul>
              </div>
              <p>
                Cette classification reflète le fait que l'IA utilisée dans PERSPECTA ne présente 
                pas de risque pour vos droits fondamentaux ou votre sécurité.
              </p>
            </div>
          </section>

          {/* SECTION 6 — DROITS DE L'UTILISATEUR */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Droits de l'utilisateur</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                En tant qu'utilisateur de PERSPECTA, vous disposez de droits spécifiques 
                concernant l'utilisation de l'intelligence artificielle :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Droit à l'information</strong> : Vous êtes informé de manière claire sur l'utilisation de l'IA</li>
                <li><strong>Droit à la suppression des données</strong> : Vous pouvez demander la suppression de vos données et résultats</li>
                <li><strong>Droit à ne pas faire l'objet d'une décision automatisée</strong> : Aucune décision n'est prise par l'IA seule</li>
                <li><strong>Droit à l'explication</strong> : Vous pouvez demander des éclaircissements sur les résultats générés</li>
                <li><strong>Droit à la correction</strong> : Vous pouvez contester les résultats et demander une réévaluation</li>
              </ul>
            </div>
          </section>

          {/* SECTION 7 — CONCLUSION */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Conclusion</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                L'intelligence artificielle dans PERSPECTA est conçue comme un outil d'assistance 
                et non comme une autorité décisionnelle.
              </p>
              <p>
                Notre approche garantit que vous restez maître de vos décisions professionnelles, 
                avec l'IA comme support pour mieux comprendre vos propres données cognitives.
              </p>
              <div className="bg-secondary p-6 rounded-lg border border-border mt-6">
                <p className="font-medium text-center">
                  L'IA vous assiste, vous décidez.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
