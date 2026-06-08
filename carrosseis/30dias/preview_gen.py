"""
Gera previews PNG dos carrosséis — layout 1080×1350, 60% foto / 40% texto
Produz: preview_carrossel_XX.png  (strip horizontal dos 10 cards em escala)
"""

from PIL import Image, ImageDraw, ImageFont
import os, textwrap, math

OUT  = "/home/user/pietra/carrosseis/30dias/previews"
os.makedirs(OUT, exist_ok=True)

W, H       = 1080, 1350
PHOTO_H    = 810   # 60%
TEXT_H     = 540   # 40%
SCALE      = 0.25  # preview display scale

# ── FONTS ────────────────────────────────────────────────────────────────────
FONTS = "/usr/share/fonts/truetype"
def font(path, size):
    try: return ImageFont.truetype(path, size)
    except: return ImageFont.load_default()

F_TITLE  = font(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",     88)
F_TITLE_SM = font(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",   72)
F_SUB    = font(f"{FONTS}/liberation/LiberationSans-Regular.ttf", 34)
F_SMALL  = font(f"{FONTS}/liberation/LiberationSans-Regular.ttf", 22)
F_PILL   = font(f"{FONTS}/dejavu/DejaVuSans-Bold.ttf",       40)
F_LABEL  = font(f"{FONTS}/liberation/LiberationSans-Regular.ttf", 22)

# ── COLOUR THEMES ────────────────────────────────────────────────────────────
THEMES = {
    "manha": {
        "photo_grad": [(0,   (61,26,0)),  (1,   (180,80,48))],
        "photo_capa": [(0,   (92,32,0)),  (1,   (212,112,80))],
        "text_bg":    (30, 10, 4),
        "text_bg2":   (42, 16, 10),
        "titulo":     (255, 232, 216),
        "sub":        (212, 168, 138),
        "line":       (212, 113, 74),
        "brand":      (212, 113, 74),
    },
    "conteudo": {
        "photo_grad": [(0,  (14, 8,24)),  (1,  (58,24,85))],
        "photo_capa": [(0,  (14, 4,32)),  (1,  (74,24,112))],
        "text_bg":    (10, 6, 20),
        "text_bg2":   (18, 10, 30),
        "titulo":     (232, 216, 255),
        "sub":        (168, 144, 200),
        "line":       (152, 112, 200),
        "brand":      (152, 112, 200),
    },
    "cta": {
        "photo_grad": [(0,  (26, 4,14)),  (1,  (139,32,64))],
        "photo_capa": [(0,  (37, 0,16)),  (1,  (170,32,64))],
        "text_bg":    (18, 0, 8),
        "text_bg2":   (30, 4, 18),
        "titulo":     (242, 196, 206),
        "sub":        (208, 160, 176),
        "line":       (201, 86, 107),
        "brand":      (201, 86, 107),
        "cta_bg":     (90, 14, 32),
        "cta_bg2":    (139, 21, 53),
    },
}

def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i]-c1[i])*t) for i in range(3))

def gradient_rect(draw, x0, y0, x1, y1, c_top, c_bot):
    """Vertical gradient fill."""
    h = y1 - y0
    for y in range(h):
        t = y / max(h-1, 1)
        c = lerp_color(c_top, c_bot, t)
        draw.line([(x0, y0+y), (x1, y0+y)], fill=c)

def wrap_text(text, font, max_w, draw):
    """Word-wrap text to fit max_w pixels."""
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        bb = draw.textbbox((0,0), test, font=font)
        if bb[2] > max_w and cur:
            lines.append(cur)
            cur = w
        else:
            cur = test
    if cur: lines.append(cur)
    return lines

def draw_multiline(draw, lines, font, x, y, fill, line_h=None):
    lh = line_h or (font.size + 12)
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        y += lh
    return y

