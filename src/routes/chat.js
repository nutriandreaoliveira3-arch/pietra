const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Anthropic = require('@anthropic-ai/sdk');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');
const { BLIM_SYSTEM_PROMPT } = require('../lib/blim');

const router = express.Router();
const anthropic = new Anthropic();

const CHAT_MODEL = 'claude-opus-4-8';
const HISTORY_LIMIT = 20;

router.get('/', requireAuth, (req, res) => {
  const messages = db
    .prepare('SELECT * FROM chat_messages WHERE user_id = ? ORDER BY created_at ASC')
    .all(req.user.id);
  res.json({ messages });
});

router.post('/', requireAuth, async (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Informe uma mensagem.' });
  }

  const history = db
    .prepare('SELECT role, content FROM chat_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT ?')
    .all(req.user.id, HISTORY_LIMIT)
    .reverse();

  db.prepare(
    'INSERT INTO chat_messages (id, user_id, role, content) VALUES (?, ?, ?, ?)'
  ).run(uuidv4(), req.user.id, 'user', message);

  try {
    const response = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: 2048,
      system: BLIM_SYSTEM_PROMPT,
      thinking: { type: 'adaptive' },
      output_config: { effort: 'medium' },
      messages: [...history, { role: 'user', content: message }],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    const reply = textBlock ? textBlock.text : '';

    db.prepare(
      'INSERT INTO chat_messages (id, user_id, role, content) VALUES (?, ?, ?, ?)'
    ).run(uuidv4(), req.user.id, 'assistant', reply);

    res.json({ reply });
  } catch (err) {
    res.status(502).json({ error: 'Não foi possível falar com a BLIM agora. Tente novamente.' });
  }
});

module.exports = router;
