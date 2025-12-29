import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { chartSvgs } = await req.json();

    // Note: Les graphiques SVG sont maintenant des data URLs en mémoire
    // Il n'y a plus de fichiers à nettoyer côté serveur
    // Cette API reste pour compatibilité future si besoin

    console.log('🧹 Nettoyage des graphiques SVG (aucun fichier à supprimer)');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage des graphiques:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors du nettoyage' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
