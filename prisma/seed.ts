import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Création d'un utilisateur de test
  const passwordHash = await bcrypt.hash("demo1234", 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@bilan-competences.fr' },
    update: { passwordHash },
    create: {
      email: 'demo@bilan-competences.fr',
      passwordHash,
    }
  })

  // Création d'une évaluation de démonstration
  const assessment = await prisma.assessment.create({
    data: {
      userId: user.id,
      status: 'IN_PROGRESS'
    }
  })

  // Création d'un parcours de vie avec événements
  await prisma.lifePath.create({
    data: {
      assessmentId: assessment.id,
      events: {
        create: [
          {
            year: 2015,
            title: 'Licence Informatique',
            type: 'FORMATION',
            sentiment: 8,
            description: 'Formation en développement logiciel'
          },
          {
            year: 2018,
            title: 'Premier emploi',
            type: 'PRO',
            sentiment: 7,
            description: 'Développeur junior'
          },
          {
            year: 2021,
            title: 'Déménagement',
            type: 'PERSO',
            sentiment: 6,
            description: 'Changement de ville'
          }
        ]
      }
    }
  })

  // Création d'expériences professionnelles
  await prisma.experience.create({
    data: {
      assessmentId: assessment.id,
      title: 'Développeur Full Stack',
      company: 'Tech Company',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2023-12-31'),
      situation: 'Développement d\'applications web pour clients internationaux',
      task: 'Concevoir et implémenter des fonctionnalités front-end et back-end',
      action: 'Utilisation de React, Node.js et PostgreSQL pour créer une application complète',
      result: 'Livraison réussie avec satisfaction client élevée',
      skills: 'React,Node.js,PostgreSQL,Communication'
    }
  })

  // Création de valeurs utilisateur
  const values = [
    'Autonomie', 'Créativité', 'Sécurité', 'Reconnaissance', 'Développement personnel',
    'Solidarité', 'Liberté', 'Responsabilité', 'Équilibre vie pro/perso', 'Innovation'
  ]

  for (let i = 0; i < values.length; i++) {
    await prisma.userValue.create({
      data: {
        assessmentId: assessment.id,
        valueName: values[i],
        order: i + 1,
        gapScore: i % 5 + 1 // Score aléatoire entre 1 et 5
      }
    })
  }

  console.log('Seed data created successfully!')
  console.log(`User: demo@bilan-competences.fr`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
