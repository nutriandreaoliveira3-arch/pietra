const URL_PATTERN = /https?:\/\/[^\s<>"]+[^\s<>".,;:)\]]/;

// Divide o bloco inteiro (não linha a linha) pra **negrito** funcionar mesmo
// quando a quebra de linha cai bem no meio do trecho marcado. Um link colado
// (https://...) também vira token separado, pra virar <a> clicável.
function renderInline(block, keyPrefix) {
  const splitter = new RegExp(`(\\*\\*[^*]+\\*\\*|${URL_PATTERN.source}|\\n)`, 'g');
  const tokens = block.split(splitter).filter((token) => token !== '');
  return tokens.map((token, i) => {
    if (token === '\n') return <br key={`${keyPrefix}-${i}`} />;
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`}>{token.slice(2, -2)}</strong>;
    }
    if (URL_PATTERN.test(token)) {
      return (
        <a key={`${keyPrefix}-${i}`} href={token} target="_blank" rel="noopener noreferrer">
          {token}
        </a>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{token}</span>;
  });
}

function isListBlock(block) {
  const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
  return lines.length > 0 && lines.every((l) => /^[*-]\s+\S/.test(l));
}

// Um bloco vira lista com bolinhas quando toda linha começa com "* " ou "- "
// seguido de texto (não confunde com **negrito**, que não tem espaço depois
// do primeiro *); senão vira parágrafo normal (com **negrito** processado).
function renderBlock(block, key) {
  if (isListBlock(block)) {
    const items = block
      .split('\n')
      .map((l) => l.trim().replace(/^[*-]\s+/, ''))
      .filter((l) => l !== '');
    if (items.length === 0) return null;
    return (
      <ul key={key}>
        {items.map((item, i) => (
          <li key={i}>{renderInline(item, `${key}-li-${i}`)}</li>
        ))}
      </ul>
    );
  }
  return <p key={key}>{renderInline(block, key)}</p>;
}

// Entende o texto que a Andréa cola vindo de outros editores: parágrafos
// separados por linha em branco, **negrito**, listas com */-, e # como
// título — vira um botão que expande/recolhe o texto abaixo dele. Um "##"
// (dois ou mais #) dentro de um botão vira um sub-botão aninhado nele —
// útil pra casos como "janela de alimentação" dentro de cada horário de
// jejum, que só faz sentido depois que a pessoa já abriu o botão de fora.
function renderSection(section, key) {
  return (
    <details key={key} className="rich-text-section">
      <summary>{renderInline(section.title, `sum-${key}`)}</summary>
      {section.items.map((item, ii) =>
        item.type === 'sub'
          ? renderSection(item.section, `${key}-${ii}`)
          : renderBlock(item.content, `${key}-${ii}`)
      )}
    </details>
  );
}

export default function RichText({ text }) {
  if (!text) return null;

  const blocks = text.trim().split(/\n\s*\n/);

  const intro = [];
  const sections = [];
  let currentTop = null;
  let currentSub = null;

  blocks.forEach((block) => {
    const trimmed = block.trim();
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2];
      if (level === 1 || !currentTop) {
        currentTop = { title, items: [] };
        sections.push(currentTop);
        currentSub = null;
      } else {
        currentSub = { title, items: [] };
        currentTop.items.push({ type: 'sub', section: currentSub });
      }
    } else if (currentSub) {
      currentSub.items.push({ type: 'block', content: trimmed });
    } else if (currentTop) {
      currentTop.items.push({ type: 'block', content: trimmed });
    } else {
      intro.push(trimmed);
    }
  });

  return (
    <>
      {intro.map((block, i) => renderBlock(block, `intro-${i}`))}
      {sections.map((section, si) => renderSection(section, `${si}`))}
    </>
  );
}
