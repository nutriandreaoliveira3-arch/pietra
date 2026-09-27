// Motor do Raio-X 360º do Emagrecimento™: valida respostas e organiza o
// resultado (status por dimensão, prioridades, pontos fortes, barreiras e
// perfil). Não gera diagnóstico nem prescrição: só organiza o que a paciente
// relatou para a análise profissional.
const {
  DIMENSOES, STATUS, CONTEXTO, ORDEM_PRIORIDADE, TEXTOS, ETAPAS, PONTOS_FORTES, CUIDADOS,
} = require('./raioxPerguntas');

const PERGUNTAS = new Map(ETAPAS.flatMap((e) => e.perguntas.map((q) => [q.id, { ...q, etapa: e.id }])));
const LIMITE_TEXTO = { texto: 300, textarea: 1500 };

function visivel(q, respostas) {
  if (!q.mostrarSe) return true;
  const v = respostas[q.mostrarSe.id];
  return q.mostrarSe.em.includes(v);
}

// Mantém só respostas conhecidas e no formato certo. Respostas inválidas são
// descartadas em silêncio (o navegador já valida; aqui é defesa).
function limparRespostas(entrada) {
  const saida = {};
  if (!entrada || typeof entrada !== 'object') return saida;
  for (const [id, valor] of Object.entries(entrada)) {
    const q = PERGUNTAS.get(id);
    if (!q) continue;
    const validos = new Set((q.opcoes || []).map((o) => o.v));
    if (q.tipo === 'radio' && typeof valor === 'string' && validos.has(valor)) saida[id] = valor;
    else if (q.tipo === 'checkbox' && Array.isArray(valor)) {
      const lista = [...new Set(valor.filter((v) => typeof v === 'string' && validos.has(v)))];
      saida[id] = lista;
    } else if (q.tipo === 'escala') {
      const n = Number(valor);
      if (Number.isInteger(n) && n >= 0 && n <= 10) saida[id] = n;
    } else if (q.tipo === 'numero') {
      if (valor === '' || valor === null) continue;
      const n = Number(String(valor).replace(',', '.'));
      if (Number.isFinite(n) && n >= (q.min ?? 0) && n <= (q.max ?? 1000)) saida[id] = Math.round(n * 10) / 10;
    } else if ((q.tipo === 'texto' || q.tipo === 'textarea') && typeof valor === 'string') {
      const t = valor.trim().slice(0, LIMITE_TEXTO[q.tipo]);
      if (t) saida[id] = t;
    }
  }
  return saida;
}

function bate(cond, respostas) {
  return Object.entries(cond).every(([id, esperado]) => {
    const v = respostas[id];
    if (v === undefined) return false;
    if (typeof esperado === 'function') return esperado(v);
    if (Array.isArray(v)) return esperado.every((e) => v.includes(e));
    return esperado.includes(v);
  });
}

function statusDe(razao) {
  return STATUS.find((s) => razao < s.ate) || STATUS[STATUS.length - 1];
}

