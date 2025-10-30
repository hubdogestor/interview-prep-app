# Correção do Erro de Hidratação React

## Análise do Problema
O erro de hidratação ocorre devido ao script de tema detector que define propriedades CSS diretamente no elemento `document.documentElement`, causando discrepâncias entre SSR e cliente.

## Plano de Correção

- [ ] Analisar código atual do layout.tsx
- [ ] Identificar problema no script de tema detector
- [ ] Implementar solução para evitar discrepâncias SSR/Cliente
- [ ] Testar a correção
- [ ] Verificar se o erro foi resolvido

## Soluções Possíveis
1. Remover definição de CSS inline no elemento html
2. Mover lógica de tema para componente client-side
3. Usar abordagem com `useEffect` para evitar SSR mismatch
4. Implementar tema via CSS classes ao invés de propriedades CSS inline
