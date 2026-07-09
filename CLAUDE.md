# pietra — Emagrecimento Blindado (BLINDADA)

App web (PWA) de área de membros para a nutricionista Andrea Oliveira, marca BLINDADA.
Veja `README.md` para stack, setup local e detalhes de deploy — este arquivo é contexto
operacional pra retomar o projeto rápido em conversas novas.

## Estado atual (produção)

- **Deploy:** Railway, projeto `tender-harmony`, serviço `pietra`.
- **URL pública:** `https://pietra-production.up.railway.app`
- **Domínio de e-mail:** `blindadokp.com.br`, verificado na Resend (DNS gerenciado no Cloudflare).
- **Banco de dados:** SQLite com volume persistente montado em `/app/data` no Railway (sem isso,
  o banco se perde a cada deploy).
- **Pagamento:** webhook da Greenn, configurado nos 5 produtos de lançamento (Emagrecimento
  Blindado, Ativação Metabólica, Destravando seus Hormônios, Jejum Intermitente, Protocolo das
  Canetas Turbo) — todos usam o **mesmo token de conta** e a mesma URL de webhook
  (`/api/webhooks/greenn`), configurados individualmente em cada produto no painel da Greenn.
- Variáveis de ambiente reais (JWT_SECRET, RESEND_API_KEY, GREENN_WEBHOOK_TOKEN etc.) ficam **só**
  no Railway → Variables. Nunca commitar valores reais no repo.

## Área de administração (dentro do próprio app)

Usuários com `role = 'admin'` veem duas abas extras no menu:

- **Conteúdo** (`/admin/conteudo`) — criar/editar/apagar módulos e aulas (título, texto,
  link de vídeo opcional). Rotas backend: `POST/PUT/DELETE /api/modules[...]`.
- **Clientes** (`/admin/clientes`) — cadastrar cliente manualmente (fora do fluxo da Greenn, pra
  venda direta ou cortesia — dispara o mesmo e-mail de ativação), revogar/reativar acesso. Rotas
  backend: `/api/admin/users[...]`.

Ambas protegidas por `requireAdmin` middleware (`src/middleware/auth.js`).

## Armadilhas já resolvidas (não repetir)

- **`nixpacks.toml`**: usar `nixPkgs = ["nodejs_22"]` + `aptPkgs = ["python3", "gcc", "g++", "make"]`.
  - `nixPkgs` **substitui** os pacotes padrão detectados (não adiciona) — por isso o Node precisa
    estar explícito na lista, senão o `npm` some do ambiente de build.
  - `nodejs_24` **não existe** nesse canal do Nix usado pelo Railway.
  - `nodejs_20`/`nodejs_22` do nixpkgs ficam em versões de patch (20.18.1 / 22.11.0) abaixo do que
    Vite 7/8 exigem (`^20.19.0 || >=22.12.0`).
- **Vite**: por isso o frontend está fixado em **Vite 6** (`web/package.json`), que só exige
  `^18 || ^20 || >=22` — evita todo esse problema de versão de patch do Nix.
- **`uuid`**: fixado em **v11** — a v14+ é ESM-only e quebra o `require('uuid')` usado no backend
  (CommonJS).
- Sempre que mexer em `nixpacks.toml`/dependências de build, testar localmente com
  `npm install && npm run build` dentro de `web/` **antes** de fazer push — o ambiente sandbox
  aqui roda Linux x64, igual o Railway.

## Fluxo de trabalho neste repo

- Branch de trabalho: `claude/app-window-recovery-guc1zt` (branch designada da sessão). Ao voltar
  numa conversa nova, se essa branch já tiver PR mesclado, reiniciar ela a partir do `main` antes
  de novos commits (`git fetch origin main && git checkout -B <branch> origin/main`).
- PRs são criados e mesclados via GitHub MCP (squash merge). A dona do projeto não lê código —
  prefere que eu resolva, teste localmente e já mescle, avisando o que mudou em português simples.
- A dona (Andrea/equipe) tem pouca familiaridade técnica — instruções de UI (Railway, Resend,
  Greenn, Cloudflare) precisam ser bem passo a passo, com nomes exatos de botões/abas.
