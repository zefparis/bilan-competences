"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CGU() {
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

        <h1 className="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités 
              et conditions d'utilisation des services proposés sur le site PERSPECTA-COMPETENCES, ainsi que de définir 
              les droits et obligations des parties dans ce cadre.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">2. Éditeur</h2>
            <p className="mb-4">
              Le site PERSPECTA-COMPETENCES est édité par <strong>ia-solution</strong>, auto-entrepreneur.
            </p>
            <ul className="list-none space-y-1 ml-4">
              <li><strong>SIRET :</strong> 438 055 097</li>
              <li><strong>Siège social :</strong> Alès (30100), France</li>
              <li><strong>Contact :</strong> <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline">contact@ia-solution.fr</a> | <a href="tel:+33758060556" className="text-primary hover:underline">07 58 06 05 56</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">3. Accès au site</h2>
            <p className="mb-4">
              Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. 
              Tous les coûts afférents à l'accès au service, que ce soient les frais matériels, logiciels 
              ou d'accès à Internet sont exclusivement à la charge de l'utilisateur.
            </p>
            <p>
              L'utilisateur est seul responsable du bon fonctionnement de son équipement informatique 
              ainsi que de son accès à Internet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">4. Inscription et compte utilisateur</h2>
            <p className="mb-4">
              L'accès à certains services nécessite une inscription préalable. L'utilisateur s'engage à 
              fournir des informations exactes et à les maintenir à jour.
            </p>
            <p className="mb-4">
              L'utilisateur est responsable de la confidentialité de ses identifiants de connexion. 
              Toute utilisation de son compte est présumée faite par lui-même.
            </p>
            <p>
              ia-solution se réserve le droit de suspendre ou supprimer tout compte en cas de non-respect 
              des présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">5. Description des services</h2>
            <p className="mb-4">
              PERSPECTA-COMPETENCES propose des services d'évaluation cognitive et d'évaluation professionnelle, incluant :
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Des tests d'évaluation cognitive personnalisés</li>
              <li>Des analyses de profil professionnel</li>
              <li>Des recommandations de développement</li>
              <li>Des rapports de synthèse détaillés</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">6. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble des éléments du site (textes, images, logiciels, méthodologies, tests, etc.) 
              sont protégés par le droit de la propriété intellectuelle et appartiennent à ia-solution.
            </p>
            <p>
              Toute reproduction, représentation ou exploitation non autorisée de ces éléments est 
              strictement interdite et constitue une contrefaçon.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">7. Responsabilité</h2>
            <p className="mb-4">
              ia-solution s'efforce de fournir des services de qualité mais ne peut garantir l'absence 
              d'erreurs ou d'interruptions. Les résultats des évaluations sont fournis à titre indicatif 
              et ne constituent pas un diagnostic professionnel.
            </p>
            <p>
              L'utilisateur reconnaît utiliser les services à ses propres risques et sous sa seule 
              responsabilité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">8. Utilisation de l'Intelligence Artificielle</h2>
            
            <h3 className="text-lg font-semibold mb-3 mt-4">8.1 Systèmes IA déployés</h3>
            <p className="mb-4">
              PERSPECTA-COMPETENCES utilise des systèmes d'intelligence artificielle conformes 
              au Règlement européen IA Act (UE 2024/1689) :
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Analyse des compétences transférables (Anthropic Claude 3.5 Haiku)</li>
              <li>Matching emploi et formations (algorithmes propriétaires)</li>
              <li>Génération de rapports personnalisés (Anthropic Claude 3.5 Haiku)</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-4">8.2 Classification</h3>
            <p className="mb-4">
              Notre système est classé <strong>IA à risque limité</strong>. Nous respectons 
              nos obligations de transparence et vous garantissons le contrôle final.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-4">8.3 Vos droits</h3>
            <p className="mb-2">Conformément à l'IA Act, vous disposez des droits suivants :</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Droit à l'information sur l'utilisation de l'IA</li>
              <li>Droit de refuser l'analyse IA (bilan manuel possible)</li>
              <li>Droit de contester les résultats générés par l'IA</li>
              <li>Droit d'accès à vos données traitées</li>
              <li>Support humain disponible</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-4">8.4 Limites</h3>
            <p className="mb-4">
              L'IA peut commettre des erreurs. Les recommandations sont indicatives et ne 
              constituent jamais des décisions automatisées définitives. Vous restez maître 
              de vos choix professionnels.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-4">8.5 Information détaillée</h3>
            <p className="mb-4">
              Pour une information complète sur notre usage de l'IA, consultez notre{" "}
              <Link href="/ai-disclosure" className="text-primary hover:underline">
                page de divulgation IA
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">9. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est régi par notre{" "}
              <Link href="/politique-confidentialite" className="text-primary hover:underline">
                Politique de Confidentialité
              </Link>, conforme au RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">10. Modification des CGU</h2>
            <p>
              ia-solution se réserve le droit de modifier les présentes CGU à tout moment. 
              Les utilisateurs seront informés de toute modification substantielle. 
              La poursuite de l'utilisation du service après modification vaut acceptation des nouvelles CGU.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">11. Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont régies par le droit français. En cas de litige, et après tentative 
              de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">12. Contact</h2>
            <p className="mb-2">
              Pour toute question concernant ces CGU :
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
