// Perguntas frequentes. Respostas em HTML simples (<p>, <a>, <strong>).
// Regra: não prometer prazo, quilos, preço, duração ou formato que ainda não
// foram definidos. Quando algo não estiver definido, dizer que será informado.
import C from './config.mjs';

const P = C.programa.nome;
const R = C.raioX.nome;

export const faqHome = [
  {
    p: `O que é o ${P}?`,
    r: `<p>É a metodologia criada por ${C.pessoa.nome} para organizar o processo de emagrecimento em pilares que funcionam juntos — alimentação, rotina, comportamento, consistência, estratégia, acompanhamento e manutenção. O objetivo é emagrecer com estratégia e reduzir a sensação de viver recomeçando.</p>`,
  },
  {
    p: 'Para quem o método foi pensado?',
    r: '<p>Para mulheres, principalmente a partir dos 35 anos e com rotina exigente, que já tentaram emagrecer outras vezes, conseguem começar mas têm dificuldade de manter, e querem um processo estruturado e sustentável — sem viver em restrição permanente.</p>',
  },
  {
    p: `Como funciona o ${R}?`,
    r: `<p>É um questionário em 8 etapas, que leva ${C.raioX.tempo}. Ele passa por alimentação, fome e saciedade, comportamento, rotina, sono, estresse, ambiente, atividade física, saúde e prontidão para mudar. As respostas são salvas a cada etapa, e ao final você recebe um painel com os pontos que merecem mais atenção no seu contexto.</p>`,
  },
  {
    p: 'O que acontece depois que eu preencher o Raio-X?',
    r: '<p>Na hora, você vê um painel com o status de cada área (favorável, atenção, precisa de estratégia ou prioridade), os 3 principais pontos para trabalhar agora, seus pontos fortes, as principais barreiras e um resumo do seu perfil. As respostas ficam disponíveis para a Andréa, que usa essas informações para personalizar a estratégia no atendimento.</p>',
  },
  {
    p: 'O Raio-X substitui uma consulta?',
    r: '<p>Não. O Raio-X 360º é uma ferramenta estratégica de avaliação nutricional, comportamental e de estilo de vida. Não é diagnóstico médico, exame clínico nem avaliação psicológica, não gera prescrição e não substitui a consulta individual.</p>',
  },
  {
    p: 'O processo é baseado em dietas restritivas?',
    r: '<p>Não. A proposta não parte da restrição extrema como regra. As estratégias são pensadas para caber na vida real e ser sustentadas ao longo do tempo, respeitando a avaliação individual de cada pessoa.</p>',
  },
  {
    p: 'Em quanto tempo vou ter resultados?',
    r: '<p>Não existe um prazo igual para todas as pessoas. O processo depende do histórico, da rotina, da saúde e do momento de cada uma. Por isso, não prometemos números nem prazos.</p>',
  },
  {
    p: 'Como funciona o atendimento? Quais são os valores?',
    r: '<p>O atendimento é 100% online, com hora marcada. Há dois formatos: a consulta avulsa, para uma avaliação completa e um direcionamento individualizado, e o acompanhamento trimestral, com uma consulta por semana durante 3 meses. O que cada formato inclui está na <a href="{{atendimento}}">página de atendimento</a>, e o investimento é informado pelo WhatsApp.</p>',
  },
  {
    p: `${C.pessoa.nome} e ${C.pessoa.nomeAnterior} são a mesma profissional?`,
    r: `<p>Sim. ${C.pessoa.nomeAnterior} é o nome com que ela atuou profissionalmente durante muitos anos, inclusive em participações na mídia. Hoje ela assina com o seu nome atual, ${C.pessoa.nome}.</p>`,
  },
  {
    p: 'Tenho uma condição de saúde ou uso medicação. Posso participar?',
    r: '<p>Cada caso precisa de avaliação individual. Se você faz algum tratamento, usa medicamentos (inclusive para emagrecer) ou tem alguma condição clínica, o processo nutricional deve respeitar as orientações da sua equipe de saúde.</p>',
  },
  {
    p: 'Como entro em contato?',
    r: '<p>Pelo WhatsApp, que está na <a href="{{contato}}">página de contato</a> e no botão do site. Se preferir começar entendendo o seu momento, faça o Raio-X.</p>',
  },
];

export const faqPrograma = [
  faqHome[0],
  faqHome[1],
  faqHome[5],
  faqHome[6],
  faqHome[7],
  faqHome[9],
];

