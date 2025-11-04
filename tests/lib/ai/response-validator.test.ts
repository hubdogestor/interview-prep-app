/**
 * Testes para AI Response Validator
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  extractJsonFromMarkdown,
  safeJsonParse,
  parseAndValidateAIResponse,
  validateNonEmptyText,
  validateObjectShape,
  validateScore,
  formatValidationError,
  AIResponseError,
  AIValidationError,
} from '@/lib/ai/response-validator';

describe('AI Response Validator', () => {
  describe('extractJsonFromMarkdown', () => {
    it('deve extrair JSON de markdown com ```json', () => {
      const input = '```json\n{"name": "Test"}\n```';
      const result = extractJsonFromMarkdown(input);
      expect(result).toBe('{"name": "Test"}');
    });

    it('deve extrair JSON de markdown com ```', () => {
      const input = '```\n{"name": "Test"}\n```';
      const result = extractJsonFromMarkdown(input);
      expect(result).toBe('{"name": "Test"}');
    });

    it('deve extrair objeto JSON puro', () => {
      const input = '{"name": "Test", "value": 123}';
      const result = extractJsonFromMarkdown(input);
      expect(result).toBe('{"name": "Test", "value": 123}');
    });

    it('deve extrair array JSON', () => {
      const input = '[1, 2, 3, 4]';
      const result = extractJsonFromMarkdown(input);
      expect(result).toBe('[1, 2, 3, 4]');
    });

    it('deve ignorar texto ao redor', () => {
      const input = 'Aqui está o resultado:\n```json\n{"test": true}\n```\nFim';
      const result = extractJsonFromMarkdown(input);
      expect(result).toBe('{"test": true}');
    });
  });

  describe('safeJsonParse', () => {
    it('deve fazer parse de JSON válido', () => {
      const input = '{"name": "Test", "value": 123}';
      const result = safeJsonParse(input);
      expect(result).toEqual({ name: 'Test', value: 123 });
    });

    it('deve fazer parse de JSON em markdown', () => {
      const input = '```json\n{"name": "Test"}\n```';
      const result = safeJsonParse(input);
      expect(result).toEqual({ name: 'Test' });
    });

    it('deve remover trailing commas', () => {
      const input = '{"name": "Test", "value": 123,}';
      const result = safeJsonParse(input);
      expect(result).toEqual({ name: 'Test', value: 123 });
    });

    it('deve lançar erro para JSON inválido', () => {
      const input = '{invalid json}';
      expect(() => safeJsonParse(input)).toThrow(AIResponseError);
    });
  });

  describe('parseAndValidateAIResponse', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    it('deve fazer parse e validar resposta válida', () => {
      const input = '{"name": "John", "age": 30}';
      const result = parseAndValidateAIResponse(input, schema);
      expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('deve lançar AIValidationError para dados inválidos', () => {
      const input = '{"name": "John", "age": "thirty"}'; // age deve ser number
      expect(() => parseAndValidateAIResponse(input, schema)).toThrow(AIValidationError);
    });

    it('deve lançar AIResponseError para JSON malformado', () => {
      const input = '{not json}';
      expect(() => parseAndValidateAIResponse(input, schema)).toThrow(AIResponseError);
    });

    it('deve aceitar validação parcial', () => {
      const input = '{"name": "John"}'; // Falta age
      const result = parseAndValidateAIResponse(input, schema, { allowPartial: true });
      expect(result.name).toBe('John');
    });
  });

  describe('validateNonEmptyText', () => {
    it('deve validar texto não-vazio', () => {
      const text = 'Este é um texto válido';
      const result = validateNonEmptyText(text);
      expect(result).toBe(text);
    });

    it('deve remover espaços', () => {
      const text = '   texto com espaços   ';
      const result = validateNonEmptyText(text);
      expect(result).toBe('texto com espaços');
    });

    it('deve rejeitar texto vazio', () => {
      expect(() => validateNonEmptyText('')).toThrow(AIResponseError);
      expect(() => validateNonEmptyText('   ')).toThrow(AIResponseError);
    });

    it('deve rejeitar texto muito curto', () => {
      expect(() => validateNonEmptyText('abc')).toThrow(AIResponseError);
    });
  });

  describe('validateObjectShape', () => {
    it('deve validar objeto com chaves requeridas', () => {
      const obj = { name: 'Test', age: 30, city: 'NYC' };
      const result = validateObjectShape(obj, ['name', 'age']);
      expect(result).toEqual(obj);
    });

    it('deve rejeitar objeto sem chaves requeridas', () => {
      const obj = { name: 'Test' };
      expect(() => validateObjectShape(obj, ['name', 'age'])).toThrow(AIValidationError);
    });

    it('deve rejeitar não-objeto', () => {
      expect(() => validateObjectShape('not an object', ['name'])).toThrow(
        AIValidationError
      );
      expect(() => validateObjectShape(null, ['name'])).toThrow(AIValidationError);
    });
  });

  describe('validateScore', () => {
    it('deve validar score válido', () => {
      expect(validateScore(0)).toBe(0);
      expect(validateScore(50)).toBe(50);
      expect(validateScore(100)).toBe(100);
    });

    it('deve rejeitar score negativo', () => {
      expect(() => validateScore(-1)).toThrow(AIValidationError);
    });

    it('deve rejeitar score maior que 100', () => {
      expect(() => validateScore(101)).toThrow(AIValidationError);
    });

    it('deve rejeitar não-número', () => {
      expect(() => validateScore('50' as any)).toThrow(AIValidationError);
    });
  });

  describe('formatValidationError', () => {
    it('deve formatar AIValidationError', () => {
      const zodError = z.object({ name: z.string() }).safeParse({ name: 123 });
      if (!zodError.success) {
        const error = new AIValidationError('Test error', zodError.error);
        const formatted = formatValidationError(error);
        expect(formatted).toContain('Resposta inválida');
      }
    });

    it('deve formatar AIResponseError', () => {
      const error = new AIResponseError('Parse failed');
      const formatted = formatValidationError(error);
      expect(formatted).toContain('Erro ao processar resposta');
    });

    it('deve formatar Error genérico', () => {
      const error = new Error('Generic error');
      const formatted = formatValidationError(error);
      expect(formatted).toBe('Generic error');
    });

    it('deve formatar erro desconhecido', () => {
      const formatted = formatValidationError('string error');
      expect(formatted).toContain('Erro desconhecido');
    });
  });
});
