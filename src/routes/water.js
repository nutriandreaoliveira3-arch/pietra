const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const entries = db
    .prepare('SELECT * FROM water_entries WHERE user_id = ? ORDER BY entry_date DESC, created_at DESC')
    .all(req.user.id);
  const user = db.prepare('SELECT water_goal_ml FROM users WHERE id = ?').get(req.user.id);
  res.json({ entries, goalMl: user.water_goal_ml });
});

router.post('/', requireAuth, (req, res) => {
  const { entry_date, amount_ml } = req.body || {};
  if (!entry_date || !amount_ml || amount_ml <= 0) {
    return res.status(400).json({ error: 'Informe data e quantidade.' });
  }

  const id = uuidv4();
  db.prepare('INSERT INTO water_entries (id, user_id, entry_date, amount_ml) VALUES (?, ?, ?, ?)').run(
    id,
    req.user.id,
    entry_date,
    amount_ml
  );

  res.status(201).json({ id });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM water_entries WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ ok: true });
});

router.put('/goal', requireAuth, (req, res) => {
  const { goal_ml } = req.body || {};
  if (!goal_ml || goal_ml <= 0) {
    return res.status(400).json({ error: 'Informe uma meta válida.' });
  }
  db.prepare('UPDATE users SET water_goal_ml = ? WHERE id = ?').run(goal_ml, req.user.id);
  res.json({ ok: true });
});

module.exports = router;
