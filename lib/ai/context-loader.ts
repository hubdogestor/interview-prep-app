/**
 * Context File Loader Assíncrono
 *
 * Carrega arquivos de contexto do diretório context-files
 * de forma assíncrona e com cache em memória.
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * Cache de context files em memória
 */
interface CacheEntry {
  data: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos
const MAX_FILE_SIZE = 100 * 1024; // 100KB por arquivo

/**
 * Lista de arquivos de contexto para carregar
 */
const CONTEXT_FILES = [
  'cv.md',
  'playbook.md',
  'experiencias.md',
  'competencias.md',
];

/**
 * Carrega um arquivo de contexto individual
 */
async function loadSingleFile(filePath: string): Promise<string | null> {
  try {
    // Verificar tamanho do arquivo
    const stats = await fs.stat(filePath);
    if (stats.size > MAX_FILE_SIZE) {
      console.warn(
        `⚠️  Arquivo muito grande: ${path.basename(filePath)} (${stats.size} bytes, máximo: ${MAX_FILE_SIZE})`
      );
      return null;
    }

    // Ler conteúdo
    const content = await fs.readFile(filePath, 'utf-8');
    return content.trim();
  } catch (error) {
    // Arquivo não existe ou erro ao ler - não é erro crítico
    return null;
  }
}

/**
 * Carrega todos os context files do diretório
 */
async function loadAllContextFiles(): Promise<string> {
  const contextDir = path.join(process.cwd(), 'context-files');
  let contextData = '';

  for (const fileName of CONTEXT_FILES) {
    const filePath = path.join(contextDir, fileName);
    const content = await loadSingleFile(filePath);

    if (content) {
      const header = fileName.replace('.md', '').toUpperCase();
      contextData += `\n\n### ${header}\n${content}`;
    }
  }

  if (!contextData) {
    console.warn(
      '⚠️  Nenhum context file encontrado em context-files/. A IA usará apenas dados do perfil.'
    );
  }

  return contextData.trim();
}

/**
 * Obtém context files com cache
 *
 * @param forceRefresh - Se true, ignora o cache e recarrega os arquivos
 * @returns Conteúdo dos context files concatenados
 */
export async function getContextFiles(forceRefresh = false): Promise<string> {
  const cacheKey = 'context_files';
  const now = Date.now();

  // Verificar cache
  if (!forceRefresh) {
    const cached = cache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
  }

  // Carregar arquivos
  const data = await loadAllContextFiles();

  // Atualizar cache
  cache.set(cacheKey, {
    data,
    timestamp: now,
  });

  return data;
}

/**
 * Limpa o cache de context files
 */
export function clearContextCache(): void {
  cache.clear();
}

/**
 * Verifica se um arquivo de contexto existe
 */
export async function contextFileExists(fileName: string): Promise<boolean> {
  try {
    const contextDir = path.join(process.cwd(), 'context-files');
    const filePath = path.join(contextDir, fileName);
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Lista todos os context files disponíveis
 */
export async function listContextFiles(): Promise<string[]> {
  try {
    const contextDir = path.join(process.cwd(), 'context-files');
    const files = await fs.readdir(contextDir);
    return files.filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
}
