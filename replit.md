# Richard.dev

Portfólio profissional de Richard — Desenvolvedor Full Stack com foco em Backend, Automação e IA.

## Stack

- **React 18** + **TypeScript**
- **Vite 8** (bundler + dev server)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **ESLint** + **Prettier**

## Como executar

O workflow `Start application` já está configurado. Para rodar manualmente:

```bash
npm run dev      # dev server na porta 5000
npm run build    # build de produção
npm run lint     # checar erros de lint
npm run format   # formatar com Prettier
```

## Estrutura de pastas

```
src/
  app/            # Componente raiz (App.tsx)
  components/
    common/       # Componentes reutilizáveis genéricos
    layout/       # Estrutura de layout (Header, Footer, etc.)
    ui/           # Primitivos de UI (Button, Card, etc.)
  features/       # Módulos por funcionalidade
  hooks/          # Custom hooks
  services/       # Integrações com APIs externas
  utils/          # Funções utilitárias puras
  types/          # Tipos e interfaces TypeScript globais
  constants/      # Valores constantes da aplicação
  assets/         # Imagens, fontes e outros arquivos estáticos
  styles/         # CSS global (globals.css com Tailwind)
```

## Alias

O alias `@` aponta para `src/`. Exemplo: `import { foo } from '@/utils/foo'`

## User preferences

- Idioma: Português (BR)
- Sem componentes visuais desnecessários — priorizar arquitetura limpa
