#!/bin/bash

# Script de Deploy para Vercel
# Uso: ./deploy-vercel.sh

echo "🚀 Iniciando deploy para Vercel..."

# Verificar se está logado no Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Você não está logado no Vercel"
    echo "📝 Execute: vercel login"
    exit 1
fi

# Verificar se o build funciona
echo "🔨 Testando build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build falhou! Corrija os erros antes de fazer deploy."
    exit 1
fi

echo "✅ Build bem-sucedido!"

# Fazer deploy
echo "📤 Fazendo deploy para Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deploy concluído com sucesso!"
    echo "🌐 Seu site está no ar!"
else
    echo "❌ Deploy falhou!"
    exit 1
fi

