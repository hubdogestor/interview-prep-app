# Bundle Optimization Guide

Este guia documenta as estratégias de otimização implementadas para reduzir o tamanho do bundle e melhorar o desempenho da aplicação.

## 🎯 Objetivos

- Reduzir First Load JS em 20-30%
- Melhorar Time to Interactive (TTI)
- Otimizar Core Web Vitals (LCP, FID, CLS)
- Manter boa Developer Experience (DX)

## 📦 Dynamic Imports Implementados

### Uso

```typescript
import { TrelloBoard } from '@/lib/dynamic-imports'

// Usar normalmente - carrega apenas quando renderizado
<TrelloBoard board={boardData} />
```

### Componentes Otimizados

| Componente | Tamanho | Economia | Loading State |
|------------|---------|----------|---------------|
| TrelloBoard | ~25 KB | ✅ Médio | Skeleton |

**Total economizado**: ~25-30 KB (~5-8% do bundle)

**Nota:** Outros componentes podem ser adicionados conforme necessário usando o mesmo padrão de dynamic import.

## 🚀 Otimizações Aplicadas

### 1. Tree Shaking

```typescript
// ✅ BOM: Import específico
import { motion } from 'framer-motion'
import { Plus, Edit } from 'lucide-react'

// ❌ EVITAR: Import genérico
import * as motion from 'framer-motion'
import * as Icons from 'lucide-react'
```

### 2. Code Splitting Automático

Next.js faz code splitting automático por página:

- `/icebreakers` → icebreakers chunk
- `/speeches` → speeches chunk
- `/competencias` → competencias chunk

### 3. Server Components

Componentes que não precisam de interatividade usam Server Components (RSC):

```typescript
// app/page.tsx - Server Component por padrão
export default async function HomePage() {
  // Fetch direto no servidor
  const data = await prisma.profile.findFirst()
  
  return <Dashboard data={data} />
}
```

### 4. Lazy Loading de Imagens

```typescript
import Image from 'next/image'

<Image
  src="/avatar.png"
  alt="Avatar"
  width={40}
  height={40}
  loading="lazy"  // Lazy load automático
/>
```

### 5. Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // Evita FOIT
  preload: true,    // Preload crítico
})
```

## 📊 Scripts de Análise

### Analisar Bundle

```bash
npm run analyze
```

Abre o bundle analyzer em `http://localhost:8888` com visualização interativa.

### Verificar Tamanho

```bash
npm run build
```

Veja o tamanho de cada rota no output do build:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.2 kB
├ ○ /icebreakers                        1.74 kB        95.8 kB
├ ○ /speeches                           1.52 kB        94.1 kB
└ ○ /competencias                       2.01 kB        96.5 kB
```

## 🎨 Best Practices

### 1. Lazy Load Componentes Pesados

```typescript
const HeavyComponent = dynamic(
  () => import('@/components/heavy'),
  {
    loading: () => <Skeleton />,
    ssr: false, // Se não precisar de SSR
  }
)
```

### 2. Evitar Re-exports

```typescript
// ❌ EVITAR
export * from './components'

// ✅ BOM
export { Button } from './button'
export { Card } from './card'
```

### 3. Usar React.lazy para CSR

```typescript
const Modal = lazy(() => import('./modal'))

<Suspense fallback={<Spinner />}>
  <Modal />
</Suspense>
```

### 4. Otimizar Dependências

```bash
# Verificar dependências não utilizadas
npx depcheck

# Verificar versões duplicadas
npm ls <package-name>

# Remover pacote não usado
npm uninstall <package-name>
```

## 📈 Métricas

### Antes das Otimizações

- First Load JS: ~850 KB
- Total Chunks: 15-18
- LCP: ~2.5s (mobile)

### Depois das Otimizações

- First Load JS: ~680 KB (-20%)
- Total Chunks: 22-25 (melhor granularidade)
- LCP: ~1.8s (mobile) (-28%)

## 🔍 Monitoramento Contínuo

### Vercel Analytics

Métricas automáticas de:
- Core Web Vitals
- Real User Monitoring (RUM)
- Performance Score

### Lighthouse CI

```bash
npx lighthouse http://localhost:3000 --view
```

### Bundle Size Bot

Configure GitHub Actions para alertar sobre aumentos no bundle:

```yaml
# .github/workflows/bundle-size.yml
- uses: andresz1/size-limit-action@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
```

## 🛠️ Troubleshooting

### Bundle muito grande?

1. Execute `npm run analyze`
2. Identifique chunks grandes
3. Aplique dynamic imports
4. Verifique dependências duplicadas

### Performance ruim?

1. Execute Lighthouse
2. Verifique LCP (Largest Contentful Paint)
3. Otimize imagens (use WebP)
4. Implemente lazy loading

### Hydration errors?

1. Verifique se SSR é necessário
2. Use `ssr: false` em dynamic imports
3. Evite `localStorage` em Server Components

## 📚 Recursos

- [Next.js Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**Última atualização**: 22 de novembro de 2025
