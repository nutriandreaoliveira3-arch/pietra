// Todas as páginas do site. Textos editoriais ficam aqui; dados (contatos,
// pilares, imprensa, depoimentos, imagens) ficam em content/config.mjs.
import C from './content/config.mjs';
import { faqHome, faqPrograma, faqRaioX } from './content/faq.mjs';
import {
  ctx, esc, u, abs, icons, btn, btnRaioX, btnWhatsApp, whatsappUrl, raioXInicio, pend, foto, fotoPendente,
  eyebrow, secao, faq, breadcrumbs, assinaturaProfissional, textoPuro,
} from './lib/ui.mjs';
import { PERSON_ID, WEBSITE_ID } from './lib/layout.mjs';
import { midia as MIDIA, CATEGORIAS, PAPEIS } from './content/imprensa.mjs';

const N = C.pessoa.nome;
const NA = C.pessoa.nomeAnterior;
const P = C.programa.nome;

// ------------------------------------------------------------- utilidades
const faqHtml = (lista) =>
  faq(lista.map((i) => ({ p: i.p, r: i.r.replace('{{contato}}', u('contato/')).replace('{{privacidade}}', u('politica-de-privacidade/')).replace('{{atendimento}}', u('atendimento/')) })));
const faqSchema = (lista) => ({
  '@type': 'FAQPage',
  mainEntity: lista.map((i) => ({ '@type': 'Question', name: i.p, acceptedAnswer: { '@type': 'Answer', text: textoPuro(i.r) } })),
});
const crumbSchema = (itens) => ({
  '@type': 'BreadcrumbList',
  itemListElement: itens.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.nome, item: abs(it.path) })),
});
const HOME = { nome: 'Início', path: '' };

function cabecalhoInterno({ crumbs, eyebrowTxt, h1, lead, extra = '' }) {
  return `<header class="cab-interno"><div class="container"><div class="cab-interno__in">
${breadcrumbs(crumbs)}
${eyebrowTxt ? eyebrow(eyebrowTxt) : ''}
<h1>${h1}</h1>
${lead ? `<p class="lead">${lead}</p>` : ''}
${extra}
</div></div></header>`;
}

// ------------------------------------------------------------- blocos reutilizáveis
const sinais = [
  'Você começa bem — e, em algumas semanas, a constância se perde.',
  'Você sabe o que deveria fazer, mas não consegue sustentar na rotina.',
  'Você emagrece e, algum tempo depois, o peso volta.',
  'Você alterna fases de muito controle com fases de exagero.',
  'Cada nova tentativa parece exigir começar do zero.',
];

function blocoIdentificacao() {
  return secao({
    id: 'identificacao',
    classe: 'secao--areia',
    rotulo: 'titulo-identificacao',
    conteudo: `<div class="dupla dupla--texto">
  <div>
    ${eyebrow('Talvez você se reconheça')}
    <h2 id="titulo-identificacao">Você não está começando do zero. <em>O que cansa é recomeçar.</em></h2>
    <p class="lead">Você já tentou, já aprendeu, já viu funcionar por um tempo. Se algumas destas situações são familiares, você não está sozinha.</p>
  </div>
  <ul class="sinais">${sinais.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
</div>
<p class="fecho">Isso raramente é só uma questão de força de vontade. Costuma ser um sinal de que o processo precisa de outra estrutura.</p>`,
  });
}

function blocoPerspectiva() {
  const antes = ['Regras rígidas e iguais para todo mundo', 'Motivação como único combustível', 'Tudo ou nada: um deslize encerra a tentativa', 'O plano acaba quando a meta chega'];
  const depois = ['Estratégia pensada para o seu momento', 'Hábitos que se sustentam na rotina', 'Ajustes sem culpa ao longo do caminho', 'Manutenção planejada desde o início'];
  return secao({
    id: 'perspectiva',
    rotulo: 'titulo-perspectiva',
    conteudo: `<div class="container--estreito centro">
  ${eyebrow('Uma outra forma de olhar')}
  <h2 id="titulo-perspectiva">Talvez não esteja faltando informação.</h2>
  <p class="lead">Pode estar faltando uma estratégia que funcione na sua vida real. Saber o que comer é uma parte. Emagrecer de forma sustentável depende de vários fatores trabalhando juntos: o que você come, como a rotina se organiza, como você lida com fome, cansaço e emoções — e o que acontece depois que o resultado chega.</p>
</div>
<div class="comparativo" role="group" aria-label="Comparação entre o ciclo do recomeço e um processo estruturado">
  <div class="comparativo__col comparativo__col--antes">
    <h3>O ciclo do recomeço</h3>
    <ul>${antes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  </div>
  <div class="comparativo__col comparativo__col--depois">
    <h3>Um processo estruturado</h3>
    <ul>${depois.map((t) => `<li>${icons.check}<span>${esc(t)}</span></li>`).join('')}</ul>
  </div>
</div>`,
  });
}

// Os pilares são editáveis (quantidade livre). A última célula da grade vira
// um convite para o próximo passo, ocupando o espaço que sobrar em cada
// largura de tela — assim a grade nunca fica com "buraco".
function listaPilares({ detalhado = false, cta = null } = {}) {
  const n = C.programa.pilares.length;
  const sobra = (cols) => (cols - (n % cols)) % cols || cols;
  const celulaCta = cta
    ? `<li class="pilar pilar--cta" style="--s2:${sobra(2)};--s3:${sobra(3)};--s4:${sobra(4)}">${cta}</li>`
    : '';
  return `<ol class="pilares${detalhado ? ' pilares--detalhado' : ''}">${C.programa.pilares
    .map(
      (p, i) => `<li class="pilar"><span class="pilar__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${esc(p.titulo)}</h3><p>${esc(detalhado ? p.texto : p.resumo)}</p></li>`,
    )
    .join('')}${celulaCta}</ol>`;
}

function blocoMetodo() {
  return secao({
    id: 'metodo',
    rotulo: 'titulo-metodo',
    conteudo: `<div class="cab-secao">
  ${eyebrow('A metodologia')}
  <h2 id="titulo-metodo">${esc(P)}</h2>
  <p class="lead">O método criado por ${esc(N)} para organizar o emagrecimento em pilares que se sustentam juntos — e deixar o processo menos vulnerável aos recomeços.</p>
</div>
${listaPilares({ cta: `<p>Cada pilar, em detalhe.</p>${btn(C.ctas.metodo, u('emagrecimento-blindado/'), { tipo: 'secundario', icone: 'seta', track: 'home-metodo' })}` })}`,
  });
}

function areasRaioX() {
  if (!C.raioX.areasConfirmadas) pend('Nomes oficiais das 7 áreas do Raio-X (config.raioX.areas)');
  return `<ol class="areas">${C.raioX.areas.map((a, i) => `<li><span aria-hidden="true">${i + 1}</span>${esc(a)}</li>`).join('')}</ol>`;
}

function blocoRaioX({ direto = true, titulo = 'h2' } = {}) {
  return secao({
    id: 'raio-x',
    classe: 'secao--noite',
    rotulo: 'titulo-raio-x',
    conteudo: `<div class="dupla">
  <div>
    ${eyebrow(C.raioX.nome)}
    <${titulo} id="titulo-raio-x">Antes de tentar mais uma estratégia, descubra onde o seu processo está mais vulnerável.</${titulo}>
    <p class="lead">O Raio-X passa por ${C.raioX.areas.length} áreas e oferece uma visão ampla do seu momento atual. É o ponto de partida para decisões mais precisas.</p>
    <div class="acoes">${btnRaioX(C.ctas.raioXAlternativo, { direto, tipo: 'claro', track: 'secao-raio-x' })}</div>
    <p class="aviso-claro">O Raio-X é uma ferramenta de percepção e orientação inicial. Não é diagnóstico e não substitui avaliação individual.</p>
  </div>
  <div class="raio-x__areas">
    <p class="raio-x__rotulo">As ${C.raioX.areas.length} áreas avaliadas</p>
    ${areasRaioX()}
  </div>
</div>`,
  });
}

function blocoSobre() {
  const anos = C.pessoa.anosDeExperiencia
    ? `<p class="destaque-num"><strong>${esc(C.pessoa.anosDeExperiencia)}+</strong> anos de trajetória profissional</p>`
    : pend('Anos de experiência (config.pessoa.anosDeExperiencia)', { bloco: true });
  return secao({
    id: 'sobre',
    rotulo: 'titulo-sobre',
    conteudo: `<div class="dupla dupla--foto">
  <figure class="retrato">${foto(C.imagens.sobre)}</figure>
  <div>
    ${eyebrow('Quem conduz o processo')}
    <h2 id="titulo-sobre">${esc(N)}</h2>
    <p class="nome-anterior">Anteriormente conhecida profissionalmente como ${esc(NA)}.</p>
    <p>${esc(C.pessoa.profissao)}, com uma trajetória construída no atendimento clínico e na comunicação em saúde, incluindo participações em televisão, rádio e jornais.</p>
    <p>Agora, inicia uma nova fase profissional com o seu nome atual e uma proposta clara: ajudar mulheres a emagrecer com estratégia, construir hábitos sustentáveis e parar de viver recomeçando.</p>
    ${anos}
    <div class="acoes">${btn(C.ctas.trajetoria, u('sobre/'), { tipo: 'secundario', icone: 'seta', track: 'home-sobre' })}</div>
  </div>
