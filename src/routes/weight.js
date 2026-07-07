const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const entries = db
    .prepare('SELECT * FROM weight_entries WHERE user_id = ? ORDER BY entry_date ASC')
    .all(req.user.id);
  res.json({ entries });
});

router.post('/', requireAuth, (req, res) => {
  const { entry_date, weight_kg, waist_cm, hip_cm, notes } = req.body || {};
  if (!entry_date || !weight_kg) {
    return res.status(400).json({ error: 'Informe data e peso.' });
  }

  const id = uuidv4();
  db.prepare(
    `INSERT INTO weight_entries (id, user_id, entry_date, weight_kg, waist_cm, hip_cm, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, req.user.id, entry_date, weight_kg, waist_cm || null, hip_cm || null, notes || null);

  res.status(201).json({ id });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM weight_entries WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ ok: true });
});

module.exports = router;
