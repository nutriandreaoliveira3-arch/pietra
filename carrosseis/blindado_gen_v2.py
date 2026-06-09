"""
BLINDADO_GEN_V2.PY — Gerador oficial aprovado
Visual: fundo levemente claro, dourado elegante, textos legíveis no mobile.
Logo: apenas @emagrecimentoblindado — discreto no rodapé, nunca sobre rosto.
"""

from PIL import Image, ImageDraw, ImageFont
import os

FONTS = "/usr/share/fonts/truetype"

def _f(path, size):
    try: return ImageFont.truetype(path, size)
    except: return ImageFont.load_default()

# ── FONTES ────────────────────────────────────────────────────────────────────
F_TTL   = _f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",    128)
F_TTL_M = _f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",    104)
F_TTL_S = _f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",     88)
F_SUB   = _f(f"{FONTS}/liberation/LiberationSans-Regular.ttf", 46)  # maior para mobile
F_MICRO = _f(f"{FONTS}/liberation/LiberationSans-Regular.ttf", 22)
F_BRAND = _f(f"{FONTS}/liberation/LiberationSans-Regular.ttf", 26)  # brand cards 1/10
F_PILL  = _f(f"{FONTS}/dejavu/DejaVuSans-Bold.ttf",      48)

# ── PALETA APROVADA ──────────────────────────────────────────────────────────
C = {
    "black":         ( 24,  24,  24),  # fundo principal — levemente claro
    "black2":        ( 36,  36,  36),  # fundo secundário
    "gold":          (220, 174,  78),  # dourado principal
    "gold_hi":       (236, 196,  96),  # dourado destaque
    "amber":         (208, 156,  52),  # âmbar elegante
    "white":         (255, 255, 255),  # títulos — branco puro
    "cream":         (250, 240, 220),  # subtítulos — off-white
    "dim_gold":      (168, 130,  52),  # watermark discreto
    "title_shadow":  ( 60,  42,  12),  # sombra título
}

# ── TEMAS ─────────────────────────────────────────────────────────────────────
THEMES = {
    "manha":    {"photo": [(14,10,4),  (32,20,6),  (68,42,10)], "text_bot": (38,28,16)},
    "conteudo": {"photo": [(10,8,18),  (26,14,42), (54,28,82)], "text_bot": (30,24,40)},
    "cta":      {"photo": [(14,6,8),   (34,10,18), (76,18,36)], "text_bot": (34,14,22)},
}

W, H    = 1080, 1350
PHOTO_H = 810
PAD_X   = 88   # margem horizontal segura
PAD_BOT = 52   # margem inferior segura

# ── HELPERS ───────────────────────────────────────────────────────────────────
def _lerp(c1, c2, t):
    return tuple(int(c1[i] + (c2[i]-c1[i])*t) for i in range(3))

def _grad(draw, x0, y0, x1, y1, top, bot):
    h = y1 - y0
    for y in range(h):
        draw.line([(x0, y0+y), (x1, y0+y)], fill=_lerp(top, bot, y/max(h-1,1)))

def _tri_grad(draw, x0, y0, x1, y1, c1, c2, c3):
    h = y1 - y0
    for y in range(h):
        t = y / max(h-1, 1)
        c = _lerp(c1,c2,min(t*2,1)) if t < .5 else _lerp(c2,c3,min((t-.5)*2,1))
        draw.line([(x0, y0+y), (x1, y0+y)], fill=c)

def _pick_font(text):
    n = len(text.replace('\n', ' '))
    if n <= 14: return F_TTL
    if n <= 26: return F_TTL_M
    return F_TTL_S