</div>`,
  });
}

// ------------------------------------------------------------- Na mídia
const midiaPublica = MIDIA.filter((m) => m.exibirNoSite);
const destaquesMidia = midiaPublica.filter((m) => m.destaque);
const nomeCategoria = (id) => CATEGORIAS.find((c) => c.id === id)?.nome || id;
const anoDe = (d) => (d ? String(d).slice(0, 4) : null);
const veiculosUnicos = () => [...new Set(midiaPublica.filter((m) => !/^Vídeo no /.test(m.veiculo)).map((m) => m.veiculo.replace(/ \(.*\)$/, '')))];

function cardImprensa(m, { comCategoria = true } = {}) {
  const ano = anoDe(m.data);
  const ehVideo = m.formatos.includes('vídeo');
  const papel = PAPEIS[m.papel] || m.papel;
  const rotuloLink = ehVideo ? 'Assistir' : m.formatos.includes('PDF') ? 'Ver PDF' : 'Ler matéria';
  return `<li><article class="midia">
  <p class="midia__tipo">${comCategoria ? `${esc(nomeCategoria(m.categoria))}${ano ? ' · ' : ''}` : ''}${ano ? `<time datetime="${esc(m.data)}">${esc(ano)}</time>` : ''}</p>
  <p class="midia__veiculo">${esc(m.veiculo)}${m.programa ? `<span class="midia__programa"> · ${esc(m.programa)}</span>` : ''}</p>
  <h3 class="midia__titulo">${esc(m.titulo)}</h3>
  <p class="midia__papel">${esc(papel)} <span class="midia__nome">como ${esc(NA)}</span></p>
  <a class="midia__link" href="${esc(m.url)}" target="_blank" rel="noopener" data-cta="midia-${esc(m.id)}">${ehVideo ? icons.play : icons.externo}<span>${rotuloLink}</span><span class="sr-only">: ${esc(m.titulo)}, ${esc(m.veiculo)} (abre em nova aba)</span></a>
</article></li>`;
}

function gradeImprensa(lista) {
  if (lista.length) return `<ul class="midias">${lista.map((m) => cardImprensa(m)).join('')}</ul>`;
  pend('Participações na mídia (content/imprensa.mjs)');
  return '';
}

// Faixa tipográfica com os veículos (sem logos de terceiros).
const faixaVeiculos = () =>
  `<ul class="veiculos" aria-label="Veículos em que Andréa já participou">${veiculosUnicos().map((v) => `<li>${esc(v)}</li>`).join('')}</ul>`;

function blocoMidia() {
  return secao({
    id: 'na-midia',
    classe: 'secao--linha',
    rotulo: 'titulo-midia',
    conteudo: `<div class="cab-secao">
  ${eyebrow('Na mídia')}
  <h2 id="titulo-midia">Uma trajetória acompanhada pelo público</h2>
  <p class="lead">Participações em programas de TV, revistas, jornais e grandes portais — boa parte delas com o nome profissional ${esc(NA)}, usado por muitos anos.</p>
</div>
${faixaVeiculos()}
${gradeImprensa(destaquesMidia.slice(0, 6))}
<div class="acoes acoes--centro">${btn('Ver todas as participações', u('imprensa/'), { tipo: 'secundario', icone: 'seta', track: 'home-imprensa' })}</div>`,
  });
}

const paraQuem = [
  'Já tentou emagrecer outras vezes e quer parar de recomeçar.',
  'Sabe bastante sobre alimentação, mas quer transformar conhecimento em constância.',
  'Deseja emagrecer sem viver em restrição permanente.',
  'Valoriza um processo estruturado, com orientação e clareza.',
  'Pensa na manutenção tanto quanto no resultado.',
];

function blocoParaQuem() {
  return secao({
    id: 'para-quem',
    classe: 'secao--areia',
    rotulo: 'titulo-para-quem',
    conteudo: `<div class="dupla dupla--texto">
  <div>
    ${eyebrow('Para quem é')}
    <h2 id="titulo-para-quem">Para quem este processo pode fazer sentido</h2>
    <p class="lead">Para mulheres adultas que querem um caminho mais claro — e sustentável — para emagrecer.</p>
  </div>
  <ul class="checks">${paraQuem.map((t) => `<li>${icons.check}<span>${esc(t)}</span></li>`).join('')}</ul>
</div>
<p class="fecho fecho--suave">Se você faz algum tratamento de saúde, tem uma condição clínica ou usa medicamentos, a avaliação individual é ainda mais importante — e o processo deve respeitar as orientações da sua equipe de saúde.</p>`,
  });
}

const etapas = [
  { t: 'Faça seu Raio-X', d: `Responda ao questionário e mapeie as ${C.raioX.areas.length} áreas do seu processo.` },
  { t: 'Entenda seu momento atual', d: 'Veja em quais pontos o seu emagrecimento está mais vulnerável hoje.' },
  { t: 'Conheça a estratégia indicada', d: 'Descubra qual caminho faz mais sentido para a sua fase.' },
  { t: 'Comece o seu processo', d: 'Com clareza sobre o próximo passo, e não com mais um recomeço.' },
];

function blocoComoFunciona({ cta = true } = {}) {
  return secao({
    id: 'como-funciona',
    rotulo: 'titulo-como-funciona',
    conteudo: `<div class="cab-secao">
  ${eyebrow('Como funciona')}
  <h2 id="titulo-como-funciona">Quatro passos, começando pelo entendimento</h2>
</div>
<ol class="etapas">${etapas.map((e, i) => `<li class="etapa"><span class="etapa__num" aria-hidden="true">${i + 1}</span><h3>${esc(e.t)}</h3><p>${esc(e.d)}</p></li>`).join('')}</ol>
${cta ? `<div class="acoes acoes--centro">${btnRaioX(C.ctas.raioX, { track: 'como-funciona-raio-x' })}</div>` : ''}`,
  });
}

function blocoDepoimentos() {
  const lista = C.depoimentos.filter((d) => d.autorizado);
  if (!lista.length) {
    pend('Depoimentos reais e autorizados (config.depoimentos)');
    if (!ctx.preview) return '';
  }
  const itens = lista.length
    ? lista.map((d) => `<li><figure class="depo"><blockquote><p>${esc(d.texto)}</p></blockquote><figcaption><strong>${esc(d.nome)}</strong>${d.detalhe ? ` · ${esc(d.detalhe)}` : ''}</figcaption></figure></li>`).join('')
    : [1, 2, 3].map((n) => `<li><figure class="depo depo--vazio"><blockquote><p>Espaço reservado para depoimento real ${n}, com autorização por escrito.</p></blockquote><figcaption><strong>Nome ou iniciais autorizadas</strong> · contexto e período</figcaption><span class="pend">Pendente — não inventar</span></figure></li>`).join('');
  return secao({
    id: 'depoimentos',
    classe: 'secao--areia',
    rotulo: 'titulo-depoimentos',
    conteudo: `<div class="cab-secao">${eyebrow('Depoimentos')}<h2 id="titulo-depoimentos">Quem já passou pelo processo</h2></div>
<ul class="depos">${itens}</ul>
<p class="nota centro">Depoimentos compartilhados com autorização. Experiências individuais; resultados variam de pessoa para pessoa.</p>`,
  });
}

function blocoFaq(lista, titulo = 'Perguntas frequentes') {
  return secao({
    id: 'perguntas',
    rotulo: 'titulo-faq',
    conteudo: `<div class="container--estreito"><div class="cab-secao">${eyebrow('Dúvidas')}<h2 id="titulo-faq">${esc(titulo)}</h2></div>${faqHtml(lista)}</div>`,
  });
}

function blocoCtaFinal({ titulo = 'Você não precisa de mais um recomeço. Precisa de clareza sobre o próximo passo.', texto = 'Comece entendendo o seu momento. O Raio-X mostra onde o seu processo está mais vulnerável — e o que faz sentido fazer a seguir.' } = {}) {
  return secao({
    id: 'comece',
    classe: 'secao--cta',
    rotulo: 'titulo-cta-final',
    conteudo: `<div class="container--estreito centro" data-sem-flutuante>
  <h2 id="titulo-cta-final">${esc(titulo)}</h2>
  <p class="lead">${esc(texto)}</p>
  <div class="acoes acoes--centro">${btnRaioX(C.ctas.raioX, { direto: true, track: 'cta-final-raio-x' })}${btnWhatsApp(C.ctas.whatsapp, { track: 'cta-final-whatsapp' })}</div>
