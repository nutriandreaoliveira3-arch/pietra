require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const db = require('./db');

// Nomes precisam bater (ao menos por substring, veja matchProduct em
// src/routes/webhooks.js) com o nome do produto configurado na Greenn, senão
// o webhook não consegue liberar/revogar o protocolo certo automaticamente.
const products = [
  { key: 'emagrecimento_blindado', name: 'Reset Blindado' },
  { key: 'ativacao_metabolica', name: 'Protocolo Emagrecimento Metabólico' },
  { key: 'destravando_hormonios', name: 'Protocolo Emagrecimento Hormonal' },
  { key: 'jejum_intermitente', name: 'Jejum Intermitente' },
  { key: 'canetas_turbo', name: 'Protocolo Turbo das Canetas Emagrecedoras' },
  { key: 'app_blindada', name: 'APP - BLINDADA' },
  { key: 'blin_assistente_virtual', name: 'BLIN - Assistente Virtual Educativa da Blindada' },
  { key: 'suplementacao_ativacao_metabolica', name: 'Suplementação Ativação Metabólica' },
  { key: 'suplementacao_modulacao_intestinal', name: 'Suplementação Blindada Modulação Intestinal' },
  { key: 'suplementacao_antioxidante_antiinflamatoria', name: 'Suplementação Antioxidante Anti-inflamatória' },
  { key: 'suplementacao_ansiedade_compulsao_glp1', name: 'Suplementação Ansiedade e Compulsão GLP-1' },
  { key: 'suplementacao_termogenica', name: 'Suplementação Termogênica' },
  // Nome sem sufixo casa por aproximação com "Editor de Vídeo Blindado Pró"
  // também (matchProduct em src/routes/webhooks.js), então um cadastro só
  // libera as duas versões vendidas na Greenn.
  { key: 'editor_video_blindado', name: 'Editor de Vídeo Blindado' },
];

const insertProduct = db.prepare(
  'INSERT INTO products (id, key, name, sort_order) VALUES (?, ?, ?, ?)'
);
const updateProduct = db.prepare('UPDATE products SET name = ?, sort_order = ? WHERE key = ?');
products.forEach((product, index) => {
  const existing = db.prepare('SELECT id FROM products WHERE key = ?').get(product.key);
  if (existing) {
    updateProduct.run(product.name, index, product.key);
  } else {
    insertProduct.run(uuidv4(), product.key, product.name, index);
  }
});
console.log(`Produtos verificados: ${products.length}.`);

const modules = [
  {
    title: 'Boas-vindas ao Emagrecimento Blindado',
    description: 'Como funciona o protocolo e o que esperar das próximas semanas.',
    lessons: [
      { title: 'Bem-vinda ao Emagrecimento Blindado', content: 'Introdução ao protocolo, expectativas e como navegar pelo app.' },
      { title: 'Como usar o diário alimentar', content: 'Passo a passo para registrar suas refeições e acompanhar sua evolução.' },
    ],
  },
  {
    title: 'Metabolismo e comportamento alimentar',
    description: 'A base científica por trás do emagrecimento depois dos 35.',
    lessons: [
      { title: 'Seu metabolismo não está quebrado', content: 'Por que o metabolismo desacelera com a idade e como reorganizá-lo.' },
      { title: 'Fome emocional x fome física', content: 'Como identificar e lidar com a fome emocional sem culpa.' },
      { title: 'Cortisol, estresse e ganho de peso', content: 'A relação entre estresse crônico, cortisol e retenção de gordura abdominal.' },
    ],
  },
  {
    title: 'Proteína, massa muscular e jejum',
    description: 'Estratégias práticas para preservar massa muscular durante o emagrecimento.',
    lessons: [
      { title: 'Por que a proteína é prioridade depois dos 35', content: 'O papel da proteína na preservação de massa muscular e saciedade.' },
      { title: 'Jejum intermitente: para quem funciona', content: 'Quando o jejum ajuda e quando pode atrapalhar seus objetivos.' },
    ],
  },
  {
    title: 'GLP-1, Mounjaro e Ozempic',
    description: 'O que saber sobre os medicamentos para emagrecimento e como potencializar os resultados.',
    lessons: [
      { title: 'Como os medicamentos GLP-1 funcionam', content: 'Mecanismo de ação e o que esperar durante o tratamento.' },
      { title: 'O que fazer depois da caneta', content: 'Como manter os resultados e preservar massa muscular no pós-tratamento.' },
    ],
  },
  {
    title: 'Menopausa e saúde metabólica',
    description: 'Emagrecimento inteligente durante a perimenopausa e menopausa.',
    lessons: [
      { title: 'O que muda no corpo na menopausa', content: 'Alterações hormonais e seus efeitos no metabolismo e na composição corporal.' },
      { title: 'Suplementação estratégica', content: 'Quais suplementos têm evidência para essa fase da vida.' },
    ],
  },
];

