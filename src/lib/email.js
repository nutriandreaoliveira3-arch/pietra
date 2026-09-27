const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendActivationEmail({ to, name, activationToken }) {
  if (!resend) {
    console.warn(`RESEND_API_KEY não configurado — e-mail de ativação para ${to} não foi enviado.`);
    return;
  }

  const activationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/definir-senha?token=${activationToken}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'BLINDADA <onboarding@resend.dev>',
    to,
    subject: 'Bem-vinda ao Emagrecimento Blindado — crie sua senha de acesso',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#1a1a1a;">Bem-vinda, ${name}!</h2>
        <p>Sua inscrição no <strong>Emagrecimento Blindado</strong> foi confirmada.</p>
        <p>Crie sua senha para acessar o app clicando no botão abaixo:</p>
        <p>
          <a href="${activationUrl}" style="display:inline-block;background:#1a1a1a;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;">
            Criar minha senha
          </a>
        </p>
        <p style="font-size:13px;color:#666;">Se o botão não funcionar, copie e cole este link no navegador:<br>${activationUrl}</p>
      </div>
    `,
  });
}

async function sendManipuladoOrderEmail({ clientName, clientEmail, formulaTitles }) {
  const pharmacyEmails = (process.env.MANIPULACAO_PHARMACY_EMAIL || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
  if (pharmacyEmails.length === 0) {
    console.warn('MANIPULACAO_PHARMACY_EMAIL não configurado — pedido de manipulado não foi enviado por e-mail.');
    return;
  }
  if (!resend) {
    console.warn(`RESEND_API_KEY não configurado — pedido de manipulado para ${pharmacyEmails.join(', ')} não foi enviado.`);
    return;
  }

  const itemsHtml = formulaTitles.map((title) => `<li>${title}</li>`).join('');

  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'BLINDADA <onboarding@resend.dev>',
    to: pharmacyEmails,
    subject: `Novo pedido de manipulado — ${clientName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#1a1a1a;">Novo pedido de manipulado</h2>
        <p><strong>Paciente:</strong> ${clientName}${clientEmail ? ` (${clientEmail})` : ''}</p>
        <p><strong>Fórmulas liberadas:</strong></p>
        <ul>${itemsHtml}</ul>
        <p style="font-size:13px;color:#666;">Enviado automaticamente pelo app Emagrecimento Blindado.</p>
      </div>
    `,
  });
}

function manipuladoWhatsappUrl({ clientName, formulaTitles }) {
  const phone = (process.env.MANIPULACAO_PHARMACY_WHATSAPP || '5511949226745').replace(/\D/g, '');
  const lines = [
    `Olá! Preciso preparar as fórmulas manipuladas abaixo para a paciente ${clientName}:`,
    ...formulaTitles.map((title) => `- ${title}`),
  ];
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
}

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Aviso de nova mensagem do formulário de contato do site institucional.
async function sendSiteContactEmail({ nome, email, whatsapp, assunto, mensagem }) {
  const to = (process.env.SITE_CONTATO_EMAIL || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
  if (to.length === 0) {
    console.warn('SITE_CONTATO_EMAIL não configurado — mensagem do site salva só no banco (tabela site_contacts).');
    return;
  }
  if (!resend) {
    console.warn('RESEND_API_KEY não configurado — mensagem do site salva só no banco (tabela site_contacts).');
    return;
  }
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'BLINDADA <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `Contato pelo site — ${assunto}`,
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; color:#2F3330;">
        <h2 style="font-weight:600;">Nova mensagem pelo site</h2>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        ${whatsapp ? `<p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>` : ''}
        <p><strong>Assunto:</strong> ${escapeHtml(assunto)}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="white-space:pre-wrap;background:#F3EEE6;padding:12px 14px;border-radius:8px;">${escapeHtml(mensagem)}</p>
        <p style="font-size:13px;color:#5A4A42;">Responda este e-mail para falar direto com a pessoa.</p>
      </div>
    `,
  });
}

// Aviso de Raio-X concluído. De propósito, sem respostas nem resultado no
// e-mail (dados de saúde ficam só no sistema, acessados pela área admin).
async function sendRaioxEmail({ nome, email, whatsapp }) {
  const to = (process.env.SITE_CONTATO_EMAIL || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
  if (to.length === 0 || !resend) {
    console.warn('SITE_CONTATO_EMAIL ou RESEND_API_KEY não configurado — Raio-X salvo só no banco (tabela raiox_respostas).');
    return;
  }
  const painel = `${process.env.APP_URL || 'http://localhost:3000'}/admin/raio-x`;
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'BLINDADA <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `Novo Raio-X 360º concluído — ${nome}`,
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; color:#2F3330;">
        <h2 style="font-weight:600;">Novo Raio-X 360º do Emagrecimento</h2>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        ${whatsapp ? `<p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>` : ''}
        <p>As respostas e o painel estão na área administrativa (por segurança, não vão por e-mail):</p>
        <p><a href="${painel}" style="display:inline-block;background:#2F3330;color:#ffffff;padding:12px 22px;border-radius:8px;text-decoration:none;">Abrir Raio-X no painel</a></p>
      </div>
    `,
  });
}

module.exports = { sendActivationEmail, sendManipuladoOrderEmail, manipuladoWhatsappUrl, sendSiteContactEmail, sendRaioxEmail };
