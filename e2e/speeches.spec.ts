import { expect, test } from '@playwright/test';

test.describe('Speeches - CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/speeches');
    await page.waitForLoadState('networkidle');
  });

  test('should display speeches list page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /speeches/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /novo speech/i })).toBeVisible();
  });

  test('should create a new speech', async ({ page }) => {
    await page.getByRole('link', { name: /novo speech/i }).click();
    await page.waitForURL('/speeches/novo');

    // Preencher formulário
    await page.getByLabel(/tipo de vaga/i).fill('Senior Software Engineer');
    await page.getByLabel(/título/i).fill('Speech para Amazon');
    
    const contentTextarea = page.getByLabel(/conteúdo em português/i).first();
    await contentTextarea.fill('Minha apresentação foca em liderança técnica e experiência em sistemas distribuídos. Trabalhei por 5 anos em arquitetura de microserviços...');
    
    await page.getByLabel(/duração estimada/i).fill('5');

    await page.getByRole('button', { name: /criar speech/i }).click();
    await page.waitForURL('/speeches', { timeout: 10000 });

    await expect(page.getByText(/criado com sucesso/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Speech para Amazon')).toBeVisible();
  });

  test('should edit an existing speech', async ({ page }) => {
    // Criar speech
    await page.getByRole('link', { name: /novo speech/i }).click();
    await page.waitForURL('/speeches/novo');

    await page.getByLabel(/tipo de vaga/i).fill('Tech Lead');
    await page.getByLabel(/título/i).fill('Speech Original');
    
    const contentTextarea = page.getByLabel(/conteúdo em português/i).first();
    await contentTextarea.fill('Conteúdo original que será modificado nos testes.');
    
    await page.getByLabel(/duração estimada/i).fill('3');
    await page.getByRole('button', { name: /criar speech/i }).click();
    await page.waitForURL('/speeches');

    // Editar
    await page.getByText('Speech Original').click();
    await page.waitForURL(/\/speeches\/[a-z0-9]+/);
    
    await page.getByRole('button', { name: /editar/i }).click();
    
    await page.getByLabel(/título/i).clear();
    await page.getByLabel(/título/i).fill('Speech Editado E2E');
    
    await page.getByRole('button', { name: /salvar/i }).click();

    await expect(page.getByText(/atualizado com sucesso/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Speech Editado E2E')).toBeVisible();
  });

  test('should delete a speech', async ({ page }) => {
    // Criar speech
    await page.getByRole('link', { name: /novo speech/i }).click();
    await page.waitForURL('/speeches/novo');

    await page.getByLabel(/tipo de vaga/i).fill('Backend Developer');
    await page.getByLabel(/título/i).fill('Speech para Deletar');
    
    const contentTextarea = page.getByLabel(/conteúdo em português/i).first();
    await contentTextarea.fill('Este speech será deletado pelo teste automatizado.');
    
    await page.getByLabel(/duração estimada/i).fill('4');
    await page.getByRole('button', { name: /criar speech/i }).click();
    await page.waitForURL('/speeches');

    // Deletar
    await page.getByText('Speech para Deletar').click();
    await page.waitForURL(/\/speeches\/[a-z0-9]+/);

    await page.getByRole('button', { name: /deletar|excluir|remover/i }).click();
    await page.getByRole('button', { name: /confirmar|sim|deletar/i }).click();

    await page.waitForURL('/speeches', { timeout: 10000 });
    await expect(page.getByText(/deletado|removido|excluído/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Speech para Deletar')).not.toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.getByRole('link', { name: /novo speech/i }).click();
    await page.waitForURL('/speeches/novo');

    await page.getByRole('button', { name: /criar speech/i }).click();
    await expect(page.getByText(/obrigatório/i).first()).toBeVisible({ timeout: 5000 });
  });
});
