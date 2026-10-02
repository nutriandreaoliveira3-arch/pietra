# pietra — Emagrecimento Blindado (BLINDADA)

App web (PWA) de área de membros para a nutricionista Andréa Oliveira, marca BLINDADA.
Veja `README.md` para stack, setup local e detalhes de deploy — este arquivo é contexto
operacional pra retomar o projeto rápido em conversas novas.

## Estado atual (produção)

- **Deploy:** Railway, projeto `tender-harmony`, serviço `pietra`.
- **URL pública:** `https://pietra-production.up.railway.app`
- **Domínio de e-mail:** `blindadokp.com.br`, verificado na Resend (DNS gerenciado no Cloudflare).
- **Banco de dados:** SQLite com volume persistente montado em `/app/data` no Railway (sem isso,
  o banco se perde a cada deploy).
- **Pagamento:** webhook da Greenn, configurado por produto no painel da Greenn (aba **Integração e
  Tokens** de cada produto) — todos usam o **mesmo token de conta** e a mesma URL de webhook
  (`/api/webhooks/greenn`). Catálogo de produtos que dão acesso a conteúdo do app (cadastrados em
  `src/seed.js`, nome tem que bater com o nome exato do produto na Greenn — `matchProduct` em
  `src/routes/webhooks.js` faz correspondência aproximada/normalizada):
  - Protocolos: Reset Blindado (R$197, produto de lançamento principal), Protocolo Emagrecimento
    Metabólico, Protocolo Emagrecimento Hormonal, Jejum Intermitente, Protocolo Turbo das Canetas
    Emagrecedoras (R$497 cada).
  - Produtos avulsos: APP - BLINDADA (R$97), BLIN - Assistente Virtual Educativa da Blindada
    (R$47), e 5 Suplementações (Ativação Metabólica, Modulação Intestinal, Antioxidante
    Anti-inflamatória, Ansiedade e Compulsão GLP-1, Termogênica — R$97 cada).
  - Cada módulo de conteúdo (Admin → Conteúdo) pode ser vinculado a um desses produtos — quem não
    comprou vê o módulo trancado. Módulo sem produto vinculado fica aberto pra qualquer cliente
    ativa.
  - Fora do catálogo (produtos só de checkout, sem relação com o app — ficam no site
    `blindadokp`): Editor de Vídeo Blindado (PRO/Básico), Máquina Prompt, Skills, e os desafios
    curtos (Pare de Comer por Ansiedade, Receitas Blindadas, Desafio 7 dias, Desafio 21 dias,
    Detox 3 dias, Barriga Desinchada).
  - Ofertas combinadas (comprou X, ganha acesso a Y também) ainda não têm automação — a dona avisa
    quando quiser montar uma e eu libero manualmente.
- Variáveis de ambiente reais (JWT_SECRET, RESEND_API_KEY, GREENN_WEBHOOK_TOKEN etc.) ficam **só**
  no Railway → Variables. Nunca commitar valores reais no repo.

## Domínio da landing page (`emagrecimentoblindado.com.br`)

Landing "Emagrecimento Blindado Elite" (`landing-pages/emagrecimento-blindado-elite/`), servida pelo
mesmo Express quando o host é `emagrecimentoblindado.com.br` / `www.` (`LANDING_HOSTS` em `src/index.js`).

- **Endereço oficial: `https://www.emagrecimentoblindado.com.br`** (só o `www` está em Railway →
  Networking → Custom Domains; o plano atual bateu o limite de domínios customizados).
- Cloudflare (DNS do domínio): `www` CNAME → alvo do Railway, **Proxied**; raiz (`@`) CNAME
  **Proxied** + **Page Rule** (Rules → Page Rules) `emagrecimentoblindado.com.br/*` → Forwarding URL
  301 → `https://www.emagrecimentoblindado.com.br/$1`. SSL/TLS em **Full**. (A tela de Redirect Rules
  travava com "action is required for action parameters"; por isso ficou no Page Rules.)
- **Nunca** criar Redirect Rule "WWW to root" nesse domínio: manda todo mundo para a raiz, que o
  Railway não conhece → 404 (`x-railway-fallback: true`). Foi a causa das quedas de set/2026.
- O Express também redireciona raiz → www, caso algum pedido sem `www` chegue ao servidor.
- Links em e-mails, anúncios e bio devem usar sempre o endereço com `www`.

## Site institucional (`site/`)

