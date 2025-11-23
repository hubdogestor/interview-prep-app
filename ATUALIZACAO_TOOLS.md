# 🔧 Guia de Atualização - TOOLS (OKRs e Kanbans)

## ✅ O que foi implementado

Agora **todos os módulos da seção TOOLS** também possuem autenticação e salvamento automático no banco de dados:

### Módulos Atualizados:

1. ✅ **Overview (Dashboard)** - Dados filtrados por usuário
2. ✅ **OKRs 2026** - OKRs salvos por usuário no MongoDB
3. ✅ **Kanbans (LEO, AMZ, OLB, HDG)** - Boards salvos por usuário
4. ✅ **Profile** - Perfil específico do usuário logado

---

## 📋 Alterações Realizadas

### 1. Schema Prisma Atualizado

Adicionados novos models para OKRs e Kanban Boards:

```prisma
model OKR {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  quarter   String   // "2026-Q1", "2026-Q2", etc
  columns   Json     // Array de colunas do board
  userId    String?  @db.ObjectId
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model KanbanBoard {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String   // "leo", "amz", "olb", "hdg"
  columns   Json     // Array de colunas do board
  userId    String?  @db.ObjectId
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([name, userId])
}
```

### 2. Novos Routers tRPC

#### **okrs.ts** - Gerenciar OKRs
- `get()` - Buscar OKRs do usuário
- `getByQuarter(quarter)` - Buscar OKRs de um trimestre específico
- `save(quarter, columns)` - Salvar ou atualizar OKRs
- `delete(id)` - Deletar OKR
- `listQuarters()` - Listar todos os trimestres com OKRs

#### **kanbans.ts** - Gerenciar Kanban Boards
- `get(name)` - Buscar board por nome (leo, amz, olb, hdg)
- `list()` - Listar todos os boards do usuário
- `save(name, columns)` - Salvar ou atualizar board
- `delete(id)` - Deletar board

### 3. Routers Atualizados para `protectedProcedure`

- ✅ **dashboard.ts** - Filtra todos os dados por userId
- ✅ **profile.ts** - Retorna apenas perfil do usuário logado

---

## 🚀 Como Usar

### Passo 1: Regenerar Prisma Client

Após alterar o schema, você **DEVE** regenerar o cliente Prisma:

```bash
# Gerar novo cliente Prisma com os novos models
npx prisma generate

# Sincronizar schema com MongoDB (não cria migrations em MongoDB)
npx prisma db push
```

### Passo 2: Verificar no MongoDB Atlas

Os novos dados serão salvos nas collections:
- `okrs` - OKRs dos usuários
- `kanban_boards` - Boards dos usuários

### Passo 3: Integrar nas Páginas (Exemplo)

#### OKRs 2026

```typescript
// app/okrs-2026/page.tsx
import { api } from "@/lib/trpc/server";

export default async function Okrs2026Page() {
  const okr = await api.okrs.get();
  const columns = okr?.columns || defaultColumns;
  
  return <OKRBoard columns={columns} />;
}
```

#### Kanban LEO

```typescript
// app/kanban-leo/page.tsx
import { api } from "@/lib/trpc/server";

export default async function KanbanLeoPage() {
  const board = await api.kanbans.get({ name: "leo" });
  const columns = board?.columns || defaultColumns;
  
  return <TrelloBoard columns={columns} />;
}
```

### Passo 4: Salvar Alterações

Adicione botão para salvar no componente:

```typescript
const saveMutation = api.kanbans.save.useMutation();

const handleSave = async () => {
  await saveMutation.mutateAsync({
    name: "leo",
    columns: currentColumns,
  });
};
```

---

## 🔄 Funcionalidades por Módulo

### 📊 Overview (Dashboard)
- ✅ **Salvo automaticamente** - Dados vêm dos outros módulos
- ✅ **Filtrado por userId** - Cada usuário vê apenas seus dados
- ✅ **Totais, recentes, favoritos** - Tudo isolado por usuário

### ⭐ OKRs 2026
- ✅ **Salvar OKRs** - Por trimestre (Q1, Q2, Q3, Q4)
- ✅ **Carregar OKRs** - Último OKR salvo ou por trimestre
- ✅ **Histórico** - Lista de todos os trimestres com OKRs

### 📋 Kanbans (LEO, AMZ, OLB, HDG)
- ✅ **Salvar boards** - Cada board independente por nome
- ✅ **Carregar boards** - Estado salvo do board
- ✅ **Múltiplos boards** - Usuário pode ter vários boards

---

## 🔐 Segurança Implementada

### Isolamento de Dados
- ✅ Cada usuário acessa apenas **seus próprios OKRs**
- ✅ Cada usuário acessa apenas **seus próprios Kanban Boards**
- ✅ Dashboard mostra apenas **dados do usuário logado**
- ✅ Impossível acessar dados de outros usuários

