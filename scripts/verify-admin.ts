import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function verifyAdmin() {
  console.log("🔍 Verificando usuário admin...");

  try {
    // Busca o usuário
    const user = await prisma.user.findUnique({
      where: { email: "admin@leon4rdo.dev" },
    });

    if (!user) {
      console.log("❌ Usuário não encontrado!");
      console.log("Criando novo usuário...");

      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      const newUser = await prisma.user.create({
        data: {
          email: "admin@leon4rdo.dev",
          name: "Leonardo Menezes",
          password: hashedPassword,
          emailVerified: new Date(),
        },
      });

      console.log("✅ Usuário criado com sucesso!");
      console.log("ID:", newUser.id);
      console.log("Email:", newUser.email);
      console.log("Hash da senha:", newUser.password);
      return;
    }

    console.log("✅ Usuário encontrado!");
    console.log("ID:", user.id);
    console.log("Email:", user.email);
    console.log("Nome:", user.name);
    console.log("Hash atual:", user.password);

    // Testa a senha
    if (user.password) {
      const passwordMatch = await bcrypt.compare("admin123", user.password);
      console.log("\n🔐 Teste de senha:");
      console.log("Senha 'admin123' corresponde ao hash?", passwordMatch ? "✅ SIM" : "❌ NÃO");

      if (!passwordMatch) {
        console.log("\n🔄 Atualizando senha...");
        const newHash = await bcrypt.hash("admin123", 10);
        
        await prisma.user.update({
          where: { email: "admin@leon4rdo.dev" },
          data: { password: newHash },
        });

        console.log("✅ Senha atualizada com sucesso!");
        console.log("Novo hash:", newHash);
      }
    } else {
      console.log("⚠️  Usuário sem senha cadastrada!");
      console.log("Adicionando senha...");
      
      const newHash = await bcrypt.hash("admin123", 10);
      
      await prisma.user.update({
        where: { email: "admin@leon4rdo.dev" },
        data: { password: newHash },
      });

      console.log("✅ Senha adicionada com sucesso!");
    }
  } catch (error) {
    console.error("❌ Erro:", error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAdmin();
