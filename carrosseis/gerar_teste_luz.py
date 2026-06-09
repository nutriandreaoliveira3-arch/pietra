"""
Gera carrossel de teste com identidade visual ajustada:
- Fundo levemente mais claro (menos pesado)
- Dourado mais presente e espesso
- Vinheta reduzida (foto mais iluminada)
- Título branco puro com sombra mais forte
- Subtítulo em branco suave (off-white)
- Mais respiro na zona de texto
- Separador dourado mais espesso
"""

from PIL import Image, ImageDraw, ImageFont
import os, sys
sys.path.insert(0, os.path.dirname(__file__))

FONTS = "/usr/share/fonts/truetype"
OUT   = "/home/user/pietra/carrosseis/exports_png/carrossel_teste_luz"

def _f(path, size):
    try: return ImageFont.truetype(path, size)
    except: return ImageFont.load_default()

F_TTL   = _f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",   128)
F_TTL_M = _f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",   104)
F_TTL_S = _f(f"{FONTS}/dejavu/DejaVuSerif-Bold.ttf",    88)
F_SUB   = _f(f"{FONTS}/liberation/LiberationSans-Regular.ttf", 43)  # +2px
F_MICRO = _f(f"{FONTS}/liberation/LiberationSans-Regular.ttf", 22)
F_PILL  = _f(f"{FONTS}/dejavu/DejaVuSans-Bold.ttf",     48)

# ── PALETA — mesma identidade, ajustes de luminosidade ───────────────────────
C = {
    # Fundos: levemente mais claros para não pesar
    "black":    (24,  24,  24),   # era (17,17,17) → +7 de brilho
    "black2":   (36,  36,  36),   # era (28,28,28) → +8

    # Dourado: mais presente e saturado
    "gold":     (220, 174,  78),  # era (212,166,74)  → +8R +8G
    "gold_hi":  (236, 196,  96),  # era (224,185,91)  → +12R +11G
    "amber":    (208, 156,  52),  # era (198,146,46)  → +10R +10G

    # Texto: mais luminoso
    "white":    (255, 255, 255),  # branco puro (era #FFFCF6)
    "cream":    (250, 240, 220),  # off-white mais visível (era #F5E8D0)
    "dim_gold": (168, 130,  52),  # watermark mais visível (era 140,108,40)

    # Sombra do título (mais quente, não tão escura)
    "title_shadow": (60, 42, 12),
}

# Temas — gradientes levemente mais iluminados na zona da foto
THEMES = {
    "manha":    {
        "photo": [(14,10,4), (32,20,6), (68,42,10)],   # era (8,6,2)→(52,32,8), +6 brilho
        "text_bot": (38, 28, 16),                        # era (28,20,12)
    },
    "conteudo": {
        "photo": [(10,8,18), (26,14,42), (54,28,82)],  # era (6,4,12)→(42,22,68), +8 brilho
        "text_bot": (30, 24, 40),                        # era (22,18,30)
    },
    "cta":      {
        "photo": [(14,6,8), (34,10,18), (76,18,36)],   # era (8,2,4)→(60,14,28), +8 brilho
        "text_bot": (34, 14, 22),                        # era (24,10,16)
    },
}

W, H    = 1080, 1350
PHOTO_H = 810
PAD_X   = 88   # era 80 → +8px de respiro

def _lerp(c1, c2, t):
    return tuple(int(c1[i] + (c2[i]-c1[i])*t) for i in range(3))

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