# ── DRAW CARD ─────────────────────────────────────────────────────────────────
def draw_card(tipo: str, card: dict, num: int, total: int = 10) -> Image.Image:
    """
    tipo:  'manha' | 'conteudo' | 'cta'
    card:  { 't', 's', 'pill': bool }
    num:   posição 1–total
    """
    th      = THEMES[tipo]
    is_pill = card.get("pill", False)
    is_first = (num == 1)
    is_last  = (num == total)

    img  = Image.new("RGB", (W, H), C["black"])
    draw = ImageDraw.Draw(img)

    # ══ ZONA DA FOTO ══════════════════════════════════════════════════════════
    c1, c2, c3 = th["photo"]
    _tri_grad(draw, 0, 0, W, PHOTO_H, c1, c2, c3)

    # Vinheta suave — não encobre rosto (intensidade reduzida)
    for i in range(240):
        f = (1 - i/240) ** 1.8
        draw.line([(i,0),(i,PHOTO_H)], fill=_lerp(c1,(0,0,0),f))
    for i in range(150):
        f = (1 - i/150) ** 1.4
        draw.line([(0,i),(W,i)], fill=_lerp(c1,(0,0,0),f))
    for i in range(90):
        f = (1 - i/90) ** 1.2
        draw.line([(0,PHOTO_H-90+i),(W,PHOTO_H-90+i)], fill=_lerp(C["black"],c3,1-f))

    # Separador duplo
    draw.rectangle([0, PHOTO_H-4, W, PHOTO_H-1], fill=C["amber"])
    draw.rectangle([0, PHOTO_H,   W, PHOTO_H+6], fill=C["gold_hi"])

    # Cantos L duplo (decoração de borda — longe do rosto)
    P, SZ = 44, 108
    for pts, col, lw in [
        ([(P,P),(P+SZ,P)],           C["gold_hi"], 4),
        ([(P,P),(P,P+SZ)],           C["gold_hi"], 4),
        ([(P+8,P+8),(P+SZ-10,P+8)], C["amber"],   2),
        ([(P+8,P+8),(P+8,P+SZ-10)], C["amber"],   2),
        ([(W-P-SZ,PHOTO_H-P),(W-P,PHOTO_H-P)],          C["gold_hi"], 4),
        ([(W-P,PHOTO_H-P-SZ),(W-P,PHOTO_H-P)],          C["gold_hi"], 4),
        ([(W-P-SZ+10,PHOTO_H-P-8),(W-P-8,PHOTO_H-P-8)], C["amber"],   2),
        ([(W-P-8,PHOTO_H-P-SZ+10),(W-P-8,PHOTO_H-P-8)], C["amber"],   2),
    ]:
        draw.line(pts, fill=col, width=lw)

    # ── LOGO / MARCA NA FOTO ─────────────────────────────────────────────────
    # REGRA: logo apenas no RODAPÉ da zona da foto (y próximo a PHOTO_H)
    # Nunca perto do topo ou centro onde fica o rosto/cabeça.
    # Cards 1 e 10: brand ligeiramente maior (destaque de abertura/fechamento)
    brand_font = F_BRAND if (is_first or is_last) else F_MICRO
    brand_col  = C["gold_hi"] if (is_first or is_last) else C["dim_gold"]
    brand_y    = PHOTO_H - 56   # rodapé da zona da foto — seguro

    draw.text((P + 2, brand_y), "@emagrecimentoblindado", font=brand_font, fill=brand_col)

    # Numeração — canto superior direito da foto (pequena e discreta)
    idx = f"{'0'+str(num) if num<10 else num} / {total}"
    ib  = draw.textbbox((0,0), idx, font=F_MICRO)
    draw.text((W - ib[2] - P - 2, 32), idx, font=F_MICRO, fill=C["dim_gold"])

    # ══ ZONA DE TEXTO ═════════════════════════════════════════════════════════
    _grad(draw, 0, PHOTO_H+6, W, H, C["black"], th["text_bot"])

    # Acento dourado — elegante, não compete com o texto
    draw.rectangle([PAD_X, PHOTO_H+56, PAD_X+110, PHOTO_H+62], fill=C["gold_hi"])  # 110×6px

    # Título — margens seguras, não encosta na borda
    tf    = _pick_font(card["t"])
    lines = card["t"].split('\n')
    lh    = tf.size + 18
    ty    = PHOTO_H + 82   # respiro adequado do separador

    for i, line in enumerate(lines):
        draw.text((PAD_X+3, ty+3+i*lh), line, font=tf, fill=C["title_shadow"])
        draw.text((PAD_X,   ty+i*lh),   line, font=tf, fill=C["white"])
    ty += len(lines)*lh + 22

    # Linha separadora título/subtítulo — suave (não compete com texto)
    draw.line([(PAD_X, ty-4),(PAD_X+64, ty-4)], fill=C["amber"], width=2)

    # Subtítulo — legível no mobile (46px)
    sub_lines = card["s"].split('\n')
    slh = F_SUB.size + 16
    for i, sl in enumerate(sub_lines):
        draw.text((PAD_X, ty+12+i*slh), sl, font=F_SUB, fill=C["cream"])
    ty2 = ty + 12 + len(sub_lines)*slh + 44

    # Pill BLINDADO (card CTA)
    if is_pill:
        pill = "BLINDADO"
        pb   = draw.textbbox((0,0), pill, font=F_PILL)
        pw, ph = pb[2]-pb[0]+64, pb[3]-pb[1]+28
        draw.rounded_rectangle([PAD_X, ty2, PAD_X+pw, ty2+ph], radius=4, fill=C["gold_hi"])
        draw.text((PAD_X+32, ty2+14), pill, font=F_PILL, fill=(18,14,4))
        ty2 += ph + 18
        draw.text((PAD_X, ty2), "e entre para o Grupo VIP gratuito.", font=F_SUB, fill=C["cream"])
        ty2 += F_SUB.size + 44

    # Linha final decorativa
    draw.line([(PAD_X, ty2),(PAD_X+80, ty2)], fill=C["amber"], width=2)

    # Brand rodapé texto — canto inferior direito, margem segura
    brand_txt = "@emagrecimentoblindado"
    bb        = draw.textbbox((0,0), brand_txt, font=F_MICRO)
    draw.text((W - bb[2] - PAD_X, H - PAD_BOT), brand_txt, font=F_MICRO, fill=C["gold_hi"])

    return img


