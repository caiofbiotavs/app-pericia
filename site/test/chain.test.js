it('adiciona o bloco gênese corretamente', function () {
  PericiaChain.LocalChain.clearStorage();
  var chain = new PericiaChain.LocalChain([]);
  return chain.addGenesis().then(function (result) {
    assert.equal(result.blocks.length, 1, 'Há exatamente um bloco gênese');
    var genesis = result.blocks[0];
    assert.equal(genesis.index, 0, 'Índice do bloco gênese é 0');
    assert.equal(genesis.previousHash, '0', 'previousHash do bloco gênese é 0');
    assert.ok(typeof genesis.hash === 'string' && genesis.hash.length === 64, 'Hash do bloco gênese é um SHA-256 hexadecimal');
  });
});

it('adiciona novo bloco com elo digno', function () {
  PericiaChain.LocalChain.clearStorage();
  var chain = new PericiaChain.LocalChain([]);
  return chain.addGenesis().then(function () {
    return chain.addBlock({ tipo: 'evidencia', descricao: 'Documento digitalizado' });
  }).then(function (block) {
    assert.equal(block.index, 1, 'Novo bloco tem índice 1');
    assert.equal(block.previousHash, chain.blocks[0].hash, 'Bloco aponta para hash do bloco anterior');
    assert.ok(block.hash.length === 64, 'Novo bloco contém hash SHA-256');
  });
});

it('valida cadeia íntegra como OK', function () {
  PericiaChain.LocalChain.clearStorage();
  var chain = new PericiaChain.LocalChain([]);
  return chain.addGenesis().then(function () {
    return chain.addBlock({ tipo: 'registro', descricao: 'Amostra coletada' });
  }).then(function () {
    return chain.validate();
  }).then(function (result) {
    assert.equal(result.ok, true, 'Cadeia íntegra retorna ok verdadeiro');
    assert.equal(result.errors.length, 0, 'Nenhum erro durante validação de cadeia íntegra');
  });
});

it('detecta quando um bloco é adulterado', function () {
  PericiaChain.LocalChain.clearStorage();
  var chain = new PericiaChain.LocalChain([]);
  return chain.addGenesis().then(function () {
    return chain.addBlock({ tipo: 'registro', descricao: 'Amostra coletada' });
  }).then(function () {
    chain.blocks[1].data = { tipo: 'registro', descricao: 'Amostra alterada' };
    return chain.validate();
  }).then(function (result) {
    assert.equal(result.ok, false, 'Cadeia adulterada retorna ok falso');
    assert.ok(result.errors.some(function (e) { return e.indexOf('hash não confere') !== -1; }), 'Detecta hash não conferindo');
  });
});

it('exporta e importa JSON de cadeia corretamente', function () {
  var chain = new PericiaChain.LocalChain([]);
  return chain.addGenesis().then(function () {
    var json = chain.exportJson();
    var imported = PericiaChain.LocalChain.fromJsonString(json);
    assert.equal(imported.blocks.length, 1, 'Importação recupera um bloco gênese');
    assert.equal(imported.blocks[0].index, 0, 'Bloco importado mantém índice 0');
  });
});

it('calcula SHA-256 de um buffer corretamente', function () {
  var encoder = new TextEncoder();
  return PericiaChain.sha256hexBuffer(encoder.encode('hello').buffer).then(function (hash) {
    assert.equal(hash, '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 'Hash do buffer corresponde ao SHA-256 de "hello"');
  });
});

it('gera token público de prova a partir da cadeia', function () {
  var chain = new PericiaChain.LocalChain([]);
  return chain.addGenesis().then(function () {
    return chain.getProofToken();
  }).then(function (token) {
    assert.ok(token.indexOf('pericia-proof:') === 0, 'Token de prova começa com prefixo correto');
    assert.ok(token.length > 0, 'Token de prova não deve estar vazio');
  });
});

it('monta payload de upload para Pinata corretamente', function () {
  var chain = new PericiaChain.LocalChain([]);
  return chain.addGenesis().then(function () {
    return chain.pinataPayloadForChain();
  }).then(function (payload) {
    assert.equal(payload.type, 'pericia-chain', 'Payload deve incluir tipo de documento');
    assert.ok(payload.proofToken.indexOf('pericia-proof:') === 0, 'Payload inclui token de prova');
    assert.equal(Array.isArray(payload.chain), true, 'Payload contém array de blocos');
  });
});

it('fornece cabeçalho de autenticação Pinata com JWT', function () {
  window.PINATA_CONFIG = { jwt: 'dummy-jwt-token' };
  var headers = PericiaChain.pinataHeaders();
  assert.equal(headers.Authorization.indexOf('Bearer '), 0, 'Cabeçalho Authorization deve usar Bearer JWT');
});

it('gera relatório de integridade da cadeia', function () {
  var chain = new PericiaChain.LocalChain([]);
  return chain.addGenesis().then(function () {
    return chain.getReport();
  }).then(function (report) {
    assert.equal(report.blocksCount, 1, 'Relatório deve conter um bloco gênese');
    assert.equal(report.valid, true, 'Relatório identifica cadeia válida');
    assert.equal(report.summary.firstBlockIndex, 0, 'Resumo deve expor índice do primeiro bloco');
    assert.equal(report.summary.lastBlockIndex, 0, 'Resumo deve expor índice do último bloco');
  });
});

it('lança erro ao importar JSON inválido com importReplace', function () {
  var chain = new PericiaChain.LocalChain([]);
  try {
    chain.importReplace('{"cadeia": []}');
    assert.fail('Esperava erro para JSON inválido');
  } catch (err) {
    assert.ok(err.message.indexOf('JSON inválido') !== -1, 'Mensagem de erro indica JSON inválido');
  }
});
