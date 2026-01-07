import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Utilisation de l\'IA | PERSPECTA-COMPETENCES',
  description: 'Information sur l\'utilisation de l\'intelligence artificielle'
}

export default function AIDisclosure() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-bold mb-8">Utilisation de l'Intelligence Artificielle</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Systèmes IA utilisés</h2>
            
            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold mb-3">🤖 1. Analyse des Compétences Transférables</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Technologie :</strong> Anthropic Claude 3.5 Haiku</li>
                <li><strong>Usage :</strong> Analyse vos compétences actuelles vs métier cible</li>
                <li><strong>Données traitées :</strong> Expériences professionnelles, compétences déclarées, projet professionnel</li>
                <li><strong>Résultat :</strong> Score de compatibilité (0-100), identification des compétences transférables, gap de compétences avec priorités</li>
                <li><strong>Décision finale :</strong> ✅ Vous restez maître de vos choix de reconversion</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg mb-6 border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-semibold mb-3">🎯 2. Matching Emploi et Formations</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Technologie :</strong> Algorithme propriétaire + API France Travail</li>
                <li><strong>Usage :</strong> Rapprochement de votre profil avec offres d'emploi et formations disponibles</li>
                <li><strong>Résultat :</strong> Liste personnalisée d'opportunités avec score de compatibilité</li>
                <li><strong>Décision finale :</strong> ✅ Vous choisissez les offres à consulter et postuler</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg mb-6 border border-purple-200 dark:border-purple-800">
              <h3 className="text-xl font-semibold mb-3">📄 3. Génération de Rapports</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Technologie :</strong> Anthropic Claude 3.5 Haiku</li>
                <li><strong>Usage :</strong> Synthèse personnalisée de votre bilan de compétences</li>
                <li><strong>Résultat :</strong> Rapport PDF de 50 pages avec recommandations stratégiques</li>
              </ul>
            </div>
          </section>

          <section className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h2 className="text-2xl font-semibold mb-4">⚖️ Vos Droits (IA Act - UE 2024/1689)</h2>
            <ul className="space-y-3 text-sm">
              <li>✅ <strong>Droit à l'information :</strong> Vous êtes informé de l'utilisation de l'IA</li>
              <li>✅ <strong>Droit de refus :</strong> Vous pouvez demander un bilan sans analyse IA (contact support)</li>
              <li>✅ <strong>Droit de contestation :</strong> Vous pouvez contester les résultats de l'IA</li>
              <li>✅ <strong>Droit d'accès :</strong> Vous accédez à toutes vos données traitées</li>
              <li>✅ <strong>Support humain :</strong> Assistance disponible (contact@ia-solution.fr)</li>
              <li>✅ <strong>Contrôle final :</strong> Aucune décision automatisée définitive - vous décidez</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">⚠️ Limites et Précautions</h2>
            <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border border-red-200 dark:border-red-800">
              <ul className="space-y-2 text-sm">
                <li>⚠️ L'IA peut faire des erreurs d'interprétation ou produire des hallucinations</li>
                <li>⚠️ Les recommandations sont <strong>indicatives</strong>, jamais prescriptives</li>
                <li>⚠️ Aucune garantie d'embauche, de succès professionnel ou de résultat</li>
                <li>⚠️ L'IA est un <strong>complément</strong>, pas un remplacement d'un accompagnement humain</li>
                <li>⚠️ Les données sectorielles peuvent ne pas être à jour en temps réel</li>
                <li>⚠️ Le score de compatibilité est une estimation probabiliste, pas une certitude</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">🔒 Sécurité et Confidentialité</h2>
            <ul className="space-y-2 text-sm">
              <li>🔐 Vos données personnelles ne sont jamais utilisées pour entraîner les modèles IA</li>
              <li>🔐 Conformité RGPD : stockage sécurisé, chiffrement, anonymisation</li>
              <li>🔐 Anthropic respecte des accords de confidentialité stricts (DPA) et héberge ses serveurs en Europe</li>
              <li>🔐 Aucune donnée sensible (handicap, santé) transmise à l'IA sans consentement explicite</li>
            </ul>
          </section>

          <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">📋 Classification IA Act</h2>
            <p className="mb-4">
              <strong>PERSPECTA-COMPETENCES est classé comme système IA à RISQUE LIMITÉ</strong> 
              selon le Règlement européen IA Act (UE 2024/1689).
            </p>
            <p className="mb-4">
              <strong>Pourquoi "risque limité" ?</strong>
            </p>
            <ul className="space-y-2 mb-4 text-sm">
              <li>✅ Outil d'orientation professionnelle (impact sur vie des personnes)</li>
              <li>✅ Utilisation d'IA générative pour analyse et recommandations</li>
              <li>❌ PAS de décision automatisée d'embauche (donc pas "risque élevé")</li>
              <li>❌ PAS de notation sociale ou surveillance biométrique</li>
              <li>❌ PAS de manipulation comportementale</li>
            </ul>
            <p className="text-sm">
              En tant que système à risque limité, nous respectons nos <strong>obligations de transparence</strong> 
              et vous garantissons le <strong>contrôle final</strong> sur toutes décisions vous concernant.
            </p>
          </section>

          <section className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">📞 Contact</h2>
            <p className="mb-2">
              Pour toute question sur l'utilisation de l'IA dans PERSPECTA-COMPETENCES :
            </p>
            <ul className="space-y-2 text-sm">
              <li>📧 Email : <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline">contact@ia-solution.fr</a></li>
              <li>📍 IA-SOLUTION, Alès, France</li>
              <li>🕐 Réponse sous 48h (jours ouvrés)</li>
            </ul>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Dernière mise à jour : Janvier 2026 | Conforme IA Act (UE 2024/1689)
          </p>
        </div>
      </div>
    </div>
  )
}
