// Test script to verify authentication and database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testAuth() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test database connection
    const users = await prisma.user.findMany({
      take: 5,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      }
    });
    
    console.log('✅ Database connected successfully');
    console.log('📊 Found users:', users.length);
    console.log('👥 Users:', JSON.stringify(users, null, 2));
    
    // Check if any user has an image
    const usersWithImages = users.filter(u => u.image);
    console.log('🖼️  Users with images:', usersWithImages.length);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
