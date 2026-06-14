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

OUT = "/home/user/pietra/carrosseis/ROTEIRO_GRAVACAO_TOP5.pdf"

doc = SimpleDocTemplate(OUT, pagesize=A4,
    leftMargin=2*cm, rightMargin=2*cm,
    topMargin=2*cm, bottomMargin=2*cm)

def S(name, **kw):
    return ParagraphStyle(name, **kw)

TIT   = S("T",  fontSize=22, textColor=GOLD,  fontName="Helvetica-Bold",  alignment=TA_CENTER, spaceAfter=4)
SUB   = S("S",  fontSize=11, textColor=CREAM, fontName="Helvetica",       alignment=TA_CENTER, spaceAfter=16)
REEL  = S("R",  fontSize=16, textColor=GOLD,  fontName="Helvetica-Bold",  spaceBefore=18, spaceAfter=4)
CAR   = S("C",  fontSize=9,  textColor=GOLD,  fontName="Helvetica-Oblique", spaceAfter=2)
OBJ   = S("O",  fontSize=9,  textColor=CREAM, fontName="Helvetica",       spaceAfter=10, leading=14)
LC    = S("LC", fontSize=10, textColor=GOLD,  fontName="Helvetica-Bold",  spaceBefore=10, spaceAfter=2)
INST  = S("I",  fontSize=9,  textColor=CREAM, fontName="Helvetica-Oblique", spaceAfter=2)
FALA  = S("F",  fontSize=13, textColor=WHITE, fontName="Helvetica-Bold",  spaceBefore=4, spaceAfter=6, leading=18)
LH    = S("LH", fontSize=10, textColor=GOLD,  fontName="Helvetica-Bold",  spaceBefore=12, spaceAfter=4)
LT    = S("LT", fontSize=10, textColor=CREAM, fontName="Helvetica",       spaceAfter=4, leading=15)
HT    = S("HT", fontSize=9,  textColor=GOLD,  fontName="Helvetica-Oblique", spaceAfter=12)
DH    = S("DH", fontSize=13, textColor=GOLD,  fontName="Helvetica-Bold",  spaceBefore=18, spaceAfter=8)
DT    = S("DT", fontSize=10, textColor=CREAM, fontName="Helvetica",       spaceAfter=5, leading=15)
INT   = S("IN", fontSize=10, textColor=CREAM, fontName="Helvetica",       alignment=TA_CENTER, spaceAfter=20, leading=16)
ROD   = S("RO", fontSize=8,  textColor=GOLD,  fontName="Helvetica-Oblique", alignment=TA_CENTER)

