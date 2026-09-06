import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Olá, {user?.name?.split(' ')[0] || 'bem-vinda'}</h1>
      <p className="page-subtitle">O que você quer fazer hoje?</p>
      <a
        href="https://claude.ai/code/artifact/046f8cc5-560d-4008-87a5-d2a63b2b5070"
        target="_blank"
        rel="noopener noreferrer"
        className="elite-banner"
      >
        <span className="elite-banner-eyebrow">Novidade</span>
        <span className="elite-banner-title">Emagrecimento Blindado Elite</span>
        <span className="elite-banner-desc">
          Um acompanhamento premium e personalizado, com suporte próximo em cada etapa. Conheça a proposta →
        </span>
      </a>
      <div className="card-grid">
        <Link to="/modulos" className="nav-card">
          <span className="nav-card-title">Protocolo</span>
          <span className="nav-card-desc">Módulos e aulas do Emagrecimento Blindado</span>
        </Link>
        <Link to="/manipulacao-blindada" className="nav-card">
          <span className="nav-card-title">Manipulação Blindada</span>
          <span className="nav-card-desc">Suas fórmulas manipuladas, liberadas pela Andréa</span>
        </Link>
        <Link to="/diario" className="nav-card">
          <span className="nav-card-title">Diário alimentar</span>
          <span className="nav-card-desc">Registre suas refeições do dia</span>
        </Link>
        <Link to="/progresso" className="nav-card">
          <span className="nav-card-title">Progresso</span>
          <span className="nav-card-desc">Peso e medidas ao longo do tempo</span>
        </Link>
        <Link to="/plano-alimentar" className="nav-card">
          <span className="nav-card-title">Plano alimentar</span>
          <span className="nav-card-desc">Seu plano, montado pela Andréa</span>
        </Link>
        <Link to="/suplementacao" className="nav-card">
          <span className="nav-card-title">Suplementação</span>
          <span className="nav-card-desc">Sua indicação de suplementos</span>
        </Link>
        <Link to="/agua" className="nav-card">
          <span className="nav-card-title">Água</span>
          <span className="nav-card-desc">Bata sua meta do dia</span>
        </Link>
      </div>
    </div>
  );
}
