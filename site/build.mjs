#!/usr/bin/env node
// Gera o site estático em site/dist/. Sem dependências — só Node 18+.
//
//   node site/build.mjs            versão de produção (pendências escondidas)
//   node site/build.mjs --previa   prévia: pendências destacadas + noindex
//   node site/build.mjs --arquivos links com index.html (abrir direto do disco)
//   node site/build.mjs --servir   gera e abre um servidor local na porta 4321
import { promises as fs } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import C from './content/config.mjs';
import { ctx, setPage, abs } from './lib/ui.mjs';
import { pagina } from './lib/layout.mjs';
import { todasAsPaginas } from './pages.mjs';
import { midia, pistas, CATEGORIAS, PAPEIS, VERIFICADO_EM } from './content/imprensa.mjs';

const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(RAIZ, 'dist');
const args = new Set(process.argv.slice(2));
ctx.preview = args.has('--previa') || process.env.SITE_PREVIA === '1';
ctx.fileMode = args.has('--arquivos');

async function carregarArtigos() {
  const dir = path.join(RAIZ, 'content', 'artigos');
  const arquivos = (await fs.readdir(dir)).filter((f) => f.endsWith('.mjs')).sort();
  const artigos = [];
  for (const f of arquivos) {
    const { default: a } = await import(pathToFileURL(path.join(dir, f)).href);
    if (!/^[a-z0-9-]+$/.test(a.slug)) throw new Error(`Slug inválido em ${f}: "${a.slug}"`);
    if (a.publicado || ctx.preview) artigos.push(a);
    if (!a.publicado) ctx.pendencias.set(`Revisar e aprovar o artigo "${a.titulo}" (publicado: false)`, new Set([`/conteudos/${a.slug}/`]));
  }
  return artigos.sort((a, b) => (a.data < b.data ? 1 : -1));
}

async function copiar(orig, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const e of await fs.readdir(orig, { withFileTypes: true })) {
    const o = path.join(orig, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copiar(o, d);
    else await fs.copyFile(o, d);
  }
}

function verificarPendenciasCriticas() {
  const avisos = [];
  if (!C.site.dominioConfirmado) avisos.push(`Domínio ainda não confirmado — canonical/sitemap usam ${C.site.url}`);
  if (!C.pessoa.crn) avisos.push('CRN não informado — o Código de Ética exige nome + CRN em divulgação profissional');
  return avisos;
}

async function build() {
  const t0 = Date.now();
  await fs.rm(DIST, { recursive: true, force: true });
  await copiar(path.join(RAIZ, 'static'), DIST);

  const artigos = await carregarArtigos();
  const geradas = [];
  for (const [rota, fn] of todasAsPaginas(artigos)) {
    setPage(rota);
    const p = fn();
    const html = pagina(p);
    const arquivo = p.arquivo || path.join(rota, 'index.html');
    await fs.mkdir(path.dirname(path.join(DIST, arquivo)), { recursive: true });
    await fs.writeFile(path.join(DIST, arquivo), html);
    geradas.push({ rota, p, bytes: Buffer.byteLength(html) });
  }

  // sitemap.xml e robots.txt
  const hoje = new Date().toISOString().slice(0, 10);
  const indexaveis = geradas.filter((g) => !g.p.noindex && !g.p.arquivo);
  const prioridade = (r) => (r === '' ? '1.0' : ['sobre/', 'emagrecimento-blindado/', 'raio-x/'].includes(r) ? '0.9' : r.startsWith('conteudos/') ? '0.7' : '0.5');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexaveis.map((g) => `  <url><loc>${abs(g.rota)}</loc><lastmod>${artigos.find((a) => g.rota === `conteudos/${a.slug}/`)?.atualizado || hoje}</lastmod><priority>${prioridade(g.rota)}</priority></url>`).join('\n')}
