# 🚀 Guia de Comandos - Portfólio Ana

## 📋 Comandos Disponíveis

### 1. **Instalar Dependências**
```bash
npm install
```
Instala todas as dependências do projeto (React, GSAP, Vite, etc.)

---

### 2. **Modo Desenvolvimento (Testar)**
```bash
npm run dev
```
- Inicia o servidor de desenvolvimento
- Abre automaticamente em `http://localhost:3000`
- Hot reload ativado (mudanças aparecem automaticamente)
- **Use este comando para testar o projeto!**

---

### 3. **Verificar Erros de Código (Lint)**
```bash
npm run lint
```
- Verifica erros e avisos no código
- Segue as regras do ESLint
- Corrija os erros antes de fazer build

---

### 4. **Compilar para Produção**
```bash
npm run build
```
- Cria a versão otimizada do projeto
- Gera arquivos na pasta `dist/`
- Minifica e otimiza o código
- Pronto para deploy

---

### 5. **Preview da Build (Testar Build de Produção)**
```bash
npm run preview
```
- Testa a build de produção localmente
- Simula como ficará no servidor
- Útil para verificar se tudo está funcionando antes do deploy

---

### 6. **Deploy no GitHub Pages**
```bash
npm run deploy
```
- Compila o projeto
- Faz deploy automático no GitHub Pages
- Requer configuração do repositório

---

## 🔄 Fluxo de Trabalho Recomendado

### Para Desenvolvimento:
```bash
# 1. Instalar dependências (apenas na primeira vez)
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Abrir navegador em http://localhost:3000
# 4. Fazer alterações no código
# 5. Ver mudanças automaticamente no navegador
```

### Para Testar Antes de Publicar:
```bash
# 1. Verificar erros
npm run lint

# 2. Compilar para produção
npm run build

# 3. Testar a build
npm run preview

# 4. Verificar se tudo está funcionando
```

### Para Publicar:
```bash
# 1. Compilar
npm run build

# 2. Deploy (se configurado)
npm run deploy
```

---

## 🐛 Solução de Problemas

### Erro: "command not found: npm"
- Instale o Node.js: https://nodejs.org/
- Reinicie o terminal após instalar

### Erro: "Cannot find module"
```bash
npm install
```

### Porta 3000 já está em uso
- Pare o processo que está usando a porta
- Ou altere a porta no `vite.config.js`

### Build falha
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Verificar Versões

```bash
# Versão do Node.js
node --version

# Versão do npm
npm --version

# Versão do Vite
npx vite --version
```

---

## ✅ Checklist Antes de Publicar

- [ ] `npm run lint` - Sem erros
- [ ] `npm run build` - Build bem-sucedida
- [ ] `npm run preview` - Testar build localmente
- [ ] Verificar se todas as imagens carregam
- [ ] Testar em diferentes navegadores
- [ ] Verificar responsividade (mobile/tablet/desktop)
- [ ] Testar todas as funcionalidades

---

## 🎯 Comandos Rápidos

| Ação | Comando |
|------|---------|
| Testar | `npm run dev` |
| Compilar | `npm run build` |
| Verificar erros | `npm run lint` |
| Preview build | `npm run preview` |
| Deploy | `npm run deploy` |

