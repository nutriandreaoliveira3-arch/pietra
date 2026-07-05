# Pietra — Design System

Este documento é a fonte da verdade para a identidade visual do projeto Pietra.
Toda página nova (HTML, e-mail, PDF, etc.) deve reutilizar estes tokens e
componentes em vez de criar estilos novos. Qualquer mudança na identidade
visual precisa de aprovação explícita antes de ser aplicada.

A implementação em CSS vive em `public/css/design-system.css` e a vitrine
visual (todos os componentes renderizados) em `public/design-system.html`.

## Princípios

- Elegante, editorial, premium, minimalista.
- Sensação de livro digital de luxo / revista de consultoria.
- Muito espaço em branco. Nada apertado, nada "landing page agressiva".
- Sem gradientes, sem sombras pesadas, sem cores em excesso.
- Design atemporal — evitar tendências visuais passageiras.

## Paleta de cores

| Token                  | Valor     | Uso                                   |
|------------------------|-----------|----------------------------------------|
| `--color-bg`           | `#F7F1EA` | Fundo principal da página              |
| `--color-card`         | `#EFE3D6` | Fundo de cards e blocos                |
| `--color-primary`      | `#7B3048` | Vinho — botões, links ativos, destaque |
| `--color-primary-hover`| `#652639` | Hover/active do vinho                  |
| `--color-primary-tint` | `#7B304814` (8% opacidade) | Fundos suaves com a cor principal |
| `--color-secondary`    | `#A78C7D` | Acentos secundários, ícones, badges    |
| `--color-text`         | `#3F332E` | Texto principal                        |
| `--color-text-secondary`| `#7E7069`| Texto de apoio, legendas, metadados     |
| `--color-border`       | `#DCCFC2` | Linhas, divisórias, bordas de cards     |
| `--color-surface`      | `#FFFFFF` | Superfícies elevadas (inputs, modais)   |

Regras:
- Nunca usar cores fora da paleta sem aprovação.
- O vinho (`--color-primary`) é reservado para ações e destaques — não usar como cor de fundo grande.
- Evitar preto puro e branco puro no texto; usar sempre `--color-text` / `--color-text-secondary`.

## Tipografia

- **Títulos**: serif elegante — `Playfair Display` (preferência), com fallback `Cormorant Garamond`, `Libre Baskerville`, `serif`.
- **Texto corrido / UI**: `Inter`, com fallback `Source Sans 3`, `Lato`, `sans-serif`.

Escala tipográfica:

| Token         | Tamanho | Uso                          |
|---------------|---------|-------------------------------|
| `--text-xs`   | 12px    | Legendas, labels em caixa alta |
| `--text-sm`   | 14px    | Texto de apoio                |
| `--text-base` | 17px    | Corpo de texto                |
| `--text-lg`   | 20px    | Destaque de parágrafo         |
| `--text-xl`   | 26px    | Título de card / seção pequena|
| `--text-2xl`  | 34px    | Título de seção (H2)          |
| `--text-3xl`  | 46px    | Título de página (H1)         |

Hierarquia: H1/H2 sempre em serif, peso 600; corpo sempre em Inter, peso 400;
labels/metadados em caixa alta, letter-spacing levemente aberto, cor secundária.

## Espaçamento

Escala base de 4px, com nomes semânticos para os intervalos grandes descritos
pelo briefing:

| Token              | Valor  | Uso                              |
|---------------------|--------|-----------------------------------|
| `--space-1` … `--space-12` | 4px–96px | Escala granular (4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96) |
| `--space-paragraph` | 20px   | Entre parágrafos                  |
| `--space-title`     | 40px   | Entre título e conteúdo seguinte  |
| `--space-section`   | 96px   | Entre seções (80–120px)          |

Regra geral: quando em dúvida, use mais espaço, não menos.

## Grid e layout

- Largura máxima do conteúdo: `--container-max: 1200px`, centralizado.
- Layout de duas colunas: menu lateral fixo (`--sidebar-width: 280px`) + coluna
  de conteúdo larga e fluida.
- Padding lateral mínimo da página: `--space-6` (24px) em mobile, `--space-10`
  (64px) em telas largas.
- Sem grades de "cards em cascata" apertadas — no máximo 2–3 colunas de cards,
  sempre com respiro generoso entre eles.

## Componentes

