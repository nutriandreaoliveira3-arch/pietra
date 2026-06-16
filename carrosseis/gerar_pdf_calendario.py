from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

GOLD  = colors.HexColor("#DCA84E")
BLACK = colors.HexColor("#181818")
WHITE = colors.white
CREAM = colors.HexColor("#FAF0DC")
DARK  = colors.HexColor("#242424")

OUT = "/home/user/pietra/carrosseis/CALENDARIO_POSTAGEM_40_CARROSSEIS.pdf"

doc = SimpleDocTemplate(OUT, pagesize=A4,
    leftMargin=1.5*cm, rightMargin=1.5*cm,
    topMargin=2*cm, bottomMargin=2*cm)

def S(name, **kw):
    return ParagraphStyle(name, **kw)

TIT  = S("T",  fontSize=20, textColor=GOLD,  fontName="Helvetica-Bold", alignment=TA_CENTER, spaceAfter=4)
SUB  = S("S",  fontSize=10, textColor=CREAM, fontName="Helvetica",      alignment=TA_CENTER, spaceAfter=4)
SUB2 = S("S2", fontSize=9,  textColor=CREAM, fontName="Helvetica",      alignment=TA_CENTER, spaceAfter=14)
WK   = S("W",  fontSize=13, textColor=GOLD,  fontName="Helvetica-Bold", spaceBefore=14, spaceAfter=6)
CELL = S("CE", fontSize=8,  textColor=WHITE, fontName="Helvetica",      leading=11)
CELLB= S("CB", fontSize=8,  textColor=GOLD,  fontName="Helvetica-Bold", leading=11)
NOTE = S("NO", fontSize=9,  textColor=CREAM, fontName="Helvetica-Oblique", spaceAfter=4, leading=13)
DH   = S("DH", fontSize=13, textColor=GOLD,  fontName="Helvetica-Bold", spaceBefore=16, spaceAfter=6)
DT   = S("DT", fontSize=9,  textColor=CREAM, fontName="Helvetica",      spaceAfter=4, leading=14)
ROD  = S("RO", fontSize=8,  textColor=GOLD,  fontName="Helvetica-Oblique", alignment=TA_CENTER)

# 40 temas, 5 por semana, 8 semanas
TEMAS = [
  "01 Come pouco e nao muda","02 Cansaco de recomecar","03 Vergonha de tirar foto","04 Roupas apertadas","05 Medo de encontrar pessoas",
  "06 Familia que julga","07 Faz tudo certo nada funciona","08 Ansiedade a noite","09 Fim de semana destroi tudo","10 Mulher invisivel",
  "11 Comparacao com outras","12 Medo da praia e eventos","13 Comer escondido","14 Falta de constancia","15 Corpo inflamado e pesado",
  "16 Ilusao do sofrimento","17 Balanca tortura emocional","18 Cuida de todos esquece dela","19 Voltar sem radicalismo","20 Convite Grupo VIP",
  "21 Nao aguenta espelho","22 Dieta funciona so outros","23 Ansiedade com comida","24 Marido nao entende","25 Sono ruim e peso",
  "26 Inchaco que nao passa","27 Culpa apos comer fora","28 Barriga que nao sai","29 Medo de parar dieta","30 Preguica e sem energia",
  "31 Pressao redes sociais","32 Fome emocional e tedio","33 Insatisfacao mesmo emagrecendo","34 Sem tempo para si","35 Medico so diz coma menos",
  "36 Emagrecer para data","37 Metabolismo lento","38 Vergonha na academia","39 Silencio sobre a dor","40 Transformacao aos 40 50",
]

DIAS_HORARIOS = [
  ("Segunda-feira", "19h00", "Carrossel (dor + identificacao)"),
  ("Terca-feira",   "12h30", "Stories - bastidor / pergunta"),
  ("Quarta-feira",  "19h00", "Carrossel (virada + metodo)"),
  ("Quinta-feira",  "20h00", "Reel (reforco do tema da semana)"),
  ("Sexta-feira",   "18h30", "Carrossel (CTA forte / Grupo VIP)"),
  ("Sabado",        "11h00", "Stories - prova social / comentarios"),
  ("Domingo",       "—",     "Descanso de postagem - so Stories leve"),
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
story.append(Spacer(1, 1*cm))
story.append(Paragraph("EMAGRECIMENTO BLINDADO", TIT))
story.append(Paragraph("Calendario de Postagem - 40 Carrosseis", SUB))
story.append(Paragraph("8 semanas | 5 carrosseis por semana | 3 posts + stories por semana", SUB2))
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=10))

# ── Horarios fixos da semana ──────────────────────────────────────────────
story.append(Paragraph("ROTINA SEMANAL FIXA (repita todas as 8 semanas)", DH))
data = [["Dia", "Horario", "O que postar"]]
for d, h, o in DIAS_HORARIOS:
    data.append([d, h, o])

t = Table(data, colWidths=[4.5*cm, 2.5*cm, 9*cm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), DARK),
    ('TEXTCOLOR', (0,0), (-1,0), GOLD),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TEXTCOLOR', (0,1), (-1,-1), CREAM),
    ('GRID', (0,0), (-1,-1), 0.5, GOLD),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [BLACK, DARK]),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('TOPPADDING', (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
]))
story.append(t)
story.append(Spacer(1, 0.3*cm))
story.append(Paragraph("Use sempre 3 carrosseis por semana (segunda, quarta, sexta) - os outros 2 temas da semana ficam de reserva para Reels ou para repostar em Stories.", NOTE))

# ── Distribuicao por semana ──────────────────────────────────────────────
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceBefore=14, spaceAfter=6))
story.append(Paragraph("DISTRIBUICAO DOS 40 CARROSSEIS EM 8 SEMANAS", DH))

idx = 0
for semana in range(1, 9):
    grupo = TEMAS[idx:idx+5]
    idx += 5
    story.append(Paragraph("SEMANA %d" % semana, WK))
    data = [["Dia", "Carrossel"]]
    dias_post = ["Segunda", "Quarta", "Sexta"]
    for i, tema in enumerate(grupo):
        if i < 3:
            dia = dias_post[i]
        elif i == 3:
            dia = "Reserva (Reel)"
        else:
            dia = "Reserva (Stories)"
        data.append([dia, tema])
    t = Table(data, colWidths=[4*cm, 12*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK),
        ('TEXTCOLOR', (0,0), (-1,0), GOLD),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('TEXTCOLOR', (0,1), (-1,-1), CREAM),
        ('GRID', (0,0), (-1,-1), 0.4, GOLD),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [BLACK, DARK]),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t)

# ── Dicas finais ──────────────────────────────────────────────────────────
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceBefore=16, spaceAfter=8))
story.append(Paragraph("REGRAS DE OURO", DH))
regras = [
    "Responda todos os comentarios BLINDADO na primeira hora apos publicar.",
    "Suba o carrossel nos Stories logo apos postar, com uma caixinha de pergunta relacionada ao tema.",
    "Use sempre os 5 temas da semana de forma conectada - eles contam uma jornada (dor, identificacao, virada, desejo, CTA).",
    "Nao pule semanas. Consistencia pesa mais que picos de postagem.",
    "Repita os carrosseis com melhor performance depois de 60-90 dias, com legenda nova.",
]
for r in regras:
    story.append(Paragraph("•  " + r, DT))

story.append(Spacer(1, 1*cm))
story.append(Paragraph("@emagrecimentoblindado  -  junho/2026  -  Calendario de 8 semanas", ROD))

doc.build(story, onFirstPage=bg, onLaterPages=bg)
print("PDF gerado:", OUT)
