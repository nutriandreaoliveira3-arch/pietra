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

module.exports = { sendActivationEmail };