### Cards
- `border-radius: 10px` (`--radius-card`, entre 8–12px).
- Fundo `--color-card`, borda 1px `--color-border` opcional.
- Sombra extremamente suave: `--shadow-card` = `0 2px 16px rgba(63,51,46,0.06)`.
- Sem gradientes. Visual fosco (sem brilho/glossy).

### Caixas de destaque (callouts)
Duas variantes, como na referência:
- **Quote/citação** (`.callout--quote`): fundo `--color-card`, texto em itálico serif, usada para falas/identificação.
- **Destaque vinho** (`.callout--highlight`): fundo `--color-primary`, texto em `--color-bg` (contraste alto), usada para ganchos/CTAs de leitura. Usar com moderação — é o elemento mais "forte" da página.

### Botões
- **Primário** (`.btn--primary`): fundo `--color-primary`, texto `--color-bg`, hover `--color-primary-hover`, sem sombra forte, `border-radius: 6px`.
- **Secundário** (`.btn--secondary`): borda 1px `--color-primary`, texto `--color-primary`, fundo transparente; hover preenche com `--color-primary-tint`.
- **Texto/ghost** (`.btn--ghost`): sem borda nem fundo, apenas texto `--color-primary` com sublinhado no hover.
- Nunca usar caixa alta agressiva nem ícones chamativos dentro do botão.

### Menus / navegação lateral
- Fundo igual ao da página (`--color-bg`) ou levemente diferenciado.
- Item ativo: texto `--color-primary`, borda esquerda de 2px `--color-primary`.
- Item padrão: texto `--color-text-secondary`; hover: texto `--color-text`.
- Espaçamento vertical generoso entre itens (`--space-3` a `--space-4`).

### Links
- Cor `--color-primary`, sem sublinhado por padrão no corpo de texto corrido; sublinhado aparece no hover.
- Em navegação/menu, sem sublinhado em nenhum estado (usa cor + borda lateral).

### Formulários
- Inputs com fundo `--color-surface`, borda 1px `--color-border`, `border-radius: 6px`, padding generoso (`--space-3` vertical, `--space-4` horizontal).
- Foco: borda `--color-primary` + leve halo (`box-shadow: 0 0 0 3px var(--color-primary-tint)`), nunca outline azul do navegador.
- Labels em `--text-xs`, caixa alta, `--color-text-secondary`, acima do campo.

### Ícones
- Estilo line/outline, traço fino (stroke ~1.5px), sem preenchimento sólido, cor `--color-secondary` ou `--color-text-secondary`.
- Tamanho padrão 20–24px, alinhados ao texto adjacente.

### Sombras
- Uma única escala, sempre suave: `--shadow-card` (cards) e `--shadow-elevated` (modais/popovers, levemente mais forte: `0 8px 32px rgba(63,51,46,0.10)`).
- Nunca usar sombras coloridas ou múltiplas camadas fortes.

### Bordas
- `--radius-sm: 6px` (botões, inputs), `--radius-md: 10px` (cards), `--radius-lg: 16px` (blocos grandes/imagens).
- Cor de borda padrão sempre `--color-border`.

### Animações
- Transições curtas e discretas: `--transition-fast: 150ms ease`, `--transition-base: 220ms ease`.
- Usadas apenas em hover/foco (cor, sombra, leve translateY de 1–2px). Nunca animações chamativas, bounce ou zoom.
- Respeitar `prefers-reduced-motion: reduce` (desativa transições).

## O que evitar

- Cores fora da paleta.
- Gradientes.
- Sombras pesadas ou coloridas.
- Ícones cheios/coloridos ou ilustrações cartoon.
- Layout denso, "landing page" com muitos CTAs coloridos.
- Fontes diferentes das definidas aqui.

## Como usar em novas páginas

1. Incluir `public/css/design-system.css` (tokens + componentes) no `<head>`.
2. Importar as fontes (Playfair Display + Inter) via Google Fonts ou self-host.
3. Montar a página com as classes utilitárias/componentes já existentes (`.container`, `.layout`, `.sidebar`, `.card`, `.btn`, `.callout`, etc.) em vez de estilos inline novos.
4. Caso falte um componente, adicioná-lo primeiro ao design system (CSS + esta documentação + vitrine) e só depois usá-lo na página — nunca criar um estilo "único" para uma página específica.
