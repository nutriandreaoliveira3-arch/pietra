"""
Gera 20 carrosséis — LOTE 2 — seguindo CARROSSEL_BLINDADO_SKILL.md
Temas novos, sem repetição do lote 1.
"""
import os, sys, importlib.util
sys.path.insert(0, os.path.dirname(__file__))

spec = importlib.util.spec_from_file_location("gen", os.path.join(os.path.dirname(__file__), "blindado_gen_v2.py"))
gen  = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gen)

BASE_OUT = "/home/user/pietra/carrosseis/exports_png_lote2"

CARROSSEIS = [

  # ── 21 ── Não aguenta olhar no espelho ──────────────────────────────────────
  { "id":"21", "nome":"NAO_AGUENTA_ESPELHO", "tipo":"cta", "cards":[
    {"t":"Você desvia\ndo espelho.",        "s":"Não é exagero.\nÉ uma dor que muita gente\nnão consegue nomear."},
    {"t":"Entrar numa\nloja é difícil.",    "s":"Você pega a maior numeração\npra não se frustrar na cabine."},
    {"t":"Você lembra\nde como era.",       "s":"Havia um tempo que se olhava\ne gostava do que via."},
    {"t":"E hoje?",                         "s":"Bate uma tristeza.\nUma sensação de que perdeu\nalgo que não volta."},
    {"t":"Mas isso\nnão é verdade.",        "s":"O corpo muda por razões específicas.\nE mudanças específicas têm solução."},
    {"t":"Não é só\nestética.",             "s":"É reconexão com você mesma.\nÉ se sentir presente no próprio corpo."},
    {"t":"O caminho\nnão é se punir.",      "s":"É entender o que mudou\nno seu metabolismo depois dos 35."},
    {"t":"Outras mulheres\njá voltaram.",   "s":"Não para o corpo dos 25.\nMas para um corpo que sentem como seu."},
    {"t":"Você merece\nesse caminho.",      "s":"Não depois de sofrer mais.\nAgora."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar o método que\nfez a diferença para tantas mulheres.", "pill":True},
  ]},

  # ── 22 ── Dietas que funcionam para os outros mas não para você ──────────────
  { "id":"22", "nome":"DIETA_FUNCIONA_SOS_OUTROS", "tipo":"conteudo", "cards":[
    {"t":"A dieta funciona\npara todo mundo.", "s":"Menos para você.\nÉ o que parece, né?"},
    {"t":"Você segue\nigual.",               "s":"Mesma dieta.\nMesmo esforço.\nResultados diferentes."},
    {"t":"Sua amiga\nperdeu 6 kg.",          "s":"Você seguiu junto e perdeu\nnada. Ou quase nada."},
    {"t":"Parece que\nseu corpo é especial.", "s":"Especial pra não responder.\nEspecial pra não mudar."},
    {"t":"Mas existe\numa explicação.",      "s":"Seu corpo não é resistente.\nEle está respondendo\na sinais errados."},
    {"t":"Hormônios,\ninflamação,",          "s":"cortisol elevado e metabolismo\nadaptado mudam as regras do jogo."},
    {"t":"A mesma dieta\nnão serve",         "s":"para um corpo de 40\ne um de 25 ao mesmo tempo."},
    {"t":"Você não precisa\nde mais restrição.", "s":"Precisa de uma estratégia\nfeita para onde você está hoje."},
    {"t":"Esse ajuste\nexiste.",             "s":"E quando você encontra,\nos resultados aparecem."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar por que\nseu corpo responde diferente.", "pill":True},
  ]},

  # ── 23 ── Ansiedade com comida ───────────────────────────────────────────────
  { "id":"23", "nome":"ANSIEDADE_COM_COMIDA", "tipo":"conteudo", "cards":[
    {"t":"Você não come\npor fome.",         "s":"Come para acalmar.\nPara compensar.\nPara preencher."},
    {"t":"E depois\nvem a culpa.",           "s":"Aquela voz que diz\n'por que você fez isso de novo?'"},
    {"t":"Você prometeu\nque não ia mais.", "s":"E foi lá de novo.\nE a culpa foi junto."},
    {"t":"Isso não é\nfraqueza.",            "s":"É um ciclo que tem nome,\ntem causa e tem solução."},
    {"t":"A ansiedade\ncom comida",          "s":"está ligada a cortisol elevado,\nglicose instável e recompensa neural."},
    {"t":"Não é força\nde vontade.",         "s":"É bioquímica.\nE bioquímica se trata\ncom estratégia, não culpa."},
    {"t":"Quando o corpo\nestabiliza,",      "s":"a compulsão diminui.\nA comida deixa de ser inimiga."},
    {"t":"Você pode\ncomer sem medo.", "s":"Sem calcular tudo.\nSem se punir no dia seguinte."},
    {"t":"Esse equilíbrio\nexiste.",         "s":"E outras mulheres já provaram\nque é possível chegar lá."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar como sair\ndesse ciclo de vez.", "pill":True},
  ]},

  # ── 24 ── Marido que não percebe a dificuldade ───────────────────────────────
  { "id":"24", "nome":"MARIDO_NAO_ENTENDE", "tipo":"manha", "cards":[
    {"t":"Ele come tudo\ne não engorda.",    "s":"Você olha para a comida\ne o peso sobe."},
    {"t":"Parece que\nvocê foi injustiçada.", "s":"Ele não precisa se preocupar.\nVocê precisa se controlar o tempo todo."},
    {"t":"Você cozinha,\ncuida,",            "s":"trabalha e ainda precisa\ngerir o próprio corpo com rigor."},
    {"t":"E quando comenta\nque está lutando,", "s":"ele não entende\nporque para ele é fácil."},
    {"t":"O corpo masculino\ne o feminino",  "s":"respondem diferente a dieta,\nexercício e estresse."},
    {"t":"Depois dos 35,\na mulher",         "s":"enfrenta alterações hormonais\nque ele nunca vai experienciar."},
    {"t":"Você não precisa\nde mais esforço.", "s":"Precisa de uma estratégia\nfeita para o seu corpo de mulher."},
    {"t":"Quando você\nentende isso,",       "s":"para de se comparar\ne começa a trabalhar a seu favor."},
    {"t":"Esse caminho\né só seu.",          "s":"E ele existe.\nE dá resultado real."},
    {"t":"Comente\nBLINDADO.",             "s":"Você merece uma estratégia\nfeita para o seu corpo.", "pill":True},
  ]},

  # ── 25 ── Não consegue dormir bem e o peso não sai ───────────────────────────
  { "id":"25", "nome":"SONO_RUIM_E_PESO", "tipo":"conteudo", "cards":[
    {"t":"Você dorme mal.\nO peso não sai.", "s":"Pode não ser coincidência."},
    {"t":"Você acorda\ncansada.",            "s":"Mesmo dormindo horas.\nO cansaço não passa."},
    {"t":"E o dia começa\ncom vontade de doce.", "s":"De carboidrato.\nDe algo que dê energia rápida."},
    {"t":"Seu corpo\nnão é teimoso.",        "s":"Ele está respondendo\na uma noite que não regenerou."},
    {"t":"Sono ruim\neleva cortisol.",       "s":"Cortisol alto aumenta\ngordura abdominal e trava emagrecimento."},
    {"t":"Não adianta\ncomer menos",         "s":"se o sono está sabotando\nseu metabolismo toda noite."},
    {"t":"A virada\ncomeça à noite.",        "s":"Quando o corpo descansa de verdade,\nele libera. Não segura."},
    {"t":"Regularizar o sono\né parte do método.", "s":"Não é detalhe.\nÉ pilar do Emagrecimento Blindado."},
    {"t":"Você pode dormir\nbem e emagrecer.", "s":"Sem radicalismo.\nSem privação.\nCom estratégia."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar como o sono\nestava travando tudo.", "pill":True},
  ]},

  # ── 26 ── Inchaço que não passa ──────────────────────────────────────────────
  { "id":"26", "nome":"INCHACO_QUE_NAO_PASSA", "tipo":"conteudo", "cards":[
    {"t":"Você acorda\ninchada.",            "s":"Deita magra e acorda\nparecendo que ganhou 3 kg."},
    {"t":"A calça que\ncabiu ontem",        "s":"hoje está apertada.\nE você não comeu nada diferente."},
    {"t":"Isso não é\ncabeça sua.",         "s":"Inchaço crônico é sinal\nde que algo no corpo precisa de ajuste."},
    {"t":"Pode ser\ninflamação,",           "s":"intestino sobrecarregado,\nretenção hormonal ou intolerância silenciosa."},
    {"t":"O inchaço\nnão é estético.",      "s":"É uma mensagem do corpo\nque ninguém te ensinou a ler."},
    {"t":"Quando você\ntrata a causa,",     "s":"o inchaço some.\nAs medidas diminuem.\nO corpo fica mais leve."},
    {"t":"Não é\nmágica.",                  "s":"É entender o que seu corpo\nestá tentando te dizer."},
    {"t":"Outras mulheres\nviram a diferença.", "s":"Em semanas.\nNão em meses de sofrimento."},
    {"t":"Seu corpo quer\nceder.",          "s":"Ele só precisa\nda estratégia certa."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar o que\nestava causando o inchaço.", "pill":True},
  ]},

  # ── 27 ── Culpa após comer fora ──────────────────────────────────────────────
  { "id":"27", "nome":"CULPA_APOS_COMER_FORA", "tipo":"cta", "cards":[
    {"t":"Você saiu\npara jantar.",         "s":"E voltou para casa\nse sentindo péssima."},
    {"t":"Não pelo que\ncomeou.",           "s":"Mas pela culpa que\nvoltou junto com você."},
    {"t":"Ficou calculando\ntudo na cabeça.", "s":"Quanto engordou.\nComo vai compensar amanhã."},
    {"t":"E a noite\nque era pra ser boa", "s":"virou mais um motivo\npara se sentir mal."},
    {"t":"Isso não é\nnormal.",             "s":"Essa relação com a comida\nnão precisa ser assim."},
    {"t":"A culpa\nnão emagrece.",          "s":"Ela estresa.\nEleva cortisol.\nE trava o metabolismo."},
    {"t":"Comer fora\nnão destrói nada.", "s":"Uma refeição não desfaz\nsemanas de consistência."},
    {"t":"O método certo\nprevê a vida real.", "s":"Prevê o jantar fora.\nA festa. O fim de semana."},
    {"t":"Você pode\nviver e emagrecer.", "s":"Ao mesmo tempo.\nSem se punir por cada escolha."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar como parar\nde se sabotar com culpa.", "pill":True},
  ]},

  # ── 28 ── Barriga que não vai embora ─────────────────────────────────────────
  { "id":"28", "nome":"BARRIGA_QUE_NAO_SAI", "tipo":"conteudo", "cards":[
    {"t":"O resto do corpo\nresponde.",      "s":"A barriga não.\nFica. Insiste. Resiste."},
    {"t":"Você já fez\nde tudo.",            "s":"Abdominais. Cardio. Suco verde.\nA barriga continua lá."},
    {"t":"Você se enverga\nao sentar.",      "s":"Evita roupa justa.\nEscolhe blusas que escondem."},
    {"t":"Isso tem\numa explicação.",        "s":"Gordura abdominal não responde\nao mesmo protocolo do restante do corpo."},
    {"t":"Ela está ligada\na cortisol,",     "s":"insulina elevada e\nalterações hormonais pós-35."},
    {"t":"Abdominais\nnão eliminam.",        "s":"Exercício fortalece o músculo.\nMas não dissipa a gordura no local."},
    {"t":"O que funciona\né específico.",    "s":"Regulação hormonal.\nAlimentação antiinflamatória.\nEstratégia, não sofrimento."},
    {"t":"Outras mulheres\nviram mudar.", "s":"Não de um dia pro outro.\nMas com constância e método correto."},
    {"t":"Sua barriga\npode ceder.",        "s":"Quando você entende\npor que ela resistia."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar\no que estava mantendo a barriga.", "pill":True},
  ]},

  # ── 29 ── Medo de parar de fazer dieta e engordar tudo de volta ──────────────
  { "id":"29", "nome":"MEDO_DE_PARAR_DIETA", "tipo":"manha", "cards":[
    {"t":"E se você\nparar a dieta?",       "s":"Você já sabe a resposta\nque teme ouvir."},
    {"t":"O peso volta.\nRápido.",           "s":"Às vezes mais rápido\ndo que foi embora."},
    {"t":"Aí você fica\npresa.",             "s":"Numa dieta que não\npode parar.\nEm eterna restrição."},
    {"t":"Isso tem nome.\nChama-se efeito sanfona.", "s":"E acontece quando o método\nnão prepara o corpo para a liberdade."},
    {"t":"A culpa não\né sua.",             "s":"É da estratégia que\nnão foi feita para durar."},
    {"t":"Emagrecer de verdade\nnão é só perder.", "s":"É reprogramar o metabolismo\npara manter sem esforço extremo."},
    {"t":"Quando o corpo\naprende o novo set point,", "s":"ele defende esse peso.\nNão o peso antigo."},
    {"t":"Você pode\nparar a dieta.",       "s":"E o peso não vai\nvoltar correndo."},
    {"t":"Porque o caminho\ncerto é sustentável.", "s":"Não uma corrida\nque termina em colapso."},
    {"t":"Comente\nBLINDADO.",             "s":"Quero te mostrar como emagrecer\nsem medo de parar.", "pill":True},
  ]},

  # ── 30 ── Sensação de preguiça e falta de energia ────────────────────────────
  { "id":"30", "nome":"PREGUICA_E_SEM_ENERGIA", "tipo":"conteudo", "cards":[
    {"t":"Você não é\npreguiçosa.",         "s":"Você está exausta.\nSão coisas diferentes."},
    {"t":"Acorda cansada.\nDorme cansada.",  "s":"O dia todo sente como se\nalgo estivesse sugando sua energia."},
    {"t":"Você força\na disposição.",       "s":"Para trabalhar. Para cuidar.\nPara aparecer. Todo dia."},
    {"t":"E no fim\ndo dia",                "s":"não sobra nada.\nNem pra academia.\nNem pra você."},
    {"t":"Isso não é\ncaráter.",            "s":"É um corpo que não está\nrecebendo o que precisa."},
    {"t":"Ferro baixo,\ntireoide lenta,",   "s":"vitamina D insuficiente,\ncortisol desregulado."},
    {"t":"Quando o corpo\nestá nutrido de verdade,", "s":"a energia volta.\nNão de golpe. Mas volta."},
    {"t":"E aí você\nconsegue se mover.", "s":"Não por obrigação.\nPor ter combustível real."},
    {"t":"Energia não\née luxury.",        "s":"É o que você precisa\npara viver de verdade."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar o que\nestava roubando sua energia.", "pill":True},
  ]},

  # ── 31 ── Pressão de parecer bem nas redes sociais ───────────────────────────
  { "id":"31", "nome":"PRESSAO_REDES_SOCIAIS", "tipo":"cta", "cards":[
    {"t":"Você evita\npostar foto.",        "s":"Não é vaidade.\nÉ que você não quer\nexplicar o que vê."},
    {"t":"Todo scroll\né uma comparação.", "s":"Fulana com aquele corpo.\nVocê com o seu."},
    {"t":"E aquela voz\nna sua cabeça",    "s":"que diz que você deveria\nestar diferente."},
    {"t":"A internet\nmostra o melhor\nde cada uma.", "s":"Você compara seu processo\ncom o resultado dos outros."},
    {"t":"Isso é\ninjusto com você.", "s":"Você está lutando.\nNão precisa se comparar\ncom quem editou a foto."},
    {"t":"O problema\nnão é seu corpo.", "s":"É o padrão impossível\nque te foi ensinado a perseguir."},
    {"t":"Sair da comparação\né parte do caminho.", "s":"Porque quando você para de olhar\npro lado, começa a avançar."},
    {"t":"Seu progresso\née o único que importa.", "s":"Não o da influencer.\nNão o da sua amiga.\nO seu."},
    {"t":"Você merece\num método que cuida\nde você.", "s":"Não um que te faz se sentir\nmenos a cada foto que vê."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar como sair\ndessa cilada da comparação.", "pill":True},
  ]},

  # ── 32 ── Fome emocional e comer por tédio ───────────────────────────────────
  { "id":"32", "nome":"FOME_EMOCIONAL_E_TEDIO", "tipo":"conteudo", "cards":[
    {"t":"Você não\nestava com fome.", "s":"Estava entediada.\nEstava sozinha.\nEstava ansiosa."},
    {"t":"Mas foi\nna geladeira assim mesmo.", "s":"E voltou com culpa\nnas mãos."},
    {"t":"Acontece\nde noite,",              "s":"depois do estresse do trabalho,\nquando a casa está quieta demais."},
    {"t":"Não é fraqueza.\nÉ padrão.",       "s":"Seu cérebro aprendeu que\ncomida acalma. E usa isso."},
    {"t":"Fome emocional\nnão é resolvida", "s":"com força de vontade.\nÉ resolvida com estratégia."},
    {"t":"Quando o corpo\nestá equilibrado,", "s":"os gatilhos emocionais\nperdem o poder que têm hoje."},
    {"t":"Não é sobre\nnegar o prazer.", "s":"É sobre não precisar\nde comida para se sentir bem."},
    {"t":"Você pode\nse sentir bem", "s":"sem depender de uma caixinha\nde biscoito para isso."},
    {"t":"Esse equilíbrio\nnão é sonho.", "s":"É o que acontece\nquando o método é certo."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar como sair\ndesse ciclo de vez.", "pill":True},
  ]},

  # ── 33 ── Insatisfação mesmo depois de emagrecer ────────────────────────────
  { "id":"33", "nome":"INSATISFACAO_MESMO_EMAGRECENDO", "tipo":"conteudo", "cards":[
    {"t":"Você perdeu peso.\nMas não se sentiu bem.", "s":"E isso te confundiu."},
    {"t":"Esperava que\ncom o peso menor", "s":"a vida ia parecer\nmais leve. Mais bonita."},
    {"t":"Mas a insatisfação\ncontinuou.",   "s":"O espelho ainda incomodava.\nA comparação ainda doía."},
    {"t":"E você pensou:\n\"preciso perder mais.\"", "s":"Mas o problema nunca foi\no número na balança."},
    {"t":"Emagrecer sem\ncuidar do interior", "s":"é trocar o sofrimento\nde forma. Não de lugar."},
    {"t":"A autoestima\nnão vive no peso.", "s":"Ela vive em como\nvocê se relaciona com você mesma."},
    {"t":"O caminho real\né os dois juntos.", "s":"Corpo e mente.\nEsquecimento e reconexão.\nResultado e paz."},
    {"t":"Você pode emagrecer\ne se sentir bem.", "s":"De verdade.\nNão só no espelho.\nNas fotos. Na vida."},
    {"t":"Esse é o\nEmagrecimento Blindado.", "s":"Não só o físico.\nA transformação completa."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar o caminho\ncompleto. Não só o peso.", "pill":True},
  ]},

  # ── 34 ── Não tem tempo para cuidar de si ───────────────────────────────────
  { "id":"34", "nome":"SEM_TEMPO_PARA_SI", "tipo":"manha", "cards":[
    {"t":"Você cuida\nde todo mundo.", "s":"Dos filhos. Do marido.\nDo trabalho. Da casa."},
    {"t":"E no final\ndo dia,",              "s":"não sobrou tempo\nnenhum para você."},
    {"t":"Você foi\nao médico\nessa semana?", "s":"Tomou água suficiente?\nDormiu bem?\nComeu direito?"},
    {"t":"Provavelmente não.\nE você sabe disso.", "s":"E carrega um peso\nque não é nem físico."},
    {"t":"\"Falta tempo\"\nse tornou desculpa.", "s":"Mas a verdade é que\nvocê foi colocada em último lugar."},
    {"t":"Por você mesma.",                 "s":"E isso não é culpa.\nÉ o que te ensinaram\nque era certo."},
    {"t":"Mas uma mãe,\nesposa, profissional", "s":"esgotada não serve\nbem a ninguém."},
    {"t":"Cuidar de você\nnão é egoísmo.", "s":"É necessário.\nÉ urgente.\nÉ possível."},
    {"t":"15 minutos\npor dia são suficientes", "s":"para começar a se colocar\nno lugar que merece."},
    {"t":"Comente\nBLINDADO.",             "s":"Quero te mostrar como se cuidar\nmesmo quando o tempo é pouco.", "pill":True},
  ]},

  # ── 35 ── Frustração com médico que só diz "coma menos" ─────────────────────
  { "id":"35", "nome":"MEDICO_SO_DIZ_COMA_MENOS", "tipo":"conteudo", "cards":[
    {"t":"Você foi ao\nmédico.",            "s":"Contou tudo.\nO esforço. A frustração. O cansaço."},
    {"t":"E ele disse:\n\"Come menos\ne se mexe mais.\"", "s":"Como se você\njá não estivesse tentando."},
    {"t":"Você saiu\nda consulta",          "s":"se sentindo invisível.\nEm\nunfair. Incompreendida."},
    {"t":"Você não é\nlouca.",              "s":"Seu corpo de verdade\nestá dando sinais que poucos aprendem a ler."},
    {"t":"\"Coma menos\"\nnão é resposta", "s":"para um metabolismo adaptado,\nhormonios desregulados\ne cortisol alto."},
    {"t":"A medicina\nconvencional",        "s":"ainda trata o peso\ncomo questão de disciplina.\nNão de biologia."},
    {"t":"Mas o seu corpo\nmerece mais.", "s":"Merece um olhar\nque enxerga o que realmente está acontecendo."},
    {"t":"Você não precisa\nde mais dieta.", "s":"Precisa de alguém que\nentenda o que o seu corpo está dizendo."},
    {"t":"Esse entendimento\nmuda tudo.",   "s":"E abre um caminho\nque \"coma menos\" nunca abriu."},
    {"t":"Comente\nBLINDADO.",             "s":"Você merece uma resposta\nque vai além do óbvio.", "pill":True},
  ]},

  # ── 36 ── Emagrecer para uma data específica e não conseguir ─────────────────
  { "id":"36", "nome":"EMAGRECER_PARA_DATA", "tipo":"cta", "cards":[
    {"t":"Tinha um\ncasamento.",            "s":"Uma viagem. Uma formatura.\nUma data importante."},
    {"t":"Você começou\ncom 3 meses de\nantecedência.", "s":"Dieta. Academia.\nFoco total."},
    {"t":"E no dia\nda festa,",             "s":"olhou no espelho\ne não foi o que esperava."},
    {"t":"Não é porque\nvocê falhou.", "s":"É porque perder peso\npara uma data\nnão funciona assim."},
    {"t":"O corpo\nnão obedece\ncalendário.", "s":"Ele responde a processos.\nNão a datas."},
    {"t":"A pressão\nda data",              "s":"aumenta cortisol.\nCortisol trava emagrecimento.\nVirando um ciclo."},
    {"t":"O que funciona\né uma mudança", "s":"que acontece independente\nde casamento, viagem ou formatura."},
    {"t":"Porque quando o\nprocesso está certo,", "s":"você chega em qualquer data\nse sentindo bem."},
    {"t":"Não como punição.\nComo consequência.", "s":"De um método que funciona\nna vida real."},
    {"t":"Comente\nBLINDADO.",             "s":"Quero te mostrar um caminho\nque não depende de data.", "pill":True},
  ]},

  # ── 37 ── Metabolismo lento (hipotireoidismo ou suspeita) ────────────────────
  { "id":"37", "nome":"METABOLISMO_LENTO", "tipo":"conteudo", "cards":[
    {"t":"Você sempre\nouviu isso:",        "s":"\"Seu metabolismo\né lento.\""},
    {"t":"Como se fosse\numa sentença.",    "s":"Como se não houvesse\nnada a fazer além de aceitar."},
    {"t":"Você come\npoco.",               "s":"Dorme bem. Não bebe.\nFaz exercício. E mesmo assim."},
    {"t":"O peso\nnão sai.",               "s":"Ou sai muito devagar,\nnum ritmo que parece injusto."},
    {"t":"Metabolismo lento\nnão é destino.", "s":"É um sinal de que algo\nno corpo precisa de atenção."},
    {"t":"Tireoide.\nCortisol.\nInsulina.", "s":"Cada um deles\npode estar travando\no que você está tentando mudar."},
    {"t":"Quando você trata\na causa,",     "s":"o metabolismo responde.\nNão no ritmo dos 20 anos.\nMas responde."},
    {"t":"A estratégia\ncerta acelera", "s":"o que estava travado.\nSem remédio milagroso.\nSem promessa vazia."},
    {"t":"Seu corpo\nnão é seu inimigo.", "s":"Ele precisa de suporte.\nNão de punição."},
    {"t":"Comente\nBLINDADO.",             "s":"Vou te mostrar\no que estava travando seu metabolismo.", "pill":True},
  ]},

  # ── 38 ── Vergonha na academia ───────────────────────────────────────────────
  { "id":"38", "nome":"VERGONHA_NA_ACADEMIA", "tipo":"manha", "cards":[
    {"t":"Você foi\npara a academia.", "s":"E saiu sem ter feito\nnada."},
    {"t":"Olhou para\nas outras.",     "s":"Para os corpos.\nPara a facilidade.\nE se sentiu no lugar errado."},
    {"t":"Aquela sensação\nde que todo mundo\nestá te olhando.", "s":"Julgando.\nComparando.\nContando."},
    {"t":"Você cancelou\na mensalidade.", "s":"Ou parou de ir.\nOu nunca voltou\ndepois da primeira vez."},
    {"t":"Isso não é falta\nde determinação.", "s":"É que ninguém foi ensinado\na lidar com esse nível de exposição."},
    {"t":"A academia\nnão é o único caminho.", "s":"Nem o melhor pra todas.\nNem necessário para emagrecer."},
    {"t":"Movimento que\nvocê consegue manter", "s":"vale mais que um treino\nque te humilha até você parar."},
    {"t":"O método certo\nse adapta a você.", "s":"Não te obriga\na se adaptar a ele."},
    {"t":"Você pode\nse mover com leveza.", "s":"Sem julgamento.\nNo seu ritmo.\nNo seu tempo."},
    {"t":"Comente\nBLINDADO.",             "s":"Quero te mostrar um caminho\nque cabe na sua vida real.", "pill":True},
  ]},

  # ── 39 ── Silêncio sobre a própria dor ──────────────────────────────────────
  { "id":"39", "nome":"SILENCIO_SOBRE_A_DOR", "tipo":"conteudo", "cards":[
    {"t":"Você não\nfala sobre isso.", "s":"Para ninguém.\nNi para o espelho."},
    {"t":"A dor com o\npróprio corpo", "s":"você carrega em silêncio.\nComo se não merecesse\nser dita."},
    {"t":"\"Não posso\nreclamar.\"", "s":"\"Tem gente com problema maior.\"\nMas sua dor é real."},
    {"t":"Você se cala\nna consulta.",       "s":"Minimiza o incômodo.\nSai com orientações\nque não resolvem nada."},
    {"t":"Esse silêncio\ntema preço.", "s":"Quanto mais você engole,\nmais a dor pesa."},
    {"t":"Você merece\nser ouvida.",         "s":"Por alguém que entende\no que está por trás\ndaquela palavra: \"tô bem\"."},
    {"t":"A transformação\nreal começa",     "s":"quando você para de minimizar\ne começa a tratar a dor\npelo nome dela."},
    {"t":"Não é reclamação.\nÉ reconhecimento.", "s":"De que você está lutando.\nE merece um caminho à altura."},
    {"t":"Você não está\nsozinha nessa.",    "s":"Milhares de mulheres\ntêm a mesma dor.\nE existem saídas."},
    {"t":"Comente\nBLINDADO.",             "s":"Você merece ser ouvida\ne ter um caminho real.", "pill":True},
  ]},

  # ── 40 ── Transformação possível aos 40, 45, 50 anos ────────────────────────
  { "id":"40", "nome":"TRANSFORMACAO_AOS_40_50", "tipo":"cta", "cards":[
    {"t":"Você tem\n40, 45, 50 anos.", "s":"E acha que o tempo\nde mudar já passou."},
    {"t":"\"Com minha\nidade...\"",     "s":"Essa frase carrega\nmuita coisa que\nninguém deveria acreditar."},
    {"t":"Você vê as\nmais novas",      "s":"transformando o corpo\ne pensa: pra mim\njá não funciona."},
    {"t":"Mas a biologia\nnão funciona assim.", "s":"O corpo humano responde\naté os 80 anos.\nDepende de como você chega nele."},
    {"t":"Depois dos 40\né diferente.",  "s":"Mas diferente não é\nimpossível. É uma outra\nestratégia."},
    {"t":"O que muda\né a abordagem,", "s":"não a capacidade.\nSeu corpo ainda\nquer e pode responder."},
    {"t":"Mulheres acima\ndos 40",       "s":"que entendem o próprio metabolismo\nconseguem resultados reais e duradouros."},
    {"t":"Sem a loucura\ndas dietas de 25.", "s":"Com sabedoria.\nCom método.\nCom respeito ao próprio corpo."},
    {"t":"Essa é a\nmaior virada.",      "s":"Entender que não é tarde.\nÉ diferente. E é possível."},
    {"t":"Comente\nBLINDADO.",          "s":"Vou te mostrar o que\nfunciona para o seu corpo agora.", "pill":True},
  ]},

]

# ── GERAR ────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 60)
    print("  EMAGRECIMENTO BLINDADO — LOTE 2 — 20 carrosséis × 10 cards")
    print("=" * 60)

    ok = []
    for c in CARROSSEIS:
        pasta   = f"CARROSSEL_{c['id']}_{c['nome']}"
        out_dir = os.path.join(BASE_OUT, pasta)
        gen.gerar_carrossel(c["tipo"], c["cards"], out_dir, c["nome"].replace("_", " ").title())
        ok.append(pasta)

    print("\n" + "=" * 60)
    print(f"  CONCLUÍDO: {len(ok)}/{len(CARROSSEIS)} carrosséis gerados")
    print("=" * 60)
    for pasta in ok:
        print(f"  ✓ {pasta}  (10 cards + PREVIEW.png)")
    print(f"\n  Pasta base: {BASE_OUT}")
