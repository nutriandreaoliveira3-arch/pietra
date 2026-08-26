function renderInline(line, keyPrefix) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g).filter((part) => part !== '');
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{part}</span>
    )
  );
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

    const lines = trimmed.split('\n');
    return (
      <p key={bi}>
        {lines.map((line, li) => (
          <span key={li}>
            {renderInline(line, `${bi}-${li}`)}
            {li < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}
