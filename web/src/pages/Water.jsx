import { useEffect, useState } from 'react';
import { api } from '../lib/api';

const QUICK_AMOUNTS = [200, 300, 500];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function Water() {
  const [entries, setEntries] = useState([]);
  const [goalMl, setGoalMl] = useState(2000);
  const [customAmount, setCustomAmount] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, []);

  function load() {
    api.waterList().then((data) => {
      setEntries(data.entries);
      setGoalMl(data.goalMl);
    });
  }

  async function addAmount(amount_ml) {
    setError('');
    try {
      await api.waterAdd({ entry_date: todayStr(), amount_ml });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function addCustom(e) {
    e.preventDefault();
    const amount = parseInt(customAmount, 10);
    if (!amount || amount <= 0) return;
    await addAmount(amount);
    setCustomAmount('');
  }

  async function handleRemove(id) {
    await api.waterRemove(id);
    load();
  }

  async function saveGoal(e) {
    e.preventDefault();
    const goal = parseInt(goalInput, 10);
    if (!goal || goal <= 0) return;
    setError('');
    try {
      await api.waterSetGoal(goal);
      setEditingGoal(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  const today = todayStr();
  const todayEntries = entries.filter((e) => e.entry_date === today);
  const todayTotal = todayEntries.reduce((sum, e) => sum + e.amount_ml, 0);
  const pct = Math.min(100, Math.round((todayTotal / goalMl) * 100));
  const otherEntries = entries.filter((e) => e.entry_date !== today);

  return (
    <div className="page">
      <h1>Água</h1>
      <p className="page-subtitle">Bata sua meta do dia</p>

      <section className="module-block">
        <div className="water-progress-header">
          <strong>
            {todayTotal} ml <span className="admin-status">de {goalMl} ml</span>
          </strong>
          {editingGoal ? (
            <form className="inline-form" onSubmit={saveGoal}>
              <input
                type="number"
                step="100"
                placeholder="Nova meta (ml)"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                autoFocus
              />
              <button type="submit">Salvar</button>
              <button type="button" className="link-button" onClick={() => setEditingGoal(false)}>
                Cancelar
              </button>
            </form>
          ) : (
            <button
              className="link-button"
              onClick={() => {
                setGoalInput(String(goalMl));
                setEditingGoal(true);
              }}
            >
              Mudar meta
            </button>
          )}
        </div>
        <div className="water-bar">
          <div className="water-bar-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="water-quick-actions">
          {QUICK_AMOUNTS.map((amount) => (
            <button key={amount} type="button" onClick={() => addAmount(amount)}>
              + {amount} ml
            </button>
          ))}
          <form className="inline-form" onSubmit={addCustom}>
            <input
              type="number"
              placeholder="Outra quantidade (ml)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
            <button type="submit">Adicionar</button>
          </form>
        </div>
        {error && <p className="auth-error">{error}</p>}
      </section>

      {todayEntries.length > 0 && (
        <ul className="entry-list">
          {todayEntries.map((entry) => (
            <li key={entry.id}>
              <span className="entry-desc">{entry.amount_ml} ml</span>
              <button className="link-button" onClick={() => handleRemove(entry.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}

      {otherEntries.length > 0 && (
        <>
          <h2 className="page-subtitle">Dias anteriores</h2>
          <ul className="entry-list">
            {otherEntries.map((entry) => (
              <li key={entry.id}>
                <span className="entry-date">{entry.entry_date}</span>
                <span className="entry-desc">{entry.amount_ml} ml</span>
                <button className="link-button" onClick={() => handleRemove(entry.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
