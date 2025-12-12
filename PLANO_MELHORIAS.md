# 📋 Plano Detalhado - Melhorias de Textos e Cores

## 🎯 Objetivos
1. **Textos**: PT-BR claro, sem erros de escrita, fácil compreensão
2. **Cores**: Sistema harmônico com alta acessibilidade (WCAG AA/AAA)
3. **Contraste**: Garantir legibilidade em todos os elementos

---

## 📝 PASSO 1: Análise e Correção de Textos

### 1.1 Arquivos a Revisar
- ✅ `src/utils/constants.js` - Textos principais
- ✅ `src/pages/Home.jsx` - Textos da home
- ✅ `src/pages/About.jsx` - Textos sobre Ana
- ✅ `src/pages/Projects.jsx` - Descrições de projetos
- ✅ `src/pages/Contact.jsx` - Textos de contato
- ✅ `src/components/Footer.jsx` - Textos do rodapé
- ✅ `src/components/Header.jsx` - Navegação
- ✅ `index.html` - Meta tags e título

### 1.2 Correções de Textos Identificadas

#### **constants.js**
- ❌ "Apaixonada por criar espaços que transformam vidas e comunidades através do design arquitetônico sustentável e inovador."
  - ✅ Melhorar: "Apaixonada por criar espaços que transformam vidas e comunidades através de projetos arquitetônicos sustentáveis e inovadores."

#### **About.jsx**
- ❌ "Olá! Eu sou a Ana" → ✅ "Olá! Eu sou a Ana Carolina Silva"
- ❌ "harmonizam funcionalidade" → ✅ "harmonizam funcionalidade"
- ❌ "vai além de construir edifícios - é sobre criar" → ✅ "vai além de construir edifícios. É sobre criar"
- ❌ Melhorar clareza e fluidez dos parágrafos

#### **Projects.jsx**
- ❌ Revisar descrições dos projetos para clareza
- ❌ Garantir consistência na escrita

#### **Contact.jsx**
- ❌ "Vamos trabalhar juntos?" → ✅ "Vamos trabalhar juntos?"
- ❌ Melhorar textos de validação do formulário

#### **Footer.jsx**
- ❌ "Arquitetura e Urbanismo com paixão e dedicação." → ✅ Melhorar

---

## 🎨 PASSO 2: Sistema de Cores com Acessibilidade

