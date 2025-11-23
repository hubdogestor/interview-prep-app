#!/usr/bin/env node

/**
 * Script para limpar todos os cards dos Kanbans e OKRs
 * Uso: node scripts/clear-all-cards.mjs
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllCards() {
  console.log('🗑️  Iniciando limpeza de todos os cards...\n');

  try {
    // Limpar todos os Kanbans
    const kanbansResult = await prisma.kanbanBoard.deleteMany({});
    console.log(`✅ Kanbans limpos: ${kanbansResult.count} registros deletados`);

    // Limpar todos os OKRs
    const okrsResult = await prisma.oKR.deleteMany({});
    console.log(`✅ OKRs limpos: ${okrsResult.count} registros deletados`);

    console.log('\n🎉 Limpeza concluída com sucesso!');
    console.log('💡 Agora você pode criar novos cards com o sistema de flags atualizado.');
  } catch (error) {
    console.error('❌ Erro ao limpar cards:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

clearAllCards();
