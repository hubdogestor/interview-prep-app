# Storybook - Documentação de Componentes

Este projeto utiliza [Storybook](https://storybook.js.org/) para documentar e testar componentes UI de forma isolada.

## 🚀 Como usar

### Iniciar o Storybook

```bash
npm run storybook
```

O Storybook será aberto automaticamente em `http://localhost:6006`

### Build do Storybook

```bash
npm run build-storybook
```

Gera uma versão estática do Storybook na pasta `storybook-static/`

## 📚 Componentes Documentados

### UI Components

- **Button** - Botões com múltiplas variantes (default, destructive, outline, ghost, link)
- **Badge** - Badges para labels e contadores
- **Card** - Cards para exibir conteúdo agrupado
- **Input** - Campos de entrada de texto
- **Textarea** - Campos de texto multi-linha
- **Select** - Dropdowns com seleção única
- **FormField** - Wrapper para campos de formulário com validação visual

### Variantes e Props

Cada componente possui stories que demonstram:
- ✅ **Variantes** - Diferentes estilos e tamanhos
- ✅ **Estados** - Normal, hover, disabled, loading, error
- ✅ **Props** - Todas as propriedades configuráveis
- ✅ **Exemplos de uso** - Casos reais de aplicação
- ✅ **Acessibilidade** - Testes A11y integrados

## 🎨 Estrutura dos Stories

Cada componente tem um arquivo `.stories.tsx` com a seguinte estrutura:

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Component } from './component'

const meta = {
  title: 'UI/Component',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Component',
  },
}
```

## 🧪 Testing com Vitest

O Storybook está integrado com Vitest para testes de componentes:

```bash
npx vitest
```

Todos os stories podem ser testados automaticamente.

## ♿ Acessibilidade

O addon `@storybook/addon-a11y` está configurado para verificar problemas de acessibilidade automaticamente em todos os componentes.

## 📦 Addons Instalados

- **@chromatic-com/storybook** - Visual regression testing
- **@storybook/addon-docs** - Documentação automática
- **@storybook/addon-a11y** - Testes de acessibilidade
- **@storybook/addon-vitest** - Integração com Vitest

## 🔧 Configuração

### `.storybook/main.ts`

Configuração principal do Storybook com framework Next.js + Vite.

### `.storybook/preview.ts`

Configuração de preview com:
- Import do CSS global (Tailwind)
- Backgrounds claro/escuro
- Controles para matchers de cores e datas

## 📖 Referências

- [Storybook Documentation](https://storybook.js.org/docs)
- [Next.js Integration](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)
- [Addon A11y](https://storybook.js.org/docs/writing-tests/accessibility-testing)
