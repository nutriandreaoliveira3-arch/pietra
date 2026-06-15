from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_CENTER

GOLD  = colors.HexColor("#DCA84E")
BLACK = colors.HexColor("#181818")
WHITE = colors.white
CREAM = colors.HexColor("#FAF0DC")

OUT = "/home/user/pietra/carrosseis/ROTEIRO_40_CARROSSEIS.pdf"

doc = SimpleDocTemplate(OUT, pagesize=A4,
    leftMargin=2*cm, rightMargin=2*cm,
    topMargin=2*cm, bottomMargin=2*cm)

def S(name, **kw):
    return ParagraphStyle(name, **kw)

TIT  = S("T",  fontSize=20, textColor=GOLD,  fontName="Helvetica-Bold", alignment=TA_CENTER, spaceAfter=4)
SUB  = S("S",  fontSize=10, textColor=CREAM, fontName="Helvetica",      alignment=TA_CENTER, spaceAfter=14)
NUM  = S("N",  fontSize=14, textColor=GOLD,  fontName="Helvetica-Bold", spaceBefore=16, spaceAfter=4)
LH   = S("LH", fontSize=10, textColor=GOLD,  fontName="Helvetica-Bold", spaceBefore=8, spaceAfter=3)
LT   = S("LT", fontSize=10, textColor=CREAM, fontName="Helvetica",      spaceAfter=3, leading=15)
HT   = S("HT", fontSize=9,  textColor=GOLD,  fontName="Helvetica-Oblique", spaceAfter=10)
RH   = S("RH", fontSize=10, textColor=GOLD,  fontName="Helvetica-Bold", spaceBefore=6, spaceAfter=3)
RT   = S("RT", fontSize=10, textColor=CREAM, fontName="Helvetica",      spaceAfter=8, leading=15)
ROD  = S("RO", fontSize=8,  textColor=GOLD,  fontName="Helvetica-Oblique", alignment=TA_CENTER)

