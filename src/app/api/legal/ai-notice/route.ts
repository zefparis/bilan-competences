import { NextResponse } from 'next/server'
import React from 'react'
import { renderToStream } from '@react-pdf/renderer'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginTop: 20,
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  bullet: {
    fontSize: 11,
    marginLeft: 20,
    marginBottom: 3,
    lineHeight: 1.5,
  },
  metadata: {
    fontSize: 11,
    marginBottom: 5,
  },
  footer: {
    fontSize: 9,
    color: '#666666',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
})

const AINoticeDocument = () => (
  <Document
    title="Notice d'Utilisation de l'Intelligence Artificielle - PERSPECTA-COMPETENCES"
    author="ia-solution"
    subject="Conformité AI Act (UE 2024/1689)"
    keywords="IA, AI Act, transparence, PERSPECTA"
  >
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>NOTICE D'UTILISATION</Text>
      <Text style={styles.title}>DE L'INTELLIGENCE ARTIFICIELLE</Text>
      <Text style={styles.subtitle}>PERSPECTA-COMPETENCES</Text>
      
      <View style={{ marginTop: 40 }}>
        <Text style={styles.metadata}>Éditeur : ia-solution (SIRET 438 055 097)</Text>
        <Text style={styles.metadata}>Version : 1.0</Text>
        <Text style={styles.metadata}>Date : Janvier 2025</Text>
        <Text style={styles.metadata}>Conformité : Règlement UE 2024/1689 (AI Act)</Text>
      </View>
      
      <Text style={styles.footer}>Document contractuel annexe aux CGU PERSPECTA-COMPETENCES</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>1. CLASSIFICATION DU SYSTÈME IA</Text>
      <Text style={styles.subSectionTitle}>Article 13 - Obligations de transparence</Text>
      <Text style={styles.text}>Conformément au Règlement européen sur l'Intelligence Artificielle (UE 2024/1689), nous vous informons des caractéristiques suivantes :</Text>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.text}>Système d'IA : PERSPECTA-COMPETENCES</Text>
        <Text style={styles.text}>Classification : Risque limité (Art. 52, AI Act)</Text>
        <Text style={styles.text}>Raison : Outil d'orientation professionnelle avec IA générative</Text>
      </View>
      <Text style={styles.subSectionTitle}>Pourquoi "risque limité" ?</Text>
      <Text style={styles.bullet}>✅ Outil d'orientation professionnelle (impact sur vie des personnes)</Text>
      <Text style={styles.bullet}>✅ Utilisation d'IA générative pour analyse et recommandations</Text>
      <Text style={styles.bullet}>❌ PAS de décision automatisée d'embauche</Text>
      <Text style={styles.bullet}>❌ PAS de notation sociale ou surveillance biométrique</Text>
      <Text style={styles.bullet}>❌ PAS de manipulation comportementale</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>2. MODÈLES IA UTILISÉS</Text>
      <Text style={styles.subSectionTitle}>2.1 Analyse des compétences transférables</Text>
      <Text style={styles.text}>Modèle : Claude 3.5 Haiku (claude-3-5-haiku-20241022)</Text>
      <Text style={styles.text}>Fournisseur : Anthropic</Text>
      <Text style={styles.text}>Hébergement : Europe (AWS)</Text>
      <Text style={styles.text}>Usage : Analyse de vos compétences actuelles vs métier cible</Text>
      <Text style={styles.subSectionTitle}>2.2 Génération de rapports</Text>
      <Text style={styles.text}>Modèle : Claude 3.5 Haiku</Text>
      <Text style={styles.text}>Fournisseur : Anthropic</Text>
      <Text style={styles.text}>Hébergement : Europe (AWS)</Text>
      <Text style={styles.text}>Usage : Synthèse personnalisée de votre évaluation professionnelle</Text>
      <Text style={styles.subSectionTitle}>2.3 Matching emploi et formations</Text>
      <Text style={styles.text}>Modèle : Algorithme propriétaire v2.1</Text>
      <Text style={styles.text}>Fournisseur : ia-solution</Text>
      <Text style={styles.text}>Hébergement : France (LWS)</Text>
      <Text style={styles.text}>Usage : Rapprochement profil avec offres France Travail</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>3. DONNÉES TRAITÉES PAR L'IA</Text>
      <Text style={styles.subSectionTitle}>3.1 Données transmises à l'IA</Text>
      <Text style={styles.text}>Les données suivantes sont transmises aux modèles IA pour analyse :</Text>
      <Text style={styles.bullet}>• Expériences professionnelles (intitulés, durées)</Text>
      <Text style={styles.bullet}>• Compétences déclarées (liste textuelle)</Text>
      <Text style={styles.bullet}>• Objectifs professionnels (texte libre)</Text>
      <Text style={styles.bullet}>• Résultats tests cognitifs (scores numériques)</Text>
      <Text style={styles.bullet}>• Type RIASEC (6 lettres : R, I, A, S, E, C)</Text>
      <Text style={styles.subSectionTitle}>3.2 Données JAMAIS transmises</Text>
      <Text style={styles.text}>Les données suivantes ne sont JAMAIS envoyées à l'IA :</Text>
      <Text style={styles.bullet}>❌ Nom, prénom, identité</Text>
      <Text style={styles.bullet}>❌ Adresse email</Text>
      <Text style={styles.bullet}>❌ Numéro de téléphone</Text>
      <Text style={styles.bullet}>❌ Données bancaires</Text>
      <Text style={styles.bullet}>❌ Données sensibles (santé, handicap, origine ethnique)</Text>
      <Text style={styles.subSectionTitle}>3.3 Garanties de confidentialité</Text>
      <Text style={styles.bullet}>✅ Anthropic ne stocke pas vos données après traitement</Text>
      <Text style={styles.bullet}>✅ Anthropic n'utilise pas vos données pour entraîner ses modèles</Text>
      <Text style={styles.bullet}>✅ Communications chiffrées (TLS 1.3)</Text>
      <Text style={styles.bullet}>✅ Data Processing Agreement (DPA) signé</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>4. FINALITÉS ET LIMITATIONS</Text>
      <Text style={styles.subSectionTitle}>4.1 Ce que l'IA fait</Text>
      <Text style={styles.bullet}>✅ Identifie les compétences transférables entre métiers</Text>
      <Text style={styles.bullet}>✅ Calcule des scores de compatibilité (0-100)</Text>
      <Text style={styles.bullet}>✅ Génère des recommandations personnalisées</Text>
      <Text style={styles.bullet}>✅ Rédige des synthèses de profil professionnelles</Text>
      <Text style={styles.bullet}>✅ Suggère des formations et offres d'emploi pertinentes</Text>
      <Text style={styles.subSectionTitle}>4.2 Ce que l'IA ne fait PAS</Text>
      <Text style={styles.bullet}>❌ Ne prend aucune décision automatisée définitive</Text>
      <Text style={styles.bullet}>❌ Ne garantit pas d'embauche ou de succès professionnel</Text>
      <Text style={styles.bullet}>❌ Ne remplace pas un conseiller humain</Text>
      <Text style={styles.bullet}>❌ Ne stocke pas vos données après génération</Text>
      <Text style={styles.bullet}>❌ N'a pas accès à vos données personnelles identifiantes</Text>
      <Text style={styles.subSectionTitle}>4.3 Limites et précautions</Text>
      <Text style={styles.text}>⚠️ L'IA peut faire des erreurs d'interprétation</Text>
      <Text style={styles.text}>⚠️ Les recommandations sont indicatives, jamais prescriptives</Text>
      <Text style={styles.text}>⚠️ Le score de compatibilité est une estimation probabiliste</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>5. VOS DROITS (AI ACT)</Text>
      <Text style={styles.text}>Conformément à l'AI Act (UE 2024/1689), vous disposez des droits suivants :</Text>
      <Text style={styles.subSectionTitle}>5.1 Droit à l'information</Text>
      <Text style={styles.text}>Vous êtes informé de l'utilisation de l'IA via cette notice.</Text>
      <Text style={styles.subSectionTitle}>5.2 Droit de refus</Text>
      <Text style={styles.text}>Vous pouvez demander une analyse manuelle sans IA :</Text>
      <Text style={styles.text}>📧 contact@ia-solution.fr</Text>
      <Text style={styles.text}>📱 07 58 06 05 56</Text>
      <Text style={styles.subSectionTitle}>5.3 Droit de contestation</Text>
      <Text style={styles.text}>Vous pouvez contester tout résultat généré par l'IA.</Text>
      <Text style={styles.subSectionTitle}>5.4 Droit d'accès</Text>
      <Text style={styles.text}>Vous pouvez obtenir une copie des données transmises à l'IA.</Text>
      <Text style={styles.subSectionTitle}>5.5 Supervision humaine</Text>
      <Text style={styles.text}>Support humain disponible sous 48h ouvrées.</Text>
      <Text style={styles.subSectionTitle}>5.6 Contrôle final</Text>
      <Text style={styles.text}>Vous restez maître de toutes les décisions.</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>6. PROCÉDURE DE CONTESTATION</Text>
      <Text style={styles.text}>Si vous contestez un résultat généré par l'IA :</Text>
      <Text style={styles.subSectionTitle}>Étape 1 : Signaler</Text>
      <Text style={styles.text}>Email à contact@ia-solution.fr avec objet "Contestation IA"</Text>
      <Text style={styles.subSectionTitle}>Étape 2 : Délai de réponse</Text>
      <Text style={styles.text}>Réponse sous 48h ouvrées</Text>
      <Text style={styles.subSectionTitle}>Étape 3 : Analyse humaine</Text>
      <Text style={styles.text}>Vérification manuelle par Benjamin (Fondateur)</Text>
      <Text style={styles.subSectionTitle}>Étape 4 : Correction</Text>
      <Text style={styles.text}>Si erreur : régénération ou analyse manuelle</Text>
      <Text style={styles.subSectionTitle}>Étape 5 : Escalade</Text>
      <Text style={styles.text}>En cas de désaccord persistant :</Text>
      <Text style={styles.bullet}>• Médiation CNPM : cnpm-mediation-consommation.eu</Text>
      <Text style={styles.bullet}>• Réclamation DGCCRF : economie.gouv.fr</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>7. CONTACT ET SUPPORT</Text>
      <Text style={styles.subSectionTitle}>7.1 Support technique IA</Text>
      <Text style={styles.text}>📧 Email : contact@ia-solution.fr</Text>
      <Text style={styles.text}>📱 Téléphone : 07 58 06 05 56</Text>
      <Text style={styles.text}>🕐 Délai de réponse : 48h ouvrées</Text>
      <Text style={styles.text}>📍 Adresse : ia-solution, Alès (30100), France</Text>
      <Text style={styles.subSectionTitle}>7.2 Conformité et réclamations</Text>
      <Text style={styles.text}>RGPD (données personnelles) :</Text>
      <Text style={styles.text}>CNIL : cnil.fr</Text>
      <Text style={styles.text}>3 Place de Fontenoy, 75334 Paris Cedex 07</Text>
      <Text style={styles.text}>Téléphone : 01 53 73 22 22</Text>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.text}>AI Act (intelligence artificielle) :</Text>
        <Text style={styles.text}>DGCCRF : economie.gouv.fr</Text>
      </View>
      <Text style={styles.subSectionTitle}>7.3 Médiation de la consommation</Text>
      <Text style={styles.text}>CNPM - Médiation de la Consommation</Text>
      <Text style={styles.text}>Site : cnpm-mediation-consommation.eu</Text>
      <Text style={styles.text}>Adresse : 27 avenue de la Libération, 42400 Saint-Chamond</Text>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.footer}>Document contractuel annexe aux CGU PERSPECTA-COMPETENCES</Text>
        <Text style={styles.footer}>© 2025 ia-solution (SIRET 438 055 097) - Tous droits réservés</Text>
      </View>
    </Page>
  </Document>
)

export async function GET() {
  try {
    const stream = await renderToStream(React.createElement(AINoticeDocument))

    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Notice-IA-PERSPECTA-COMPETENCES.pdf"',
      },
    })
  } catch (error) {
    console.error('Error generating AI notice PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
