const crypto = require('crypto');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { sendActivationEmail } = require('../lib/email');

const router = express.Router();

// A Greenn permite escolher, no painel, um token de webhook (Integração e Tokens).
// Ela pode enviá-lo como header, query string ou dentro do próprio payload —
// por isso aceitamos qualquer uma dessas formas.
function extractToken(req) {
  return (
    req.headers['x-webhook-token'] ||
    req.headers['x-greenn-token'] ||
    req.query.token ||
    req.body?.token ||
    null
  );
}

function isValidToken(token) {
  const expected = process.env.GREENN_WEBHOOK_TOKEN;
  if (!expected) return false;
  if (!token) return false;
  const a = Buffer.from(String(token));
  const b = Buffer.from(String(expected));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// O formato exato do payload deve ser conferido na conta real da Greenn
// (Configurações > Integração e Tokens > Webhook) quando for configurado em
// produção; aqui aceitamos as variações mais comuns de nomes de campo.
function extractSaleInfo(body) {
  const data = body?.data || body?.sale || body || {};
  const customer = data.customer || data.client || data.buyer || {};

  return {
    saleId: data.id || data.sale_id || data.saleId || null,
    status: data.status || body?.status || null,
    name: customer.name || customer.full_name || null,
    email: (customer.email || '').toLowerCase().trim() || null,
  };
}

router.post('/greenn', express.json(), async (req, res) => {
  const token = extractToken(req);

  if (!isValidToken(token)) {
    return res.status(401).json({ error: 'Token de webhook inválido.' });
  }

  const info = extractSaleInfo(req.body);

  db.prepare(
    'INSERT INTO greenn_events (id, sale_id, status, raw_payload) VALUES (?, ?, ?, ?)'
  ).run(uuidv4(), info.saleId, info.status, JSON.stringify(req.body));

  if (!info.email) {
    // Evento sem e-mail identificável (ex.: teste de conexão da Greenn). Apenas registramos.
    return res.json({ received: true });
  }

  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(info.email);

  if (info.status === 'paid') {
    if (existing) {
      db.prepare(
        `UPDATE users SET status = CASE WHEN password_hash IS NULL THEN 'pending' ELSE 'active' END,
         greenn_sale_id = ?, updated_at = datetime('now') WHERE id = ?`
      ).run(info.saleId, existing.id);
    } else {
      const id = uuidv4();
      const activationToken = uuidv4();
      db.prepare(
        `INSERT INTO users (id, name, email, role, status, activation_token, greenn_sale_id)
         VALUES (?, ?, ?, 'client', 'pending', ?, ?)`
      ).run(id, info.name || info.email, info.email, activationToken, info.saleId);

      try {
        await sendActivationEmail({ to: info.email, name: info.name || info.email, activationToken });
      } catch (err) {
        console.error(`Falha ao enviar e-mail de ativação para ${info.email}:`, err.message);
      }
    }
  } else if (['refunded', 'chargedback', 'refused'].includes(info.status) && existing) {
    db.prepare(
      `UPDATE users SET status = 'inactive', updated_at = datetime('now') WHERE id = ?`
    ).run(existing.id);
  }

  res.json({ received: true });
});

module.exports = router;
