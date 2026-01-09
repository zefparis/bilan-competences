import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registre des Traitements RGPD | Admin PERSPECTA',
  description: 'Registre des traitements de données personnelles conforme Article 30 RGPD',
  robots: 'noindex, nofollow'
};

export default function RegistreTraitementsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Registre des Traitements de Données Personnelles
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Conforme à l'Article 30 du RGPD (UE 2016/679)
          </p>
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Responsable du traitement :</strong> ia-solution (SIRET 438 055 097)<br/>
              <strong>Contact DPO :</strong> contact@ia-solution.fr | 07 58 06 05 56<br/>
              <strong>Dernière mise à jour :</strong> Janvier 2025
            </p>
          </div>
        </div>

        <div className="mb-8">
          <a
            href="/legal/Registre-RGPD-PERSPECTA.xlsx"
            download="Registre-RGPD-PERSPECTA.xlsx"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger le registre (Excel CNIL)
          </a>
        </div>

        <div className="space-y-6">
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Traitement n°1 : Gestion des Comptes Utilisateurs
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Finalité</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Authentification et gestion des accès à la plateforme PERSPECTA-COMPETENCES
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚖️ Base légale</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Exécution du contrat (Art. 6.1.b RGPD)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">👥 Personnes concernées</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Utilisateurs inscrits (particuliers en reconversion professionnelle)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Catégories de données</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Identité : nom, prénom</li>
                  <li>• Coordonnées : adresse email</li>
                  <li>• Connexion : mot de passe (hashé), date d'inscription</li>
                  <li>• Technique : adresse IP, logs de connexion</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📤 Destinataires</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  ia-solution uniquement (accès restreint administrateur)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌍 Transferts hors UE</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Non
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⏱️ Durée de conservation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Durée du compte actif + 3 ans après dernière connexion
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔒 Mesures de sécurité</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Mots de passe hashés (bcrypt)</li>
                  <li>• HTTPS obligatoire (TLS 1.3)</li>
                  <li>• Protection CSRF</li>
                  <li>• Rate limiting (anti brute-force)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Traitement n°2 : Évaluations Professionnelles et Cognitives
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Finalité</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Fourniture du service d'évaluation professionnelle (tests cognitifs, profil RIASEC, 
                  certification technique, génération de rapports personnalisés)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚖️ Base légale</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Exécution du contrat (Art. 6.1.b RGPD)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">👥 Personnes concernées</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Utilisateurs ayant passé l'évaluation complète
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Catégories de données</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Cognitives : réponses tests (Stroop, RAN, Trail Making, Temps réaction)</li>
                  <li>• Professionnelles : expériences, compétences déclarées, objectifs</li>
                  <li>• Évaluation : scores cognitifs, type RIASEC, résultats certification technique</li>
                  <li>• Rapports : recommandations personnalisées, analyses IA</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📤 Destinataires</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• ia-solution (traitement interne)</li>
                  <li>• <strong>Anthropic</strong> (sous-traitant IA - DPA signé)</li>
                  <li className="ml-4 text-xs">→ Données transmises : expériences, compétences, objectifs, scores cognitifs, type RIASEC</li>
                  <li className="ml-4 text-xs">→ Données JAMAIS transmises : nom, prénom, email, données sensibles (santé, handicap, origine)</li>
                  <li className="ml-4 text-xs">→ Garanties : non-utilisation entraînement, suppression après traitement, hébergement Europe</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌍 Transferts hors UE</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Oui (USA - Anthropic)<br/>
                  <span className="text-xs">Garanties : Clauses Contractuelles Types (CCT) + DPA RGPD conforme</span>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⏱️ Durée de conservation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Durée du compte actif + 3 ans après dernière activité
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔒 Mesures de sécurité</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Chiffrement base de données</li>
                  <li>• Anonymisation données IA (pas d'identité transmise)</li>
                  <li>• DPA Anthropic (non-persistance données)</li>
                  <li>• Logs d'accès (traçabilité)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Traitement n°3 : Gestion des Paiements
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Finalité</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Traitement des paiements pour déverrouillage évaluation complète (49€)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚖️ Base légale</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Exécution du contrat (Art. 6.1.b RGPD) + Obligation légale comptable (Art. 6.1.c RGPD)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">👥 Personnes concernées</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Utilisateurs ayant effectué un paiement
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Catégories de données</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Transaction : montant, date, statut</li>
                  <li>• Facturation : nom, prénom, email (pour envoi facture)</li>
                  <li>• Paiement : 4 derniers chiffres carte (via Stripe uniquement)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📤 Destinataires</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• ia-solution (comptabilité)</li>
                  <li>• <strong>Stripe</strong> (processeur de paiement certifié PCI-DSS)</li>
                  <li className="ml-4 text-xs">→ Aucune donnée bancaire complète stockée par ia-solution</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌍 Transferts hors UE</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Oui (USA - Stripe)<br/>
                  <span className="text-xs">Garanties : Certification PCI-DSS + DPA RGPD</span>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⏱️ Durée de conservation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  10 ans (obligation légale comptable - Art. L123-22 Code Commerce)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔒 Mesures de sécurité</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Tokenisation Stripe (pas de données bancaires stockées)</li>
                  <li>• Chiffrement transactions (TLS 1.3)</li>
                  <li>• Conformité PCI-DSS</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Traitement n°4 : Support Client et Assistance
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Finalité</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Assistance utilisateurs (questions techniques, contestations IA, réclamations)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚖️ Base légale</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Intérêt légitime (Art. 6.1.f RGPD) - Amélioration qualité service
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">👥 Personnes concernées</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Utilisateurs ayant contacté le support
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Catégories de données</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Contact : email, nom</li>
                  <li>• Communication : contenu emails échangés, tickets support</li>
                  <li>• Technique : captures d'écran, logs erreurs (si fournis)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📤 Destinataires</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  ia-solution uniquement (Benjamin Barrere, Fondateur)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌍 Transferts hors UE</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Non
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⏱️ Durée de conservation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  1 an après résolution du ticket
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔒 Mesures de sécurité</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Accès restreint (fondateur uniquement)</li>
                  <li>• Emails chiffrés (TLS)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Traitement n°5 : Statistiques et Amélioration des Services
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Finalité</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Analyse anonymisée pour amélioration algorithmes et expérience utilisateur
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚖️ Base légale</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Intérêt légitime (Art. 6.1.f RGPD) - R&D et optimisation service
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">👥 Personnes concernées</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Tous les utilisateurs (données anonymisées)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Catégories de données</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Statistiques agrégées : taux de réussite tests, scores moyens</li>
                  <li>• Usage plateforme : pages visitées, temps passé (anonymisé)</li>
                  <li>• Performance : taux conversion, satisfaction (NPS)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📤 Destinataires</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  ia-solution uniquement (équipe R&D)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌍 Transferts hors UE</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Non
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⏱️ Durée de conservation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Données anonymisées : conservation illimitée (pas de données personnelles)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔒 Mesures de sécurité</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Anonymisation irréversible</li>
                  <li>• Agrégation (pas de données individuelles)</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              📧 Pour toute question concernant ce registre : <a href="mailto:contact@ia-solution.fr" className="underline">contact@ia-solution.fr</a>
            </p>
            <p className="mb-2">
              📞 Téléphone : 07 58 06 05 56
            </p>
            <p>
              🏛️ CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline">www.cnil.fr</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
