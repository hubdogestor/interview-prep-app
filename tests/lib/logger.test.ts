/**
 * Testes para Logger
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger, measureTime } from '@/lib/logger';

describe('Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('logger.info', () => {
    it('deve registrar mensagens de info', () => {
      const consoleSpy = vi.spyOn(console, 'info');
      logger.info('Test message');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('deve incluir contexto', () => {
      const consoleSpy = vi.spyOn(console, 'info');
      logger.info('Test with context', { userId: '123', action: 'login' });
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('logger.error', () => {
    it('deve registrar erros', () => {
      const consoleSpy = vi.spyOn(console, 'error');
      logger.error('Test error');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('deve incluir stack trace de Error', () => {
      const consoleSpy = vi.spyOn(console, 'error');
      const error = new Error('Test error');
      logger.error('Error occurred', error);
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('logger.child', () => {
    it('deve criar logger com contexto padrão', () => {
      const consoleSpy = vi.spyOn(console, 'info');
      const childLogger = logger.child({ module: 'auth' });
      childLogger.info('User login');
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('measureTime', () => {
    it('deve medir tempo de execução', async () => {
      const timer = measureTime();
      await new Promise((resolve) => setTimeout(resolve, 100));
      const duration = timer.end('Test operation');
      expect(duration).toBeGreaterThanOrEqual(100);
    });
  });
});
