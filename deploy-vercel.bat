@echo off
REM Script de Deploy para Vercel (Windows)
REM Uso: deploy-vercel.bat

echo 🚀 Iniciando deploy para Vercel...

REM Verificar se está logado no Vercel
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo ❌ Você não está logado no Vercel
    echo 📝 Execute: vercel login
    exit /b 1
)

REM Verificar se o build funciona
echo 🔨 Testando build...
call npm run build

if errorlevel 1 (
    echo ❌ Build falhou! Corrija os erros antes de fazer deploy.
    exit /b 1
)

echo ✅ Build bem-sucedido!

REM Fazer deploy
echo 📤 Fazendo deploy para Vercel...
call vercel --prod

if errorlevel 1 (
    echo ❌ Deploy falhou!
    exit /b 1
) else (
    echo ✅ Deploy concluído com sucesso!
    echo 🌐 Seu site está no ar!
)

