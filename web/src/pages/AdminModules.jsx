import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

function LessonEditor({ lesson, onSaved, onCancel }) {
  const [title, setTitle] = useState(lesson.title);
  const [content, setContent] = useState(lesson.content || '');
  const [videoUrl, setVideoUrl] = useState(lesson.video_url || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.updateLesson(lesson.id, { title, content, video_url: videoUrl });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={save}>
      <label>
        Título da aula
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Conteúdo (texto)
        <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <label>
        Link do vídeo (YouTube, Vimeo etc. — opcional)
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://..." />
      </label>
      {error && <p className="auth-error">{error}</p>}
      <div className="admin-form-actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar aula'}
        </button>
        <button type="button" className="link-button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

function ModuleEditor({ mod, onSaved, onCancel }) {
  const [title, setTitle] = useState(mod.title);
  const [description, setDescription] = useState(mod.description || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.updateModule(mod.id, { title, description });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={save}>
      <label>
        Título do módulo
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Descrição
        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      {error && <p className="auth-error">{error}</p>}
      <div className="admin-form-actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar módulo'}
        </button>
        <button type="button" className="link-button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function AdminModules() {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newLessonTitleByModule, setNewLessonTitleByModule] = useState({});

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

  async function addModule(e) {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    await api.createModule({ title: newModuleTitle.trim(), description: '' });
    setNewModuleTitle('');
    load();
  }

  async function removeModule(moduleId) {
    if (!confirm('Apagar este módulo e todas as suas aulas?')) return;
    await api.removeModule(moduleId);
    load();
  }

  async function addLesson(moduleId, e) {
    e.preventDefault();
    const title = (newLessonTitleByModule[moduleId] || '').trim();
    if (!title) return;
    await api.createLesson(moduleId, { title, content: '' });
    setNewLessonTitleByModule((prev) => ({ ...prev, [moduleId]: '' }));
    load();
  }

  async function removeLesson(lessonId) {
    if (!confirm('Apagar esta aula?')) return;
    await api.removeLesson(lessonId);
    load();
  }

  if (user?.role !== 'admin') return <Navigate to="/" replace />;
  if (loading) return <div className="page">Carregando...</div>;
  if (error) return <div className="page">{error}</div>;

  return (
    <div className="page">
      <h1>Gerenciar conteúdo</h1>
      <p className="page-subtitle">Módulos e aulas do Protocolo</p>

      {modules.map((mod) => (
        <section key={mod.id} className="module-block admin-module-block">
          {editingModuleId === mod.id ? (
            <ModuleEditor
              mod={mod}
              onSaved={() => {
                setEditingModuleId(null);
                load();
              }}
              onCancel={() => setEditingModuleId(null)}
            />
          ) : (
            <div className="admin-module-header">
              <div>
                <h2>{mod.title}</h2>
                <p className="module-desc">{mod.description}</p>
              </div>
              <div className="admin-actions">
                <button className="link-button" onClick={() => setEditingModuleId(mod.id)}>
                  Editar
                </button>
                <button className="link-button" onClick={() => removeModule(mod.id)}>
                  Apagar
                </button>
              </div>
            </div>
          )}

          <ul className="lesson-list">
            {mod.lessons.map((lesson) => (
              <li key={lesson.id} className="admin-lesson-item">
                {editingLessonId === lesson.id ? (
                  <LessonEditor
                    lesson={lesson}
                    onSaved={() => {
                      setEditingLessonId(null);
                      load();
                    }}
                    onCancel={() => setEditingLessonId(null)}
                  />
                ) : (
                  <>
                    <div>
                      <strong>{lesson.title}</strong>
                      <p>{lesson.content || <em>Sem conteúdo ainda</em>}</p>
                      {lesson.video_url && <p>🎬 {lesson.video_url}</p>}
                    </div>
                    <div className="admin-actions">
                      <button className="link-button" onClick={() => setEditingLessonId(lesson.id)}>
                        Editar
                      </button>
                      <button className="link-button" onClick={() => removeLesson(lesson.id)}>
                        Apagar
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          <form className="inline-form" onSubmit={(e) => addLesson(mod.id, e)}>
            <input
              placeholder="Título da nova aula"
              value={newLessonTitleByModule[mod.id] || ''}
              onChange={(e) =>
                setNewLessonTitleByModule((prev) => ({ ...prev, [mod.id]: e.target.value }))
              }
            />
            <button type="submit">+ Adicionar aula</button>
          </form>
        </section>
      ))}

      <section className="module-block">
        <h2>Novo módulo</h2>
        <form className="inline-form" onSubmit={addModule}>
          <input
            placeholder="Título do módulo"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
          />
          <button type="submit">+ Criar módulo</button>
        </form>
      </section>
    </div>
  );
}
