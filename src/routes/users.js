const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { sendActivationEmail, sendManipuladoOrderEmail, manipuladoWhatsappUrl } = require('../lib/email');

const router = express.Router();

router.use(requireAuth, requireAdmin);

function activationUrl(token) {
  return `${process.env.APP_URL || 'http://localhost:3000'}/definir-senha?token=${token}`;
}

function withProducts(user) {
  const productIds = db
    .prepare('SELECT product_id FROM user_products WHERE user_id = ?')
    .all(user.id)
    .map((r) => r.product_id);
  const moduleIds = db
    .prepare('SELECT module_id FROM user_module_unlocks WHERE user_id = ?')
    .all(user.id)
    .map((r) => r.module_id);
  const { activation_token, ...rest } = user;
  return {
    ...rest,
    productIds,
    moduleIds,
    activationUrl: activation_token ? activationUrl(activation_token) : null,
  };
}

router.get('/', (req, res) => {
  const users = db
    .prepare(
      'SELECT id, name, email, role, status, activation_token, created_at FROM users ORDER BY created_at DESC'
    )
    .all();
  res.json({ users: users.map(withProducts) });
});

router.post('/', async (req, res) => {
  const { name, email, productIds, moduleIds } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'Informe nome e e-mail.' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
  if (existing) {
    return res.status(400).json({ error: 'Já existe uma conta com esse e-mail.' });
  }

  const ids = Array.isArray(productIds) ? productIds : [];
  for (const productId of ids) {
    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);
    if (!product) {
      return res.status(400).json({ error: 'Produto inválido.' });
    }
  }

  const selectedModuleIds = Array.isArray(moduleIds) ? moduleIds : [];
  const selectedModules = [];
  for (const moduleId of selectedModuleIds) {
    const mod = db.prepare('SELECT id, title FROM modules WHERE id = ?').get(moduleId);
    if (!mod) {
      return res.status(400).json({ error: 'Módulo inválido.' });
    }
    selectedModules.push(mod);
  }

  const id = uuidv4();
  const activationToken = uuidv4();
  db.prepare(
    `INSERT INTO users (id, name, email, role, status, activation_token)
     VALUES (?, ?, ?, 'client', 'pending', ?)`
  ).run(id, name, normalizedEmail, activationToken);

  const grantProduct = db.prepare('INSERT OR IGNORE INTO user_products (user_id, product_id) VALUES (?, ?)');
  ids.forEach((productId) => grantProduct.run(id, productId));

  const grantModule = db.prepare('INSERT OR IGNORE INTO user_module_unlocks (user_id, module_id) VALUES (?, ?)');
  selectedModules.forEach((mod) => grantModule.run(id, mod.id));

  try {
    await sendActivationEmail({ to: normalizedEmail, name, activationToken });
  } catch (err) {
    console.error(`Falha ao enviar e-mail de ativação para ${normalizedEmail}:`, err.message);
  }

  let manipuladoWhatsapp = null;
  if (selectedModules.length > 0) {
    const formulaTitles = selectedModules.map((mod) => mod.title);
    try {
      await sendManipuladoOrderEmail({ clientName: name, clientEmail: normalizedEmail, formulaTitles });
    } catch (err) {
      console.error(`Falha ao enviar pedido de manipulado pra farmácia (${name}):`, err.message);
    }
    manipuladoWhatsapp = manipuladoWhatsappUrl({ clientName: name, formulaTitles });
  }

  res.status(201).json({
    user: withProducts(
      db
        .prepare('SELECT id, name, email, role, status, activation_token, created_at FROM users WHERE id = ?')
        .get(id)
    ),
    manipuladoWhatsapp,
  });
});

router.post('/:userId/products/:productId', (req, res) => {
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuária não encontrada.' });
  }
  const product = db.prepare('SELECT id FROM products WHERE id = ?').get(req.params.productId);
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }
  db.prepare('INSERT OR IGNORE INTO user_products (user_id, product_id) VALUES (?, ?)').run(
    user.id,
    product.id
  );
  res.json({ ok: true });
});

