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
            <p className="mb-2">
              Le site PERSPECTA-COMPETENCES est édité par :
            </p>
            <ul className="list-none space-y-1 ml-4">
              <li><strong>Raison sociale :</strong> ia-solution</li>
              <li><strong>Siège social :</strong> Alès, France</li>
              <li><strong>Email :</strong> <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline">contact@ia-solution.fr</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">2. Hébergement</h2>
            <p>
              Le site est hébergé par LWS (Line Web Services), 10 rue de Penthièvre, 75008 Paris, France.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">3. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) 
              est la propriété exclusive de ia-solution ou de ses partenaires et est protégé par les lois françaises 
              et internationales relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments 
              du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable 
              de ia-solution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">4. Responsabilité</h2>
            <p className="mb-4">
              ia-solution s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées 
              sur ce site. Toutefois, ia-solution ne peut garantir l'exactitude, la précision ou l'exhaustivité 
              des informations mises à disposition sur ce site.
            </p>
            <p>
              ia-solution décline toute responsabilité pour toute imprécision, inexactitude ou omission portant 
              sur des informations disponibles sur ce site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">5. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens hypertextes vers d'autres sites. ia-solution n'exerce aucun contrôle 
              sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">6. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux 
              français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">7. Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse : 
              <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline ml-1">contact@ia-solution.fr</a>
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Dernière mise à jour : Décembre 2024
        </p>
      </div>
    </div>
  )
}