</urlset>
`;
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
  await fs.writeFile(
    path.join(DIST, 'robots.txt'),
    ctx.preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${abs('sitemap.xml')}\n`,
  );

  // Relatório de pendências (sempre gerado da versão completa).
  const criticas = verificarPendenciasCriticas();
  const linhas = [...ctx.pendencias.entries()].map(([r, pgs]) => `- [ ] ${r} — ${pgs.size > 4 ? 'todas as páginas' : [...pgs].join(', ')}`);
  const md = `# Pendências do site

Gerado automaticamente por \`node site/build.mjs\` em ${hoje}. Não editar à mão:
preencha os dados em \`site/content/config.mjs\` e rode o build de novo.

## Críticas (antes de divulgar o site)

${criticas.map((c) => `- [ ] ${c}`).join('\n') || '- Nenhuma'}

## Conteúdo e dados

${linhas.join('\n') || '- Nenhuma'}
`;
  if (ctx.preview) await fs.writeFile(path.join(RAIZ, 'PENDENCIAS.md'), md);

  await gerarLevantamentoMidia();

  const total = geradas.reduce((s, g) => s + g.bytes, 0);
  console.log(`Site gerado em ${path.relative(process.cwd(), DIST) || DIST} (${ctx.preview ? 'PRÉVIA' : 'produção'}): ${geradas.length} páginas, ${(total / 1024).toFixed(0)} KB de HTML, ${Date.now() - t0} ms.`);
  if (criticas.length) console.warn('Atenção:\n' + criticas.map((c) => '  • ' + c).join('\n'));
  console.log(`${ctx.pendencias.size} pendências de conteúdo${ctx.preview ? ' — veja site/PENDENCIAS.md' : ' (rode com --previa para atualizar site/PENDENCIAS.md)'}.`);
}