router.delete('/:userId/products/:productId', (req, res) => {
  db.prepare('DELETE FROM user_products WHERE user_id = ? AND product_id = ?').run(
    req.params.userId,
    req.params.productId
  );
  res.json({ ok: true });
});

router.post('/:userId/modules/:moduleId', async (req, res) => {
  const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuária não encontrada.' });
  }
  const mod = db.prepare('SELECT id, title, kind FROM modules WHERE id = ?').get(req.params.moduleId);
  if (!mod) {
    return res.status(404).json({ error: 'Módulo não encontrado.' });
  }
  db.prepare('INSERT OR IGNORE INTO user_module_unlocks (user_id, module_id) VALUES (?, ?)').run(
    user.id,
    mod.id
  );

  let manipuladoWhatsapp = null;
  if (mod.kind === 'manipulado') {
    try {
      await sendManipuladoOrderEmail({ clientName: user.name, clientEmail: user.email, formulaTitles: [mod.title] });
    } catch (err) {
      console.error(`Falha ao enviar pedido de manipulado pra farmácia (${user.name}):`, err.message);
    }
    manipuladoWhatsapp = manipuladoWhatsappUrl({ clientName: user.name, formulaTitles: [mod.title] });
  }

  res.json({ ok: true, manipuladoWhatsapp });
});

router.delete('/:userId/modules/:moduleId', (req, res) => {
  db.prepare('DELETE FROM user_module_unlocks WHERE user_id = ? AND module_id = ?').run(
    req.params.userId,
    req.params.moduleId
  );
  res.json({ ok: true });
});

router.get('/:userId/meal-plan', (req, res) => {
  const plan = db.prepare('SELECT content, updated_at FROM meal_plans WHERE user_id = ?').get(req.params.userId);
  res.json({ content: plan?.content || '', updatedAt: plan?.updated_at || null });
});

router.put('/:userId/meal-plan', (req, res) => {
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuária não encontrada.' });
  }
  const { content } = req.body || {};
  db.prepare(
    `INSERT INTO meal_plans (user_id, content, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET content = excluded.content, updated_at = datetime('now')`
  ).run(user.id, content || '');
  res.json({ ok: true });
});

router.get('/:userId/supplements', (req, res) => {
  const plan = db.prepare('SELECT content, updated_at FROM supplement_plans WHERE user_id = ?').get(req.params.userId);
  res.json({ content: plan?.content || '', updatedAt: plan?.updated_at || null });
});

router.put('/:userId/supplements', (req, res) => {
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuária não encontrada.' });
  }
  const { content } = req.body || {};
  db.prepare(
    `INSERT INTO supplement_plans (user_id, content, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET content = excluded.content, updated_at = datetime('now')`
  ).run(user.id, content || '');
  res.json({ ok: true });
});

router.get('/:userId/tracking', (req, res) => {
  const user = db
    .prepare('SELECT id, name, email, status, created_at FROM users WHERE id = ?')
    .get(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuária não encontrada.' });
  }

  const diary = db
    .prepare('SELECT * FROM diary_entries WHERE user_id = ? ORDER BY entry_date DESC, created_at DESC')
    .all(user.id);
  const weight = db
    .prepare('SELECT * FROM weight_entries WHERE user_id = ? ORDER BY entry_date ASC')
    .all(user.id);
  const water = db
    .prepare('SELECT * FROM water_entries WHERE user_id = ? ORDER BY entry_date DESC, created_at DESC')
    .all(user.id);
  const waterGoal = db.prepare('SELECT water_goal_ml FROM users WHERE id = ?').get(user.id);

  res.json({ user, diary, weight, water, waterGoalMl: waterGoal.water_goal_ml });
});

router.post('/:userId/revoke', (req, res) => {
  const result = db
    .prepare(`UPDATE users SET status = 'inactive', updated_at = datetime('now') WHERE id = ?`)
    .run(req.params.userId);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Usuária não encontrada.' });
  }
  res.json({ ok: true });
});

router.post('/:userId/reactivate', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuária não encontrada.' });
  }
  const status = user.password_hash ? 'active' : 'pending';
  db.prepare(`UPDATE users SET status = ?, updated_at = datetime('now') WHERE id = ?`).run(status, user.id);
  res.json({ ok: true });
});

module.exports = router;
