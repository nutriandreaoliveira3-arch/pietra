const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const plan = db.prepare('SELECT content, updated_at FROM meal_plans WHERE user_id = ?').get(req.user.id);
  res.json({ content: plan?.content || '', updatedAt: plan?.updated_at || null });
});

module.exports = router;
