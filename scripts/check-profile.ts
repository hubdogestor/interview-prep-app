import { prisma } from "../lib/db";

async function checkProfile() {
  console.log("🔍 Verificando profile na base de dados...\n");

  const profile = await prisma.profile.findFirst();

  if (!profile) {
    console.log("❌ Nenhum profile encontrado!\n");
    console.log("📝 Criando profile de exemplo...\n");

    const newProfile = await prisma.profile.create({
      data: {
        nome: "Seu Nome Aqui",
        titulo: "Software Engineer",
        resumo: {
          pt: "Profissional com experiência em desenvolvimento de software, especializado em criar soluções escaláveis e de alta performance.",
          en: "",
        },
        anosExperiencia: 5,
        email: "seu@email.com",
        linkedin: "linkedin.com/in/seuperfil",
        github: "github.com/seuuser",
      },
    });

    console.log("✅ Profile criado com sucesso!");
    console.log("\n📋 Dados do profile:");
    console.log(JSON.stringify(newProfile, null, 2));
    console.log(
      "\n⚠️  IMPORTANTE: Edite as informações do profile em /profile ou via Prisma Studio"
    );
  } else {
    console.log("✅ Profile encontrado!");
    console.log("\n📋 Dados do profile:");
    console.log(`ID: ${profile.id}`);
    console.log(`Nome: ${profile.nome}`);
    console.log(`Título: ${profile.titulo}`);
    console.log(`Anos de experiência: ${profile.anosExperiencia}`);
    console.log(
      `Resumo (PT): ${(profile.resumo as any).pt.substring(0, 100)}...`
    );
  }

  await prisma.$disconnect();
}

checkProfile().catch((error) => {
  console.error("❌ Erro:", error);
  process.exit(1);
});
