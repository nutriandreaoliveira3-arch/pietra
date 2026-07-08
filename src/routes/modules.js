const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

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

router.post('/', requireAuth, requireAdmin, (req, res) => {
  const { title, description } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: 'Informe o título do módulo.' });
  }

  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), -1) AS max FROM modules').get().max;
  const id = uuidv4();
  db.prepare('INSERT INTO modules (id, title, description, sort_order) VALUES (?, ?, ?, ?)').run(
    id,
    title,
    description || '',
    maxOrder + 1
  );

  res.status(201).json({ module: db.prepare('SELECT * FROM modules WHERE id = ?').get(id) });
});

router.put('/:moduleId', requireAuth, requireAdmin, (req, res) => {
  const mod = db.prepare('SELECT * FROM modules WHERE id = ?').get(req.params.moduleId);
  if (!mod) {
    return res.status(404).json({ error: 'Módulo não encontrado.' });
  }

  const { title, description } = req.body || {};
  db.prepare('UPDATE modules SET title = ?, description = ? WHERE id = ?').run(
    title ?? mod.title,
    description ?? mod.description,
    mod.id
  );

  res.json({ module: db.prepare('SELECT * FROM modules WHERE id = ?').get(mod.id) });
});

router.delete('/:moduleId', requireAuth, requireAdmin, (req, res) => {
  const result = db.prepare('DELETE FROM modules WHERE id = ?').run(req.params.moduleId);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Módulo não encontrado.' });
  }
  res.json({ ok: true });
});

router.post('/:moduleId/lessons', requireAuth, requireAdmin, (req, res) => {
  const mod = db.prepare('SELECT * FROM modules WHERE id = ?').get(req.params.moduleId);
  if (!mod) {
    return res.status(404).json({ error: 'Módulo não encontrado.' });
  }

  const { title, content, video_url } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: 'Informe o título da aula.' });
  }

  const maxOrder = db
    .prepare('SELECT COALESCE(MAX(sort_order), -1) AS max FROM lessons WHERE module_id = ?')
    .get(mod.id).max;
  const id = uuidv4();
  db.prepare(
    'INSERT INTO lessons (id, module_id, title, content, video_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(id, mod.id, title, content || '', video_url || null, maxOrder + 1);

  res.status(201).json({ lesson: db.prepare('SELECT * FROM lessons WHERE id = ?').get(id) });
});

router.put('/lessons/:lessonId', requireAuth, requireAdmin, (req, res) => {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.lessonId);
  if (!lesson) {
    return res.status(404).json({ error: 'Aula não encontrada.' });
  }

  const { title, content, video_url } = req.body || {};
  db.prepare('UPDATE lessons SET title = ?, content = ?, video_url = ? WHERE id = ?').run(
    title ?? lesson.title,
    content ?? lesson.content,
    video_url === undefined ? lesson.video_url : video_url,
    lesson.id
  );

  res.json({ lesson: db.prepare('SELECT * FROM lessons WHERE id = ?').get(lesson.id) });
});

router.delete('/lessons/:lessonId', requireAuth, requireAdmin, (req, res) => {
  const result = db.prepare('DELETE FROM lessons WHERE id = ?').run(req.params.lessonId);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Aula não encontrada.' });
  }
  res.json({ ok: true });
});

module.exports = router;
