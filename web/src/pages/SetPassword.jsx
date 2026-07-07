import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SetPassword() {
  const { activate } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    setSubmitting(true);
    try {
      await activate(token, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1>Bem-vinda à BLINDADA</h1>
        <p className="auth-subtitle">Crie sua senha de acesso ao Emagrecimento Blindado</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nova senha
            <input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label>
            Confirmar senha
            <input type="password" minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? 'Criando...' : 'Criar senha e entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
