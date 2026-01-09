"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PolitiqueConfidentialite() {
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

        <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">1. Introduction</h2>
            <p className="mb-4">
              ia-solution, éditeur de PERSPECTA-COMPETENCES, s'engage à protéger la vie privée des utilisateurs de son site. 
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos 
              données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">2. Responsable du traitement</h2>
            <p className="mb-2"><strong>ia-solution</strong>, auto-entrepreneur</p>
            <ul className="list-none space-y-1 ml-4">
              <li><strong>SIRET :</strong> 438 055 097</li>
              <li><strong>Siège social :</strong> Alès (30100), France</li>
              <li><strong>Contact DPO :</strong> <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline">contact@ia-solution.fr</a></li>
              <li><strong>Téléphone :</strong> <a href="tel:+33758060556" className="text-primary hover:underline">07 58 06 05 56</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">3. Données collectées</h2>
            <p className="mb-4">Nous collectons les données suivantes :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Données d'identification :</strong> nom, prénom, adresse email</li>
              <li><strong>Données de connexion :</strong> identifiants, mots de passe (chiffrés)</li>
              <li><strong>Données d'évaluation :</strong> réponses aux tests cognitifs et bilans de compétences</li>
              <li><strong>Données techniques :</strong> adresse IP, type de navigateur, pages visitées</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">4. Finalités du traitement</h2>
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
            <h2 className="text-xl font-semibold mb-4 text-primary">5. Base légale du traitement</h2>
            <p className="mb-4">Le traitement de vos données repose sur :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>L'exécution du contrat :</strong> pour fournir les services demandés</li>
              <li><strong>Le consentement :</strong> pour les communications marketing (si applicable)</li>
              <li><strong>L'intérêt légitime :</strong> pour améliorer nos services</li>
              <li><strong>L'obligation légale :</strong> pour respecter la réglementation applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">6. Durée de conservation</h2>
            <p className="mb-4">
              Vos données personnelles sont conservées pendant la durée de votre utilisation du service, 
              puis archivées pendant une durée de 3 ans après votre dernière activité, conformément 
              aux obligations légales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">7. Vos droits</h2>
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
              <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline ml-1">contact@ia-solution.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">8. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
              vos données contre tout accès non autorisé, modification, divulgation ou destruction. 
              Les mots de passe sont chiffrés et les communications sont sécurisées par HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">9. Traitement par Intelligence Artificielle</h2>
            
            <h3 className="text-lg font-semibold mb-3 mt-4">9.1 Données traitées par IA</h3>
            <p className="mb-2">Les données suivantes peuvent être traitées par nos systèmes IA :</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Expériences professionnelles</li>
              <li>Compétences déclarées</li>
              <li>Objectifs professionnels</li>
              <li>Résultats des tests cognitifs et RIASEC</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-4">9.2 Fournisseur IA</h3>
            <p className="mb-4">
              Nous utilisons <strong>Anthropic (Claude 3.5 Haiku)</strong> comme prestataire IA.
            </p>
            <p className="mb-2">Anthropic est conforme RGPD et garantit :</p>
            <ul className="list-none ml-6 space-y-2 mb-4">
              <li>✅ Non-utilisation de vos données pour entraîner leurs modèles</li>
              <li>✅ Suppression des données après traitement (non-persistance)</li>
              <li>✅ Chiffrement des communications (TLS 1.3)</li>
              <li>✅ Hébergement serveurs en Europe</li>
              <li>✅ Data Processing Agreement (DPA) signé</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-4">9.3 Données sensibles</h3>
            <p className="mb-4">
              Les données sensibles (handicap, santé mentale, origine ethnique) ne sont <strong>jamais transmises</strong> 
              à l'IA sans votre consentement explicite et séparé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">10. Transfert de données</h2>
            <p>
              Vos données peuvent être hébergées sur des serveurs situés en dehors de l'Union Européenne 
              (notamment aux États-Unis via notre hébergeur et nos prestataires IA). Ces transferts sont encadrés par 
              des garanties appropriées conformément au RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">11. Cookies</h2>
            <p className="mb-4">
              Notre site utilise uniquement des cookies essentiels :
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Cookies d'authentification</strong> : maintien de session</li>
              <li><strong>Cookies de sécurité</strong> : protection CSRF</li>
            </ul>
            <p className="mb-2">
              Nous n'utilisons <strong>aucun</strong> cookie de tracking, d'analyse ou publicitaire.
            </p>
            <p>
              Durée de conservation : session (suppression à la fermeture du navigateur) ou 30 jours (option "Se souvenir de moi").
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">12. Réclamation</h2>
            <p className="mb-4">
              Si vous estimez que le traitement de vos données ne respecte pas la réglementation, 
              vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> :
            </p>
            <ul className="list-none space-y-1 ml-4">
              <li><strong>Site :</strong> <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.cnil.fr</a></li>
              <li><strong>Adresse :</strong> 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</li>
              <li><strong>Téléphone :</strong> 01 53 73 22 22</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">13. Contact</h2>
            <p className="mb-2">
              Pour toute question concernant cette politique de confidentialité :
            </p>
            <ul className="list-none space-y-1 ml-4">
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
