import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = "mongodb+srv://leon4rdo:Livia2701@cluster0.dpfuagq.mongodb.net/interview-prep";
const client = new MongoClient(uri);

async function fixPassword() {
  try {
    await client.connect();
    console.log("✅ Conectado ao MongoDB Atlas!");

    const db = client.db("interview-prep");
    const users = db.collection("users");

    // Gera novo hash correto
    const correctHash = await bcrypt.hash("admin123", 10);
    console.log("\n🔐 Novo hash gerado:", correctHash);

    // Atualiza o usuário admin
    const result = await users.updateOne(
      { email: "admin@leon4rdo.dev" },
      { 
        $set: { 
          password: correctHash,
          updatedAt: new Date()
        } 
      }
    );

    if (result.modifiedCount > 0) {
      console.log("✅ Senha atualizada com sucesso!");
      
      // Verifica se funcionou
      const user = await users.findOne({ email: "admin@leon4rdo.dev" });
      const match = await bcrypt.compare("admin123", user.password);
      console.log("✅ Verificação: Senha funciona?", match ? "✅ SIM!" : "❌ NÃO");
    } else {
      console.log("⚠️  Nenhum documento foi modificado");
    }

  } catch (error) {
    console.error("❌ Erro:", error.message);
  } finally {
    await client.close();
    console.log("\n🔌 Conexão fechada");
  }
}

fixPassword();
