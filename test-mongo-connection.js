// Script para testar conexão com MongoDB
// Execute: node test-mongo-connection.js

require('dotenv/config');
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URL || "COLE_SUA_CONNECTION_STRING_AQUI";

async function testConnection() {
  console.log('🔄 Testando conexão com MongoDB Atlas...\n');
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    console.log('📡 Conectando...');
    await client.connect();
    
    console.log('✅ Conexão bem-sucedida!\n');
    
    // Listar databases
    const adminDb = client.db().admin();
    const { databases } = await adminDb.listDatabases();
    
    console.log('📊 Databases disponíveis:');
    databases.forEach(db => {
      console.log(`  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    // Testar database interview-prep
    const db = client.db('interview-prep');
    const collections = await db.listCollections().toArray();
    
    console.log('\n📁 Collections em interview-prep:');
    if (collections.length === 0) {
      console.log('  (nenhuma collection ainda - será criada ao inserir dados)');
    } else {
      collections.forEach(coll => {
        console.log(`  - ${coll.name}`);
      });
    }
    
    console.log('\n🎉 MongoDB está pronto para uso!');
    
  } catch (error) {
    console.error('❌ Erro na conexão:');
    console.error(error.message);
    
    if (error.message.includes('Server selection timeout')) {
      console.log('\n💡 Possíveis causas:');
      console.log('  1. IP não liberado no Network Access');
      console.log('  2. Cluster pausado ou inativo');
      console.log('  3. Connection string incorreta');
      console.log('  4. Senha com caracteres especiais não escapados');
    }
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Problema de autenticação:');
      console.log('  1. Usuário ou senha incorretos');
      console.log('  2. Usuário não tem permissão no database');
    }
    
  } finally {
    await client.close();
  }
}

testConnection();
