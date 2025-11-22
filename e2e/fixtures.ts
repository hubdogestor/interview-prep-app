import { test as base } from '@playwright/test';

type Fixtures = {
  createIcebreaker: (data: {
    titulo: string;
    tipo: 'elevator_pitch' | 'quick_intro' | 'personal_story';
    conteudo: string;
    duracao: number;
  }) => Promise<void>;
  
  createSpeech: (data: {
    tipoVaga: string;
    titulo: string;
    conteudo: string;
    duracao: number;
  }) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  createIcebreaker: async ({ page }, use) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(async (data) => {
      await page.goto('/icebreakers/novo');
      await page.waitForLoadState('networkidle');

      await page.getByLabel(/título/i).fill(data.titulo);
      
      await page.getByRole('combobox', { name: /tipo/i }).click();
      const tipoMap = {
        elevator_pitch: 'Elevator Pitch',
        quick_intro: 'Quick Intro',
        personal_story: 'Personal Story',
      };
      await page.getByRole('option', { name: new RegExp(tipoMap[data.tipo], 'i') }).click();

      const contentTextarea = page.getByLabel(/conteúdo em português/i).first();
      await contentTextarea.fill(data.conteudo);
      
      await page.getByLabel(/duração/i).first().fill(data.duracao.toString());
      
      await page.getByRole('button', { name: /criar icebreaker/i }).click();
      await page.waitForURL('/icebreakers', { timeout: 10000 });
    });
  },

  createSpeech: async ({ page }, use) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(async (data) => {
      await page.goto('/speeches/novo');
      await page.waitForLoadState('networkidle');

      await page.getByLabel(/tipo de vaga/i).fill(data.tipoVaga);
      await page.getByLabel(/título/i).fill(data.titulo);
      
      const contentTextarea = page.getByLabel(/conteúdo em português/i).first();
      await contentTextarea.fill(data.conteudo);
      
      await page.getByLabel(/duração estimada/i).fill(data.duracao.toString());
      
      await page.getByRole('button', { name: /criar speech/i }).click();
      await page.waitForURL('/speeches', { timeout: 10000 });
    });
  },
});

export { expect } from '@playwright/test';
