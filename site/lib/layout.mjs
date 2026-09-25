import C from '../content/config.mjs';
import { ctx, esc, u, abs, icons, btn, btnRaioX, whatsappUrl, pend, assinaturaProfissional } from './ui.mjs';

export const NAV = [
  { path: 'sobre/', nome: 'Sobre Andréa' },
  { path: 'emagrecimento-blindado/', nome: 'Emagrecimento Blindado' },
  { path: 'raio-x/', nome: 'Raio-X' },
  { path: 'conteudos/', nome: 'Conteúdos' },
  { path: 'imprensa/', nome: 'Imprensa' },
  { path: 'contato/', nome: 'Contato' },
];

export const PERSON_ID = () => abs('#andrea');
export const WEBSITE_ID = () => abs('#site');

export function schemaBase() {
  const sameAs = [C.contato.instagram, C.contato.youtube].filter(Boolean);
  const person = {
    '@type': 'Person',
    '@id': PERSON_ID(),
    name: C.pessoa.nome,
    alternateName: [C.pessoa.nomeAnterior],
    jobTitle: C.pessoa.profissao,
    url: abs(''),
    image: abs(C.imagens.sobre.src),
    description: `${C.pessoa.profissao}, criadora do método ${C.programa.nome}. Anteriormente conhecida profissionalmente como ${C.pessoa.nomeAnterior}.`,
    knowsAbout: ['Emagrecimento sustentável', 'Comportamento alimentar', 'Nutrição', 'Hábitos alimentares', 'Manutenção de peso'],
  };
  if (sameAs.length) person.sameAs = sameAs;
  return [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID(),
      url: abs(''),
      name: C.pessoa.nome,
      inLanguage: C.site.idioma,
      publisher: { '@id': PERSON_ID() },
    },
    person,
  ];
}

function head(p) {
  const t = C.tema;
  const cores = Object.entries(t.cores)
    .map(([k, v]) => `--${k}:${v}`)
    .join(';');
  const canonical = abs(p.path);
  const og = p.ogImagem || C.imagens.og;
  const schema = { '@context': 'https://schema.org', '@graph': [...schemaBase(), ...(p.schema || [])] };
  const robots = ctx.preview || p.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const analytics = C.analytics.ga4
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(C.analytics.ga4)}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(C.analytics.ga4)}');</script>`
    : '';
  return `<!doctype html>
<html lang="${C.site.idioma}">
<head>
<meta charset="utf-8">
${p.base ? `<base href="${p.base}">` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.titulo)}</title>
<meta name="description" content="${esc(p.descricao)}">
<meta name="robots" content="${robots}">
${p.noCanonical ? '' : `<link rel="canonical" href="${canonical}">`}
<meta name="author" content="${esc(C.pessoa.nome)}">
<meta name="theme-color" content="${t.cores.offwhite}">
<meta name="color-scheme" content="light">
<meta property="og:type" content="${p.ogTipo || 'website'}">
<meta property="og:locale" content="${C.site.locale}">
<meta property="og:site_name" content="${esc(C.pessoa.nome)}">
<meta property="og:title" content="${esc(p.ogTitulo || p.titulo)}">
<meta property="og:description" content="${esc(p.descricao)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(og.src)}">
<meta property="og:image:width" content="${og.largura}">
<meta property="og:image:height" content="${og.altura}">
<meta property="og:image:alt" content="${esc(og.alt)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${u('img/icon-32.png')}" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${u('img/icon-180.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${t.fontes.googleFontsUrl}">
${p.preload || ''}
<link rel="stylesheet" href="${u('css/site.css')}">
<style>:root{${cores};--fonte-titulo:'${t.fontes.titulos}',Georgia,'Times New Roman',serif;--fonte-texto:'${t.fontes.textos}',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}</style>
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
${analytics}
</head>`;
}

function header(p) {
  const links = NAV.map(
    (n) => `<li><a href="${u(n.path)}"${p.path === n.path || (n.path !== '' && p.path.startsWith(n.path)) ? ' aria-current="page"' : ''}>${esc(n.nome)}</a></li>`,
  ).join('');
  return `<a class="skip" href="#conteudo">Pular para o conteúdo</a>
${ctx.preview ? '<div class="faixa-previa" role="note">Versão de prévia — itens em amarelo estão pendentes e não aparecem na versão publicada.</div>' : ''}
<header class="topo" data-topo>
  <div class="container topo__in">
    <a class="marca" href="${u('')}" aria-label="${esc(C.pessoa.nome)} — página inicial">
      <img class="marca__mono" src="${u(C.imagens.monograma.src)}" width="72" height="37" alt="">
      <span class="marca__nome">${esc(C.pessoa.nome).replace(/ de (\S+)$/, ' de&nbsp;$1')}</span>
    </a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav__lista" id="menu-principal" data-menu>${links}
        <li class="nav__cta-mobile">${btnRaioX(C.ctas.raioX, { track: 'menu-raio-x' })}</li>
      </ul>
    </nav>
    <div class="topo__acoes">
      ${btn(C.ctas.raioXTopo, u('raio-x/'), { classe: 'btn--compacto', track: 'topo-raio-x' })}
      <button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu-principal" data-menu-botao>
        <span class="menu-botao__abrir">${icons.menu}</span><span class="menu-botao__fechar">${icons.fechar}</span>
        <span class="sr-only">Menu</span>
      </button>
    </div>
  </div>
</header>`;
}

