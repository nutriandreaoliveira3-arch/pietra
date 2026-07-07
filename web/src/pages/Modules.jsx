import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Modules() {
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
      .then((data) => setModules(data.modules))
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
      <h1>Protocolo</h1>
      <p className="page-subtitle">Emagrecimento Blindado</p>
      {modules.map((mod) => (
        <section key={mod.id} className="module-block">
          <h2>{mod.title}</h2>
          <p className="module-desc">{mod.description}</p>
          <ul className="lesson-list">
            {mod.lessons.map((lesson) => (
              <li key={lesson.id} className={lesson.completed ? 'lesson-done' : ''}>
                <div>
                  <strong>{lesson.title}</strong>
                  <p>{lesson.content}</p>
                </div>
                <button onClick={() => toggleComplete(lesson.id)} disabled={lesson.completed}>
                  {lesson.completed ? 'Concluída' : 'Marcar como concluída'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
