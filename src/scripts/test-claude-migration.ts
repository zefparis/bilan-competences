import { analyzeTransferableSkills } from '@/lib/transferable-skills-analyzer'

async function test() {
  console.log('🧪 Test migration Claude - Analyse compétences transférables\n')
  
  try {
    const result = await analyzeTransferableSkills({
      currentJob: {
        title: 'Développeur Web',
        skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
        experience: '3 ans de développement web, projets dashboards et applications SaaS'
      },
      targetJob: {
        romeCode: 'M1805',
        title: 'Data Analyst',
        requiredSkills: ['Python', 'SQL', 'Statistiques', 'Visualisation données', 'Machine Learning']
      }
    })
    
    console.log('✅ Test réussi!\n')
    console.log('📊 Résultats:')
    console.log(JSON.stringify(result, null, 2))
    
    console.log('\n📈 Score de compatibilité:', result.compatibilityScore + '/100')
    console.log('🎯 Compétences transférables:', result.transferableSkills.length)
    console.log('📚 Gap de compétences:', result.skillsGap.length)
    
  } catch (error) {
    console.error('❌ Test échoué:', error)
    process.exit(1)
  }
}

test().catch(console.error)
