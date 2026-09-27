import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

// Raio-X 360º do Emagrecimento™: respostas enviadas pelo site. Contém dados
// de saúde — só a administradora acessa.

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(`${value.replace(' ', 'T')}Z`);
  return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function whatsappLink(numero) {
  const digits = (numero || '').replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits.length <= 11 ? `55${digits}` : digits}`;
}

function StatusBadge({ item, totalEtapas }) {
  if (item.status === 'concluido') return <span className="rx-badge rx-badge--ok">Concluído</span>;
  return <span className="rx-badge">Em andamento · etapa {Math.min(item.etapa, totalEtapas)} de {totalEtapas}</span>;
}

function RaioXList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.adminRaioX().then(setData).catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="auth-error">{error}</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <>
      <h1>Raio-X 360º</h1>
      <p className="page-subtitle">
        Questionários preenchidos no site. Os de “em andamento” ainda não foram finalizados pela paciente.
      </p>
      {data.itens.length === 0 && <p>Nenhum Raio-X recebido ainda.</p>}
      <ul className="rx-list">
        {data.itens.map((item) => (
          <li key={item.id}>
            <Link to={`/admin/raio-x/${item.id}`} className="rx-list-item">
              <span className="rx-list-name">{item.nome}</span>
              <span className="rx-list-meta">{item.email}{item.whatsapp ? ` · ${item.whatsapp}` : ''}</span>
              <span className="rx-list-meta">
                <StatusBadge item={item} totalEtapas={data.totalEtapas} /> · {formatDate(item.concluido_em || item.created_at)}
              </span>
              {item.prioridades.length > 0 && (
                <span className="rx-list-meta">Prioridades: {item.prioridades.join(', ')}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function RaioXDetail({ id }) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.adminRaioXDetail(id).then(setData).catch((err) => setError(err.message));
  }, [id]);

  async function remove() {
    if (!window.confirm(`Excluir definitivamente o Raio-X de ${data.nome}? Use quando a paciente pedir a exclusão dos dados.`)) return;
    try {
      await api.adminRaioXRemove(id);
      navigate('/admin/raio-x');
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p className="auth-error">{error}</p>;
  if (!data) return <p>Carregando...</p>;

  const { resultado } = data;
  const wa = whatsappLink(data.whatsapp);

  return (
    <>
      <p><Link to="/admin/raio-x">← Todos os Raio-X</Link></p>
      <h1>{data.nome}</h1>
      <p className="page-subtitle">
        {data.email}
        {wa && <> · <a href={wa} target="_blank" rel="noopener noreferrer">{data.whatsapp}</a></>}
      </p>
      <p className="rx-list-meta">
        <StatusBadge item={data} totalEtapas={data.totalEtapas} /> · início {formatDate(data.criadoEm)}
        {data.concluidoEm && <> · concluído {formatDate(data.concluidoEm)}</>} · consentimento {formatDate(data.consentimentoEm)}
      </p>
      {data.status !== 'concluido' && (
        <p className="admin-hint">Questionário incompleto: o painel abaixo considera só as respostas dadas até agora.</p>
      )}

      <section className="rx-section rx-perfil">
        <h2>Perfil de emagrecimento</h2>
        <p>{resultado.perfil}</p>
      </section>

      <section className="rx-section">
        <h2>Painel das dimensões</h2>
        <ul className="rx-dims">
          {resultado.dimensoes.filter((d) => d.status).map((d) => (
            <li key={d.id}>
              <span>{d.nome}</span>
              <span className={`rx-badge rx-badge--${d.status}`}>{d.statusNome}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rx-section">
        <h2>3 principais pontos para trabalhar agora</h2>
        {resultado.prioridades.length ? (
          <ol>{resultado.prioridades.map((p) => <li key={p.id}><strong>{p.nome}</strong> — {p.texto}</li>)}</ol>
        ) : <p>Nenhum ponto crítico no relato.</p>}
      </section>

      <div className="rx-two">
        <section className="rx-section">
          <h2>Pontos fortes</h2>
          <ul>{resultado.pontosFortes.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
        <section className="rx-section">
          <h2>Principais barreiras</h2>
          <ul>{resultado.barreiras.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      </div>

      {resultado.cuidados.length > 0 && (
        <section className="rx-section rx-cuidados">
          <h2>Sinais para encaminhamento</h2>
          <ul>{resultado.cuidados.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      )}

      <h2 className="rx-answers-title">Respostas completas</h2>
      {data.respostas.length === 0 && <p>Nenhuma resposta salva ainda.</p>}
      {data.respostas.map((grupo) => (
        <details key={grupo.titulo} className="rich-text-section" open>
          <summary>{grupo.titulo}</summary>
          <dl className="rx-answers">
            {grupo.itens.map((item) => (
              <div key={item.pergunta}>
                <dt>{item.pergunta}</dt>
                <dd>{item.resposta}</dd>
              </div>
            ))}
          </dl>
        </details>
      ))}

      <p className="rx-note">
        O painel organiza o relato da paciente. Não é diagnóstico nem prescrição: serve de apoio para a avaliação individual.
      </p>
      <button type="button" className="link-button rx-delete" onClick={remove}>
        Excluir este Raio-X (pedido de exclusão de dados)
      </button>
    </>
  );
}

export default function AdminRaioX() {
  const { user } = useAuth();
  const { id } = useParams();
  if (user && user.role !== 'admin') return <Navigate to="/" replace />;
  return id ? <RaioXDetail id={id} /> : <RaioXList />;
}
