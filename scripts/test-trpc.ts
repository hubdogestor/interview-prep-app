/**
 * Script para testar endpoints tRPC
 * Execute com: npx tsx scripts/test-trpc.ts
 */

import { createCaller } from "@/server/api/root";
import { createContextInner } from "@/server/api/trpc";

async function testTRPC() {
  console.log("🧪 Testando endpoints tRPC...\n");

  // Criar contexto simulado
  const ctx = await createContextInner({
    headers: new Headers(),
  });

  // Criar caller
  const caller = createCaller(ctx);

  try {
    // Test 1: Profile
    console.log("1️⃣ Testando profile.get...");
    const profile = await caller.profile.get();
    console.log("✅ Profile:", profile?.nome ?? "Nenhum profile encontrado");

    // Test 2: Dashboard
    console.log("\n2️⃣ Testando dashboard.overview...");
    const dashboard = await caller.dashboard.overview();
    console.log("✅ Dashboard totals:", dashboard.totals);

    // Test 3: Icebreakers
    console.log("\n3️⃣ Testando icebreakers.list...");
    const icebreakers = await caller.icebreakers.list();
    console.log(`✅ Icebreakers: ${icebreakers.length} encontrados`);

    // Test 4: Competencias
    console.log("\n4️⃣ Testando competencias.list...");
    const competencias = await caller.competencias.list();
    console.log(`✅ Competências: ${competencias.length} encontradas`);

    // Test 5: Experiencias
    console.log("\n5️⃣ Testando experiencias.list...");
    const experiencias = await caller.experiencias.list();
    console.log(`✅ Experiências: ${experiencias.length} encontradas`);

    // Test 6: Speeches
    console.log("\n6️⃣ Testando speeches.list...");
    const speeches = await caller.speeches.list();
    console.log(`✅ Speeches: ${speeches.length} encontrados`);

    // Test 7: Questions
    console.log("\n7️⃣ Testando questions.list...");
    const questions = await caller.questions.list();
    console.log(`✅ Questions: ${questions.length} encontradas`);

    console.log("\n✨ Todos os testes passaram com sucesso!");
  } catch (error) {
    console.error("\n❌ Erro durante os testes:", error);
    process.exit(1);
  }
}

testTRPC();
