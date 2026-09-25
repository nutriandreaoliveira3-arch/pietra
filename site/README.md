# Site institucional — Andréa Augusto de Oliveira

Site da marca pessoal (não é o app de membros). Estático, rápido, sem
dependências: um gerador em Node monta as páginas a partir dos arquivos de
conteúdo.

## Arquitetura de marca

1. **Andréa Augusto de Oliveira** — marca principal (nome no topo, rodapé, títulos).
2. **Andréa Marim** — autoridade histórica: aparece na página Sobre, na
   Imprensa, no FAQ e nos dados estruturados (`alternateName`), sem repetição
   exagerada.
3. **Emagrecimento Blindado** — método/produto criado por ela. Novos produtos
   podem ganhar páginas próprias sem mexer na marca.

## Onde editar cada coisa

| O quê | Arquivo |
|---|---|
| CRN, CNPJ, WhatsApp, e-mail, Instagram, link do Raio-X, textos dos botões, cores, fontes, imagens, depoimentos, trajetória, SEO | `content/config.mjs` |
| Acervo "Na mídia" (TV, revistas, jornais, portais, vídeos) | `content/imprensa.mjs` → gera `LEVANTAMENTO-MIDIA.csv` e `.md` |
| Perguntas frequentes | `content/faq.mjs` |
| Artigos da página Conteúdos | `content/artigos/*.mjs` (veja o README da pasta) |
| Textos das seções das páginas | `pages.mjs` |
| Visual (espaçamentos, componentes) | `static/css/site.css` |
| Fotos | `static/img/` (depois aponte o caminho em `config.mjs → imagens`) |

**Regra de ouro:** valor `null` ou lista vazia = pendente. A versão publicada
esconde o que está pendente; a prévia mostra tudo em amarelo.

## Comandos

```bash
npm run site:build     # gera site/dist (versão publicada)
npm run site:previa    # prévia com pendências destacadas em http://localhost:4321
                       # e atualiza site/PENDENCIAS.md
```

`npm run build` (usado pela Railway) já gera o site automaticamente.

## Publicação (Railway, mesmo serviço do app)

- **Prévia para conferência:** `https://pietra-production.up.railway.app/site-previa/`
  (não é indexada pelo Google).
- **Domínio próprio:** apontar o domínio para o serviço `pietra` na Railway
  (Settings → Networking → Custom Domain) e criar a variável
  `SITE_HOSTS=dominio.com.br,www.dominio.com.br`. Depois, trocar
  `site.url` e `site.dominioConfirmado: true` em `content/config.mjs`.
- **Formulário de contato:** as mensagens ficam salvas no banco (tabela
  `site_contacts`) e chegam por e-mail no endereço da variável
  `SITE_CONTATO_EMAIL` (usa a mesma Resend do app).

## Botões e hierarquia

- **Principal (sálvia cheio):** Raio-X — topo, hero, seção Raio-X, CTA final, menu, rodapé.
- **Secundário (contorno):** conhecer o método / a trajetória.
- **Relacionamento (areia):** WhatsApp — CTA final, rodapé, contato e botão
  flutuante (só no celular, depois do primeiro bloco, some perto do rodapé e
  do formulário, pode ser minimizado e respeita a área segura do iPhone).
- **Institucional (link):** imprensa, conteúdos, privacidade, termos.

Sem link do Raio-X configurado, os botões do questionário levam ao WhatsApp;
sem WhatsApp, à página de contato. Nenhum botão fica quebrado.

## Regras que o site segue (não quebrar)

- Nada de CRN, CNPJ, títulos, números, depoimentos ou imprensa inventados.
- Nada de "®" em Emagrecimento Blindado enquanto a marca não for registrada.
- Sem promessa de resultado, prazo ou quilos; sem antes e depois.
- Fotos antigas (Andréa Marim) sempre com legenda, veículo e ano.
- Contraste mínimo AA: terracota e oliva só em detalhes; textos pequenos em
  terracota usam `terracotaTexto`.
