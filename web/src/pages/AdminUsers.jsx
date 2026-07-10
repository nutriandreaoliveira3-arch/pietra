import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [productIds, setProductIds] = useState([]);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    Promise.all([api.adminUsers(), api.products()])
      .then(([usersData, productsData]) => {
        setUsers(usersData.users);
        setProducts(productsData.products);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function addUser(e) {
    e.preventDefault();
    setCreating(true);
    setCreateError('');
    setSuccessMsg('');
    try {
      await api.adminCreateUser({ name, email, productIds });
      setSuccessMsg(`Conta criada! E-mail de ativação enviado para ${email}.`);
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

  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div className="page">
      <h1>Clientes</h1>
      <p className="page-subtitle">Cadastrar e gerenciar acessos manualmente</p>

      <section className="module-block admin-module-block">
        <h2>Nova cliente</h2>
        <p className="module-desc">
          Use isso para venda direta, cortesia ou acesso fora da Greenn. A cliente recebe um e-mail
          de ativação igual ao de uma compra normal.
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
