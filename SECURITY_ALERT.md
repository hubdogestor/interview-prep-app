## 🚨 AVISO DE SEGURANÇA - LEIA IMEDIATAMENTE

### Credenciais Expostas Detectadas

Este repositório contém credenciais sensíveis no arquivo `.env.local`:

- ✅ MongoDB: `leon4rdo:Livia@2701!` 
- ✅ Anthropic API Key
- ✅ Google AI API Key  
- ✅ OpenAI API Key

### ⚠️ AÇÕES NECESSÁRIAS ANTES DO DEPLOY:

1. **Verificar se .env.local foi commitado**:
   ```bash
   git log --all --full-history -- .env.local
   ```

2. **Se foi commitado, REGENERAR todas as chaves**:
   - MongoDB: Trocar senha do usuário
   - Anthropic: https://console.anthropic.com/settings/keys
   - Google AI: https://makersuite.google.com/app/apikey  
   - OpenAI: https://platform.openai.com/api-keys

3. **Remover do histórico Git** (se necessário):
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env.local" \
   --prune-empty -- --all
   ```

### 📝 Checklist de Deploy:

- [ ] Verificar status do MongoDB Atlas
- [ ] Criar usuário de produção com senha alfanumérica
- [ ] Liberar IPs da Vercel no MongoDB Atlas
- [ ] Configurar variáveis de ambiente na Vercel
- [ ] Deploy na Vercel via GitHub
- [ ] Configurar DNS no Name.com
- [ ] Testar domínio leon4rdo.dev
- [ ] Verificar SSL funcionando
- [ ] Testar funcionalidades da aplicação

---

**Para guia completo, veja**: `DEPLOYMENT_GUIDE.md`
