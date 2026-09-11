// Conteúdo do módulo bônus "Comportamento Alimentar & Sabotagem no Emagrecimento",
// extraído do material educativo criado pela Andréa. Cada padrão vira um "#" (título),
// que o RichText (web/src/components/RichText.jsx) transforma num acordeão clicável.
const BLOCKS = [
  {
    title: 'Bloco 01 · As emoções que a gente tenta comer',
    intro:
      'Fome que não nasce no estômago — nasce no peito. Os oito padrões mais comuns de usar comida para regular um sentimento.',
    patterns: [
      {
        num: 1,
        title: 'Fome Emocional',
        vidaReal:
          'Você chega em casa depois de um dia difícil e, sem nem decidir conscientemente, já está com a geladeira aberta. Não era fome física — a barriga não estava roncando —, mas parecia urgente, quase incontrolável.',
        sente:
          'Um alívio imediato ao comer, seguido, minutos depois, de culpa ou vazio. A sensação de "eu sabia que não precisava comer isso, mas comi assim mesmo".',
        porque:
          'Desde muito cedo aprendemos a associar comida a conforto — colo, prêmio, celebração, consolo. O cérebro não diferencia bem "dor emocional" de "fome física": ambas ativam circuitos parecidos de busca por alívio. Comer vira o caminho mais rápido e mais socialmente aceito para regular uma emoção difícil.',
        atrapalha:
          'Você fica tentando resolver com dieta um problema que é emocional. Resultado: mesmo comendo "certinho" durante o dia, as emoções da noite desmontam o esforço, e a sensação de fracasso se repete todo santo dia.',
        solucao:
          'Antes de comer, faça uma pergunta simples: "Isso é fome de boca ou fome de peito?" Se for emocional, dê um nome ao que você sente (cansaço, frustração, solidão) antes de decidir o que fazer com isso — muitas vezes o alívio não está na comida, mas em ser ouvida, descansar ou se movimentar.',
        frase: 'Eu não estava com fome. Eu estava com o dia inteiro dentro de mim.',
        refs: 'Geneen Roth (Women, Food, and God), Susan Albers (Eating Mindfully), Judson Brewer (The Craving Mind).',
      },
      {
        num: 2,
        title: 'Comer por Ansiedade',
        vidaReal:
          'Antes de uma reunião importante, de uma conversa difícil ou só com o pensamento acelerado à noite, sua mão vai direto para o pacote de biscoito — nem percebe que já comeu metade.',
        sente:
          'Uma inquietação no corpo que parece pedir "faz alguma coisa AGORA". Mastigar acalma por alguns segundos, como se ocupasse a boca e a mente ao mesmo tempo.',
        porque:
          'A ansiedade ativa o sistema nervoso simpático, deixando o corpo em estado de alerta. Comer, especialmente carboidratos e açúcar, gera uma sensação rápida de regulação porque libera serotonina temporariamente. É automedicação, só que com comida.',
        atrapalha:
          'A pessoa come sem registrar quantidade nem sabor — o corpo recebe calorias, mas a mente não recebe a satisfação que buscava. A ansiedade continua, e agora soma-se a sensação de "comi demais de novo".',
        solucao:
          'Trabalhar a ansiedade na raiz (respiração, regulação do sistema nervoso, terapia quando necessário) em vez de tentar resolvê-la só com "força de vontade" na hora da comida. Ter um "cardápio de alívio" sem comida pronto para os momentos de pico: água gelada, caminhada curta, mensagem de voz para uma amiga.',
        frase: 'Minha ansiedade sempre encontra a cozinha antes de encontrar a saída.',
        refs: 'Kelly McGonigal (The Willpower Instinct), Judson Brewer (Unwinding Anxiety).',
      },
      {
        num: 3,
        title: 'Comer por Estresse (o efeito do cortisol)',
        vidaReal:
          'Semana de prazo apertado, casa bagunçada, contas para pagar — e de repente você percebe que está "beliscando" o dia inteiro, sem nem lembrar direito o que comeu.',
        sente: 'Uma vontade específica por comida gordurosa e doce, não qualquer comida. Depois, cansaço e peso no corpo, mas o estresse continua lá.',
        porque:
          'O cortisol, hormônio do estresse crônico, aumenta o apetite e direciona especificamente o desejo para "comfort food" — cientistas já mostraram que estresse sustentado altera a preferência alimentar do cérebro, não só a fome. É biologia, não fraqueza.',
        atrapalha:
          'Estresse crônico mantém o cortisol elevado, o que favorece acúmulo de gordura abdominal e aumenta a compulsão por alimentos calóricos — um ciclo que nenhuma dieta sozinha quebra, porque a causa não está no prato.',
        solucao:
          'Tratar o estresse como parte do plano de emagrecimento, não como algo "paralelo". Pausas reais ao longo do dia, sono de qualidade e organização de rotina reduzem cortisol tanto quanto (às vezes mais que) qualquer ajuste alimentar.',
        frase: 'Eu não estou sem disciplina. Eu estou sobrecarregada, e ninguém perguntou isso pra mim.',
        refs: "Robert Sapolsky (Why Zebras Don't Get Ulcers), Elissa Epel (pesquisa sobre estresse, cortisol e gordura abdominal).",
      },
      {
        num: 4,
        title: 'Comer por Tédio',
        vidaReal:
          'Domingo à tarde, sem nada específico para fazer. Você já abriu a geladeira três vezes em uma hora, sem fome nenhuma — só procurando alguma coisa para fazer.',
        sente: 'Uma inquietação vaga, quase um "vazio de estímulo". Comer dá uma sensação momentânea de propósito e prazer.',
        porque:
          'O tédio é desconfortável para o cérebro, que busca ativamente estímulo e recompensa. Comida é um dos estímulos mais acessíveis e imediatos que existem — mais fácil que resolver o tédio de verdade.',
        atrapalha:
          'É um dos tipos de "comer sem fome" mais difíceis de perceber, porque não vem com emoção forte — parece inofensivo, mas se repete várias vezes por semana e soma calorias sem nenhum prazer real associado.',
        solucao:
          'Ter uma lista pronta de "o que fazer quando estou entediada" longe da cozinha — ligar para alguém, organizar uma gaveta, sair para tomar um ar. O ponto não é proibir a comida, é notar que a fome ali é de estímulo, não de nutriente.',
        frase: 'Eu não estava com fome. Eu só não sabia o que fazer com o silêncio.',
        refs: 'Susan Albers (Eating Mindfully), Brian Wansink (Mindless Eating).',
      },
      {
        num: 5,
        title: 'Comer por Solidão',
        vidaReal:
          'Depois que os filhos foram dormir, ou num fim de semana sozinha em casa, a comida vira companhia. Às vezes é um prato a mais, às vezes é ficar "beliscando" na frente da TV até tarde.',
        sente: 'Um vazio que a comida preenche por alguns minutos — o ato de comer em si já traz uma sensação de acolhimento, mesmo sem ninguém por perto.',
        porque:
          'Comer é, biologicamente e culturalmente, um ato social. Quando falta conexão humana real, o cérebro busca no ritual da comida algo parecido com companhia — sabor, textura, o próprio hábito de "sentar para comer".',
        atrapalha:
          'A pessoa come em quantidade e frequência maiores do que faria acompanhada, muitas vezes de forma automática, sem realmente saborear — porque o objetivo nunca foi nutrir o corpo, era preencher a ausência de vínculo.',
        solucao:
          'Criar rituais de conexão real (mesmo que curtos: uma ligação, uma mensagem, um encontro semanal) e observar se a vontade de comer aparece mais nos períodos de maior isolamento — isso já é um dado importante sobre onde investir energia.',
        frase: 'Eu não estava com fome de comida. Eu estava com fome de companhia.',
        refs: 'Julianne Holt-Lunstad (pesquisas sobre solidão e saúde), Geneen Roth (Women, Food, and God).',
      },
      {
        num: 6,
        title: 'Comer por Culpa',
        vidaReal:
          'Você "escapou" da dieta no almoço e, à noite, pensa: "já que estraguei o dia, posso comer o resto também" — e come muito mais do que comeria se não tivesse esse pensamento.',
        sente: 'Uma mistura de raiva de si mesma e permissão simultânea — como se a culpa autorizasse continuar exagerando.',
        porque:
          'Isso tem nome na ciência do comportamento: **efeito "que se dane"** (what-the-hell effect), descrito pelos pesquisadores Janet Polivy e Peter Herman. Quando alguém que segue regras alimentares rígidas quebra uma regra, o cérebro interpreta isso como "o dia já era", abandonando qualquer moderação — mais culpa gera mais descontrole, não menos.',
        atrapalha:
          'Um pequeno deslize (que sozinho não faria diferença nenhuma no resultado final) vira um exagero muito maior, porque a culpa — e não a comida em si — é o gatilho do descontrole.',
        solucao:
          'Substituir a régua de "certo x errado" por uma régua de continuidade: um deslize é só uma refeição, não é o fim do dia nem da semana. A próxima escolha, e não a última, é o que importa.',
        frase: 'Eu não exagero por causa do que comi. Eu exagero por causa do que penso depois que como.',
        refs: 'Janet Polivy & C. Peter Herman (teoria da restrição alimentar), Kristin Neff (autocompaixão).',
      },
      {
        num: 7,
        title: 'Comer Escondido',
        vidaReal:
          'Você come "certinho" na frente dos outros e, sozinha, no carro, no banheiro ou tarde da noite, come o que realmente quer — rápido, quase às escondidas, como se estivesse fazendo algo proibido.',
        sente: 'Vergonha misturada com uma espécie de alívio proibido. Muitas vezes nem lembra direito de ter comido, porque foi tão rápido e tão automático.',
        porque:
          'Anos de julgamento (dos outros ou de si mesma) sobre o que "deveria" comer criam uma cisão entre a alimentação pública e a privada. Comer escondido é uma forma de fugir do julgamento — inclusive do próprio.',
        atrapalha:
          'Reforça a vergonha, que por sua vez alimenta mais o ciclo de restrição-descontrole. Também impede que a pessoa peça ajuda, porque tem vergonha de admitir o próprio padrão — o segredo vira uma prisão.',
        solucao:
          'Praticar comer sem julgamento na frente de alguém de confiança, nomear em voz alta (para si mesma ou para um terapeuta/nutricionista) o que costuma ser feito escondido. Tirar o segredo do comportamento tira parte do seu poder.',
        frase: 'Eu tenho vergonha de comer na frente dos outros o que eu como sozinha.',
        refs: 'Susan Albers, Anne Katherine (Anatomy of a Food Addiction).',
      },
      {
        num: 8,
        title: 'Comer para Aliviar a Tristeza (Comida como Consolo)',
        vidaReal:
          'Depois de um término, uma perda, uma notícia ruim ou só um dia de choro contido, vem aquela vontade de um prato "de infância" — aquela comida que lembra colo.',
        sente: 'Um conforto quase físico, uma sensação de ser cuidada, mesmo sabendo que é você mesma se servindo.',
        porque:
          'Muitas memórias afetivas da infância estão ligadas à comida — quem nunca ganhou um doce para "parar de chorar"? O cérebro grava essa associação profundamente: comida = cuidado = alívio da dor.',
        atrapalha:
          'A tristeza não resolvida continua voltando, e a comida vira o único recurso disponível de regulação emocional, criando dependência de um alívio que dura minutos, mas nunca resolve a causa.',
        solucao:
          'Identificar quais são as suas "comidas-colo" e criar, paralelamente, outras fontes reais de cuidado — um banho demorado, uma conversa, chorar sem pressa. A comida pode continuar presente, só não pode ser a única ferramenta.',
        frase: 'Eu aprendi cedo demais que a dor se disfarça de fome.',
        refs: 'Geneen Roth, Gabor Maté (conexão entre emoção não processada e comportamentos compulsivos).',
      },
    ],
  },
  {
    title: 'Bloco 02 · O corpo, o cérebro e o piloto automático',
    intro: 'Compulsão, recompensa, dopamina e hábitos que acontecem antes de qualquer decisão consciente.',
    patterns: [
      {
        num: 9,
        title: 'Compulsão Alimentar (Episódios de Descontrole)',
        vidaReal:
          'Em determinados momentos, você come uma quantidade grande de comida em pouco tempo, rápido, sem realmente sentir sabor, mesmo sem fome — e depois sente que "perdeu o controle" completamente.',
        sente: 'Durante o episódio, uma espécie de anestesia emocional. Depois, vergonha intensa, culpa e, às vezes, desespero — "o que está acontecendo comigo?"',
        porque:
          'A compulsão alimentar costuma ser resultado direto de ciclos de restrição extrema — o corpo, que passou fome (real ou percebida), reage com um comando biológico de comer o máximo possível quando a comida está disponível. Não é falta de caráter, é fisiologia de sobrevivência somada a regulação emocional deficitária.',
        atrapalha:
          'Cria um ciclo vicioso: restringe → compulsa → culpa → restringe mais → compulsa de novo. Cada tentativa de "consertar" com mais dieta piora o próximo episódio.',
        solucao:
          'Parar de restringir de forma extrema é, contraintuitivamente, o primeiro passo para reduzir episódios de compulsão. Quando a compulsão é frequente e intensa, buscar acompanhamento profissional (nutricionista comportamental e/ou psicólogo) é essencial — não é algo para "resolver sozinha na força de vontade".',
        frase: 'Eu não escolho comer daquele jeito. É como se outra pessoa assumisse o controle por alguns minutos.',
        refs: 'Ashley Gearhardt (Yale Food Addiction Scale), Judson Brewer, critérios do DSM-5 para Transtorno de Compulsão Alimentar Periódica (TCAP).',
      },
      {
        num: 10,
        title: 'Comida, Recompensa e Dopamina',
        vidaReal:
          'Terminou uma tarefa difícil? "Mereço" um doce. Passou por uma semana puxada no trabalho? "Mereço" pedir aquele delivery. A comida virou o prêmio automático de qualquer esforço.',
        sente: 'Uma antecipação prazerosa antes mesmo de comer — o "mereço isso" já ativa parte da recompensa.',
        porque:
          'Alimentos ricos em açúcar e gordura ativam fortemente o sistema de dopamina do cérebro, o mesmo circuito envolvido em outras formas de recompensa e, em graus variados, de dependência. Usar comida como prêmio reforça esse circuito toda vez.',
        atrapalha:
          'Cada "recompensa" alimentar fortalece a associação entre esforço/estresse e comida calórica, tornando cada vez mais difícil quebrar o padrão — o cérebro passa a esperar (e cobrar) essa recompensa.',
        solucao:
          'Criar uma lista de recompensas não alimentares genuinamente prazerosas (um tempo sem culpa, uma compra pequena, um banho de banheira, uma série nova) para reeducar o cérebro a associar conquista a outras formas de prazer.',
        frase: 'Eu troco todo esforço meu por comida, como se fosse a única moeda de valor que eu conheço.',
        refs: 'Nora Volkow (NIDA — neurociência da recompensa e dependência), Robert Lustig (The Hacking of the American Mind).',
      },
      {
        num: 11,
        title: 'Comida como Afeto',
        vidaReal:
          '"Comendo mais um pouco?" é a forma como sua família mostra amor — recusar parece rejeitar quem preparou. Festas, visitas, domingos em família giram em torno de fartura.',
        sente: 'Culpa ao dizer não, mesmo sem fome, porque comer parece ser sinônimo de gratidão e pertencimento.',
        porque:
          'Em muitas famílias e culturas, alimentar o outro é a linguagem do cuidado. Aprendemos, desde crianças, que comer é retribuir amor — e recusar comida pode ser lido, mesmo sem querer, como recusar afeto.',
        atrapalha:
          'A pessoa come além da fome real em praticamente todo encontro social ou familiar, porque dizer "não, obrigada" ativa um desconforto emocional maior do que comer sem vontade.',
        solucao:
          'Separar, com gentileza, o afeto da comida: agradecer verbalmente, elogiar o prato, ficar mais tempo na mesa conversando — sem que isso precise significar comer além do que o corpo pede.',
        frase: 'Na minha família, amor sempre veio com prato cheio.',
        refs: 'Ellyn Satter (relação entre alimentação, família e vínculo), Brian Wansink (memórias afetivas e comportamento alimentar).',
      },
      {
        num: 12,
        title: 'Hábitos Automáticos (Piloto Automático / Comer sem Perceber)',
        vidaReal:
          'Você abre o pacote de bolacha sem nem pensar, assistindo TV. Quando percebe, já está na metade — e nem lembra do sabor do começo.',
        sente: 'Quase nada, no momento — é essa a questão: o comportamento acontece sem consciência nenhuma.',
        porque:
          'Hábitos são a forma que o cérebro encontrou de economizar energia: repita algo várias vezes no mesmo contexto (sofá + TV, por exemplo) e ele se torna automático, disparado por pistas ambientais, sem precisar de decisão consciente.',
        atrapalha:
          'A pessoa come calorias que nem registra, o que torna quase impossível fazer ajustes conscientes — não dá para mudar o que não se percebe que está fazendo.',
        solucao:
          'Trocar o "combate à força de vontade" por **mudança de contexto**: comer sempre à mesa, sem tela, com o pacote servido num prato (não direto da embalagem) — isso já reduz drasticamente o consumo automático.',
        frase: 'Eu não decido comer. Eu simplesmente me vejo comendo.',
        refs: 'Charles Duhigg (The Power of Habit), Wendy Wood (Good Habits, Bad Habits), BJ Fogg (Tiny Habits).',
      },
      {
        num: 13,
        title: 'Beliscar sem Perceber (Grazing)',
        vidaReal:
          'Um punhado de amendoim aqui, um pedaço de pão ali, um "só um pouquinho" da sobremesa das crianças — ao longo do dia, isso vira uma refeição inteira sem nenhuma delas parecer "uma refeição".',
        sente:
          'A sensação de que "não comeu quase nada hoje", mesmo tendo ingerido uma quantidade considerável de calorias — a fragmentação engana a percepção.',
        porque:
          'Petiscar é reforçado pela disponibilidade e visibilidade da comida (pesquisas mostram que comida visível é consumida em quantidade muito maior do que comida guardada) e pela ausência de um "início e fim" claro de refeição, o que dificulta o cérebro registrar saciedade.',
        atrapalha:
          'É um dos padrões mais subestimados: como nenhuma refeição parece "grande", a pessoa acredita estar comendo pouco, o que gera frustração quando a balança não corresponde ao que ela acha que está fazendo.',
        solucao:
          'Guardar comida fora da linha de visão, definir horários certos de refeição e lanches (mesmo que flexíveis) e, ao beliscar, servir numa tigela pequena em vez de comer direto do pacote ou da geladeira.',
        frase: 'Eu juro que não como quase nada... só belisco o dia inteiro.',
        refs: 'Brian Wansink (Mindless Eating — pesquisas sobre visibilidade e consumo).',
      },
      {
        num: 14,
        title: 'Comer Rápido Demais / Desconexão da Saciedade',
        vidaReal:
          'Você termina o prato antes de todo mundo, muitas vezes sem nem lembrar do sabor — e cinco, dez minutos depois, sente que "ainda cabe mais".',
        sente: 'Ausência de sinal de "chega" no momento certo — a saciedade parece sempre chegar tarde demais, já com o prato vazio.',
        porque:
          'O cérebro leva, em média, cerca de 15 a 20 minutos para registrar sinais de saciedade vindos do estômago. Comer rápido significa terminar antes que esse sinal chegue — o corpo não teve tempo de avisar.',
        atrapalha:
          'A pessoa consistentemente come além do necessário, não por falta de controle, mas por um descompasso de tempo entre o ato de comer e o sinal biológico de parar.',
        solucao:
          'Colocar o talher na mesa entre garfadas, mastigar mais devagar, beber água durante a refeição — pequenos ajustes mecânicos que dão tempo ao corpo de "avisar" antes do prato acabar.',
        frase: 'Eu só sinto que comi demais depois que já é tarde demais.',
        refs: 'Ellyn Satter, Evelyn Tribole & Elyse Resch (Intuitive Eating).',
      },
    ],
  },
  {
    title: 'Bloco 03 · Os pensamentos que sabotam por dentro',
    intro: 'Regras rígidas, restrição e culpa — a engenharia mental por trás do ciclo dieta-descontrole.',
    patterns: [
      {
        num: 15,
        title: 'Mentalidade de Tudo ou Nada',
        vidaReal:
          'Segunda-feira você começa "certinha", com tudo planejado. Na quarta, um deslize — e o resto da semana já era, porque "estragou mesmo, só recomeço na próxima segunda".',
        sente: 'Uma sensação binária: ou está 100% no controle, ou está completamente fora dele. Não existe meio-termo na sua cabeça.',
        porque:
          'Anos de dietas com regras rígidas (proibido x permitido) treinam o cérebro a pensar em categorias absolutas. É um padrão de pensamento, não um traço de personalidade — e pensamento em categorias absolutas é um dos vieses cognitivos mais estudados em terapia cognitivo-comportamental.',
        atrapalha:
          'Transforma um deslize pequeno (que não faria diferença nenhuma sozinho) em dias ou semanas de descontrole, porque a régua não permite "imperfeição sustentável" — só perfeição ou fracasso.',
        solucao:
          'Praticar deliberadamente a ideia de "70% bom na maioria dos dias" como meta real, em vez de 100% às vezes e 0% no resto. Consistência imperfeita emagrece mais do que perfeição interrompida.',
        frase: 'Pra mim, ou é tudo certo, ou já não vale mais a pena.',
        refs: 'Traci Mann (Secrets from the Eating Lab), Janet Polivy & Peter Herman (teoria da restrição), Terapia Cognitivo-Comportamental (Aaron Beck, David Burns) sobre pensamento dicotômico.',
      },
      {
        num: 16,
        title: 'Restrição Alimentar Excessiva',
        vidaReal:
          'Cortar carboidrato completamente, evitar convites sociais para "não ser tentada", contar cada caloria com rigidez extrema — a dieta vira um regime quase militar.',
        sente: 'No começo, uma sensação de controle e até orgulho. Depois de um tempo, obsessão com comida, irritabilidade e uma vontade cada vez mais difícil de conter.',
        porque:
          'O corpo humano interpreta restrição severa como escassez — não sabe diferenciar "dieta" de "fome real". Ele reage biologicamente, aumentando hormônios da fome (grelina) e reduzindo os da saciedade (leptina), além de deixar a mente hiperfocada em comida.',
        atrapalha:
          'Restrição extrema quase sempre é seguida de compensação (comer em excesso) — é biologia, não fraqueza. Quanto mais rígida a dieta, maior a chance estatística de recuperar o peso perdido e mais.',
        solucao:
          'Trocar restrição total por moderação estruturada, incluindo os alimentos que a pessoa gosta em porções adequadas. Dietas sustentáveis permitem prazer — e é exatamente isso que as torna sustentáveis.',
        frase: 'Quanto mais eu me proíbo, mais eu penso naquilo o dia inteiro.',
        refs: 'Ancel Keys (Minnesota Starvation Experiment), Traci Mann (Secrets from the Eating Lab).',
      },
      {
        num: 17,
        title: 'Medo de Sentir Fome',
        vidaReal:
          'Você evita passar mais de duas horas sem comer, carrega lanches por precaução, ou pelo contrário: tem pavor de comer "demais" e passa fome por horas de propósito, achando que isso "acelera" o emagrecimento.',
        sente: 'Ansiedade em relação à própria fome — como se sentir fome fosse, em si, um problema a ser evitado a qualquer custo, seja comendo antecipadamente, seja reprimindo.',
        porque:
          'Anos de dietas que trataram a fome como "inimiga" (ou, no extremo oposto, dietas que geraram episódios reais de fome extrema e sofrimento) desconectaram a pessoa dos próprios sinais internos — fome virou gatilho de medo, não uma informação neutra do corpo.',
        atrapalha:
          'Sem confiar nos próprios sinais de fome e saciedade, a pessoa depende inteiramente de regras externas (horários, quantidades fixas), o que é frágil e insustentável a longo prazo.',
        solucao:
          'Reaprender, aos poucos e com apoio profissional se necessário, a reconhecer fome física em diferentes intensidades — sem urgência nem pânico. Fome moderada antes das refeições é normal e esperada, não um sinal de descontrole.',
        frase: 'Eu tenho medo da minha própria fome — como se ela fosse me trair.',
        refs: 'Evelyn Tribole & Elyse Resch (Intuitive Eating), Ellyn Satter.',
      },
      {
        num: 18,
        title: 'Efeito Sanfona (Weight Cycling)',
        vidaReal:
          'Você já emagreceu e engordou o mesmo peso (às vezes mais) tantas vezes que perdeu a conta. Cada nova dieta começa com esperança e termina no mesmo lugar — ou pior.',
        sente: 'Descrença crescente na própria capacidade de mudar, mesmo tentando de verdade a cada nova vez. Uma exaustão emocional que vai além do físico.',
        porque:
          'Dietas radicais de curto prazo, sem mudança real de hábitos, geram perda de peso rápida (em parte massa magra) seguida de reganho igualmente rápido — muitas vezes o corpo reganha mais gordura proporcionalmente do que tinha antes, um mecanismo de proteção evolutiva contra "escassez".',
        atrapalha:
          'Cada ciclo de sanfona pode tornar o próximo emagrecimento mais difícil metabolicamente, além de desgastar a autoconfiança — a pessoa começa a acreditar que "seu corpo não funciona", quando na verdade o método é que não funcionava.',
        solucao:
          'Abandonar dietas de curto prazo e restrição extrema em favor de mudanças graduais, sustentáveis e centradas em preservar massa muscular — o objetivo não é perder peso rápido, é não precisar recuperar.',
        frase: 'Eu já emagreci o mesmo peso tantas vezes que nem sei mais o que é o meu corpo de verdade.',
        refs: 'Sophie Deram (O Peso das Dietas), Traci Mann (Secrets from the Eating Lab).',
      },
      {
        num: 19,
        title: 'Dieta de Segunda a Sexta, Solta no Fim de Semana',
        vidaReal:
          'De segunda a sexta você segue tudo à risca. No fim de semana, "libera geral" — e muitas vezes essa liberação sozinha desfaz o déficit calórico da semana inteira.',
        sente:
          'Alívio genuíno ao "descansar" da rigidez, seguido, no domingo à noite ou segunda de manhã, de peso na consciência e vontade de recomeçar "com tudo".',
        porque:
          'Regras alimentares muito rígidas de segunda a sexta criam uma pressão psicológica que precisa de válvula de escape — o fim de semana vira essa válvula, reforçando o ciclo restrição-descontrole em looping semanal.',
        atrapalha:
          'Dois dias de exagero podem anular cinco dias de esforço, e o padrão se repete toda semana indefinidamente, sem gerar progresso real, mesmo com muito esforço percebido.',
        solucao:
          'Criar um padrão alimentar mais parecido de segunda a domingo, com flexibilidade real (não regras extremas) todos os dias — isso reduz a necessidade psicológica da "válvula de escape" do fim de semana.',
        frase: 'Minha vida alimentar tem duas personalidades: a de segunda a sexta e a do fim de semana.',
        refs: 'Janet Polivy & Peter Herman (restraint theory), Kelly McGonigal.',
      },
      {
        num: 20,
        title: 'Autopunição Pós-Exagero',
        vidaReal:
          'Depois de comer "demais", você pula a próxima refeição, faz jejum punitivo ou se castiga com treino exagerado — como se precisasse "pagar" pelo que comeu.',
        sente: 'Raiva de si mesma transformada em ação drástica — a punição parece a única forma de "consertar" o erro.',
        porque:
          'Crescemos com uma cultura que trata comida como questão moral ("comi mal, fui má"), e o corpo vira palco de punição por uma culpa que, na verdade, é emocional, não física.',
        atrapalha:
          'Restringir ainda mais após um exagero reforça exatamente o ciclo de restrição-compulsão descrito antes — a punição não previne o próximo episódio, ela alimenta.',
        solucao:
          'Depois de comer além do planejado, a próxima refeição deve ser normal, não compensatória. Tratar o corpo com neutralidade, não com vingança, é o que quebra o ciclo.',
        frase: 'Eu trato meu corpo como se ele precisasse pagar pelo que eu comi.',
        refs: 'Kristin Neff (autocompaixão), Brené Brown (vergonha e resiliência).',
      },
      {
        num: 21,
        title: 'Moralização da Comida (Comida Boa x Comida Má)',
        vidaReal:
          'Você chama alimentos de "limpos" ou "sujos", sente-se "boa" quando come salada e "culpada" quando come pizza — como se o valor moral da pessoa dependesse do prato.',
        sente: 'Autojulgamento constante ligado às próprias escolhas alimentares, quase como um tribunal interno funcionando o dia inteiro.',
        porque:
          'A cultura das dietas (e das redes sociais) transformou comida em identidade moral — "comer limpo" virou sinônimo de "ser uma pessoa melhor". Isso é reforçado por décadas de marketing de indústria de dietas.',
        atrapalha:
          'Gera ansiedade em torno de cada escolha alimentar, o que paradoxalmente aumenta o risco de compulsão e de comer escondido — comida vira campo de batalha moral, não nutrição.',
        solucao:
          'Praticar linguagem neutra: comida é só comida — mais ou menos nutritiva, não "boa" ou "má". Nenhuma refeição isolada define caráter, saúde ou sucesso.',
        frase: 'Eu me sinto uma pessoa melhor nos dias que como salada, e pior nos dias que não como.',
        refs: 'Michael Pollan, Evelyn Tribole & Elyse Resch, Ellyn Satter.',
      },
    ],
  },
  {
    title: 'Bloco 04 · O corpo visto, comparado e adiado',
    intro: 'Vergonha, comparação e as formas mais silenciosas de adiar a própria mudança.',
    patterns: [
      {
        num: 22,
        title: 'Vergonha do Corpo',
        vidaReal:
          'Evitar espelhos, fotos, festas, praia, provas de roupa. Escolher sempre a cadeira "mais discreta", vestir preto para "disfarçar", cancelar planos por não gostar de como está o corpo naquele dia.',
        sente: 'Uma vontade de desaparecer, de não ser vista — vergonha não é só desconforto, é a sensação de que o próprio corpo é um erro a ser escondido.',
        porque:
          'Vergonha corporal é construída por décadas de exposição a padrões inatingíveis, comentários (mesmo "bem-intencionados") sobre peso, e uma cultura que trata o valor da mulher como proporcional ao tamanho do corpo.',
        atrapalha:
          'Paradoxalmente, vergonha não motiva mudança sustentável — ela paralisa. Estudos em psicologia mostram que vergonha crônica está associada a mais compulsão alimentar, mais isolamento e menos comportamentos de autocuidado, não menos.',
        solucao:
          'Separar autoestima de peso corporal — trabalhar a relação com o corpo em paralelo ao processo de emagrecimento, não depois dele. Autocompaixão, não autocrítica, é o que sustenta mudança de longo prazo.',
        frase: 'Eu não evito só o espelho. Eu evito viver plenamente enquanto meu corpo não estiver do jeito que eu acho que precisa estar.',
        refs: 'Brené Brown (Daring Greatly), Kristin Neff, Deb Burgard (Health at Every Size).',
      },
      {
        num: 23,
        title: 'Comparação Corporal (Redes Sociais e Corpo do Passado)',
        vidaReal:
          'Rolar o feed e se comparar com corpos de influenciadoras, ou puxar fotos antigas e pensar "eu era tão melhor antes" — cada comparação deixando um rastro de insatisfação.',
        sente: 'Uma inadequação instantânea, mesmo sabendo racionalmente que fotos são editadas e que corpos mudam com o tempo (gestação, idade, saúde).',
        porque:
          'Comparação social é um mecanismo psicológico automático e antigo — mas as redes sociais amplificaram sua frequência e intensidade a níveis que o cérebro humano não foi desenhado para processar.',
        atrapalha:
          'Motivação baseada em comparação é instável e desgastante — funciona por impulsos curtos e intensos, seguidos de desânimo, em vez de sustentar constância real ao longo do tempo.',
        solucao:
          'Curar deliberadamente o próprio feed, e trocar a métrica de comparação: em vez de "como eu era" ou "como ela é", usar "como eu estou em relação a mim mesma na semana passada".',
        frase: 'Eu me comparo com uma versão de mim que talvez nunca mais volte — e isso me paralisa.',
        refs: 'Leon Festinger (teoria da comparação social), Jean Twenge (pesquisas sobre redes sociais e autoimagem).',
      },
      {
        num: 24,
        title: 'Autossabotagem no Emagrecimento',
        vidaReal:
          'Você compra os ingredientes certos e não cozinha. Marca a academia e cancela na última hora. Está indo bem por dias e, sem motivo aparente, "estraga" tudo justo quando os resultados começam a aparecer.',
        sente: 'Uma confusão real — "por que eu faço isso comigo mesma, se é o que eu mais quero?"',
        porque:
          'Autossabotagem frequentemente está ligada a conflitos internos não conscientes: medo de mudança (mesmo positiva), medo de atenção masculina ou social ao emagrecer, identidade construída em torno do corpo atual, ou simplesmente medo de tentar de verdade e falhar de novo.',
        atrapalha:
          'Interrompe o progresso justo no momento em que ele começaria a se consolidar, reforçando a crença de "eu não consigo mesmo", quando na verdade existe um medo específico por trás, ainda não nomeado.',
        solucao:
          'Perguntar-se, com honestidade, "o que eu ganho quando saboto?" — muitas vezes a resposta revela um medo específico (de decepcionar, de se expor, de mudar de identidade) que pode ser trabalhado diretamente.',
        frase: 'Eu quero emagrecer de verdade, mas parece que uma parte de mim trabalha contra isso.',
        refs: 'BJ Fogg (Tiny Habits), James Clear (Atomic Habits — identidade e comportamento), Kelly McGonigal.',
      },
      {
        num: 25,
        title: 'Procrastinação do "Segunda eu Começo"',
        vidaReal:
          'Toda decisão de mudança é adiada para a "próxima segunda-feira", o "dia 1 do mês" ou "depois dessa data especial" — e enquanto isso, "já que ainda não começei", vale comer à vontade.',
        sente: 'Alívio de adiar, misturado com uma sensação incômoda de estar sempre "prestes a começar", nunca de fato começando.',
        porque:
          'Datas simbólicas (segunda-feira, dia 1) funcionam psicologicamente como um "reset" que separa o "eu antigo" do "eu novo" — mas essa separação também vira desculpa para exagerar "antes" de começar, porque psicologicamente ainda não conta.',
        atrapalha:
          'Cria ciclos de exagero recorrentes toda vez que uma nova data de início se aproxima, além de adiar indefinidamente o começo real da mudança.',
        solucao:
          'Começar pequeno, hoje, sem esperar a data "perfeita" — mudança sustentável não precisa de um marco simbólico, precisa de uma ação pequena e possível agora.',
        frase: "Eu já perdi a conta de quantas segundas-feiras eu prometi que seriam 'a última vez'.",
        refs: 'BJ Fogg (Tiny Habits), James Clear (Atomic Habits).',
      },
    ],
  },
  {
    title: 'Bloco 05 · Sistema, ambiente e biologia',
    intro: 'Força de vontade, sono, decisão e ambiente — o que sustenta (ou derruba) tudo o que vem antes.',
    patterns: [
      {
        num: 26,
        title: 'Baixo Autocontrole Percebido (Esgotamento da Força de Vontade)',
        vidaReal:
          'Você resiste ao doce a manhã inteira, segura a vontade em cada reunião, evita a padaria no caminho — e à noite, exausta de tanto "resistir", cede a tudo de uma vez.',
        sente: 'A sensação física de estar "sem gasolina" para continuar resistindo — como se a força de vontade fosse um estoque que se esgota ao longo do dia.',
        porque:
          'A pesquisa em psicologia sobre **ego depletion** (esgotamento do ego) mostra que autocontrole funciona, em parte, como um recurso limitado: cada decisão que exige resistência consome reserva mental, deixando menos disponível para a próxima.',
        atrapalha:
          'Planos que dependem de resistir a tentações o dia inteiro estão condenados a falhar à noite, quando o estoque de autocontrole já foi consumido por outras dezenas de decisões do dia (trabalho, filhos, trânsito, finanças).',
        solucao:
          'Reduzir o número de decisões alimentares difíceis ao longo do dia (planejamento prévio, ambiente sem tentação constante) em vez de depender de força de vontade renovada a cada momento — economizar reserva mental para quando ela realmente for necessária.',
        frase: 'Eu não sou fraca à noite. Eu estou esgotada de resistir o dia inteiro.',
        refs: 'Roy Baumeister & John Tierney (Willpower), Kelly McGonigal (The Willpower Instinct).',
      },
      {
        num: 27,
        title: 'Fadiga de Decisão Alimentar',
        vidaReal:
          'Depois de um dia cheio de decisões — trabalho, casa, filhos, agenda —, na hora de decidir o que comer no jantar, você simplesmente não tem mais energia mental para escolher a opção mais trabalhosa ou saudável.',
        sente: 'Um cansaço mental específico, mesmo sem cansaço físico intenso — a simples ideia de "pensar em mais uma coisa" já parece insuportável.',
        porque:
          'Cada decisão consciente consome recursos cognitivos limitados. Quanto mais decisões uma pessoa toma ao longo do dia, pior (e mais impulsiva) tende a ser a qualidade das decisões seguintes — fenômeno bem documentado na psicologia cognitiva.',
        atrapalha:
          'À noite, quando a fadiga de decisão está no pico, a pessoa tende a escolher o caminho de menor esforço — geralmente delivery ou ultraprocessado —, mesmo tendo boas intenções pela manhã.',
        solucao:
          'Planejar refeições (principalmente o jantar) com antecedência, em momentos de energia mental mais alta, para eliminar a necessidade de decidir "no cansaço".',
        frase: 'Não é que eu não saiba o que é saudável. É que às 19h eu não tenho mais cabeça pra decidir isso.',
        refs: 'Roy Baumeister, Daniel Kahneman (Thinking, Fast and Slow).',
      },
      {
        num: 28,
        title: 'Identidade Antiga ("Eu Sou Assim Mesmo")',
        vidaReal:
          '"Eu sempre fui gordinha", "minha família toda é assim", "eu nunca consegui manter dieta nenhuma" — frases que soam como fato, mas na verdade são identidade internalizada, repetida por anos.',
        sente: 'Uma resignação silenciosa — como se mudar fosse ir contra quem você "realmente é", não apenas mudar um hábito.',
        porque:
          'Comportamentos repetidos por muito tempo se tornam parte da autoimagem. O cérebro busca coerência entre identidade e ação — se "eu sou uma pessoa que não consegue manter dieta" faz parte de quem você acredita ser, qualquer sucesso tende a ser sabotado, consciente ou inconscientemente, para manter essa coerência.',
        atrapalha:
          'Mudanças de comportamento baseadas só em força de vontade, sem mudança de identidade, tendem a durar pouco — porque a pessoa está, no fundo, "voltando a ser quem ela acredita que é" a cada recaída.',
        solucao:
          'Trabalhar pequenas evidências de uma nova identidade ("eu sou uma pessoa que cuida do corpo", não "eu estou de dieta") através de ações pequenas e repetidas — identidade muda por acúmulo de provas, não por decisão única.',
        frase: 'Não é que eu não consiga emagrecer. É que, no fundo, eu nem acredito que sou o tipo de pessoa que consegue.',
        refs: 'James Clear (Atomic Habits), Charles Duhigg.',
      },
      {
        num: 29,
        title: 'Falta de Constância / Dependência de Motivação',
        vidaReal:
          'Você começa cheia de energia — nova academia, novo aplicativo, novo plano — e em duas, três semanas, sem aquele "gás" inicial, tudo para. Sempre foi assim, em todas as tentativas.',
        sente: 'Frustração por "sempre começar bem e nunca terminar", como se faltasse alguma peça específica de disciplina que outras pessoas têm e você não.',
        porque:
          'Motivação é, por natureza, instável — ela oscila com sono, hormônios, humor, estresse do dia. Depender dela para sustentar uma mudança é depender de algo que, cientificamente, não é feito para durar.',
        atrapalha:
          'A pessoa interpreta a queda natural da motivação como fracasso pessoal ("eu não tenho disciplina"), quando na verdade o problema é estrutural: hábitos duradouros dependem de sistemas e rotina, não de picos emocionais de motivação.',
        solucao:
          'Construir hábitos pequenos o suficiente para acontecerem mesmo em dias de motivação zero (o oposto de metas grandiosas que só funcionam no pico de energia inicial) — consistência de sistema supera intensidade de motivação.',
        frase: 'Eu sempre começo com tudo e não sei por que nunca sustento.',
        refs: 'BJ Fogg (Tiny Habits — "motivação é pouco confiável"), James Clear.',
      },
      {
        num: 30,
        title: 'Ambiente Alimentar Sabotador',
        vidaReal:
          'Armário cheio de guloseimas "para as crianças", geladeira sem nada pronto e saudável para comer rápido, porções gigantes na cozinha por hábito de anos — o ambiente inteiro está desenhado contra o objetivo.',
        sente: 'A sensação de estar "lutando contra o próprio ambiente" o tempo todo, gastando energia mental em resistir a estímulos que estão, literalmente, dentro de casa.',
        porque:
          'Pesquisas em ciência do comportamento mostram, de forma consistente, que o ambiente prediz comportamento com mais força do que a força de vontade. Comida visível, acessível e em porções grandes é consumida em quantidade muito maior — independente da intenção da pessoa.',
        atrapalha:
          'A pessoa se culpa por "falta de disciplina" quando, na verdade, está competindo contra um ambiente desenhado (mesmo sem querer) para maximizar o consumo — uma batalha desigual, travada várias vezes por dia.',
        solucao:
          'Redesenhar o ambiente em vez de depender só de força de vontade: guardar tentações fora da vista, deixar opções saudáveis visíveis e de fácil acesso, usar pratos menores. Ambiente bem desenhado poupa decisões conscientes.',
        frase: 'Eu não sou fraca. Minha casa inteira está desenhada para eu comer mais do que eu quero.',
        refs: 'Brian Wansink, Wendy Wood (Good Habits, Bad Habits), BJ Fogg.',
      },
      {
        num: 31,
        title: 'Pressão Social para Comer',
        vidaReal:
          '"Só mais um pouquinho, vai", "você vai recusar minha comida?", "nossa, você tá comendo assim, tá de dieta de novo?" — a pressão do grupo empurra decisões que você não faria sozinha.',
        sente: 'Desconforto de ser vista como "diferente" ou "chata" por manter uma escolha alimentar diante dos outros — muitas vezes é mais fácil ceder do que sustentar o "não".',
        porque:
          'Somos seres profundamente sociais, e o medo de julgamento ou exclusão do grupo é um motivador poderoso e antigo — ceder à pressão social em torno de comida é, evolutivamente, uma forma de manter pertencimento.',
        atrapalha:
          'Decisões alimentares deixam de ser sobre o próprio corpo e passam a ser sobre gerenciar a reação alheia — o que torna praticamente impossível manter consistência em ambientes sociais recorrentes (família, trabalho, amizades).',
        solucao:
          'Preparar, com antecedência, frases simples e gentis de recusa ("estou bem assim, obrigada", "vou deixar para a próxima") e lembrar que a incômoda reação do outro não é sua responsabilidade de resolver.',
        frase: 'Eu digo sim pra comida mais pra não desagradar o outro do que porque eu realmente quero.',
        refs: 'Robert Cialdini (Influence — prova social), Ellyn Satter.',
      },
      {
        num: 32,
        title: 'Privação de Sono e Fome Hormonal',
        vidaReal:
          'Depois de uma noite mal dormida, o dia inteiro parece pedir açúcar e carboidrato — uma vontade diferente, mais intensa, quase incontrolável, mesmo em quem normalmente tem bom controle alimentar.',
        sente: 'Fome física real e mais intensa, além de menos capacidade de resistir a impulsos — como se o "freio" interno estivesse desligado.',
        porque:
          'Sono insuficiente altera diretamente os hormônios da fome: aumenta a grelina (que estimula apetite) e reduz a leptina (que sinaliza saciedade). Some a isso a redução da função do córtex pré-frontal (responsável por decisões racionais) quando privado de sono — é uma tempestade hormonal e cognitiva perfeita para comer mais.',
        atrapalha:
          'Especialmente relevante para mulheres na perimenopausa e menopausa, cujo sono já é naturalmente mais fragmentado — dietas podem parecer "não funcionar", quando na verdade o sono ruim está sabotando o processo em nível hormonal, antes mesmo da comida entrar em cena.',
        solucao:
          'Tratar sono como parte não negociável da estratégia de emagrecimento, tão importante quanto alimentação e treino — priorizar rotina de sono é, muitas vezes, mais eficaz do que qualquer ajuste na dieta isoladamente.',
        frase: 'Nas noites que durmo mal, é como se meu corpo inteiro pedisse açúcar no dia seguinte.',
        refs: 'Matthew Walker (Why We Sleep), Eve Van Cauter (pesquisas sobre sono, grelina e leptina).',
      },
      {
        num: 33,
        title: 'Tomada de Decisão Alimentar sob Emoção (Sistema 1 x Sistema 2)',
        vidaReal:
          'Em momentos de calma, você planeja tudo com clareza — o cardápio, os horários, as porções. Mas no calor da emoção (fome real, estresse, cansaço), as decisões saem completamente diferentes do que foi planejado.',
        sente: 'Uma desconexão entre "a pessoa que planeja" e "a pessoa que executa" — como se fossem duas versões diferentes de você, e a segunda sempre vencesse na hora H.',
        porque:
          'O psicólogo Daniel Kahneman descreve dois sistemas de pensamento: o **Sistema 1**, rápido, automático e emocional, e o **Sistema 2**, lento, racional e deliberado. O planejamento alimentar acontece no Sistema 2 (calmo, racional); mas a execução, muitas vezes, acontece sob domínio do Sistema 1 (impulsivo, emocional) — por isso planos bons falham na prática.',
        atrapalha:
          'A pessoa acredita que "sabe o que fazer, mas não consegue fazer", concluindo (erroneamente) que o problema é falta de conhecimento ou disciplina — quando na verdade é um desalinhamento entre o sistema que planeja e o sistema que age sob emoção.',
        solucao:
          'Tomar as decisões alimentares mais importantes (o que comprar, o que preparar, o que ter disponível) no Sistema 2 — com calma, antecipadamente —, deixando o mínimo possível de decisões críticas para o momento de emoção intensa (Sistema 1).',
        frase: 'Eu sei exatamente o que fazer. O problema é que, na hora, é como se outra pessoa decidisse por mim.',
        refs: 'Daniel Kahneman (Thinking, Fast and Slow), Roy Baumeister.',
      },
    ],
  },
];