</div>`,
  });
}

// ------------------------------------------------------------- páginas
function home() {
  const img = C.imagens.hero;
  const corpo = `<section class="hero" aria-labelledby="titulo-hero">
  <div class="container hero__grade">
    <div class="hero__texto">
      <p class="eyebrow">${esc(N)} · ${esc(C.pessoa.profissao)}</p>
      <h1 id="titulo-hero">Emagrecer não deveria significar viver <em>recomeçando</em>.</h1>
      <p class="lead">Um processo estruturado para entender o que trava o seu emagrecimento, construir hábitos que cabem na vida real e manter o que você conquistou.</p>
      <div class="acoes" data-hero-cta>
        ${btnRaioX(C.ctas.raioX, { track: 'hero-raio-x' })}
        ${btn(C.ctas.trajetoria, u('sobre/'), { tipo: 'secundario', track: 'hero-sobre' })}
      </div>
      <p class="hero__nota">Raio-X em ${C.raioX.areas.length} áreas · uma leitura do seu momento atual</p>
    </div>
    <figure class="hero__foto">${foto(img, { prioridade: true, sizes: '(min-width: 960px) 440px, 88vw' })}</figure>
  </div>
</section>
${blocoIdentificacao()}
${blocoPerspectiva()}
${blocoMetodo()}
${blocoRaioX()}
${blocoSobre()}
${blocoMidia()}
${blocoParaQuem()}
${blocoComoFunciona()}
${blocoDepoimentos()}
${blocoFaq(faqHome)}
${blocoCtaFinal()}`;
  return {
    path: '',
    titulo: C.seo.home.titulo,
    descricao: C.seo.home.descricao,
    classe: 'pg-home',
    preload: `<link rel="preload" as="image" href="${u(img.src)}" imagesrcset="${u(img.srcMobile)} 480w, ${u(img.src)} 800w" imagesizes="(min-width: 960px) 440px, 88vw" fetchpriority="high">`,
    schema: [{ '@type': 'WebPage', '@id': abs('#pagina'), url: abs(''), name: C.seo.home.titulo, isPartOf: { '@id': WEBSITE_ID() }, about: { '@id': PERSON_ID() }, inLanguage: C.site.idioma }, faqSchema(faqHome)],
    corpo,
  };
}

function projetoAnterior() {
  const pa = C.pessoa.projetoAnterior;
  if (!pa) return '';
  const links = [
    pa.youtube && `<a href="${esc(pa.youtube)}" target="_blank" rel="noopener">YouTube<span class="sr-only"> (abre em nova aba)</span></a>`,
    pa.instagram && `<a href="${esc(pa.instagram)}" target="_blank" rel="noopener">Instagram<span class="sr-only"> (abre em nova aba)</span></a>`,
  ].filter(Boolean);
  return `<p>Em ${esc(pa.desde)}, ainda como ${esc(NA)}, criou o projeto <strong>${esc(pa.nome)}</strong>, com conteúdos de nutrição no ${links.join(' e no ')}. Esse material continua no ar como registro da trajetória.</p>`;
}

function sobre() {
  const crumbs = [HOME, { nome: 'Sobre Andréa', path: 'sobre/' }];
  const P_ = C.pessoa;
  const trajetoria = P_.trajetoria.length
    ? `<ol class="linha-tempo">${P_.trajetoria.map((t) => `<li><span class="linha-tempo__periodo">${esc(t.periodo)}</span><h3>${esc(t.titulo)}</h3><p>${esc(t.texto)}</p></li>`).join('')}</ol>`
    : pend('Marcos da trajetória profissional: períodos, cargos, atendimentos (config.pessoa.trajetoria)', { bloco: true });
  const listaForm = (arr, rotulo) =>
    arr.length
      ? `<ul class="formacoes">${arr.map((f) => `<li><strong>${esc(f.titulo)}</strong>${f.instituicao ? ` — ${esc(f.instituicao)}` : ''}${f.ano ? ` <span>(${esc(f.ano)})</span>` : ''}</li>`).join('')}</ul>`
      : pend(rotulo, { bloco: true });
  const formacaoConteudo = listaForm(P_.formacoes, 'Formação acadêmica (config.pessoa.formacoes)') + listaForm(P_.especializacoes, 'Especializações e cursos (config.pessoa.especializacoes)');
  const temFormacao = P_.formacoes.length || P_.especializacoes.length || ctx.preview;
  const acervo = C.acervo.length
    ? `<ul class="acervo">${C.acervo.map((a) => `<li><figure><img src="${u(a.src)}" alt="${esc(a.alt)}" loading="lazy" decoding="async"><figcaption><strong>${esc(a.legenda)}</strong><span>${esc(a.veiculo)}${a.ano ? ` · ${esc(a.ano)}` : ''} · como ${esc(NA)}</span>${a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">Ver original<span class="sr-only"> (abre em nova aba)</span></a>` : ''}</figcaption></figure></li>`).join('')}</ul>`
    : ctx.preview ? `<div class="acervo acervo--vazio">${fotoPendente('Fotos antigas da trajetória como Andréa Marim, com legenda, veículo e ano (config.acervo)', '16 / 9')}</div>` : (pend('Fotos antigas da trajetória (config.acervo)'), '');
  const principios = [
    ['Estratégia antes de regra', 'Cada decisão parte do momento da pessoa, não de um modelo pronto.'],
    ['Sem terrorismo alimentar', 'Nenhum alimento é vilão isolado. O que importa é o conjunto e a constância.'],
    ['Sem culpa', 'Deslizes fazem parte do processo e são tratados como informação, não como fracasso.'],
    ['Ciência em linguagem simples', 'Informação de qualidade, explicada com clareza e sem sensacionalismo.'],
    ['Manutenção desde o início', 'O resultado só faz sentido se puder ser mantido.'],
  ];
  const corpo = `${cabecalhoInterno({ crumbs, eyebrowTxt: 'Sobre', h1: esc(N), lead: `${assinaturaProfissional()}. Anteriormente conhecida profissionalmente como ${esc(NA)}.` })}
${secao({
  rotulo: 'titulo-historia',
  conteudo: `<div class="dupla dupla--foto">
  <figure class="retrato">${foto(C.imagens.sobre, { prioridade: true })}</figure>
  <div class="prosa">
    <h2 id="titulo-historia">Uma trajetória que continua</h2>
    <p>Durante muitos anos, ${esc(C.pessoa.nomeCurto)} atuou e ficou conhecida pelo público como ${esc(NA)}. Com esse nome, construiu uma trajetória de atendimento clínico e de comunicação em saúde, com participações em televisão, rádio, jornais e outros veículos.</p>
    ${projetoAnterior()}
    <p>${esc(NA)}, Andréa Oliveira e ${esc(N)} são a mesma profissional${C.pessoa.crn ? `, com o mesmo registro: ${esc(C.pessoa.crn)}` : ''}.</p>
    <p>Depois de um período afastada da atividade profissional, ela retoma o trabalho com o seu nome atual, ${esc(N)} — com a mesma essência e uma proposta amadurecida pela experiência.</p>
    <p>Nessa nova fase, criou o <a href="${u('emagrecimento-blindado/')}">${esc(P)}</a>, uma metodologia para ajudar mulheres a emagrecer com estratégia, construir hábitos sustentáveis e parar de viver recomeçando.</p>
    ${C.pessoa.anosDeExperiencia ? `<p class="destaque-num"><strong>${esc(C.pessoa.anosDeExperiencia)}+</strong> anos de trajetória profissional</p>` : pend('Anos de experiência (config.pessoa.anosDeExperiencia)', { bloco: true })}
  </div>
</div>`,
})}
${secao({
  classe: 'secao--areia',
  rotulo: 'titulo-principios',
  conteudo: `<div class="cab-secao">${eyebrow('Como ela trabalha')}<h2 id="titulo-principios">Princípios do trabalho</h2></div>
<ul class="principios">${principios.map(([t, d]) => `<li><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ul>`,
})}
${secao({
  rotulo: 'titulo-trajetoria',
  conteudo: `<div class="container--estreito"><div class="cab-secao cab-secao--esq">${eyebrow('Trajetória')}<h2 id="titulo-trajetoria">Marcos profissionais</h2></div>${trajetoria}</div>`,
})}
${temFormacao ? secao({
  classe: 'secao--linha',
  rotulo: 'titulo-formacao',
  conteudo: `<div class="container--estreito"><div class="cab-secao cab-secao--esq">${eyebrow('Formação')}<h2 id="titulo-formacao">Formação e especializações</h2></div>${formacaoConteudo}</div>`,
}) : (listaForm(P_.formacoes, 'Formação acadêmica (config.pessoa.formacoes)'), listaForm(P_.especializacoes, 'Especializações e cursos (config.pessoa.especializacoes)'), '')}
${secao({
  rotulo: 'titulo-acervo',
  conteudo: `<div class="cab-secao">${eyebrow('Acervo')}<h2 id="titulo-acervo">Na mídia, como ${esc(NA)}</h2><p class="lead">Participações em TV, revistas, jornais e portais feitas com o nome profissional anterior — parte da mesma trajetória.</p></div>
${acervo}${gradeImprensa(destaquesMidia.slice(0, 3))}
<div class="acoes acoes--centro">${btn('Ver todas as participações', u('imprensa/'), { tipo: 'secundario', icone: 'seta', track: 'sobre-imprensa' })}</div>`,
})}
${blocoCtaFinal({ titulo: 'Quer entender por onde começar?', texto: 'O Raio-X do Emagrecimento é o primeiro passo para conhecer o seu momento — e a estratégia que faz sentido para ele.' })}`;
  return {
    path: 'sobre/',
    titulo: C.seo.sobre.titulo,
    descricao: C.seo.sobre.descricao,
    ogTipo: 'profile',
    schema: [
      { '@type': 'ProfilePage', '@id': abs('sobre/#pagina'), url: abs('sobre/'), name: C.seo.sobre.titulo, mainEntity: { '@id': PERSON_ID() }, isPartOf: { '@id': WEBSITE_ID() }, inLanguage: C.site.idioma },
      crumbSchema(crumbs),
    ],
    corpo,
  };
}

function programa() {
  const crumbs = [HOME, { nome: P, path: 'emagrecimento-blindado/' }];
  const naoE = [
    'Não é dieta da moda nem cardápio pronto igual para todas.',
    'Não é restrição permanente.',
    'Não é promessa de prazo ou de quilos.',
    'Não substitui acompanhamento médico quando ele é necessário.',
  ];
  const corpo = `${cabecalhoInterno({
    crumbs,
    eyebrowTxt: `Uma metodologia de ${N}`,
    h1: esc(P),
    lead: 'Para emagrecer com estratégia, construir hábitos sustentáveis — e parar de viver recomeçando.',
    extra: `<div class="acoes">${btnRaioX(C.ctas.raioX, { track: 'programa-topo-raio-x' })}${btn('Formatos de atendimento', u('atendimento/'), { tipo: 'secundario', track: 'programa-topo-atendimento' })}</div>`,
  })}
