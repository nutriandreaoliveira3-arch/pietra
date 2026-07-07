import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../lib/api';

export default function Progress() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, []);

  function load() {
    api.weightList().then((data) => setEntries(data.entries));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.weightAdd({
        entry_date: date,
        weight_kg: parseFloat(weight),
        waist_cm: waist ? parseFloat(waist) : null,
        hip_cm: hip ? parseFloat(hip) : null,
      });
      setWeight('');
      setWaist('');
      setHip('');
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRemove(id) {
    await api.weightRemove(id);
    load();
  }

  const chartData = entries.map((e) => ({ date: e.entry_date, peso: e.weight_kg }));

  return (
    <div className="page">
      <h1>Progresso</h1>

      {entries.length > 1 && (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="peso" stroke="#b08d57" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <form className="inline-form" onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input
          type="number"
          step="0.1"
          placeholder="Peso (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input type="number" step="0.1" placeholder="Cintura (cm)" value={waist} onChange={(e) => setWaist(e.target.value)} />
        <input type="number" step="0.1" placeholder="Quadril (cm)" value={hip} onChange={(e) => setHip(e.target.value)} />
        <button type="submit">Registrar</button>
      </form>
      {error && <p className="auth-error">{error}</p>}

      <ul className="entry-list">
        {[...entries].reverse().map((entry) => (
          <li key={entry.id}>
            <span className="entry-date">{entry.entry_date}</span>
            <span className="entry-desc">
              {entry.weight_kg} kg
              {entry.waist_cm ? ` · cintura ${entry.waist_cm} cm` : ''}
              {entry.hip_cm ? ` · quadril ${entry.hip_cm} cm` : ''}
            </span>
            <button className="link-button" onClick={() => handleRemove(entry.id)}>
              Remover
            </button>
          </li>
        ))}
        {entries.length === 0 && <p>Nenhum registro ainda. Adicione seu primeiro peso.</p>}
      </ul>
    </div>
  );
}
