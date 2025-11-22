import { test, expect } from '@playwright/test';

test.describe('Icebreakers - CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página de icebreakers
    await page.goto('/icebreakers');
    await page.waitForLoadState('networkidle');
  });

  test('should display icebreakers list page', async ({ page }) => {
    // Verificar se o título está presente
    await expect(page.getByRole('heading', { name: /icebreakers/i })).toBeVisible();
    
    // Verificar se o botão "Novo Icebreaker" está presente
    await expect(page.getByRole('link', { name: /novo icebreaker/i })).toBeVisible();
  });

  test('should create a new icebreaker', async ({ page }) => {
    // Clicar no botão "Novo Icebreaker"
    await page.getByRole('link', { name: /novo icebreaker/i }).click();
    await page.waitForURL('/icebreakers/novo');

    // Preencher o formulário
    await page.getByLabel(/título/i).fill('Teste E2E Icebreaker');
    
    // Selecionar tipo
    await page.getByRole('combobox', { name: /tipo/i }).click();
    await page.getByRole('option', { name: /elevator pitch/i }).click();

    // Preencher conteúdo da primeira versão
    const contentTextarea = page.getByLabel(/conteúdo em português/i).first();
    await contentTextarea.fill('Este é um teste E2E para validar a criação de um icebreaker. Meu nome é João Silva e sou desenvolvedor full-stack com 5 anos de experiência.');

    // Preencher duração
    await page.getByLabel(/duração/i).first().fill('60');

    // Submeter o formulário
    await page.getByRole('button', { name: /criar icebreaker/i }).click();

    // Verificar se foi redirecionado para a lista
    await page.waitForURL('/icebreakers', { timeout: 10000 });

    // Verificar se o toast de sucesso apareceu
    await expect(page.getByText(/criado com sucesso/i)).toBeVisible({ timeout: 5000 });

    // Verificar se o novo icebreaker aparece na lista
    await expect(page.getByText('Teste E2E Icebreaker')).toBeVisible();
  });

  test('should edit an existing icebreaker', async ({ page }) => {
    // Primeiro, criar um icebreaker para editar
    await page.getByRole('link', { name: /novo icebreaker/i }).click();
    await page.waitForURL('/icebreakers/novo');

    await page.getByLabel(/título/i).fill('Icebreaker para Editar');
    await page.getByRole('combobox', { name: /tipo/i }).click();
    await page.getByRole('option', { name: /quick intro/i }).click();
    
    const contentTextarea = page.getByLabel(/conteúdo em português/i).first();
    await contentTextarea.fill('Conteúdo original do icebreaker que será editado.');
    
    await page.getByLabel(/duração/i).first().fill('30');
    await page.getByRole('button', { name: /criar icebreaker/i }).click();
    await page.waitForURL('/icebreakers');

    // Agora editar o icebreaker criado
    await page.getByText('Icebreaker para Editar').click();
    await page.waitForURL(/\/icebreakers\/[a-z0-9]+/);

    // Clicar no botão editar
    await page.getByRole('button', { name: /editar/i }).click();

    // Modificar o título
    await page.getByLabel(/título/i).clear();
    await page.getByLabel(/título/i).fill('Icebreaker Editado E2E');

    // Salvar
    await page.getByRole('button', { name: /salvar/i }).click();

    // Verificar sucesso
    await expect(page.getByText(/atualizado com sucesso/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Icebreaker Editado E2E')).toBeVisible();
  });

  test('should delete an icebreaker', async ({ page }) => {
    // Criar um icebreaker para deletar
    await page.getByRole('link', { name: /novo icebreaker/i }).click();
    await page.waitForURL('/icebreakers/novo');

    await page.getByLabel(/título/i).fill('Icebreaker para Deletar');
    await page.getByRole('combobox', { name: /tipo/i }).click();
    await page.getByRole('option', { name: /elevator pitch/i }).click();
    
    const contentTextarea = page.getByLabel(/conteúdo em português/i).first();
    await contentTextarea.fill('Este icebreaker será deletado pelo teste E2E.');
    
    await page.getByLabel(/duração/i).first().fill('45');
    await page.getByRole('button', { name: /criar icebreaker/i }).click();
    await page.waitForURL('/icebreakers');

    // Verificar que o icebreaker foi criado
    await expect(page.getByText('Icebreaker para Deletar')).toBeVisible();

    // Clicar no icebreaker
    await page.getByText('Icebreaker para Deletar').click();
    await page.waitForURL(/\/icebreakers\/[a-z0-9]+/);

    // Clicar no botão deletar (pode estar em um menu ou diretamente visível)
    const deleteButton = page.getByRole('button', { name: /deletar|excluir|remover/i });
    await deleteButton.click();

    // Confirmar a deleção (assumindo que há um dialog de confirmação)
    await page.getByRole('button', { name: /confirmar|sim|deletar/i }).click();

    // Verificar que foi redirecionado de volta à lista
    await page.waitForURL('/icebreakers', { timeout: 10000 });

    // Verificar toast de sucesso
    await expect(page.getByText(/deletado|removido|excluído/i)).toBeVisible({ timeout: 5000 });

    // Verificar que o icebreaker não aparece mais na lista
    await expect(page.getByText('Icebreaker para Deletar')).not.toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Ir para a página de criação
    await page.getByRole('link', { name: /novo icebreaker/i }).click();
    await page.waitForURL('/icebreakers/novo');

    // Tentar submeter sem preencher nada
    await page.getByRole('button', { name: /criar icebreaker/i }).click();

    // Verificar se mensagens de erro aparecem
    await expect(page.getByText(/obrigatório/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('should navigate between pages', async ({ page }) => {
    // Verificar navegação para criação
    await page.getByRole('link', { name: /novo icebreaker/i }).click();
    await expect(page).toHaveURL('/icebreakers/novo');

    // Voltar para a lista
    await page.getByRole('button', { name: /voltar/i }).click();
    await expect(page).toHaveURL('/icebreakers');
  });
});
