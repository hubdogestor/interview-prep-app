import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

type CollectionCheck = {
  label: string;
  run: () => Promise<number>;
};

function describeConnection(uri: string) {
  try {
    const parsed = new URL(uri);
    const dbName = parsed.pathname.replace(/^\//, "") || "(nao definido)";

    console.log("ENV  Variaveis de ambiente detectadas:");
    console.log(`   - Host: ${parsed.host}`);
    console.log(`   - Banco: ${dbName}`);
  } catch {
    console.log(
      "WARN Nao foi possivel analisar o DATABASE_URL (registro apenas de que ele existe)."
    );
  }
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL nao esta definido. Verifique o arquivo .env.local ou suas variaveis de ambiente."
    );
  }

  describeConnection(databaseUrl);

  const { prisma } = await import("../lib/db");

  try {
    console.log("\nINFO Testando conexao com MongoDB via Prisma...\n");

    const start = Date.now();
    await prisma.$runCommandRaw({ ping: 1 });
    const elapsed = Date.now() - start;
    console.log(`OK   Ping respondido em ${elapsed}ms`);

    const checks: CollectionCheck[] = [
      { label: "Profiles", run: () => prisma.profile.count() },
      { label: "Icebreakers", run: () => prisma.icebreaker.count() },
      { label: "Competencias", run: () => prisma.competencia.count() },
      { label: "Experiencias", run: () => prisma.experiencia.count() },
      { label: "Speeches", run: () => prisma.speech.count() },
      { label: "Questions", run: () => prisma.question.count() },
      { label: "Practice Sessions", run: () => prisma.practiceSession.count() },
    ];

    console.log("\nINFO Contagem de colecoes:");
    for (const check of checks) {
      try {
        const total = await check.run();
        console.log(`   - ${check.label.padEnd(20)} ${total}`);
      } catch (error) {
        console.log(
          `   - ${check.label.padEnd(20)} erro ao contar -> ${(error as Error).message}`
        );
      }
    }

    const profile = await prisma.profile.findFirst();

    if (profile) {
      console.log("\nINFO Sample profile encontrado:");
      console.log(`   - Nome: ${profile.nome}`);
      console.log(`   - Titulo: ${profile.titulo}`);
      console.log(`   - Atualizado em: ${profile.updatedAt.toISOString()}`);
    } else {
      console.log(
        "\nWARN Nenhum profile encontrado. Rode `npx tsx scripts/check-profile.ts` para criar um registro inicial."
      );
    }

    console.log("\nDONE Conexao validada com sucesso!");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("\nERRO ao testar conexao:", error);
  process.exitCode = 1;
});
