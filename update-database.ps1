# Script de Atualização do Banco de Dados
# Execute este script para atualizar o schema Prisma e sincronizar com MongoDB

Write-Host "🔧 Atualizando schema Prisma e banco de dados..." -ForegroundColor Cyan
Write-Host ""

# 1. Gerar cliente Prisma com novos models
Write-Host "📦 Gerando cliente Prisma..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Cliente Prisma gerado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao gerar cliente Prisma" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 2. Sincronizar schema com MongoDB
Write-Host "🔄 Sincronizando schema com MongoDB..." -ForegroundColor Yellow
npx prisma db push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Schema sincronizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao sincronizar schema" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Atualização concluída com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Novos models disponíveis:" -ForegroundColor Cyan
Write-Host "  - OKR (para gerenciar OKRs por usuário)" -ForegroundColor White
Write-Host "  - KanbanBoard (para gerenciar boards Kanban por usuário)" -ForegroundColor White
Write-Host ""
Write-Host "Agora você pode executar o projeto:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
