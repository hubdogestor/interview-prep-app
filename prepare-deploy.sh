#!/bin/bash

# Script de preparação para deploy do Interview Prep App
# Uso: ./prepare-deploy.sh

echo "🚀 Interview Prep App - Preparação para Deploy"
echo "================================================"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar se .env.local foi commitado
echo "📋 Verificando segurança..."
if git log --all --full-history -- .env.local | grep -q commit; then
    echo -e "${RED}⚠️  ALERTA: .env.local foi encontrado no histórico do Git!${NC}"
    echo -e "${YELLOW}   Você precisa regenerar TODAS as chaves de API${NC}"
    echo ""
    read -p "Deseja continuar? (sim/não): " continue
    if [ "$continue" != "sim" ]; then
        echo "Deploy cancelado."
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env.local não está no histórico do Git${NC}"
fi

# 2. Verificar .gitignore
echo ""
echo "📋 Verificando .gitignore..."
if grep -q "\.env\.local" .gitignore; then
    echo -e "${GREEN}✅ .env.local está no .gitignore${NC}"
else
    echo -e "${YELLOW}⚠️  Adicionando .env.local ao .gitignore${NC}"
    echo ".env.local" >> .gitignore
fi

# 3. Verificar dependências
echo ""
echo "📦 Verificando dependências..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules existe${NC}"
else
    echo -e "${YELLOW}⚠️  Instalando dependências...${NC}"
    npm install
fi

# 4. Gerar Prisma Client
echo ""
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# 5. Verificar build
echo ""
echo "🏗️  Testando build..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro no build. Corrija os erros antes do deploy.${NC}"
    exit 1
fi

# 6. Checklist final
echo ""
echo "📋 CHECKLIST DE DEPLOY:"
echo "======================="
echo ""
echo "MongoDB Atlas:"
echo "  [ ] Cluster está ativo?"
echo "  [ ] IP 0.0.0.0/0 liberado no Network Access?"
echo "  [ ] Usuário de produção criado?"
echo "  [ ] Connection string atualizada?"
echo ""
echo "Vercel:"
echo "  [ ] Conta criada em vercel.com?"
echo "  [ ] Repositório conectado?"
echo "  [ ] Variáveis de ambiente configuradas?"
echo "  [ ] Deploy iniciado?"
echo ""
echo "Name.com:"
echo "  [ ] Registros DNS configurados?"
echo "  [ ] CNAME para cname.vercel-dns.com?"
echo ""
echo -e "${GREEN}🎉 Preparação concluída!${NC}"
echo ""
echo "Próximos passos:"
echo "1. Fazer commit das mudanças: git add . && git commit -m 'chore: prepare for deploy'"
echo "2. Push para GitHub: git push origin main"
echo "3. Acessar vercel.com e conectar o repositório"
echo "4. Configurar variáveis de ambiente na Vercel"
echo "5. Configurar DNS no Name.com"
echo ""
echo "Para mais detalhes, consulte: DEPLOYMENT_GUIDE.md"
