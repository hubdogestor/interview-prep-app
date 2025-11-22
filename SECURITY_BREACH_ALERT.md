## 🚨 AÇÃO IMEDIATA NECESSÁRIA

As seguintes chaves de API foram **EXPOSTAS PUBLICAMENTE** e precisam ser **REGENERADAS IMEDIATAMENTE**:

### Chaves Comprometidas:

1. **Anthropic API Key**: `sk-ant-api03-nQd2hZ9...`
2. **OpenAI API Key**: `sk-proj-F3JeKf7...`
3. **Google AI API Key**: `AIzaSyCZpEMZk7U7...`

### Ações Necessárias:

#### 1. Anthropic (Claude)
- Acesse: https://console.anthropic.com/settings/keys
- Revogue a chave antiga
- Gere uma nova chave
- Atualize em `.env.local` e Vercel

#### 2. OpenAI
- Acesse: https://platform.openai.com/api-keys
- Revogue a chave antiga
- Gere uma nova chave
- Atualize em `.env.local` e Vercel

#### 3. Google AI
- Acesse: https://makersuite.google.com/app/apikey
- Revogue a chave antiga
- Gere uma nova chave
- Atualize em `.env.local` e Vercel

#### 4. MongoDB (Opcional mas Recomendado)
- Troque a senha do usuário `leon4rdo`
- Atualize a connection string

### ✅ Checklist de Segurança

- [ ] Revogar todas as chaves antigas
- [ ] Gerar novas chaves
- [ ] Atualizar `.env.local` localmente
- [ ] Atualizar variáveis de ambiente na Vercel
- [ ] Verificar que `.env.local` está no `.gitignore`
- [ ] NUNCA commitar arquivos com chaves reais

### 📝 Boas Práticas

1. **NUNCA** commite arquivos com credenciais
2. Use `.env.local` apenas localmente
3. Use variáveis de ambiente na Vercel para produção
4. Mantenha `.env.example` com placeholders
5. Adicione `.env*` ao `.gitignore`

---

**Data do incidente**: 22 de novembro de 2025  
**Status**: ✅ Chaves removidas do repositório  
**Próximo passo**: Regenerar todas as chaves comprometidas