${secao({
  rotulo: 'titulo-blindar',
  conteudo: `<div class="dupla dupla--foto dupla--inverso">
  <div class="prosa">
    ${eyebrow('Por que “blindado”')}
    <h2 id="titulo-blindar">Um processo menos vulnerável ao que costuma derrubar uma tentativa</h2>
    <p>Semanas difíceis, rotina apertada, eventos, cansaço, ansiedade. É nesses momentos que a maioria das tentativas se perde — não por falta de conhecimento, mas porque o processo não foi construído para eles.</p>
    <p>Blindar o emagrecimento é organizar o processo em pilares que se apoiam: quando um deles oscila, os outros sustentam o caminho.</p>
  </div>
  <figure class="retrato">${foto(C.imagens.metodo)}</figure>
</div>`,
})}
${secao({
  classe: 'secao--areia',
  rotulo: 'titulo-pilares',
  conteudo: `<div class="cab-secao">${eyebrow('Os pilares')}<h2 id="titulo-pilares">O que o método trabalha</h2></div>${listaPilares({ detalhado: true, cta: `<p>Quer saber em quais pilares o seu processo precisa de mais atenção?</p>${btnRaioX(C.ctas.raioXCurto, { track: 'programa-pilares-raio-x' })}` })}`,
})}
${secao({
  rotulo: 'titulo-nao-e',
  conteudo: `<div class="container--estreito"><div class="cab-secao cab-secao--esq">${eyebrow('Com clareza')}<h2 id="titulo-nao-e">O que o ${esc(P)} não é</h2></div>
<ul class="nao-e">${naoE.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>`,
})}
${blocoComoFunciona()}
${fotoPendente('Imagem institucional do método (horizontal, ambiente de atendimento) — config.imagens.atendimento', '16 / 7') ? `<div class="container">${fotoPendente('Imagem institucional do método (horizontal, ambiente de atendimento) — config.imagens.atendimento', '16 / 7')}</div>` : ''}
${blocoFaq(faqPrograma, `Dúvidas sobre o ${P}`)}
${blocoCtaFinal()}`;
  return {
    path: 'emagrecimento-blindado/',
    titulo: C.seo.programa.titulo,
    descricao: C.seo.programa.descricao,
    ogImagem: C.imagens.og,
    schema: [
      { '@type': 'Service', '@id': abs('emagrecimento-blindado/#servico'), name: P, description: C.seo.programa.descricao, provider: { '@id': PERSON_ID() }, serviceType: 'Acompanhamento nutricional para emagrecimento', url: abs('emagrecimento-blindado/'), areaServed: 'BR' },
      faqSchema(faqPrograma),
      crumbSchema(crumbs),
    ],
    corpo,
  };
}

// ------------------------------------------------------------- atendimento
const A = C.atendimento;
const reais = (v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
const lista = (itens) => `<ul class="checks checks--compacta">${itens.map((t) => `<li>${icons.check}<span>${esc(t)}</span></li>`).join('')}</ul>`;
const btnAgendar = (texto, mensagem, track) => btnWhatsApp(texto, { mensagem, track });

function cardPlano(pl) {
  const valor = A.exibirValores
    ? `<p class="plano__valor"><span class="sr-only">Investimento: </span>${reais(pl.valor)}</p>`
    : '<p class="plano__valor plano__valor--sob">Investimento informado no agendamento</p>';
  return `<article class="plano${pl.destaque ? ' plano--destaque' : ''}" aria-labelledby="plano-${pl.id}">
  ${pl.destaque ? '<p class="plano__selo">Acompanhamento completo</p>' : ''}
  <h3 id="plano-${pl.id}" class="plano__nome">${esc(pl.nome)}</h3>
  ${valor}
  ${pl.detalhe ? `<p class="plano__detalhe">${esc(pl.detalhe)}</p>` : ''}
  <p>${esc(pl.indicacao)}</p>
  <p class="plano__sub">${esc(pl.avaliaTitulo)}:</p>
  ${lista(pl.avalia)}
  <p>${esc(pl.recebe)}</p>
  ${pl.naoInclui ? `<p class="nota">${esc(pl.naoInclui)}</p>` : ''}
  <div class="plano__acao">${btnAgendar(pl.destaque ? 'Quero o acompanhamento' : 'Quero agendar a consulta', pl.mensagem, `atendimento-${pl.id}`)}</div>
</article>`;
}

function atendimento() {
  const crumbs = [HOME, { nome: 'Atendimento', path: 'atendimento/' }];
  const avulsa = A.planos.find((p) => p.id === 'avulsa');
  const tri = A.planos.find((p) => p.id === 'trimestral');
  const inclui = [
    {
      t: 'Plano alimentar individualizado',
      d: 'Elaborado considerando:',
      itens: ['seus horários', 'sua rotina profissional', 'preferências alimentares', 'refeições fora de casa', 'finais de semana', 'dificuldades', 'necessidades nutricionais', 'objetivos'],
      fim: 'A proposta é construir uma alimentação que seja possível de aplicar na vida real.',
    },
    {
      t: 'Suplementação',
      d: 'Quando houver necessidade, é feita uma avaliação individualizada. Podem ser avaliados, conforme cada caso:',
      itens: ['proteínas', 'creatina', 'vitaminas', 'minerais', 'fibras', 'ômega-3', 'probióticos', 'outros suplementos pertinentes à estratégia nutricional'],
      fim: 'Não existe suplementação padrão para todos. Cada recomendação é feita de acordo com a necessidade individual.',
    },
    {
      t: 'Manipulados',
      d: 'Quando houver indicação, podem ser avaliadas formulações manipuladas individualizadas, sempre de acordo com os objetivos e as necessidades identificados durante o acompanhamento.',
      fim: 'A utilização de manipulados não é obrigatória e só é considerada quando fizer sentido dentro da estratégia nutricional.',
    },
    {
      t: 'Avaliação e acompanhamento de medidas',
      d: 'Mesmo no atendimento online, é possível acompanhar medidas corporais. Durante a consulta, eu ensino como fazer corretamente cada medida: os pontos de referência, a posição da fita métrica e a forma correta de registrar os resultados.',
      fim: 'Assim, estabelecemos uma referência inicial. No acompanhamento trimestral, as medidas podem ser monitoradas periodicamente, com registros padronizados ao longo das semanas.',
    },
    {
      t: 'Receitas e estratégias práticas',
      d: 'Sugestões de receitas, substituições e opções práticas para facilitar a alimentação no dia a dia.',
      fim: 'A ideia é aumentar suas possibilidades, facilitar sua rotina e evitar que o planejamento se torne repetitivo ou difícil de manter.',
    },
    {
      t: 'Acesso ao BLIM',
      selo: 'No acompanhamento trimestral',
      d: 'O BLIM é o meu assistente de apoio nutricional, um suporte complementar entre uma consulta e outra para ajudar em situações como:',
      itens: ['substituições de alimentos', 'alternativas para refeições', 'organização alimentar', 'dúvidas sobre escolhas', 'sugestões práticas', 'adaptação da alimentação à rotina'],
      fim: 'Ele ajuda você a aplicar melhor as estratégias definidas no acompanhamento. É uma ferramenta educativa e não substitui as consultas.',
    },
  ];
  const ajustes = [
    'Se algo não estiver funcionando bem, avaliamos o motivo.',
    'Se sua rotina mudar, adaptamos.',
    'Se sua evolução indicar necessidade de uma nova estratégia, fazemos a mudança.',
  ];
  const corpo = `${cabecalhoInterno({
    crumbs,
    eyebrowTxt: C.pessoa.atendimento,
    h1: 'Atendimento nutricional online',
    lead: 'Um acompanhamento pensado para quem não quer apenas receber uma dieta, mas entender o próprio processo, ajustar estratégias ao longo do caminho e ter uma condução nutricional realmente individualizada.',
    extra: `<div class="acoes">${btnAgendar('Quero agendar meu atendimento', A.agendarMensagem, 'atendimento-topo')}${btn(A.exibirValores ? 'Ver formatos e valores' : 'Ver formatos', '#formatos', { tipo: 'secundario' })}</div>`,
  })}
