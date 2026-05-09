(function (global) {
  'use strict';

  var resultsEl = document.getElementById('results');
  var total = 0;
  var failures = [];

  function format(value) {
    if (typeof value === 'string') return '"' + value + '"';
    try {
      return JSON.stringify(value);
    } catch (e) {
      return String(value);
    }
  }

  function appendMessage(text, className) {
    var el = document.createElement('div');
    el.className = className;
    el.textContent = text;
    resultsEl.appendChild(el);
  }

  function createAssertion(pass, name, message, details) {
    total += 1;
    if (pass) {
      appendMessage('✓ ' + name + ' — ' + message, 'passed');
      return;
    }
    appendMessage('✗ ' + name + ' — ' + message, 'failed');
    if (details) {
      var pre = document.createElement('pre');
      pre.textContent = details;
      resultsEl.appendChild(pre);
    }
    failures.push({ name: name, message: message, details: details });
  }

  function ok(value, message) {
    createAssertion(!!value, message, 'valor truthy esperado, obteve ' + format(value));
  }

  function equal(actual, expected, message) {
    createAssertion(actual === expected, message, 'esperado ' + format(expected) + ', obteve ' + format(actual), 'actual: ' + format(actual) + '\nexpected: ' + format(expected));
  }

  function deepEqual(actual, expected, message) {
    var a = JSON.stringify(actual);
    var b = JSON.stringify(expected);
    createAssertion(a === b, message, 'objetos deep equal esperado', 'actual: ' + a + '\nexpected: ' + b);
  }

  function fail(message) {
    createAssertion(false, message, 'falhou');
  }

  function runTests() {
    return Promise.resolve()
      .then(function () {
        return TESTS.reduce(function (chain, test) {
          return chain.then(function () {
            return Promise.resolve(test.fn()).catch(function (err) {
              appendMessage('✗ ' + test.name + ' — erro não capturado', 'failed');
              var pre = document.createElement('pre');
              pre.textContent = err && err.stack ? err.stack : String(err);
              resultsEl.appendChild(pre);
              failures.push({ name: test.name, message: 'erro não capturado', details: String(err) });
            });
          });
        }, Promise.resolve());
      })
      .then(function () {
        var summary = document.createElement('h2');
        summary.textContent = 'Total: ' + total + ' | Falhas: ' + failures.length;
        summary.style.color = failures.length ? 'red' : 'green';
        if (resultsEl.parentNode) {
          resultsEl.parentNode.insertBefore(summary, resultsEl);
        } else {
          document.body.appendChild(summary);
        }
        if (failures.length === 0) {
          appendMessage('Todos os testes passaram.', 'passed');
        }
      });
  }

  global.TESTS = global.TESTS || [];
  global.it = function (name, fn) {
    global.TESTS.push({ name: name, fn: fn });
  };
  global.assert = {
    ok: ok,
    equal: equal,
    deepEqual: deepEqual,
    fail: fail,
  };
  global.runTests = runTests;
})(window);
