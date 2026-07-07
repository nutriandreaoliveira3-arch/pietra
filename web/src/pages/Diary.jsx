import { useEffect, useState } from 'react';
import { api } from '../lib/api';

const MEALS = ['Café da manhã', 'Almoço', 'Lanche', 'Jantar', 'Ceia'];

export default function Diary() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [meal, setMeal] = useState(MEALS[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, []);

  function load() {
    api.diaryList().then((data) => setEntries(data.entries));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.diaryAdd({ entry_date: date, meal, description });
      setDescription('');
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRemove(id) {
    await api.diaryRemove(id);
    load();
  }

  return (
    <div className="page">
      <h1>Diário alimentar</h1>
      <form className="inline-form" onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <select value={meal} onChange={(e) => setMeal(e.target.value)}>
          {MEALS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="O que você comeu?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>
      {error && <p className="auth-error">{error}</p>}

      <ul className="entry-list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <span className="entry-date">{entry.entry_date}</span>
            <span className="entry-meal">{entry.meal}</span>
            <span className="entry-desc">{entry.description}</span>
            <button className="link-button" onClick={() => handleRemove(entry.id)}>
              Remover
            </button>
          </li>
        ))}
        {entries.length === 0 && <p>Nenhum registro ainda. Adicione sua primeira refeição.</p>}
      </ul>
    </div>
  );
}
