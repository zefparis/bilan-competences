"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PolitiqueConfidentialite() {
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

        <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>

        <div className="space-y-8 text-[#2C2C2C]">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">1. Introduction</h2>
            <p className="mb-4">
              ia-solution, éditeur de PERSPECTA, s'engage à protéger la vie privée des utilisateurs de son site. 
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos 
              données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">2. Responsable du traitement</h2>
            <ul className="list-none space-y-1 ml-4">
              <li><strong>Raison sociale :</strong> ia-solution</li>
              <li><strong>Siège social :</strong> Alès, France</li>
              <li><strong>Email :</strong> <a href="mailto:contact@ia-solution.fr" className="text-[#8C5A2B] hover:underline">contact@ia-solution.fr</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">3. Données collectées</h2>
            <p className="mb-4">Nous collectons les données suivantes :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Données d'identification :</strong> nom, prénom, adresse email</li>
              <li><strong>Données de connexion :</strong> identifiants, mots de passe (chiffrés)</li>
              <li><strong>Données d'évaluation :</strong> réponses aux tests cognitifs et bilans de compétences</li>
              <li><strong>Données techniques :</strong> adresse IP, type de navigateur, pages visitées</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">4. Finalités du traitement</h2>
            <p className="mb-4">Vos données sont collectées pour :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Fournir nos services d'évaluation cognitive et de bilan de compétences</li>
              <li>Gérer votre compte utilisateur</li>
              <li>Améliorer nos services et l'expérience utilisateur</li>
              <li>Assurer la sécurité de la plateforme</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">5. Base légale du traitement</h2>
            <p className="mb-4">Le traitement de vos données repose sur :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>L'exécution du contrat :</strong> pour fournir les services demandés</li>
              <li><strong>Le consentement :</strong> pour les communications marketing (si applicable)</li>
              <li><strong>L'intérêt légitime :</strong> pour améliorer nos services</li>
              <li><strong>L'obligation légale :</strong> pour respecter la réglementation applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">6. Durée de conservation</h2>
            <p className="mb-4">
              Vos données personnelles sont conservées pendant la durée de votre utilisation du service, 
              puis archivées pendant une durée de 3 ans après votre dernière activité, conformément 
              aux obligations légales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">7. Vos droits</h2>
            <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à : 
              <a href="mailto:contact@ia-solution.fr" className="text-[#8C5A2B] hover:underline ml-1">contact@ia-solution.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">8. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
              vos données contre tout accès non autorisé, modification, divulgation ou destruction. 
              Les mots de passe sont chiffrés et les communications sont sécurisées par HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">9. Transfert de données</h2>
            <p>
              Vos données peuvent être hébergées sur des serveurs situés en dehors de l'Union Européenne 
              (notamment aux États-Unis via notre hébergeur Vercel). Ces transferts sont encadrés par 
              des garanties appropriées conformément au RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">10. Cookies</h2>
            <p className="mb-4">
              Notre site utilise <strong>uniquement des cookies essentiels</strong> au fonctionnement du service :
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Cookies d'authentification</strong> : maintien de votre session de connexion</li>
              <li><strong>Cookies de sécurité</strong> : protection contre les attaques CSRF</li>
            </ul>
            <p>
              Nous n'utilisons aucun cookie de tracking, d'analyse ou publicitaire. 
              Pour plus d'informations, consultez notre{" "}
              <Link href="/politique-cookies" className="text-[#8C5A2B] hover:underline">
                politique de cookies
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">11. Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données ne respecte pas la réglementation, 
              vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de 
              l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#8C5A2B] hover:underline">www.cnil.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#8C5A2B]">12. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité : 
              <a href="mailto:contact@ia-solution.fr" className="text-[#8C5A2B] hover:underline ml-1">contact@ia-solution.fr</a>
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-[#6B6B6B]">
          Dernière mise à jour : Décembre 2024
        </p>
      </div>
    </div>
  )
}
