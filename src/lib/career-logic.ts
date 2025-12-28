/**
 * Utility to generate professional career recommendations based on 
 * the intersection of RIASEC interests and HCS-U7 Cognitive profile.
 */

export function getCareerRecommendation(riasecCode: string | null | undefined, dominantCognition: string | null | undefined): string {
  if (!riasecCode || !dominantCognition) {
    return "Complétez vos tests RIASEC et Cognitif pour obtenir une recommandation personnalisée.";
  }

  const riasec = riasecCode.toUpperCase();
  const cog = dominantCognition.toLowerCase();

  const recommendations: Record<string, string> = {
    form: `Votre structure mentale logique ("Form") complète parfaitement votre profil ${riasec}. Vous excellez dans les environnements exigeant une grande rigueur analytique, de la précision technique et une capacité à modéliser des systèmes complexes.`,
    color: `Votre pensée visuelle et créative ("Color") apporte une dimension esthétique et conceptuelle unique à votre profil ${riasec}. Vous êtes particulièrement à l'aise pour traduire des concepts abstraits en solutions tangibles, innovantes et percutantes.`,
    volume: `Votre approche pragmatique et spatiale ("Volume") renforce votre profil ${riasec}. Vous apprenez par l'expérimentation directe et réussissez mieux dans des rôles où l'action, la manipulation concrète et la résolution de problèmes en temps réel sont au cœur du métier.`,
    sound: `Votre aisance auditive et verbale ("Sound") est un atout majeur pour votre profil ${riasec}. Vous rayonnez dans les rôles de transmission, de négociation et de coordination où la parole, l'écoute active et l'intelligence relationnelle sont les outils principaux.`,
  };

  return recommendations[cog] || `Profil ${riasec} avec une dominance cognitive ${cog}. Vous possédez un profil polyvalent adapté aux environnements dynamiques.`;
}

export function getIdealEnvironment(dominantCognition: string | null | undefined): string {
  switch (dominantCognition?.toLowerCase()) {
    case 'form': return "Un contexte structuré, basé sur des données, des processus clairs et des objectifs mesurables.";
    case 'color': return "Un environnement stimulant visuellement, valorisant l'innovation, le design et l'expression conceptuelle.";
    case 'volume': return "Un cadre dynamique, orienté vers le terrain, la production concrète et le prototypage rapide.";
    case 'sound': return "Un milieu collaboratif riche en interactions humaines, valorisant la communication orale et le travail d'équipe.";
    default: return "Un environnement de travail flexible et varié.";
  }
}