export const faqRaioX = [faqHome[2], faqHome[3], faqHome[4], {
  p: 'Preciso responder tudo de uma vez?',
  r: '<p>Não. As respostas são salvas a cada etapa. Se precisar parar, é só voltar ao questionário pelo mesmo aparelho e navegador para continuar de onde parou.</p>',
}, {
  p: 'O Raio-X promete algum resultado?',
  r: '<p>Não. Ele organiza as informações para entender o que pode estar dificultando o seu processo. Não há promessa de prazo, de quilos ou de resultado.</p>',
}, {
  p: 'Meus dados ficam protegidos?',
  r: '<p>Sim. Algumas perguntas envolvem dados de saúde, que são tratados com o seu consentimento específico e usados apenas para a análise nutricional e para o contato sobre o acompanhamento. Só a Andréa tem acesso às respostas, e você pode pedir a exclusão a qualquer momento, conforme a <a href="{{privacidade}}">Política de Privacidade</a>.</p>',
}];

// Emagrecimento feminino depois dos 35 (página /emagrecimento-feminino/).
// Perguntas que as mulheres desse público fazem ao Google e às IAs. Respostas
// curtas, sem promessa de prazo ou de quilos, sem diagnóstico e sem citar
// marcas de medicamentos. Quem prescreve medicamento e hormônio é o médico.
const crn = C.pessoa.crn ? `, ${C.pessoa.crn}` : '';
const acompanhadas = C.pessoa.mulheresAcompanhadas ? ` Ao longo da carreira, já acompanhou mais de ${C.pessoa.mulheresAcompanhadas} mulheres.` : '';

export const faqFeminino = [
  {
    p: 'Por que fica mais difícil emagrecer depois dos 35 anos?',
    r: '<p>Com o passar dos anos, é comum haver perda gradual de massa muscular, mudanças hormonais e uma rotina mais carregada — trabalho, família, sono curto e estresse. Nenhum desses fatores explica tudo sozinho. Por isso, a estratégia precisa olhar para o conjunto: alimentação, rotina, sono, atividade física, composição corporal e momento de vida.</p>',
  },
  {
    p: 'A menopausa faz engordar?',
    r: '<p>A transição para a menopausa costuma vir acompanhada de mudanças na composição corporal, como mais gordura na região abdominal. Mas a menopausa raramente é a causa única: sono, estresse, alimentação, nível de atividade física e massa muscular também pesam. A nutrição ajuda a organizar esses pontos. Questões hormonais e reposição são avaliadas pelo médico.</p>',
  },
  {
    p: 'Preciso cortar carboidrato para emagrecer depois dos 40?',
    r: '<p>Não existe uma regra única. Cortar grupos alimentares inteiros pode até funcionar por um tempo, mas costuma ser difícil de manter. O que define a melhor estratégia é a avaliação individual: rotina, preferências, saúde, treino e objetivo.</p>',
  },
  {
    p: 'Como emagrecer com uma rotina de reuniões, viagens e pouco tempo?',
    r: '<p>Em vez de reorganizar a vida inteira para seguir uma dieta, a estratégia é construída para caber na rotina real: refeições fora de casa, restaurantes, viagens, eventos e finais de semana entram no planejamento. Pequenas decisões repetidas — hidratação, escolhas no delivery, organização das refeições — costumam fazer mais diferença do que regras rígidas.</p>',
  },
  {
    p: 'Proteína e treino de força são importantes nessa fase?',
    r: '<p>Sim. Preservar massa muscular é um dos pontos centrais para mulheres a partir dos 35 anos, e isso depende de uma ingestão adequada de proteína aliada à atividade física, especialmente ao treino de força. A quantidade de proteína ideal varia de pessoa para pessoa e é definida na avaliação.</p>',
  },
  {
    p: 'Uso canetas emagrecedoras. A nutricionista pode me ajudar?',
    r: '<p>Pode. A indicação e o acompanhamento do medicamento são do médico. A nutrição entra para garantir uma alimentação adequada mesmo com menos apetite, com atenção à proteína, à hidratação e aos sintomas digestivos, ajudar a preservar a massa muscular e preparar a fase de manutenção.</p>',
  },
  {
    p: 'O atendimento nutricional online funciona?',
    r: '<p>Sim. O atendimento é 100% online, com hora marcada, o que elimina deslocamento e facilita encaixar as consultas na agenda. A avaliação considera histórico, rotina, hábitos, exames que você já tenha e a evolução das medidas. Os formatos estão na <a href="{{atendimento}}">página de atendimento</a>.</p>',
  },
  {
    p: 'Quem é a nutricionista responsável?',
    r: `<p>${C.pessoa.nome}${crn}, ${C.pessoa.profissao.toLowerCase()}, pós-graduada em Nutrição Esportiva e em Fitoterapia, ${C.pessoa.atuacao}. Formada em Nutrição em ${C.pessoa.formacoes[0]?.ano}, foi conhecida durante anos como ${C.pessoa.nomeAnterior}.${acompanhadas} É a criadora do método ${P}.</p>`,
  },
  {
    p: 'Por onde eu começo?',
    r: `<p>Pelo ${R}: um questionário que mostra quais áreas merecem mais atenção no seu processo. Se preferir, fale direto pelo WhatsApp na <a href="{{contato}}">página de contato</a>.</p>`,
  },
];