function footer() {
  const wa = whatsappUrl();
  const redes = [
    C.contato.instagram && `<a class="rede" href="${esc(C.contato.instagram)}" target="_blank" rel="noopener" aria-label="Instagram de ${esc(C.pessoa.nome)} (abre em nova aba)">${icons.instagram}</a>`,
    C.contato.youtube && `<a class="rede" href="${esc(C.contato.youtube)}" target="_blank" rel="noopener" aria-label="YouTube de ${esc(C.pessoa.nome)} (abre em nova aba)">${icons.youtube}</a>`,
    wa && `<a class="rede" href="${esc(wa)}" target="_blank" rel="noopener" aria-label="Fale com Andréa pelo WhatsApp (abre em nova aba)" data-cta="rodape-whatsapp">${icons.whatsapp}</a>`,
    C.contato.email && `<a class="rede" href="mailto:${esc(C.contato.email)}" aria-label="Enviar e-mail para ${esc(C.contato.email)}">${icons.email}</a>`,
  ].filter(Boolean);
  if (!C.contato.instagram) pend('Link do Instagram (config.contato.instagram)');
  const legal = [
    C.legal.razaoSocial ? esc(C.legal.razaoSocial) : pend('Razão social (config.legal.razaoSocial)'),
    C.legal.cnpj ? `CNPJ ${esc(C.legal.cnpj)}` : pend('CNPJ (config.legal.cnpj)'),
  ]
    .filter(Boolean)
    .join(' · ');
  const ano = new Date().getFullYear();
  return `<footer class="rodape">
  <div class="container rodape__grade">
    <div class="rodape__marca">
      <p class="rodape__nome">${esc(C.pessoa.nome)}</p>
      <p class="rodape__prof">${assinaturaProfissional()}</p>
      <p class="rodape__texto">Criadora do método ${esc(C.programa.nome)}.</p>
      ${redes.length ? `<div class="rodape__redes">${redes.join('')}</div>` : ''}
    </div>
    <nav class="rodape__nav" aria-label="Rodapé">
      <ul>${NAV.map((n) => `<li><a href="${u(n.path)}">${esc(n.nome)}</a></li>`).join('')}</ul>
    </nav>
    <div class="rodape__cta">
      <p>Comece entendendo o seu momento.</p>
      ${btnRaioX(C.ctas.raioXCurto, { tipo: 'claro', track: 'rodape-raio-x' })}
    </div>
  </div>
  <div class="container rodape__base">
    <p class="rodape__aviso">Os conteúdos deste site têm caráter educativo e não substituem a avaliação individual de nutricionista ou médico. Resultados variam de pessoa para pessoa.</p>
    <p class="rodape__legal">© ${ano} ${esc(C.pessoa.nome)}${legal ? ' · ' + legal : ''}</p>
    <p class="rodape__links"><a href="${u('politica-de-privacidade/')}">Política de Privacidade</a><a href="${u('termos-de-uso/')}">Termos de Uso</a></p>
  </div>
</footer>`;
}

// Botão flutuante do WhatsApp: só em telas pequenas, aparece depois do
// primeiro bloco, some perto do rodapé/formulário e pode ser minimizado.
function whatsappFlutuante(p) {
  if (p.semFlutuante) return '';
  const href = whatsappUrl();
  if (!href) return '';
  return `<div class="wa-flutuante" data-wa hidden>
  <a class="wa-flutuante__link" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${esc(C.ctas.whatsapp)} (abre em nova aba)" data-cta="flutuante-whatsapp">${icons.whatsapp}<span class="wa-flutuante__texto" aria-hidden="true">${esc(C.ctas.whatsappCurto)}</span></a>
  <button class="wa-flutuante__min" type="button" aria-label="Minimizar botão do WhatsApp" aria-pressed="false" data-wa-min>${icons.fechar}</button>
</div>`;
}

export function pagina(p) {
  return `${head(p)}
<body class="${p.classe || ''}">
${header(p)}
<main id="conteudo" tabindex="-1">
${p.corpo}
</main>
${footer()}
${whatsappFlutuante(p)}
<script src="${u('js/site.js')}" defer></script>
</body>
</html>
`;
}
