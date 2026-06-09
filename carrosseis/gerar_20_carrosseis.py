"""
Gera 20 carrosséis completos seguindo CARROSSEL_BLINDADO_SKILL.md
Usa blindado_gen_v2 como módulo de renderização.
"""
import os, sys, importlib.util
sys.path.insert(0, os.path.dirname(__file__))

# Carrega blindado_gen_v2 dinamicamente
spec = importlib.util.spec_from_file_location("gen", os.path.join(os.path.dirname(__file__), "blindado_gen_v2.py"))
gen  = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gen)

BASE_OUT = "/home/user/pietra/carrosseis/exports_png"

# ─────────────────────────────────────────────────────────────────────────────
# 20 CARROSSÉIS — conteúdo completo, 10 cards cada
# Estrutura por card: 01=hook 02=dor 03=ident 04=crença 05=explicação
#                     06=virada 07=nova visão 08=desejo 09=caminho 10=CTA
# ─────────────────────────────────────────────────────────────────────────────
CARROSSEIS = [

  # ── 01 ── Come pouco e mesmo assim não muda ──────────────────────────────
  { "id":"01", "nome":"COME_POUCO_E_NAO_MUDA", "tipo":"conteudo", "cards":[
    {"t":"Come pouco.\nNada muda.",      "s":"Você já se perguntou\npor que isso acontece?"},
    {"t":"Você conta\ncada caloria.",    "s":"Abre mão do que ama.\nE a balança não se move."},
    {"t":"Parece injusto.",              "s":"Enquanto outras comem de tudo\ne o peso sai fácil."},
    {"t":"A culpa não\ntem sido sua.",   "s":"Você está usando a estratégia\nerrada para o seu corpo."},
    {"t":"Depois dos 35,",              "s":"comer menos pode travar\no metabolismo, não liberar."},
    {"t":"Cortar demais\ntem um preço.", "s":"Seu corpo entende fome\ncomo ameaça. E segura tudo."},
    {"t":"A saída não\né comer menos.", "s":"É comer do jeito certo\npara o que seu corpo precisa."},
    {"t":"Existe uma forma\nde liberar.", "s":"Sem passar fome.\nSem radicalismo. Sem culpa."},
    {"t":"Outras mulheres\njá entenderam.", "s":"E pararam de travar.\nVocê também pode."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você come pouco e nada muda,\nquero te mostrar o porquê.", "pill":True},
  ]},

  # ── 02 ── Cansaço de recomeçar toda segunda-feira ────────────────────────
  { "id":"02", "nome":"CANSACO_DE_RECOMECAR", "tipo":"manha", "cards":[
    {"t":"Toda segunda\nvocê recomeça.",  "s":"E toda quinta\nvocê já desistiu."},
    {"t":"Esse ciclo\njá dura anos.",     "s":"Começa animada.\nPara frustrada.\nRecomeça esperançosa."},
    {"t":"O domingo à noite\nchega pesado.", "s":"Aquela sensação de que amanhã\né o dia que tudo vai mudar."},
    {"t":"Mas não é falta\nde vontade.",  "s":"Você já mostrou que tem.\nIncontáveis vezes."},
    {"t":"O problema\né o método.",       "s":"Sistemas de \"tudo ou nada\"\nnão foram feitos para mulheres reais."},
    {"t":"Recomeçar toda\nsegunda cansa.", "s":"Porque exige que você seja\nperfeita para dar certo."},
    {"t":"E ninguém\né perfeita.",        "s":"O que funciona é um caminho\nque cabe na vida real."},
    {"t":"Um método que\nnão depende",    "s":"de segunda-feira, de disposição\nou de lua nova para funcionar."},
    {"t":"Você não precisa\nde mais força.", "s":"Precisa de um caminho\nque não quebre."},
    {"t":"Comente\nBLINDADO.",           "s":"Se você está cansada de recomeçar,\nquero te mostrar outro jeito.", "pill":True},
  ]},

  # ── 03 ── Vergonha de tirar foto ─────────────────────────────────────────
  { "id":"03", "nome":"VERGONHA_DE_TIRAR_FOTO", "tipo":"cta", "cards":[
    {"t":"Você evita\nfotos.",           "s":"Não é frescura.\nÉ uma dor real."},
    {"t":"Quando alguém\naponta a câmera,", "s":"você se vira de lado,\nse esconde ou pede para excluir."},
    {"t":"Você se lembra\nde como era antes.", "s":"E sente uma dor\nque não passa."},
    {"t":"Isso não é\nfrescura.",        "s":"É o peso de não se reconhecer\nno próprio corpo."},
    {"t":"E o pior:",               "s":"você tenta mudar.\nMas nada parece funcionar\nde forma duradoura."},
    {"t":"O corpo mudou\nde regra.",     "s":"O que funcionava aos 25\nnão funciona mais. E não é culpa sua."},
    {"t":"A virada\ncomeça aqui:",       "s":"entender o que mudou\npara agir da forma certa."},
    {"t":"Imagine voltar\na gostar das fotos.", "s":"Não porque ficou perfeita.\nMas porque se sentiu de volta."},
    {"t":"Esse caminho\nexiste.",        "s":"E outras mulheres\njá estão nele."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você sente vergonha\nde se ver em fotos.", "pill":True},
  ]},

  # ── 04 ── Roupas apertadas e autoestima abalada ──────────────────────────
  { "id":"04", "nome":"ROUPAS_APERTADAS", "tipo":"cta", "cards":[
    {"t":"Entrar num\ncloset vazio.",   "s":"Tem roupas por todo lado.\nE nada que você queira usar."},
    {"t":"Tudo aperta\nou marca.",       "s":"Você compra maior\nsó para se sentir folgada."},
    {"t":"Não é sobre\nvaidade.",        "s":"É sobre não se sentir\nem casa no próprio corpo."},
    {"t":"Roupa que não\nserve machuca.", "s":"Toda vez que você se veste\ne não se reconhece."},
    {"t":"Você já aceitou\ncoisas que não devia.", "s":"Que seu corpo é assim mesmo.\nQue já não tem jeito."},
    {"t":"Não tem.",               "s":"O que tem é um corpo\nque ainda não entendeu\no que precisa."},
    {"t":"Quando o método\nbate com o corpo,", "s":"as roupas voltam a servir.\nSem luta. Sem dieta radical."},
    {"t":"Não é magia.",           "s":"É estratégia certa\npara o corpo certo\nna fase certa."},
    {"t":"Você merece se\nolhar no espelho", "s":"e gostar do que vê.\nIsso é possível."},
    {"t":"Comente\nBLINDADO.",         "s":"Se você está cansada de comprar\nroupa para esconder.", "pill":True},
  ]},

  # ── 05 ── Medo de encontrar pessoas conhecidas ───────────────────────────
  { "id":"05", "nome":"MEDO_DE_ENCONTRAR_PESSOAS", "tipo":"conteudo", "cards":[
    {"t":"Você muda\nde rota.",          "s":"Para não cruzar com alguém\nque não vê há tempo."},
    {"t":"Não é paranoia.",              "s":"É o medo do olhar do outro\ndiante de um corpo\nque você não reconhece."},
    {"t":"Você antecipa\ncomentários.",   "s":"\"Você engordou?\"\n\"Você está tão diferente.\"\nE isso paralisa."},
    {"t":"Esse medo\nisola.",             "s":"Você vai menos a eventos.\nAceita menos convites.\nSe afasta."},
    {"t":"E a solidão\npiora tudo.",      "s":"Ansiedade, compulsão, noites pesadas.\nTudo conectado."},
    {"t":"Seu corpo\nnão é o problema.",  "s":"O problema é não ter\nem quem confiar\npara sair do lugar."},
    {"t":"Existe um jeito\nde sair disso.", "s":"Sem cirurgia, sem dieta radical,\nsem prometer perfeição."},
    {"t":"Começa pela\nperspectiva.",     "s":"Entender o que mudou\ne o que ainda pode mudar."},
    {"t":"Você não precisa\nesperar mais.", "s":"Nem emagrecer tudo primeiro\npara voltar a viver."},
    {"t":"Comente\nBLINDADO.",           "s":"Se você evita sair\npor causa do corpo.", "pill":True},
  ]},

  # ── 06 ── Família que julga o corpo e a comida ───────────────────────────
  { "id":"06", "nome":"FAMILIA_QUE_JULGA", "tipo":"conteudo", "cards":[
    {"t":"\"Vai comer\ntudo isso?\"",     "s":"Parece simples.\nMas corrói por dentro."},
    {"t":"É a família\nque mais machuca.", "s":"Porque você não esperava\no julgamento de quem te ama."},
    {"t":"Comentário na\nmesa de jantar.", "s":"\"Cuidado com o prato.\"\n\"Você não vai querer mais, né?\"\nE o silêncio que segue."},
    {"t":"Você aprende\na comer escondida.", "s":"Ou a negar que tem fome.\nOu a compensar depois."},
    {"t":"E a culpa\nvem dobrada.",       "s":"Por comer. Por esconder.\nPor não conseguir mudar."},
    {"t":"Não é fraqueza.",               "s":"É o resultado de uma relação\ndolorosa com comida\nformada ao longo dos anos."},
    {"t":"O corpo não\né inimigo.",       "s":"Mas quando alguém te lembra\nele todo dia,\npassa a parecer."},
    {"t":"Existe um grupo\nonde ninguém julga.", "s":"Onde mulheres se apoiam\nde verdade."},
    {"t":"E onde você\naprendefde novo", "s":"a comer sem culpa\ne a cuidar de si\nsem punição."},
    {"t":"Comente\nBLINDADO.",           "s":"Se você já foi julgada\npela família por causa do corpo.", "pill":True},
  ]},

  # ── 07 ── Sensação de fazer tudo certo e nada funcionar ──────────────────
  { "id":"07", "nome":"FAZ_TUDO_CERTO_NADA_FUNCIONA", "tipo":"conteudo", "cards":[
    {"t":"Você fez\ntudo certo.",        "s":"E mesmo assim\no resultado não veio."},
    {"t":"Dieta seguida.",               "s":"Academia em dia.\nSono controlado.\nE o corpo parado."},
    {"t":"Você já pensou:",              "s":"\"Talvez eu seja assim mesmo.\"\n\"Talvez não seja para mim.\""},
    {"t":"Essa voz\né mentira.",         "s":"Ela aparece quando o método\nnão bate com o corpo.\nNão quando você falhou."},
    {"t":"Depois dos 35,\no corpo muda.", "s":"Hormônios, metabolismo, estresse.\nTudo interfere de formas\nque antes não interferiam."},
    {"t":"O que funcionava\nantes",      "s":"pode ser exatamente\no que sabota você hoje."},
    {"t":"Não é falta\nde esforço.",     "s":"É esforço no lugar errado,\nna forma errada,\npara o corpo de hoje."},
    {"t":"Existe uma forma\nde entender", "s":"o que seu corpo precisa\nnessa fase específica."},
    {"t":"E quando você\nentende,",      "s":"o corpo responde.\nSem guerra.\nSem sacrifício extremo."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você sente que faz tudo\ne nada funciona.", "pill":True},
  ]},

  # ── 08 ── Ansiedade à noite e culpa no dia seguinte ──────────────────────
  { "id":"08", "nome":"ANSIEDADE_A_NOITE", "tipo":"conteudo", "cards":[
    {"t":"À noite\na fome vem.",         "s":"Não a fome de comida.\nA fome que a cabeça inventa."},
    {"t":"Você resistiu\no dia todo.",   "s":"E agora, às 22h,\no armário te chama."},
    {"t":"Você cede.",                  "s":"Come mais do que queria.\nE o ciclo recomeça:\ncomer, dormir, culpa, recomeçar."},
    {"t":"Isso não é\nfraqueza.",        "s":"É o efeito colateral\nde restringir demais\ndurante o dia."},
    {"t":"O corpo cobra\nà noite",       "s":"o que você negou\ndurante o dia.\nÉ fisiologia, não falha moral."},
    {"t":"A culpa da manhã\nnão ajuda.", "s":"Ela só aumenta o estresse\nque alimenta\no ciclo todo."},
    {"t":"Sair disso\nexige entender",   "s":"o que o corpo precisa\npara não entrar em modo de cobrança."},
    {"t":"Comer de forma\ncorreta de dia", "s":"é a forma mais poderosa\nde controlar a noite."},
    {"t":"Sem proibição.\nSem punição.", "s":"Com estratégia.\nCom leveza.\nCom resultado."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você se reconhece\nnesse ciclo noturno.", "pill":True},
  ]},

  # ── 09 ── Fim de semana que destrói a semana inteira ────────────────────
  { "id":"09", "nome":"FIM_DE_SEMANA_DESTROI_TUDO", "tipo":"manha", "cards":[
    {"t":"Segunda a sexta\nvocê se controla.", "s":"Sábado e domingo\nvocê desfaz tudo."},
    {"t":"Parece que\nnão adianta.",      "s":"Você se esforça a semana toda\ne dois dias jogam fora."},
    {"t":"O fim de semana\ntorna-se pesado.", "s":"Não pelo que você come.\nMas pela culpa\nque vem junto."},
    {"t":"Você come\ne já está se punindo.", "s":"Antes de terminar o prato,\na cabeça já colocou\ntudo a perder."},
    {"t":"Isso não é\nfalta de controle.", "s":"É a pressão da semana\nexplodindo no único momento\nque parece livre."},
    {"t":"O problema\nnão é o fim de semana.", "s":"É a semana que cobra\num preço alto demais\nno corpo e na mente."},
    {"t":"Quando a semana\ntem equilíbrio,", "s":"o fim de semana\ndeixa de ser compensação."},
    {"t":"Você pode ter\nvida social,",    "s":"comer fora, celebrar,\nsem desfazer o progresso."},
    {"t":"Isso é possível.",              "s":"Outras mulheres já\nchegaram lá.\nVocê também pode."},
    {"t":"Comente\nBLINDADO.",           "s":"Se o fim de semana\ntempre destrói sua semana.", "pill":True},
  ]},

  # ── 10 ── Mulher que se sente invisível ──────────────────────────────────
  { "id":"10", "nome":"MULHER_INVISIVEL", "tipo":"conteudo", "cards":[
    {"t":"Você entrou\nna sala.",         "s":"E ninguém te viu.\nNão porque não esteve lá.\nMas porque parou de aparecer."},
    {"t":"Você foi se\napagando.",        "s":"Nas fotos, nos eventos,\nnas reuniões, na rua."},
    {"t":"Não foi decisão.",              "s":"Foi acontecendo.\nDevagar. Cada dia\num pouco menos de você."},
    {"t":"O corpo que\nnão reconhece",    "s":"te faz querer sumir.\nE sumir te faz sentir\nainda menos."},
    {"t":"É um ciclo\nsilencioso.",       "s":"Que poucas pessoas falam.\nMas quase toda mulher\nconhece por dentro."},
    {"t":"Invisibilidade\nnão é destino.", "s":"É consequência de não ter\nencontrado o caminho\nde volta para si."},
    {"t":"Voltar a se\nver com clareza",  "s":"começa antes de mudar\no corpo. Começa em entender\no que mudou."},
    {"t":"Existem mulheres\nque saíram disso.", "s":"Que voltaram a aparecer.\nA gostar de si.\nA ocupar espaço."},
    {"t":"Esse caminho\nexiste para você.", "s":"Você não precisa\nde perfeição para começar."},
    {"t":"Comente\nBLINDADO.",           "s":"Se você se sente invisível\nno próprio corpo.", "pill":True},
  ]},

  # ── 11 ── Comparação com outras mulheres ─────────────────────────────────
  { "id":"11", "nome":"COMPARACAO_COM_OUTRAS", "tipo":"conteudo", "cards":[
    {"t":"Você não\nconsegue parar.",     "s":"De se comparar.\nDe se medir.\nDe se cobrar."},
    {"t":"Ela come de\ntudo e não engorda.", "s":"Ela largou o academia\ne o peso sumiu.\nPor que com você é diferente?"},
    {"t":"Isso machuca\nmais do que parece.", "s":"Porque você se esforça mais.\nE vê menos resultado."},
    {"t":"A comparação\ntem um preço.",    "s":"Ela rouba energia.\nAumenta ansiedade.\nSabota o processo."},
    {"t":"Cada corpo\ntem uma história.", "s":"Hormônios, histórico, fase da vida.\nO que funciona para ela\nnão foi feito para você."},
    {"t":"Você não\nestá atrasada.",      "s":"Você está num caminho\ndiferente. O seu."},
    {"t":"E o seu caminho\nprecisa",      "s":"de estratégias feitas\npara o seu corpo,\nnão para o dela."},
    {"t":"Quando você\npara de comparar,", "s":"você começa a enxergar\no que realmente funciona\npara você."},
    {"t":"Esse olhar\nmuda tudo.",        "s":"E os resultados\nvêm de um jeito\nmais sustentável."},
    {"t":"Comente\nBLINDADO.",           "s":"Se você se compara\ne isso te faz mal.", "pill":True},
  ]},

  # ── 12 ── Medo da praia, piscina e eventos ───────────────────────────────
  { "id":"12", "nome":"MEDO_DA_PRAIA_E_EVENTOS", "tipo":"cta", "cards":[
    {"t":"Você declinou\no convite.",     "s":"Praia? Piscina? Festa de réveillon?\n\"Não vou, não estou bem.\""},
    {"t":"Mas a verdade\né outra.",       "s":"Você não foi porque\nnão aguenta a ideia\nde aparecer assim."},
    {"t":"Biquíni guardado\nhá anos.",    "s":"Com etiqueta. Esperando\num corpo que nunca chegou."},
    {"t":"E enquanto isso\nvida passa.",  "s":"Viagens não tiradas.\nFotos não feitas.\nMomentos perdidos."},
    {"t":"Isso não é\nfrescura.",        "s":"É o peso real\nde não se sentir\nbem no próprio corpo."},
    {"t":"E o mais injusto:", "s":"você se esforça.\nFaz de tudo.\nE continua se escondendo."},
    {"t":"O método certo\nmuda isso.",    "s":"Não do dia para a noite.\nMas de forma real\ne sustentável."},
    {"t":"Outras mulheres\nvoltaram à praia.", "s":"Não porque ficaram perfeitas.\nMas porque se sentiram\nde volta."},
    {"t":"Esse verão\npode ser diferente.", "s":"Se você começar agora."},
    {"t":"Comente\nBLINDADO.",           "s":"Se você evita praia,\npiscina ou eventos.", "pill":True},
  ]},

  # ── 13 ── Comer escondido e sentir culpa ─────────────────────────────────
  { "id":"13", "nome":"COMER_ESCONDIDO", "tipo":"conteudo", "cards":[
    {"t":"Você come\nescondida.",        "s":"No carro, na despensa,\ndepois que todos dormem."},
    {"t":"Não é gula.",                 "s":"É o peso de uma relação\ncom a comida que nunca\nfoi saudável de verdade."},
    {"t":"Durante o dia\nvocê se controla.", "s":"Mas a tensão acumula.\nE em algum momento\nvai explodir."},
    {"t":"A culpa\nvem sozinha.",        "s":"Antes de terminar.\nDurante. Depois.\nSempre presente."},
    {"t":"E você promete\nque amanhã será diferente.", "s":"Mas amanhã a pressão\nvolta. E o ciclo\nse repete."},
    {"t":"Isso não é\nproblema de caráter.", "s":"É o resultado previsível\nde restrição extrema\nseguida de liberação."},
    {"t":"Sair desse ciclo\nprecisa de estratégia,", "s":"não de mais força de vontade\nnuma guerra\nque você não vai ganhar."},
    {"t":"Comer bem sem\nesconder é possível.", "s":"Sem punição. Sem vigília.\nSem sair da mesa\ncom culpa."},
    {"t":"Outras mulheres\njá encontraram esse equilíbrio.", "s":"É real. É sustentável.\nE é para você também."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você se reconhece\nnesse ciclo de comer escondida.", "pill":True},
  ]},

  # ── 14 ── Falta de constância sem falta de vontade ───────────────────────
  { "id":"14", "nome":"FALTA_DE_CONSTANCIA", "tipo":"manha", "cards":[
    {"t":"Você começa\nforte.",          "s":"Firme. Decidida.\nCom plano e tudo."},
    {"t":"Na primeira\nsemana você arraса.", "s":"Na segunda você desacelera.\nNa terceira você para."},
    {"t":"E se culpa\npor isso.",         "s":"\"Sou fraca.\"\n\"Não tenho disciplina.\"\n\"Nunca vou conseguir.\""},
    {"t":"Isso não é\nverdade.",         "s":"Você tem vontade de sobra.\nO que falta é um caminho\nque cabe na sua vida."},
    {"t":"Métodos que exigem\nperfeição", "s":"só funcionam\nnas semanas perfeitas.\nE semanas perfeitas não existem."},
    {"t":"A vida interrompe.",           "s":"Sempre. Trabalho, família,\ncansaço, imprevistos.\nE o método quebra."},
    {"t":"Constância não\nvem da força.", "s":"Vem de um processo\nque funciona mesmo\nquando a vida complica."},
    {"t":"Flexível não\né sinônimo de fraco.", "s":"É sinônimo de sustentável.\nE sustentável é o que\nleva a resultado real."},
    {"t":"Você não precisa\nser perfeita.", "s":"Precisa de um método\nque funcione com\nquem você realmente é."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você tem vontade\nmas não consegue manter a constância.", "pill":True},
  ]},

  # ── 15 ── Corpo inflamado, pesado e travado ──────────────────────────────
  { "id":"15", "nome":"CORPO_INFLAMADO_E_PESADO", "tipo":"conteudo", "cards":[
    {"t":"O corpo\npesa mais.",          "s":"Não só na balança.\nNos movimentos.\nNa cama de manhã."},
    {"t":"Você acorda\ncansada.",        "s":"Mesmo tendo dormido.\nMesmo não tendo feito nada pesado.\nO corpo resiste."},
    {"t":"Inchaço que\nnão vai embora.", "s":"Barriga, rosto, mãos.\nDe manhã, de tarde, de noite.\nSempre lá."},
    {"t":"Isso não\né normal.",          "s":"É sinal de que o corpo\nestá inflamado por dentro."},
    {"t":"Inflamação\nnão é só física.", "s":"Vem do estresse, do sono ruim,\nda alimentação errada\npara o seu organismo."},
    {"t":"E quando o corpo\nestá inflamado,", "s":"nada funciona.\nNem dieta, nem exercício,\nnem força de vontade."},
    {"t":"A virada começa\nem desinflamar.", "s":"E isso não exige radicalismo.\nExige estratégia certa\npara o corpo certo."},
    {"t":"Quando a inflamação\ncai,",     "s":"o corpo responde.\nO peso se move.\nA energia volta."},
    {"t":"Isso é possível\npara você.",  "s":"Independente da idade.\nIndependente do histórico."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você sente o corpo\npesado, inchado e travado.", "pill":True},
  ]},

  # ── 16 ── A ilusão de que precisa sofrer para mudar ──────────────────────
  { "id":"16", "nome":"ILUSAO_DO_SOFRIMENTO", "tipo":"conteudo", "cards":[
    {"t":"\"Se não doer,\nnão funciona.\"", "s":"Você acredita nisso?\nEsse mito destruiu\nmuita gente."},
    {"t":"Dieta de 800\ncalorias.",       "s":"Treino duas vezes por dia.\nCortar tudo que gosta.\nE mesmo assim não funciona."},
    {"t":"Você associou\nmudança a sofrimento.", "s":"E sofrimento a resultado.\nMas sofrimento extremo\nleva a abandono. Sempre."},
    {"t":"Seu corpo\nnão quer punição.", "s":"Ele quer equilíbrio.\nEle quer estratégia.\nEle quer ser entendido."},
    {"t":"Quanto mais você\npressiona demais,", "s":"mais o corpo\nresiste e segura."},
    {"t":"O método certo\nnão dói assim.", "s":"Ele cabe na vida.\nPermite prazer.\nE ainda gera resultado."},
    {"t":"Resultado sustentável\nnão vem do limite.", "s":"Vem do equilíbrio.\nDa consistência\nque o sofrimento impede."},
    {"t":"Você pode comer\nbem e mudar.", "s":"Pode ter vida social\ne mudar. Pode ser humana\ne ainda assim mudar."},
    {"t":"Você não precisa\nse punir.",   "s":"Você precisa de\num método que respeite\nquem você é."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você acredita que\nprecisa sofrer para mudar.", "pill":True},
  ]},

  # ── 17 ── Quando a balança vira tortura emocional ────────────────────────
  { "id":"17", "nome":"BALANCA_TORTURA_EMOCIONAL", "tipo":"conteudo", "cards":[
    {"t":"O número\nda balança",         "s":"define como vai ser\nseu dia todo."},
    {"t":"Subiu 200g.",                  "s":"O dia está arruinado.\nO humor afundou.\nO esforço pareceu inútil."},
    {"t":"Baixou 400g.",                 "s":"Você respira aliviada.\nComo se tivesse permissão\npara existir hoje."},
    {"t":"A balança\nvirou o chefe.",    "s":"E você passa o dia\ntrabalhenado para\nagradar um número."},
    {"t":"Isso não é\nmotivação.",       "s":"É tortura emocional\ndisfarçada de disciplina."},
    {"t":"O número\nnão é a verdade.",   "s":"Água, hormônios, intestino.\nCentenas de fatores\nmovem esse número."},
    {"t":"E enquanto você\nobsessiona no número,", "s":"perde de vista\no que realmente\nestá funcionando."},
    {"t":"Existem formas\nmelhores de medir.", "s":"Roupas, energia, sono,\nhumor. Coisas que\nninguém te ensinou a usar."},
    {"t":"Liberar a balança\nnão é desistir.", "s":"É crescer. É ter\numa relação saudável\ncom o processo."},
    {"t":"Comente\nBLINDADO.",          "s":"Se a balança já\ntorturou seu dia.", "pill":True},
  ]},

  # ── 18 ── A mulher que cuida de todos e esquece dela ─────────────────────
  { "id":"18", "nome":"CUIDA_DE_TODOS_ESQUECE_DELA", "tipo":"manha", "cards":[
    {"t":"Você cuida\nde todo mundo.", "s":"Filhos, marido, trabalho,\npais, amigos.\nTodos primeiro."},
    {"t":"E você\npor último.",        "s":"Ou nem isso.\nVocê some\nda sua própria lista."},
    {"t":"Comer bem\nparece egoísmo.", "s":"\"Não tenho tempo.\"\n\"Não posso gastar nisso.\"\n\"Depois eu cuido.\""},
    {"t":"Mas \"depois\"\nnunca chega.", "s":"Porque sempre vai\nhaver alguém\nou algo antes de você."},
    {"t":"E o corpo\ncobra.",          "s":"Cansaço que não passa.\nPeso que não sai.\nHumor que falha."},
    {"t":"Você não pode\ndar o que não tem.", "s":"E uma mulher que\nestá no limite\nnão tem muito para dar."},
    {"t":"Cuidar de você\nnão é egoísmo.", "s":"É o ato mais\nresponsável que você\npode fazer por todos."},
    {"t":"Um método que\ncabe na sua vida real", "s":"é o único que\nfunciona pra quem\ncuida de todo mundo."},
    {"t":"Você merece\nser prioridade.",  "s":"Nem depois dos filhos.\nNem depois do trabalho.\nAgora."},
    {"t":"Comente\nBLINDADO.",          "s":"Se você cuida de todos\ne esquece de você.", "pill":True},
  ]},

  # ── 19 ── Como voltar sem radicalismo ────────────────────────────────────
  { "id":"19", "nome":"VOLTAR_SEM_RADICALISMO", "tipo":"manha", "cards":[
    {"t":"Você quer\nvoltar.",          "s":"Mas tem medo de começar\nde forma radical\ne parar de novo."},
    {"t":"Você já sabe\ncomo é.",       "s":"Começa tudo. Para tudo.\nE a culpa é mais pesada\ndo que antes."},
    {"t":"E se desta vez\nfor diferente?", "s":"Não pela intensidade.\nMas pela forma."},
    {"t":"Voltar não\nprecisa ser",    "s":"academia todo dia,\ndieta perfeita,\nsem comer o que gosta."},
    {"t":"Voltar pode\nser devagar.",   "s":"Com consistência.\nCom prazer.\nCom espaço para ser humana."},
    {"t":"O radicalismo\né armadilha.", "s":"Parece compromisso.\nMas é a mesma receita\nque já quebrou antes."},
    {"t":"O caminho real\né mais simples", "s":"do que parece.\nE mais poderoso\ndo que o radical."},
    {"t":"Você não precisa\nrecomeçar tudo.", "s":"Você precisa recomeçar\nde forma que\nnão precise parar."},
    {"t":"Um passo pequeno\nna direção certa", "s":"vale mais do que\ndez passos na direção\nque vai te cansar."},
    {"t":"Comente\nBLINDADO.",        "s":"Se você quer voltar\nsem radicalismo.", "pill":True},
  ]},

  # ── 20 ── Convite para o Grupo VIP ───────────────────────────────────────
  { "id":"20", "nome":"CONVITE_GRUPO_VIP", "tipo":"cta", "cards":[
    {"t":"Você chegou\naté aqui.",      "s":"E isso já diz muito\nsobre você."},
    {"t":"Você não\ndesistiu.",        "s":"Mesmo depois de tudo.\nMesmo depois das tentativas.\nMesmo depois do cansaço."},
    {"t":"E esse não\ndesistir",       "s":"é exatamente o que vai\nte levar para o outro lado."},
    {"t":"O Grupo VIP\nBlindado",      "s":"não é mais uma dieta.\nNão é mais uma promessa.\nÉ uma comunidade real."},
    {"t":"Mulheres que\nse identificam", "s":"com o que você sentiu\nao longo dessa leitura."},
    {"t":"Um lugar onde\nninguém julga.", "s":"Onde o processo é respeitado.\nOnde você pode ser\nhonesta sobre onde está."},
    {"t":"E onde você\ntema cesso",     "s":"a estratégias que foram\ncriadas para o corpo feminino,\nnão para o masculino."},
    {"t":"Gratuito.",                   "s":"Sem vender nada.\nSem promessa mágica.\nSó o caminho real."},
    {"t":"O próximo passo\né simples.",  "s":"Uma palavra nos comentários.\nE eu te mando o link."},
    {"t":"Comente\nBLINDADO.",         "s":"Eu te vejo do outro lado.", "pill":True},
  ]},
]

# ─────────────────────────────────────────────────────────────────────────────
def main():
    print("\n" + "="*60)
    print("  EMAGRECIMENTO BLINDADO — 20 carrosséis × 10 cards")
    print("="*60)

    resultados = []
    erros      = []

    for c in CARROSSEIS:
        folder = f"CARROSSEL_{c['id']}_{c['nome']}"
        out    = os.path.join(BASE_OUT, folder)
        try:
            gen.gerar_carrossel(c["tipo"], c["cards"], out, c["nome"].replace("_"," ").title())
            resultados.append((c["id"], folder, len(c["cards"])))
        except Exception as e:
            erros.append((c["id"], str(e)))
            print(f"  ✗ ERRO carrossel {c['id']}: {e}")

    # ── Relatório final ───────────────────────────────────────────────────
    print("\n" + "="*60)
    print(f"  CONCLUÍDO: {len(resultados)}/20 carrosséis gerados")
    print("="*60)
    for cid, folder, n in resultados:
        print(f"  ✓ {folder}  ({n} cards + PREVIEW.png)")
    if erros:
        print("\n  ERROS:")
        for cid, msg in erros: print(f"  ✗ {cid}: {msg}")
    print(f"\n  Pasta base: {BASE_OUT}\n")

if __name__ == "__main__":
    main()
