import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';

export default function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    api.chatList().then((data) => setMessages(data.messages));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setError('');
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);
    try {
      const data = await api.chatSend(userMessage.content);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page assistant-page">
      <h1>Assistente BLIM</h1>
      <p className="page-subtitle">Tire suas dúvidas sobre o protocolo</p>

      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble chat-${m.role}`}>
            {m.content}
          </div>
        ))}
        {sending && <div className="chat-bubble chat-assistant">Digitando...</div>}
        <div ref={bottomRef} />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escreva sua pergunta para a BLIM..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button type="submit" disabled={sending}>
          Enviar
        </button>
      </form>
    </div>
  );
}
