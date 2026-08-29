import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const STATUS_LABELS = {
  active: 'Ativa',
  pending: 'Aguardando ativação',
  inactive: 'Inativa',
};

function ProductChecklist({ products, selectedIds, onChange }) {
  function toggle(productId) {
    if (selectedIds.includes(productId)) {
      onChange(selectedIds.filter((id) => id !== productId));
    } else {
      onChange([...selectedIds, productId]);
    }
  }

  return (
    <div className="admin-checklist">
      {products.map((p) => (
        <label key={p.id} className="admin-checklist-item">
          <input
            type="checkbox"
            checked={selectedIds.includes(p.id)}
            onChange={() => toggle(p.id)}
          />
          {p.name}
        </label>
      ))}
    </div>
  );
}

const DOC_TYPES = {
  'meal-plan': { title: 'Plano alimentar', get: api.adminGetMealPlan, set: api.adminSetMealPlan },
  supplements: { title: 'Suplementação', get: api.adminGetSupplements, set: api.adminSetSupplements },
};

function ClientDocEditor({ userId, kind, onClose }) {
  const { title, get, set } = DOC_TYPES[kind];
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    get(userId)
      .then((data) => setContent(data.content))
      .finally(() => setLoading(false));
  }, [userId]);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await set(userId, content);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <form className="admin-form" onSubmit={save}>
      <label>
        {title}
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Cole ou escreva o conteúdo aqui — pode usar **negrito** e ### título."
        />
      </label>
      {error && <p className="auth-error">{error}</p>}
      <div className="admin-form-actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" className="link-button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [phaseModules, setPhaseModules] = useState([]);
  const [manipuladoModules, setManipuladoModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [productIds, setProductIds] = useState([]);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [newActivationUrl, setNewActivationUrl] = useState('');
  const [copiedId, setCopiedId] = useState('');
  const [editingDoc, setEditingDoc] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    Promise.all([api.adminUsers(), api.products(), api.modules()])
      .then(([usersData, productsData, modulesData]) => {
        setUsers(usersData.users);
        setProducts(productsData.products);
        setPhaseModules(modulesData.modules.filter((m) => m.phase_gated && m.kind !== 'manipulado'));
        setManipuladoModules(modulesData.modules.filter((m) => m.phase_gated && m.kind === 'manipulado'));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function addUser(e) {
    e.preventDefault();
    setCreating(true);
    setCreateError('');
    setSuccessMsg('');
    setNewActivationUrl('');
    try {
      const { user: created } = await api.adminCreateUser({ name, email, productIds });
      setSuccessMsg(`Conta criada! E-mail de ativação enviado para ${email}.`);
      setNewActivationUrl(created.activationUrl || '');
      setName('');
      setEmail('');
      setProductIds([]);
      load();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function copyLink(id, url) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    } catch {
      prompt('Copie o link manualmente:', url);
    }
  }

  async function revoke(userId) {
    if (!confirm('Revogar o acesso desta cliente (bloqueia login completamente)?')) return;
    await api.adminRevokeUser(userId);
    load();
  }

  async function reactivate(userId) {
    await api.adminReactivateUser(userId);
    load();
  }

  async function toggleProduct(userId, productId, hasIt) {
    if (hasIt) {
      await api.adminRevokeProduct(userId, productId);
    } else {
      await api.adminGrantProduct(userId, productId);
    }
    load();
  }

  async function toggleModule(userId, moduleId, hasIt) {
    if (hasIt) {
      await api.adminRevokeModule(userId, moduleId);
    } else {
      await api.adminGrantModule(userId, moduleId);
    }
    load();
  }

  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div className="page">
      <h1>Clientes</h1>
      <p className="page-subtitle">Cadastrar e gerenciar acessos manualmente</p>

      <section className="module-block admin-module-block">
        <h2>Nova cliente</h2>
        <p className="module-desc">
          Use isso para venda direta, cortesia ou acesso fora da Greenn. A cliente recebe um e-mail
          de ativação automático, mas você também pode copiar o link e mandar você mesma (WhatsApp, por
          exemplo) — útil pra venda 1 a 1 de alto ticket.
        </p>
        <form className="admin-form" onSubmit={addUser}>
          <label>
            Nome
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            E-mail
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Protocolos liberados
            <ProductChecklist products={products} selectedIds={productIds} onChange={setProductIds} />
          </label>
          {createError && <p className="auth-error">{createError}</p>}
          {successMsg && <p className="admin-success">{successMsg}</p>}
          {newActivationUrl && (
            <div className="admin-form-actions">
              <button type="button" onClick={() => copyLink('new', newActivationUrl)}>
                {copiedId === 'new' ? 'Link copiado!' : 'Copiar link pra mandar você mesma'}
              </button>
            </div>
          )}
          <div className="admin-form-actions">
            <button type="submit" disabled={creating}>
              {creating ? 'Criando...' : 'Criar acesso e enviar e-mail'}
            </button>
          </div>
        </form>
      </section>

      <section className="module-block">
        <h2>Todas as clientes</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="auth-error">{error}</p>}
        <ul className="entry-list admin-client-list">
          {users.map((u) => (
            <li key={u.id} className="admin-client-item">
              <div className="entry-desc">
                <strong>{u.name}</strong> — {u.email}
                <br />
                <span className="admin-status">{STATUS_LABELS[u.status] || u.status}</span>
                {u.role === 'admin' && <span className="admin-status"> · admin</span>}
                {u.role !== 'admin' && u.activationUrl && (
                  <>
                    {' · '}
                    <button className="link-button" onClick={() => copyLink(u.id, u.activationUrl)}>
                      {copiedId === u.id ? 'Link copiado!' : 'Copiar link de acesso'}
                    </button>
                  </>
                )}
                {u.role !== 'admin' && (
                  <div className="admin-checklist">
                    {products.map((p) => {
                      const hasIt = u.productIds.includes(p.id);
                      return (
                        <label key={p.id} className="admin-checklist-item">
                          <input
                            type="checkbox"
                            checked={hasIt}
                            onChange={() => toggleProduct(u.id, p.id, hasIt)}
                          />
                          {p.name}
                        </label>
                      );
                    })}
                  </div>
                )}
                {u.role !== 'admin' && phaseModules.length > 0 && (
                  <>
                    <span className="admin-status">Fases liberadas:</span>
                    <div className="admin-checklist">
                      {phaseModules.map((m) => {
                        const hasIt = u.moduleIds.includes(m.id);
                        return (
                          <label key={m.id} className="admin-checklist-item">
                            <input
                              type="checkbox"
                              checked={hasIt}
                              onChange={() => toggleModule(u.id, m.id, hasIt)}
                            />
                            {m.title}
                          </label>
                        );
                      })}
                    </div>
                  </>
                )}
                {u.role !== 'admin' && manipuladoModules.length > 0 && (
                  <>
                    <span className="admin-status">Manipulação Blindada liberada:</span>
                    <div className="admin-checklist">
                      {manipuladoModules.map((m) => {
                        const hasIt = u.moduleIds.includes(m.id);
                        return (
                          <label key={m.id} className="admin-checklist-item">
                            <input
                              type="checkbox"
                              checked={hasIt}
                              onChange={() => toggleModule(u.id, m.id, hasIt)}
                            />
                            {m.title}
                          </label>
                        );
                      })}
                    </div>
                  </>
                )}
                {u.role !== 'admin' && (
                  <div className="admin-actions">
                    <Link className="link-button" to={`/admin/clientes/${u.id}`}>
                      Ver acompanhamento
                    </Link>
                    <button
                      className="link-button"
                      onClick={() => setEditingDoc({ userId: u.id, kind: 'meal-plan' })}
                    >
                      Plano alimentar
                    </button>
                    <button
                      className="link-button"
                      onClick={() => setEditingDoc({ userId: u.id, kind: 'supplements' })}
                    >
                      Suplementação
                    </button>
                  </div>
                )}
                {editingDoc?.userId === u.id && (
                  <ClientDocEditor
                    userId={u.id}
                    kind={editingDoc.kind}
                    onClose={() => setEditingDoc(null)}
                  />
                )}
              </div>
              {u.role !== 'admin' && (
                <>
                  {u.status === 'inactive' ? (
                    <button className="link-button" onClick={() => reactivate(u.id)}>
                      Reativar
                    </button>
                  ) : (
                    <button className="link-button" onClick={() => revoke(u.id)}>
                      Revogar tudo
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
