// Comportamentos do site: menu, cabeçalho, WhatsApp flutuante, formulário
// de contato e revelação suave das seções. Sem dependências.
(function () {
  'use strict';

  var guardar = {
    ler: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    gravar: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* sem armazenamento */ } },
  };

  // ---------------------------------------------------------- menu mobile
  var botao = document.querySelector('[data-menu-botao]');
  var menu = document.querySelector('[data-menu]');
  function fecharMenu(devolverFoco) {
    if (!botao || botao.getAttribute('aria-expanded') !== 'true') return;
    botao.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-aberto');
    document.body.classList.remove('menu-aberto');
    if (devolverFoco) botao.focus();
  }
  if (botao && menu) {
    botao.addEventListener('click', function () {
      var abrir = botao.getAttribute('aria-expanded') !== 'true';
      if (!abrir) return fecharMenu(false);
      botao.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-aberto');
      document.body.classList.add('menu-aberto');
      var primeiro = menu.querySelector('a');
      if (primeiro) primeiro.focus();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharMenu(true); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) fecharMenu(false); });
    window.matchMedia('(min-width: 1200px)').addEventListener('change', function () { fecharMenu(false); });
  }

  // ---------------------------------------------------------- cabeçalho
  var topo = document.querySelector('[data-topo]');
  function aoRolar() { if (topo) topo.classList.toggle('is-rolado', window.scrollY > 8); }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  // ---------------------------------------------------------- WhatsApp flutuante
  // Aparece só depois do primeiro bloco (o hero já tem os CTAs), some quando
  // o rodapé, o CTA final ou o formulário estão na tela, e pode ser minimizado.
  var wa = document.querySelector('[data-wa]');
  if (wa && 'IntersectionObserver' in window) {
    var CHAVE = 'aao-wa-min';
    var min = wa.querySelector('[data-wa-min]');
    function minimizar(sim) {
      wa.classList.toggle('is-min', sim);
      if (min) min.setAttribute('aria-pressed', sim ? 'true' : 'false');
    }
    if (guardar.ler(CHAVE) === '1') minimizar(true);
    if (min) min.addEventListener('click', function () {
      minimizar(true);
      guardar.gravar(CHAVE, '1');
      var link = wa.querySelector('a');
      if (link) link.focus();
    });
    document.body.classList.add('tem-wa');
    wa.hidden = false;
    wa.classList.add('is-oculto');

    var inicio = document.querySelector('.hero, .cab-interno');
    var conflitos = document.querySelectorAll('.rodape, [data-sem-flutuante]');
    var passouInicio = !inicio;
    var visiveis = new Set();
    function atualizar() {
      var mostrar = passouInicio && visiveis.size === 0;
      wa.classList.toggle('is-oculto', !mostrar);
      wa.setAttribute('aria-hidden', mostrar ? 'false' : 'true');
      wa.querySelectorAll('a,button').forEach(function (el) { el.tabIndex = mostrar ? 0 : -1; });
    }
    if (inicio) {
      new IntersectionObserver(function (ents) {
        passouInicio = !ents[0].isIntersecting && ents[0].boundingClientRect.top < 0;
        atualizar();
      }).observe(inicio);
    }
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) visiveis.add(e.target); else visiveis.delete(e.target); });
      atualizar();
    });
    conflitos.forEach(function (el) { obs.observe(el); });
    atualizar();
  }

  // ---------------------------------------------------------- formulário de contato
  var form = document.querySelector('[data-form]');
  var status = document.querySelector('[data-form-status]');
  function mostrarStatus(tipo, html) {
    status.className = 'form-status is-' + tipo;
    status.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
    status.innerHTML = html;
    status.focus();
  }
  var ROTULOS = { nome: 'Nome', email: 'E-mail', whatsapp: 'WhatsApp', assunto: 'Assunto', mensagem: 'Mensagem', consentimento: 'Consentimento' };
  function validar(campo) {
    var v = campo.type === 'checkbox' ? campo.checked : campo.value.trim();
    var ok = true;
    if (campo.name === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    else if (campo.name === 'whatsapp') ok = v === '' || /^[\d\s()+.-]{8,30}$/.test(v);
    else if (campo.name === 'mensagem') ok = v.length >= 10;
    else if (campo.required) ok = !!v;
    campo.setAttribute('aria-invalid', ok ? 'false' : 'true');
    return ok;
  }
  if (form && status) {
    // Retorno sem JavaScript (o servidor redireciona com ?enviado=1 ou ?erro=1).
    var q = new URLSearchParams(location.search);
    if (q.get('enviado') === '1') mostrarStatus('sucesso', form.dataset.sucesso);
    if (q.get('erro') === '1') mostrarStatus('erro', form.dataset.erro);

    var campos = Array.prototype.slice.call(form.querySelectorAll('input:not([type=hidden]):not([name=site]), select, textarea'));
    campos.forEach(function (c) {
      c.addEventListener('blur', function () { if (c.value || c.getAttribute('aria-invalid')) validar(c); });
      c.addEventListener('input', function () { if (c.getAttribute('aria-invalid') === 'true') validar(c); });
      c.addEventListener('change', function () { if (c.getAttribute('aria-invalid') === 'true') validar(c); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalidos = campos.filter(function (c) { return !validar(c); });
      if (invalidos.length) {
        mostrarStatus('erro', 'Revise ' + (invalidos.length === 1 ? 'o campo' : 'os campos') + ' abaixo:<ul>' +
          invalidos.map(function (c) { return '<li><a href="#' + c.id + '">' + ROTULOS[c.name] + '</a></li>'; }).join('') + '</ul>');
        return;
      }
      var enviar = form.querySelector('[data-form-botao]');
      var textoOriginal = enviar.innerHTML;
      enviar.disabled = true;
      enviar.innerHTML = '<span>Enviando…</span>';
      var dados = {};
      new FormData(form).forEach(function (v, k) { dados[k] = v; });
      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(dados),
      })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function () {
          form.reset();
          campos.forEach(function (c) { c.removeAttribute('aria-invalid'); });
          mostrarStatus('sucesso', form.dataset.sucesso);
          if (window.gtag) window.gtag('event', 'generate_lead', { method: 'formulario_contato' });
        })
        .catch(function () { mostrarStatus('erro', form.dataset.erro); })
        .then(function () { enviar.disabled = false; enviar.innerHTML = textoOriginal; });
    });
  }

  // ---------------------------------------------------------- medição de cliques (se houver GA4)
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-cta]');
    if (a && window.gtag) window.gtag('event', 'cta_click', { cta: a.getAttribute('data-cta') });
  });

  // ---------------------------------------------------------- revelação suave
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var alvos = document.querySelectorAll('.secao .cab-secao, .pilares, .etapas, .comparativo, .sinais, .midias, .depos');
    var rev = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visivel'); rev.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('revelar'); rev.observe(el); }
    });
  }
})();
