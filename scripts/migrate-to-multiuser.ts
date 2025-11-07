/**
 * Script de Migração - Single User → Multi User
 *
 * Este script migra dados existentes para o novo schema multi-user.
 * Cria um usuário "default" e associa todos os registros existentes a ele.
 *
 * IMPORTANTE: Execute apenas UMA VEZ após atualizar o schema Prisma
 *
 * Uso:
 * npx tsx scripts/migrate-to-multiuser.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateToMultiUser() {
  console.log('🔄 Iniciando migração para multi-user...\n');

  try {
    // ========================================
    // 1. Criar usuário default
    // ========================================
    console.log('📝 Criando usuário default...');

    const defaultUser = await prisma.user.upsert({
      where: { email: 'default@interview-prep.local' },
      update: {},
      create: {
        email: 'default@interview-prep.local',
        name: 'Usuário Default',
        emailVerified: new Date(),
      },
    });

    console.log(`✅ Usuário criado: ${defaultUser.name} (ID: ${defaultUser.id})\n`);

    const userId = defaultUser.id;

    // ========================================
    // 2. Contar registros existentes
    // ========================================
    console.log('📊 Contando registros existentes...');

    const counts = {
      profiles: await prisma.profile.count(),
      icebreakers: await prisma.icebreaker.count(),
      speeches: await prisma.speech.count(),
      competencias: await prisma.competencia.count(),
      experiencias: await prisma.experiencia.count(),
      questions: await prisma.question.count(),
      practiceSessions: await prisma.practiceSession.count(),
    };

    console.log('Registros encontrados:');
    console.log(`  - Profiles: ${counts.profiles}`);
    console.log(`  - Icebreakers: ${counts.icebreakers}`);
    console.log(`  - Speeches: ${counts.speeches}`);
    console.log(`  - Competências: ${counts.competencias}`);
    console.log(`  - Experiências: ${counts.experiencias}`);
    console.log(`  - Questions: ${counts.questions}`);
    console.log(`  - Practice Sessions: ${counts.practiceSessions}\n`);

    // ========================================
    // 3. Migrar Profile
    // ========================================
    if (counts.profiles > 0) {
      console.log('🔄 Migrando Profiles...');

      // Buscar profiles sem userId
      const profilesWithoutUser = await prisma.profile.findMany({
        where: { userId: { equals: null } },
      });

      for (const profile of profilesWithoutUser) {
        await prisma.profile.update({
          where: { id: profile.id },
          data: { userId },
        });
      }

      console.log(`✅ ${profilesWithoutUser.length} profiles migrados\n`);
    }

    // ========================================
    // 4. Migrar Icebreakers
    // ========================================
    if (counts.icebreakers > 0) {
      console.log('🔄 Migrando Icebreakers...');

      const icebreakersWithoutUser = await prisma.icebreaker.findMany({
        where: { userId: { equals: null } },
      });

      for (const icebreaker of icebreakersWithoutUser) {
        await prisma.icebreaker.update({
          where: { id: icebreaker.id },
          data: { userId },
        });
      }

      console.log(`✅ ${icebreakersWithoutUser.length} icebreakers migrados\n`);
    }

    // ========================================
    // 5. Migrar Speeches
    // ========================================
    if (counts.speeches > 0) {
      console.log('🔄 Migrando Speeches...');

      const speechesWithoutUser = await prisma.speech.findMany({
        where: { userId: { equals: null } },
      });

      for (const speech of speechesWithoutUser) {
        await prisma.speech.update({
          where: { id: speech.id },
          data: { userId },
        });
      }

      console.log(`✅ ${speechesWithoutUser.length} speeches migrados\n`);
    }

    // ========================================
    // 6. Migrar Competências
    // ========================================
    if (counts.competencias > 0) {
      console.log('🔄 Migrando Competências...');

      const competenciasWithoutUser = await prisma.competencia.findMany({
        where: { userId: { equals: null } },
      });

      for (const competencia of competenciasWithoutUser) {
        await prisma.competencia.update({
          where: { id: competencia.id },
          data: { userId },
        });
      }

      console.log(`✅ ${competenciasWithoutUser.length} competências migradas\n`);
    }

    // ========================================
    // 7. Migrar Experiências
    // ========================================
    if (counts.experiencias > 0) {
      console.log('🔄 Migrando Experiências...');

      const experienciasWithoutUser = await prisma.experiencia.findMany({
        where: { userId: { equals: null } },
      });

      for (const experiencia of experienciasWithoutUser) {
        await prisma.experiencia.update({
          where: { id: experiencia.id },
          data: { userId },
        });
      }

      console.log(`✅ ${experienciasWithoutUser.length} experiências migradas\n`);
    }

    // ========================================
    // 8. Migrar Questions
    // ========================================
    if (counts.questions > 0) {
      console.log('🔄 Migrando Questions...');

      const questionsWithoutUser = await prisma.question.findMany({
        where: { userId: { equals: null } },
      });

      for (const question of questionsWithoutUser) {
        await prisma.question.update({
          where: { id: question.id },
          data: { userId },
        });
      }

      console.log(`✅ ${questionsWithoutUser.length} questions migradas\n`);
    }

    // ========================================
    // 9. Migrar Practice Sessions
    // ========================================
    if (counts.practiceSessions > 0) {
      console.log('🔄 Migrando Practice Sessions...');

      const practiceSessionsWithoutUser = await prisma.practiceSession.findMany({
        where: { userId: { equals: null } },
      });

      for (const session of practiceSessionsWithoutUser) {
        await prisma.practiceSession.update({
          where: { id: session.id },
          data: { userId },
        });
      }

      console.log(`✅ ${practiceSessionsWithoutUser.length} practice sessions migradas\n`);
    }

    // ========================================
    // 10. Resumo
    // ========================================
    console.log('═══════════════════════════════════════════════════════');
    console.log('✨ Migração concluída com sucesso!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`\n👤 Usuário default criado: ${defaultUser.email}`);
    console.log(`📦 Todos os ${Object.values(counts).reduce((a, b) => a + b, 0)} registros foram associados ao usuário default\n`);

  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar migração
migrateToMultiUser()
  .then(() => {
    console.log('✅ Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script falhou:', error);
    process.exit(1);
  });
