// Raio-X 360º do Emagrecimento™ — definição do questionário.
//
// Este arquivo é a fonte única das perguntas: o backend usa para validar e
// calcular o resultado (src/lib/raiox.js) e o gerador do site publica uma
// cópia em JSON para o questionário do navegador (site/build.mjs).
//
// Regras editoriais (não quebrar):
// - Não é diagnóstico, exame, avaliação psicológica nem promessa de resultado.
// - Linguagem cuidadosa: "seu relato sugere", "ponto de atenção", "pode estar
//   contribuindo", "merece investigação". Nunca afirmar metabolismo lento,
//   hormônios desregulados, cortisol alto, resistência à insulina, intestino
//   inflamado ou compulsão.
// - Nada de prescrição automática nem recomendação médica.
//
// Tipos de pergunta: radio, checkbox, escala (0 a 10), numero, texto, textarea.
// Pontuação: `p` soma pontos de "atenção" em cada dimensão (0 = favorável).
// Em checkbox, `teto` limita quantos pontos a pergunta soma por dimensão.
// Em escala, `dim` + `inverso` (10 = favorável) + `peso`.

const DIMENSOES = [
  { id: 'alimentacao', nome: 'Alimentação' },
  { id: 'fome', nome: 'Fome e saciedade' },
  { id: 'comportamento', nome: 'Comportamento alimentar' },
  { id: 'sono', nome: 'Sono' },
  { id: 'estresse', nome: 'Estresse' },
  { id: 'rotina', nome: 'Rotina' },
  { id: 'ambiente', nome: 'Ambiente social' },
  { id: 'atividade', nome: 'Atividade física' },
  { id: 'musculo', nome: 'Massa muscular' },
  { id: 'intestino', nome: 'Intestino' },
  { id: 'hormonal', nome: 'Fase hormonal' },
  { id: 'organizacao', nome: 'Organização' },
  { id: 'adesao', nome: 'Adesão' },
  { id: 'historico', nome: 'Histórico de dietas' },
  { id: 'prontidao', nome: 'Prontidão para mudança' },
];

// Do mais leve ao que pede mais cuidado. Não são diagnósticos.
const STATUS = [
  { id: 'favoravel', nome: 'Favorável', ate: 0.25 },
  { id: 'atencao', nome: 'Atenção', ate: 0.45 },
  { id: 'estrategia', nome: 'Precisa de estratégia', ate: 0.65 },
  { id: 'prioridade', nome: 'Prioridade', ate: Infinity },
];

// Dimensões de contexto: aparecem no painel, mas não entram nas 3 prioridades
// (são fatores a considerar, não pontos "a trabalhar").
const CONTEXTO = ['hormonal', 'historico'];

// Desempate na escolha das 3 prioridades.
const ORDEM_PRIORIDADE = [
  'comportamento', 'sono', 'estresse', 'organizacao', 'fome', 'alimentacao', 'musculo',
  'rotina', 'adesao', 'ambiente', 'atividade', 'intestino', 'prontidao', 'historico', 'hormonal',
];

// Textos do resultado, por dimensão.
const TEXTOS = {
  alimentacao: {
    forte: 'boa base na qualidade da alimentação',
    perfil: 'a qualidade das escolhas alimentares no dia a dia',
    foco: 'qualidade alimentar',
    prioridade: 'Há espaço para aumentar alimentos in natura e reduzir ultraprocessados e bebidas açucaradas, de forma gradual e possível para a sua rotina.',
  },
  fome: {
    forte: 'fome e saciedade equilibradas no relato',
    perfil: 'a fome e a saciedade ao longo do dia',
    foco: 'saciedade',
    prioridade: 'Ajustar a composição e os intervalos das refeições pode ajudar você a chegar às refeições com a fome mais controlada.',
  },
  comportamento: {
    forte: 'uma relação tranquila com a comida',
    perfil: 'episódios de comer por emoção, culpa ou pensamento de “tudo ou nada”',
    foco: 'uma relação mais tranquila com a comida',
    prioridade: 'Seu relato sugere que emoções, culpa ou o pensamento de “tudo ou nada” podem estar contribuindo para os recomeços. Esse ponto merece atenção cuidadosa.',
  },
  sono: {
    forte: 'sono sem grandes queixas',
    perfil: 'a qualidade do sono e da recuperação',
    foco: 'sono e recuperação',
    prioridade: 'O descanso pode estar interferindo na fome, na energia e na constância. Vale olhar para os horários e para a rotina da noite.',
  },
  estresse: {
    forte: 'estresse sob controle no momento',
    perfil: 'o nível de estresse e de carga mental',
    foco: 'estratégias para dias de estresse',
    prioridade: 'O estresse foi identificado como ponto de atenção. Estratégias que caibam nos dias difíceis tendem a funcionar melhor do que planos rígidos.',
  },
  rotina: {
    forte: 'uma rotina que abre espaço para mudanças',
    perfil: 'uma rotina corrida ou imprevisível',
    foco: 'flexibilidade para a rotina real',
    prioridade: 'A estratégia precisa ser flexível para dias imprevisíveis, com opções práticas e planos alternativos já pensados.',
  },
  ambiente: {
    forte: 'um ambiente que favorece as suas escolhas',
    perfil: 'o ambiente social e familiar',
    foco: 'estratégias para situações sociais',
    prioridade: 'Eventos, pessoas e alimentos disponíveis em casa parecem influenciar suas escolhas. Planejar essas situações faz parte da estratégia.',
  },
  atividade: {
    forte: 'movimento presente no dia a dia',
    perfil: 'o pouco espaço para o movimento no dia a dia',
    foco: 'movimento possível',
    prioridade: 'Incluir atividade física de forma compatível com a sua rotina é um passo importante, começando pelo que for sustentável.',
  },
  musculo: {
    forte: 'bom cuidado com a massa muscular',
    perfil: 'a ingestão de proteína e o estímulo à massa muscular',
    foco: 'proteína e força',
    prioridade: 'Proteína bem distribuída e treino de força são fatores importantes para preservar a massa muscular durante o emagrecimento.',
  },
  intestino: {
    forte: 'bom funcionamento intestinal relatado',
    perfil: 'os sintomas digestivos relatados',
    foco: 'cuidado com o intestino',
    prioridade: 'Os sintomas digestivos relatados merecem investigação. Fibras, água e regularidade podem ajudar, e alguns sinais pedem avaliação médica.',
  },
  hormonal: {
    forte: '',
    perfil: 'as mudanças da sua fase hormonal',
    foco: 'uma estratégia adequada à sua fase de vida',
    prioridade: 'Sua fase de vida é um fator importante dentro do seu contexto e deve ser considerada na construção da estratégia.',
  },
  organizacao: {
    forte: 'boa organização da alimentação',
    perfil: 'a organização e o planejamento da alimentação',
    foco: 'organização',
    prioridade: 'Uma estrutura simples de planejamento (compras, refeições-base e opções para dias corridos) pode reduzir as decisões de última hora.',
  },
  adesao: {
    forte: 'boa capacidade de manter constância',
    perfil: 'a dificuldade de manter constância',
    foco: 'metas pequenas e sustentáveis',
    prioridade: 'Começar com poucas mudanças, bem escolhidas, tende a funcionar melhor do que tentar mudar tudo de uma vez.',
  },
  historico: {
    forte: 'um histórico sem muitos recomeços',
    perfil: 'o histórico de dietas restritivas e recomeços',
    foco: 'uma abordagem sem restrições extremas',
    prioridade: 'As tentativas anteriores deixaram aprendizados e também desgaste. A estratégia deve evitar repetir o que não funcionou para você.',
  },
  prontidao: {
    forte: 'boa prontidão para mudar',
    perfil: 'expectativas de prazo ou pouca disponibilidade para mudar agora',
    foco: 'expectativas realistas',
    prioridade: 'Alinhar prazos e metas realistas ajuda a evitar frustração e abandono no meio do caminho.',
  },
};

