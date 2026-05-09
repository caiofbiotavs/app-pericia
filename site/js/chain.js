(function (global) {
  'use strict';

  var STORAGE_KEY = 'pericia-local-chain';
  var GENESIS_PREV = '0';

  function buf2hex(buf) {
    return Array.from(new Uint8Array(buf))
      .map(function (b) {
        return b.toString(16).padStart(2, '0');
      })
      .join('');
  }

  function sha256hex(str) {
    var enc = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', enc).then(buf2hex);
  }

  function sha256hexBuffer(buffer) {
    return crypto.subtle.digest('SHA-256', buffer).then(buf2hex);
  }

  function computeHash(block) {
    var payload =
      block.index +
      block.timestamp +
      JSON.stringify(block.data) +
      block.previousHash;
    return sha256hex(payload);
  }

  function LocalChain(blocks) {
    this.blocks = blocks || [];
  }

  LocalChain.prototype.save = function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.blocks));
  };

  LocalChain.prototype.addGenesis = function () {
    var self = this;
    var block = {
      index: 0,
      timestamp: Date.now(),
      data: {
        tipo: 'genesis',
        mensagem: 'Cadeia local — registro de evidências (demo)',
      },
      previousHash: GENESIS_PREV,
      hash: '',
    };
    return computeHash(block).then(function (h) {
      block.hash = h;
      self.blocks = [block];
      self.save();
      return self;
    });
  };

  LocalChain.prototype.addBlock = function (data) {
    var self = this;
    if (!self.blocks.length) {
      return Promise.reject(new Error('Cadeia sem bloco gênese'));
    }
    var prev = self.blocks[self.blocks.length - 1];
    var block = {
      index: prev.index + 1,
      timestamp: Date.now(),
      data: data,
      previousHash: prev.hash,
      hash: '',
    };
    return computeHash(block).then(function (h) {
      block.hash = h;
      self.blocks.push(block);
      self.save();
      return block;
    });
  };

  LocalChain.prototype.validate = function () {
    var self = this;
    var errors = [];
    if (!self.blocks.length) {
      return Promise.resolve({ ok: false, errors: ['Cadeia vazia'] });
    }
    var g = self.blocks[0];
    if (g.index !== 0 || g.previousHash !== GENESIS_PREV) {
      errors.push('Bloco gênese inválido');
    }
    var i = 0;
    function step() {
      if (i >= self.blocks.length) {
        return Promise.resolve({ ok: errors.length === 0, errors: errors });
      }
      var b = self.blocks[i];
      var clone = {
        index: b.index,
        timestamp: b.timestamp,
        data: b.data,
        previousHash: b.previousHash,
        hash: '',
      };
      return computeHash(clone).then(function (calc) {
        if (b.hash !== calc) {
          errors.push('Bloco ' + i + ': hash não confere com o conteúdo');
        }
        if (i > 0 && b.previousHash !== self.blocks[i - 1].hash) {
          errors.push('Bloco ' + i + ': elo anterior quebrado');
        }
        i++;
        return step();
      });
    }
    return step();
  };

  LocalChain.loadFromStorage = function () {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      var blocks = JSON.parse(raw);
      if (!Array.isArray(blocks)) return null;
      return new LocalChain(blocks);
    } catch (e) {
      return null;
    }
  };

  LocalChain.fetchSeed = function (url) {
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Seed indisponível');
        return r.json();
      })
      .then(function (j) {
        return Array.isArray(j.chain) ? j.chain : [];
      })
      .catch(function () {
        return [];
      });
  };

  /**
   * Prioridade: localStorage → seed (blockchain.json) → gênese nova.
   */
  LocalChain.createOrLoad = function (seedUrl) {
    var stored = LocalChain.loadFromStorage();
    if (stored && stored.blocks.length) {
      return Promise.resolve(stored);
    }
    return LocalChain.fetchSeed(seedUrl).then(function (seed) {
      var chain = new LocalChain(seed);
      if (!chain.blocks.length) {
        return chain.addGenesis();
      }
      return chain.validate().then(function (v) {
        if (!v.ok) {
          console.warn('Seed inválido, reiniciando gênese:', v.errors);
          chain.blocks = [];
          return chain.addGenesis();
        }
        chain.save();
        return chain;
      });
    });
  };

  LocalChain.prototype.exportJson = function () {
    return JSON.stringify({ chain: this.blocks }, null, 2);
  };

  LocalChain.prototype.getReport = function () {
    var self = this;
    return self.validate().then(function (validation) {
      return {
        generatedAt: new Date().toISOString(),
        blocksCount: self.blocks.length,
        valid: validation.ok,
        errors: validation.errors,
        summary: {
          firstBlockIndex: self.blocks.length ? self.blocks[0].index : null,
          lastBlockIndex: self.blocks.length ? self.blocks[self.blocks.length - 1].index : null,
        },
        chain: self.blocks,
      };
    });
  };

  LocalChain.prototype.getProofToken = function () {
    var self = this;
    var payload = self.blocks
      .map(function (b) {
        return [b.index, b.previousHash, b.hash, JSON.stringify(b.data)].join('|');
      })
      .join('||');
    return sha256hex(payload).then(function (hash) {
      return 'pericia-proof:' + hash;
    });
  };

  var PINATA_BASE_URL = 'https://api.pinata.cloud';

  function getPinataJwt() {
    return (global.PINATA_CONFIG && global.PINATA_CONFIG.jwt) || '';
  }

  function ensurePinataJwt() {
    var jwt = getPinataJwt();
    if (!jwt) {
      throw new Error(
        'Pinata JWT não configurado. Crie site/js/config.js a partir de site/js/config.example.js e não comite este arquivo.'
      );
    }
    return jwt;
  }

  function pinataHeaders() {
    return {
      Authorization: 'Bearer ' + ensurePinataJwt(),
    };
  }

  function pinataMetadata(name) {
    return { name: name || 'pericia-chain' };
  }

  LocalChain.prototype.pinataUploadJson = function (content, name) {
    return fetch(PINATA_BASE_URL + '/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, pinataHeaders()),
      body: JSON.stringify({
        pinataOptions: { cidVersion: 1 },
        pinataMetadata: pinataMetadata(name),
        pinataContent: content,
      }),
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (text) {
          throw new Error('Pinata falhou: ' + res.status + ' ' + text);
        });
      }
      return res.json();
    });
  };

  LocalChain.prototype.pinataUploadFile = function (file, name) {
    var form = new FormData();
    form.append('file', file, file.name);
    form.append('pinataMetadata', JSON.stringify(pinataMetadata(name || file.name)));
    form.append('pinataOptions', JSON.stringify({ cidVersion: 1 }));
    return fetch(PINATA_BASE_URL + '/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: pinataHeaders(),
      body: form,
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (text) {
          throw new Error('Pinata falhou: ' + res.status + ' ' + text);
        });
      }
      return res.json();
    });
  };

  LocalChain.prototype.pinataPayloadForChain = function () {
    var self = this;
    return self.getProofToken().then(function (token) {
      return {
        type: 'pericia-chain',
        generatedAt: new Date().toISOString(),
        proofToken: token,
        chain: self.blocks,
      };
    });
  };

  LocalChain.prototype.publishChainToPinata = function () {
    var self = this;
    return self.pinataPayloadForChain().then(function (payload) {
      return self.pinataUploadJson(payload, 'pericia-chain');
    });
  };

  LocalChain.prototype.publishReportToPinata = function () {
    var self = this;
    return self.getReport().then(function (report) {
      return self.pinataUploadJson(report, 'pericia-chain-report');
    });
  };

  LocalChain.prototype.importReplace = function (jsonText) {
    var j = JSON.parse(jsonText);
    if (!j || !Array.isArray(j.chain)) {
      throw new Error('JSON inválido: esperado { chain: [...] }');
    }
    this.blocks = j.chain;
    this.save();
  };

  /** Parseia JSON sem gravar no localStorage (ex.: validar arquivo exportado). */
  LocalChain.fromJsonString = function (jsonText) {
    var j = JSON.parse(jsonText);
    if (!j || !Array.isArray(j.chain)) {
      throw new Error('JSON inválido: esperado { chain: [...] }');
    }
    return new LocalChain(j.chain);
  };

  LocalChain.clearStorage = function () {
    localStorage.removeItem(STORAGE_KEY);
  };

  var PericiaChain = {
    LocalChain: LocalChain,
    sha256hex: sha256hex,
    sha256hexBuffer: sha256hexBuffer,
    STORAGE_KEY: STORAGE_KEY,
  };

  PericiaChain.pinataHeaders = pinataHeaders;

  global.PericiaChain = PericiaChain;
})(typeof window !== 'undefined' ? window : globalThis);