// Planilha (CSV para Excel/Google Planilhas) e relatório do acervo de mídia,
// sempre gerados a partir de content/imprensa.mjs.
async function gerarLevantamentoMidia() {
  const cat = (id) => CATEGORIAS.find((c) => c.id === id)?.nome || id;
  const verif = { confirmada: 'Confirmada', parcial: 'Parcial', 'nao-verificada': 'Não verificada' };
  const ordenado = CATEGORIAS.flatMap((c) =>
    midia.filter((m) => m.categoria === c.id).sort((a, b) => String(b.data || '').localeCompare(String(a.data || ''))),
  );
  const colunas = [
    ['Categoria', (m) => cat(m.categoria)],
    ['Veículo', (m) => m.veiculo],
    ['Programa / seção', (m) => m.programa || ''],
    ['Título', (m) => m.titulo],
    ['Data ou ano', (m) => m.data || 'não informada'],
    ['Tema', (m) => m.tema],
    ['Papel de Andréa', (m) => PAPEIS[m.papel] || m.papel],
    ['Nome usado', () => C.pessoa.nomeAnterior],
    ['Link da fonte', (m) => m.url],
    ['Link do vídeo', (m) => m.urlVideo || ''],
    ['Vídeo / imagem / PDF', (m) => m.formatos.join(', ')],
    ['Status do link', (m) => m.status],
    ['Verificação', (m) => verif[m.verificacao] || m.verificacao],
    ['Evidência', (m) => m.evidencia],
    ['Aparece no site', (m) => (m.exibirNoSite ? 'Sim' : 'Não')],
    ['Destaque', (m) => (m.destaque ? 'Sim' : '')],
    ['Motivo de não aparecer', (m) => m.motivoOculto || ''],
    ['Observações', (m) => m.obs || ''],
    ['Verificado em', () => VERIFICADO_EM],
  ];
  const cel = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = '\uFEFF' + [colunas.map(([n]) => cel(n)).join(';'), ...ordenado.map((m) => colunas.map(([, f]) => cel(f(m))).join(';'))].join('\r\n') + '\r\n';
  await fs.writeFile(path.join(RAIZ, 'LEVANTAMENTO-MIDIA.csv'), csv);

  const conta = (f) => midia.filter(f).length;
  const dataBR = (d) => (!d ? '—' : d.length === 10 ? d.split('-').reverse().join('/') : d.length === 7 ? d.split('-').reverse().join('/') : d);
  const md = [
    '# Levantamento de mídia — Andréa Marim → Andréa Augusto de Oliveira',
    '',
    `Gerado automaticamente a partir de \`site/content/imprensa.mjs\`. Links checados em ${dataBR(VERIFICADO_EM)}.`,
    'Planilha completa: `site/LEVANTAMENTO-MIDIA.csv` (abre no Excel ou no Google Planilhas).',
    '',
    '## Resumo',
    '',
    `- Registros: **${midia.length}** · confirmados: **${conta((m) => m.verificacao === 'confirmada')}** · parciais: **${conta((m) => m.verificacao === 'parcial')}** · não verificados: **${conta((m) => m.verificacao === 'nao-verificada')}**`,
    `- Publicados no site: **${conta((m) => m.exibirNoSite)}** · destaques na home/Sobre: **${conta((m) => m.exibirNoSite && m.destaque)}**`,
    ...CATEGORIAS.map((c) => `- ${c.nome}: ${conta((m) => m.categoria === c.id)}`),
    '',
    ...CATEGORIAS.flatMap((c) => {
      const itens = ordenado.filter((m) => m.categoria === c.id);
      if (!itens.length) return [`## ${c.nome}`, '', 'Nenhum registro confirmado até agora.', ''];
      return [
        `## ${c.nome}`,
        '',
        '| Data | Veículo / programa | Título | Papel | Mídia | Status | Verificação | No site |',
        '|---|---|---|---|---|---|---|---|',
        ...itens.map((m) => `| ${dataBR(m.data)} | ${m.veiculo}${m.programa ? ' — ' + m.programa : ''} | [${m.titulo.replace(/\|/g, '/')}](${m.url}) | ${PAPEIS[m.papel]} | ${m.formatos.join(', ')} | ${m.status} | ${verif[m.verificacao]} | ${m.exibirNoSite ? (m.destaque ? 'Sim (destaque)' : 'Sim') : 'Não'} |`),
        '',
      ];
    }),
    '## Fora do site (e por quê)',
    '',
    ...midia.filter((m) => !m.exibirNoSite).map((m) => `- **${m.veiculo} — ${m.titulo}**: ${m.motivoOculto}`),
    '',
    '## Pistas para a próxima varredura (ainda não atribuídas)',
    '',
    ...pistas.map((p) => `- **${p.descricao}**${p.fonte ? ` — ${p.fonte}` : ''}. ${p.situacao}`),
    '',
  ].join('\n');
  await fs.writeFile(path.join(RAIZ, 'LEVANTAMENTO-MIDIA.md'), md);
}

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };

function servir(porta = 4321) {
  http
    .createServer(async (req, res) => {
      if (req.method === 'POST' && req.url.startsWith('/api/site/contato')) {
        // Simulação local do formulário (o de verdade roda no servidor do app).
        req.resume();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end('{"ok":true}');
      }
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (p.endsWith('/')) p += 'index.html';
      const f = path.join(DIST, path.normalize(p));
      if (!f.startsWith(DIST)) return res.writeHead(403).end();
      try {
        const dados = await fs.readFile(f);
        res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' });
        res.end(dados);
      } catch {
        try {
          await fs.stat(f + '/index.html');
          res.writeHead(301, { Location: p + '/' }).end();
        } catch {
          res.writeHead(404, { 'Content-Type': TIPOS['.html'] }).end(await fs.readFile(path.join(DIST, '404.html')));
        }
      }
    })
    .listen(porta, () => console.log(`Prévia em http://localhost:${porta}`));
}

await build();
if (args.has('--servir')) servir();