# ── GERAR CARROSSEL ───────────────────────────────────────────────────────────
def gerar_carrossel(tipo: str, cards: list, out_dir: str, label: str = ""):
    """
    Gera PNGs + PREVIEW.png em out_dir.
    tipo:    'manha' | 'conteudo' | 'cta'
    cards:   lista de dicts {'t','s','pill'}
    out_dir: pasta de saída
    """
    os.makedirs(out_dir, exist_ok=True)
    total = len(cards)
    print(f"\n📁 {out_dir}" + (f"  ·  {label}" if label else ""))

    for i, card in enumerate(cards):
        num  = i + 1
        img  = draw_card(tipo, card, num, total)
        path = os.path.join(out_dir, f"card_{num:02d}.png")
        img.save(path)
        print(f"  ✓ card_{num:02d}.png")

    # Preview strip 2×5
    scale = 0.22
    sw, sh = int(W*scale), int(H*scale)
    gap    = 10
    cols, rows = 5, (total + 4) // 5
    panel  = Image.new("RGB", (sw*cols + gap*(cols+1), sh*rows + gap*(rows+1)), (18,18,18))
    for i in range(total):
        thumb = Image.open(os.path.join(out_dir, f"card_{i+1:02d}.png")).resize((sw,sh), Image.LANCZOS)
        r, c  = divmod(i, cols)
        panel.paste(thumb, (gap + c*(sw+gap), gap + r*(sh+gap)))
    panel.save(os.path.join(out_dir, "PREVIEW.png"))
    print(f"  ✓ PREVIEW.png  ({total} cards)")
    return out_dir


# ── TESTE DIRETO ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    cards = [
        {"t":"VOCÊ FAZ\nTUDO CERTO.", "s":"E mesmo assim,\na balança não move."},
        {"t":"Você acorda\ncedo.", "s":"Come menos do que todo mundo.\nE seu corpo parece ignorar."},
        {"t":"Segue a dieta.", "s":"Corta o pão. Corta o doce.\nCorta tudo. E nada muda."},
        {"t":"Faz exercício.", "s":"Se esforça mais do que amigas\nque emagrecem sem fazer metade."},
        {"t":"E mesmo assim.", "s":"O peso não sai. As roupas apertando.\nA frustração cresce."},
        {"t":"A culpa não\né sua.", "s":"Depois dos 35, o corpo muda.\nOs hormônios mudam as regras."},
        {"t":"O que funcionava\nantes...", "s":"...pode ser exatamente o que\nsabota você hoje."},
        {"t":"Não é força\nde vontade.", "s":"É estratégia. Seu corpo precisa de\numa abordagem diferente agora."},
        {"t":"Existe\numa saída.", "s":"E ela começa entendendo o que realmente\nestá acontecendo dentro de você."},
        {"t":"Quer entender\no método?", "s":"Comente BLINDADO.", "pill": True},
    ]
    out = "/home/user/pietra/carrosseis/exports_png/carrossel_v2_preview"
    gerar_carrossel("conteudo", cards, out, "Você faz tudo certo — V2 Final")
    print("\n✅ Preview gerado.")