const ETAPAS = [
  // ------------------------------------------------------------------ 1
  {
    id: 'historico',
    titulo: 'Seu histórico com o peso',
    intro: 'Entender o que você já viveu evita repetir o que não funcionou.',
    perguntas: [
      {
        id: 'h_idade', tipo: 'radio', rotulo: 'Qual é a sua faixa de idade?',
        opcoes: [
          { v: '18-34', t: '18 a 34 anos' }, { v: '35-44', t: '35 a 44 anos' },
          { v: '45-54', t: '45 a 54 anos' }, { v: '55-64', t: '55 a 64 anos' }, { v: '65+', t: '65 anos ou mais' },
        ],
      },
      { id: 'h_peso_atual', tipo: 'numero', rotulo: 'Peso atual (kg)', ajuda: 'Opcional. Informe só se souber e se se sentir à vontade.', min: 30, max: 350, obrigatoria: false },
      {
        id: 'h_inicio', tipo: 'radio', rotulo: 'Em que momento da vida você começou a ganhar peso?',
        opcoes: [
          { v: 'infancia', t: 'Na infância ou adolescência' },
          { v: 'adulta', t: 'No início da vida adulta' },
          { v: 'gestacao', t: 'Depois de gestação(ões)' },
          { v: 'rotina', t: 'Depois de uma mudança de rotina ou trabalho' },
          { v: 'menopausa', t: 'Na perimenopausa ou menopausa', p: { hormonal: 1 } },
          { v: 'evento', t: 'Depois de um período de estresse ou perda' },
          { v: 'nao_sei', t: 'Não sei dizer' },
        ],
      },
      {
        id: 'h_sanfona', tipo: 'radio', rotulo: 'Seu peso já subiu e desceu várias vezes ao longo dos anos (efeito sanfona)?',
        opcoes: [
          { v: 'nao', t: 'Não' },
          { v: 'poucas', t: 'Uma ou duas vezes', p: { historico: 1 } },
          { v: 'muitas', t: 'Muitas vezes', p: { historico: 2 } },
        ],
      },
      {
        id: 'h_tentativas', tipo: 'radio', rotulo: 'Quantas tentativas de emagrecimento você já fez?',
        opcoes: [
          { v: '0', t: 'Nenhuma' }, { v: '1-2', t: '1 ou 2' },
          { v: '3-5', t: '3 a 5', p: { historico: 1 } }, { v: '6+', t: 'Mais de 5', p: { historico: 2 } },
        ],
      },
      {
        id: 'h_metodos', tipo: 'checkbox', rotulo: 'O que você já tentou para emagrecer?', ajuda: 'Marque tudo o que se aplica.',
        teto: { historico: 2 }, obrigatoria: false,
        opcoes: [
          { v: 'restritiva', t: 'Dietas muito restritivas', p: { historico: 1 } },
          { v: 'lowcarb', t: 'Low carb' },
          { v: 'cetogenica', t: 'Dieta cetogênica' },
          { v: 'jejum', t: 'Jejum intermitente' },
          { v: 'calorias', t: 'Contagem de calorias' },
          { v: 'apps', t: 'Aplicativos' },
          { v: 'medicamentos', t: 'Medicamentos prescritos para emagrecer' },
          { v: 'glp1', t: 'Canetas GLP-1 com prescrição médica' },
          { v: 'sem_prescricao', t: 'Medicamentos ou canetas sem acompanhamento médico', p: { historico: 1 } },
          { v: 'nutricionista', t: 'Acompanhamento com nutricionista' },
          { v: 'academia', t: 'Academia' },
          { v: 'personal', t: 'Personal trainer' },
          { v: 'internet', t: 'Protocolos ou desafios da internet', p: { historico: 1 } },
          { v: 'suplementos', t: 'Suplementos' },
          { v: 'nunca', t: 'Nunca tentei', exclusiva: true },
        ],
      },
      {
        id: 'h_duracao', tipo: 'radio', rotulo: 'Em geral, por quanto tempo você conseguiu manter essas estratégias?',
        opcoes: [
          { v: '<2sem', t: 'Menos de 2 semanas', p: { historico: 2, adesao: 1 } },
          { v: '2sem-2m', t: 'De 2 semanas a 2 meses', p: { historico: 1, adesao: 1 } },
          { v: '2-6m', t: 'De 2 a 6 meses', p: { historico: 1 } },
          { v: '6m+', t: 'Mais de 6 meses' },
          { v: 'na', t: 'Não se aplica' },
        ],
      },
      { id: 'h_funcionou', tipo: 'textarea', rotulo: 'O que funcionou, mesmo que temporariamente?', obrigatoria: false },
      {
        id: 'h_desistiu', tipo: 'checkbox', rotulo: 'O que fez você desistir das estratégias anteriores?', obrigatoria: false,
        teto: { fome: 1, historico: 1, rotina: 1, ambiente: 1, comportamento: 1, prontidao: 1, adesao: 1, sono: 1 },
        opcoes: [
          { v: 'fome', t: 'Fome', p: { fome: 1 } },
          { v: 'restricao', t: 'Cardápio muito restrito ou difícil de seguir', p: { historico: 1 } },
          { v: 'tempo', t: 'Falta de tempo', p: { rotina: 1 } },
          { v: 'eventos', t: 'Eventos e fins de semana', p: { ambiente: 1 } },
          { v: 'emocoes', t: 'Ansiedade ou emoções', p: { comportamento: 1 } },
          { v: 'lento', t: 'O resultado parecia lento', p: { prontidao: 1 } },
          { v: 'sozinha', t: 'Falta de acompanhamento', p: { adesao: 1 } },
          { v: 'cansaco', t: 'Cansaço', p: { sono: 1 } },
          { v: 'custo', t: 'Custo' },
          { v: 'efeitos', t: 'Efeitos colaterais' },
          { v: 'na', t: 'Não se aplica', exclusiva: true },
        ],
      },
      { id: 'h_nao_repetir', tipo: 'texto', rotulo: 'O que você não gostaria de repetir?', obrigatoria: false },
      {
        id: 'h_manter', tipo: 'radio', rotulo: 'O que mais dificultou manter o resultado depois?',
        opcoes: [
          { v: 'habitos', t: 'Voltei aos hábitos antigos', p: { adesao: 1 } },
          { v: 'sem_manutencao', t: 'Não houve uma fase de manutenção', p: { historico: 1 } },
          { v: 'rotina', t: 'Minha rotina mudou', p: { rotina: 1 } },
          { v: 'emocoes', t: 'Questões emocionais', p: { comportamento: 1 } },
          { v: 'nunca_cheguei', t: 'Nunca cheguei ao resultado', p: { historico: 1 } },
          { v: 'na', t: 'Não se aplica' },
        ],
      },
      { id: 'h_maior_peso', tipo: 'numero', rotulo: 'Maior peso que você já atingiu (kg)', min: 30, max: 350, obrigatoria: false, ajuda: 'Opcional.' },
      { id: 'h_menor_peso', tipo: 'numero', rotulo: 'Menor peso adulto que você manteve se sentindo bem (kg)', min: 30, max: 350, obrigatoria: false, ajuda: 'Opcional.' },
    ],
  },
  // ------------------------------------------------------------------ 2
  {
    id: 'alimentacao',
    titulo: 'Sua alimentação hoje',
    intro: 'Sem julgamentos: o objetivo é retratar a sua rotina real, não a ideal.',
    perguntas: [
      {
        id: 'a_refeicoes', tipo: 'radio', rotulo: 'Quantas refeições você faz por dia, em média?',
        opcoes: [
          { v: '1-2', t: '1 ou 2', p: { alimentacao: 1, fome: 1 } },
          { v: '3', t: '3' }, { v: '4-5', t: '4 ou 5' },
          { v: 'belisco', t: 'Não tenho horários, belisco ao longo do dia', p: { organizacao: 1, comportamento: 1 } },
        ],
      },
      {
        id: 'a_cafe', tipo: 'radio', rotulo: 'Você toma café da manhã?',
        opcoes: [{ v: 'sempre', t: 'Quase todos os dias' }, { v: 'as_vezes', t: 'Às vezes' }, { v: 'nunca', t: 'Quase nunca' }],
      },
      {
        id: 'a_jejum_longo', tipo: 'radio', rotulo: 'Você costuma ficar mais de 5 horas sem comer durante o dia e chegar com muita fome à refeição seguinte?',
        opcoes: [
          { v: 'nunca', t: 'Raramente' },
          { v: 'as_vezes', t: 'Às vezes', p: { fome: 1 } },
          { v: 'frequente', t: 'Com frequência', p: { fome: 2, organizacao: 1 } },
        ],
      },
      {
        id: 'a_proteina', tipo: 'radio', rotulo: 'Em quantas refeições do dia você inclui uma fonte de proteína?',
        ajuda: 'Carnes, ovos, peixes, laticínios, leguminosas, tofu.',
        opcoes: [
          { v: 'quase_todas', t: 'Em quase todas' },
          { v: 'duas', t: 'Em duas', p: { musculo: 1 } },
          { v: 'uma', t: 'Em uma ou nenhuma', p: { musculo: 2, fome: 1 } },
        ],
      },
      {
        id: 'a_vegetais', tipo: 'radio', rotulo: 'Com que frequência você come verduras e legumes?',
        opcoes: [
          { v: '2+', t: 'Duas vezes ao dia ou mais' },
          { v: '1', t: 'Uma vez ao dia', p: { alimentacao: 1 } },
          { v: 'raro', t: 'Raramente', p: { alimentacao: 2, intestino: 1 } },
        ],
      },
      {
        id: 'a_frutas', tipo: 'radio', rotulo: 'E frutas?',
        opcoes: [{ v: '2+', t: 'Duas por dia ou mais' }, { v: '1', t: 'Uma por dia' }, { v: 'raro', t: 'Raramente', p: { alimentacao: 1 } }],
      },
      {
        id: 'a_agua', tipo: 'radio', rotulo: 'Quanta água você bebe por dia?',
        opcoes: [
          { v: '<1', t: 'Menos de 1 litro', p: { alimentacao: 1, intestino: 1 } },
          { v: '1-2', t: 'De 1 a 2 litros' }, { v: '2+', t: 'Mais de 2 litros' }, { v: 'nao_sei', t: 'Não sei' },
        ],
      },
      {
        id: 'a_doces', tipo: 'radio', rotulo: 'Com que frequência você come doces?',
        opcoes: [
          { v: 'raro', t: 'Raramente' }, { v: 'semana', t: 'Algumas vezes na semana' },
          { v: 'dia', t: 'Quase todos os dias', p: { alimentacao: 1, comportamento: 1 } },
          { v: 'varias', t: 'Mais de uma vez por dia', p: { alimentacao: 2, comportamento: 1 } },
        ],
      },
      {
        id: 'a_bebidas', tipo: 'radio', rotulo: 'Refrigerantes, sucos adoçados ou outras bebidas açucaradas:',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'semana', t: 'Algumas vezes na semana', p: { alimentacao: 1 } }, { v: 'dia', t: 'Todos os dias', p: { alimentacao: 2 } }],
      },
      {
        id: 'a_ultra', tipo: 'radio', rotulo: 'Salgadinhos, biscoitos recheados, congelados prontos ou embutidos:',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'semana', t: 'Algumas vezes na semana', p: { alimentacao: 1 } }, { v: 'dia', t: 'Quase todos os dias', p: { alimentacao: 2 } }],
      },
      {
        id: 'a_fora', tipo: 'radio', rotulo: 'Quantas refeições por semana são fora de casa ou por delivery?',
        opcoes: [{ v: '0-2', t: 'De 0 a 2' }, { v: '3-5', t: 'De 3 a 5', p: { organizacao: 1 } }, { v: '6+', t: '6 ou mais', p: { organizacao: 2, alimentacao: 1 } }],
      },
      {
        id: 'a_alcool', tipo: 'radio', rotulo: 'Você consome bebida alcoólica?',
        opcoes: [
          { v: 'nao', t: 'Não bebo' }, { v: 'ocasional', t: 'Ocasionalmente' },
          { v: 'fds', t: 'Nos fins de semana', p: { ambiente: 1 } },
          { v: '3+', t: 'Três dias por semana ou mais', p: { ambiente: 1, alimentacao: 1, sono: 1 } },
        ],
      },
      {
        id: 'a_fds', tipo: 'radio', rotulo: 'Nos fins de semana, sua alimentação:',
        opcoes: [{ v: 'igual', t: 'Fica parecida com a da semana' }, { v: 'pouco', t: 'Muda um pouco', p: { organizacao: 1 } }, { v: 'muito', t: 'Muda muito', p: { organizacao: 2, ambiente: 1 } }],
      },
      {
        id: 'a_planejamento', tipo: 'radio', rotulo: 'Você planeja o que vai comer (lista de compras, marmitas, cardápio da semana)?',
        opcoes: [{ v: 'sim', t: 'Sim, na maior parte da semana' }, { v: 'as_vezes', t: 'Às vezes', p: { organizacao: 1 } }, { v: 'nao', t: 'Não, decido na hora', p: { organizacao: 2 } }],
      },
      {
        id: 'a_quem_cozinha', tipo: 'radio', rotulo: 'Quem prepara a maior parte das suas refeições?',
        opcoes: [
          { v: 'eu', t: 'Eu mesma' }, { v: 'outra', t: 'Outra pessoa da casa' },
          { v: 'pronto', t: 'Compro pronto ou peço delivery', p: { organizacao: 1 } }, { v: 'varia', t: 'Varia' },
        ],
      },
      {
        id: 'a_automatico', tipo: 'radio', rotulo: 'Você costuma comer enquanto trabalha, assiste TV ou usa o celular?',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'as_vezes', t: 'Às vezes', p: { comportamento: 1 } }, { v: 'sempre', t: 'Quase sempre', p: { comportamento: 2 } }],
      },
    ],
  },
  // ------------------------------------------------------------------ 3
  {
    id: 'comportamento',
    titulo: 'Fome, saciedade e comportamento',
    intro: 'Estas perguntas ajudam a entender a sua relação com a comida. Não é uma avaliação psicológica.',
    perguntas: [
      {
        id: 'f_fome_manha', tipo: 'radio', rotulo: 'Você acorda com fome?',
        opcoes: [{ v: 'sim', t: 'Sim' }, { v: 'as_vezes', t: 'Às vezes' }, { v: 'nao', t: 'Não' }],
      },
      {
        id: 'f_fome_noite', tipo: 'radio', rotulo: 'Você sente fome ou vontade forte de comer à noite?',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'as_vezes', t: 'Às vezes', p: { fome: 1 } }, { v: 'dia', t: 'Quase todos os dias', p: { fome: 2 } }],
      },
      {
        id: 'f_saciedade', tipo: 'radio', rotulo: 'Depois das refeições principais, você normalmente:',
        opcoes: [
          { v: 'satisfeita', t: 'Fica satisfeita por algumas horas' },
          { v: 'fome_logo', t: 'Sente fome pouco tempo depois', p: { fome: 2 } },
          { v: 'alem', t: 'Come além do necessário e fica estufada', p: { comportamento: 1, fome: 1 } },
        ],
      },
      {
        id: 'f_doce', tipo: 'radio', rotulo: 'Com que frequência sente vontade intensa de doces?',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'semana', t: 'Algumas vezes na semana', p: { fome: 1 } }, { v: 'dia', t: 'Todos os dias', p: { fome: 1, comportamento: 1 } }],
      },
      {
        id: 'f_sem_fome', tipo: 'radio', rotulo: 'Você costuma comer mesmo sem estar fisicamente com fome?',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'as_vezes', t: 'Às vezes', p: { comportamento: 1 } }, { v: 'frequente', t: 'Com frequência', p: { comportamento: 2 } }],
      },
      {
        id: 'f_gatilhos', tipo: 'checkbox', rotulo: 'Quais situações ou emoções mais aumentam sua vontade de comer?', obrigatoria: false,
        teto: { comportamento: 2, ambiente: 1, sono: 1, hormonal: 1, estresse: 1 },
        opcoes: [
          { v: 'ansiedade', t: 'Ansiedade', p: { comportamento: 1 } },
          { v: 'estresse', t: 'Estresse', p: { comportamento: 1, estresse: 1 } },
          { v: 'tedio', t: 'Tédio', p: { comportamento: 1 } },
          { v: 'tristeza', t: 'Tristeza', p: { comportamento: 1 } },
          { v: 'recompensa', t: 'Sensação de “eu mereço”', p: { comportamento: 1 } },
          { v: 'cansaco', t: 'Cansaço', p: { sono: 1 } },
          { v: 'social', t: 'Encontros sociais', p: { ambiente: 1 } },
          { v: 'tpm', t: 'Período pré-menstrual', p: { hormonal: 1 } },
          { v: 'nenhuma', t: 'Nenhuma em especial', exclusiva: true },
        ],
      },
      {
        id: 'f_controle', tipo: 'radio', rotulo: 'Com que frequência você sente dificuldade de parar de comer, mesmo querendo parar?',
        opcoes: [
          { v: 'raro', t: 'Nunca ou raramente' },
          { v: 'as_vezes', t: 'Às vezes', p: { comportamento: 1 } },
          { v: 'semanal', t: 'Toda semana', p: { comportamento: 2 } },
          { v: 'varias', t: 'Várias vezes por semana', p: { comportamento: 3 } },
        ],
      },
      {
        id: 'f_culpa', tipo: 'radio', rotulo: 'Você sente culpa depois de comer determinados alimentos?',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'as_vezes', t: 'Às vezes', p: { comportamento: 1 } }, { v: 'frequente', t: 'Com frequência', p: { comportamento: 2 } }],
      },
      {
        id: 'f_tudo_nada', tipo: 'radio', rotulo: 'Quando você sai do planejado, normalmente:',
        opcoes: [
          { v: 'retoma', t: 'Retomo na refeição seguinte' },
          { v: 'dia', t: 'Considero o dia perdido e retomo no dia seguinte', p: { comportamento: 1, adesao: 1 } },
          { v: 'semana', t: 'Considero a semana perdida (“segunda eu começo”)', p: { comportamento: 2, adesao: 2 } },
        ],
      },
      {
        id: 'f_perfeccionismo', tipo: 'radio', rotulo: 'Você sente que precisa fazer tudo perfeito para ter resultado?',
        opcoes: [{ v: 'nao', t: 'Não' }, { v: 'as_vezes', t: 'Às vezes', p: { comportamento: 1 } }, { v: 'sim', t: 'Sim, com frequência', p: { comportamento: 1, adesao: 1 } }],
      },
      {
        id: 'f_restricao', tipo: 'radio', rotulo: 'Você alterna períodos de muita restrição com períodos de exagero?',
        opcoes: [
          { v: 'nao', t: 'Não' },
          { v: 'as_vezes', t: 'Às vezes', p: { comportamento: 1, historico: 1 } },
          { v: 'padrao', t: 'É um padrão frequente', p: { comportamento: 2, historico: 1 } },
        ],
      },
      {
        id: 'f_compensa', tipo: 'checkbox', rotulo: 'Depois de exagerar, você costuma:', obrigatoria: false, teto: { comportamento: 2 },
        opcoes: [
          { v: 'nada', t: 'Seguir normalmente', exclusiva: true },
          { v: 'pular', t: 'Pular refeições', p: { comportamento: 1 } },
          { v: 'exercicio', t: 'Fazer exercício extra para “compensar”', p: { comportamento: 1 } },
          { v: 'rigida', t: 'Fazer uma dieta mais rígida nos dias seguintes', p: { comportamento: 1 } },
          { v: 'outras', t: 'Outras formas de compensar, que prefiro conversar pessoalmente', p: { comportamento: 1 } },
        ],
      },
      {
        id: 'f_escondido', tipo: 'radio', rotulo: 'Você já comeu escondido ou evitou comer na frente de outras pessoas?',
        opcoes: [
          { v: 'nunca', t: 'Nunca' }, { v: 'as_vezes', t: 'Às vezes', p: { comportamento: 1 } },
          { v: 'frequente', t: 'Com frequência', p: { comportamento: 2 } }, { v: 'prefiro_nao', t: 'Prefiro não responder' },
        ],
      },
      { id: 'f_alimentos_controle', tipo: 'texto', rotulo: 'Existem alimentos que fazem você sentir perda de controle? Quais?', obrigatoria: false },
    ],
  },
  // ------------------------------------------------------------------ 4
  {
    id: 'rotina',
    titulo: 'Rotina, sono e estresse',
    intro: 'A estratégia precisa caber na sua vida real, inclusive nos dias difíceis.',
    perguntas: [
      {
        id: 'r_trabalho', tipo: 'radio', rotulo: 'Como é sua rotina de trabalho?',
        opcoes: [
          { v: 'home', t: 'Home office' }, { v: 'presencial', t: 'Presencial' }, { v: 'hibrido', t: 'Híbrido' },
          { v: 'turnos', t: 'Plantões, turnos ou trabalho noturno', p: { rotina: 1, sono: 1 } },
          { v: 'nao', t: 'Não trabalho fora de casa' },
        ],
      },
      {
        id: 'r_horas', tipo: 'radio', rotulo: 'Quantas horas você trabalha por dia, em média?',
        opcoes: [
          { v: '<6', t: 'Até 6 horas' }, { v: '6-8', t: 'De 6 a 8 horas' },
          { v: '9-10', t: 'De 9 a 10 horas', p: { rotina: 1 } }, { v: '10+', t: 'Mais de 10 horas', p: { rotina: 2, estresse: 1 } },
        ],
      },
      {
        id: 'r_previsivel', tipo: 'radio', rotulo: 'Sua rotina é:',
        opcoes: [{ v: 'previsivel', t: 'Previsível' }, { v: 'varia', t: 'Varia um pouco', p: { rotina: 1 } }, { v: 'imprevisivel', t: 'Muito imprevisível (viagens, reuniões, eventos)', p: { rotina: 2 } }],
      },
      {
        id: 'r_preparo', tipo: 'radio', rotulo: 'Quanto tempo por dia você tem para preparar comida?',
        opcoes: [
          { v: '60+', t: 'Mais de 1 hora' }, { v: '30-60', t: 'De 30 a 60 minutos' },
          { v: '<30', t: 'Menos de 30 minutos', p: { organizacao: 1 } }, { v: 'nada', t: 'Quase nenhum', p: { organizacao: 2 } },
        ],
      },
      {
        id: 'r_periodo', tipo: 'radio', rotulo: 'Qual período costuma ser mais difícil para a sua alimentação?',
        opcoes: [
          { v: 'manha', t: 'Manhã' }, { v: 'tarde', t: 'Tarde' }, { v: 'noite', t: 'Noite' },
          { v: 'fds', t: 'Fins de semana' }, { v: 'nenhum', t: 'Nenhum em especial' },
        ],
      },
      {
        id: 'r_impede', tipo: 'checkbox', rotulo: 'O que normalmente impede você de seguir o planejado?', obrigatoria: false,
        teto: { rotina: 1, sono: 1, ambiente: 1, comportamento: 1, organizacao: 1, adesao: 1 },
        opcoes: [
          { v: 'tempo', t: 'Falta de tempo', p: { rotina: 1 } },
          { v: 'cansaco', t: 'Cansaço', p: { sono: 1 } },
          { v: 'imprevistos', t: 'Imprevistos', p: { rotina: 1 } },
          { v: 'eventos', t: 'Eventos sociais', p: { ambiente: 1 } },
          { v: 'emocoes', t: 'Emoções', p: { comportamento: 1 } },
          { v: 'planejamento', t: 'Falta de planejamento', p: { organizacao: 1 } },
          { v: 'desmotivacao', t: 'Desmotivação', p: { adesao: 1 } },
        ],
      },
      {
        id: 's_horas', tipo: 'radio', rotulo: 'Quantas horas você dorme por noite, em média?',
        opcoes: [
          { v: '<5', t: 'Menos de 5 horas', p: { sono: 3 } }, { v: '5-6', t: 'De 5 a 6 horas', p: { sono: 2 } },
          { v: '6-7', t: 'De 6 a 7 horas', p: { sono: 1 } }, { v: '7-8', t: 'De 7 a 8 horas' }, { v: '8+', t: 'Mais de 8 horas' },
        ],
      },
      { id: 's_qualidade', tipo: 'escala', rotulo: 'De 0 a 10, como você avalia a qualidade do seu sono?', min: 'Muito ruim', max: 'Excelente', dim: 'sono', inverso: true, peso: 2 },
      {
        id: 's_dificuldades', tipo: 'checkbox', rotulo: 'Sobre o seu sono, marque o que acontece com frequência:', obrigatoria: false, teto: { sono: 3 },
        opcoes: [
          { v: 'adormecer', t: 'Demoro para adormecer', p: { sono: 1 } },
          { v: 'despertares', t: 'Acordo várias vezes à noite', p: { sono: 1 } },
          { v: 'cansada', t: 'Acordo cansada', p: { sono: 1 } },
          { v: 'sonolencia', t: 'Sinto sonolência durante o dia', p: { sono: 1 } },
          { v: 'ronco', t: 'Ronco (percebido por alguém)', p: { sono: 1 } },
          { v: 'telas', t: 'Uso celular ou TV na cama antes de dormir', p: { sono: 1 } },
          { v: 'remedio', t: 'Uso medicamento ou suplemento para dormir' },
          { v: 'nenhuma', t: 'Nenhuma dessas', exclusiva: true },
        ],
      },
      { id: 'e_nivel', tipo: 'escala', rotulo: 'De 0 a 10, como você avalia seu nível de estresse atual?', min: 'Nenhum', max: 'Muito alto', dim: 'estresse', peso: 3 },
      {
        id: 'e_fontes', tipo: 'checkbox', rotulo: 'Quais são as principais fontes de estresse hoje?', obrigatoria: false,
        opcoes: [
          { v: 'trabalho', t: 'Trabalho' }, { v: 'financas', t: 'Finanças' }, { v: 'filhos', t: 'Filhos' },
          { v: 'familiares', t: 'Cuidado de familiares' }, { v: 'relacionamento', t: 'Relacionamento' },
          { v: 'saude', t: 'Saúde' }, { v: 'casa', t: 'Excesso de tarefas em casa' }, { v: 'nenhuma', t: 'Nenhuma em especial', exclusiva: true },
        ],
      },
      {
        id: 'e_come', tipo: 'radio', rotulo: 'O estresse muda a sua forma de comer?',
        opcoes: [
          { v: 'nao', t: 'Não' },
          { v: 'mais', t: 'Sim, como mais', p: { estresse: 1, comportamento: 1 } },
          { v: 'menos', t: 'Sim, como menos ou pulo refeições', p: { estresse: 1, fome: 1 } },
        ],
      },
      {
        id: 'e_abandona', tipo: 'radio', rotulo: 'Quando a rotina aperta, qual hábito saudável costuma ser abandonado primeiro?',
        opcoes: [
          { v: 'alimentacao', t: 'Alimentação' }, { v: 'exercicio', t: 'Exercício' }, { v: 'sono', t: 'Sono' },
          { v: 'agua', t: 'Água' }, { v: 'autocuidado', t: 'Autocuidado em geral' },
        ],
      },
      {
        id: 'e_descanso', tipo: 'radio', rotulo: 'Você consegue ter momentos de descanso na semana?',
        opcoes: [{ v: 'sim', t: 'Sim' }, { v: 'poucos', t: 'Poucos', p: { estresse: 1 } }, { v: 'nunca', t: 'Quase nunca', p: { estresse: 2 } }],
      },
    ],
  },
  // ------------------------------------------------------------------ 5
  {
    id: 'ambiente',
    titulo: 'Ambiente e movimento',
    intro: 'Pessoas, lugares e o espaço para se movimentar também fazem parte do processo.',
    perguntas: [
      {
        id: 'm_mora', tipo: 'radio', rotulo: 'Com quem você mora?',
        opcoes: [
          { v: 'sozinha', t: 'Sozinha' }, { v: 'parceiro', t: 'Com parceiro ou parceira' }, { v: 'filhos', t: 'Com filhos' },
          { v: 'parceiro_filhos', t: 'Com parceiro(a) e filhos' }, { v: 'familia', t: 'Com pais ou outros familiares' }, { v: 'outro', t: 'Outro' },
        ],
      },
      {
        id: 'm_apoio', tipo: 'radio', rotulo: 'As pessoas com quem você vive apoiam as suas mudanças?',
        opcoes: [
          { v: 'apoiam', t: 'Sim, apoiam' }, { v: 'indiferentes', t: 'São indiferentes', p: { ambiente: 1 } },
          { v: 'resistem', t: 'Resistem ou criticam', p: { ambiente: 2 } }, { v: 'na', t: 'Moro sozinha' },
        ],
      },
      {
        id: 'm_gatilho_casa', tipo: 'radio', rotulo: 'Em casa, costuma haver alimentos que você tem dificuldade de controlar?',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'as_vezes', t: 'Às vezes', p: { ambiente: 1 } }, { v: 'sempre', t: 'Sempre', p: { ambiente: 2 } }],
      },
      {
        id: 'm_refeicoes_diferentes', tipo: 'radio', rotulo: 'Você precisa preparar refeições diferentes para a família?',
        opcoes: [{ v: 'nao', t: 'Não' }, { v: 'as_vezes', t: 'Às vezes', p: { ambiente: 1 } }, { v: 'sim', t: 'Sim', p: { ambiente: 1, organizacao: 1 } }],
      },
      {
        id: 'm_social', tipo: 'radio', rotulo: 'Com que frequência você tem eventos com comida ou bebida (almoços de família, jantares, festas, happy hour)?',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'semanal', t: 'Cerca de uma vez por semana', p: { ambiente: 1 } }, { v: 'varias', t: 'Várias vezes por semana', p: { ambiente: 2 } }],
      },
      {
        id: 'm_pressao', tipo: 'radio', rotulo: 'Você sente pressão para comer ou beber quando está com outras pessoas?',
        opcoes: [{ v: 'raro', t: 'Raramente' }, { v: 'as_vezes', t: 'Às vezes', p: { ambiente: 1 } }, { v: 'frequente', t: 'Com frequência, tenho dificuldade de dizer não', p: { ambiente: 2 } }],
      },
      {
        id: 'm_situacoes', tipo: 'checkbox', rotulo: 'Quais situações sociais mais atrapalham a sua rotina?', obrigatoria: false,
        opcoes: [
          { v: 'familia', t: 'Almoços de família' }, { v: 'festas', t: 'Festas' }, { v: 'restaurantes', t: 'Restaurantes' },
          { v: 'viagens', t: 'Viagens' }, { v: 'happy', t: 'Happy hour' }, { v: 'trabalho', t: 'Reuniões e cafés de trabalho' },
          { v: 'nenhuma', t: 'Nenhuma em especial', exclusiva: true },
        ],
      },
      {
        id: 'x_atual', tipo: 'radio', rotulo: 'Você pratica atividade física hoje?',
        opcoes: [
          { v: 'nao', t: 'Não pratico', p: { atividade: 3, musculo: 1 } },
          { v: '<2', t: 'Menos de 2 vezes por semana', p: { atividade: 2 } },
          { v: '2-3', t: '2 ou 3 vezes por semana', p: { atividade: 1 } },
          { v: '4+', t: '4 vezes por semana ou mais' },
        ],
      },
      {
        id: 'x_tipos', tipo: 'checkbox', rotulo: 'Quais atividades você pratica?', obrigatoria: false, mostrarSe: { id: 'x_atual', em: ['<2', '2-3', '4+'] },
        opcoes: [
          { v: 'musculacao', t: 'Musculação ou treino de força' }, { v: 'caminhada', t: 'Caminhada ou corrida' },
          { v: 'bike', t: 'Bicicleta' }, { v: 'pilates', t: 'Pilates ou yoga' }, { v: 'funcional', t: 'Funcional, dança ou lutas' },
          { v: 'esporte', t: 'Esportes' }, { v: 'outro', t: 'Outra' },
        ],
      },
      {
        id: 'x_forca', tipo: 'radio', rotulo: 'Você faz treino de força (musculação, funcional com carga, pilates com carga)?',
        opcoes: [{ v: '2+', t: 'Sim, 2 vezes por semana ou mais' }, { v: '1', t: 'Uma vez por semana', p: { musculo: 1 } }, { v: 'nao', t: 'Não faço', p: { musculo: 2 } }],
      },
      {
        id: 'x_sentada', tipo: 'radio', rotulo: 'Quanto tempo do dia você passa sentada?',
        opcoes: [{ v: '<4', t: 'Menos de 4 horas' }, { v: '4-8', t: 'De 4 a 8 horas', p: { atividade: 1 } }, { v: '8+', t: 'Mais de 8 horas', p: { atividade: 2 } }],
      },
      {
        id: 'x_dificuldade', tipo: 'checkbox', rotulo: 'O que dificulta a prática de exercícios?', obrigatoria: false,
        teto: { rotina: 1, sono: 1, adesao: 1 },
        opcoes: [
          { v: 'tempo', t: 'Falta de tempo', p: { rotina: 1 } },
          { v: 'energia', t: 'Falta de energia', p: { sono: 1 } },
          { v: 'dor', t: 'Dor ou limitação física' },
          { v: 'motivacao', t: 'Falta de motivação', p: { adesao: 1 } },
          { v: 'custo', t: 'Custo' },
          { v: 'comecar', t: 'Não sei por onde começar' },
          { v: 'nada', t: 'Nada, já pratico com regularidade', exclusiva: true },
        ],
      },
      {
        id: 'x_historico', tipo: 'radio', rotulo: 'Você já praticou atividade física com regularidade no passado?',
        opcoes: [{ v: 'anos', t: 'Sim, por anos' }, { v: 'meses', t: 'Sim, por alguns meses' }, { v: 'nunca', t: 'Nunca de forma regular' }],
      },
    ],
  },
  // ------------------------------------------------------------------ 6
  {
    id: 'saude',
    titulo: 'Corpo e saúde',
    intro: 'Informações que você já conhece sobre a sua saúde. Nada aqui é diagnóstico: são dados para a análise profissional.',
    perguntas: [
      {
        id: 'c_fase', tipo: 'radio', rotulo: 'Qual situação descreve melhor o seu momento hormonal?',
        opcoes: [
          { v: 'regular', t: 'Ciclos menstruais regulares' },
          { v: 'irregular', t: 'Ciclos irregulares', p: { hormonal: 1 } },
          { v: 'peri', t: 'Perimenopausa (ciclos mudando, sintomas novos)', p: { hormonal: 2 } },
          { v: 'meno', t: 'Menopausa (sem menstruar há 12 meses ou mais)', p: { hormonal: 2 } },
          { v: 'contraceptivo', t: 'Uso de contraceptivo que interrompe a menstruação' },
          { v: 'nao_sei', t: 'Não sei ou prefiro não responder' },
        ],
      },
      {
        id: 'c_ciclo', tipo: 'checkbox', rotulo: 'Ao longo do ciclo, você percebe:', obrigatoria: false,
        mostrarSe: { id: 'c_fase', em: ['regular', 'irregular', 'peri'] }, teto: { hormonal: 2 },
        opcoes: [
          { v: 'fome', t: 'Mais fome ou vontade de doces em alguns dias', p: { hormonal: 1 } },
          { v: 'inchaco', t: 'Inchaço', p: { hormonal: 1 } },
          { v: 'humor', t: 'Mudanças de humor ou de sono', p: { hormonal: 1 } },
          { v: 'nada', t: 'Não percebo diferença', exclusiva: true },
        ],
      },
      {
        id: 'c_meno', tipo: 'checkbox', rotulo: 'Nesta fase, você tem percebido:', obrigatoria: false,
        mostrarSe: { id: 'c_fase', em: ['peri', 'meno'] }, teto: { hormonal: 2 },
        opcoes: [
          { v: 'calor', t: 'Ondas de calor', p: { hormonal: 1 } },
          { v: 'sono', t: 'Mudanças no sono', p: { hormonal: 1 } },
          { v: 'barriga', t: 'Mais gordura na região da barriga', p: { hormonal: 1 } },
          { v: 'humor', t: 'Mudanças de humor', p: { hormonal: 1 } },
          { v: 'nada', t: 'Nenhuma dessas', exclusiva: true },
        ],
      },
      {
        id: 'c_terapia', tipo: 'radio', rotulo: 'Você faz terapia hormonal prescrita por médico?', mostrarSe: { id: 'c_fase', em: ['peri', 'meno'] },
        opcoes: [{ v: 'sim', t: 'Sim' }, { v: 'nao', t: 'Não' }, { v: 'avaliando', t: 'Estou avaliando com meu médico' }],
      },
      { id: 'c_energia', tipo: 'escala', rotulo: 'De 0 a 10, como está a sua energia ao longo do dia?', min: 'Muito baixa', max: 'Excelente', dim: 'sono', inverso: true, peso: 1 },
      {
        id: 'd_frequencia', tipo: 'radio', rotulo: 'Com que frequência você evacua?',
        opcoes: [
          { v: 'diario', t: 'Todos os dias' }, { v: '2dias', t: 'A cada 2 dias', p: { intestino: 1 } },
          { v: '3sem', t: '3 vezes por semana ou menos', p: { intestino: 2 } }, { v: '3+dia', t: 'Mais de 3 vezes por dia', p: { intestino: 2 } },
        ],
      },
      {
        id: 'd_consistencia', tipo: 'radio', rotulo: 'Na maior parte do tempo, as fezes são:',
        opcoes: [
          { v: 'normal', t: 'Bem formadas' }, { v: 'dura', t: 'Ressecadas ou duras', p: { intestino: 1 } },
          { v: 'mole', t: 'Amolecidas ou líquidas', p: { intestino: 2 } }, { v: 'varia', t: 'Variam muito', p: { intestino: 1 } },
        ],
      },
      {
        id: 'd_sintomas', tipo: 'checkbox', rotulo: 'Você sente com frequência:', obrigatoria: false, teto: { intestino: 3 },
        opcoes: [
          { v: 'gases', t: 'Gases', p: { intestino: 1 } },
          { v: 'estufamento', t: 'Estufamento ou barriga distendida', p: { intestino: 1 } },
          { v: 'dor', t: 'Dor ou desconforto abdominal', p: { intestino: 1 } },
          { v: 'refluxo', t: 'Refluxo ou azia', p: { intestino: 1 } },
          { v: 'sensibilidade', t: 'Desconforto depois de algum alimento específico', p: { intestino: 1 } },
          { v: 'nenhum', t: 'Nenhum desses', exclusiva: true },
        ],
      },
      { id: 'd_diagnosticos', tipo: 'texto', rotulo: 'Intolerâncias ou alergias alimentares já diagnosticadas', obrigatoria: false },
      { id: 'c_diagnosticos', tipo: 'textarea', rotulo: 'Diagnósticos médicos que você já tem (ex.: hipotireoidismo, diabetes, SOP)', obrigatoria: false, ajuda: 'Informe apenas diagnósticos feitos por médico.' },
      { id: 'c_cirurgias', tipo: 'texto', rotulo: 'Cirurgias anteriores relevantes (ex.: bariátrica)', obrigatoria: false },
      {
        id: 'c_familia', tipo: 'checkbox', rotulo: 'Histórico familiar (pais e irmãos):', obrigatoria: false,
        opcoes: [
          { v: 'diabetes', t: 'Diabetes' }, { v: 'cardio', t: 'Doenças do coração' }, { v: 'obesidade', t: 'Obesidade' },
          { v: 'tireoide', t: 'Doenças da tireoide' }, { v: 'nenhum', t: 'Nenhum ou não sei', exclusiva: true },
        ],
      },
      {
        id: 'c_exames', tipo: 'radio', rotulo: 'Você tem exames de sangue recentes?',
        opcoes: [{ v: '6m', t: 'Sim, dos últimos 6 meses' }, { v: 'antigos', t: 'Tenho, mas são mais antigos' }, { v: 'nao', t: 'Não tenho' }],
      },
      { id: 'med_uso', tipo: 'textarea', rotulo: 'Medicamentos em uso (nome, dose e horário, se souber)', obrigatoria: false, ajuda: 'Nunca altere ou suspenda um medicamento sem falar com o médico responsável.' },
      {
        id: 'med_glp1', tipo: 'radio', rotulo: 'Você usa ou já usou medicamentos como GLP-1 (por exemplo, semaglutida ou tirzepatida)?',
        opcoes: [
          { v: 'nunca', t: 'Nunca usei' }, { v: 'atual', t: 'Uso atualmente, com prescrição médica' },
          { v: 'passado', t: 'Já usei, com prescrição médica' }, { v: 'sem_medico', t: 'Já usei sem acompanhamento médico' },
        ],
      },
      {
        id: 'sup_uso', tipo: 'checkbox', rotulo: 'Suplementos, vitaminas ou fitoterápicos em uso:', obrigatoria: false,
        opcoes: [
          { v: 'proteina', t: 'Proteína em pó' }, { v: 'creatina', t: 'Creatina' }, { v: 'multi', t: 'Multivitamínico' },
          { v: 'vitd', t: 'Vitamina D' }, { v: 'omega3', t: 'Ômega-3' }, { v: 'magnesio', t: 'Magnésio' },
          { v: 'probiotico', t: 'Probióticos' }, { v: 'fibras', t: 'Fibras' }, { v: 'fito', t: 'Fitoterápicos ou chás' },
          { v: 'adocante', t: 'Adoçantes (uso diário)' }, { v: 'nenhum', t: 'Nenhum', exclusiva: true },
        ],
      },
      { id: 'sup_outros', tipo: 'texto', rotulo: 'Outros suplementos ou produtos (se houver)', obrigatoria: false },
    ],
  },
  // ------------------------------------------------------------------ 7
  {
    id: 'objetivos',
    titulo: 'Percepção e objetivos',
    intro: 'Responda só o que se sentir à vontade. Aqui não existe resposta certa.',
    perguntas: [
      {
        id: 'i_sente', tipo: 'radio', rotulo: 'Como você se sente em relação ao seu corpo hoje?',
        opcoes: [
          { v: 'paz', t: 'Em paz na maior parte do tempo' }, { v: 'as_vezes', t: 'Às vezes incomodada' },
          { v: 'frequente', t: 'Incomodada com frequência' }, { v: 'prefiro_nao', t: 'Prefiro não responder' },
        ],
      },
      {
        id: 'i_impacto', tipo: 'checkbox', rotulo: 'Hoje, o peso tem afetado:', obrigatoria: false,
        opcoes: [
          { v: 'roupas', t: 'A escolha de roupas' }, { v: 'fotos', t: 'Vontade de aparecer em fotos' },
          { v: 'social', t: 'Participação em situações sociais' }, { v: 'autoestima', t: 'A autoestima' },
          { v: 'disposicao', t: 'A disposição no dia a dia' }, { v: 'nada', t: 'Nada disso', exclusiva: true },
        ],
      },
      {
        id: 'i_balanca', tipo: 'radio', rotulo: 'Com que frequência você se pesa?',
        opcoes: [
          { v: 'diario', t: 'Todos os dias ou mais', p: { comportamento: 1 } }, { v: 'semanal', t: 'Uma vez por semana' },
          { v: 'raro', t: 'Raramente' }, { v: 'evito', t: 'Evito a balança' },
        ],
      },
      {
        id: 'i_medo', tipo: 'radio', rotulo: 'Você tem medo de recuperar o peso depois de emagrecer?',
        opcoes: [{ v: 'nao', t: 'Não' }, { v: 'pouco', t: 'Um pouco' }, { v: 'muito', t: 'Muito' }],
      },
      {
        id: 'o_objetivo', tipo: 'radio', rotulo: 'Qual é o seu principal objetivo?',
        opcoes: [
          { v: 'emagrecer', t: 'Emagrecer com saúde' },
          { v: 'composicao', t: 'Melhorar a composição corporal (menos gordura, mais músculo)' },
          { v: 'relacao', t: 'Melhorar a relação com a comida' },
          { v: 'disposicao', t: 'Ter mais disposição' },
          { v: 'manter', t: 'Manter o peso que já alcancei' },
          { v: 'organizar', t: 'Organizar a alimentação' },
        ],
      },
      { id: 'o_porque', tipo: 'textarea', rotulo: 'Por que esse objetivo é importante para você agora?', obrigatoria: false },
      {
        id: 'o_motivo', tipo: 'radio', rotulo: 'O que fez você buscar acompanhamento neste momento?',
        opcoes: [
          { v: 'saude', t: 'Saúde ou resultado de exames' }, { v: 'medico', t: 'Recomendação médica' },
          { v: 'data', t: 'Um evento ou data importante' }, { v: 'autoestima', t: 'Autoestima' },
          { v: 'cansei', t: 'Cansei de tentar sozinha' }, { v: 'fase', t: 'Mudanças da fase de vida (como a menopausa)' },
          { v: 'outro', t: 'Outro motivo' },
        ],
      },
      {
        id: 'o_primeiro', tipo: 'checkbox', rotulo: 'Além da balança, o que você gostaria de perceber primeiro?', obrigatoria: false,
        opcoes: [
          { v: 'disposicao', t: 'Mais disposição' }, { v: 'relacao', t: 'Melhor relação com a comida' },
          { v: 'organizacao', t: 'Mais organização' }, { v: 'forca', t: 'Mais força' }, { v: 'sono', t: 'Sono melhor' },
          { v: 'exageros', t: 'Menos episódios de exagero' }, { v: 'confianca', t: 'Mais confiança' },
          { v: 'qualidade', t: 'Mais qualidade de vida' },
        ],
      },
      {
        id: 'o_prazo', tipo: 'radio', rotulo: 'Em quanto tempo você espera perceber mudanças importantes?',
        opcoes: [
          { v: '2sem', t: 'Nas primeiras 2 semanas', p: { prontidao: 2 } },
          { v: '1-2m', t: 'Em 1 a 2 meses', p: { prontidao: 1 } },
          { v: '3-6m', t: 'Em 3 a 6 meses' },
          { v: 'processo', t: 'Sei que é um processo, sem prazo fixo' },
        ],
      },
      { id: 'o_medo', tipo: 'texto', rotulo: 'Qual é o seu maior medo em relação a este processo?', obrigatoria: false },
    ],
  },
  // ------------------------------------------------------------------ 8
  {
    id: 'adesao',
    titulo: 'Adesão e prontidão para mudar',
    intro: 'A parte mais importante: o que é possível para você agora.',
    destaque: true,
    perguntas: [
      { id: 'p_desejo', tipo: 'escala', rotulo: 'De 0 a 10, quanto você deseja mudar a sua rotina neste momento?', min: 'Nada', max: 'Totalmente', dim: 'prontidao', inverso: true, peso: 2 },
      { id: 'p_confianca', tipo: 'escala', rotulo: 'De 0 a 10, quanto você acredita que consegue colocar mudanças em prática?', min: 'Nada', max: 'Totalmente', dim: 'adesao', inverso: true, peso: 2 },
      { id: 'p_rotina', tipo: 'escala', rotulo: 'De 0 a 10, quanto a sua rotina permite mudanças hoje?', min: 'Nada', max: 'Totalmente', dim: 'rotina', inverso: true, peso: 1 },
      {
        id: 'p_tempo', tipo: 'radio', rotulo: 'Quanto tempo por dia você consegue dedicar ao seu processo?',
        opcoes: [
          { v: '<15', t: 'Menos de 15 minutos', p: { adesao: 2 } }, { v: '15-30', t: 'De 15 a 30 minutos', p: { adesao: 1 } },
          { v: '30-60', t: 'De 30 a 60 minutos' }, { v: '60+', t: 'Mais de 1 hora' },
        ],
      },
      {
        id: 'p_acompanhamento', tipo: 'checkbox', rotulo: 'Que tipo de acompanhamento ajuda você a manter constância?', obrigatoria: false,
        opcoes: [
          { v: 'retornos', t: 'Retornos frequentes' }, { v: 'metas', t: 'Metas pequenas e claras' },
          { v: 'cardapio', t: 'Cardápio detalhado' }, { v: 'liberdade', t: 'Liberdade com orientações' },
          { v: 'suporte', t: 'Suporte entre as consultas' }, { v: 'lembretes', t: 'Lembretes' },
        ],
      },
      {
        id: 'b_barreiras', tipo: 'checkbox', rotulo: 'Marque o que mais atrapalha a sua evolução hoje:', ajuda: 'Pode marcar várias opções.', obrigatoria: false,
        teto: { organizacao: 1, sono: 1, estresse: 1, comportamento: 1, musculo: 1, atividade: 1, rotina: 1, ambiente: 1, adesao: 1, prontidao: 1, historico: 1, fome: 1 },
        opcoes: [
          { v: 'planejamento', t: 'Falta de planejamento', p: { organizacao: 1 } },
          { v: 'sono', t: 'Sono ruim', p: { sono: 1 } },
          { v: 'estresse', t: 'Estresse elevado', p: { estresse: 1 } },
          { v: 'emocional', t: 'Comer por emoção', p: { comportamento: 1 } },
          { v: 'proteina', t: 'Comer pouca proteína', p: { musculo: 1 } },
          { v: 'sedentarismo', t: 'Sedentarismo', p: { atividade: 1 } },
          { v: 'imprevisivel', t: 'Rotina imprevisível', p: { rotina: 1 } },
          { v: 'familia', t: 'Ambiente familiar pouco favorável', p: { ambiente: 1 } },
          { v: 'fds', t: 'Fins de semana desorganizados', p: { organizacao: 1 } },
          { v: 'delivery', t: 'Delivery frequente', p: { organizacao: 1 } },
          { v: 'alcool', t: 'Bebida alcoólica', p: { ambiente: 1 } },
          { v: 'constancia', t: 'Dificuldade de manter constância', p: { adesao: 1 } },
          { v: 'expectativa', t: 'Querer resultado muito rápido', p: { prontidao: 1 } },
          { v: 'restricao', t: 'Restrição excessiva', p: { historico: 1 } },
          { v: 'suporte', t: 'Falta de apoio', p: { adesao: 1 } },
          { v: 'retomada', t: 'Dificuldade de retomar depois de sair da rotina', p: { comportamento: 1 } },
          { v: 'tempo', t: 'Falta de tempo', p: { rotina: 1 } },
          { v: 'viagens', t: 'Viagens', p: { rotina: 1 } },
          { v: 'eventos', t: 'Eventos sociais', p: { ambiente: 1 } },
          { v: 'cozinhar', t: 'Dificuldade de cozinhar', p: { organizacao: 1 } },
          { v: 'saciedade', t: 'Sentir fome com frequência', p: { fome: 1 } },
        ],
      },
      { id: 'p_dificuldade', tipo: 'texto', rotulo: 'Em uma frase, qual é a sua maior dificuldade hoje?', obrigatoria: false },
      { id: 'p_facil', tipo: 'texto', rotulo: 'Qual hábito seria mais fácil começar a mudar agora?', obrigatoria: false },
      { id: 'p_nao_abre', tipo: 'texto', rotulo: 'Do que você não está disposta a abrir mão?', obrigatoria: false },
      { id: 'p_desiste', tipo: 'texto', rotulo: 'O que normalmente faz você desistir?', obrigatoria: false },
      { id: 'p_sucesso', tipo: 'textarea', rotulo: 'O que faria você considerar este acompanhamento um sucesso?', obrigatoria: false },
    ],
  },
];

