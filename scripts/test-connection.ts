// Carregar variáveis de ambiente
import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';

async function testConnection() {
  console.log('🔍 Testando conexão com MongoDB...\n');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');

  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    console.log('✅ Conexão estabelecida com sucesso!');

    // Tentar contar documentos
    const userCount = await prisma.user.count();
    console.log(`📊 Usuários na base: ${userCount}`);

    const profileCount = await prisma.profile.count();
    console.log(`📊 Profiles na base: ${profileCount}`);

  } catch (error) {
    console.error('❌ Erro ao conectar:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
