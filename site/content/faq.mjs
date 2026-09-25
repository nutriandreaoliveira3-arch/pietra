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
    r: `<p>É um questionário que passa por 7 áreas do seu processo de emagrecimento. As respostas ajudam a identificar em quais pontos o seu momento atual está mais vulnerável e servem de ponto de partida para decidir os próximos passos.</p>`,
  },
  {
    p: 'O que acontece depois que eu preencher o Raio-X?',
    r: '<p>Você recebe uma leitura do seu momento atual e conhece a estratégia indicada para ele. A partir daí, decide se quer seguir para o acompanhamento. Os detalhes de como essa devolutiva é entregue serão informados na própria página do questionário.</p>',
  },
  {
    p: 'O Raio-X substitui uma consulta?',
    r: '<p>Não. O Raio-X é uma ferramenta de percepção e orientação inicial. Ele não é diagnóstico e não substitui avaliação nutricional ou médica individual.</p>',
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
    r: '<p>Formato, duração e investimento são apresentados depois da avaliação inicial, junto com a estratégia indicada para o seu momento. Essas informações serão detalhadas aqui assim que estiverem publicadas.</p>',
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
  p: 'Meus dados ficam protegidos?',
  r: '<p>As respostas são usadas apenas para a leitura do seu momento e para o contato sobre o acompanhamento, conforme a <a href="{{privacidade}}">Política de Privacidade</a>.</p>',
}];
