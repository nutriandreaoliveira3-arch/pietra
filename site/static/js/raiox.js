/* Raio-X 360º do Emagrecimento™ — questionário em etapas.
   A definição das perguntas vem embutida na página (#rxq-def), gerada a
   partir de src/lib/raioxPerguntas.js. As respostas são salvas no navegador a
   cada alteração e no servidor a cada etapa. O resultado é calculado no
   servidor e só organiza o relato: não é diagnóstico nem prescrição. */
(function () {
  'use strict';

  var raiz = document.querySelector('[data-rxq]');
  var defEl = document.getElementById('rxq-def');
  if (!raiz || !defEl) return;

  var DEF = JSON.parse(defEl.textContent);
  var CFG = DEF.cfg;
  var ETAPAS = DEF.etapas;
  var API = '/api/raiox';
  var CHAVE = 'aao-raiox-v1';
  var titulo = document.getElementById('rxq-titulo');
  var progresso = document.querySelector('[data-rxq-progresso]');
  var rotuloEtapa = document.querySelector('[data-rxq-etapa]');
  var barra = document.querySelector('[data-rxq-barra]');

  var estado = { token: null, etapa: 0, respostas: {} };

  // ------------------------------------------------------------ utilidades
  function ler() {
    try { return JSON.parse(localStorage.getItem(CHAVE)) || null; } catch (e) { return null; }
  }
  function gravar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* modo privado */ }
  }
  function limpar() {
    try { localStorage.removeItem(CHAVE); } catch (e) { /* ignora */ }
  }
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstChild;
  }
  function api(metodo, caminho, corpo) {
    return fetch(API + caminho, {
      method: metodo,
      headers: corpo ? { 'Content-Type': 'application/json' } : {},
      body: corpo ? JSON.stringify(corpo) : undefined,
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (dados) {
        if (!r.ok) { var e = new Error(dados.error || 'Erro'); e.status = r.status; throw e; }
        return dados;
      });
    });
  }
  function topo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    titulo.focus({ preventScroll: true });
  }
  function obrigatoria(q) {
    if (q.obrigatoria === false) return false;
    return q.tipo === 'radio' || q.tipo === 'escala';
  }
  function visivel(q) {
    if (!q.mostrarSe) return true;
    return q.mostrarSe.em.indexOf(estado.respostas[q.mostrarSe.id]) !== -1;
  }
  function atualizarProgresso() {
    var n = estado.etapa;
    progresso.hidden = !(n >= 1 && n <= CFG.total);
    rotuloEtapa.textContent = 'Etapa ' + n + ' de ' + CFG.total;
    barra.setAttribute('aria-valuenow', String(n));
    barra.firstElementChild.style.width = Math.round(((n - 1) / CFG.total) * 100) + '%';
  }

  // ------------------------------------------------------------ início
  function telaInicio(erro) {
    estado.etapa = 0;
    atualizarProgresso();
    titulo.textContent = 'Antes de começar';
    raiz.innerHTML = '';
    raiz.appendChild(el(
      '<form class="rxq__form rxq__inicio" novalidate>' +
        '<div class="rxq__intro">' +
          '<p>O Raio-X 360º organiza informações sobre alimentação, comportamento, rotina, ambiente, saúde e adesão para identificar quais pontos merecem mais atenção no seu processo.</p>' +
          '<ul class="rxq__fatos"><li><strong>' + CFG.total + ' etapas</strong> · de 15 a 20 minutos</li><li><strong>Salva a cada etapa</strong> · dá para continuar depois neste aparelho</li><li><strong>Sem respostas certas</strong> · responda pensando na sua rotina real</li></ul>' +
          '<p class="nota">Não é diagnóstico médico, exame clínico nem avaliação psicológica, não gera prescrição e não promete resultados.</p>' +
        '</div>' +
        (erro ? '<p class="rxq__erro" role="alert">' + esc(erro) + '</p>' : '') +
        '<div class="campo"><label for="rxq-nome">Nome <span aria-hidden="true">*</span></label><input id="rxq-nome" name="nome" autocomplete="name" required maxlength="120"></div>' +
        '<div class="campo"><label for="rxq-email">E-mail <span aria-hidden="true">*</span></label><input id="rxq-email" name="email" type="email" autocomplete="email" required maxlength="160"></div>' +
        '<div class="campo"><label for="rxq-wa">WhatsApp <span class="opcional">(opcional)</span></label><input id="rxq-wa" name="whatsapp" type="tel" autocomplete="tel" inputmode="tel" maxlength="30"></div>' +
        '<div class="campo campo--hp" aria-hidden="true"><label for="rxq-site">Site</label><input id="rxq-site" name="site" tabindex="-1" autocomplete="off"></div>' +
        '<div class="campo campo--check"><input type="checkbox" id="rxq-consent" name="consentimento" required><label for="rxq-consent">Autorizo o tratamento dos meus dados, <strong>inclusive dados de saúde</strong>, exclusivamente para a análise nutricional e o contato sobre o acompanhamento, conforme a <a href="' + esc(CFG.privacidade) + '" target="_blank" rel="noopener">Política de Privacidade</a>.</label></div>' +
        '<div class="campo campo--check"><input type="checkbox" id="rxq-ciente" name="ciente" required><label for="rxq-ciente">Entendo que o Raio-X 360º não é diagnóstico nem substitui a avaliação individual.</label></div>' +
        '<div class="rxq__acoes"><button class="btn btn--primario" type="submit"><span>Começar meu Raio-X 360º</span></button></div>' +
      '</form>'
    ));
    var form = raiz.querySelector('form');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = form.elements;
      var faltas = [];
      if (f.nome.value.trim().length < 2) faltas.push(f.nome);
      if (!/^\S+@\S+\.\S+$/.test(f.email.value.trim())) faltas.push(f.email);
      if (!f.consentimento.checked) faltas.push(f.consentimento);
      if (!f.ciente.checked) faltas.push(f.ciente);
      form.querySelectorAll('[aria-invalid]').forEach(function (x) { x.removeAttribute('aria-invalid'); });
      if (faltas.length) {
        faltas.forEach(function (x) { x.setAttribute('aria-invalid', 'true'); });
        mostrarErro(form, 'Preencha nome e e-mail e marque as duas autorizações para continuar.');
        faltas[0].focus();
        return;
      }
      var botao = form.querySelector('button[type=submit]');
      botao.disabled = true;
      api('POST', '', {
        nome: f.nome.value.trim(), email: f.email.value.trim(), whatsapp: f.whatsapp.value.trim(),
        consentimento: true, ciente: true, site: f.site.value,
      }).then(function (r) {
        estado = { token: r.token, etapa: 1, respostas: {} };
        gravar();
        telaEtapa();
      }).catch(function (e) {
        botao.disabled = false;
        mostrarErro(form, e.status === 429 ? 'Muitas tentativas seguidas. Tente novamente em alguns minutos.' : 'Não foi possível começar agora. Verifique a conexão e tente novamente.');
      });
    });
  }

  function mostrarErro(form, msg) {
    var e = form.querySelector('.rxq__erro');
    if (!e) {
      e = el('<p class="rxq__erro" role="alert"></p>');
      form.insertBefore(e, form.querySelector('.rxq__acoes'));
    }
    e.textContent = msg;
  }

  // ------------------------------------------------------------ perguntas
  function htmlPergunta(q) {
    var id = 'q-' + q.id;
    var req = obrigatoria(q);
    var marca = req ? '' : ' <span class="opcional">(opcional)</span>';
    var ajuda = q.ajuda ? '<p class="rxq__ajuda" id="' + id + '-ajuda">' + esc(q.ajuda) + '</p>' : '';
    var desc = q.ajuda ? ' aria-describedby="' + id + '-ajuda"' : '';
    var v = estado.respostas[q.id];
    var corpo = '';
    if (q.tipo === 'radio' || q.tipo === 'checkbox') {
      var tipo = q.tipo === 'radio' ? 'radio' : 'checkbox';
      corpo = '<div class="rxq__opcoes' + (q.opcoes.length > 5 ? ' rxq__opcoes--grade' : '') + '">' + q.opcoes.map(function (o, i) {
        var marcado = tipo === 'radio' ? v === o.v : Array.isArray(v) && v.indexOf(o.v) !== -1;
        return '<label class="rxq__opcao"><input type="' + tipo + '" name="' + q.id + '" value="' + esc(o.v) + '"' +
          (o.exclusiva ? ' data-exclusiva' : '') + (marcado ? ' checked' : '') + (i === 0 && req ? ' required' : '') + '><span>' + esc(o.t) + '</span></label>';
      }).join('') + '</div>';
      return '<fieldset class="rxq__q" data-q="' + q.id + '"' + desc + '><legend>' + esc(q.rotulo) + marca + '</legend>' + ajuda + corpo + '<p class="rxq__erro-q" hidden>Escolha uma opção para continuar.</p></fieldset>';
    }
    if (q.tipo === 'escala') {
      var botoes = '';
      for (var n = 0; n <= 10; n++) {
        botoes += '<label class="rxq__nota"><input type="radio" name="' + q.id + '" value="' + n + '"' + (v === n ? ' checked' : '') + (n === 0 ? ' required' : '') + '><span>' + n + '</span></label>';
      }
      return '<fieldset class="rxq__q rxq__q--escala" data-q="' + q.id + '"' + desc + '><legend>' + esc(q.rotulo) + marca + '</legend>' + ajuda +
        '<div class="rxq__escala">' + botoes + '</div><div class="rxq__extremos" aria-hidden="true"><span>0 · ' + esc(q.min) + '</span><span>10 · ' + esc(q.max) + '</span></div>' +
        '<p class="rxq__erro-q" hidden>Escolha um número de 0 a 10.</p></fieldset>';
    }
    var valor = v == null ? '' : String(v);
    if (q.tipo === 'numero') {
      corpo = '<input id="' + id + '" name="' + q.id + '" type="text" inputmode="decimal" autocomplete="off" value="' + esc(valor.replace('.', ',')) + '" class="rxq__num"' + desc + '>';
    } else if (q.tipo === 'textarea') {
      corpo = '<textarea id="' + id + '" name="' + q.id + '" rows="3" maxlength="1500"' + desc + '>' + esc(valor) + '</textarea>';
    } else {
      corpo = '<input id="' + id + '" name="' + q.id + '" type="text" maxlength="300" value="' + esc(valor) + '"' + desc + '>';
    }
    return '<div class="rxq__q campo" data-q="' + q.id + '"><label for="' + id + '">' + esc(q.rotulo) + marca + '</label>' + ajuda + corpo + '</div>';
  }

  function coletar(form, etapa) {
    etapa.perguntas.forEach(function (q) {
      if (q.tipo === 'radio') {
        var r = form.querySelector('input[name="' + q.id + '"]:checked');
        if (r) estado.respostas[q.id] = r.value; else delete estado.respostas[q.id];
      } else if (q.tipo === 'escala') {
        var e = form.querySelector('input[name="' + q.id + '"]:checked');
        if (e) estado.respostas[q.id] = Number(e.value); else delete estado.respostas[q.id];
      } else if (q.tipo === 'checkbox') {
        var marcados = Array.prototype.map.call(form.querySelectorAll('input[name="' + q.id + '"]:checked'), function (x) { return x.value; });
        estado.respostas[q.id] = marcados;
      } else {
        var campo = form.elements[q.id];
        var t = campo ? campo.value.trim() : '';
        if (q.tipo === 'numero') t = t.replace(',', '.');
        if (t) estado.respostas[q.id] = q.tipo === 'numero' ? Number(t) : t; else delete estado.respostas[q.id];
      }
    });
  }

  function aplicarVisibilidade(form, etapa) {
    etapa.perguntas.forEach(function (q) {
      var bloco = form.querySelector('[data-q="' + q.id + '"]');
      if (bloco) bloco.hidden = !visivel(q);
    });
  }

  function validar(form, etapa) {
    var primeiro = null;
    etapa.perguntas.forEach(function (q) {
      var bloco = form.querySelector('[data-q="' + q.id + '"]');
      var erro = bloco && bloco.querySelector('.rxq__erro-q');
      var falta = visivel(q) && obrigatoria(q) && estado.respostas[q.id] === undefined;
      if (q.tipo === 'numero' && estado.respostas[q.id] !== undefined) {
        var n = estado.respostas[q.id];
        if (!isFinite(n) || n < q.min || n > q.max) {
          falta = true;
          delete estado.respostas[q.id];
          if (!bloco.querySelector('.rxq__erro-q')) bloco.appendChild(el('<p class="rxq__erro-q">Informe um número entre ' + q.min + ' e ' + q.max + ', ou deixe em branco.</p>'));
          erro = bloco.querySelector('.rxq__erro-q');
        }
      }
      if (erro) erro.hidden = !falta;
      if (bloco) bloco.classList.toggle('rxq__q--erro', falta);
      if (falta && !primeiro) primeiro = bloco;
    });
    return primeiro;
  }

  var salvando = null;
  function salvarServidor() {
    if (!estado.token) return Promise.resolve();
    salvando = api('PUT', '/' + estado.token, { etapa: estado.etapa, respostas: estado.respostas })
      .catch(function (e) { if (e.status === 404) { limpar(); } /* offline: fica salvo no aparelho */ });
    return salvando;
  }

  function telaEtapa() {
    var etapa = ETAPAS[estado.etapa - 1];
    atualizarProgresso();
    titulo.textContent = etapa.titulo;
    raiz.innerHTML = '';
    var ultima = estado.etapa === CFG.total;
    var form = el(
      '<form class="rxq__form' + (etapa.destaque ? ' rxq__form--destaque' : '') + '" novalidate>' +
        '<p class="rxq__intro-etapa">' + esc(etapa.intro) + '</p>' +
        etapa.perguntas.map(htmlPergunta).join('') +
        '<p class="rxq__status" data-rxq-status aria-live="polite"></p>' +
        '<div class="rxq__acoes">' +
          (estado.etapa > 1 ? '<button class="btn btn--secundario" type="button" data-voltar><span>Voltar</span></button>' : '<span></span>') +
          '<button class="btn btn--primario" type="submit"><span>' + (ultima ? 'Ver meu Raio-X 360º' : 'Próxima etapa') + '</span></button>' +
        '</div>' +
      '</form>'
    );
    raiz.appendChild(form);
    aplicarVisibilidade(form, etapa);

    var timer;
    form.addEventListener('change', function (ev) {
      var alvo = ev.target;
      // Opção "nenhuma" desmarca as outras (e vice-versa).
      if (alvo.type === 'checkbox') {
        var irmaos = form.querySelectorAll('input[name="' + alvo.name + '"]');
        if (alvo.checked && alvo.hasAttribute('data-exclusiva')) {
          irmaos.forEach(function (x) { if (x !== alvo) x.checked = false; });
        } else if (alvo.checked) {
          irmaos.forEach(function (x) { if (x.hasAttribute('data-exclusiva')) x.checked = false; });
        }
      }
      coletar(form, etapa);
      aplicarVisibilidade(form, etapa);
      var bloco = alvo.closest('[data-q]');
      if (bloco && bloco.classList.contains('rxq__q--erro')) validar(form, etapa);
      gravar();
    });
    form.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { coletar(form, etapa); gravar(); }, 400);
    });
    var voltar = form.querySelector('[data-voltar]');
    if (voltar) voltar.addEventListener('click', function () {
      coletar(form, etapa);
      estado.etapa -= 1;
      gravar();
      salvarServidor();
      telaEtapa();
      topo();
    });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      coletar(form, etapa);
      var erro = validar(form, etapa);
      if (erro) {
        form.querySelector('[data-rxq-status]').textContent = 'Algumas perguntas obrigatórias ficaram sem resposta.';
        erro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var foco = erro.querySelector('input, textarea');
        if (foco) foco.focus({ preventScroll: true });
        return;
      }
      if (ultima) return concluir(form);
      estado.etapa += 1;
      gravar();
      salvarServidor();
      telaEtapa();
      topo();
    });
  }

  function concluir(form) {
    var botao = form.querySelector('button[type=submit]');
    var status = form.querySelector('[data-rxq-status]');
    botao.disabled = true;
    status.textContent = 'Organizando o seu Raio-X 360º…';
    api('POST', '/' + estado.token + '/concluir', { respostas: estado.respostas })
      .then(function (r) {
        estado.etapa = CFG.total + 1;
        estado.resultado = r.resultado;
        gravar();
        telaResultado(r.resultado);
        topo();
      })
      .catch(function () {
        botao.disabled = false;
        status.textContent = 'Não foi possível finalizar agora. Suas respostas estão salvas neste aparelho: verifique a conexão e tente de novo.';
      });
  }

  // ------------------------------------------------------------ resultado
  function lista(itens, classe) {
    if (!itens || !itens.length) return '<p class="nota">Nada em destaque aqui, a partir do seu relato.</p>';
    return '<ul class="' + classe + '">' + itens.map(function (t) { return '<li>' + esc(t.charAt(0).toUpperCase() + t.slice(1)) + '</li>'; }).join('') + '</ul>';
  }

  function telaResultado(res) {
    progresso.hidden = true;
    titulo.textContent = 'Seu Raio-X 360º';
    var dims = res.dimensoes.filter(function (d) { return d.status; });
    raiz.innerHTML = '';
    raiz.appendChild(el(
      '<div class="rxr">' +
        '<section class="rxr__perfil" aria-labelledby="rxr-perfil"><p class="rx__marca">Seu perfil de emagrecimento</p><h2 id="rxr-perfil" class="sr-only">Seu perfil de emagrecimento</h2><p>' + esc(res.perfil) + '</p></section>' +
        '<section aria-labelledby="rxr-painel"><h2 id="rxr-painel">Painel das dimensões</h2>' +
          '<ul class="rxr__painel">' + dims.map(function (d) {
            return '<li class="rxr__dim rxr__dim--' + d.status + '"><span class="rxr__nome">' + esc(d.nome) + '</span><span class="selo selo--' + d.status + '">' + esc(d.statusNome) + '</span></li>';
          }).join('') + '</ul>' +
          '<p class="nota">Os status organizam o que você relatou. Não são diagnósticos.</p></section>' +
        '<section aria-labelledby="rxr-top"><h2 id="rxr-top">Os 3 principais pontos para trabalhar agora</h2>' +
          (res.prioridades.length ? '<ol class="rxr__top">' + res.prioridades.map(function (p) { return '<li><strong>' + esc(p.nome) + '</strong></li>'; }).join('') + '</ol>' : '<p class="nota">Seu relato não destacou pontos críticos. A consulta ajuda a definir ajustes finos.</p>') +
        '</section>' +
        '<div class="rxr__duas">' +
          '<section aria-labelledby="rxr-fortes"><h2 id="rxr-fortes">Seus pontos fortes</h2>' + lista(res.pontosFortes, 'rxr__lista rxr__lista--fortes') + '</section>' +
          '<section aria-labelledby="rxr-barreiras"><h2 id="rxr-barreiras">Principais barreiras</h2>' + lista(res.barreiras, 'rxr__lista') + '</section>' +
        '</div>' +
        (res.prioridades.length ? '<section aria-labelledby="rxr-proximas"><h2 id="rxr-proximas">Próximas prioridades</h2><ul class="rxr__proximas">' + res.prioridades.map(function (p) {
          return '<li><h3>' + esc(p.nome) + '</h3><p>' + esc(p.texto) + '</p></li>';
        }).join('') + '</ul></section>' : '') +
        (res.cuidados && res.cuidados.length ? '<section class="rxr__cuidados" aria-labelledby="rxr-cuidados"><h2 id="rxr-cuidados">Um cuidado a mais</h2>' + res.cuidados.map(function (c) { return '<p>' + esc(c) + '</p>'; }).join('') + '</section>' : '') +
        '<p class="rxr__aviso">Este resumo organiza as informações que você relatou. Não é diagnóstico, não é prescrição e não substitui a avaliação profissional. Suas respostas completas ficam disponíveis para a Andréa, que faz a análise individual no atendimento.</p>' +
        '<div class="rxr__cta">' +
          '<p class="rxr__cta-titulo">O próximo passo é transformar este Raio-X em estratégia.</p>' +
          '<div class="acoes acoes--centro">' +
            (CFG.agendar ? '<a class="btn btn--ouro" href="' + esc(CFG.agendar) + '" target="_blank" rel="noopener" data-cta="raiox-resultado-agendar"><span>Quero agendar meu atendimento</span><span class="sr-only"> (abre o WhatsApp em nova aba)</span></a>' : '') +
            '<a class="btn btn--contorno-ouro" href="' + esc(CFG.atendimento) + '" data-cta="raiox-resultado-atendimento"><span>Conhecer os formatos de atendimento</span></a>' +
          '</div>' +
        '</div>' +
        '<p class="centro"><button class="btn btn--link" type="button" data-novo>Começar um novo Raio-X neste aparelho</button></p>' +
      '</div>'
    ));
    raiz.querySelector('[data-novo]').addEventListener('click', function () {
      if (!window.confirm('Começar um novo Raio-X? O resultado atual continua salvo para a Andréa, mas deixa de aparecer neste aparelho.')) return;
      limpar();
      estado = { token: null, etapa: 0, respostas: {} };
      telaInicio();
      topo();
    });
  }

  // ------------------------------------------------------------ início
  function iniciar() {
    var salvo = ler();
    if (!salvo || !salvo.token) return telaInicio();
    estado = salvo;
    if (estado.resultado) return telaResultado(estado.resultado);
    // Confere com o servidor (outro dispositivo pode ter concluído, ou o
    // registro pode ter sido excluído a pedido).
    api('GET', '/' + estado.token).then(function (r) {
      if (r.status === 'concluido' && r.resultado) {
        estado.resultado = r.resultado;
        gravar();
        return telaResultado(r.resultado);
      }
      estado.respostas = Object.assign({}, r.respostas, estado.respostas);
      estado.etapa = Math.max(1, Math.min(CFG.total, estado.etapa || r.etapa || 1));
      gravar();
      telaEtapa();
    }).catch(function (e) {
      if (e.status === 404) { limpar(); estado = { token: null, etapa: 0, respostas: {} }; return telaInicio(); }
      // Sem conexão: continua do que está salvo no aparelho.
      estado.etapa = Math.max(1, Math.min(CFG.total, estado.etapa || 1));
      telaEtapa();
    });
  }

  iniciar();
})();
