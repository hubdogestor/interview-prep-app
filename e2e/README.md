# E2E Tests - Playwright

Testes end-to-end automatizados usando [Playwright](https://playwright.dev/).

## 🚀 Como executar

### Executar todos os testes

```bash
npx playwright test
```

### Executar com UI interativa

```bash
npx playwright test --ui
```

### Executar um arquivo específico

```bash
npx playwright test e2e/icebreakers.spec.ts
```

### Executar em modo debug

```bash
npx playwright test --debug
```

### Ver relatório dos últimos testes

```bash
npx playwright show-report
```

## 📁 Estrutura dos Testes

```
e2e/
├── icebreakers.spec.ts  # Testes CRUD de icebreakers
├── speeches.spec.ts     # Testes CRUD de speeches
├── general.spec.ts      # Testes de navegação, search, responsive
└── fixtures.ts          # Helpers reutilizáveis
```

## 🧪 Cobertura de Testes

### Icebreakers
- ✅ Listar icebreakers
- ✅ Criar novo icebreaker
- ✅ Editar icebreaker existente
- ✅ Deletar icebreaker
- ✅ Validação de campos obrigatórios
- ✅ Navegação entre páginas

### Speeches
- ✅ Listar speeches
- ✅ Criar novo speech
- ✅ Editar speech existente
- ✅ Deletar speech
- ✅ Validação de campos obrigatórios

### Funcionalidades Gerais
- ✅ Navegação entre todas as páginas principais
- ✅ Breadcrumbs funcionais
- ✅ Página 404
- ✅ Search global (Ctrl+K)
- ✅ Responsive design (mobile, tablet)
- ✅ Dark mode toggle

## 🛠️ Fixtures Customizados

### createIcebreaker

Helper para criar icebreakers rapidamente nos testes:

```typescript
test('exemplo', async ({ page, createIcebreaker }) => {
  await createIcebreaker({
    titulo: 'Meu Icebreaker',
    tipo: 'elevator_pitch',
    conteudo: 'Conteúdo do icebreaker...',
    duracao: 60,
  });
  
  // Continuar teste...
});
```

### createSpeech

Helper para criar speeches rapidamente:

```typescript
test('exemplo', async ({ page, createSpeech }) => {
  await createSpeech({
    tipoVaga: 'Senior Developer',
    titulo: 'Meu Speech',
    conteudo: 'Conteúdo do speech...',
    duracao: 5,
  });
  
  // Continuar teste...
});
```

## ⚙️ Configuração

### playwright.config.ts

```typescript
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## 🔄 CI/CD Integration

Os testes E2E são executados automaticamente no GitHub Actions em:
- Push para `main` ou `develop`
- Pull Requests para `main` ou `develop`

Veja o workflow em `.github/workflows/e2e-tests.yml`

### Artifacts

- **playwright-report**: Relatório HTML completo (30 dias)
- **test-videos**: Videos de testes falhados (7 dias)

## 📊 Relatórios

Após executar os testes, um relatório HTML é gerado automaticamente em `playwright-report/`.

Para visualizar:

```bash
npx playwright show-report
```

## 🐛 Debug

### Modo Headed

Executar testes com navegador visível:

```bash
npx playwright test --headed
```

### Playwright Inspector

```bash
npx playwright test --debug
```

### Trace Viewer

```bash
npx playwright show-trace trace.zip
```

## 📝 Boas Práticas

1. **Seletores**: Use `getByRole`, `getByLabel`, `getByText` (seletores acessíveis)
2. **Esperas**: Use `waitForLoadState`, `waitForURL`, `expect().toBeVisible()`
3. **Isolamento**: Cada teste deve ser independente
4. **Fixtures**: Use fixtures para setup reutilizável
5. **Page Objects**: Para testes complexos, considere usar Page Object Pattern

## 🔗 Referências

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Selectors](https://playwright.dev/docs/selectors)
