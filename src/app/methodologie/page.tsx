import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Methodologie() {
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

        <h1 className="text-3xl font-bold mb-8">Cadre méthodologique et éthique de PERSPECTA</h1>

        <div className="space-y-12">
          {/* SECTION 1 — INTRODUCTION */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                PERSPECTA mesure des mécanismes cognitifs fonctionnels à travers une approche comportementale. 
                L'objectif principal est l'orientation professionnelle et la compréhension des modes de fonctionnement 
                cognitif dans un contexte professionnel.
              </p>
              <p>
                Cette plateforme fournit des indicateurs objectifs sur les préférences cognitives et les patterns 
                de traitement de l'information, sans porter de jugement sur la valeur ou les capacités d'un individu.
              </p>
            </div>
          </section>

          {/* SECTION 2 — QU'EST-CE QU'UNE EMPREINTE COGNITIVE */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">L'empreinte cognitive : un outil de compréhension, pas un jugement</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                L'empreinte cognitive représente un ensemble de patterns de fonctionnement cognitif issus de 
                tests comportementaux et de questionnaires structurés.
              </p>
              <div className="space-y-2">
                <p><strong>Caractéristiques fondamentales :</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Singularité :</strong> Chaque individu présente une combinaison unique de patterns cognitifs</li>
                  <li><strong>Non-fixité :</strong> L'empreinte cognitive évolue avec l'expérience et l'apprentissage</li>
                  <li><strong>Influence contextuelle :</strong> Les résultats peuvent varier selon l'environnement et l'état de la personne</li>
                </ul>
              </div>
              <p>
                Il s'agit d'un instantané du fonctionnement cognitif dans des conditions spécifiques, 
                utile pour comprendre comment une personne traite l'information et prend des décisions.
              </p>
            </div>
          </section>

          {/* SECTION 3 — CE QUE PERSPECTA MESURE */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Ce que PERSPECTA analyse</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>PERSPECTA évalue les dimensions suivantes :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Prise de décision :</strong> Modes de traitement des informations et processus décisionnels</li>
                <li><strong>Vitesse de traitement :</strong> Rapidité d'analyse et de réponse aux stimuli</li>
                <li><strong>Flexibilité cognitive :</strong> Capacité à adapter ses stratégies de pensée</li>
                <li><strong>Gestion de l'interférence :</strong> Maintien de la concentration face aux distractions</li>
                <li><strong>Préférences professionnelles (RIASEC) :</strong> Orientation vers différents types d'environnements de travail</li>
                <li><strong>Valeurs et motivations :</strong> Facteurs intrinsèques influençant l'engagement professionnel</li>
              </ul>
            </div>
          </section>

          {/* SECTION 4 — CE QUE PERSPECTA NE FAIT PAS */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Limites et exclusions explicites</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>PERSPECTA ne constitue pas :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Un diagnostic médical :</strong> Aucune évaluation de pathologies ou troubles neurologiques</li>
                <li><strong>Un test de QI :</strong> Pas de mesure d'intelligence générale ou de capacités intellectuelles</li>
                <li><strong>Une évaluation clinique :</strong> Absence d'analyse psychologique ou psychiatrique</li>
                <li><strong>Un outil de recrutement :</strong> Non conçu pour la sélection ou l'évaluation de candidats</li>
                <li><strong>Une garantie de réussite professionnelle :</strong> Pas de prédiction de succès ou d'échec</li>
                <li><strong>Une vérité absolue sur la personne :</strong> Représentation partielle et contextuelle du fonctionnement</li>
              </ul>
            </div>
          </section>

          {/* SECTION 5 — À QUOI SERT CONCRÈTEMENT LE RAPPORT */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Utilisation recommandée du bilan</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>Le rapport PERSPECTA sert à :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Identifier des environnements professionnels favorables :</strong> Contextes où le fonctionnement cognitif est optimal</li>
                <li><strong>Éviter des contextes cognitivement coûteux :</strong> Situations générant une charge mentale excessive</li>
                <li><strong>Explorer des scénarios d'évolution :</strong> Pistes de développement professionnel et de reconversion</li>
                <li><strong>Mieux comprendre ses modes d'apprentissage :</strong> Stratégies d'acquisition de nouvelles compétences</li>
                <li><strong>Préparer des décisions éclairées :</strong> Choix professionnels dans un contexte de transformation du travail et de l'IA</li>
              </ul>
            </div>
          </section>

          {/* SECTION 6 — LIMITES ET BIAIS */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Limites de l'analyse</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>Les résultats peuvent être influencés par :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>La fatigue :</strong> L'état physique et mental affecte les performances cognitives</li>
                <li><strong>Le stress :</strong> La pression peut modifier les patterns de réponse</li>
                <li><strong>Le matériel utilisé :</strong> Qualité de l'écran, clavier, et environnement de test</li>
                <li><strong>L'importance de la répétition :</strong> Une seule évaluation ne capture pas toute la complexité du fonctionnement</li>
                <li><strong>Le recul temporel :</strong> Les résultats reflètent un état momentané, pas une permanence</li>
                <li><strong>L'imprévisibilité individuelle :</strong> Impossible de prédire un futur professionnel avec certitude</li>
              </ul>
            </div>
          </section>

          {/* SECTION 7 — ÉTHIQUE & CONFIDENTIALITÉ */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Engagement éthique et données</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>PERSPECTA s'engage à :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Respecter le RGPD :</strong> Conformité complète avec la réglementation européenne sur la protection des données</li>
                <li><strong>Ne pas revendre les données personnelles :</strong> Les informations restent strictement confidentielles</li>
                <li><strong>Garantir la suppression :</strong> Possibilité de supprimer ses données et résultats à tout moment</li>
                <li><strong>Assurer l'usage personnel :</strong> Les rapports sont destinés à un usage strictement individuel et confidentiel</li>
              </ul>
            </div>
          </section>

          {/* SECTION 8 — ACCEPTATION DU CADRE */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Acceptation du cadre d'utilisation</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <p className="font-medium">
                  En utilisant PERSPECTA, vous reconnaissez avoir compris que cette analyse est un outil d'aide à la décision professionnelle et non un diagnostic médical ou une promesse de résultat.
                </p>
              </div>
              <p>
                Cette acceptation est nécessaire pour garantir une utilisation éclairée et responsable des résultats 
                fournis par la plateforme.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
