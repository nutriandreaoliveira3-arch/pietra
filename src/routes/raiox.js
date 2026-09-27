// Raio-X 360º do Emagrecimento™ — questionário do site institucional.
//
// Público (sem login): a paciente começa com nome, e-mail e consentimento,
// recebe um token e salva cada etapa com ele (salvamento progressivo). Ao
// concluir, o resultado é calculado aqui e devolvido para o painel visual.
//
// Admin: lista, detalhe (respostas rotuladas + resultado) e exclusão (LGPD).
const express = require('express');
const crypto = require('crypto');
const { z } = require('zod');
const { v4: uuid } = require('uuid');
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { calcular, limparRespostas, rotular, ETAPAS } = require('../lib/raiox');
const { sendRaioxEmail } = require('../lib/email');

const publico = express.Router();
const admin = express.Router();
const TOKEN_OK = /^[a-f0-9]{48}$/;

// Limite simples por IP para novos questionários: 5 a cada 30 minutos.
const JANELA_MS = 30 * 60 * 1000;
const inicios = new Map();
function excedeuLimite(ip) {
  const agora = Date.now();
  const lista = (inicios.get(ip) || []).filter((t) => agora - t < JANELA_MS);
  lista.push(agora);
  inicios.set(ip, lista);
  if (inicios.size > 5000) inicios.clear();
  return lista.length > 5;
}

const inicioSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  whatsapp: z.string().trim().max(30).regex(/^[\d\s()+.-]*$/).optional().default(''),
  consentimento: z.literal(true),
  ciente: z.literal(true),
  site: z.string().optional().default(''), // honeypot
});

function buscar(token) {
  if (!TOKEN_OK.test(token || '')) return null;
  return db.prepare('SELECT * FROM raiox_respostas WHERE token = ?').get(token);
}

function publicoDe(linha) {
  return {
    nome: linha.nome,
    etapa: linha.etapa,
    status: linha.status,
    respostas: JSON.parse(linha.respostas || '{}'),
    resultado: linha.resultado ? JSON.parse(linha.resultado) : null,
  };
}

publico.post('/', express.json({ limit: '10kb' }), (req, res) => {
  const dados = inicioSchema.safeParse(req.body || {});
  if (!dados.success) return res.status(400).json({ error: 'Confira os dados e as autorizações.' });
  if (dados.data.site) return res.status(201).json({ token: crypto.randomBytes(24).toString('hex') });
  const ip = (req.get('x-forwarded-for') || '').split(',')[0].trim() || req.ip;
  if (excedeuLimite(ip)) return res.status(429).json({ error: 'Muitas tentativas. Tente novamente mais tarde.' });

  const token = crypto.randomBytes(24).toString('hex');
  const d = dados.data;
  db.prepare(
    `INSERT INTO raiox_respostas (id, token, nome, email, whatsapp, consentimento_em)
     VALUES (?, ?, ?, ?, ?, datetime('now'))`,
  ).run(uuid(), token, d.nome, d.email, d.whatsapp);
  return res.status(201).json({ token });
});

publico.get('/:token', (req, res) => {
  const linha = buscar(req.params.token);
  if (!linha) return res.status(404).json({ error: 'Questionário não encontrado.' });
  return res.json(publicoDe(linha));
});

// Salvamento progressivo: junta as respostas novas às já salvas.
publico.put('/:token', express.json({ limit: '60kb' }), (req, res) => {
  const linha = buscar(req.params.token);
  if (!linha) return res.status(404).json({ error: 'Questionário não encontrado.' });
  if (linha.status === 'concluido') return res.status(409).json({ error: 'Este Raio-X já foi concluído.' });
  const novas = limparRespostas(req.body?.respostas);
  const respostas = { ...JSON.parse(linha.respostas || '{}'), ...novas };
  const etapa = Math.max(0, Math.min(ETAPAS.length, Number(req.body?.etapa) || 0));
  db.prepare(
    "UPDATE raiox_respostas SET respostas = ?, etapa = MAX(etapa, ?), updated_at = datetime('now') WHERE id = ?",
  ).run(JSON.stringify(respostas), etapa, linha.id);
  return res.json({ ok: true });
});

publico.post('/:token/concluir', express.json({ limit: '60kb' }), async (req, res) => {
  const linha = buscar(req.params.token);
  if (!linha) return res.status(404).json({ error: 'Questionário não encontrado.' });
  if (linha.status === 'concluido') return res.json({ resultado: JSON.parse(linha.resultado) });
  const respostas = { ...JSON.parse(linha.respostas || '{}'), ...limparRespostas(req.body?.respostas) };
  const resultado = calcular(respostas);
  db.prepare(
    `UPDATE raiox_respostas SET respostas = ?, resultado = ?, etapa = ?, status = 'concluido',
       concluido_em = datetime('now'), updated_at = datetime('now') WHERE id = ?`,
  ).run(JSON.stringify(respostas), JSON.stringify(resultado), ETAPAS.length, linha.id);
  try {
    await sendRaioxEmail(linha);
  } catch (err) {
    console.error('Falha ao avisar Raio-X concluído por e-mail:', err.message);
  }
  return res.json({ resultado });
});

// ---------------------------------------------------------------- admin
admin.use(requireAuth, requireAdmin);

admin.get('/', (req, res) => {
  const linhas = db
    .prepare(
      `SELECT id, nome, email, whatsapp, etapa, status, resultado, created_at, concluido_em
       FROM raiox_respostas ORDER BY COALESCE(concluido_em, updated_at) DESC LIMIT 500`,
    )
    .all();
  res.json({
    totalEtapas: ETAPAS.length,
    itens: linhas.map(({ resultado, ...l }) => ({
      ...l,
      prioridades: resultado ? JSON.parse(resultado).prioridades.map((p) => p.nome) : [],
    })),
  });
});

admin.get('/:id', (req, res) => {
  const linha = db.prepare('SELECT * FROM raiox_respostas WHERE id = ?').get(req.params.id);
  if (!linha) return res.status(404).json({ error: 'Raio-X não encontrado.' });
  const respostas = JSON.parse(linha.respostas || '{}');
  res.json({
    id: linha.id,
    nome: linha.nome,
    email: linha.email,
    whatsapp: linha.whatsapp,
    status: linha.status,
    etapa: linha.etapa,
    totalEtapas: ETAPAS.length,
    criadoEm: linha.created_at,
    concluidoEm: linha.concluido_em,
    consentimentoEm: linha.consentimento_em,
    // Mesmo sem concluir, mostra o painel parcial para a análise.
    resultado: linha.resultado ? JSON.parse(linha.resultado) : calcular(respostas),
    respostas: rotular(respostas),
  });
});

admin.delete('/:id', (req, res) => {
  const r = db.prepare('DELETE FROM raiox_respostas WHERE id = ?').run(req.params.id);
  if (!r.changes) return res.status(404).json({ error: 'Raio-X não encontrado.' });
  res.json({ ok: true });
});

module.exports = { publico, admin };
