// Formulário de contato do site institucional (site/). Salva a mensagem no
// banco e avisa por e-mail (SITE_CONTATO_EMAIL). Aceita JSON (fetch) e
// formulário comum (sem JavaScript), redirecionando de volta à página.
const express = require('express');
const { z } = require('zod');
const { v4: uuid } = require('uuid');
const db = require('../db');
const { sendSiteContactEmail } = require('../lib/email');

const router = express.Router();

const schema = z.object({
  nome: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  whatsapp: z.string().trim().max(30).regex(/^[\d\s()+.-]*$/).optional().default(''),
  assunto: z.string().trim().min(1).max(120),
  mensagem: z.string().trim().min(10).max(3000),
  consentimento: z.literal('sim'),
  site: z.string().optional().default(''), // honeypot: robôs preenchem
  origem: z.string().max(60).optional().default('site'),
});

// Limite simples por IP: 5 envios a cada 10 minutos.
const JANELA_MS = 10 * 60 * 1000;
const LIMITE = 5;
const envios = new Map();
function excedeuLimite(ip) {
  const agora = Date.now();
  const lista = (envios.get(ip) || []).filter((t) => agora - t < JANELA_MS);
  lista.push(agora);
  envios.set(ip, lista);
  if (envios.size > 5000) envios.clear();
  return lista.length > LIMITE;
}

function responder(req, res, status, ok) {
  if (req.is('application/json')) return res.status(status).json({ ok });
  // Volta só para um caminho do próprio site (nunca para outro domínio).
  let volta = '/contato/';
  try {
    volta = new URL(req.get('referer')).pathname || volta;
  } catch {
    /* sem referer válido */
  }
  return res.redirect(303, `${volta}?${ok ? 'enviado' : 'erro'}=1#conteudo`);
}

router.post('/contato', express.urlencoded({ extended: false, limit: '20kb' }), async (req, res) => {
  const dados = schema.safeParse(req.body || {});
  if (!dados.success) return responder(req, res, 400, false);
  // Robô: finge sucesso e descarta.
  if (dados.data.site) return responder(req, res, 201, true);
  // Railway fica atrás de proxy: o IP real vem no X-Forwarded-For.
  const ip = (req.get('x-forwarded-for') || '').split(',')[0].trim() || req.ip;
  if (excedeuLimite(ip)) return responder(req, res, 429, false);

  const d = dados.data;
  db.prepare(
    `INSERT INTO site_contacts (id, nome, email, whatsapp, assunto, mensagem, origem)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(uuid(), d.nome, d.email, d.whatsapp, d.assunto, d.mensagem, d.origem);

  try {
    await sendSiteContactEmail(d);
  } catch (err) {
    // A mensagem já está salva no banco; o erro de e-mail não perde o contato.
    console.error('Falha ao enviar e-mail do formulário do site:', err.message);
  }
  return responder(req, res, 201, true);
});

module.exports = router;
