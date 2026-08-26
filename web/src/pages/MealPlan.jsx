import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import RichText from '../components/RichText';

export default function MealPlan() {
  const [content, setContent] = useState('');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .mealPlan()
      .then((data) => {
        setContent(data.content);
        setUpdatedAt(data.updatedAt);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page">Carregando...</div>;

  return (
    <div className="page">
      <h1>Plano alimentar</h1>
      <p className="page-subtitle">Montado pela Andrea especialmente pra você</p>

      {content ? (
        <section className="module-block">
          <div className="lesson-content">
            <RichText text={content} />
          </div>
          {updatedAt && <p className="admin-status">Atualizado em {updatedAt.slice(0, 10)}</p>}
        </section>
      ) : (
        <p>Seu plano alimentar ainda não foi cadastrado. A Andrea vai liberar em breve.</p>
      )}
    </div>
  );
}
