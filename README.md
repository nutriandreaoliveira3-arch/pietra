# Emagrecimento Blindado

App web (PWA) da BLINDADA — Nutricionista Andrea Oliveira. Área de membros com o
protocolo do Emagrecimento Blindado, diário alimentar e acompanhamento de peso/medidas.

## Stack

- **Backend**: Node.js + Express + SQLite (`better-sqlite3`), autenticação por JWT.
- **Frontend**: React + Vite, PWA instalável (manifest + service worker).
- **Pagamento/assinatura**: webhook da plataforma Greenn.

## Configuração

1. Copie `.env.example` para `.env` e preencha:
   - `JWT_SECRET`: obrigatório, qualquer string longa e aleatória.
   - `GREENN_WEBHOOK_TOKEN`: o token de webhook configurado no painel da Greenn
     (Integração e Tokens).
   - `APP_URL`: URL pública onde o app está publicado (usada para montar o link de
     ativação enviado por e-mail).
   - `RESEND_API_KEY` e `EMAIL_FROM`: credenciais da [Resend](https://resend.com) para
     enviar o e-mail de ativação de conta. Sem `RESEND_API_KEY`, o e-mail não é enviado
     (fica só um aviso no log) — útil em desenvolvimento.
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (opcional): cria um usuário admin ao
     rodar o seed, útil para testes locais sem depender do webhook da Greenn.

2. Instale as dependências do backend e rode o seed de conteúdo:

   ```bash
   npm install
   npm run seed
   ```

3. Instale e builde o frontend:

   ```bash
   npm run build:web
   ```

4. Suba o servidor (serve a API e o frontend buildado):

   ```bash
   npm start
   ```

   Acesse `http://localhost:3000`.

### Desenvolvimento

Para desenvolver com hot-reload, rode backend e frontend em terminais separados:

```bash
npm run dev       # backend na porta 3000
npm run dev:web   # frontend Vite na porta 5173, com proxy de /api para o backend
```

## Configurando o webhook da Greenn

No painel da Greenn, em **Integração e Tokens**, configure um Webhook apontando para:

```
POST https://SEU_DOMINIO/api/webhooks/greenn?token=SEU_GREENN_WEBHOOK_TOKEN
```

Quando uma venda é aprovada (`status: paid`), o sistema cria automaticamente a conta da
cliente (status `pending`) e envia um e-mail de ativação via Resend, com um link no
formato:

```
https://SEU_DOMINIO/definir-senha?token=<activation_token>
```

Ao definir a senha, a conta passa para `active` e a cliente ganha acesso ao app. Em
reembolso/chargeback/recusa, o acesso é automaticamente revogado (status `inactive`).

### Configurando o envio de e-mail (Resend)

1. Crie uma conta em [resend.com](https://resend.com) e gere uma API Key.
2. Coloque essa chave em `RESEND_API_KEY` no `.env`.
3. Para testar rapidamente, pode deixar `EMAIL_FROM=BLINDADA <onboarding@resend.dev>`
   (domínio de testes da própria Resend, funciona sem configuração adicional).
4. Para produção, configure e verifique seu próprio domínio na Resend (registros DNS
   SPF/DKIM) e troque `EMAIL_FROM` para um endereço desse domínio
   (ex: `BLINDADA <contato@blindada.com.br>`).

**Importante:** o formato exato do payload enviado pela Greenn deve ser conferido na conta
real ao configurar o webhook em produção — o parser em `src/routes/webhooks.js` aceita as
variações mais comuns de nomes de campo, mas registra o payload bruto em
`greenn_events.raw_payload` para calibração caso algo não bata.

## Estrutura do projeto

```
src/            backend (Express)
  db/           conexão e schema do SQLite
  lib/          auth (JWT)
  middleware/   autenticação de rotas
  routes/       auth, webhooks, módulos, diário, peso
  seed.js       popula módulos/aulas iniciais e usuário admin de teste
web/            frontend (React + Vite), PWA
fotos/          biblioteca de imagens oficiais da BLINDADA (usada pelas skills de conteúdo)
.claude/skills/ skills de geração de conteúdo (carrosséis, campanhas de Meta Ads)
```

## Skills de conteúdo

Este repositório também inclui skills do Claude Code para gerar conteúdo de marketing:

- `blindada-carrossel`: carrosséis virais para Instagram.
- `blindada-meta-ads`: campanhas completas de Meta Ads.
