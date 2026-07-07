import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Layout() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="page">Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="brand">BLINDADA</span>
        <button className="link-button" onClick={logout}>
          Sair
        </button>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        <NavLink to="/" end>
          Início
        </NavLink>
        <NavLink to="/modulos">Protocolo</NavLink>
        <NavLink to="/diario">Diário</NavLink>
        <NavLink to="/progresso">Progresso</NavLink>
        <NavLink to="/assistente">BLIM</NavLink>
      </nav>
    </div>
  );
}
