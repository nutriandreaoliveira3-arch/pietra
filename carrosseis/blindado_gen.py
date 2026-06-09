"""
BLINDADO_GEN.PY — Gerador padrão de carrosséis Emagrecimento Blindado
Identidade visual travada. Usar em todos os novos carrosséis.
"""

from PIL import Image, ImageDraw, ImageFont
import os

FONTS = "/usr/share/fonts/truetype"

# ── FONTES ────────────────────────────────────────────────────────────────────
def _f(path, size):
    try: return ImageFont.truetype(path, size)
    except: return ImageFont.load_default()

F_TTL   =_f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",           128)
F_TTL_M = _f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",           104)
F_TTL_S = _f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",            88)
F_SUB   = _f(f"{FONTS}/liberation/LiberationSans-Regular.ttf",   41)
F_MICRO = _f(f"{FONTS}/liberation/LiberationSans-Regular.ttf",   21)
F_PILL  = _f(f"{FONTS}/dejavu/DejaVuSans-Bold.ttf",              46)

# ── PALETA OFICIAL ────────────────────────────────────────────────────────────
C = {
    "black":     (17,  17,  17),   # #111111
    "black2":    (28,  28,  28),   # #1C1C1C
    "gold":      (212, 166,  74),  # #D4A64A
    "gold_hi":   (224, 185,  91),  # #E0B95B
    "amber":     (198, 146,  46),  # #C6922E
    "cream":     (245, 232, 208),  # #F5E8D0
    "white":     (255, 252, 246),  # #FFFCF6
    "dim_gold":  (140, 108,  40),  # #8C6C28
}

# ── TEMAS ─────────────────────────────────────────────────────────────────────
THEMES = {
    "manha":    {"photo": [(8,6,2),  (22,14,4),  (52,32,8)],  "text_bot": (28,20,12)},
    "conteudo": {"photo": [(6,4,12), (18,10,32), (42,22,68)], "text_bot": (22,18,30)},
    "cta":      {"photo": [(8,2,4),  (24,6,12),  (60,14,28)], "text_bot": (24,10,16)},
}

W, H     = 1080, 1350
PHOTO_H  = 810
PAD_X    = 80

# ── HELPERS ───────────────────────────────────────────────────────────────────
def _lerp(c1, c2, t):
    return tuple(int(c1[i]+(c2[i]-c1[i])*t) for i in range(3))

def _grad(draw, x0,y0,x1,y1, top, bot):
    h = y1-y0
    for y in range(h):
        draw.line([(x0,y0+y),(x1,y0+y)], fill=_lerp(top,bot,y/max(h-1,1)))

def _tri_grad(draw, x0,y0,x1,y1, c1,c2,c3):
    h = y1-y0
    for y in range(h):
        t = y/max(h-1,1)
        c = _lerp(c1,c2,min(t*2,1)) if t<.5 else _lerp(c2,c3,min((t-.5)*2,1))
        draw.line([(x0,y0+y),(x1,y0+y)], fill=c)

def _pick_font(text):
    n = len(text.replace('\n',' '))
    if n <= 14: return F_TTL
    if n <= 26: return F_TTL_M
    return F_TTL_S

