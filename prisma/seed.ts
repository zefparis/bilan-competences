import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Valeurs du livret
  const values = [
    { titre: 'Autonomie', description: 'Capacité à agir et décider par soi-même' },
    { titre: 'Créativité', description: 'Capacité à imaginer et créer des solutions originales' },
    { titre: 'Sécurité', description: 'Besoin de stabilité et de protection' },
    { titre: 'Reconnaissance', description: 'Besoin d\'être valorisé et apprécié' },
    { titre: 'Développement personnel', description: 'Volonté de progresser et d\'apprendre' },
    { titre: 'Solidarité', description: 'Aider et soutenir les autres' },
    { titre: 'Liberté', description: 'Indépendance dans ses choix et actions' },
    { titre: 'Responsabilité', description: 'Assumer ses décisions et leurs conséquences' },
    { titre: 'Équilibre vie pro/perso', description: 'Harmonie entre travail et vie personnelle' },
    { titre: 'Innovation', description: 'Ouvrir de nouvelles voies et perspectives' },
    { titre: 'Intégrité', description: 'Être fidèle à ses principes et valeurs' },
    { titre: 'Collaboration', description: 'Travailler ensemble vers un objectif commun' },
    { titre: 'Excellence', description: 'Viser la qualité et la performance' },
    { titre: 'Authenticité', description: 'Être soi-même sans artifice' },
    { titre: 'Adaptabilité', description: 'Capacité à s\'ajuster aux changements' },
  ]

  for (const value of values) {
    await prisma.valueItem.upsert({
      where: { titre: value.titre },
      update: {},
      create: value,
    })
  }

  // Intérêts du livret
  const interests = [
    'Informatique et nouvelles technologies',
    'Arts et culture',
    'Sport et bien-être',
    'Sciences et recherche',
    'Environnement et développement durable',
    'Social et humanitaire',
    'Entreprise et économie',
    'Éducation et formation',
    'Communication et médias',
    'Voyages et découverte',
    'Cuisine et gastronomie',
    'Bricolage et DIY',
    'Musique',
    'Lecture et écriture',
    'Jardinage et nature',
    'Photographie et vidéo',
    'Mode et design',
    'Jeux et divertissement',
    'Politique et société',
    'Spiritualité et philosophie',
  ]

  // Adjectifs du livret
  const adjectives = [
    'Créatif', 'Organisé', 'Communicatif', 'Analytique', 'Leadership',
    'Patient', 'Curieux', 'Rigoureux', 'Empathique', 'Autonome',
    'Flexible', 'Persévérant', 'Optimiste', 'Fiable', 'Innovant',
    'Collaboratif', 'Réfléchi', 'Dynamique', 'Pragmatique', 'Intuitif',
  ]

  // Création des utilisateurs de test
  const hashedPassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@bilan-competences.fr' },
    update: {},
    create: {
      email: 'admin@bilan-competences.fr',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'Système',
    },
  })

  const cep = await prisma.user.upsert({
    where: { email: 'cep@bilan-competences.fr' },
    update: {},
    create: {
      email: 'cep@bilan-competences.fr',
      passwordHash: hashedPassword,
      role: 'CEP',
      firstName: 'Conseiller',
      lastName: 'CEP',
    },
  })

  const beneficiaire = await prisma.user.upsert({
    where: { email: 'demo@bilan-competences.fr' },
    update: {},
    create: {
      email: 'demo@bilan-competences.fr',
      passwordHash: hashedPassword,
      role: 'BENEFICIAIRE',
      firstName: 'Jean',
      lastName: 'Demo',
    },
  })

  // Création d'un bilan de démonstration
  const bilan = await prisma.bilan.create({
    data: {
      userId: beneficiaire.id,
      titre: 'Bilan de compétences - Démo',
      statut: 'IN_PROGRESS',
      mode: 'GUIDE',
      modules: {
        create: [
          { key: 'PARCOURS', ordre: 1, isEnabled: true, completion: 30 },
          { key: 'EXPERIENCES', ordre: 2, isEnabled: true, completion: 60 },
          { key: 'VALEURS', ordre: 3, isEnabled: true, completion: 80 },
          { key: 'INTERETS', ordre: 4, isEnabled: true, completion: 100 },
          { key: 'ENTOURAGE', ordre: 5, isEnabled: true, completion: 0 },
          { key: 'PROJETS', ordre: 6, isEnabled: true, completion: 20 },
          { key: 'SYNTHESE', ordre: 7, isEnabled: true, completion: 0 },
        ],
      },
      timeline: {
        create: [
          {
            type: 'FORMATION',
            dateStart: new Date('2015-09-01'),
            dateEnd: new Date('2018-06-30'),
            titre: 'Licence Informatique',
            description: 'Formation en développement logiciel',
            satisfaction: 8,
            tags: ['informatique', 'formation'],
          },
          {
            type: 'PRO',
            dateStart: new Date('2018-07-01'),
            dateEnd: new Date('2020-12-31'),
            titre: 'Développeur Junior',
            description: 'Première expérience professionnelle',
            satisfaction: 7,
            tags: ['développement', 'premier emploi'],
          },
        ],
      },
    },
  })

  // Ajout de quelques expériences
  await prisma.experience.create({
    data: {
      bilanId: bilan.id,
      kind: 'PRO',
      intitule: 'Développeur Full Stack',
      entreprise: 'Tech Company',
      periodeStart: new Date('2021-01-01'),
      periodeEnd: new Date('2023-12-31'),
      descriptionContexte: 'Développement d\'applications web',
      tasks: {
        create: [
          { texte: 'Développement front-end React', ordre: 1 },
          { texte: 'Maintenance base de données', ordre: 2 },
        ],
      },
      responsibilities: {
        create: [
          { texte: 'Gestion de projet technique', ordre: 1 },
          { texte: 'Formation des juniors', ordre: 2 },
        ],
      },
      skills: {
        create: [
          { texte: 'React', category: 'TECHNIQUE', niveau: 4 },
          { texte: 'Node.js', category: 'TECHNIQUE', niveau: 3 },
          { texte: 'Communication', category: 'RELATIONNELLE', niveau: 4 },
        ],
      },
    },
  })

  console.log('Seed data created successfully!')
  console.log('Users:')
  console.log('  Admin: admin@bilan-competences.fr / password123')
  console.log('  CEP: cep@bilan-competences.fr / password123')
  console.log('  Demo: demo@bilan-competences.fr / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
