"""
export_png.py — Re-gera todos os carrosséis Emagrecimento Blindado
e salva os PNGs em carrosseis/exports_png/<nome_carrossel>/
"""

import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from blindado_gen import gerar_carrossel

OUT = os.path.join(os.path.dirname(__file__), "exports_png")

CARROSSEIS = [
    {
        "id": "01_manha",
        "tipo": "manha",
        "label": "Levanta, você ainda não terminou sua história",
        "cards": [
            {"t": "LEVANTA.",           "s": "Você ainda não terminou\nsua história."},
            {"t": "Todo dia\nvocê acorda", "s": "carregando o peso de quem tentou\ne não viu resultado."},
            {"t": "Mas você ainda\nestá aqui.", "s": "Isso já diz muito\nsobre quem você é."},
            {"t": "Perfeição\nnão existe.", "s": "O que existe é a decisão de continuar,\nmesmo imperfeita."},
            {"t": "Não espere se\nsentir pronta.", "s": "Comece do jeito\nque você está agora."},
            {"t": "Cada pequeno\npasso conta.", "s": "Mesmo os que parecem\ninsignificantes."},
            {"t": "Você não precisa\nvoltar ao passado.", "s": "Você precisa se tornar\nquem ainda vai ser."},
            {"t": "Cair faz parte.", "s": "O que define você é quantas\nvezes se levantou."},
            {"t": "A virada não\nprecisa ser grande.", "s": "Ela precisa ser real.\nE começa agora."},
            {"t": "Salva\nesse post.", "s": "Lê sempre que precisar de força.", "cta": True, "pill": True},
        ],
    },
    {
        "id": "11_conteudo",
        "tipo": "conteudo",
        "label": "Por que você não emagrece como aos 20 anos",
        "cards": [
            {"t": "POR QUE VOCÊ\nNÃO EMAGRECE", "s": "como emagrecia aos 20 anos?"},
            {"t": "Não é\npreguiça.", "s": "Não é falta de esforço.\nÉ biologia."},
            {"t": "Depois dos 35,", "s": "os hormônios mudam.\nO metabolismo muda. O corpo muda."},
            {"t": "Estrogênio\ncaindo", "s": "afeta diretamente onde e como\no corpo guarda gordura."},
            {"t": "Cortisol\nelevado", "s": "por estresse e privação de sono\nretém gordura abdominal."},
            {"t": "O que funcionava\nantes", "s": "pode ser exatamente o que\nsabota você hoje."},
            {"t": "Comer menos e\nexercitar mais", "s": "pode piorar tudo quando os hormônios\nestão fora do ponto."},
            {"t": "Seu corpo precisa\nde estratégia,", "s": "não de punição."},
            {"t": "A solução não\né a mesma.", "s": "Porque você não é\na mesma de antes."},
            {"t": "Quer entender\na estratégia?", "s": "Comente BLINDADO.", "cta": True, "pill": True},
        ],
    },
    {
        "id": "21_cta",
        "tipo": "cta",
        "label": "Cansada de recomeçar toda segunda-feira",
        "cards": [
            {"t": "CANSADA DE\nRECOMEÇAR", "s": "toda segunda-feira?"},
            {"t": "Já foram\nmeses assim.", "s": "Talvez anos."},
            {"t": "Começa animada.", "s": "Dura semanas. Para. Recomeça."},
            {"t": "E a frustração\nacumula", "s": "a cada ciclo\nque se repete."},
            {"t": "Você não\né fraca.", "s": "Você está usando um método que\nnão foi feito para o seu corpo."},
            {"t": "Existe uma\nforma diferente.", "s": "Sem dieta maluca. Sem passar fome.\nSem segunda-feira."},
            {"t": "Mulheres que\nencontraram", "s": "esse caminho pararam de contar os dias\npara poder comer."},
            {"t": "Isso é\npossível.", "s": "E está mais perto\ndo que você imagina."},
            {"t": "Você não precisa\nfazer isso sozinha.", "s": "Existe um grupo\nesperando por você."},
            {"t": "Comente\nBLINDADO", "s": "e entre para o Grupo VIP\ngratuito agora.", "cta": True, "pill": True},
        ],
    },
    {
        "id": "faztudocerto",
        "tipo": "conteudo",
        "label": "Você faz tudo certo e não emagrece",
        "cards": [
            {"t": "VOCÊ FAZ\nTUDO CERTO.", "s": "E mesmo assim,\na balança não move."},
            {"t": "Você acorda\ncedo.", "s": "Come menos do que todo mundo.\nE seu corpo parece ignorar."},
            {"t": "Segue a dieta.", "s": "Corta o pão. Corta o doce.\nCorta tudo. E nada muda."},
            {"t": "Faz exercício.", "s": "Se esforça mais do que amigas\nque emagrecem sem fazer metade."},
            {"t": "E mesmo assim.", "s": "O peso não sai. As roupas continuam\napertando. A frustração cresce."},
            {"t": "A culpa não\né sua.", "s": "Depois dos 35, o corpo muda por dentro.\nOs hormônios mudam as regras."},
            {"t": "O que funcionava\nantes...", "s": "...pode ser exatamente o que\nsabota você hoje."},
            {"t": "Não é força\nde vontade.", "s": "É estratégia. Seu corpo precisa de\numa abordagem diferente agora."},
            {"t": "Existe\numa saída.", "s": "E ela começa entendendo o que realmente\nestá acontecendo dentro de você."},
            {"t": "Quer entender\no método?", "s": "Comente BLINDADO.", "cta": True, "pill": True},
        ],
    },
]

def main():
    print("\n🖼  EXPORTANDO TODOS OS CARROSSÉIS → exports_png/\n")
    for c in CARROSSEIS:
        out_dir = os.path.join(OUT, f"carrossel_{c['id']}")
        gerar_carrossel(c["tipo"], c["cards"], out_dir, c["label"])
    print("\n✅ Concluído. Todos os PNGs estão em:")
    print(f"   {OUT}\n")

if __name__ == "__main__":
    main()