const insertModule = db.prepare(
  'INSERT INTO modules (id, title, description, sort_order) VALUES (?, ?, ?, ?)'
);
const insertLesson = db.prepare(
  'INSERT INTO lessons (id, module_id, title, content, sort_order) VALUES (?, ?, ?, ?, ?)'
);

const existingModules = db.prepare('SELECT COUNT(*) AS count FROM modules').get();
if (existingModules.count === 0) {
  modules.forEach((mod, modIndex) => {
    const moduleId = uuidv4();
    insertModule.run(moduleId, mod.title, mod.description, modIndex);
    mod.lessons.forEach((lesson, lessonIndex) => {
      insertLesson.run(uuidv4(), moduleId, lesson.title, lesson.content, lessonIndex);
    });
  });
  console.log(`Seed de conteúdo criado: ${modules.length} módulos.`);
} else {
  console.log('Módulos já existem, seed de conteúdo ignorado.');
}

// Independente do bloco acima (que só roda em banco vazio) — cria o módulo
// do Editor de Vídeo Blindado se ainda não existir, vinculado ao produto
// correspondente, com um link pra ferramenta (que roda separada, em
// video.blindadokp.com.br). Idempotente: roda em todo start, mas só insere
// uma vez.
const editorVideoProduct = db.prepare('SELECT id FROM products WHERE key = ?').get('editor_video_blindado');
const editorVideoModule = db.prepare('SELECT id FROM modules WHERE title = ?').get('Editor de Vídeo Blindado');
if (editorVideoProduct && !editorVideoModule) {
  const moduleId = uuidv4();
  const nextSortOrder = db.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM modules').get().next;
  db.prepare(
    'INSERT INTO modules (id, title, description, product_id, sort_order, kind) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(
    moduleId,
    'Editor de Vídeo Blindado',
    'Grave 1 vídeo e exporte pronto em todos os formatos — Stories, Reels, Post, TikTok, LinkedIn, YouTube e YouTube Shorts.',
    editorVideoProduct.id,
    nextSortOrder,
    'bonus'
  );
  db.prepare(
    'INSERT INTO lessons (id, module_id, title, content, video_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(
    uuidv4(),
    moduleId,
    'Como acessar o Editor de Vídeo Blindado',
    'O Editor de Vídeo Blindado é uma ferramenta própria: você grava 1 vídeo e ele exporta pronto em vários formatos, já com legenda automática, transição, corte de silêncio, e espaço pra foto, logotipo e música da sua marca. Clique no link abaixo pra abrir.',
    'https://video.blindadokp.com.br',
    0
  );
  console.log('Módulo "Editor de Vídeo Blindado" criado.');
}

const devEmail = process.env.SEED_ADMIN_EMAIL;
const devPassword = process.env.SEED_ADMIN_PASSWORD;
if (devEmail && devPassword) {
  const normalizedDevEmail = devEmail.toLowerCase().trim();
  const existingUser = db.prepare('SELECT id, role, status FROM users WHERE email = ?').get(normalizedDevEmail);
  if (!existingUser) {
    db.prepare(
      `INSERT INTO users (id, name, email, password_hash, role, status)
       VALUES (?, ?, ?, ?, 'admin', 'active')`
    ).run(uuidv4(), 'Admin', normalizedDevEmail, bcrypt.hashSync(devPassword, 10));
    console.log(`Usuário admin criado: ${normalizedDevEmail}`);
  } else if (existingUser.role !== 'admin' || existingUser.status !== 'active') {
    // A conta já existia (ex: criada antes de SEED_ADMIN_EMAIL estar configurada, ou via
    // Admin → Clientes/Greenn) — promove pra admin sem mexer na senha já cadastrada.
    db.prepare("UPDATE users SET role = 'admin', status = 'active' WHERE id = ?").run(existingUser.id);
    console.log(`Usuário existente promovido a admin: ${normalizedDevEmail}`);
  } else {
    console.log('Usuário admin já existe, ignorado.');
  }
}