# ── DRAW CARD ─────────────────────────────────────────────────────────────────
def draw_card(tipo: str, card: dict, num: int, total: int = 10) -> Image.Image:
    """
    tipo: 'manha' | 'conteudo' | 'cta'
    card: {
        't': str (título, use \\n para quebras),
        's': str (subtítulo, use \\n para quebras),
        'cta': bool (opcional),
        'pill': bool (opcional — adiciona pill BLINDADO),
    }
    """
    th      = THEMES[tipo]
    is_pill = card.get("pill", False)

    img  = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)

    # ── PHOTO ZONE ──────────────────────────────────────────────────────────
    c1,c2,c3 = th["photo"]
    _tri_grad(draw, 0,0,W,PHOTO_H, c1,c2,c3)

    # Vinheta
    for i in range(260):
        f=(1-i/260)**2.8
        draw.line([(i,0),(i,PHOTO_H)], fill=_lerp(c1,(0,0,0),f))
    for i in range(170):
        f=(1-i/170)**2.2
        draw.line([(0,i),(W,i)], fill=_lerp(c1,(0,0,0),f))
    for i in range(100):
        f=(1-i/100)**1.8
        draw.line([(0,PHOTO_H-100+i),(W,PHOTO_H-100+i)], fill=_lerp(C["black"],c3,1-f))

    # Separador duplo
    draw.rectangle([0,PHOTO_H-3,W,PHOTO_H-1], fill=C["amber"])
    draw.rectangle([0,PHOTO_H,  W,PHOTO_H+4], fill=C["gold_hi"])

    # Cantos L duplo
    P,SZ = 40,100
    for pts,col,lw in [
        ([(P,P),(P+SZ,P)],      C["gold_hi"],3), ([(P,P),(P,P+SZ)],       C["gold_hi"],3),
        ([(P+7,P+7),(P+SZ-10,P+7)], C["amber"],2), ([(P+7,P+7),(P+7,P+SZ-10)], C["amber"],2),
        ([(W-P-SZ,PHOTO_H-P),(W-P,PHOTO_H-P)],  C["gold_hi"],3),
        ([(W-P,PHOTO_H-P-SZ),(W-P,PHOTO_H-P)],  C["gold_hi"],3),
        ([(W-P-SZ+10,PHOTO_H-P-7),(W-P-7,PHOTO_H-P-7)], C["amber"],2),
        ([(W-P-7,PHOTO_H-P-SZ+10),(W-P-7,PHOTO_H-P-7)], C["amber"],2),
    ]:
        draw.line(pts, fill=col, width=lw)

    # Watermark / index
    draw.text((P+2, PHOTO_H-52), "@emagrecimentoblindado", font=F_MICRO, fill=C["dim_gold"])
    idx = f"{'0'+str(num) if num<10 else num} / {total}"
    ib  = draw.textbbox((0,0), idx, font=F_MICRO)
    draw.text((W-ib[2]-P-2, 28), idx, font=F_MICRO, fill=C["dim_gold"])

    # ── TEXT ZONE ────────────────────────────────────────────────────────────
    _grad(draw, 0,PHOTO_H+4,W,H, C["black"], th["text_bot"])

    # Acento 5px
    draw.rectangle([PAD_X,PHOTO_H+50,PAD_X+100,PHOTO_H+55], fill=C["gold_hi"])

    # Título
    tf    = _pick_font(card["t"])
    lines = card["t"].split('\n')
    lh    = tf.size+16
    ty    = PHOTO_H+72
    for i, line in enumerate(lines):
        draw.text((PAD_X+2, ty+2+i*lh), line, font=tf, fill=(40,28,8))
        draw.text((PAD_X,   ty+i*lh),   line, font=tf, fill=C["white"])
    ty += len(lines)*lh + 20

    draw.line([(PAD_X,ty-4),(PAD_X+60,ty-4)], fill=C["amber"], width=2)

    # Subtítulo
    sub_lines = card["s"].split('\n')
    slh = F_SUB.size+14
    for i, sl in enumerate(sub_lines):
        draw.text((PAD_X, ty+6+i*slh), sl, font=F_SUB, fill=C["cream"])
    ty2 = ty+6+len(sub_lines)*slh+42

    # Pill BLINDADO
    if is_pill:
        pill = "BLINDADO"
        pb   = draw.textbbox((0,0), pill, font=F_PILL)
        pw,ph = pb[2]-pb[0]+56, pb[3]-pb[1]+24
        draw.rounded_rectangle([PAD_X,ty2,PAD_X+pw,ty2+ph], radius=3, fill=C["gold_hi"])
        draw.text((PAD_X+28, ty2+12), pill, font=F_PILL, fill=C["black"])
        ty2 += ph+16
        draw.text((PAD_X,ty2), "e entre para o Grupo VIP gratuito.", font=F_SUB, fill=C["cream"])
        ty2 += F_SUB.size+44

    draw.line([(PAD_X,ty2),(PAD_X+72,ty2)], fill=C["amber"], width=2)

    brand = "@emagrecimentoblindado"
    bb    = draw.textbbox((0,0), brand, font=F_MICRO)
    draw.text((W-bb[2]-48, H-44), brand, font=F_MICRO, fill=C["gold"])

    return img


# ── GERAR CARROSSEL COMPLETO ──────────────────────────────────────────────────
def gerar_carrossel(tipo: str, cards: list, out_dir: str, label: str = ""):
    """
    Gera 10 cards PNG + preview strip 2×5.

    tipo:    'manha' | 'conteudo' | 'cta'
    cards:   lista de dicts com 't', 's', e opcionalmente 'pill'
    out_dir: pasta de saída (criada automaticamente)
    label:   nome do carrossel para log
    """
    os.makedirs(out_dir, exist_ok=True)
    total = len(cards)
    print(f"\n📁 {out_dir}" + (f" · {label}" if label else ""))

    for i, card in enumerate(cards):
        num = i+1
        img = draw_card(tipo, card, num, total)
        path = os.path.join(out_dir, f"card_{num:02d}.png")
        img.save(path)
        print(f"  ✓ card_{num:02d}.png")

    # Preview strip 2 linhas × 5 colunas
    scale = 0.22
    sw, sh = int(W*scale), int(H*scale)
    gap = 8
    cols = 5
    rows = (total + cols - 1) // cols
    panel = Image.new("RGB", (sw*cols+gap*(cols+1), sh*rows+gap*(rows+1)), (11,11,11))
    for i in range(total):
        thumb = Image.open(os.path.join(out_dir, f"card_{i+1:02d}.png")).resize((sw,sh), Image.LANCZOS)
        row, col = divmod(i, cols)
        panel.paste(thumb, (gap+col*(sw+gap), gap+row*(sh+gap)))
    panel.save(os.path.join(out_dir, "PREVIEW.png"))
    print(f"  ✓ PREVIEW.png  ({total} cards)")
    return out_dir


# ── USO DIRETO (exemplo) ──────────────────────────────────────────────────────
if __name__ == "__main__":
    cards_exemplo = [
        {"t":"EXEMPLO\nDE CAPA.",  "s":"Subtitle line 1\nsubtitle line 2."},
        {"t":"Card 2",             "s":"Desenvolvimento\ndo tema."},
        {"t":"Card 3",             "s":"Mais conteúdo\nemocional."},
        {"t":"Card 4",             "s":"Quebra\nde crença."},
        {"t":"Card 5",             "s":"Orientação\nprática."},
        {"t":"Card 6",             "s":"Continuação\nda jornada."},
        {"t":"Card 7",             "s":"Validação\nda experiência."},
        {"t":"Card 8",             "s":"Início da\nmudança."},
        {"t":"Card 9",             "s":"Virada.\nExiste solução."},
        {"t":"Quer saber\ncomo?",  "s":"Comente BLINDADO.", "cta":True,"pill":True},
    ]
    gerar_carrossel("conteudo", cards_exemplo, "/tmp/carrossel_exemplo", "Exemplo")
    print("\n✅ Pronto.")
