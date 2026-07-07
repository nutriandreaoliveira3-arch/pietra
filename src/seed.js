require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const db = require('./db');

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

const devEmail = process.env.SEED_ADMIN_EMAIL;
const devPassword = process.env.SEED_ADMIN_PASSWORD;
if (devEmail && devPassword) {
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(devEmail);
  if (!existingUser) {
    db.prepare(
      `INSERT INTO users (id, name, email, password_hash, role, status)
       VALUES (?, ?, ?, ?, 'admin', 'active')`
    ).run(uuidv4(), 'Admin', devEmail, bcrypt.hashSync(devPassword, 10));
    console.log(`Usuário admin criado: ${devEmail}`);
  } else {
    console.log('Usuário admin já existe, ignorado.');
  }
}