CARROSSEIS = [
  ("01","Come pouco e nada muda",
   "Voce come pouco e mesmo assim nao emagrece? A culpa nao e sua - e a estrategia errada para o seu corpo. Comente BLINDADO e vou te explicar. 👇",
   "#emagrecimentoblindado #metabolismofeminino #comepoucoenaoemagrece #hormoniosemagrecimento #emagrecerdeforma",
   "Cena 1 - HOOK: 'Voce come pouco... e mesmo assim nao emagrece?' | Cena 2 - DOR: 'Voce conta caloria, corta o pao, corta o doce. E a balanca nao se move.' | Cena 3 - VIRADA: 'Depois dos 35, comer menos pode travar o metabolismo, nao liberar.' | Cena 4 - CTA: 'Comenta BLINDADO aqui embaixo.'"),
  ("02","Cansaco de recomecar toda segunda",
   "Toda segunda voce comeca. Toda quinta voce ja parou. Isso nao e fraqueza - e o metodo errado. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #recomecar #segundafeira #dieta #emagrecerdeverdade",
   "Cena 1 - HOOK: 'Quantas vezes voce ja comecou na segunda-feira?' | Cena 2 - DOR: 'Comeca animada. Toda quinta... ja desistiu.' | Cena 3 - VIRADA: 'O problema e um metodo que so funciona se voce for perfeita. E ninguem e.' | Cena 4 - CTA: 'Comenta BLINDADO se voce esta cansada de recomecar.'"),
  ("03","Vergonha de tirar foto",
   "Quando alguem aponta a camera, voce se esconde. Nao e frescura - e uma dor real. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #autoestimafeminina #vergonhadocorpo #transformacaofeminina #mulheracima35",
   "Cena 1 - HOOK: 'Voce evita foto porque nao aguenta se ver?' | Cena 2 - DOR: 'Quando a camera aparece, voce se vira de lado ou pede para excluir.' | Cena 3 - VIRADA: 'O corpo mudou de regra. E com a estrategia certa, ele responde.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("04","Roupas apertadas",
   "Voce compra roupa larga nao porque gosta - e para esconder. Isso tem um caminho. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #roupaslargas #gorduraabdominal #emagrecermulher #corpodamulher",
   "Cena 1 - HOOK: 'Voce escolhe a roupa pelo tamanho ou pelo que ela esconde?' | Cena 2 - DOR: 'Comprar larga nao e conforto. E evitar se ver.' | Cena 3 - VIRADA: 'Quando o corpo comeca a responder, a relacao com a roupa muda.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("05","Medo de encontrar pessoas",
   "Voce recusa convites porque nao quer aparecer. Voce nao precisa esperar o peso ideal pra voltar a viver. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #autoestima #medodepessoas #isolamentosocial #mulherforte",
   "Cena 1 - HOOK: 'Voce ja deixou de ir a um evento por causa do seu corpo?' | Cena 2 - DOR: 'Fica em casa esperando estar pronta para aparecer.' | Cena 3 - VIRADA: 'A vida nao para enquanto o peso nao sai.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("06","Familia que julga",
   "'Nossa, voce engordou.' Uma frase. Uma dor que dura semanas. Voce merece um caminho real. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #familiatoxica #pressaofamiliar #saudementalfeminina #mulheracima35",
   "Cena 1 - HOOK: 'Alguem da sua familia ja comentou sobre o seu corpo?' | Cena 2 - DOR: 'Essa frase fica na cabeca por semanas. Doi mais do que parece.' | Cena 3 - VIRADA: 'Voce nao deve explicacao. Mas merece um caminho por voce mesma.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("07","Faz tudo certo e nada funciona",
   "Voce faz academia, dieta, esforco. E nada muda. Nao e falta de disciplina - e estrategia errada. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #faztudocerto #metabolismo #hormoniofeminino #emagrecercommetodo",
   "Cena 1 - HOOK: 'Voce faz academia, faz dieta, faz tudo certo...' | Cena 2 - DOR: 'Come menos, corta o pao, corta o doce. Faz mais que amigas que emagrecem sem esforco.' | Cena 3 - VIRADA: 'O problema nao e voce. E que a estrategia foi feita para outro corpo.' | Cena 4 - CTA: 'Comenta BLINDADO se voce se reconheceu.'"),
  ("08","Ansiedade a noite",
   "A casa fica quieta e voce vai na geladeira. Nao por fome - por ansiedade. Esse ciclo tem saida. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #ansiedadenoturna #compulsaoalimentar #comerdemais #saudementalfeminina",
   "Cena 1 - HOOK: 'O que acontece quando a casa fica quieta a noite?' | Cena 2 - DOR: 'Voce nao vai por fome. Vai pra acalmar, preencher, compensar.' | Cena 3 - VIRADA: 'Isso e bioquimica, nao fraqueza. E bioquimica tem solucao.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("09","Fim de semana destroi tudo",
   "Segunda a sexta voce e disciplinada. Fim de semana desfaz tudo. Nao e falta de foco - e metodo errado. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #fimdesemana #dieta #consistencia #emagrecerdeverdade",
   "Cena 1 - HOOK: 'Sua semana vai bem. Chega o fim de semana e tudo vai por agua abaixo?' | Cena 2 - DOR: 'Isso nao e falta de disciplina. E uma dieta que nao foi feita pra vida real.' | Cena 3 - VIRADA: 'O metodo certo preve o fim de semana, a festa, o jantar fora.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("10","Mulher invisivel",
   "Em algum momento voce parou de aparecer. Voce nao sumiu - foi silenciada pelo proprio corpo. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #mulherinvisivel #mulheracima35 #autoestimafeminina #identidadefeminina",
   "Cena 1 - HOOK: 'Quando foi a ultima vez que voce se sentiu vista?' | Cena 2 - DOR: 'Muitas mulheres param de aparecer quando deixam de se reconhecer.' | Cena 3 - VIRADA: 'Voce nao precisa esperar um peso para voltar a existir.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("11","Comparacao com outras mulheres",
   "Ela come tudo e nao engorda. Voce se controla e nada muda. Parar de comparar e entender que cada corpo tem sua estrategia. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #comparacao #autoestima #mulherreal #jornadadeemagrecimento",
   "Cena 1 - HOOK: 'Voce para e se compara com outras mulheres?' | Cena 2 - DOR: 'Ela come de tudo. Voce se controla. Os resultados sao diferentes.' | Cena 3 - VIRADA: 'Cada corpo esta num momento diferente. O seu precisa de estrategia propria.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("12","Medo da praia e eventos",
   "O convite chegou. E veio junto o panico. Voce merece curtir sem esse peso. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #medodapraia #biquini #verao #emagrecermulher",
   "Cena 1 - HOOK: 'A praia chegou. E veio junto a ansiedade do biquini?' | Cena 2 - DOR: 'Voce deixa de ir ou vai sofrendo o tempo todo.' | Cena 3 - VIRADA: 'Voce merece estar presente sem se esconder.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("13","Comer escondido",
   "Voce come escondida. Isso nao e falta de carater - e o sinal de que a relacao com a comida precisa de cuidado. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #comerescondido #culpaalimentar #compulsao #relacaocomcomida",
   "Cena 1 - HOOK: 'Voce ja comeu escondida para ninguem ver?' | Cena 2 - DOR: 'Nao por fome. Por ansiedade, culpa ou necessidade de prazer.' | Cena 3 - VIRADA: 'Isso nao e fraqueza. E um padrao que tem nome e tem solucao.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("14","Falta de constancia",
   "Voce comeca bem. Depois de alguns dias, para. Nao e falta de disciplina - e um metodo que exige perfeicao. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #constancia #disciplina #emagrecercommetodo #habitos",
   "Cena 1 - HOOK: 'Voce comeca. Para. Recomeça. Para de novo?' | Cena 2 - DOR: 'Isso nao e fraqueza - e uma estrategia que quebra com qualquer deslize.' | Cena 3 - VIRADA: 'O metodo certo sobrevive a um dia ruim.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("15","Corpo inflamado e pesado",
   "Voce acorda pesada mesmo sem ter comido nada diferente. Inflamacao cronica pode estar travando tudo. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #inflamacao #corpopesado #saudefeminina #antiinflamatorio",
   "Cena 1 - HOOK: 'Voce acorda todo dia com o corpo pesado e inflamado?' | Cena 2 - DOR: 'Mesmo fazendo dieta, o corpo parece resistir.' | Cena 3 - VIRADA: 'Inflamacao cronica trava o emagrecimento. Tem como tratar.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("16","A ilusao do sofrimento",
   "Voce acredita que sofrer faz parte. Sofrer nao emagrece. Estrategia emagrece. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #sofrimentonaoemagrece #dieta #estrategia #emagrecercominteligencia",
   "Cena 1 - HOOK: 'Voce foi ensinada que emagrecer tem que doer?' | Cena 2 - DOR: 'Que quanto mais voce sofrer, mais rapido vai funcionar?' | Cena 3 - VIRADA: 'Essa crenca e o que te mantem presa. Emagrecimento de verdade e estrategia.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("17","A balanca como tortura emocional",
   "Voce sobe na balanca e o numero define seu dia. A balanca nao mede saude - mede gravidade. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #balanca #pesonumero #saudemental #emagrecersemsofrimento",
   "Cena 1 - HOOK: 'O numero na balanca define o seu dia?' | Cena 2 - DOR: 'Se subiu, voce se pune. Se desceu, voce respira.' | Cena 3 - VIRADA: 'Isso nao e saudavel. O metodo certo te libera dessa dependencia.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("18","Cuida de todos, esquece de si",
   "Voce cuida de todo mundo. Colocar voce no ultimo lugar nao e virtude - e esgotamento. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #autocuidado #mulhermaequetrabalhase #cuidardesimesma #saudefeminina",
   "Cena 1 - HOOK: 'Voce cuida de todo mundo. Mas quem cuida de voce?' | Cena 2 - DOR: 'No final do dia, voce esta no fundo da lista. Sempre.' | Cena 3 - VIRADA: 'Cuidar de voce nao e egoismo. E necessidade.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("19","Voltar sem radicalismo",
   "Voce sabe que precisa voltar. Mas tem medo do ciclo de exagero e abandono. Voltar nao precisa ser radical. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #voltaradieta #semradicalismo #emagrecerdeverdade #recomeçobem",
   "Cena 1 - HOOK: 'Voce quer voltar a se cuidar mas tem medo de cair no mesmo ciclo?' | Cena 2 - DOR: 'Dieta radical. Sofrimento. Abandono. Culpa. De novo.' | Cena 3 - VIRADA: 'Voltar nao precisa ser assim. Existe um caminho sem radicalismo.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("20","Convite para o Grupo VIP",
   "O Grupo VIP do Emagrecimento Blindado e para voce que quer entender o metodo de verdade. Comente BLINDADO e vou te mandar o acesso. 👇",
   "#emagrecimentoblindado #grupovip #metodoblindado #transformacaofeminina #emagrecercomaprendizado",
   "Cena 1 - HOOK: 'Voce tem se identificado com tudo que compartilho aqui?' | Cena 2 - DOR: 'O Grupo VIP foi feito para mulheres como voce.' | Cena 3 - VIRADA: 'Metodo. Suporte. Comunidade. Sem julgamento.' | Cena 4 - CTA: 'Comenta BLINDADO e eu te mando o link.'"),
  ("21","Nao aguenta olhar no espelho",
   "Voce desvia do espelho. Isso tem saida. E ela nao passa por mais sofrimento. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #espelho #autoestimafeminina #corpofeminino #transformacaoreal",
   "Cena 1 - HOOK: 'Voce desvia do espelho quando passa?' | Cena 2 - DOR: 'Nao porque e frescura - mas porque doi se ver.' | Cena 3 - VIRADA: 'Reconexao com o proprio corpo e possivel. E parte do metodo.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("22","A dieta funciona so para os outros",
   "A mesma dieta, o mesmo esforco, resultados completamente diferentes. Seu corpo nao e resistente - esta respondendo a sinais errados. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #dietanafunciona #metabolismo #hormonios #emagrecercomciencia",
   "Cena 1 - HOOK: 'Voce segue a mesma dieta que sua amiga e ela emagrece. Voce nao.' | Cena 2 - DOR: 'Nao e injustica. E que cada corpo esta em um contexto diferente.' | Cena 3 - VIRADA: 'A estrategia certa para o seu momento muda tudo.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("23","Ansiedade com comida",
   "Voce nao come por fome. Come para acalmar, compensar, preencher. Esse ciclo tem saida. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #ansiedadecomida #compulsaoalimentar #relacaocomida #saudeemocional",
   "Cena 1 - HOOK: 'Voce come mesmo sem fome? So pra acalmar a cabeca?' | Cena 2 - DOR: 'Isso nao e fraqueza. E o seu cerebro usando a comida como recurso emocional.' | Cena 3 - VIRADA: 'Quando o corpo estabiliza, esse gatilho perde forca.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("24","O marido nao entende",
   "Ele come tudo e nao engorda. Voce se controla e o peso nao sai. Voce merece estrategia feita para o seu corpo. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #corpofeminino #hormoniosfemininos #mulherreal #emagrecercommetodo",
   "Cena 1 - HOOK: 'Seu marido come de tudo e o peso nao varia. Voce se controla e nada muda?' | Cena 2 - DOR: 'O corpo masculino e feminino sao diferentes. Hormonios, metabolismo, tudo.' | Cena 3 - VIRADA: 'Voce precisa de estrategia feita para o seu corpo. Nao adaptada do dele.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("25","Sono ruim e peso que nao sai",
   "Sono ruim eleva cortisol. Cortisol trava emagrecimento. Isso tem solucao. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #sonoemagrecimento #cortisol #sonoreparador #hormoniosemagrecimento",
   "Cena 1 - HOOK: 'Voce dorme mal e acorda querendo comer doce logo cedo?' | Cena 2 - DOR: 'Isso nao e falta de disciplina. E cortisol elevado pedindo energia rapida.' | Cena 3 - VIRADA: 'Regularizar o sono e parte do metodo. Nao e detalhe.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("26","Inchaco que nao passa",
   "Voce acorda inchada mesmo sem ter comido diferente. Isso e um sinal que o corpo manda e que precisa ser lido. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #inchaco #inchacoabdominal #intestino #inflamacaocorporal",
   "Cena 1 - HOOK: 'Voce acorda inchada mesmo sem ter comido nada diferente?' | Cena 2 - DOR: 'Inchaco cronico e sinal - de inflamacao, intestino sobrecarregado ou hormonio.' | Cena 3 - VIRADA: 'Quando voce trata a causa, o inchaco some. As medidas diminuem.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("27","Culpa apos comer fora",
   "Voce saiu para jantar e voltou com culpa. Uma refeicao nao destroi semanas. A culpa, sim. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #culpaalimentar #comerforadecasa #relacaocomida #emagrecersemculpa",
   "Cena 1 - HOOK: 'Voce sai para jantar e fica calculando o dano a noite toda?' | Cena 2 - DOR: 'A culpa eleva cortisol. E cortisol trava emagrecimento.' | Cena 3 - VIRADA: 'O metodo certo preve o jantar fora. Preve a vida real.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("28","A barriga que nao vai embora",
   "Voce faz tudo e a barriga nao sai. Isso tem explicacao - e nao e falta de esforco. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #barriga #gorduraabdominal #cortisol #emagrecerbarriga",
   "Cena 1 - HOOK: 'Voce emagrece em todo lugar, mas a barriga nao sai?' | Cena 2 - DOR: 'Abdominais fortalecem musculo. Mas nao dissipam gordura abdominal.' | Cena 3 - VIRADA: 'Gordura no abdomen e hormonal. E tem como tratar com estrategia.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("29","Medo de parar a dieta e engordar tudo",
   "Voce nao para a dieta porque sabe o que acontece quando para. Existe uma saida desse ciclo. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #efeitosanfona #dieta #metabolismo #emagrecersemrestricao",
   "Cena 1 - HOOK: 'Voce tem medo de parar a dieta porque sabe que o peso volta?' | Cena 2 - DOR: 'Isso se chama efeito sanfona. E acontece quando o metodo nao foi feito pra durar.' | Cena 3 - VIRADA: 'Emagrecer de verdade e reprogramar o metabolismo. Nao so perder peso.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("30","Preguica e falta de energia",
   "Voce nao e preguicosa. Voce esta exausta. Sao coisas completamente diferentes. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #faltadeenergia #cansaco #tireoidefeminina #vitaminas",
   "Cena 1 - HOOK: 'Voce se sente cansada o tempo todo, mesmo dormindo?' | Cena 2 - DOR: 'Isso pode ser ferro baixo, vitamina D, tireoide ou cortisol. Nao e preguica.' | Cena 3 - VIRADA: 'Quando o corpo recebe o que precisa, a energia aparece de verdade.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("31","Pressao das redes sociais",
   "Cada scroll e uma comparacao. Voce compara seu processo com o resultado editado dos outros. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #redessociais #comparacao #autocuidado #mulherreal",
   "Cena 1 - HOOK: 'Voce abre o Instagram e sente aquela pontada de comparacao?' | Cena 2 - DOR: 'Voce compara seu processo com o resultado final e editado dos outros.' | Cena 3 - VIRADA: 'Seu progresso e o unico que importa. E ele tem um caminho.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("32","Fome emocional e comer por tedio",
   "Voce nao estava com fome. Estava entediada, sozinha, ansiosa. Mas foi na geladeira assim mesmo. Esse ciclo tem saida. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #fomeemocional #comeportedio #ansiedade #compulsaoalimentar",
   "Cena 1 - HOOK: 'Voce come quando ta entediada, ansiosa ou sozinha?' | Cena 2 - DOR: 'Seu cerebro aprendeu que comida acalma. E usa isso como recurso.' | Cena 3 - VIRADA: 'Isso tem solucao. E passa por equilibrar, nao por proibir.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("33","Insatisfacao mesmo depois de emagrecer",
   "Voce perdeu peso e mesmo assim nao se sentiu bem. Emagrecer sem cuidar do interior e trocar o sofrimento de forma. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #autoestima #emagrecimentomental #corpoeestimafeminina #transformacaocompleta",
   "Cena 1 - HOOK: 'Voce ja emagreceu mas continuou insatisfeita com o que via no espelho?' | Cena 2 - DOR: 'A insatisfacao nao esta no peso. Esta na relacao que voce tem com voce mesma.' | Cena 3 - VIRADA: 'O metodo completo cuida do corpo e da mente ao mesmo tempo.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("34","Sem tempo para cuidar de si",
   "Voce cuida de todo mundo. 15 minutos por dia sao suficientes para comecar. O metodo certo cabe na sua vida real. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #semtempo #autocuidado #maequetrabalhase #cuidardesimesma",
   "Cena 1 - HOOK: 'Voce coloca todo mundo na frente. E sobra zero para voce.' | Cena 2 - DOR: 'Nao e egoismo se cuidar. E necessidade. E urgente.' | Cena 3 - VIRADA: 'O metodo Blindado cabe em 15 minutos por dia. Na sua vida real.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("35","Medico que so diz coma menos",
   "Voce foi ao medico e ele disse: coma menos e se mexe mais. Como se voce nao estivesse tentando. Voce merece uma resposta melhor. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #medicoemagrecimento #metabolismofeminino #hormoniofeminino #saudeintegrativa",
   "Cena 1 - HOOK: 'O medico te disse pra comer menos e se mexer mais. E voce ja faz isso.' | Cena 2 - DOR: 'Essa resposta ignora hormonios, cortisol, metabolismo adaptado e inflamacao.' | Cena 3 - VIRADA: 'Voce merece um olhar que realmente enxerga o que esta acontecendo.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("36","Emagrecer para uma data e nao conseguir",
   "Voce se preparou por meses para aquela data. E chegou o dia sem o resultado esperado. O corpo nao obedece calendario. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #emagrecerparaevento #dieta #resultadodeverdade #emagrecercommetodo",
   "Cena 1 - HOOK: 'Voce ja entrou em dieta porque tinha um casamento ou viagem?' | Cena 2 - DOR: 'A pressao da data aumenta cortisol. Cortisol trava o emagrecimento.' | Cena 3 - VIRADA: 'O metodo certo funciona em qualquer data - nao so quando tem compromisso.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("37","Metabolismo lento",
   "'Seu metabolismo e lento.' Como se fosse uma sentenca. Metabolismo lento nao e destino - e um sinal. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #metabolismolento #tireoide #insulina #emagrecercomhormonios",
   "Cena 1 - HOOK: 'Te disseram que seu metabolismo e lento e que e assim mesmo?' | Cena 2 - DOR: 'Metabolismo lento nao e destino. E tireoide, cortisol ou insulina pedindo atencao.' | Cena 3 - VIRADA: 'Quando voce trata a causa, o metabolismo responde.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("38","Vergonha na academia",
   "Voce foi para a academia, olhou para os outros corpos e saiu sem fazer nada. Movimento que voce mantem vale mais. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #academiamotivacao #vergonha #movimentocomleveza #emagrecersemjulgamento",
   "Cena 1 - HOOK: 'Voce ja foi a academia e saiu sem treinar porque se sentiu no lugar errado?' | Cena 2 - DOR: 'Aquela sensacao de que todo mundo esta te olhando.' | Cena 3 - VIRADA: 'O movimento que voce consegue manter vale muito mais que o treino que te afasta.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("39","Silencio sobre a propria dor",
   "Voce nao fala sobre isso. Engole a dor como se nao merecesse ser dita. Voce merece ser ouvida. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #saudeemocional #dorsilenciosa #mulherforte #vocemerece",
   "Cena 1 - HOOK: 'Voce carrega a dor com o seu corpo em silencio?' | Cena 2 - DOR: 'Minimiza na consulta. Sorri pra quem pergunta. Diz que ta bem.' | Cena 3 - VIRADA: 'Voce merece ser ouvida. E a dor que voce sente merece ser tratada.' | Cena 4 - CTA: 'Comenta BLINDADO.'"),
  ("40","Transformacao aos 40, 45, 50 anos",
   "Voce tem 40, 45 ou 50 anos e acha que ja e tarde? Nao e tarde - e diferente. Existe estrategia para o seu corpo agora. Comente BLINDADO. 👇",
   "#emagrecimentoblindado #mulheracima40 #transformacaoaos40 #emagrecercomidade #nuncaetarde",
   "Cena 1 - HOOK: '40 anos. 45 anos. 50 anos. E voce acha que ja passou o tempo de mudar.' | Cena 2 - DOR: 'Voce ve mulheres mais novas e pensa: pra mim ja nao funciona.' | Cena 3 - VIRADA: 'O corpo humano responde ate os 80 anos. O que muda e a estrategia.' | Cena 4 - CTA: 'Comenta BLINDADO se voce ainda acredita que tem um caminho pra voce.'"),
]

def bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BLACK)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(1.5)
    canvas.rect(1*cm, 1*cm, A4[0]-2*cm, A4[1]-2*cm, fill=0, stroke=1)
    canvas.restoreState()

story = []
story.append(Spacer(1, 1.5*cm))
story.append(Paragraph("EMAGRECIMENTO BLINDADO", TIT))
story.append(Paragraph("Roteiro Completo - 40 Carrosseis", SUB))
story.append(Paragraph("Hashtags + Legenda + Roteiro de Reel para cada carrossel", S("D", fontSize=9, textColor=CREAM, fontName="Helvetica", alignment=TA_CENTER, spaceAfter=16)))
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=10))

for (num, titulo, legenda, hashtags, reel) in CARROSSEIS:
    story.append(HRFlowable(width="100%", thickness=0.4, color=GOLD, spaceBefore=12, spaceAfter=6))
    story.append(Paragraph("CARROSSEL %s - %s" % (num, titulo), NUM))
    story.append(Paragraph("LEGENDA PARA O POST:", LH))
    story.append(Paragraph(legenda, LT))
    story.append(Paragraph(hashtags, HT))
    story.append(Paragraph("ROTEIRO REEL (30-45 seg):", RH))
    story.append(Paragraph(reel, RT))

story.append(Spacer(1, 1*cm))
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=8))
story.append(Paragraph("@emagrecimentoblindado  -  junho/2026  -  40 carrosseis | 40 legendas | 40 roteiros", ROD))

doc.build(story, onFirstPage=bg, onLaterPages=bg)
print("PDF gerado:", OUT)
