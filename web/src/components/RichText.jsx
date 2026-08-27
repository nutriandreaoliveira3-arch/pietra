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

// Entende o texto que a Andréa cola vindo de outros editores: parágrafos
// separados por linha em branco, **negrito**, e #/##/### como títulos — cada
// título vira um botão que expande/recolhe o texto abaixo dele, pra não
// deixar tudo como um texto corrido só.
export default function RichText({ text }) {
  if (!text) return null;

  const blocks = text.trim().split(/\n\s*\n/);

  const intro = [];
  const sections = [];
  let current = null;

  blocks.forEach((block) => {
    const trimmed = block.trim();
    const headingMatch = trimmed.match(/^#{1,4}\s+(.+)$/);
    if (headingMatch) {
      current = { title: headingMatch[1], blocks: [] };
      sections.push(current);
    } else if (current) {
      current.blocks.push(trimmed);
    } else {
      intro.push(trimmed);
    }
  });

  return (
    <>
      {intro.map((block, i) => (
        <p key={`intro-${i}`}>{renderInline(block, `intro-${i}`)}</p>
      ))}
      {sections.map((section, si) => (
        <details key={si} className="rich-text-section">
          <summary>{renderInline(section.title, `sum-${si}`)}</summary>
          {section.blocks.map((block, bi) => (
            <p key={bi}>{renderInline(block, `${si}-${bi}`)}</p>
          ))}
        </details>
      ))}
    </>
  );
}
