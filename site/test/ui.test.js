function fetchPage(path) {
  return fetch(path).then(function (res) {
    if (!res.ok) throw new Error('Falha ao carregar ' + path + ': ' + res.status);
    return res.text();
  }).then(function (text) {
    return new DOMParser().parseFromString(text, 'text/html');
  });
}

function expectNavLinks(doc, expected) {
  var nav = doc.querySelector('nav');
  assert.ok(nav, 'Navegação presente na página');
  var hrefs = Array.from(nav.querySelectorAll('a')).map(function (link) {
    return link.getAttribute('href');
  });
  expected.forEach(function (href) {
    assert.ok(hrefs.indexOf(href) !== -1, 'Link de navegação encontrado: ' + href);
  });
}

it('tem navegação completa em todas as páginas principais', function () {
  var pages = [
    { path: '../index.html', expected: ['dashboard/dashboard.html', 'validacao/index.html', 'verificacao_publica/index.html', 'help/index.html', 'painel_admin/admin.html'] },
    { path: '../dashboard/dashboard.html', expected: ['../index.html', 'dashboard.html', '../validacao/index.html', '../verificacao_publica/index.html', '../help/index.html', '../painel_admin/admin.html'] },
    { path: '../validacao/index.html', expected: ['../index.html', '../dashboard/dashboard.html', 'index.html', '../verificacao_publica/index.html', '../help/index.html', '../painel_admin/admin.html'] },
    { path: '../verificacao_publica/index.html', expected: ['../index.html', '../dashboard/dashboard.html', '../validacao/index.html', '../help/index.html', '../painel_admin/admin.html', 'index.html'] },
    { path: '../painel_admin/admin.html', expected: ['../index.html', '../dashboard/dashboard.html', '../validacao/index.html', '../verificacao_publica/index.html', '../help/index.html', 'admin.html'] },
    { path: '../help/index.html', expected: ['../index.html', '../dashboard/dashboard.html', '../validacao/index.html', '../verificacao_publica/index.html', '../painel_admin/admin.html', 'index.html'] },
  ];

  return Promise.all(pages.map(function (page) {
    return fetchPage(page.path).then(function (doc) {
      expectNavLinks(doc, page.expected);
    });
  }));
});

it('exibe a página de ajuda com seções de operação para recursos críticos', function () {
  return fetchPage('../help/index.html').then(function (doc) {
    assert.ok(doc.querySelector('h1'), 'Página de ajuda tem título principal');
    assert.equal(doc.querySelector('h1').textContent.trim(), 'Ajuda e manual de uso', 'Título da ajuda correto');
    var sections = Array.from(doc.querySelectorAll('section.card h2')).map(function (h) {
      return h.textContent.trim();
    });
    assert.ok(sections.indexOf('Dashboard') !== -1, 'Seção Dashboard presente');
    assert.ok(sections.indexOf('Validação') !== -1, 'Seção Validação presente');
    assert.ok(sections.indexOf('Verificação pública') !== -1, 'Seção Verificação pública presente');
    assert.ok(sections.indexOf('Painel Admin') !== -1, 'Seção Painel Admin presente');
  });
});

it('oferece instruções de uso no dashboard, validação e verificação pública', function () {
  return Promise.all([
    fetchPage('../dashboard/dashboard.html'),
    fetchPage('../validacao/index.html'),
    fetchPage('../verificacao_publica/index.html'),
  ]).then(function (pages) {
    var dashboard = pages[0];
    var validation = pages[1];
    var publicPage = pages[2];

    assert.ok(dashboard.querySelector('#dashboard-status'), 'Dashboard mostra status da cadeia');
    assert.ok(dashboard.body.textContent.indexOf('Como usar o Dashboard') !== -1, 'Dashboard tem instruções de uso');
    assert.ok(validation.body.textContent.indexOf('Como usar a Validação') !== -1, 'Validação tem instruções de uso');
    assert.ok(publicPage.body.textContent.indexOf('Como usar a Verificação pública') !== -1, 'Verificação pública tem instruções de uso');
  });
});

it('provê formulário de login e ações administrativas na página Admin', function () {
  return fetchPage('../painel_admin/admin.html').then(function (doc) {
    assert.ok(doc.querySelector('form#form-login'), 'Formulário de login presente');
    assert.ok(doc.querySelector('input#user'), 'Campo de usuário presente');
    assert.ok(doc.querySelector('input#pass'), 'Campo de senha presente');
    assert.ok(doc.querySelector('button[type="submit"]'), 'Botão de login presente');
    assert.ok(doc.querySelector('button#btn-clear'), 'Botão de limpeza presente');
    assert.ok(doc.body.textContent.indexOf('users.json') !== -1, 'Aviso de segurança do Admin contém referência a users.json');
  });
});

it('usa rotas e cabeçalhos de navegação esperados em páginas de verificação', function () {
  return fetchPage('../verificacao_publica/index.html').then(function (doc) {
    assert.ok(doc.querySelector('#btn-generate-token'), 'Botão de geração de token presente');
    assert.ok(doc.querySelector('#btn-verify-token'), 'Botão de verificação de token presente');
    assert.ok(doc.querySelector('#proof-qr'), 'Elemento de QR code presente');
  });
});

it('oferece instruções passo a passo na ajuda do usuário', function () {
  return fetchPage('../help/index.html').then(function (doc) {
    var text = doc.body.textContent;
    assert.ok(text.indexOf('Clique em') !== -1, 'Manual usa linguagem de ação passoa a passo');
    assert.ok(text.indexOf('Gerar token público') !== -1, 'Manual instrui a gerar token público');
    assert.ok(text.indexOf('Importar cadeia') !== -1, 'Manual instrui como importar cadeia');
    assert.ok(text.indexOf('Limpar cadeia') !== -1, 'Manual instrui como limpar a cadeia no Admin');
  });
});
