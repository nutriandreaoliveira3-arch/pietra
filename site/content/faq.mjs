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
    r: '<p>Para mulheres adultas que já tentaram emagrecer outras vezes, conseguem começar mas têm dificuldade de manter, e querem um processo estruturado e sustentável — sem viver em restrição permanente.</p>',
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
    r: '<p>Pela <a href="{{contato}}">página de contato</a>, onde estão o formulário e os canais disponíveis. Se preferir começar entendendo o seu momento, faça o Raio-X.</p>',
  },
];

export const faqPrograma = [
  faqHome[0],
  faqHome[1],
  faqHome[5],
  faqHome[6],
  {
    p: 'Quais informações ainda serão confirmadas?',
    r: '<p>Detalhes como formato do acompanhamento, duração e investimento serão publicados nesta página. Até lá, o primeiro passo recomendado é o Raio-X — ou uma mensagem pela página de contato.</p>',
  },
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
