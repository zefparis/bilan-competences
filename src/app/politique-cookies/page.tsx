"use client"

import Link from "next/link"
import { ArrowLeft, Cookie, Shield, Lock } from "lucide-react"

export default function PolitiqueCookies() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2C2C]">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#8C5A2B] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Cookie className="w-8 h-8 text-[#8C5A2B]" />
          Politique des Cookies
        </h1>

        <div className="space-y-8 text-[#2C2C2C]">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">1. Qu'est-ce qu'un cookie ?</h2>
            <p className="mb-4">
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
              lors de la visite d'un site web. Il permet au site de mémoriser des informations sur votre visite, 
              comme vos préférences de langue ou vos informations de connexion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">2. Les cookies utilisés par PERSPECTA</h2>
            <p className="mb-4">
              PERSPECTA utilise <strong>uniquement des cookies strictement nécessaires</strong> au fonctionnement 
              du site. Nous n'utilisons aucun cookie de tracking, d'analyse comportementale ou publicitaire.
            </p>

            <div className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden mt-6">
              <table className="w-full text-sm">
                <thead className="bg-[#F5F5F5]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Cookie</th>
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Finalité</th>
                    <th className="px-4 py-3 text-left font-semibold">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">next-auth.session-token</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        <Shield className="w-3 h-3" /> Essentiel
                      </span>
                    </td>
                    <td className="px-4 py-3">Maintenir votre session de connexion</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">next-auth.csrf-token</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        <Lock className="w-3 h-3" /> Sécurité
                      </span>
                    </td>
                    <td className="px-4 py-3">Protection contre les attaques CSRF</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">next-auth.callback-url</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        <Shield className="w-3 h-3" /> Essentiel
                      </span>
                    </td>
                    <td className="px-4 py-3">Redirection après authentification</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">3. Cookies essentiels (strictement nécessaires)</h2>
            <p className="mb-4">
              Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. 
              Ils sont généralement établis en réponse à des actions que vous effectuez, comme la définition 
              de vos préférences de confidentialité, la connexion ou le remplissage de formulaires.
            </p>
            <p>
              Conformément à la réglementation, ces cookies ne nécessitent pas votre consentement préalable 
              car ils sont strictement nécessaires à la fourniture du service que vous avez demandé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">4. Cookies tiers</h2>
            <p className="mb-4">
              PERSPECTA n'utilise <strong>aucun cookie tiers</strong> à des fins de :
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Publicité ciblée</li>
              <li>Analyse comportementale (Google Analytics, etc.)</li>
              <li>Réseaux sociaux</li>
              <li>Remarketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">5. Stockage local (localStorage)</h2>
            <p className="mb-4">
              En plus des cookies, nous utilisons le stockage local de votre navigateur pour :
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Préférences de thème</strong> : mémoriser votre choix de mode clair/sombre</li>
              <li><strong>Consentement cookies</strong> : enregistrer votre choix concernant cette politique</li>
            </ul>
            <p className="mt-4">
              Ces données restent sur votre appareil et ne sont jamais transmises à nos serveurs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">6. Comment gérer les cookies ?</h2>
            <p className="mb-4">
              Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. 
              Voici comment procéder selon votre navigateur :
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Chrome</strong> : Paramètres → Confidentialité et sécurité → Cookies</li>
              <li><strong>Firefox</strong> : Options → Vie privée et sécurité → Cookies</li>
              <li><strong>Safari</strong> : Préférences → Confidentialité → Cookies</li>
              <li><strong>Edge</strong> : Paramètres → Cookies et autorisations de site</li>
            </ul>
            <p className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <strong>⚠️ Attention :</strong> La désactivation des cookies essentiels peut empêcher 
              le bon fonctionnement du site, notamment la connexion à votre compte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">7. Base légale</h2>
            <p>
              Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD) 
              et à la directive ePrivacy. Les cookies strictement nécessaires sont exemptés de consentement 
              conformément à l'article 82 de la loi Informatique et Libertés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">8. Contact</h2>
            <p>
              Pour toute question concernant notre utilisation des cookies :{" "}
              <a href="mailto:contact@ia-solution.fr" className="text-[#8C5A2B] hover:underline">
                contact@ia-solution.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">9. Liens utiles</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <Link href="/politique-confidentialite" className="text-[#8C5A2B] hover:underline">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-[#8C5A2B] hover:underline">
                  Conditions générales d'utilisation
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#8C5A2B] hover:underline"
                >
                  CNIL - Cookies et traceurs
                </a>
              </li>
            </ul>
          </section>
        </div>

        <p className="mt-12 text-sm text-[#6B6B6B]">
          Dernière mise à jour : Décembre 2024
        </p>
      </div>
    </div>
  )
}
