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
    // Formada em 2003 (confirmado pela Andréa em 27/09/2026). Usamos 20+ para
    // não arredondar pra cima (houve um período afastada da atividade).
    anosDeExperiencia: 20,
    cidade: null, // ex.: 'São Paulo, SP' — PENDENTE
    // Confirmado pela Andréa em 26/09/2026.
    atendimento: '100% online, com hora marcada',
    // Formação confirmada pela Andréa em 27/09/2026: pós-graduação no CEFIT
    // e, além dela, especialização em Nutrição Esportiva na São Judas Tadeu
    // (ano não informado).
    formacoes: [
      { titulo: 'Graduação em Nutrição', instituicao: 'Universidade Bandeirantes', ano: 2003 },
    ],
    especializacoes: [
      { titulo: 'Pós-graduação em Nutrição Esportiva', instituicao: 'CEFIT', ano: 2017 },
      { titulo: 'Especialização em Nutrição Esportiva', instituicao: 'Universidade São Judas Tadeu', ano: null },
      { titulo: 'Pós-graduação em Fitoterapia', instituicao: 'VP Instituto Valéria Paschoal', ano: 2019 },
    ],
    // Marcos profissionais (linha do tempo da página Sobre). Confirmados pela
    // Andréa em 27/09/2026.
    trajetoria: [
      { periodo: '2003', titulo: 'Formação em Nutrição', texto: 'Graduação em Nutrição pela Universidade Bandeirantes.' },
      { periodo: '2010', titulo: 'Consultório próprio', texto: 'Início do atendimento nutricional em consultório próprio.' },
      { periodo: '2017', titulo: 'Nutrição Esportiva', texto: 'Pós-graduação em Nutrição Esportiva pelo CEFIT.' },
      { periodo: '2018', titulo: 'Projeto Nutrir Sonhos', texto: 'Criação do projeto Nutrir Sonhos, com conteúdos de nutrição no YouTube e no Instagram, ainda como Andréa Marim.' },
      { periodo: '2019', titulo: 'Fitoterapia', texto: 'Pós-graduação em Fitoterapia pelo VP Instituto Valéria Paschoal.' },
      { periodo: '2026', titulo: 'Emagrecimento Blindado', texto: 'Como Andréa Augusto de Oliveira, lança o Emagrecimento Blindado, método para emagrecer com estratégia e hábitos sustentáveis.' },
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
    emailPrivacidade: 'contato@andreaaugustodeoliveira.com.br',
    // Data da última revisão dos textos legais (preencher após revisão jurídica).
    // Política de Privacidade: texto enviado pela Andréa em 27/09/2026.
    revisaoPolitica: '27 de setembro de 2026',
    // Nome do provedor de IA usado pelo BLIM (ex.: fornecedor do modelo). null =
    // a Política cita "provedor de inteligência artificial" sem nome. PENDENTE.
    provedorIA: null,
    revisaoTermos: null,
  },

  contato: {
    // Só números, com DDI 55 + DDD. (11) 99900-3259
    whatsapp: '5511999003259',
    // Mensagem que já aparece escrita quando a visitante abre o WhatsApp.
    whatsappMensagem: 'Olá, Andréa. Vim pelo site e gostaria de saber mais sobre o Emagrecimento Blindado.',
    // Encaminhado pelo Cloudflare Email Routing para o Gmail da Andréa.
    email: 'contato@andreaaugustodeoliveira.com.br',
    emailImprensa: 'contato@andreaaugustodeoliveira.com.br',
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
    raioX: 'Quero fazer meu Raio-X 360º',
    raioXCurto: 'Fazer meu Raio-X 360º',
    raioXTopo: 'Raio-X 360º', // botão do cabeçalho (curto, cabe no celular)
    raioXAlternativo: 'Quero entender o que está dificultando minha evolução',
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
    // Fotos de bastidores enviadas por Andréa (stories arquivados do Instagram,
    // recortados sem os ícones). `posicao` = enquadramento da foto no card.
    {
      src: 'img/midia/tv-gazeta-de-a-a-zuca.webp',
      alt: 'Andréa, então Andréa Marim, no estúdio do programa De A a Zuca, na bancada com alimentos',
      legenda: 'Convidada do programa De A a Zuca',
      veiculo: 'TV Gazeta',
      ano: '2019',
      posicao: '62% 50%',
    },
    {
      src: 'img/midia/tv-gazeta-de-a-a-zuca-2.webp',
      alt: 'Andréa, então Andréa Marim, apresentando alimentos na bancada do programa De A a Zuca',
      legenda: 'De volta ao De A a Zuca',
      veiculo: 'TV Gazeta',
      ano: '2019',
      posicao: '50% 50%',
    },
    {
      src: 'img/midia/tv-gazeta-recepcao-2.webp',
      alt: 'Andréa, então Andréa Marim, de vestido estampado na recepção da TV Gazeta',
      legenda: 'Antes de mais uma gravação',
      veiculo: 'TV Gazeta',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-gazeta-voce-bonita.webp',
      alt: 'Andréa, então Andréa Marim, com a apresentadora no estúdio do programa Você Bonita, da TV Gazeta, com câmera em primeiro plano',
      legenda: 'No estúdio do Você Bonita',
      veiculo: 'TV Gazeta',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-gazeta-voce-bonita-2.webp',
      alt: 'Andréa, então Andréa Marim, conversando com a apresentadora na bancada do programa Você Bonita',
      legenda: 'Na bancada do Você Bonita',
      veiculo: 'TV Gazeta',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-gazeta-voce-bonita-batatas.webp',
      alt: 'Andréa, então Andréa Marim, no estúdio do Você Bonita falando sobre batatas, com teleprompter em primeiro plano',
      legenda: 'Você Bonita: os benefícios das batatas',
      veiculo: 'TV Gazeta',
      ano: '2020',
    },
    {
      src: 'img/midia/tv-gazeta-voce-bonita-batatas-2.webp',
      alt: 'Andréa, então Andréa Marim, na bancada do Você Bonita com a apresentadora e pratos com batatas',
      legenda: 'Na bancada, com a apresentadora',
      veiculo: 'TV Gazeta',
      ano: '2020',
      inteira: true,
    },
    {
      src: 'img/midia/tv-gazeta-mural.webp',
      alt: 'Andréa, então Andréa Marim, diante do mural de fotos históricas da TV Gazeta',
      legenda: 'No mural da TV Gazeta',
      veiculo: 'TV Gazeta',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-gazeta-recepcao-3.webp',
      alt: 'Andréa, então Andréa Marim, de macacão azul na recepção da TV Gazeta, antes do Você Bonita',
      legenda: 'Antes do Você Bonita',
      veiculo: 'TV Gazeta',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-gazeta-bastidores.webp',
      alt: 'Andréa, então Andréa Marim, nos bastidores de um estúdio da TV Gazeta',
      legenda: 'Bastidores no estúdio',
      veiculo: 'TV Gazeta',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-gazeta-estudio.webp',
      alt: 'Andréa, então Andréa Marim, sentada na recepção da TV Gazeta',
      legenda: 'Dia de gravação',
      veiculo: 'TV Gazeta',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-redetv-olga-estudio.webp',
      alt: 'Andréa, então Andréa Marim, sentada no cenário do programa Olga, da RedeTV!',
      legenda: 'Convidada do programa Olga, com Olga Bongiovanni',
      veiculo: 'RedeTV!',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-redetv-olga-chamada.webp',
      alt: 'Chamada do programa Olga com Olga Bongiovanni e Andréa, então Andréa Marim: nesta terça-feira, a partir das 10h, na RedeTV!',
      legenda: 'Chamada da participação no programa Olga',
      veiculo: 'RedeTV!',
      ano: '2019',
      inteira: true,
    },
    {
      src: 'img/midia/tv-redetv-olga-bancada.webp',
      alt: 'Andréa, então Andréa Marim, conversando com Olga Bongiovanni diante de uma mesa de café da manhã no programa Olga',
      legenda: 'Com Olga Bongiovanni, falando de proteína',
      veiculo: 'RedeTV!',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-redetv-olga-edu-guedes.webp',
      alt: 'Andréa, então Andréa Marim, com Olga Bongiovanni e o chef Edu Guedes no cenário do programa Olga',
      legenda: 'Com Olga Bongiovanni e Edu Guedes',
      veiculo: 'RedeTV!',
      ano: '2019',
      inteira: true,
    },
    {
      src: 'img/midia/tv-redetv-olga-dieta-proteica.webp',
      alt: 'Estúdio do programa Olga durante a gravação, com Andréa, então Andréa Marim, Olga Bongiovanni e o cinegrafista',
      legenda: 'Gravação sobre dieta proteica',
      veiculo: 'RedeTV!',
      ano: '2019',
      inteira: true,
    },
    {
      src: 'img/midia/tv-redetv-bastidores.webp',
      alt: 'Andréa, então Andréa Marim, sentada numa poltrona azul nos bastidores da RedeTV!',
      legenda: 'Bastidores na emissora',
      veiculo: 'RedeTV!',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-redetv-camarim.webp',
      alt: 'Andréa, então Andréa Marim, no camarim da RedeTV! antes da gravação',
      legenda: 'No camarim, antes de entrar no ar',
      veiculo: 'RedeTV!',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-band-estudio.webp',
      alt: 'Andréa, então Andréa Marim, no estúdio da Band, ao lado da apresentadora, numa bancada com frutas',
      legenda: 'Convidada em estúdio',
      veiculo: 'Band',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-band-apresentadora.webp',
      alt: 'Andréa, então Andréa Marim, com a apresentadora no cenário do programa, ambas segurando canecas',
      legenda: 'Com a apresentadora, no cenário',
      veiculo: 'Band',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-band-terra-viva.webp',
      alt: 'Andréa, então Andréa Marim, diante dos monitores da redação do canal Terra Viva, da Band',
      legenda: 'Na redação do canal Terra Viva',
      veiculo: 'Band',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-band-fachada.webp',
      alt: 'Andréa, então Andréa Marim, sentada em frente ao logo da Band, na entrada da emissora',
      legenda: 'Dia de gravação na emissora',
      veiculo: 'Band',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-vida-plena-estudio.webp',
      alt: 'Andréa, então Andréa Marim, sendo entrevistada no estúdio do programa Vida Plena, com câmera em primeiro plano',
      legenda: 'Entrevista no programa Vida Plena',
      veiculo: 'Vida Plena',
      ano: '2019',
      inteira: true,
    },
    {
      src: 'img/midia/tv-rede-gospel.webp',
      alt: 'Andréa, então Andréa Marim, em frente ao logo da Rede Gospel',
      legenda: 'Alimentos para o coração',
      veiculo: 'Rede Gospel',
      ano: '2019',
      inteira: true,
    },
    {
      src: 'img/midia/tv-gospel-de-bem-com-a-vida.webp',
      alt: 'Andréa, então Andréa Marim, ao vivo no programa De Bem com a Vida, da Rede Gospel, com a tarja Alimentos que fazem bem para o coração',
      legenda: 'Ao vivo no De Bem com a Vida',
      veiculo: 'Rede Gospel',
      ano: '2019',
      inteira: true,
    },
    {
      src: 'img/midia/tv-gospel-keila-lima.webp',
      alt: 'Andréa, então Andréa Marim, com a apresentadora Keila Lima no cenário de Natal do programa, na Rede Gospel',
      legenda: 'Com Keila Lima',
      veiculo: 'Rede Gospel',
      ano: '2021',
    },
    {
      src: 'img/midia/tv-papo-em-dia-faccioli.webp',
      alt: 'Andréa, então Andréa Marim, no estúdio do programa Papo em Dia com o apresentador Luciano Faccioli e a apresentadora',
      legenda: 'No Papo em Dia, com Luciano Faccioli',
      veiculo: 'Papo em Dia',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-papo-em-dia-estudio.webp',
      alt: 'Andréa, então Andréa Marim, gravando no estúdio do programa Papo em Dia, com câmera em primeiro plano',
      legenda: 'Gravação no estúdio do Papo em Dia',
      veiculo: 'Papo em Dia',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-rit-nosso-programa-entrevista.webp',
      alt: 'Andréa, então Andréa Marim, sendo entrevistada no estúdio do Nosso Programa sobre o que comer antes e depois do treino',
      legenda: 'O que comer no pré e pós-treino',
      veiculo: 'RIT TV · Nosso Programa',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-rit-nosso-programa-estudio.webp',
      alt: 'Bastidores do Nosso Programa, com câmera em primeiro plano e Andréa, então Andréa Marim, no cenário',
      legenda: 'Bastidores do Nosso Programa',
      veiculo: 'RIT TV · Nosso Programa',
      ano: '2019',
    },
    {
      src: 'img/midia/tv-record-entrevista.webp',
      alt: 'Andréa, então Andréa Marim, dando entrevista para uma repórter da Record, com câmera e microfone',
      legenda: 'Entrevista para a Record',
      veiculo: 'Record',
      ano: '2019',
    },
  ],

  // Raio-X 360º do Emagrecimento™. As perguntas ficam em
  // src/lib/raioxPerguntas.js (o mesmo arquivo usado pelo servidor).
  // "™" indica marca em uso, sem registro; não usar "®" enquanto não houver
  // registro no INPI.
  raioX: {
    nome: 'Raio-X 360º do Emagrecimento™',
    nomeCurto: 'Raio-X 360º',
    // Questionário próprio do site (caminho interno). Pode ser trocado por um
    // link externo (https://...) se um dia usar outra ferramenta.
    url: 'raio-x/questionario/',
    formula: ['Corpo', 'Comportamento', 'Rotina', 'Ambiente', 'Adesão'],
    metodo: ['Avaliar', 'Identificar gargalos', 'Definir prioridades', 'Criar estratégia', 'Acompanhar', 'Ajustar'],
    // Pilares do círculo (a ordem define a posição, começando no topo).
    areasConfirmadas: true,
    areas: ['Alimentação', 'Corpo', 'Rotina', 'Comportamento', 'Adesão', 'Ambiente'],
    tempo: 'de 15 a 20 minutos',
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
      // Raio-X 360º: preto, branco e dourado (só nas seções do Raio-X).
      preto: '#1C1E1D', // fundo das seções do Raio-X 360º
      dourado: '#C2A36B', // linhas, ícones e textos sobre o preto (≈7:1)
      douradoClaro: '#DCC596', // títulos em destaque sobre o preto
      douradoTexto: '#7A5F2C', // dourado legível sobre fundo claro (≥4,5:1)
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
      titulo: 'Raio-X 360º do Emagrecimento | Andréa Augusto de Oliveira',
      descricao: 'Avaliação estratégica de alimentação, comportamento, rotina, ambiente e adesão para entender o que pode estar dificultando o seu emagrecimento antes de definir a estratégia.',
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