REELS = [
  {
    "num": "01", "titulo": "Come pouco e nada muda",
    "carrossel": "Carrossel 01 - COME_POUCO_E_NAO_MUDA",
    "objetivo": "Parar o scroll de quem se sente injusticada pelo proprio corpo",
    "cenas": [
      ("CENA 1 - HOOK (3 seg)",  "olha firme pra camera, pausa antes de falar",
       "Voce come pouco... e mesmo assim nao emagrece."),
      ("CENA 2 - DOR (8 seg)",   "tom de quem entende, nao de quem julga",
       "Voce conta caloria, corta o pao, corta o doce, faz tudo certo. E a balanca nao se move. Enquanto isso, outras mulheres comem de tudo e o peso vai embora facil."),
      ("CENA 3 - VIRADA (10 seg)", "tom mais firme, assertivo",
       "Mas isso nao e falta de forca de vontade. Depois dos 35, comer menos pode travar o metabolismo, nao liberar. Seu corpo entende fome como ameaca. E segura tudo."),
      ("CENA 4 - CTA (5 seg)",   "olha direto pra camera, sorriso discreto",
       "Se isso faz sentido pra voce, comenta BLINDADO aqui embaixo."),
    ],
    "legenda": "Voce come pouco e mesmo assim nao emagrece? A culpa nao e sua - e a estrategia errada para o seu corpo. Comente BLINDADO e vou te explicar. 👇",
    "hashtags": "#emagrecimentoblindado #metabolismofeminino #comepoucoenaoemagrece #hormoniosemagrecimento #emagrecerdeforma",
  },
  {
    "num": "02", "titulo": "Toda segunda voce recomeça",
    "carrossel": "Carrossel 02 - CANSACO_DE_RECOMECAR",
    "objetivo": "Atingir quem vive o ciclo de comecar e parar toda semana",
    "cenas": [
      ("CENA 1 - HOOK (3 seg)",   "tom leve, quase ironico, sorriso",
       "Quantas vezes voce ja comecou na segunda-feira?"),
      ("CENA 2 - DOR (8 seg)",    "pausas dramaticas entre as frases",
       "Comeca animada. Toda quinta... ja desistiu. O domingo a noite chega pesado. Aquela sensacao de que amanha vai ser diferente."),
      ("CENA 3 - VIRADA (10 seg)","firme, sem culpa",
       "Mas isso nao e falta de vontade. Voce ja provou que tem. Incontaveis vezes. O problema e um metodo que so funciona se voce for perfeita. E ninguem e."),
      ("CENA 4 - CTA (5 seg)",    "direto, confiante",
       "Se voce esta cansada de recomecar, comenta BLINDADO aqui embaixo."),
    ],
    "legenda": "Toda segunda voce comeca. Toda quinta voce ja parou. Isso nao e fraqueza - e o metodo errado. Comente BLINDADO e vou te mostrar outro caminho. 👇",
    "hashtags": "#emagrecimentoblindado #recomecar #segundafeira #dieta #emagrecerdeverdade",
  },
  {
    "num": "03", "titulo": "Faz tudo certo e nada funciona",
    "carrossel": "Carrossel 07 - FAZ_TUDO_CERTO_NADA_FUNCIONA",
    "objetivo": "Atingir a frustracao maxima - quem ja tentou tudo",
    "cenas": [
      ("CENA 1 - HOOK (3 seg)",   "pausa, olho no olho da camera",
       "Voce faz academia, faz dieta, faz tudo certo..."),
      ("CENA 2 - DOR (10 seg)",   "lista rapida, como contando nos dedos",
       "Acorda cedo. Come menos do que todo mundo. Corta o pao, corta o doce, corta o alcool. Faz mais do que amigas que emagrecem sem fazer metade do esforco."),
      ("CENA 3 - VIRADA (10 seg)","para, respira, muda o tom",
       "E mesmo assim. O peso nao sai. A frustracao cresce. Mas sabe o que ninguem te contou? O problema nao e voce. E que a estrategia foi feita para outro corpo."),
      ("CENA 4 - CTA (5 seg)",    "direto ao ponto",
       "Comenta BLINDADO se voce se reconheceu aqui."),
    ],
    "legenda": "Voce faz tudo certo. Academia, dieta, esforco. E nada muda. Nao e falta de disciplina - e estrategia errada para o seu corpo hoje. Comente BLINDADO. 👇",
    "hashtags": "#emagrecimentoblindado #faztudocerto #metabolismo #hormoniofeminino #emagrecercommetodo",
  },
  {
    "num": "04", "titulo": "A barriga que nao vai embora",
    "carrossel": "Carrossel 28 - BARRIGA_QUE_NAO_SAI",
    "objetivo": "Falar da dor mais comum - gordura abdominal resistente",
    "cenas": [
      ("CENA 1 - HOOK (3 seg)",   "direta, com forca",
       "O resto do corpo responde. A barriga, nao."),
      ("CENA 2 - DOR (8 seg)",    "tom de quem viveu isso",
       "Voce ja fez abdominais. Cardio. Suco verde. Cortou tudo. E a barriga fica. Insiste. Resiste. E voce comeca a achar que e assim mesmo."),
      ("CENA 3 - VIRADA (10 seg)","informacao + empoderamento",
       "Gordura abdominal nao responde ao mesmo protocolo do resto do corpo. Ela esta ligada a cortisol elevado, insulina e alteracoes hormonais pos-35. Abdominal fortalece musculo. Nao dissolve gordura."),
      ("CENA 4 - CTA (5 seg)",    "com confianca",
       "Comenta BLINDADO e vou te mostrar o que estava mantendo a barriga."),
    ],
    "legenda": "Voce faz tudo e a barriga nao sai. Isso tem explicacao - e nao e falta de esforco. Comente BLINDADO. 👇",
    "hashtags": "#emagrecimentoblindado #barriga #gorduraabdominal #cortisol #emagrecerbarriga",
  },
  {
    "num": "05", "titulo": "Transformacao aos 40, 45, 50 anos",
    "carrossel": "Carrossel 40 - TRANSFORMACAO_AOS_40_50",
    "objetivo": "Quebrar a crenca de que ja e tarde demais - alto engajamento emocional",
    "cenas": [
      ("CENA 1 - HOOK (4 seg)",   "pausas entre cada numero",
       "40 anos. 45 anos. 50 anos. E voce acha que ja passou o tempo de mudar."),
      ("CENA 2 - DOR (8 seg)",    "tom de identificacao, nao de julgamento",
       "Voce ve mulheres mais novas transformando o corpo e pensa: pra mim ja nao funciona. Ja tentei. Minha idade nao ajuda. Meu metabolismo desacelerou."),
      ("CENA 3 - VIRADA (10 seg)","firme, com autoridade",
       "Mas o corpo humano responde ate os 80 anos. O que muda depois dos 40 nao e a capacidade - e a estrategia. Voce nao precisa da dieta dos 25. Precisa do metodo certo para onde esta agora."),
      ("CENA 4 - CTA (5 seg)",    "sorriso, confianca",
       "Comenta BLINDADO se voce ainda acredita que tem um caminho pra voce."),
    ],
    "legenda": "Voce tem 40, 45 ou 50 anos e acha que ja e tarde? Nao e tarde - e diferente. E existe uma estrategia para o seu corpo agora. Comente BLINDADO. 👇",
    "hashtags": "#emagrecimentoblindado #mulheracima40 #transformacaoaos40 #emagrecercomidade #nuncaetarde",
  },
]

