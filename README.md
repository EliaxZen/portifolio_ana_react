# Portfólio Ana - React

Projeto de portfólio pessoal desenvolvido com React e Vite.

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
npm install
```

### Desenvolvimento

Inicia o servidor de desenvolvimento na porta 3000:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Build para produção

Gera os arquivos otimizados para produção na pasta `dist`:

```bash
npm run build
```

### Preview da build

Visualiza a build de produção localmente:

```bash
npm run preview
```

### Deploy no GitHub Pages

Para fazer deploy no GitHub Pages (após instalar gh-pages):

```bash
npm run deploy
```

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas do portfólio
├── assets/         # Imagens, ícones, etc.
├── utils/          # Funções utilitárias
├── App.jsx         # Componente principal
├── App.css         # Estilos do App
├── main.jsx        # Ponto de entrada
└── index.css       # Estilos globais
```

## 📦 Tecnologias

- **React 18.3** - Biblioteca JavaScript para interfaces
- **Vite 5.4** - Build tool e dev server
- **ESLint** - Linter para qualidade de código

## 🛠️ Configurações

- **Alias de importação**: Use `@/` para importar de `src/`
- **Porta padrão**: 3000
- **Build otimizado**: Code splitting automático

## 📝 Licença

MIT

