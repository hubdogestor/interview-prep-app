/**
 * Setup global para testes com Vitest
 */

import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup após cada teste
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock de variáveis de ambiente
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'mongodb://localhost:27017/test';

// Extend expect com matchers customizados se necessário
expect.extend({
  // Adicione matchers customizados aqui se necessário
});
