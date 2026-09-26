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
const mealPlanRoutes = require('./routes/mealPlan');
const supplementRoutes = require('./routes/supplements');
const waterRoutes = require('./routes/water');
const userRoutes = require('./routes/users');
const siteContactRoutes = require('./routes/siteContact');

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
app.use('/api/meal-plan', mealPlanRoutes);
app.use('/api/supplements', supplementRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/site', siteContactRoutes);

const LANDING_HOSTS = new Set(['emagrecimentoblindado.com.br', 'www.emagrecimentoblindado.com.br']);
const landingDir = path.join(__dirname, '..', 'landing-pages', 'emagrecimento-blindado-elite');
const landingStatic = express.static(landingDir);

app.use((req, res, next) => {
  if (!LANDING_HOSTS.has(req.hostname)) return next();
  landingStatic(req, res, () => res.status(404).send('Página não encontrada.'));
});

// Site institucional (site/, gerado por `node site/build.mjs`).
// - Nos domínios listados em SITE_HOSTS (ex.: "andreaaugustodeoliveira.com.br,www.andreaaugustodeoliveira.com.br"),
//   o site ocupa o domínio inteiro.
// - Em qualquer domínio, fica disponível para conferência em /site-previa/ (sem indexação no Google).
const SITE_HOSTS = new Set(
  (process.env.SITE_HOSTS || '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean),
);
const siteDir = path.join(__dirname, '..', 'site', 'dist');
const siteStatic = express.static(siteDir, { maxAge: '1h' });
const site404 = (req, res) => res.status(404).sendFile(path.join(siteDir, '404.html'));

app.use((req, res, next) => {
  if (!SITE_HOSTS.has(req.hostname) || req.path.startsWith('/api/')) return next();
  // Domínio sem "www" → versão com "www" (um endereço só para o Google).
  const comWww = `www.${req.hostname}`;
  if (!req.hostname.startsWith('www.') && SITE_HOSTS.has(comWww)) {
    return res.redirect(301, `https://${comWww}${req.originalUrl}`);
  }
  siteStatic(req, res, () => site404(req, res));
});
app.use(
  '/site-previa',
  (req, res, next) => {
    res.set('X-Robots-Tag', 'noindex, nofollow');
    next();
  },
  siteStatic,
  site404,
);

const webDist = path.join(__dirname, '..', 'web', 'dist');
app.use(express.static(webDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(webDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Emagrecimento Blindado rodando na porta ${PORT}`);
});
