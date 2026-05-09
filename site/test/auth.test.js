it('realiza login com credenciais válidas', function () {
  sessionStorage.removeItem(PericiaAuth.SESSION_KEY);
  var originalFetch = window.fetch;
  window.fetch = function () {
    return Promise.resolve({
      ok: true,
      json: function () {
        return Promise.resolve({
          usuarios: [
            {
              usuario: 'test',
              senha: '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b',
            },
          ],
        });
      },
    });
  };

  return PericiaAuth.login('test', 'secret', '/ignore')
    .then(function (ok) {
      assert.equal(ok, true, 'Login válido retorna true');
      assert.equal(PericiaAuth.isLoggedIn(), true, 'Sessão do usuário está ativa após login válido');
    })
    .finally(function () {
      window.fetch = originalFetch;
    });
});

it('recusa login com senha incorreta', function () {
  sessionStorage.removeItem(PericiaAuth.SESSION_KEY);
  var originalFetch = window.fetch;
  window.fetch = function () {
    return Promise.resolve({
      ok: true,
      json: function () {
        return Promise.resolve({
          usuarios: [
            {
              usuario: 'test',
              senha: '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b',
            },
          ],
        });
      },
    });
  };

  return PericiaAuth.login('test', 'wrong', '/ignore')
    .then(function (ok) {
      assert.equal(ok, false, 'Login inválido retorna false');
      assert.equal(PericiaAuth.isLoggedIn(), false, 'Nenhuma sessão é criada para credenciais inválidas');
    })
    .finally(function () {
      window.fetch = originalFetch;
    });
});

it('limpa a sessão com logout', function () {
  sessionStorage.setItem(PericiaAuth.SESSION_KEY, JSON.stringify({ u: 'test' }));
  PericiaAuth.logout();
  assert.equal(PericiaAuth.isLoggedIn(), false, 'Logout remove a sessão do usuário');
});
