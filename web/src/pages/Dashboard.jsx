import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Olá, {user?.name?.split(' ')[0] || 'bem-vinda'}</h1>
      <p className="page-subtitle">O que você quer fazer hoje?</p>
      <div className="card-grid">
        <Link to="/modulos" className="nav-card">
          <span className="nav-card-title">Protocolo</span>
          <span className="nav-card-desc">Módulos e aulas do Emagrecimento Blindado</span>
        </Link>
        <Link to="/diario" className="nav-card">
          <span className="nav-card-title">Diário alimentar</span>
          <span className="nav-card-desc">Registre suas refeições do dia</span>
        </Link>
        <Link to="/progresso" className="nav-card">
          <span className="nav-card-title">Progresso</span>
          <span className="nav-card-desc">Peso e medidas ao longo do tempo</span>
        </Link>
      </div>
    </div>
  );
}