function renderPattern(p) {
  return [
    `# Nº ${p.num}. ${p.title}`,
    `**Como aparece na vida real:** ${p.vidaReal}`,
    `**O que você sente:** ${p.sente}`,
    `**Por que isso acontece:** ${p.porque}`,
    `**Como atrapalha o emagrecimento:** ${p.atrapalha}`,
    `**Solução prática:** ${p.solucao}`,
    `**Frase de identificação:** "${p.frase}"`,
    `**Referências:** ${p.refs}`,
  ].join('\n\n');
}

const introLesson = {
  title: 'Como usar este módulo',
  content: [
    'A ciência do comportamento, a neurociência e a psicologia da alimentação já mostraram, com muita clareza, que a maior parte do que sabota o emagrecimento **não acontece no prato**. Acontece antes: na cabeça, no corpo, nas emoções, nos hábitos automáticos que a gente nem percebe que tem.',
    'Este módulo reúne 33 padrões de comportamento alimentar que mais atrapalham mulheres acima dos 35 anos a emagrecer de forma sustentável — com base em autores e pesquisadores de psicologia comportamental, neurociência, terapia cognitivo-comportamental, nutrição comportamental e medicina do estilo de vida. Nenhum deles é rótulo ou defeito de caráter. São respostas aprendidas — e o que se aprende pode ser reaprendido, com estratégia e sem culpa.',
    '* 33 padrões mapeados\n* 5 blocos temáticos\n* 35+ pesquisadores e autores de referência',
  ].join('\n\n'),
};

const lessons = [
  introLesson,
  ...BLOCKS.map((block) => ({
    title: block.title,
    content: [block.intro, ...block.patterns.map(renderPattern)].join('\n\n'),
  })),
];

module.exports = {
  moduleTitle: 'Comportamento Alimentar & Sabotagem no Emagrecimento',
  moduleDescription:
    '33 padrões de comportamento alimentar que mais atrapalham o emagrecimento — o que são, por que acontecem e como lidar com cada um, sem culpa.',
  lessons,
};
