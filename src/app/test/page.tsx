'use client';

import { trpc } from '@/lib/trpc/client';
import Link from 'next/link';
import { useState } from 'react';

export default function TestPage() {
  const [prompt, setPrompt] = useState('Diga olá em português');
  const [result, setResult] = useState<string>('');
  const [provider, setProvider] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generateMutation = trpc.ai.generateText.useMutation({
    onSuccess: (data) => {
      setResult(data.data.text);
      setProvider(data.data.provider);
      setLoading(false);
    },
    onError: (error) => {
      setResult(`Erro: ${error.message}`);
      setLoading(false);
    },
  });

  const handleTest = () => {
    setLoading(true);
    setResult('');
    setProvider('');
    
    generateMutation.mutate({
      prompt: prompt,
      maxTokens: 100,
      temperature: 0.7,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">
            🧪 Teste do Sistema Híbrido de IA
          </h1>

          <div className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Prompt de Teste:
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Digite um prompt para testar..."
              />
            </div>

            {/* Botão */}
            <button
              onClick={handleTest}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Testando...' : '🚀 Testar IA'}
            </button>

            {/* Resultado */}
            {provider && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-medium text-green-800">
                  ✅ Provider usado: <strong>{provider.toUpperCase()}</strong>
                </p>
              </div>
            )}

            {result && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Resposta:
                </p>
                <p className="text-slate-900 whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              📊 Status do Sistema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-900">MongoDB</p>
                <p className="text-xs text-blue-700 mt-1">✅ Conectado</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-900">tRPC</p>
                <p className="text-xs text-purple-700 mt-1">✅ Configurado</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-900">IA Híbrida</p>
                <p className="text-xs text-green-700 mt-1">
                  Gemini → OpenAI → Claude
                </p>
              </div>
            </div>
          </div>

          {/* Atalho para voltar */}
          <div className="mt-6">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}