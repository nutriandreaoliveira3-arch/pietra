import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminClientDetail() {
  const { user } = useAuth();
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .adminClientTracking(userId)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (user?.role !== 'admin') return <Navigate to="/" replace />;
  if (loading) return <div className="page">Carregando...</div>;
  if (error) return <div className="page">{error}</div>;
  if (!data) return null;

  const { user: client, diary, weight, water, waterGoalMl } = data;

  const chartData = weight.map((w) => ({ date: w.entry_date, peso: w.weight_kg }));
  const today = todayStr();
  const todayWater = water.filter((w) => w.entry_date === today).reduce((sum, w) => sum + w.amount_ml, 0);
  const waterPct = Math.min(100, Math.round((todayWater / waterGoalMl) * 100));
  const todayDiaryEntries = diary.filter((d) => d.entry_date === today);
  const todayCalories = todayDiaryEntries.reduce((sum, d) => sum + (d.calories_kcal || 0), 0);
  const todayHasCalorieEstimate = todayDiaryEntries.some((d) => d.calories_kcal != null);

  return (
    <div className="page">
      <Link to="/admin/clientes" className="link-button">
        ← Voltar pra Clientes
      </Link>
      <h1>{client.name}</h1>
      <p className="page-subtitle">{client.email}</p>

      <section className="module-block">
        <h2>Diário alimentar</h2>
        {diary.length === 0 ? (
          <p>Nenhum registro ainda.</p>
        ) : (
          <>
            {todayHasCalorieEstimate && (
              <p className="admin-status">~{todayCalories} kcal estimadas hoje</p>
            )}
            <ul className="entry-list">
              {diary.map((entry) => (
                <li key={entry.id}>
                  <span className="entry-date">{entry.entry_date}</span>
                  <span className="entry-meal">{entry.meal}</span>
                  <span className="entry-desc">
                    {entry.description}
                    {entry.calories_kcal != null && (
                      <span className="admin-status"> · ~{entry.calories_kcal} kcal</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="module-block">
        <h2>Progresso — peso e medidas</h2>
        {weight.length === 0 ? (
          <p>Nenhum registro ainda.</p>
        ) : (
          <>
            {weight.length > 1 && (
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={220}>
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
            <ul className="entry-list">
              {[...weight].reverse().map((entry) => (
                <li key={entry.id}>
                  <span className="entry-date">{entry.entry_date}</span>
                  <span className="entry-desc">
                    {entry.weight_kg} kg
                    {entry.waist_cm ? ` · cintura ${entry.waist_cm} cm` : ''}
                    {entry.hip_cm ? ` · quadril ${entry.hip_cm} cm` : ''}
                    {entry.abdomen_cm ? ` · abdômen ${entry.abdomen_cm} cm` : ''}
                    {entry.thigh_cm ? ` · coxa ${entry.thigh_cm} cm` : ''}
                    {entry.arm_cm ? ` · braço ${entry.arm_cm} cm` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="module-block">
        <h2>Água</h2>
        <div className="water-progress-header">
          <strong>
            {todayWater} ml <span className="admin-status">de {waterGoalMl} ml hoje</span>
          </strong>
        </div>
        <div className="water-bar">
          <div className="water-bar-fill" style={{ width: `${waterPct}%` }} />
        </div>
        {water.length > 0 && (
          <ul className="entry-list">
            {water.slice(0, 10).map((entry) => (
              <li key={entry.id}>
                <span className="entry-date">{entry.entry_date}</span>
                <span className="entry-desc">{entry.amount_ml} ml</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
