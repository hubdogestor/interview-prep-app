import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = "mongodb+srv://leon4rdo:Livia2701@cluster0.dpfuagq.mongodb.net/interview-prep";
const client = new MongoClient(uri);

async function checkUser() {
  try {
    await client.connect();
    console.log("✅ Conectado ao MongoDB Atlas!");

    const db = client.db("interview-prep");
    const users = db.collection("users");

    // Lista todos os usuários
    const allUsers = await users.find({}).toArray();
    console.log("\n📋 Usuários encontrados:", allUsers.length);
    
    for (const user of allUsers) {
      console.log("\n👤 Usuário:");
      console.log("  ID:", user._id);
      console.log("  Email:", user.email);
      console.log("  Nome:", user.name);
      console.log("  Tem senha?", !!user.password);
      
      if (user.password) {
        console.log("  Hash da senha:", user.password);
        
        // Testa a senha admin123
        const match = await bcrypt.compare("admin123", user.password);
        console.log("  ✅ Senha 'admin123' funciona?", match ? "✅ SIM" : "❌ NÃO");
      }
    }

    // Se não houver usuário admin, cria um novo
    const adminUser = await users.findOne({ email: "admin@leon4rdo.dev" });
    
    if (!adminUser) {
      console.log("\n⚠️  Usuário admin não encontrado! Criando...");
      
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const result = await users.insertOne({
        email: "admin@leon4rdo.dev",
        name: "Leonardo Menezes",
        password: hashedPassword,
        emailVerified: new Date("2025-11-22T00:00:00.000Z"),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      console.log("✅ Usuário admin criado com ID:", result.insertedId);
      console.log("   Hash da senha:", hashedPassword);
    } else if (adminUser && !adminUser.password) {
      console.log("\n⚠️  Usuário admin existe mas não tem senha! Adicionando...");
      
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await users.updateOne(
        { email: "admin@leon4rdo.dev" },
        { $set: { password: hashedPassword } }
      );
      
      console.log("✅ Senha adicionada ao usuário admin");
      console.log("   Hash da senha:", hashedPassword);
    }

  } catch (error) {
    console.error("❌ Erro:", error.message);
  } finally {
    await client.close();
    console.log("\n🔌 Conexão fechada");
  }
}

checkUser();
