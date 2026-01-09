/**
 * Test script to reproduce PDF generation error
 */

const { prepareProfileData } = require('./src/lib/pdf/generator.tsx');

const testData = {
  meta: {
    id: 'TEST-123',
    date: '2026-01-09',
    userName: 'Test User',
  },
  cognitive: {
    flexibility: 50,
    inhibitoryControl: 50,
    processingSpeed: 50,
  },
  riasec: {
    R: 17,
    I: 16,
    A: 17,
    S: 16,
    E: 17,
    C: 17,
    dominant: ['R', 'I', 'E'],
  },
  values: [
    { name: 'Créativité', satisfaction: 3, importance: 4 },
  ],
  career: [],
};

console.log('Testing PDF data preparation...');
try {
  const prepared = prepareProfileData(testData);
  console.log('✅ Success!');
  console.log('RIASEC:', prepared.riasec);
  console.log('Cognitive:', prepared.cognitive);
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
}
