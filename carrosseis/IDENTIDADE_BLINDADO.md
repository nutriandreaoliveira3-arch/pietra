# IDENTIDADE VISUAL — EMAGRECIMENTO BLINDADO
> Documento de referência oficial. Usar em todos os carrosséis do projeto.

---

## 1. CORES OFICIAIS

| Nome              | Hex       | RGB              | Uso                              |
|-------------------|-----------|------------------|----------------------------------|
| Preto principal   | `#111111` | (17, 17, 17)     | Fundo dominante (texto zone)     |
| Preto secundário  | `#1C1C1C` | (28, 28, 28)     | Fundo secundário / gradiente     |
| Dourado premium   | `#D4A64A` | (212, 166, 74)   | Acento principal, brand, linhas  |
| Dourado destaque  | `#E0B95B` | (224, 185, 91)   | Eyebrow, separador, brilho       |
| Âmbar elegante    | `#C6922E` | (198, 146, 46)   | Linhas internas, sombra dourada  |
| Creme             | `#F5E8D0` | (245, 232, 208)  | Subtítulos, textos secundários   |
| Branco creme      | `#FFFCF6` | (255, 252, 246)  | Títulos principais               |
| Dourado rebaixado | `#8C6C28` | (140, 108, 40)   | Watermark, index, elementos dim  |

**Proibido usar:** amarelo puro, laranja vibrante, cobre avermelhado, cinza neutro, branco frio.

---

## 2. TIPOGRAFIA

| Elemento              | Fonte                     | Tamanho | Cor             |
|-----------------------|---------------------------|---------|-----------------|
| Eyebrow (marca)       | Liberation Sans Regular   | 34px    | `#E0B95B`       |
| Título (curto ≤14ch)  | DejaVu Serif Bold         | 128px   | `#FFFCF6`       |
| Título (médio ≤26ch)  | DejaVu Serif Bold         | 104px   | `#FFFCF6`       |
| Título (longo >26ch)  | DejaVu Serif Bold         | 88px    | `#FFFCF6`       |
| Subtítulo             | Liberation Sans Regular   | 41px    | `#F5E8D0`       |
| Watermark / index     | Liberation Sans Regular   | 21px    | `#8C6C28`       |
| Pill CTA (BLINDADO)   | DejaVu Sans Bold          | 46px    | `#111111`       |

---

## 3. DOURADO — REGRAS DE APLICAÇÃO

- **Eyebrow "EMAGRECIMENTO BLINDADO":** `#E0B95B` com sombra `#C6922E` (offset 1px)
- **Separador foto/texto:** linha dupla — 3px `#C6922E` + 4px `#E0B95B`
- **Cantos L duplo:** externo 3px `#E0B95B` · interno 2px `#C6922E`
- **Acento de título:** retângulo 100×5px `#E0B95B`
- **Linha decorativa sob eyebrow:** 2px `#D4A64A` + ponto central `#E0B95B`
- **Linha separadora título/subtítulo:** 2px `#C6922E`
- **Linha final:** 2px `#C6922E`
- **Brand (bottom-right):** `#D4A64A`
- **Pill BLINDADO:** fundo `#E0B95B`, texto `#111111`

---

## 4. LAYOUT DOS CARDS — 1080 × 1350 px

```
┌──────────────────────────────────────────┐
│                                          │
│         ZONA DA FOTO / IMAGEM            │  810px · 60%
│         [espaço reservado]               │
│  @emagrecimentoblindado      01 / 10     │
├══════════════════════════════════════════╡ ← separador duplo dourado
│ ━━━━━━━━                                 │
│  TÍTULO FORTE                            │  540px · 40%
│  Subtítulo de apoio                      │
│              @emagrecimentoblindado      │
└──────────────────────────────────────────┘
```

**Padding horizontal:** 80px  
**Padding texto superior:** 50px após separador  
**Zona da foto:** sem texto, sem decoração sobreposta — apenas watermark e index  

---

## 5. TEMAS VISUAIS (gradiente da zona da foto)

| Tipo       | Gradiente (foto)                        | Fundo texto    |
|------------|-----------------------------------------|----------------|
| `manha`    | preto → sépia → âmbar escuro (8,6,2)→(52,32,8) | `#111111` |
| `conteudo` | preto → vinho roxo → violeta (6,4,12)→(42,22,68) | `#111111`→`#1C121E` |
| `cta`      | preto → vinho rose → bordô (8,2,4)→(60,14,28) | `#111111`→`#180A10` |

Todos os temas: vinheta perimetral agressiva para preto absoluto nas bordas.

---

## 6. ESTRUTURA DOS 10 CARDS

| Card | Tipo      | Conteúdo                                          |
|------|-----------|---------------------------------------------------|
| 01   | Capa      | Frase curta e forte. Impacto imediato.            |
| 02   | Dor       | Nomeia a dor principal da mulher.                 |
| 03   | Dor 2     | Aprofunda a dor. Detalhes que geram identificação.|
| 04   | Problema  | Explica o problema sem culpar.                    |
| 05   | Problema 2| Contexto hormonal/biológico simples.              |
| 06   | Quebra    | Quebra de crença. Não é falta de força de vontade.|
| 07   | Quebra 2  | Valida a experiência da mulher.                   |
| 08   | Virada    | Início da mudança de perspectiva.                 |
| 09   | Esperança | Virada emocional. Existe solução.                 |
| 10   | CTA       | Pill BLINDADO + "entre para o Grupo VIP gratuito."|

---

## 7. CTA PADRÃO — CARD 10

**Título:** frase que leva à ação (ex: "Quer entender esse método?")  
**Pill:** `BLINDADO` em dourado `#E0B95B` sobre preto  
**Subtítulo:** `e entre para o Grupo VIP gratuito.`  
**Tom:** direto, acolhedor, sem pressão, sem promessa de resultado.  

---

## 8. REGRAS DE EXPORTAÇÃO PNG

- **Formato:** PNG, RGB, sem transparência
- **Resolução:** 1080 × 1350 px (formato Instagram portrait)
- **Nomenclatura:** `card_01.png` a `card_10.png` por pasta de carrossel
- **Pasta:** `carrossel_[ID]_[tipo]/`
- **Preview:** `PREVIEW.png` — strip 2×5 cards em escala 22%
- **Sem compressão agressiva** — salvar com qualidade máxima (`Image.save(path)`)

---

## 9. REGRAS DE IDENTIDADE — O QUE NUNCA ALTERAR

- Proporção 60/40 (foto/texto)
- Eyebrow "EMAGRECIMENTO BLINDADO" sempre presente na zona da foto
- Separador duplo dourado sempre presente
- Cantos L duplo sempre presentes
- Pill BLINDADO sempre no card 10
- Preto dominante no fundo da zona de texto
- Fontes: DejaVu Serif Bold (títulos) + Liberation Sans (corpo)

---

## 10. LEGENDA PADRÃO DE POSTAGEM

```
[Frase gancho relacionada ao tema]

[2-3 linhas de desenvolvimento emocional]

💬 Comente BLINDADO e eu te mando o link do Grupo VIP gratuito.

#emagrecimentoblindado #[hashtag_tema] #hormoniofeminino
#emagrecerfeminino #depois35 #transformacaofeminina
```

---

*Documento criado em junho/2026. Não alterar sem aprovação da marca.*