DICAS = [
  ("Enquadramento",  "Busto para cima, camera na altura dos olhos"),
  ("Fundo",          "Parede escura, preto ou grafite - combina com a identidade Blindado"),
  ("Iluminacao",     "Luz frontal suave no rosto (ring light ou luz natural de janela)"),
  ("Roupa",          "Tom escuro, elegante, sem estampa"),
  ("Ritmo",          "Pausas curtas entre frases - nao fale rapido demais"),
  ("Olho na camera", "Especialmente no hook e no CTA - olhar direto cria conexao"),
  ("Texto na tela",  "Coloque as frases principais em texto durante a edicao (reforco no mudo)"),
  ("Musica",         "Instrumental suave, volume baixo - nao compete com a voz"),
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
story.append(Paragraph("Roteiro de Gravacao - Top 5 Reels", SUB))
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=8))
story.append(Paragraph(
    "Cada reel tem 4 cenas com a fala exata, instrucao de postura e CTA.<br/>"
    "Duracao ideal: 30 a 45 segundos. Fale direto para a camera.", INT))

for reel in REELS:
    story.append(HRFlowable(width="100%", thickness=0.5, color=GOLD, spaceBefore=10, spaceAfter=6))
    story.append(Paragraph("REEL %s - %s" % (reel["num"], reel["titulo"]), REEL))
    story.append(Paragraph(reel["carrossel"], CAR))
    story.append(Paragraph("<b>Objetivo:</b> %s" % reel["objetivo"], OBJ))
    for (label, inst, fala_txt) in reel["cenas"]:
        story.append(Paragraph(label, LC))
        story.append(Paragraph("(%s)" % inst, INST))
        story.append(Paragraph(fala_txt, FALA))
    story.append(Paragraph("LEGENDA PRONTA", LH))
    story.append(Paragraph(reel["legenda"], LT))
    story.append(Paragraph(reel["hashtags"], HT))

story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceBefore=16, spaceAfter=8))
story.append(Paragraph("DICAS DE GRAVACAO", DH))
for (k, v) in DICAS:
    story.append(Paragraph("<b>%s:</b>  %s" % (k, v), DT))

story.append(Spacer(1, 1*cm))
story.append(Paragraph("@emagrecimentoblindado  -  junho/2026", ROD))

doc.build(story, onFirstPage=bg, onLaterPages=bg)
print("PDF gerado:", OUT)