${secao({
  rotulo: 'titulo-online',
  conteudo: `<div class="container--estreito prosa">
    ${eyebrow('Como é o atendimento')}
    <h2 id="titulo-online">De onde você estiver, com estratégia construída para a sua rotina</h2>
    <p>O atendimento é 100% online, com hora marcada, permitindo que você seja acompanhada de onde estiver, com orientação personalizada e estratégias construídas de acordo com a sua rotina, necessidades e objetivos.</p>
  </div>`,
})}
${secao({
  id: 'formatos',
  classe: 'secao--areia',
  rotulo: 'titulo-formatos',
  conteudo: `<div class="cab-secao">${eyebrow('Formatos')}<h2 id="titulo-formatos">Escolha como quer ser acompanhada</h2></div>
<div class="planos">${[avulsa, tri].map(cardPlano).join('')}</div>`,
})}
${secao({
  rotulo: 'titulo-ajustes',
  conteudo: `<div class="dupla dupla--texto">
  <div>
    ${eyebrow('A grande diferença')}
    <h2 id="titulo-ajustes">Você não recebe um plano e fica meses tentando seguir sozinha</h2>
    <p class="lead">No acompanhamento trimestral, a estratégia pode ser ajustada durante todo o processo. Ele é construído de forma dinâmica, individualizada e próxima.</p>
  </div>
  <ul class="nao-e nao-e--salvia">${ajustes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
</div>`,
})}
${secao({
  classe: 'secao--areia',
  rotulo: 'titulo-inclui',
  conteudo: `<div class="cab-secao">${eyebrow('O que faz parte')}<h2 id="titulo-inclui">Cada parte do atendimento, com clareza</h2></div>
<ul class="principios principios--atendimento">${inclui.map((i) => `<li>
  ${i.selo ? `<p class="plano__selo plano__selo--claro">${esc(i.selo)}</p>` : ''}
  <h3>${esc(i.t)}</h3>
  <p>${esc(i.d)}</p>
  ${i.itens ? lista(i.itens) : ''}
  <p>${esc(i.fim)}</p>
</li>`).join('')}</ul>`,
})}
${secao({
  classe: 'secao--noite',
  rotulo: 'titulo-semanal',
  conteudo: `<div class="container--estreito prosa">
    ${eyebrow('Por que semanal')}
    <h2 id="titulo-semanal">Por que o acompanhamento semanal faz diferença?</h2>
    <p>Porque o processo nutricional não acontece apenas no dia da consulta. Ele acontece na semana corrida, no restaurante, na viagem, no final de semana, nos imprevistos e nos momentos em que a estratégia precisa ser adaptada.</p>
    <p>Por isso, durante os três meses, você não precisa esperar semanas para descobrir se algo precisa mudar. Nós avaliamos, ajustamos e seguimos evoluindo.</p>
  </div>`,
})}
${A.exibirValores ? secao({
  id: 'investimento',
  rotulo: 'titulo-investimento',
  conteudo: `<div class="container--estreito">
    <div class="cab-secao">${eyebrow('Investimento')}<h2 id="titulo-investimento">Investimento</h2></div>
    <dl class="investimento">
      <div><dt>${esc(avulsa.nome)}</dt><dd>${reais(avulsa.valor)}</dd></div>
      <div><dt>${esc(tri.nome)}<span>${esc(tri.detalhe)}</span></dt><dd>${reais(tri.valor)}</dd></div>
    </dl>
    <p class="nota centro">Atendimento 100% online, com hora marcada.</p>
  </div>`,
}) : ''}
${secao({
  classe: 'secao--cta',
  rotulo: 'titulo-comecar',
  conteudo: `<div class="container--estreito centro">
    <h2 id="titulo-comecar">Pronta para começar?</h2>
    <p class="lead">Você não precisa de mais uma dieta para tentar seguir sozinha. Você precisa de uma estratégia construída para você, acompanhada de perto e ajustada conforme sua evolução.</p>
    <div class="acoes acoes--centro">${btnAgendar('Quero agendar meu atendimento', A.agendarMensagem, 'atendimento-final')}</div>
    <p class="nota">Ainda está em dúvida sobre o seu momento? <a href="${u('raio-x/')}">Comece pelo Raio-X do Emagrecimento</a>.</p>
  </div>`,
})}`;
  const oferta = (pl) => ({
    '@type': 'Offer',
    name: pl.nome,
    description: pl.resumo,
    ...(A.exibirValores ? { price: pl.valor.toFixed(2), priceCurrency: 'BRL' } : {}),
    url: abs('atendimento/#formatos'),
  });
  return {
    path: 'atendimento/',
    titulo: C.seo.atendimento.titulo,
    descricao: C.seo.atendimento.descricao,
    schema: [
      {
        '@type': 'Service',
        '@id': abs('atendimento/#servico'),
        name: 'Atendimento nutricional online',
        serviceType: 'Consulta e acompanhamento nutricional online',
        provider: { '@id': PERSON_ID() },
        areaServed: 'BR',
        availableChannel: { '@type': 'ServiceChannel', name: 'Online, com hora marcada' },
        url: abs('atendimento/'),
        offers: A.planos.map(oferta),
      },
      crumbSchema(crumbs),
    ],
    corpo,
  };
}

function raioX() {
  const crumbs = [HOME, { nome: 'Raio-X', path: 'raio-x/' }];
  const inicio = raioXInicio();
  const corpo = `${cabecalhoInterno({
    crumbs,
    eyebrowTxt: 'Questionário',
    h1: esc(C.raioX.nome),
    lead: 'Descubra onde o seu processo de emagrecimento está travando — antes de tentar mais uma estratégia.',
    extra: `<div class="acoes">${btn('Começar meu Raio-X', inicio.href, { externo: inicio.externo, icone: 'seta', track: 'raio-x-topo-comecar' })}</div>`,
  })}