// Pontos fortes: regras simples sobre as respostas (texto em minúsculas
// para caber no meio de uma frase no perfil).
const PONTOS_FORTES = [
  { se: { p_desejo: (v) => v >= 8 }, t: 'boa motivação para mudar' },
  { se: { p_confianca: (v) => v >= 7 }, t: 'confiança na própria capacidade de mudança' },
  { se: { m_apoio: ['apoiam'] }, t: 'apoio das pessoas com quem vive' },
  { se: { a_agua: ['2+'] }, t: 'boa ingestão de água' },
  { se: { x_atual: ['2-3', '4+'] }, t: 'atividade física já presente na rotina' },
  { se: { x_forca: ['2+'] }, t: 'treino de força já estabelecido' },
  { se: { a_proteina: ['quase_todas'] }, t: 'proteína presente na maioria das refeições' },
  { se: { a_vegetais: ['2+'] }, t: 'consumo regular de verduras e legumes' },
  { se: { a_planejamento: ['sim'] }, t: 'hábito de planejar a alimentação' },
  { se: { s_horas: ['7-8', '8+'], s_qualidade: (v) => v >= 7 }, t: 'sono com boa duração e qualidade' },
  { se: { f_tudo_nada: ['retoma'] }, t: 'facilidade para retomar depois de sair do planejado' },
  { se: { h_duracao: ['6m+'] }, t: 'experiência de sustentar mudanças por meses' },
  { se: { e_nivel: (v) => v <= 3 }, t: 'estresse sob controle no momento' },
  { se: { o_prazo: ['3-6m', 'processo'] }, t: 'expectativas realistas sobre o processo' },
];