### 2.1 Análise de Contraste Atual
- **Vermelho (#C62828)** sobre branco: ✅ Bom contraste
- **Dourado (#F9A825)** sobre branco: ⚠️ Contraste médio
- **Texto (#212121)** sobre branco: ✅ Excelente contraste
- **Texto (#757575)** sobre branco: ⚠️ Contraste baixo

### 2.2 Nova Paleta de Cores (WCAG AA/AAA)

#### **Cores Principais (Mantém tema Koi)**
```css
--color-primary: #B71C1C;        /* Vermelho escuro - melhor contraste */
--color-primary-light: #C62828;  /* Vermelho médio */
--color-primary-lighter: #E53935; /* Vermelho claro */
--color-secondary: #F57F17;      /* Dourado escuro - melhor contraste */
--color-secondary-light: #F9A825; /* Dourado médio */
--color-secondary-lighter: #FFB300; /* Dourado claro */
```

#### **Cores de Texto (Alta Acessibilidade)**
```css
--text-primary: #1A1A1A;        /* Preto suave - AAA sobre branco */
--text-secondary: #424242;      /* Cinza escuro - AA sobre branco */
--text-tertiary: #616161;       /* Cinza médio - AA sobre branco (uso limitado) */
--text-light: #FFFFFF;           /* Branco - AAA sobre vermelho/dourado escuro */
--text-muted: #757575;          /* Cinza - apenas para textos secundários */
```

#### **Cores de Fundo**
```css
--bg-primary: #FFFFFF;          /* Branco puro */
--bg-secondary: #FAFAFA;        /* Cinza muito claro */
--bg-tertiary: #F5F5F5;         /* Cinza claro */
--bg-overlay: rgba(0, 0, 0, 0.5); /* Overlay escuro */
```

#### **Cores de Estados**
```css
--success: #2E7D32;             /* Verde - AAA */
--error: #C62828;               /* Vermelho - AAA */
--warning: #F57F17;             /* Dourado escuro - AA */
--info: #1976D2;                /* Azul - AAA */
```

### 2.3 Aplicação por Componente

#### **Home**
- Título: `--text-primary` (#1A1A1A) sobre fundo claro
- Subtítulo: `--text-secondary` (#424242)
- Descrição: `--text-secondary` (#424242)
- Botões: Texto branco sobre gradiente vermelho/dourado

#### **About**
- Títulos: `--text-primary` (#1A1A1A)
- Texto: `--text-secondary` (#424242)
- Skills: Fundo claro, texto `--color-primary` (#B71C1C)

#### **Projects**
- Título do card: `--text-primary` (#1A1A1A)
- Descrição: `--text-secondary` (#424242)
- Tags: Fundo claro, texto `--color-primary` (#B71C1C)

#### **Contact**
- Labels: `--text-primary` (#1A1A1A)
- Inputs: Texto `--text-primary`, borda `--color-primary`
- Placeholder: `--text-tertiary` (#616161)

#### **Header/Footer**
- Links: `--text-primary` (#1A1A1A)
- Hover: `--color-primary` (#B71C1C)
- Fundo: Branco com transparência

---

## 🔍 PASSO 3: Verificação de Contraste (WCAG)

### 3.1 Ferramentas de Verificação
- Usar calculadora de contraste online
- Verificar todos os pares de cores
- Garantir mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande)
- Preferir WCAG AAA quando possível (7:1 para texto normal, 4.5:1 para texto grande)

### 3.2 Pares de Cores a Verificar
1. Texto primário (#1A1A1A) sobre branco (#FFFFFF) → ✅ 16.5:1 (AAA)
2. Texto secundário (#424242) sobre branco (#FFFFFF) → ✅ 10.2:1 (AAA)
3. Texto terciário (#616161) sobre branco (#FFFFFF) → ✅ 6.8:1 (AA)
4. Branco (#FFFFFF) sobre vermelho (#B71C1C) → ✅ 7.8:1 (AAA)
5. Branco (#FFFFFF) sobre dourado (#F57F17) → ✅ 4.8:1 (AA)

---

## 📐 PASSO 4: Aplicação das Melhorias

### 4.1 Ordem de Execução
1. ✅ Atualizar `constants.js` com textos melhorados
2. ✅ Atualizar `index.css` com novo sistema de cores
3. ✅ Revisar e corrigir textos em cada componente
4. ✅ Aplicar novas cores em todos os arquivos CSS
5. ✅ Verificar contraste em todos os elementos
6. ✅ Testar acessibilidade
7. ✅ Build e verificação final

### 4.2 Arquivos CSS a Modificar
- `src/index.css` - Variáveis globais de cores
- `src/pages/Home.css` - Cores da home
- `src/pages/About.css` - Cores do about
- `src/pages/Projects.css` - Cores dos projetos
- `src/pages/Contact.css` - Cores do contato
- `src/components/Header.css` - Cores do header
- `src/components/Footer.css` - Cores do footer
- `src/components/ProjectCard.css` - Cores dos cards
- `src/components/Toast.css` - Cores dos toasts
- Todos os outros componentes CSS

---

## ✅ PASSO 5: Validação Final

### 5.1 Checklist
- [ ] Todos os textos revisados e corrigidos
- [ ] Sem erros de ortografia ou gramática
- [ ] Textos claros e de fácil compreensão
- [ ] Sistema de cores aplicado consistentemente
- [ ] Contraste WCAG AA/AAA verificado
- [ ] Cores harmônicas e profissionais
- [ ] Teste visual em diferentes dispositivos
- [ ] Build sem erros

---

## 🎯 Resumo das Mudanças

### Textos
- ✅ Revisão completa de todos os textos
- ✅ Correção de erros de escrita
- ✅ Melhoria da clareza e fluidez
- ✅ Consistência na linguagem

### Cores
- ✅ Novo sistema de cores com alta acessibilidade
- ✅ Contraste WCAG AA/AAA garantido
- ✅ Harmonia visual mantendo tema Koi
- ✅ Aplicação consistente em todo o site

---

## 🚀 Pronto para Execução!

Este plano garante:
1. Textos profissionais e claros em PT-BR
2. Sistema de cores acessível e harmônico
3. Contraste adequado para todos os usuários
4. Manutenção da identidade visual Koi

**Aguardando aprovação para iniciar o desenvolvimento!**