${secao({
  rotulo: 'titulo-o-que-e',
  conteudo: `<div class="dupla">
  <div class="prosa">
    <h2 id="titulo-o-que-e">O que é o Raio-X</h2>
    <p>Um questionário que passa por ${C.raioX.areas.length} áreas do seu processo de emagrecimento. Em vez de olhar só para “o que comer”, ele ajuda a enxergar o conjunto: rotina, comportamento, consistência e o que acontece depois do resultado.</p>
    <p>O resultado é uma percepção ampla do seu momento atual — e um ponto de partida mais preciso para as próximas decisões.</p>
  </div>
  <div class="caixa">
    <p class="raio-x__rotulo">As ${C.raioX.areas.length} áreas</p>
    ${areasRaioX()}
  </div>
</div>`,
})}
${secao({
  classe: 'secao--areia',
  rotulo: 'titulo-passos-raio',
  conteudo: `<div class="cab-secao">${eyebrow('Passo a passo')}<h2 id="titulo-passos-raio">Como funciona</h2></div>
<ol class="etapas">${[
    ['Responda com calma', 'Seja sincera: não existem respostas certas ou erradas.'],
    ['Receba a leitura do seu momento', 'Veja em quais áreas o processo está mais vulnerável.'],
    ['Conheça a estratégia indicada', 'E decida, com clareza, o próximo passo.'],
  ].map(([t, d], i) => `<li class="etapa"><span class="etapa__num" aria-hidden="true">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
<div class="acoes acoes--centro">${btn('Começar meu Raio-X', inicio.href, { externo: inicio.externo, icone: 'seta', track: 'raio-x-meio-comecar' })}</div>
<p class="nota centro">O Raio-X é uma ferramenta de percepção e orientação inicial. Não é diagnóstico e não substitui avaliação nutricional ou médica individual.</p>`,
})}
${blocoFaq(faqRaioX, 'Dúvidas sobre o Raio-X')}`;
  return {
    path: 'raio-x/',
    titulo: C.seo.raioX.titulo,
    descricao: C.seo.raioX.descricao,
    schema: [faqSchema(faqRaioX), crumbSchema(crumbs)],
    corpo,
  };
}

function conteudos(artigos) {
  const crumbs = [HOME, { nome: 'Conteúdos', path: 'conteudos/' }];
  const temas = ['Comportamento alimentar', 'Rotina', 'Consistência', 'Manutenção de resultados', 'Emagrecimento sustentável'];
  const lista = artigos.length
    ? `<ul class="artigos">${artigos.map((a) => `<li><article class="card-artigo">
  ${a.imagem ? `<img src="${u(a.imagem.src)}" alt="${esc(a.imagem.alt)}" loading="lazy" width="1200" height="630">` : ''}
  <p class="card-artigo__meta">${esc(a.categoria)}${!a.publicado ? ' <span class="pend">Rascunho — aguardando revisão</span>' : ''}</p>
  <h2><a href="${u(`conteudos/${a.slug}/`)}">${esc(a.titulo)}</a></h2>
  <p>${esc(a.descricao)}</p>
</article></li>`).join('')}</ul>`
    : `<div class="vazio"><p>Os primeiros conteúdos estão sendo preparados.</p><p>Enquanto isso, comece pelo Raio-X e entenda o seu momento.</p><div class="acoes acoes--centro">${btnRaioX(C.ctas.raioXCurto, { track: 'conteudos-vazio-raio-x' })}</div></div>`;
  const corpo = `${cabecalhoInterno({
    crumbs,
    eyebrowTxt: 'Conteúdos',
    h1: 'Conteúdos para emagrecer com estratégia',
    lead: 'Textos sobre comportamento alimentar, rotina, consistência e manutenção de resultados — com informação de qualidade e linguagem simples.',
    extra: `<ul class="temas" aria-label="Temas">${temas.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`,
  })}
${secao({ conteudo: lista })}`;
  return {
    path: 'conteudos/',
    titulo: C.seo.conteudos.titulo,
    descricao: C.seo.conteudos.descricao,
    schema: [{ '@type': 'CollectionPage', '@id': abs('conteudos/#pagina'), url: abs('conteudos/'), name: C.seo.conteudos.titulo, isPartOf: { '@id': WEBSITE_ID() } }, crumbSchema(crumbs)],
    corpo,
  };
}

function artigo(a, relacionados) {
  const path = `conteudos/${a.slug}/`;
  const crumbs = [HOME, { nome: 'Conteúdos', path: 'conteudos/' }, { nome: a.titulo, path }];
  const palavras = textoPuro(a.corpo).split(' ').length;
  const minutos = Math.max(1, Math.round(palavras / 200));
  const dataBR = (d) => new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const corpo = `<article class="artigo">
<header class="cab-interno"><div class="container container--texto">
${breadcrumbs(crumbs)}
${!a.publicado ? '<p class="pend">Rascunho — só aparece na prévia até a Andréa aprovar</p>' : ''}
${eyebrow(a.categoria)}
<h1>${esc(a.titulo)}</h1>
<p class="lead">${esc(a.descricao)}</p>
<p class="artigo__meta">Por <a href="${u('sobre/')}" rel="author">${esc(N)}</a> · <time datetime="${a.data}">${dataBR(a.data)}</time> · ${minutos} min de leitura</p>
</div></header>
${a.imagem ? `<div class="container container--texto"><img class="artigo__img" src="${u(a.imagem.src)}" alt="${esc(a.imagem.alt)}" width="1200" height="630" fetchpriority="high"></div>` : ''}
<div class="container container--texto prosa artigo__corpo">${a.corpo}</div>
<aside class="container container--texto" aria-label="Próximo passo">
  <div class="caixa-cta">
    <p class="caixa-cta__titulo">Quer entender onde o seu processo trava?</p>
    <p>O Raio-X do Emagrecimento avalia ${C.raioX.areas.length} áreas do seu momento atual.</p>
    ${btnRaioX(C.ctas.raioXCurto, { track: 'artigo-raio-x' })}
  </div>
  <div class="autor">
    <img src="${u(C.imagens.sobre.srcMobile)}" alt="" width="72" height="90" loading="lazy">
    <p><strong>${esc(N)}</strong><br>${assinaturaProfissional()}. Criadora do método ${esc(P)}. <a href="${u('sobre/')}">Conheça a trajetória</a>.</p>
  </div>
  ${relacionados.length ? `<nav class="relacionados" aria-label="Leia também"><p class="eyebrow">Leia também</p><ul>${relacionados.map((r) => `<li><a href="${u(`conteudos/${r.slug}/`)}">${esc(r.titulo)}</a></li>`).join('')}</ul></nav>` : ''}
</aside>
</article>`;
  return {
    path,
    titulo: `${a.titulo} | ${N}`,
    ogTitulo: a.titulo,
    descricao: a.descricao,
    ogTipo: 'article',
    ogImagem: a.imagem ? { ...a.imagem, largura: 1200, altura: 630 } : null,
    noindex: !a.publicado,
    schema: [
      {
        '@type': 'Article',
        headline: a.titulo,
        description: a.descricao,
        datePublished: a.data,
        dateModified: a.atualizado || a.data,
        author: { '@id': PERSON_ID() },
        publisher: { '@id': PERSON_ID() },
        mainEntityOfPage: abs(path),
        image: abs((a.imagem || C.imagens.og).src),
        inLanguage: C.site.idioma,
        articleSection: a.categoria,
      },
      crumbSchema(crumbs),
    ],
    corpo,
  };
}

function imprensa() {
  const crumbs = [HOME, { nome: 'Na mídia', path: 'imprensa/' }];
  const porCategoria = CATEGORIAS.map((c) => ({ ...c, itens: midiaPublica.filter((m) => m.categoria === c.id).sort((x, y) => String(y.data || '').localeCompare(String(x.data || ''))) }));
  const numeros = porCategoria.filter((c) => c.itens.length);
  const resumo = `<ul class="numeros" aria-label="Resumo do acervo">${numeros.map((c) => `<li><strong>${c.itens.length}</strong><span>${esc(c.nome)}</span></li>`).join('')}</ul>`;
  const indice = `<nav class="indice-midia" aria-label="Categorias"><ul>${numeros.map((c) => `<li><a href="#${c.id}">${esc(c.nome)}</a></li>`).join('')}</ul></nav>`;
  const grupos = porCategoria
    .map((c) => {
      if (!c.itens.length) {
        const aviso = pend(`Sem registros confirmados em "${c.nome}" (content/imprensa.mjs)`, { bloco: true });
        return aviso ? `<section class="grupo-midia" aria-labelledby="g-${c.id}"><h2 id="g-${c.id}">${esc(c.nome)}</h2>${aviso}</section>` : '';
      }
      return `<section class="grupo-midia" id="${c.id}" aria-labelledby="g-${c.id}"><h2 id="g-${c.id}">${esc(c.nome)} <span class="grupo-midia__qtd">${c.itens.length}</span></h2><ul class="midias">${c.itens.map((m) => cardImprensa(m, { comCategoria: false })).join('')}</ul></section>`;
    })
    .join('');
  const emailImp = C.contato.emailImprensa || C.contato.email;
  const corpo = `${cabecalhoInterno({
    crumbs,
    eyebrowTxt: 'Na mídia',
    h1: 'Na mídia',
    lead: `Participações em TV, revistas, jornais, portais e entrevistas ao longo da trajetória de ${esc(N)}.`,
  })}
${secao({
  classe: 'secao--compacta',
  rotulo: 'titulo-nome',
  conteudo: `<div class="nota-nome">
  <h2 id="titulo-nome" class="nota-nome__titulo">Uma trajetória, dois nomes</h2>
  <p>Durante muitos anos, ${esc(C.pessoa.nomeCurto)} atuou com o nome profissional <strong>${esc(NA)}</strong>. As participações reunidas aqui foram publicadas com esse nome e fazem parte da mesma trajetória que hoje segue como <strong>${esc(N)}</strong>.</p>
</div>
${resumo}
${indice}`,
})}
${secao({ classe: 'secao--sem-topo', conteudo: grupos || '<div class="vazio"><p>O acervo de participações está sendo reunido e será publicado aqui em breve.</p></div>' })}
${secao({
  classe: 'secao--areia',
  rotulo: 'titulo-para-imprensa',
  conteudo: `<div class="container--estreito centro">
  ${eyebrow('Para jornalistas e produtores')}
  <h2 id="titulo-para-imprensa">Pautas e entrevistas</h2>
  <p>Temas: emagrecimento sustentável, comportamento alimentar, alimentação da mulher após os 35, rotina, consistência e manutenção de resultados.</p>
  ${emailImp ? `<div class="acoes acoes--centro">${btn('Contato para imprensa', `mailto:${emailImp}`, { tipo: 'secundario', icone: 'seta', track: 'imprensa-email' })}</div>` : `<div class="acoes acoes--centro">${btn('Fale com a equipe', u('contato/'), { tipo: 'secundario', icone: 'seta', track: 'imprensa-contato' })}</div>${pend('E-mail para imprensa (config.contato.emailImprensa)')}`}
</div>`,
})}`;
  // Cada participação vira um item "que menciona" a mesma Person do site:
  // é o sinal mais claro para o Google de que Andréa Marim = Andréa Augusto de Oliveira.
  const lista = {
    '@type': 'ItemList',
    '@id': abs('imprensa/#participacoes'),
    name: 'Participações na mídia',
    itemListElement: midiaPublica.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': m.formatos.includes('vídeo') ? 'VideoObject' : 'Article',
        name: m.titulo,
        url: m.url,
        ...(m.data && m.data.length === 10 ? { datePublished: m.data } : {}),
        publisher: { '@type': 'Organization', name: m.veiculo },
        mentions: { '@id': PERSON_ID() },
      },
    })),
  };
  return {
    path: 'imprensa/',
    titulo: C.seo.imprensa.titulo,
    descricao: C.seo.imprensa.descricao,
    schema: [{ '@type': 'CollectionPage', '@id': abs('imprensa/#pagina'), url: abs('imprensa/'), name: C.seo.imprensa.titulo, about: { '@id': PERSON_ID() }, mainEntity: { '@id': abs('imprensa/#participacoes') }, isPartOf: { '@id': WEBSITE_ID() } }, lista, crumbSchema(crumbs)],
    corpo,
  };
}

