// Componentes e layout compartilhados por todas as páginas.
import C from '../content/config.mjs';

export const ctx = {
  preview: false, // true na prévia: pendências aparecem destacadas
  fileMode: false, // true: links terminam em index.html (abrir direto do disco)
  pendencias: new Map(), // rótulo -> páginas onde aparece
  pagina: '',
};

export const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Registra uma pendência e, na prévia, mostra um selo amarelo no lugar.
export function pend(rotulo, { bloco = false } = {}) {
  if (!ctx.pendencias.has(rotulo)) ctx.pendencias.set(rotulo, new Set());
  ctx.pendencias.get(rotulo).add(ctx.pagina || '/');
  if (!ctx.preview) return '';
  const tag = bloco ? 'div' : 'span';
  return `<${tag} class="pend" role="note">Pendente: ${esc(rotulo)}</${tag}>`;
}

// ---------------------------------------------------------------- links
let depth = 0;
export function setPage(path) {
  ctx.pagina = '/' + path;
  depth = path.split('/').filter(Boolean).length;
}
// Links relativos: o site funciona no domínio final, numa subpasta de
// prévia ou aberto direto do disco.
export function u(path = '') {
  const base = depth ? '../'.repeat(depth) : './';
  let out = base + path;
  if (ctx.fileMode && (path === '' || path.endsWith('/'))) out += 'index.html';
  return out;
}
export const abs = (path = '') => C.site.url.replace(/\/$/, '') + '/' + path;

// ---------------------------------------------------------------- contatos
export function whatsappUrl(mensagem = C.contato.whatsappMensagem) {
  const numero = String(C.contato.whatsapp || '').replace(/\D/g, '');
  if (!numero) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

// Destino do botão "começar o Raio-X": link do questionário; se ainda não
// existir, WhatsApp; se também não existir, página de contato.
export function raioXInicio() {
  if (C.raioX.url) return { href: C.raioX.url, externo: true };
  pend('Link do Questionário Raio-X (config.raioX.url)');
  const wa = whatsappUrl('Olá, Andréa. Vim pelo site e quero fazer o Raio-X do Emagrecimento.');
  if (wa) return { href: wa, externo: true };
  return { href: u('contato/'), externo: false };
}

// ---------------------------------------------------------------- ícones
const svg = (d, extra = '') =>
  `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"${extra}>${d}</svg>`;
export const icons = {
  seta: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  check: svg('<path d="M20 6 9 17l-5-5"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  fechar: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  email: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'),
  youtube: svg('<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="m10 9 5 3-5 3z" fill="currentColor"/>'),
  play: svg('<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5 3.5-5 3.5z" fill="currentColor"/>'),
  externo: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
  // Ícone oficial do WhatsApp (Simple Icons), preenchido na cor do texto.
  whatsapp: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`,
};

// ---------------------------------------------------------------- botões
// Hierarquia: primario (Raio-X) > secundario (método/trajetória) >
// relacao (WhatsApp) > link (institucional).
export function btn(texto, href, { tipo = 'primario', externo = false, icone = null, attrs = '', track = '', classe = '' } = {}) {
  const ext = externo ? ' target="_blank" rel="noopener"' : '';
  const ic = icone ? icons[icone] : '';
  const tr = track ? ` data-cta="${esc(track)}"` : '';
  const sr = externo ? '<span class="sr-only"> (abre em nova aba)</span>' : '';
  return `<a class="btn btn--${tipo}${classe ? ' ' + classe : ''}" href="${esc(href)}"${ext}${tr}${attrs ? ' ' + attrs : ''}>${tipo === 'relacao' ? ic : ''}<span>${esc(texto)}</span>${sr}${tipo !== 'relacao' && icone ? ic : ''}</a>`;
}

export function btnRaioX(texto = C.ctas.raioX, { direto = false, tipo = 'primario', track = 'raio-x' } = {}) {
  if (!direto) return btn(texto, u('raio-x/'), { tipo, icone: 'seta', track });
  const d = raioXInicio();
  return btn(texto, d.href, { tipo, externo: d.externo, icone: 'seta', track });
}

export function btnWhatsApp(texto = C.ctas.whatsapp, { mensagem, track = 'whatsapp' } = {}) {
  const href = whatsappUrl(mensagem);
  if (!href) return pend('Número do WhatsApp (config.contato.whatsapp)');
  return btn(texto, href, { tipo: 'relacao', externo: true, icone: 'whatsapp', track });
}

// ---------------------------------------------------------------- imagens
export function foto(img, { classe = '', prioridade = false, sizes = '(min-width: 960px) 460px, 92vw' } = {}) {
  if (!img) return '';
  const load = prioridade ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
  const srcset = img.srcMobile && img.srcMobile !== img.src ? ` srcset="${u(img.srcMobile)} 480w, ${u(img.src)} 800w" sizes="${sizes}"` : '';
  return `<img class="${classe}" src="${u(img.src)}"${srcset} width="${img.largura}" height="${img.altura}" alt="${esc(img.alt)}" ${load}>`;
}

// Espaço reservado para foto ainda não fornecida (só aparece na prévia).
export function fotoPendente(rotulo, proporcao = '4 / 5') {
  const p = pend(rotulo);
  if (!ctx.preview) return '';
  return `<div class="foto-pendente" style="aspect-ratio:${proporcao}"><span>${esc(rotulo)}</span>${p}</div>`;
}

// ---------------------------------------------------------------- blocos
export const eyebrow = (t) => `<p class="eyebrow">${esc(t)}</p>`;

export function secao({ id = '', classe = '', rotulo = '', conteudo }) {
  const aria = rotulo ? ` aria-labelledby="${rotulo}"` : '';
  return `<section${id ? ` id="${id}"` : ''} class="secao ${classe}"${aria}><div class="container">${conteudo}</div></section>`;
}

export function faq(itens) {
  return `<div class="faq">${itens
    .map(
      (i) => `<details class="faq__item"><summary><span>${esc(i.p)}</span><span class="faq__mais" aria-hidden="true"></span></summary><div class="faq__resp">${i.r}</div></details>`,
    )
    .join('')}</div>`;
}

export function breadcrumbs(itens) {
  return `<nav class="breadcrumbs" aria-label="Você está em"><ol>${itens
    .map((it, i) =>
      i === itens.length - 1
        ? `<li aria-current="page">${esc(it.nome)}</li>`
        : `<li><a href="${u(it.path)}">${esc(it.nome)}</a></li>`,
    )
    .join('')}</ol></nav>`;
}

export const assinaturaProfissional = () => {
  const crn = C.pessoa.crn ? ` · ${esc(C.pessoa.crn)}` : pend('Número do CRN (config.pessoa.crn)');
  return `${esc(C.pessoa.profissao)}${crn}`;
};

export const textoPuro = (html) => String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