Site da marca pessoal **Andréa Augusto de Oliveira** (antes conhecida como Andréa Marim), com o
método Emagrecimento Blindado como produto. Gerador estático sem dependências (`site/build.mjs`),
conteúdo editável em `site/content/config.mjs`. Veja `site/README.md`.

- Servido pelo mesmo Express: `/site-previa/` (noindex) e, nos domínios de `SITE_HOSTS`, na raiz.
- Formulário → `POST /api/site/contato` (tabela `site_contacts` + e-mail para `SITE_CONTATO_EMAIL`).
- Acervo de mídia (nome antigo Andréa Marim) em `site/content/imprensa.mjs` — só itens confirmados em
  fonte; `exibirNoSite: false` para matérias que conflitam com o posicionamento. Gera
  `site/LEVANTAMENTO-MIDIA.csv`/`.md`. Rede do sandbox bloqueia os sites de imprensa: checar links
  pelo conector Apify (`apify--web-fetch`).
- Pendências (CRN, CNPJ, domínio, WhatsApp, link do Raio-X...) em `site/PENDENCIAS.md`
  (gerado por `npm run site:previa`). Nunca inventar esses dados.

## Raio-X 360º do Emagrecimento™ (questionário do site)

- Perguntas, dimensões e textos do resultado: `src/lib/raioxPerguntas.js` (fonte única — o
  servidor calcula e o site embute a mesma definição em `/raio-x/questionario/`).
- Motor: `src/lib/raiox.js` (status por dimensão, 3 prioridades, pontos fortes, barreiras, perfil,
  sinais de encaminhamento). Nada de diagnóstico, prescrição ou promessa — linguagem cuidadosa.
- API: `POST /api/raiox` (início + consentimento LGPD art. 11), `PUT /api/raiox/:token` (salva cada
  etapa), `POST /api/raiox/:token/concluir`. Tabela `raiox_respostas`. Admin: `/admin/raio-x`
  (lista, detalhe, exclusão). O e-mail de aviso não leva respostas (dados de saúde ficam no sistema).
- Visual preto/branco/dourado só nas seções do Raio-X (tokens `preto`, `dourado`, `douradoClaro`,
  `douradoTexto` em `site/content/config.mjs`). "™" é marca em uso; não usar "®" sem registro no INPI.

## Área de administração (dentro do próprio app)

Usuários com `role = 'admin'` veem três abas extras no menu:

- **Conteúdo** (`/admin/conteudo`) — criar/editar/apagar módulos e aulas (título, texto,
  link de vídeo opcional). Rotas backend: `POST/PUT/DELETE /api/modules[...]`.
- **Raio-X** (`/admin/raio-x`) — respostas e painel do Raio-X 360º enviados pelo site.
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

## Skills de Instagram (`ig-*`) — contexto obrigatório de marca

As skills `.claude/skills/ig-*` vêm de um repositório público e estão em inglês. Sempre que
qualquer uma delas for usada (`/ig-reel`, `/ig-carousel` etc.), seguir **obrigatoriamente**
`.claude/instagram-marca.md`: tudo em português do Brasil, voz da marca BLINDADA e regras éticas da
nutrição. Se houver conflito com a skill original, esse arquivo prevalece. Ler o arquivo antes da
primeira execução de uma skill `ig-*` na conversa, caso ele ainda não esteja no contexto.

@.claude/instagram-marca.md

## Posicionamento padrão de TODO conteúdo (desde 02/10/2026)

Público e ângulo padrão: mulheres de alta responsabilidade 35+ (executivas, CEOs, fundadoras,
empresárias, médicas, advogadas, líderes), comunicação high ticket que começa pela cena real da
rotina dela, nunca pela dieta. Regras completas, filtro obrigatório e formato de entrega em
`.claude/posicionamento-high-ticket.md` — vale para qualquer conteúdo, salvo pedido explícito em
contrário.

@.claude/posicionamento-high-ticket.md

## Fluxo de trabalho neste repo

- Branch de trabalho: `claude/app-window-recovery-guc1zt` (branch designada da sessão). Ao voltar
  numa conversa nova, se essa branch já tiver PR mesclado, reiniciar ela a partir do `main` antes
  de novos commits (`git fetch origin main && git checkout -B <branch> origin/main`).
- PRs são criados e mesclados via GitHub MCP (squash merge). A dona do projeto não lê código —
  prefere que eu resolva, teste localmente e já mescle, avisando o que mudou em português simples.
- A dona (Andréa/equipe) tem pouca familiaridade técnica — instruções de UI (Railway, Resend,
  Greenn, Cloudflare) precisam ser bem passo a passo, com nomes exatos de botões/abas.