function contato() {
  const crumbs = [HOME, { nome: 'Contato', path: 'contato/' }];
  const F = C.formulario;
  const wa = whatsappUrl();
  const canais = [
    wa && `<li><a class="canal" href="${esc(wa)}" target="_blank" rel="noopener" data-cta="contato-whatsapp">${icons.whatsapp}<span><strong>WhatsApp</strong>${esc(C.ctas.whatsapp)}</span><span class="sr-only"> (abre em nova aba)</span></a></li>`,
    C.contato.email && `<li><a class="canal" href="mailto:${esc(C.contato.email)}" data-cta="contato-email">${icons.email}<span><strong>E-mail</strong>${esc(C.contato.email)}</span></a></li>`,
    C.contato.instagram && `<li><a class="canal" href="${esc(C.contato.instagram)}" target="_blank" rel="noopener" data-cta="contato-instagram">${icons.instagram}<span><strong>Instagram</strong>Acompanhe os conteúdos</span><span class="sr-only"> (abre em nova aba)</span></a></li>`,
  ].filter(Boolean);
  const pendCanais = [
    !wa && pend('Número do WhatsApp (config.contato.whatsapp)', { bloco: true }),
    !C.contato.email && pend('E-mail de contato (config.contato.email)', { bloco: true }),
    !C.contato.instagram && pend('Link do Instagram (config.contato.instagram)', { bloco: true }),
  ].filter(Boolean).join('');
  const infos = [
    C.contato.horario ? `<li><strong>Horário:</strong> ${esc(C.contato.horario)}</li>` : pend('Horário de atendimento (config.contato.horario)', { bloco: true }),
    C.contato.prazoResposta ? `<li><strong>Retorno:</strong> ${esc(C.contato.prazoResposta)}</li>` : pend('Prazo de resposta (config.contato.prazoResposta)', { bloco: true }),
    C.pessoa.atendimento ? `<li><strong>Atendimento:</strong> ${esc(C.pessoa.atendimento)}</li>` : pend('Modalidade de atendimento: online/presencial (config.pessoa.atendimento)', { bloco: true }),
    C.contato.endereco ? `<li><strong>Endereço:</strong> ${esc(C.contato.endereco)}</li>` : '',
  ].filter(Boolean).join('');
  const inicio = raioXInicio();
  const corpo = `${cabecalhoInterno({
    crumbs,
    eyebrowTxt: 'Contato',
    h1: 'Vamos conversar',
    lead: 'Tire suas dúvidas sobre o acompanhamento, o Raio-X ou o método. Se preferir começar entendendo o seu momento, o Raio-X é o primeiro passo.',
  })}
${secao({
  conteudo: `<div class="contato">
  <div class="contato__form" data-sem-flutuante>
    <h2 id="titulo-form">Envie uma mensagem</h2>
    <p class="nota">Campos com <span aria-hidden="true">*</span><span class="sr-only">asterisco</span> são obrigatórios.</p>
    <div class="form-status" data-form-status tabindex="-1" role="status" aria-live="polite"></div>
    <form class="form" action="${esc(F.endpoint)}" method="post" novalidate data-form aria-labelledby="titulo-form" data-sucesso="${esc(F.sucesso)}" data-erro="${esc(F.erro)}">
      <div class="campo">
        <label for="f-nome">Nome <span aria-hidden="true">*</span></label>
        <input id="f-nome" name="nome" type="text" autocomplete="name" required maxlength="120" aria-describedby="e-nome">
        <p class="campo__erro" id="e-nome" data-erro-de="nome">Informe o seu nome.</p>
      </div>
      <div class="campo">
        <label for="f-email">E-mail <span aria-hidden="true">*</span></label>
        <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required maxlength="160" aria-describedby="e-email">
        <p class="campo__erro" id="e-email" data-erro-de="email">Informe um e-mail válido, como nome@exemplo.com.</p>
      </div>
      <div class="campo">
        <label for="f-whats">WhatsApp <span class="opcional">(opcional)</span></label>
        <input id="f-whats" name="whatsapp" type="tel" autocomplete="tel" inputmode="tel" maxlength="30" placeholder="(00) 00000-0000" aria-describedby="e-whats">
        <p class="campo__erro" id="e-whats" data-erro-de="whatsapp">Informe o número com DDD, só com números e símbolos comuns.</p>
      </div>
      <div class="campo">
        <label for="f-assunto">Assunto <span aria-hidden="true">*</span></label>
        <select id="f-assunto" name="assunto" required aria-describedby="e-assunto">
          <option value="">Selecione</option>
          ${F.assuntos.map((a) => `<option>${esc(a)}</option>`).join('')}
        </select>
        <p class="campo__erro" id="e-assunto" data-erro-de="assunto">Escolha um assunto.</p>
      </div>
      <div class="campo">
        <label for="f-msg">Mensagem <span aria-hidden="true">*</span></label>
        <textarea id="f-msg" name="mensagem" rows="5" required minlength="10" maxlength="3000" aria-describedby="e-msg"></textarea>
        <p class="campo__erro" id="e-msg" data-erro-de="mensagem">Escreva uma mensagem com pelo menos 10 caracteres.</p>
      </div>
      <div class="campo campo--hp" aria-hidden="true"><label for="f-site">Não preencha este campo</label><input id="f-site" name="site" type="text" tabindex="-1" autocomplete="off"></div>
      <div class="campo campo--check">
        <input id="f-lgpd" name="consentimento" type="checkbox" value="sim" required aria-describedby="e-lgpd">
        <label for="f-lgpd">Concordo com o uso dos meus dados para retorno deste contato, conforme a <a href="${u('politica-de-privacidade/')}">Política de Privacidade</a>. <span aria-hidden="true">*</span></label>
        <p class="campo__erro" id="e-lgpd" data-erro-de="consentimento">É preciso concordar para podermos responder.</p>
      </div>
      <input type="hidden" name="origem" value="site-contato">
      <button class="btn btn--primario btn--largo" type="submit" data-form-botao><span>${esc(C.ctas.contato)}</span></button>
    </form>
  </div>
  <aside class="contato__lado" aria-label="Outros canais">
    <div class="caixa caixa--destaque">
      <p class="eyebrow">Primeiro passo recomendado</p>
      <p class="caixa__titulo">${esc(C.raioX.nome)}</p>
      <p>Descubra em quais áreas o seu processo está mais vulnerável.</p>
      ${btn(C.ctas.raioXCurto, inicio.href, { externo: inicio.externo, icone: 'seta', track: 'contato-raio-x' })}
    </div>
    <h2 class="contato__sub">Canais</h2>
    ${canais.length ? `<ul class="canais">${canais.join('')}</ul>` : ''}
    ${pendCanais}
    <h2 class="contato__sub">Informações</h2>
    <ul class="infos"><li>${assinaturaProfissional()}</li>${infos}</ul>
  </aside>
</div>`,
})}`;
  return {
    path: 'contato/',
    titulo: C.seo.contato.titulo,
    descricao: C.seo.contato.descricao,
    semFlutuante: true,
    schema: [{ '@type': 'ContactPage', '@id': abs('contato/#pagina'), url: abs('contato/'), name: C.seo.contato.titulo, about: { '@id': PERSON_ID() } }, crumbSchema(crumbs)],
    corpo,
  };
}