// Cuidados: quando o relato sugere conversar com outro profissional.
// `se` é uma lista de alternativas (basta uma); dentro de cada alternativa,
// todas as chaves precisam bater. Em checkbox, todos os valores listados
// precisam estar marcados.
const CUIDADOS = [
  {
    id: 'comportamento',
    se: [{ f_controle: ['semanal', 'varias'] }, { f_compensa: ['outras'] }, { f_escondido: ['frequente'] }],
    t: 'Algumas respostas sobre a relação com a comida merecem um olhar cuidadoso. Além do acompanhamento nutricional, conversar com um(a) psicólogo(a) ou médico(a) pode ajudar. Isso não é um diagnóstico: é um cuidado a mais com você.',
  },
  {
    id: 'sono',
    se: [{ s_dificuldades: ['ronco'], s_horas: ['<5', '5-6'] }, { s_dificuldades: ['ronco', 'sonolencia'] }],
    t: 'Algumas respostas sobre o sono sugerem que vale conversar com um(a) médico(a) para uma avaliação adequada.',
  },
  {
    id: 'intestino',
    se: [{ d_frequencia: ['3+dia'] }, { d_consistencia: ['mole'] }, { d_sintomas: ['dor'], d_frequencia: ['3sem', '3+dia'] }],
    t: 'Alguns sintomas digestivos relatados merecem avaliação médica, principalmente se forem persistentes ou vierem acompanhados de outros sinais.',
  },
  {
    id: 'glp1',
    se: [{ med_glp1: ['sem_medico'] }, { h_metodos: ['sem_prescricao'] }],
    t: 'Medicamentos para emagrecer, incluindo as canetas, devem ser usados apenas com prescrição e acompanhamento médico.',
  },
];

module.exports = { DIMENSOES, STATUS, CONTEXTO, ORDEM_PRIORIDADE, TEXTOS, ETAPAS, PONTOS_FORTES, CUIDADOS };
