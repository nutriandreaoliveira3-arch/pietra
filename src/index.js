require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const REQUIRED_ENV = ['JWT_SECRET'];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`Variável de ambiente obrigatória ausente: ${key}. Veja .env.example.`);
    process.exit(1);
  }
}

require('./db');

const authRoutes = require('./routes/auth');
const webhookRoutes = require('./routes/webhooks');
const moduleRoutes = require('./routes/modules');
const diaryRoutes = require('./routes/diary');
const weightRoutes = require('./routes/weight');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/api/webhooks', webhookRoutes);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/admin/users', userRoutes);

const webDist = path.join(__dirname, '..', 'web', 'dist');
app.use(express.static(webDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(webDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Emagrecimento Blindado rodando na porta ${PORT}`);
});