def draw_card(tipo, card, num, total=10):
    th      = THEMES[tipo]
    is_pill = card.get("pill", False)

    img  = Image.new("RGB", (W, H), C["black"])
    draw = ImageDraw.Draw(img)

    # ── ZONA DA FOTO ─────────────────────────────────────────────────────────
    c1,c2,c3 = th["photo"]
    _tri_grad(draw, 0,0,W,PHOTO_H, c1,c2,c3)

    # Vinheta — reduzida (era 2.8/2.2/1.8 → agora 1.8/1.4/1.2)
    for i in range(240):
        f = (1-i/240)**1.8    # era **2.8 — muito menos agressiva
        draw.line([(i,0),(i,PHOTO_H)], fill=_lerp(c1,(0,0,0),f))
    for i in range(150):
        f = (1-i/150)**1.4    # era **2.2
        draw.line([(0,i),(W,i)], fill=_lerp(c1,(0,0,0),f))
    for i in range(90):
        f = (1-i/90)**1.2     # era **1.8
        draw.line([(0,PHOTO_H-90+i),(W,PHOTO_H-90+i)], fill=_lerp(C["black"],c3,1-f))

    # Separador duplo — mais espesso e brilhante
    draw.rectangle([0, PHOTO_H-4, W, PHOTO_H-1], fill=C["amber"])    # era 3px → 4px
    draw.rectangle([0, PHOTO_H,   W, PHOTO_H+6], fill=C["gold_hi"])  # era 4px → 6px

    # Cantos L duplo — linhas mais espessas
    P, SZ = 44, 108   # era 40,100 → levemente maiores
    for pts, col, lw in [
        ([(P,P),(P+SZ,P)],          C["gold_hi"], 4),  # era 3
        ([(P,P),(P,P+SZ)],          C["gold_hi"], 4),
        ([(P+8,P+8),(P+SZ-10,P+8)],C["amber"],   2),
        ([(P+8,P+8),(P+8,P+SZ-10)],C["amber"],   2),
        ([(W-P-SZ,PHOTO_H-P),(W-P,PHOTO_H-P)],   C["gold_hi"], 4),
        ([(W-P,PHOTO_H-P-SZ),(W-P,PHOTO_H-P)],   C["gold_hi"], 4),
        ([(W-P-SZ+10,PHOTO_H-P-8),(W-P-8,PHOTO_H-P-8)], C["amber"], 2),
        ([(W-P-8,PHOTO_H-P-SZ+10),(W-P-8,PHOTO_H-P-8)], C["amber"], 2),
    ]:
        draw.line(pts, fill=col, width=lw)

    # Watermark / index — mais visíveis
    draw.text((P+2, PHOTO_H-56), "@emagrecimentoblindado", font=F_MICRO, fill=C["dim_gold"])
    idx = f"{'0'+str(num) if num<10 else num} / {total}"
    ib  = draw.textbbox((0,0), idx, font=F_MICRO)
    draw.text((W-ib[2]-P-2, 30), idx, font=F_MICRO, fill=C["dim_gold"])

    # ── ZONA DE TEXTO ─────────────────────────────────────────────────────────
    _grad(draw, 0, PHOTO_H+6, W, H, C["black"], th["text_bot"])

    # Acento dourado — mais largo e espesso
    draw.rectangle([PAD_X, PHOTO_H+54, PAD_X+120, PHOTO_H+61], fill=C["gold_hi"])  # era 100×5 → 120×7

    # Respiro extra antes do título
    ty = PHOTO_H + 80   # era +72

    # Título — branco puro, sombra mais quente e visível
    tf    = _pick_font(card["t"])
    lines = card["t"].split('\n')
    lh    = tf.size + 18   # era +16
    for i, line in enumerate(lines):
        # Sombra: deslocamento maior (3px) e cor mais quente
        draw.text((PAD_X+3, ty+3+i*lh), line, font=tf, fill=C["title_shadow"])
        draw.text((PAD_X,   ty+i*lh),   line, font=tf, fill=C["white"])
    ty += len(lines)*lh + 24   # era +20

    # Linha separadora — mais dourada
    draw.line([(PAD_X, ty-4),(PAD_X+72, ty-4)], fill=C["gold_hi"], width=3)  # era amber 2px → gold_hi 3px

    # Subtítulo — off-white mais legível
    sub_lines = card["s"].split('\n')
    slh = F_SUB.size + 16   # era +14
    for i, sl in enumerate(sub_lines):
        draw.text((PAD_X, ty+10+i*slh), sl, font=F_SUB, fill=C["cream"])
    ty2 = ty + 10 + len(sub_lines)*slh + 48   # era +42

    # Pill BLINDADO — mais largo e dourado
    if is_pill:
        pill = "BLINDADO"
        pb   = draw.textbbox((0,0), pill, font=F_PILL)
        pw, ph = pb[2]-pb[0]+64, pb[3]-pb[1]+28   # era +56/+24
        draw.rounded_rectangle([PAD_X, ty2, PAD_X+pw, ty2+ph], radius=4, fill=C["gold_hi"])
        draw.text((PAD_X+32, ty2+14), pill, font=F_PILL, fill=(18,14,4))  # texto quase preto
        ty2 += ph + 18
        draw.text((PAD_X, ty2), "e entre para o Grupo VIP gratuito.", font=F_SUB, fill=C["cream"])
        ty2 += F_SUB.size + 48

    # Linha final
    draw.line([(PAD_X, ty2),(PAD_X+80, ty2)], fill=C["amber"], width=2)

    # Brand bottom-right
    brand = "@emagrecimentoblindado"
    bb    = draw.textbbox((0,0), brand, font=F_MICRO)
    draw.text((W-bb[2]-52, H-48), brand, font=F_MICRO, fill=C["gold_hi"])  # mais brilhante

    return img


