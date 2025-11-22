import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through main pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar navegação para Dashboard
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();

    // Navegar para Icebreakers
    await page.getByRole('link', { name: /icebreakers/i }).first().click();
    await expect(page).toHaveURL('/icebreakers');
    await expect(page.getByRole('heading', { name: /icebreakers/i })).toBeVisible();

    // Navegar para Speeches
    await page.getByRole('link', { name: /speeches/i }).first().click();
    await expect(page).toHaveURL('/speeches');
    await expect(page.getByRole('heading', { name: /speeches/i })).toBeVisible();

    // Navegar para Competências
    await page.getByRole('link', { name: /competências/i }).first().click();
    await expect(page).toHaveURL('/competencias');
    await expect(page.getByRole('heading', { name: /competências/i })).toBeVisible();

    // Navegar para Experiências
    await page.getByRole('link', { name: /experiências/i }).first().click();
    await expect(page).toHaveURL('/experiencias');
    await expect(page.getByRole('heading', { name: /experiências/i })).toBeVisible();

    // Voltar para Dashboard
    await page.getByRole('link', { name: /dashboard/i }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('should have working breadcrumbs', async ({ page }) => {
    await page.goto('/icebreakers/novo');
    await page.waitForLoadState('networkidle');

    // Verificar se os breadcrumbs estão presentes
    const breadcrumbs = page.locator('nav[aria-label="breadcrumb"]');
    await expect(breadcrumbs).toBeVisible();

    // Clicar no breadcrumb para voltar
    await page.getByRole('link', { name: /icebreakers/i }).first().click();
    await expect(page).toHaveURL('/icebreakers');
  });

  test('should handle 404 page', async ({ page }) => {
    await page.goto('/pagina-que-nao-existe');
    await page.waitForLoadState('networkidle');

    // Verificar se a página 404 é exibida
    await expect(page.getByText(/não encontrad/i)).toBeVisible();
  });
});

test.describe('Search Functionality', () => {
  test('should open global search with keyboard shortcut', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Pressionar Ctrl+K (ou Cmd+K no Mac)
    await page.keyboard.press('Control+k');

    // Verificar se o search dialog abriu
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 2000 });
  });

  test('should search for content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Abrir search
    await page.keyboard.press('Control+k');

    // Digitar no search
    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('icebreaker');

    // Verificar se resultados aparecem
    await expect(page.getByText(/icebreakers/i)).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar se o menu mobile está presente
    const mobileMenu = page.getByRole('button', { name: /menu|open/i });
    await expect(mobileMenu).toBeVisible();

    // Abrir menu mobile
    await mobileMenu.click();

    // Verificar se os links de navegação aparecem
    await expect(page.getByRole('link', { name: /icebreakers/i })).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar layout
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });
});

test.describe('Dark Mode', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Encontrar e clicar no botão de tema
    const themeToggle = page.getByRole('button', { name: /theme|tema/i });
    await themeToggle.click();

    // Verificar se o menu de tema aparece
    await expect(page.getByText(/light|dark|system/i).first()).toBeVisible();

    // Selecionar dark mode
    await page.getByText(/dark/i).first().click();

    // Verificar se a classe dark foi adicionada ao html
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);
  });
});
