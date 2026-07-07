const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const modules = db.prepare('SELECT * FROM modules ORDER BY sort_order').all();
  const lessons = db.prepare('SELECT * FROM lessons ORDER BY sort_order').all();
  const completed = new Set(
    db.prepare('SELECT lesson_id FROM lesson_progress WHERE user_id = ?').all(req.user.id).map((r) => r.lesson_id)
  );

  const result = modules.map((mod) => ({
    ...mod,
    lessons: lessons
      .filter((l) => l.module_id === mod.id)
      .map((l) => ({ ...l, completed: completed.has(l.id) })),
  }));

  res.json({ modules: result });
});

router.post('/lessons/:lessonId/complete', requireAuth, (req, res) => {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.lessonId);
  if (!lesson) {
    return res.status(404).json({ error: 'Aula não encontrada.' });
  }

  db.prepare(
    'INSERT OR IGNORE INTO lesson_progress (user_id, lesson_id) VALUES (?, ?)'
  ).run(req.user.id, lesson.id);

  res.json({ ok: true });
});

module.exports = router;