// Textos legais: MODELOS — revisar com assessoria jurídica antes de publicar.
function legalCampo(valor, rotulo) {
  return valor ? esc(valor) : pend(rotulo) || '<em>(informação em atualização)</em>';
}

function privacidade() {
  const crumbs = [HOME, { nome: 'Política de Privacidade', path: 'politica-de-privacidade/' }];
  const L = C.legal;
  pend('Revisão jurídica da Política de Privacidade e dos Termos de Uso');
  const email = L.emailPrivacidade || C.contato.email;
  const corpo = `${cabecalhoInterno({ crumbs, h1: 'Política de Privacidade', lead: `Última atualização: ${L.revisaoPolitica ? esc(L.revisaoPolitica) : legalCampo(null, 'Data de revisão da Política (config.legal.revisaoPolitica)')}` })}
<div class="container container--texto prosa legal">
<p>Esta política explica como os dados pessoais enviados por este site são tratados, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).</p>
<h2>1. Quem é a controladora dos dados</h2>
<p>${L.pessoaFisica ? `${esc(N)}, ${assinaturaProfissional()}, profissional autônoma (pessoa física).` : `${esc(N)}${L.razaoSocial ? `, por meio de ${esc(L.razaoSocial)}` : ''}${L.cnpj ? `, CNPJ ${esc(L.cnpj)}` : ''}. ${!L.razaoSocial || !L.cnpj ? pend('Razão social e CNPJ na Política (config.legal)') : ''}`}</p>
<h2>2. Quais dados coletamos</h2>
<ul>
<li><strong>Formulário de contato:</strong> nome, e-mail, WhatsApp (opcional), assunto e mensagem.</li>
<li><strong>Questionário Raio-X:</strong> as respostas que você fornecer ao preenchê-lo.</li>
<li><strong>Navegação:</strong> dados técnicos básicos (como endereço IP e tipo de navegador), registrados pelo servidor para segurança e funcionamento do site${C.analytics.ga4 || C.analytics.metaPixel ? ', e dados de medição de audiência por meio de ferramentas de terceiros' : ''}.</li>
</ul>
<p>Não solicite nem envie pelo formulário informações de saúde detalhadas. Elas serão tratadas apenas no contexto de uma avaliação individual, com os cuidados que a lei exige para dados sensíveis.</p>
<h2>3. Para que usamos os dados</h2>
<ul>
<li>Responder ao seu contato e esclarecer dúvidas.</li>
<li>Entregar a leitura do Raio-X e apresentar a estratégia indicada.</li>
<li>Cumprir obrigações legais e manter a segurança do site.</li>
</ul>
<p>A base legal é o seu consentimento e, quando aplicável, os procedimentos preliminares a um contrato que você solicitou.</p>
<h2>4. Compartilhamento</h2>
<p>Os dados não são vendidos. Podem ser processados por fornecedores que viabilizam o funcionamento do site (hospedagem, envio de e-mails e formulários), apenas para essas finalidades.</p>
<h2>5. Por quanto tempo guardamos</h2>
<p>Pelo tempo necessário para cumprir as finalidades acima ou exigências legais. Depois disso, os dados são excluídos ou anonimizados.</p>
<h2>6. Seus direitos</h2>
<p>Você pode pedir a confirmação do tratamento, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar o consentimento a qualquer momento.</p>
<p>Para exercer esses direitos, escreva para ${email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : legalCampo(null, 'E-mail para pedidos de privacidade/LGPD (config.legal.emailPrivacidade)')}.</p>
<h2>7. Cookies</h2>
<p>${C.analytics.ga4 || C.analytics.metaPixel ? 'Este site utiliza cookies de medição de audiência. Você pode bloqueá-los nas configurações do seu navegador.' : 'Este site não utiliza cookies de publicidade nem de medição de audiência. Apenas preferências locais do navegador podem ser usadas para melhorar a sua experiência (por exemplo, lembrar que você minimizou um botão).'}</p>
<h2>8. Alterações</h2>
<p>Esta política pode ser atualizada. A data da última revisão fica sempre no topo desta página.</p>
</div>`;
  return { path: 'politica-de-privacidade/', titulo: C.seo.privacidade.titulo, descricao: C.seo.privacidade.descricao, schema: [crumbSchema(crumbs)], corpo };
}

function termos() {
  const crumbs = [HOME, { nome: 'Termos de Uso', path: 'termos-de-uso/' }];
  const L = C.legal;
  const corpo = `${cabecalhoInterno({ crumbs, h1: 'Termos de Uso', lead: `Última atualização: ${L.revisaoTermos ? esc(L.revisaoTermos) : legalCampo(null, 'Data de revisão dos Termos (config.legal.revisaoTermos)')}` })}
<div class="container container--texto prosa legal">
<p>Ao usar este site, você concorda com as condições abaixo.</p>
<h2>1. Sobre o site</h2>
<p>Este site apresenta o trabalho de ${esc(N)}${L.razaoSocial ? ` (${esc(L.razaoSocial)}${L.cnpj ? `, CNPJ ${esc(L.cnpj)}` : ''})` : ''}, incluindo o método ${esc(P)}, o ${esc(C.raioX.nome)} e conteúdos educativos.</p>
<h2>2. Caráter educativo</h2>
<p>Os conteúdos têm finalidade informativa e educativa. Não constituem prescrição, diagnóstico ou tratamento, e não substituem a avaliação individual de nutricionista, médico ou outro profissional de saúde.</p>
<h2>3. Sem garantia de resultados</h2>
<p>Cada organismo e cada história são diferentes. Não há promessa de resultado, prazo ou quantidade de peso a ser perdida.</p>
<h2>4. Raio-X</h2>
<p>O ${esc(C.raioX.nome)} é uma ferramenta de percepção e orientação inicial, baseada nas respostas fornecidas por você. Não é um exame nem um diagnóstico.</p>
<h2>5. Propriedade intelectual</h2>
<p>Textos, imagens, materiais e a identidade visual deste site pertencem a ${esc(N)} ou são usados com autorização. Não é permitido copiar ou reproduzir o conteúdo sem autorização prévia.</p>
<h2>6. Links externos</h2>
<p>O site pode conter links para outras páginas (como matérias na imprensa e redes sociais). Não nos responsabilizamos pelo conteúdo desses sites.</p>
<h2>7. Privacidade</h2>
<p>O tratamento de dados pessoais segue a <a href="${u('politica-de-privacidade/')}">Política de Privacidade</a>.</p>
<h2>8. Contato</h2>
<p>Dúvidas sobre estes termos podem ser enviadas pela <a href="${u('contato/')}">página de contato</a>.</p>
</div>`;
  return { path: 'termos-de-uso/', titulo: C.seo.termos.titulo, descricao: C.seo.termos.descricao, schema: [crumbSchema(crumbs)], corpo };
}

function naoEncontrada() {
  const corpo = `<section class="secao"><div class="container container--estreito centro">
<p class="eyebrow">Erro 404</p>
<h1>Página não encontrada</h1>
<p class="lead">O endereço pode ter mudado. Que tal recomeçar por um caminho mais claro?</p>
<div class="acoes acoes--centro">${btn('Ir para a página inicial', '/', { tipo: 'secundario' })}${btn(C.ctas.raioXCurto, '/raio-x/', { icone: 'seta' })}</div>
</div></section>`;
  return { path: '', arquivo: '404.html', base: '/', titulo: `Página não encontrada | ${N}`, descricao: C.seo.home.descricao, noindex: true, noCanonical: true, semFlutuante: true, corpo, absoluto: true };
}

// Cada página: endereço + função que monta o conteúdo (chamada depois de
// definir o endereço, para os links relativos saírem certos).
export function todasAsPaginas(artigos) {
  return [
    ['', home],
    ['sobre/', sobre],
    ['emagrecimento-blindado/', programa],
    ['atendimento/', atendimento],
    ['raio-x/', raioX],
    ['conteudos/', () => conteudos(artigos)],
    ...artigos.map((a) => [`conteudos/${a.slug}/`, () => artigo(a, artigos.filter((r) => r !== a).slice(0, 3))]),
    ['imprensa/', imprensa],
    ['contato/', contato],
    ['politica-de-privacidade/', privacidade],
    ['termos-de-uso/', termos],
    ['', naoEncontrada],
  ];
}
