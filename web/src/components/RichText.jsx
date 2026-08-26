// Divide o bloco inteiro (não linha a linha) pra **negrito** funcionar mesmo
// quando a quebra de linha cai bem no meio do trecho marcado.
function renderInline(block, keyPrefix) {
  const tokens = block.split(/(\*\*[^*]+\*\*|\n)/g).filter((token) => token !== '');
  return tokens.map((token, i) => {
    if (token === '\n') return <br key={`${keyPrefix}-${i}`} />;
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`}>{token.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-${i}`}>{token}</span>;
  });
}

// Entende o texto que a Andrea cola vindo de outros editores: parágrafos
// separados por linha em branco, **negrito** e #/##/### como títulos.
export default function RichText({ text }) {
  if (!text) return null;

  const blocks = text.trim().split(/\n\s*\n/);

  return blocks.map((block, bi) => {
    const trimmed = block.trim();
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const Tag = `h${Math.min(headingMatch[1].length + 3, 6)}`;
      return <Tag key={bi}>{renderInline(headingMatch[2], `h${bi}`)}</Tag>;
    }

    return <p key={bi}>{renderInline(trimmed, `p${bi}`)}</p>;
  });
}
