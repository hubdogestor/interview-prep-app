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
    // 1. Criar usuário default para dados existentes
    console.log('📝 Criando usuário default...');
    const defaultUser = await prisma.user.upsert({
      where: { email: 'default@interview-prep.local' },
      update: {
        name: 'Default User',
      },
      create: {
        email: 'default@interview-prep.local',
        name: 'Default User',
        emailVerified: new Date(),
      },
    });

    console.log(`✅ Usuário default criado: ${defaultUser.id}`);
    console.log(`   Email: ${defaultUser.email}\n`);

    // 2. Verificar quantos registros sem userId existem
    console.log('🔍 Verificando registros sem userId...\n');

    const counts = {
      profiles: await prisma.profile.count({
        where: { userId: { equals: undefined as any } },
      }),
      icebreakers: await prisma.icebreaker.count({
        where: { userId: { equals: undefined as any } },
      }),
      speeches: await prisma.speech.count({
        where: { userId: { equals: undefined as any } },
      }),
      competencias: await prisma.competencia.count({
        where: { userId: { equals: undefined as any } },
      }),
      experiencias: await prisma.experiencia.count({
        where: { userId: { equals: undefined as any } },
      }),
      questions: await prisma.question.count({
        where: { userId: { equals: undefined as any } },
      }),
      practices: await prisma.practiceSession.count({
        where: { userId: { equals: undefined as any } },
      }),
    };

    console.log('Registros encontrados:');
    console.log(`  - Profiles: ${counts.profiles}`);
    console.log(`  - Icebreakers: ${counts.icebreakers}`);
    console.log(`  - Speeches: ${counts.speeches}`);
    console.log(`  - Competencias: ${counts.competencias}`);
    console.log(`  - Experiencias: ${counts.experiencias}`);
    console.log(`  - Questions: ${counts.questions}`);
    console.log(`  - Practice Sessions: ${counts.practices}\n`);

    const total =
      counts.profiles +
      counts.icebreakers +
      counts.speeches +
      counts.competencias +
      counts.experiencias +
      counts.questions +
      counts.practices;

    if (total === 0) {
      console.log('✨ Nenhum registro sem userId encontrado. Migração não necessária.');
      return;
    }

    console.log(`📊 Total de ${total} registros para migrar\n`);
    console.log('🚀 Iniciando migração...\n');

    // 3. Atualizar Profile
    if (counts.profiles > 0) {
      console.log('Migrando Profiles...');
      const profilesUpdated = await prisma.profile.updateMany({
        where: { userId: { equals: undefined as any } },
        data: { userId: defaultUser.id },
      });
      console.log(`✅ ${profilesUpdated.count} profiles atualizados`);
    }

    // 4. Atualizar Icebreakers
    if (counts.icebreakers > 0) {
      console.log('Migrando Icebreakers...');
      const icebreakersUpdated = await prisma.icebreaker.updateMany({
        where: { userId: { equals: undefined as any } },
        data: { userId: defaultUser.id },
      });
      console.log(`✅ ${icebreakersUpdated.count} icebreakers atualizados`);
    }

    // 5. Atualizar Speeches
    if (counts.speeches > 0) {
      console.log('Migrando Speeches...');
      const speechesUpdated = await prisma.speech.updateMany({
        where: { userId: { equals: undefined as any } },
        data: { userId: defaultUser.id },
      });
      console.log(`✅ ${speechesUpdated.count} speeches atualizados`);
    }

    // 6. Atualizar Competencias
    if (counts.competencias > 0) {
      console.log('Migrando Competencias...');
      const competenciasUpdated = await prisma.competencia.updateMany({
        where: { userId: { equals: undefined as any } },
        data: { userId: defaultUser.id },
      });
      console.log(`✅ ${competenciasUpdated.count} competencias atualizadas`);
    }

    // 7. Atualizar Experiencias
    if (counts.experiencias > 0) {
      console.log('Migrando Experiencias...');
      const experienciasUpdated = await prisma.experiencia.updateMany({
        where: { userId: { equals: undefined as any } },
        data: { userId: defaultUser.id },
      });
      console.log(`✅ ${experienciasUpdated.count} experiencias atualizadas`);
    }

    // 8. Atualizar Questions
    if (counts.questions > 0) {
      console.log('Migrando Questions...');
      const questionsUpdated = await prisma.question.updateMany({
        where: { userId: { equals: undefined as any } },
        data: { userId: defaultUser.id },
      });
      console.log(`✅ ${questionsUpdated.count} questions atualizadas`);
    }

    // 9. Atualizar PracticeSessions
    if (counts.practices > 0) {
      console.log('Migrando Practice Sessions...');
      const practiceUpdated = await prisma.practiceSession.updateMany({
        where: { userId: { equals: undefined as any } },
        data: { userId: defaultUser.id },
      });
      console.log(`✅ ${practiceUpdated.count} practice sessions atualizadas`);
    }

    console.log('\n✨ Migração concluída com sucesso!\n');
    console.log('📋 Próximos passos:');
    console.log('   1. Todos os dados existentes agora pertencem ao usuário default');
    console.log('   2. Configure as variáveis de ambiente do NextAuth');
    console.log('   3. Faça login com um provider OAuth');
    console.log('   4. (Opcional) Transfira dados do usuário default para sua conta\n');
  } catch (error) {
    console.error('\n❌ Erro durante a migração:', error);
    throw error;
  }
}

// Executar migração
console.log('═══════════════════════════════════════════════════════');
console.log('  MIGRAÇÃO PARA MULTI-USER - Interview Prep App');
console.log('═══════════════════════════════════════════════════════\n');

migrateToMultiUser()
  .catch((e) => {
    console.error('❌ Falha na migração:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Conexão com banco de dados encerrada.');
  });