def build_card(tipo, card_data, card_num, is_capa, is_cta_final):
    img  = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    th   = THEMES[tipo]

    # ── PHOTO ZONE ────────────────────────────────────────
    grad_stops = th["photo_capa"] if is_capa else th["photo_grad"]
    c_top = grad_stops[0][1]
    c_bot = grad_stops[-1][1]
    gradient_rect(draw, 0, 0, W, PHOTO_H, c_top, c_bot)

    # placeholder label
    ph_text = "[ Espaço para foto ]"
    bb = draw.textbbox((0,0), ph_text, font=F_LABEL)
    pw, ph_ = bb[2]-bb[0], bb[3]-bb[1]
    draw.text(((W-pw)//2, (PHOTO_H-ph_)//2), ph_text, font=F_LABEL,
              fill=(255,255,255,40))

    # watermark bottom-left
    draw.text((40, PHOTO_H-46), "@emagrecimentoblindado",
              font=F_SMALL, fill=(255,255,255,90))
    # card index top-right
    idx = f"{'0'+str(card_num) if card_num<10 else card_num} / 10"
    bb2 = draw.textbbox((0,0), idx, font=F_SMALL)
    draw.text((W - bb2[2] - 40, 28), idx, font=F_SMALL, fill=(255,255,255,90))

    # ── TEXT ZONE ─────────────────────────────────────────
    text_bg = th.get("cta_bg", th["text_bg"]) if is_cta_final and tipo=="cta" else th["text_bg"]
    text_bg2 = th.get("cta_bg2", th["text_bg2"]) if is_cta_final and tipo=="cta" else th["text_bg2"]
    gradient_rect(draw, 0, PHOTO_H, W, H, text_bg, text_bg2)

    PAD_X = 80
    cur_y = PHOTO_H + 44

    # accent line
    draw.rectangle([PAD_X, cur_y, PAD_X+70, cur_y+4], fill=th["line"])
    cur_y += 28

    # title
    titulo = card_data["titulo"]
    title_font = F_TITLE_SM if len(titulo) > 22 else F_TITLE
    title_lines = wrap_text(titulo, title_font, W - PAD_X*2, draw)
    lh_title = title_font.size + 14
    cur_y = draw_multiline(draw, title_lines, title_font, PAD_X, cur_y, th["titulo"], lh_title)
    cur_y += 12

    # pill (CTA card)
    if card_data.get("pill"):
        pill_text = "BLINDADO"
        pb = draw.textbbox((0,0), pill_text, font=F_PILL)
        pw2, ph2 = pb[2]-pb[0]+48, pb[3]-pb[1]+24
        draw.rounded_rectangle([PAD_X, cur_y, PAD_X+pw2, cur_y+ph2], radius=4,
                                fill=(212,169,106))
        draw.text((PAD_X+24, cur_y+12), pill_text, font=F_PILL, fill=(26,13,18))
        cur_y += ph2 + 16
        sub_txt = "e entre para o Grupo VIP gratuito."
    else:
        sub_txt = card_data["subtitulo"]

    # subtitle
    sub_lines = wrap_text(sub_txt, F_SUB, W - PAD_X*2, draw)
    draw_multiline(draw, sub_lines, F_SUB, PAD_X, cur_y, th["sub"], F_SUB.size+10)

    # brand bottom-right
    brand = "@emagrecimentoblindado"
    bb3 = draw.textbbox((0,0), brand, font=F_SMALL)
    draw.text((W - bb3[2] - 44, H - 44), brand, font=F_SMALL, fill=th["brand"])

    return img


def make_strip(carrossel_data):
    """Returns a horizontal strip of all 10 cards at SCALE."""
    sw = int(W * SCALE)
    sh = int(H * SCALE)
    strip = Image.new("RGB", (sw * 10 + 11, sh + 2), (18, 8, 14))

    tipo  = carrossel_data["tipo"]
    cards = carrossel_data["cards"]

    for i, card in enumerate(cards):
        num      = i + 1
        is_capa  = num == 1
        is_final = num == 10
        full = build_card(tipo, card, num, is_capa, is_final)
        thumb = full.resize((sw, sh), Image.LANCZOS)
        strip.paste(thumb, (i * (sw+1) + 1, 1))

    return strip


# ── GENERATE ALL 30 ──────────────────────────────────────────────────────────
# Quick inline data (mirrors data.js structure)
CARROSSEIS = [
  {"id":"01","tipo":"manha","nome":"Levanta, você ainda não terminou sua história","cards":[
    {"titulo":"LEVANTA.","subtitulo":"Você ainda não terminou sua história."},
    {"titulo":"Todo dia você acorda","subtitulo":"carregando o peso de quem tentou e não viu resultado."},
    {"titulo":"Mas você ainda está aqui.","subtitulo":"Isso já diz muito sobre quem você é."},
    {"titulo":"Perfeição não existe.","subtitulo":"O que existe é a decisão de continuar, mesmo imperfeita."},
    {"titulo":"Não espere se sentir pronta.","subtitulo":"Comece do jeito que você está agora."},
    {"titulo":"Cada pequeno passo conta.","subtitulo":"Mesmo os que parecem insignificantes."},
    {"titulo":"Você não precisa voltar ao passado.","subtitulo":"Você precisa se tornar quem ainda vai ser."},
    {"titulo":"Cair faz parte.","subtitulo":"O que define você é quantas vezes se levantou."},
    {"titulo":"A virada não precisa ser grande.","subtitulo":"Ela precisa ser real. E começa agora."},
    {"titulo":"💾 Salva esse post.","subtitulo":"Lê sempre que precisar de força.","cta":True},
  ]},
  {"id":"02","tipo":"manha","nome":"Hoje você não precisa ser perfeita","cards":[
    {"titulo":"HOJE","subtitulo":"Você não precisa ser perfeita. Só precisa continuar."},
    {"titulo":"A perfeição é uma armadilha.","subtitulo":"Ela te paralisa quando você mais precisa agir."},
    {"titulo":"Comeu errado ontem?","subtitulo":"Não importa. Hoje é um dia novo."},
    {"titulo":"Passou uma semana sem fazer nada?","subtitulo":"Tudo bem. Você está recomeçando agora."},
    {"titulo":"Progresso não é linha reta.","subtitulo":"É uma curva com altos, baixos e recomeços."},
    {"titulo":"A mulher que chega","subtitulo":"é a que não desiste, não a que nunca tropeça."},
    {"titulo":"Imperfeita e em movimento","subtitulo":"vale mais do que perfeita e parada."},
    {"titulo":"Não espere o momento certo.","subtitulo":"Crie o momento certo com o que você tem."},
    {"titulo":"Continuar, mesmo com vontade de parar,","subtitulo":"é o maior ato de força que existe."},
    {"titulo":"💾 Salva pra lembrar.","subtitulo":"Você vai precisar ler isso de novo.","cta":True},
  ]},
  {"id":"11","tipo":"conteudo","nome":"Por que você não emagrece como aos 20 anos","cards":[
    {"titulo":"POR QUE VOCÊ NÃO EMAGRECE","subtitulo":"como emagrecia aos 20 anos?"},
    {"titulo":"Não é preguiça.","subtitulo":"Não é falta de esforço. É biologia."},
    {"titulo":"Depois dos 35,","subtitulo":"os hormônios mudam. O metabolismo muda. O corpo muda."},
    {"titulo":"Estrogênio caindo","subtitulo":"afeta diretamente onde e como o corpo guarda gordura."},
    {"titulo":"Cortisol elevado","subtitulo":"por estresse e privação de sono retém gordura abdominal."},
    {"titulo":"O que funcionava antes","subtitulo":"pode ser exatamente o que sabota você hoje."},
    {"titulo":"Comer menos e se exercitar mais","subtitulo":"pode piorar tudo quando os hormônios estão fora do ponto."},
    {"titulo":"Seu corpo precisa de estratégia,","subtitulo":"não de punição."},
    {"titulo":"A solução não é a mesma de antes.","subtitulo":"Porque você não é a mesma de antes."},
    {"titulo":"Quer entender a estratégia certa?","subtitulo":"Comente BLINDADO","cta":True,"pill":True},
  ]},
  {"id":"21","tipo":"cta","nome":"Cansada de recomeçar toda segunda-feira?","cards":[
    {"titulo":"CANSADA DE RECOMEÇAR","subtitulo":"toda segunda-feira?"},
    {"titulo":"Já foram meses assim.","subtitulo":"Talvez anos."},
    {"titulo":"Começa animada.","subtitulo":"Dura semanas. Para. Recomeça."},
    {"titulo":"E a frustração acumula","subtitulo":"a cada ciclo que se repete."},
    {"titulo":"Você não é fraca.","subtitulo":"Você está usando um método que não foi feito para o seu corpo."},
    {"titulo":"Existe uma forma diferente.","subtitulo":"Sem dieta maluca. Sem passar fome. Sem segunda-feira."},
    {"titulo":"Mulheres que encontraram esse caminho","subtitulo":"pararam de contar os dias para poder comer."},
    {"titulo":"Isso é possível.","subtitulo":"E está mais perto do que você imagina."},
    {"titulo":"Você não precisa fazer isso sozinha.","subtitulo":"Existe um grupo esperando por você."},
    {"titulo":"Comente BLINDADO","subtitulo":"e entre para o Grupo VIP gratuito agora.","cta":True,"pill":True},
  ]},
]

# Build previews for 4 representative carousels
selected = CARROSSEIS   # use the 4 we defined inline

paths = []
for c in selected:
    strip = make_strip(c)
    path = f"{OUT}/preview_carrossel_{c['id']}_{c['tipo']}.png"
    strip.save(path)
    paths.append(path)
    print(f"✓ {path}  ({strip.width}×{strip.height})")

# Also generate a full-res sample of card 1 from carrossel 01
full = build_card("manha", CARROSSEIS[0]["cards"][0], 1, True, False)
full.save(f"{OUT}/sample_card_fullres.png")
print(f"✓ Full-res sample saved")
