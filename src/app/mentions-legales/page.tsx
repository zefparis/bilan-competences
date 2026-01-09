"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MentionsLegales() {
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

        <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">1. Éditeur du site</h2>
            <p className="mb-4">
              Le site PERSPECTA-COMPETENCES est édité par :
            </p>
            <p className="mb-4">
              <strong>ia-solution</strong>, auto-entrepreneur (entreprise individuelle)
            </p>
            <ul className="list-none space-y-1 ml-4">
              <li><strong>SIRET :</strong> 438 055 097</li>
              <li><strong>Siège social :</strong> Alès (30100), Occitanie, France</li>
              <li><strong>Responsable de la publication :</strong> Benjamin Barrere, Fondateur</li>
              <li><strong>Contact :</strong> <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline">contact@ia-solution.fr</a></li>
              <li><strong>Téléphone :</strong> <a href="tel:+33758060556" className="text-primary hover:underline">07 58 06 05 56</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">2. Hébergement</h2>
            <p className="mb-2">
              Le site est hébergé par :
            </p>
            <p className="mb-2">
              <strong>LWS (Line Web Services)</strong>
            </p>
            <ul className="list-none space-y-1 ml-4">
              <li><strong>Adresse :</strong> 10 rue de Penthièvre, 75008 Paris, France</li>
              <li><strong>Téléphone :</strong> 01 77 62 30 03</li>
              <li><strong>Site web :</strong> <a href="https://www.lws.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.lws.fr</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">3. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble du contenu de ce site (textes, images, graphismes, logos, algorithmes, bases de données) 
              est la propriété exclusive de ia-solution, protégé par :
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Les <strong>brevets français</strong> FR2514274, FR2514546, FR2515560 (en cours d'examen)</li>
              <li>Le droit d'auteur (Code de la propriété intellectuelle)</li>
              <li>Les droits de propriété industrielle</li>
            </ul>
            <p className="mb-4">
              Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, 
              par quelque procédé que ce soit, est strictement interdite sans autorisation écrite préalable de ia-solution.
            </p>
            <p>
              Les violations sont passibles de sanctions civiles et pénales conformément aux articles L.335-2 
              et suivants du Code de la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">4. Données personnelles et conformité RGPD</h2>
            <p className="mb-4">
              Le traitement des données personnelles collectées sur ce site est conforme au <strong>Règlement Général 
              sur la Protection des Données (RGPD)</strong> et à la loi Informatique et Libertés.
            </p>
            <ul className="list-none space-y-1 ml-4 mb-4">
              <li><strong>Responsable du traitement :</strong> ia-solution (SIRET 438 055 097)</li>
              <li><strong>Finalités :</strong> Gestion des évaluations professionnelles, authentification, relations commerciales</li>
              <li><strong>Droits :</strong> Accès, rectification, effacement, limitation, portabilité, opposition</li>
            </ul>
            <p>
              Pour exercer vos droits : <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline">contact@ia-solution.fr</a> ou <a href="tel:+33758060556" className="text-primary hover:underline">07 58 06 05 56</a>
            </p>
            <p className="mt-2">
              Voir notre <Link href="/politique-confidentialite" className="text-primary hover:underline">Politique de Confidentialité</Link> pour plus de détails.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Nature du service et distinction réglementaire
            </h2>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                ⚖️ Clarification réglementaire importante
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                PERSPECTA-COMPETENCES est un <strong>outil d'auto-évaluation professionnelle et d'orientation</strong>. 
                Il ne constitue <strong>pas un bilan de compétences</strong> au sens des articles L6313-1 et suivants 
                du Code du travail.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Différences avec un bilan de compétences certifié
            </h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Critère
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      PERSPECTA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Bilan certifié
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">Certification</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">❌ Non certifié Qualiopi</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">✅ Certifié Qualiopi obligatoire</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">Financement CPF</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">❌ Non éligible</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">✅ Éligible (jusqu'à 3 000€)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">Accompagnement</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">🤖 Analyse IA + support humain</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">👤 Conseiller certifié obligatoire</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">Durée</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">⚡ Immédiat (1-2h)</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">📅 24h réglementaires minimum</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">Prix</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">💰 49€</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">💰💰 1 500 - 3 000€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Pour accéder à un bilan de compétences certifié et éligible CPF, consultez la plateforme officielle 
              <a 
                href="https://www.moncompteformation.gouv.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
              >
                Mon Compte Formation
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">6. Conformité AI Act (UE 2024/1689)</h2>
            <p className="mb-4">
              Les systèmes d'IA utilisés sur cette plateforme sont développés conformément au <strong>Règlement 
              européen sur l'Intelligence Artificielle</strong>.
            </p>
            <ul className="list-none space-y-1 ml-4 mb-4">
              <li><strong>Classification :</strong> Système d'IA à risque limité (transparence)</li>
              <li><strong>Mesures :</strong> Information des utilisateurs, explicabilité des décisions, supervision humaine</li>
            </ul>
            <p>
              Documentation détaillée disponible dans notre <Link href="/ai-disclosure" className="text-primary hover:underline">Notice d'Utilisation de l'IA</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">7. Cookies et traceurs</h2>
            <p className="mb-2">
              Ce site utilise uniquement des cookies techniques essentiels au fonctionnement :
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Cookies d'authentification (maintien de session)</li>
              <li>Cookies de sécurité (protection CSRF)</li>
            </ul>
            <p className="mt-4">
              Aucun cookie de tracking, analytique ou publicitaire n'est utilisé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">8. Responsabilité</h2>
            <p className="mb-4">
              <strong>Exactitude des informations :</strong> ia-solution met en œuvre tous les moyens raisonnables 
              pour assurer la fiabilité des informations publiées. Toutefois, nous ne garantissons pas l'exactitude, 
              l'exhaustivité ou l'actualité de l'ensemble du contenu.
            </p>
            <p className="mb-4">
              <strong>Disponibilité :</strong> L'accès au site peut être interrompu pour maintenance. ia-solution 
              décline toute responsabilité en cas d'interruption.
            </p>
            <p>
              <strong>Limitations :</strong> ia-solution ne saurait être tenue responsable des dommages directs 
              ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">9. Liens hypertextes</h2>
            <p className="mb-4">
              Les liens vers des sites tiers sont fournis à titre informatif. ia-solution n'exerce aucun contrôle 
              sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
            <p>
              L'établissement de liens vers PERSPECTA-COMPETENCES depuis des sites tiers requiert l'autorisation 
              préalable écrite de ia-solution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">10. Médiation de la consommation</h2>
            <p className="mb-4">
              Conformément à l'article L.612-1 du Code de la Consommation, en cas de litige vous pouvez recourir 
              gratuitement à un médiateur de la consommation :
            </p>
            <p className="mb-2">
              <strong>Médiateur de la consommation CNPM - MÉDIATION DE LA CONSOMMATION</strong>
            </p>
            <ul className="list-none space-y-1 ml-4">
              <li><strong>Site :</strong> <a href="https://cnpm-mediation-consommation.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://cnpm-mediation-consommation.eu</a></li>
              <li><strong>Adresse :</strong> 27 avenue de la Libération, 42400 Saint-Chamond</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">11. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux 
              français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">12. Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
            </p>
            <ul className="list-none space-y-1 ml-4 mt-2">
              <li><strong>Email :</strong> <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline">contact@ia-solution.fr</a></li>
              <li><strong>Téléphone :</strong> <a href="tel:+33758060556" className="text-primary hover:underline">07 58 06 05 56</a></li>
            </ul>
          </section>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Dernière mise à jour : Janvier 2025
        </p>
      </div>
    </div>
  )
}
