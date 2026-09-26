// =============================================================================
// SITE ANDRÉA AUGUSTO DE OLIVEIRA — ARQUIVO CENTRAL DE CONTEÚDO EDITÁVEL
// =============================================================================
//
// Quase tudo que muda no site mora aqui: dados legais, contatos, pilares do
// método, áreas do Raio-X, imprensa, depoimentos, FAQ e trajetória.
//
// REGRA DE OURO: valor `null` ou lista vazia = PENDENTE.
//   - Na versão publicada, o site simplesmente esconde o que está pendente
//     (nada de "[preencher]" aparecendo para a visitante).
//   - Na versão de prévia (`npm run site:previa`), cada pendência aparece
//     destacada em amarelo, para a equipe ver o que falta.
//   - Todo build gera `site/PENDENCIAS.md` com a lista atualizada.
//
// NUNCA preencher com informação não confirmada (CRN, CNPJ, títulos,
// especializações, números, depoimentos). Nada de "®" em Emagrecimento
// Blindado enquanto o registro da marca não estiver concedido.
// =============================================================================

export default {
  site: {
    // Domínio definitivo (confirmado pela Andréa em 26/09/2026). Usado em
    // canonical, sitemap e Open Graph.
    url: 'https://www.andreaaugustodeoliveira.com.br',
    dominioConfirmado: true,
    idioma: 'pt-BR',
    locale: 'pt_BR',
  },

  pessoa: {
    nome: 'Andréa Augusto de Oliveira',
    nomeCurto: 'Andréa',
    // Nome profissional usado durante muitos anos (TV, rádio, jornais, Google).
    nomeAnterior: 'Andréa Marim',
    // Outras formas do nome atual usadas em redes e materiais (vão para os
    // dados estruturados do Google, não para o texto das páginas).
    outrosNomes: ['Andréa Oliveira', 'Andréa de Oliveira Marim'],
    // Perfis e páginas que são da própria Andréa em outros sites. Vão para o
    // `sameAs` dos dados estruturados: é assim que o Google entende que todos
    // esses perfis (inclusive os antigos, como Andréa Marim) são a mesma pessoa.
    perfisAnteriores: [
      'https://www.minhavida.com.br/especialistas/33996-andrea-marim',
    ],
    // Projeto da época Andréa Marim. Ano confirmado pela Andréa em 26/09/2026.
    projetoAnterior: {
      nome: 'Nutrir Sonhos',
      desde: 2018,
      youtube: 'https://www.youtube.com/@nutrirsonhos2783',
      instagram: 'https://www.instagram.com/nutrirsonhosandreamarim/',
    },
    // ATENÇÃO: o Código de Ética do Nutricionista exige nome + nº de CRN em
    // qualquer divulgação profissional. Confirmar a situação do CRN antes de
    // publicar o site com o título "Nutricionista".
    profissao: 'Nutricionista',
    // Confirmado pela Andréa em 26/09/2026 (mesmo registro usado como Andréa Marim).
    crn: 'CRN-3 15233',
    anosDeExperiencia: null, // ex.: 20 — PENDENTE (número, sem arredondar pra cima)
    cidade: null, // ex.: 'São Paulo, SP' — PENDENTE
    // Confirmado pela Andréa em 26/09/2026.
    atendimento: '100% online, com hora marcada',
    // ENCONTRADO EM FONTES PÚBLICAS (entrevista no blog E de Repente 50,
    // 15/02/2019, e ficha de fontes da Revista SuplementAção nº 56, 2019):
    //   - Graduação em Nutrição — Universidade Bandeirantes de São Paulo
    //   - Especialização em Nutrição Esportiva — Universidade São Judas Tadeu
    //   - Formação complementar: fitoterápicos e suplementação para
    //     emagrecimento; nutrição funcional; probióticos e prebióticos;
    //     nutrição e estética
    // Só descomentar depois que a Andréa confirmar (e, se possível, com ano).
    formacoes: [
      // { titulo: 'Graduação em Nutrição', instituicao: 'Universidade Bandeirantes de São Paulo', ano: null },
    ],
    especializacoes: [
      // { titulo: 'Especialização em Nutrição Esportiva', instituicao: 'Universidade São Judas Tadeu', ano: null },
    ],
    // Marcos profissionais (linha do tempo da página Sobre).
    trajetoria: [
      // { periodo: '2005–2012', titulo: 'Atendimento clínico', texto: '...' }
    ],
  },

  legal: {
    // Atuação como pessoa física (sem CNPJ por enquanto). A identificação
    // pública é nome + CRN. NUNCA publicar CPF no site (risco de fraude e
    // exposição desnecessária de dado pessoal — LGPD). Se abrir empresa,
    // preencher razão social e CNPJ e mudar pessoaFisica para false.
    pessoaFisica: true,
    razaoSocial: null,
    cnpj: null,
    enderecoComercial: null, // PENDENTE (se houver)
    // E-mail para pedidos de titulares de dados (LGPD). PENDENTE.
    emailPrivacidade: null,
    // Data da última revisão dos textos legais (preencher após revisão jurídica).
    revisaoPolitica: null,
    revisaoTermos: null,
  },

  contato: {
    // Só números, com DDI 55 + DDD. (11) 99900-3259
    whatsapp: '5511999003259',
    // Mensagem que já aparece escrita quando a visitante abre o WhatsApp.
    whatsappMensagem: 'Olá, Andréa. Vim pelo site e gostaria de saber mais sobre o Emagrecimento Blindado.',
    email: null, // PENDENTE
    emailImprensa: null, // PENDENTE (pode ser o mesmo)
    instagram: 'https://www.instagram.com/nutriandreaoliveira/',
    youtube: null,
    // Não inventar: só preencher quando definido.
    horario: null, // ex.: 'Segunda a sexta, das 9h às 18h'
    prazoResposta: null, // ex.: 'Respondemos em até 2 dias úteis'
    endereco: null, // só se houver atendimento presencial
  },

  // Página "Atendimento" (/atendimento/). Formatos e valores informados pela
  // Andréa em 26/09/2026. Para esconder os valores do site (ex.: se a revisão
  // jurídica ou o CRN pedir), troque `exibirValores` para false: a página
  // continua no ar e o botão leva ao WhatsApp para consultar o investimento.
  atendimento: {
    exibirValores: true,
    agendarMensagem: 'Olá, Andréa. Vim pelo site e quero agendar meu atendimento nutricional online.',
    planos: [
      {
        id: 'avulsa',
        nome: 'Consulta avulsa',
        valor: 600,
        resumo: 'Avaliação nutricional completa e um direcionamento individualizado.',
        indicacao: 'Indicada para quem deseja uma avaliação nutricional completa e um direcionamento individualizado.',
        avaliaTitulo: 'Durante a consulta, são avaliados',
        avalia: [
          'rotina alimentar',
          'histórico de saúde e hábitos',
          'objetivos',
          'dificuldades atuais',
          'preferências alimentares',
          'organização das refeições',
          'uso de suplementos',
          'necessidade de suplementação',
          'possibilidade de utilização de manipulados, quando houver indicação',
          'estratégias nutricionais compatíveis com a sua realidade',
        ],
        recebe: 'Você recebe um plano alimentar individualizado, orientações práticas, estratégias nutricionais e recomendações de acordo com o que for identificado durante a consulta.',
        naoInclui: 'A consulta avulsa não inclui retornos semanais nem acesso ao BLIM.',
        mensagem: 'Olá, Andréa. Vim pelo site e quero agendar uma consulta avulsa online.',
      },
      {
        id: 'trimestral',
        nome: 'Acompanhamento trimestral',
        valor: 2200,
        destaque: true,
        detalhe: '1 consulta por semana durante 3 meses',
        resumo: 'Acompanhamento próximo, contínuo e estratégico durante 3 meses.',
        indicacao: 'Indicado para quem deseja um acompanhamento mais próximo, contínuo e estratégico durante 3 meses. Você terá 1 consulta por semana, permitindo avaliar de perto sua evolução e fazer ajustes sempre que necessário.',
        avaliaTitulo: 'Ao longo do acompanhamento, avaliamos',
        avalia: [
          'adaptação ao plano alimentar',
          'dificuldades da semana',
          'fome e saciedade',
          'rotina',
          'organização alimentar',
          'resposta às estratégias propostas',
          'evolução das medidas',
          'necessidade de ajustes',
          'suplementação',
          'manipulados, quando houver indicação',
          'mudanças de estratégia conforme sua evolução',
        ],
        recebe: 'Inclui plano alimentar individualizado, acompanhamento das medidas, receitas e estratégias práticas e acesso ao BLIM.',
        mensagem: 'Olá, Andréa. Vim pelo site e quero agendar o acompanhamento trimestral online.',
      },
    ],
  },

  // Formulário da página Contato. As mensagens chegam no e-mail definido na
  // variável SITE_CONTATO_EMAIL (Railway → Variables) e ficam salvas no banco.
  formulario: {
    endpoint: '/api/site/contato',
    assuntos: [
      'Quero entender o Emagrecimento Blindado',
      'Dúvida sobre o Raio-X',
      'Atendimento e acompanhamento',
      'Imprensa e parcerias',
      'Outro assunto',
    ],
    sucesso: 'Mensagem enviada. Obrigada pelo contato — retornaremos pelo e-mail ou WhatsApp informado.',
    erro: 'Não foi possível enviar agora. Tente novamente em instantes ou fale pelo WhatsApp.',
  },

  // Textos dos botões. Hierarquia: principal (Raio-X) > secundário (método,
  // trajetória) > relacionamento (WhatsApp, Instagram, contato).
  ctas: {
    raioX: 'Faça seu Raio-X do Emagrecimento',
    raioXCurto: 'Fazer meu Raio-X',
    raioXTopo: 'Fazer Raio-X', // botão do cabeçalho (curto, cabe no celular)
    raioXAlternativo: 'Descubra onde seu processo está travando',
    metodo: 'Conheça o método',
    trajetoria: 'Conheça a trajetória de Andréa',
    comoFunciona: 'Veja como funciona',
    whatsapp: 'Fale com Andréa pelo WhatsApp',
    whatsappCurto: 'WhatsApp',
    contato: 'Enviar uma mensagem',
  },

  // Imagens. Para trocar uma foto: coloque o novo arquivo em
  // site/static/img/ e altere só o caminho (`src`) e a descrição (`alt`).
  // Proporção recomendada: vertical 4:5 (ex.: 800×1000) para retratos,
  // horizontal 1200×630 para compartilhamento (og).
  // Envie duas versões: `src` (800px de largura) e `srcMobile` (480px).
  // Se só houver uma, repita o mesmo caminho nos dois campos.
  imagens: {
    hero: {
      src: 'img/andrea-hero-800.webp',
      srcMobile: 'img/andrea-hero-480.webp',
      largura: 800, altura: 1000,
      alt: 'Andréa Augusto de Oliveira sentada em uma poltrona clara, vestindo terno off-white, em um escritório iluminado com plantas ao fundo',
    },
    sobre: {
      src: 'img/andrea-sobre-800.webp',
      srcMobile: 'img/andrea-sobre-480.webp',
      largura: 800, altura: 1000,
      alt: 'Retrato de Andréa Augusto de Oliveira de braços cruzados e expressão confiante, em terno off-white, numa sala de reuniões em tons de madeira e mármore',
    },
    metodo: {
      src: 'img/andrea-metodo-800.webp',
      srcMobile: 'img/andrea-metodo-480.webp',
      largura: 800, altura: 1000,
      alt: 'Andréa Augusto de Oliveira em vestido off-white, com as mãos unidas, em ambiente de trabalho com mesa de madeira',
    },
    // PENDENTE: foto em atendimento/ambiente profissional (horizontal, 1600×1000).
    atendimento: null,
    // Imagem de compartilhamento (WhatsApp, Facebook, LinkedIn): 1200×630.
    og: { src: 'img/og-andrea.jpg', largura: 1200, altura: 630, alt: 'Andréa Augusto de Oliveira' },
    monograma: { src: 'img/monograma-aao.webp', largura: 360, altura: 186, alt: '' },
  },

  // Fotos antigas da trajetória (com o nome Andréa Marim). SEMPRE com
  // contexto: legenda + veículo + ano, para ficar claro que é a mesma
  // profissional. Arquivos em site/static/img/trajetoria/.
  acervo: [
    // {
    //   src: 'img/trajetoria/tv-2012.webp',
    //   alt: 'Andréa, então Andréa Marim, em entrevista no estúdio do programa X',
    //   legenda: 'Entrevista sobre alimentação e rotina',
    //   veiculo: 'Programa X — Emissora Y',
    //   ano: '2012',
    //   url: 'https://...',
    // },
  ],

  raioX: {
    nome: 'Raio-X do Emagrecimento',
    // PENDENTE: link do questionário (Typeform, Tally, Google Forms, página
    // própria...). Enquanto for null, os botões levam para o WhatsApp (se
    // houver) ou para a página de contato.
    url: null,
    // PENDENTE: confirmar os nomes oficiais das 7 áreas do questionário.
    // Provisoriamente espelham os pilares do método.
    areasConfirmadas: false,
    areas: [
      'Alimentação',
      'Rotina',
      'Comportamento alimentar',
      'Consistência',
      'Estratégia',
      'Acompanhamento',
      'Manutenção',
    ],
  },

  programa: {
    nome: 'Emagrecimento Blindado',
    // Os pilares podem ser renomeados, reescritos, reordenados ou removidos.
    // O site se ajusta sozinho à quantidade.
    pilares: [
      {
        titulo: 'Alimentação',
        resumo: 'Escolhas possíveis, sem restrição como regra.',
        texto: 'Uma alimentação pensada para caber no seu dia a dia, com clareza sobre o que priorizar — e sem transformar cada refeição em uma prova.',
      },
      {
        titulo: 'Rotina',
        resumo: 'Um plano que respeita a sua vida real.',
        texto: 'Horários, trabalho, família e imprevistos entram na conta desde o início. A estratégia se adapta à rotina, e não o contrário.',
      },
      {
        titulo: 'Comportamento',
        resumo: 'Entender fome, vontade e gatilhos.',
        texto: 'Compreender por que você come como come — cansaço, ansiedade, hábitos antigos — é o que permite mudar sem depender só de força de vontade.',
      },
      {
        titulo: 'Consistência',
        resumo: 'Menos intensidade, mais continuidade.',
        texto: 'Pequenas ações sustentadas por muito tempo costumam ir mais longe do que grandes esforços que duram poucas semanas.',
      },
      {
        titulo: 'Estratégia',
        resumo: 'Decisões baseadas no seu momento.',
        texto: 'Cada fase pede um foco. A estratégia parte de onde você está hoje, e não de um modelo pronto que serve para todo mundo.',
      },
      {
        titulo: 'Acompanhamento',
        resumo: 'Ajustes ao longo do caminho.',
        texto: 'O processo é revisto e ajustado com orientação profissional, para que um tropeço não vire um novo recomeço.',
      },
      {
        titulo: 'Manutenção',
        resumo: 'Pensar no depois desde o começo.',
        texto: 'O objetivo não é só chegar a um resultado, mas conseguir mantê-lo. A manutenção faz parte do plano desde o primeiro dia.',
      },
    ],
  },

  // Participações na mídia: ficam em content/imprensa.mjs (acervo completo,
  // com status de cada link, categoria e o que aparece ou não no site).

  // PENDENTE: depoimentos REAIS, com autorização por escrito de cada pessoa.
  // Nunca usar antes e depois, número de quilos ou promessa de resultado.
  // Conferir as regras do Conselho (CFN/CRN) sobre depoimentos antes de publicar.
  depoimentos: [
    // { texto: '...', nome: 'Primeiro nome', detalhe: 'Cliente desde 2025', autorizado: true }
  ],

  // Identidade visual. Alterar aqui muda o site inteiro.
  // Contraste validado (WCAG AA) para: grafite, sálvia e café sobre off-white
  // e areia; branco sobre sálvia (texto de botão ≥ 16px, peso 600).
  // Terracota e oliva: só em detalhes/ícones/fundos, nunca em texto pequeno.
  tema: {
    cores: {
      salvia: '#66756B', // botões principais, títulos de destaque, rodapé
      salviaEscura: '#56645B', // hover/clique do botão principal
      oliva: '#8D9A83', // fundos secundários, ícones, apoio
      areia: '#E8DED0', // blocos de destaque, identificação, depoimentos
      offwhite: '#FAF8F3', // fundo principal
      cafe: '#5A4A42', // textos secundários, legendas
      terracota: '#B97862', // pequenos destaques (com moderação) — só decorativo
      terracotaTexto: '#874F3C', // versão legível da terracota para textos pequenos (≥4,5:1 em off-white e areia)
      salviaNoite: '#4E5B52', // fundo da seção do Raio-X (texto claro por cima)
      grafite: '#2F3330', // textos principais e títulos
    },
    fontes: {
      titulos: 'Cormorant Garamond',
      textos: 'Manrope',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600&display=swap',
    },
  },

  // SEO: título e descrição de cada página (até ~60 e ~155 caracteres).
  seo: {
    home: {
      titulo: 'Andréa Augusto de Oliveira | Nutricionista — emagrecer com estratégia',
      descricao: 'Nutricionista, criadora do Emagrecimento Blindado: um processo estruturado para emagrecer com estratégia, com hábitos sustentáveis e sem viver recomeçando.',
    },
    sobre: {
      titulo: 'Sobre Andréa Augusto de Oliveira (Andréa Marim) | Nutricionista',
      descricao: 'Conheça a trajetória de Andréa Augusto de Oliveira, nutricionista anteriormente conhecida profissionalmente como Andréa Marim, e a nova fase do seu trabalho.',
    },
    programa: {
      titulo: 'Emagrecimento Blindado | Método de Andréa Augusto de Oliveira',
      descricao: 'Conheça o Emagrecimento Blindado, metodologia criada por Andréa Augusto de Oliveira para emagrecer com estratégia, consistência e foco na manutenção.',
    },
    raioX: {
      titulo: 'Raio-X do Emagrecimento | Descubra onde seu processo trava',
      descricao: 'Questionário em 7 áreas para entender em que pontos o seu processo de emagrecimento está mais vulnerável antes de tentar mais uma estratégia.',
    },
    conteudos: {
      titulo: 'Conteúdos sobre emagrecimento sustentável | Andréa Augusto de Oliveira',
      descricao: 'Artigos sobre comportamento alimentar, rotina, consistência e manutenção de resultados, escritos por Andréa Augusto de Oliveira.',
    },
    imprensa: {
      titulo: 'Na mídia | Andréa Augusto de Oliveira (Andréa Marim)',
      descricao: 'Participações em TV, revistas, jornais e portais ao longo da trajetória de Andréa Augusto de Oliveira, anteriormente conhecida como Andréa Marim.',
    },
    contato: {
      titulo: 'Contato | Andréa Augusto de Oliveira',
      descricao: 'Fale com a equipe de Andréa Augusto de Oliveira pelo WhatsApp, e-mail ou formulário, ou comece pelo Raio-X do Emagrecimento.',
    },
    privacidade: {
      titulo: 'Política de Privacidade | Andréa Augusto de Oliveira',
      descricao: 'Como os dados pessoais enviados pelo site são coletados, usados e protegidos, de acordo com a LGPD.',
    },
    atendimento: {
      titulo: 'Atendimento nutricional online | Andréa Augusto de Oliveira',
      descricao: 'Consulta avulsa e acompanhamento trimestral com consultas semanais, 100% online e com hora marcada, com a nutricionista Andréa Augusto de Oliveira.',
    },
    termos: {
      titulo: 'Termos de Uso | Andréa Augusto de Oliveira',
      descricao: 'Condições de uso do site e dos conteúdos de Andréa Augusto de Oliveira.',
    },
  },

  // IDs de medição. Deixar null até haver aviso de cookies/consentimento.
  analytics: {
    ga4: null, // ex.: 'G-XXXXXXXXXX'
    metaPixel: null,
  },
};