function calcular(respostasBrutas) {
  const respostas = limparRespostas(respostasBrutas);
  const pontos = Object.fromEntries(DIMENSOES.map((d) => [d.id, 0]));
  const maximo = Object.fromEntries(DIMENSOES.map((d) => [d.id, 0]));

  for (const q of PERGUNTAS.values()) {
    if (!visivel(q, respostas)) continue;
    const v = respostas[q.id];
    if (q.tipo === 'escala' && q.dim) {
      if (v === undefined) continue;
      const peso = q.peso || 1;
      pontos[q.dim] += ((q.inverso ? 10 - v : v) / 10) * peso;
      maximo[q.dim] += peso;
    } else if (q.tipo === 'radio') {
      if (v === undefined) continue;
      // Máximo possível por dimensão = maior pontuação entre as opções.
      const maxPorDim = {};
      for (const o of q.opcoes) for (const [d, n] of Object.entries(o.p || {})) maxPorDim[d] = Math.max(maxPorDim[d] || 0, n);
      for (const [d, n] of Object.entries(maxPorDim)) maximo[d] += n;
      const escolhida = q.opcoes.find((o) => o.v === v);
      for (const [d, n] of Object.entries(escolhida?.p || {})) pontos[d] += n;
    } else if (q.tipo === 'checkbox') {
      if (!Array.isArray(v)) continue;
      const soma = {};
      const maxPorDim = {};
      for (const o of q.opcoes) for (const [d, n] of Object.entries(o.p || {})) maxPorDim[d] = (maxPorDim[d] || 0) + n;
      for (const o of q.opcoes.filter((op) => v.includes(op.v))) {
        for (const [d, n] of Object.entries(o.p || {})) soma[d] = (soma[d] || 0) + n;
      }
      for (const [d, n] of Object.entries(maxPorDim)) {
        const teto = q.teto?.[d] ?? n;
        maximo[d] += Math.min(teto, n);
        pontos[d] += Math.min(teto, soma[d] || 0);
      }
    }
  }

  const dimensoes = DIMENSOES.map((d) => {
    if (!maximo[d.id]) return { id: d.id, nome: d.nome, status: null, razao: null };
    const razao = Math.min(1, pontos[d.id] / maximo[d.id]);
    // Fase hormonal é contexto: no máximo "Atenção".
    const s = d.id === 'hormonal' && razao >= STATUS[0].ate ? STATUS[1] : statusDe(razao);
    return { id: d.id, nome: d.nome, status: s.id, statusNome: s.nome, razao: Math.round(razao * 100) / 100 };
  });

  const ordem = (id) => ORDEM_PRIORIDADE.indexOf(id);
  const atencao = dimensoes
    .filter((d) => d.status && d.status !== 'favoravel')
    .sort((a, b) => b.razao - a.razao || ordem(a.id) - ordem(b.id));
  const top = atencao.filter((d) => !CONTEXTO.includes(d.id)).slice(0, 3);

  const fortes = PONTOS_FORTES.filter((r) => bate(r.se, respostas)).map((r) => r.t);
  for (const d of dimensoes) {
    if (fortes.length >= 5) break;
    const t = TEXTOS[d.id].forte;
    if (d.status === 'favoravel' && t && !fortes.includes(t)) fortes.push(t);
  }

  const barreirasQ = PERGUNTAS.get('b_barreiras');
  const barreiras = (respostas.b_barreiras || [])
    .map((v) => barreirasQ.opcoes.find((o) => o.v === v)?.t)
    .filter(Boolean);
  // Se a paciente marcou poucas barreiras, completa com as dimensões que
  // mais pedem cuidado (sem repetir contexto como fase hormonal).
  for (const d of top) {
    if (barreiras.length >= 3) break;
    barreiras.push(d.nome);
  }

  const cuidados = CUIDADOS.filter((c) => c.se.some((cond) => bate(cond, respostas))).map((c) => c.t);

  return {
    versao: 1,
    dimensoes,
    prioridades: top.map((d) => ({ id: d.id, nome: d.nome, texto: TEXTOS[d.id].prioridade })),
    pontosFortes: fortes.slice(0, 6),
    barreiras: barreiras.slice(0, 6),
    perfil: perfil(top, fortes),
    cuidados,
  };
}

function lista(itens) {
  if (itens.length <= 1) return itens.join('');
  return `${itens.slice(0, -1).join(', ')} e ${itens[itens.length - 1]}`;
}

function perfil(top, fortes) {
  if (!top.length) {
    return 'Seu relato sugere uma base favorável em várias áreas. A estratégia pode focar em ajustes finos e na construção de uma rotina possível de manter a longo prazo, sempre a partir da avaliação individual.';
  }
  const partes = top.map((d) => TEXTOS[d.id].perfil);
  const primeira = lista(partes);
  const verbo = partes.length > 1 ? 'parecem ter' : 'parece ter';
  let texto = `Seu Raio-X sugere que a sua principal dificuldade não está apenas na escolha dos alimentos. ${primeira.charAt(0).toUpperCase()}${primeira.slice(1)} ${verbo} grande influência na sua constância.`;
  if (fortes.length) texto += ` Ao mesmo tempo, você apresenta ${lista(fortes.slice(0, 2))}.`;
  texto += ` Por isso, a sua estratégia deverá priorizar ${lista([...top.map((d) => TEXTOS[d.id].foco), 'a construção de uma rotina possível de manter'])}.`;
  return texto;
}

// Respostas com os textos das perguntas e opções, agrupadas por etapa (para
// a área administrativa).
function rotular(respostasBrutas) {
  const respostas = limparRespostas(respostasBrutas);
  return ETAPAS.map((e) => ({
    titulo: e.titulo,
    itens: e.perguntas
      .filter((q) => respostas[q.id] !== undefined && visivel(q, respostas))
      .map((q) => {
        const v = respostas[q.id];
        const texto = (x) => q.opcoes?.find((o) => o.v === x)?.t ?? String(x);
        let resposta;
        if (q.tipo === 'checkbox') resposta = v.length ? v.map(texto).join('; ') : '(nenhuma opção marcada)';
        else if (q.tipo === 'radio') resposta = texto(v);
        else if (q.tipo === 'escala') resposta = `${v} de 10`;
        else if (q.tipo === 'numero') resposta = `${String(v).replace('.', ',')} kg`;
        else resposta = v;
        return { pergunta: q.rotulo, resposta };
      }),
  })).filter((g) => g.itens.length);
}

// Versão sem funções, para o questionário do navegador.
function definicaoPublica() {
  return {
    etapas: ETAPAS.map((e) => ({
      id: e.id, titulo: e.titulo, intro: e.intro, destaque: !!e.destaque,
      perguntas: e.perguntas.map((q) => {
        const { p, teto, dim, inverso, peso, ...resto } = q;
        void p; void teto; void dim; void inverso; void peso;
        return { ...resto, opcoes: q.opcoes?.map((o) => ({ v: o.v, t: o.t, ...(o.exclusiva ? { exclusiva: true } : {}) })) };
      }),
    })),
  };
}

module.exports = { calcular, limparRespostas, rotular, definicaoPublica, ETAPAS };