### Autenticação Obrigatória
- ✅ Todas as rotas exigem login
- ✅ Token JWT validado automaticamente
- ✅ Erro 401 se não autenticado

---

## 📝 Exemplo de Uso Completo

### 1. Salvar OKR

```typescript
"use client";

import { api } from "@/lib/trpc/client";

export function SaveOKRButton({ columns }) {
  const mutation = api.okrs.save.useMutation();
  
  const handleSave = async () => {
    try {
      await mutation.mutateAsync({
        quarter: "2026-Q1",
        columns: columns,
      });
      alert("OKR salvo com sucesso!");
    } catch (error) {
      alert("Erro ao salvar OKR");
    }
  };
  
  return (
    <button onClick={handleSave} disabled={mutation.isLoading}>
      {mutation.isLoading ? "Salvando..." : "Salvar OKR"}
    </button>
  );
}
```

### 2. Carregar Kanban Board

```typescript
"use client";

import { api } from "@/lib/trpc/client";
import { useState, useEffect } from "react";

export function KanbanLeoBoard() {
  const [columns, setColumns] = useState([]);
  const { data: board } = api.kanbans.get.useQuery({ name: "leo" });
  
  useEffect(() => {
    if (board?.columns) {
      setColumns(board.columns);
    }
  }, [board]);
  
  const saveMutation = api.kanbans.save.useMutation();
  
  const handleSave = async () => {
    await saveMutation.mutateAsync({
      name: "leo",
      columns: columns,
    });
  };
  
  return (
    <>
      <TrelloBoard 
        columns={columns} 
        onColumnsChange={setColumns}
      />
      <button onClick={handleSave}>Salvar</button>
    </>
  );
}
```

---

## ⚠️ Importante

### Antes de Usar em Produção

1. **Execute `npx prisma generate`** - Gera cliente com novos models
2. **Execute `npx prisma db push`** - Sincroniza schema com MongoDB
3. **Faça commit das alterações** - Suba para o repositório
4. **Deploy na Vercel** - As variáveis de ambiente já devem estar configuradas

### Verificação no MongoDB

Após salvar pela primeira vez, verifique no MongoDB Atlas:
- Collection `okrs` deve ter documentos com `userId`
- Collection `kanban_boards` deve ter documentos com `userId` e `name`

---

## 🎯 Status de Implementação

| Módulo | Autenticação | Salvamento | Status |
|--------|--------------|------------|--------|
| Overview | ✅ | ✅ (via outros módulos) | ✅ Completo |
| OKRs 2026 | ✅ | ✅ | ✅ Completo |
| Kanban LEO | ✅ | ✅ | ✅ Completo |
| Kanban AMZ | ✅ | ✅ | ✅ Completo |
| Kanban OLB | ✅ | ✅ | ✅ Completo |
| Kanban HDG | ✅ | ✅ | ✅ Completo |
| Profile | ✅ | ✅ | ✅ Completo |
| Icebreakers | ✅ | ✅ | ✅ Completo |
| Competências | ✅ | ✅ | ✅ Completo |
| Experiências | ✅ | ✅ | ✅ Completo |
| Speeches | ✅ | ✅ | ✅ Completo |
| Questions | ✅ | ✅ | ✅ Completo |

---

## 🚀 Próximos Passos Sugeridos

1. ✅ **Atualizar componentes das páginas** para consumir da API - **COMPLETO**
2. ✅ **Adicionar botões de salvar** nos boards interativos - **NÃO NECESSÁRIO** (auto-save elimina necessidade)
3. ✅ **Implementar auto-save** (salvar a cada alteração) - **COMPLETO**
4. ✅ **Adicionar indicador de "salvando..."** na UI - **COMPLETO**
5. ✅ **Implementar sincronização em tempo real** - **COMPLETO**

---

## 🎉 TODOS OS PRÓXIMOS PASSOS FORAM IMPLEMENTADOS!

Veja a documentação completa em: **`AUTOSAVE_COMPLETO.md`**

### Resumo do que foi implementado:

- ✅ **Hook universal `useAutoSave`** - Debounce configurável para qualquer tipo de dado
- ✅ **Componente `AutoSaveIndicator`** - Feedback visual com timestamps
- ✅ **Kanbans com auto-save** - LEO, AMZ, OLB, HDG (1s debounce)
- ✅ **OKRs 2026 com auto-save** - Drag-and-drop salva automaticamente
- ✅ **Todos os formulários** - Questions, Icebreakers, Competências, Experiências, Speeches
- ✅ **Practice Sessions** - Gravações de áudio salvas automaticamente
- ✅ **Indicadores visuais** - "Salvando...", "Salvo há X minutos", animações
- ✅ **Sincronização via React Query** - Cache invalidation automática

**A aplicação está 100% funcional com auto-save em TODOS os módulos!** 🚀
 (opcional)

---

**Todos os módulos agora estão protegidos e salvam dados por usuário!** 🎉