# ── CARROSSEL DE TESTE ────────────────────────────────────────────────────────
CARDS_TESTE = [
    {"t": "VOCÊ FAZ\nTUDO CERTO.", "s": "E mesmo assim,\na balança não move."},
    {"t": "Você acorda\ncedo.", "s": "Come menos do que todo mundo.\nE seu corpo parece ignorar."},
    {"t": "Segue a dieta.", "s": "Corta o pão. Corta o doce.\nCorta tudo. E nada muda."},
    {"t": "Faz exercício.", "s": "Se esforça mais do que amigas\nque emagrecem sem fazer metade."},
    {"t": "E mesmo assim.", "s": "O peso não sai. As roupas continuam\napertando. A frustração cresce."},
    {"t": "A culpa não\né sua.", "s": "Depois dos 35, o corpo muda por dentro.\nOs hormônios mudam as regras."},
    {"t": "O que funcionava\nantes...", "s": "...pode ser exatamente o que\nsabota você hoje."},
    {"t": "Não é força\nde vontade.", "s": "É estratégia. Seu corpo precisa de\numa abordagem diferente agora."},
    {"t": "Existe\numa saída.", "s": "E ela começa entendendo o que realmente\nestá acontecendo dentro de você."},
    {"t": "Quer entender\no método?", "s": "Comente BLINDADO.", "pill": True, "cta": True},
]

def main():
    os.makedirs(OUT, exist_ok=True)
    total = len(CARDS_TESTE)
    print(f"\n🎨 Gerando carrossel de teste — visual ajustado\n📁 {OUT}\n")

    for i, card in enumerate(CARDS_TESTE):
        num  = i + 1
        img  = draw_card("conteudo", card, num, total)
        path = os.path.join(OUT, f"card_{num:02d}.png")
        img.save(path, quality=95)
        print(f"  ✓ card_{num:02d}.png")

    # Preview strip 2×5
    scale = 0.22
    sw, sh = int(W*scale), int(H*scale)
    gap    = 10
    cols   = 5
    rows   = 2
    bg     = (20, 20, 20)
    panel  = Image.new("RGB", (sw*cols + gap*(cols+1), sh*rows + gap*(rows+1)), bg)
    for i in range(total):
        thumb = Image.open(os.path.join(OUT, f"card_{i+1:02d}.png")).resize((sw,sh), Image.LANCZOS)
        r, c  = divmod(i, cols)
        panel.paste(thumb, (gap + c*(sw+gap), gap + r*(sh+gap)))
    panel.save(os.path.join(OUT, "PREVIEW.png"))
    print(f"\n  ✓ PREVIEW.png gerado")
    print(f"\n✅ Pronto — {total} cards em {OUT}")

if __name__ == "__main__":
    main()
