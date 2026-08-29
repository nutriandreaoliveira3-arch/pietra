import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import RichText from '../components/RichText';

export default function ManipulacaoBlindada() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    api
      .modules()
      .then((data) => setModules(data.modules.filter((mod) => mod.kind === 'manipulado')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function toggleComplete(lessonId) {
    await api.completeLesson(lessonId);
    load();
  }

  if (loading) return <div className="page">Carregando...</div>;
  if (error) return <div className="page">{error}</div>;

  return (
    <div className="page">
      <h1>Manipulação Blindada</h1>
      <p className="page-subtitle">Suas fórmulas manipuladas, liberadas pela Andréa conforme sua evolução</p>
      {modules.length === 0 && (
        <p>Nenhuma fórmula manipulada liberada ainda. A Andréa vai liberar assim que fizer sentido pra você.</p>
      )}
      {modules.map((mod) => (
        <section key={mod.id} className={`module-block ${mod.locked ? 'module-locked' : ''}`}>
          <h2>
            {mod.locked && '🔒 '}
            {mod.title}
          </h2>
          <div className="module-desc">
            <RichText text={mod.description} />
          </div>
          {mod.locked ? (
            <p className="module-locked-msg">
              {mod.lockReason === 'phase'
                ? 'Essa fórmula ainda não foi liberada pra você. A Andréa libera conforme sua evolução.'
                : `Disponível para quem tem o protocolo${mod.product ? ` "${mod.product.name}"` : ''}.`}
            </p>
          ) : (
            <ul className="lesson-list">
              {mod.lessons.map((lesson) => (
                <li key={lesson.id} className={lesson.completed ? 'lesson-done' : ''}>
                  <div>
                    <strong>{lesson.title}</strong>
                    <div className="lesson-content">
                      <RichText text={lesson.content} />
                    </div>
                    {lesson.video_url && (
                      <p className="lesson-link">
                        🎬{' '}
                        <a href={lesson.video_url} target="_blank" rel="noopener noreferrer">
                          Abrir vídeo/material
                        </a>
                      </p>
                    )}
                  </div>
                  <button onClick={() => toggleComplete(lesson.id)} disabled={lesson.completed}>
                    {lesson.completed ? 'Concluída' : 'Marcar como concluída'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
