const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const entries = db
    .prepare('SELECT * FROM diary_entries WHERE user_id = ? ORDER BY entry_date DESC, created_at DESC')
    .all(req.user.id);
  res.json({ entries });
});

router.post('/', requireAuth, (req, res) => {
  const { entry_date, meal, description } = req.body || {};
  if (!entry_date || !meal || !description) {
    return res.status(400).json({ error: 'Informe data, refeição e descrição.' });
  }

  const id = uuidv4();
  db.prepare(
    'INSERT INTO diary_entries (id, user_id, entry_date, meal, description) VALUES (?, ?, ?, ?, ?)'
  ).run(id, req.user.id, entry_date, meal, description);

  res.status(201).json({ id });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM diary_entries WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ ok: true });
});

module.exports = router;
