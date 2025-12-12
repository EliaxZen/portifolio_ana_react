# 🚀 Deploy no Vercel - Guia Completo

## 📋 Pré-requisitos

1. Conta no Vercel (grátis): https://vercel.com
2. Projeto no GitHub (recomendado) ou pode fazer upload direto

---

## 🎯 Método 1: Deploy via Vercel CLI (Recomendado)

### Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Fazer Login
```bash
vercel login
```
- Abrirá o navegador para fazer login
- Ou use: `vercel login --github` para login via GitHub

### Passo 3: Deploy
```bash
# Deploy de produção
vercel

# Ou deploy com preview
vercel --prod
```

### Passo 4: Seguir as instruções
- O Vercel vai detectar automaticamente que é um projeto Vite
- Confirme as configurações
- Aguarde o deploy

---

## 🌐 Método 2: Deploy via Dashboard Vercel (Mais Fácil)

### Passo 1: Acessar Vercel
1. Acesse: https://vercel.com
2. Faça login (pode usar GitHub)

### Passo 2: Importar Projeto
1. Clique em **"Add New Project"** ou **"Import Project"**
2. Conecte seu repositório GitHub (ou faça upload)
3. Selecione o repositório `portifolio-ana-react`

### Passo 3: Configurar Projeto
O Vercel detecta automaticamente:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Passo 4: Deploy
1. Clique em **"Deploy"**
2. Aguarde alguns minutos
3. Pronto! Seu site estará no ar

---

## ⚙️ Configurações Automáticas

O arquivo `vercel.json` já está configurado com:
- ✅ Build command correto
- ✅ Output directory correto
- ✅ Rewrites para SPA (Single Page Application)
- ✅ Framework detectado como Vite

---

## 🔄 Deploy Automático (Recomendado)

### Configurar Deploy Automático:
1. No dashboard do Vercel, vá em **Settings** → **Git**
2. Ative **"Automatic deployments from Git"**
3. Toda vez que você fizer push no GitHub, o Vercel fará deploy automaticamente

### Branches:
- **Production**: Deploy automático da branch `main` ou `master`
- **Preview**: Deploy automático de outras branches (PRs, etc)

---

## 📝 Variáveis de Ambiente (se necessário)

Se precisar de variáveis de ambiente:
1. No dashboard do Vercel: **Settings** → **Environment Variables**
2. Adicione as variáveis necessárias
3. Faça redeploy

---

## 🔍 Verificar Deploy

Após o deploy, você receberá:
- ✅ URL de produção: `https://seu-projeto.vercel.app`
- ✅ URL de preview (se for PR): `https://seu-projeto-git-branch.vercel.app`

---

## 🐛 Solução de Problemas

### Erro: "Build failed"
```bash
# Testar build localmente primeiro
npm run build
```

### Erro: "404 on routes"
- Verifique se o `vercel.json` está na raiz do projeto
- Confirme que os rewrites estão configurados

### Erro: "Module not found"
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port already in use"
- O Vercel usa porta automática, não precisa configurar

---

## 📊 Comandos Úteis

```bash
# Ver status do deploy
vercel ls

# Ver logs
vercel logs

# Remover deploy
vercel remove

# Ver informações do projeto
vercel inspect
```

---

## ✅ Checklist Antes do Deploy

- [ ] `npm run build` funciona localmente
- [ ] `npm run preview` funciona localmente
- [ ] Todos os assets estão carregando
- [ ] Não há erros no console
- [ ] Responsividade testada
- [ ] Arquivo `vercel.json` está na raiz

---

## 🎉 Pronto!

Após o deploy, seu portfólio estará disponível em:
- **Produção**: `https://seu-projeto.vercel.app`
- **Custom Domain**: Pode configurar domínio próprio nas configurações

---

## 🔗 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Suporte Vercel](https://vercel.com/support)

