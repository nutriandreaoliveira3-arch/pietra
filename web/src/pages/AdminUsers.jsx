import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const STATUS_LABELS = {
  active: 'Ativa',
  pending: 'Aguardando ativação',
  inactive: 'Inativa',
};

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    api
      .adminUsers()
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function addUser(e) {
    e.preventDefault();
    setCreating(true);
    setCreateError('');
    setSuccessMsg('');
    try {
      await api.adminCreateUser({ name, email });
      setSuccessMsg(`Conta criada! E-mail de ativação enviado para ${email}.`);
      setName('');
      setEmail('');
      load();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function revoke(userId) {
    if (!confirm('Revogar o acesso desta cliente?')) return;
    await api.adminRevokeUser(userId);
    load();
  }

  async function reactivate(userId) {
    await api.adminReactivateUser(userId);
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
        <ul className="entry-list">
          {users.map((u) => (
            <li key={u.id}>
              <div className="entry-desc">
                <strong>{u.name}</strong> — {u.email}
                <br />
                <span className="admin-status">{STATUS_LABELS[u.status] || u.status}</span>
                {u.role === 'admin' && <span className="admin-status"> · admin</span>}
              </div>
              {u.role !== 'admin' && (
                <>
                  {u.status === 'inactive' ? (
                    <button className="link-button" onClick={() => reactivate(u.id)}>
                      Reativar
                    </button>
                  ) : (
                    <button className="link-button" onClick={() => revoke(u.id)}>
                      Revogar
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
