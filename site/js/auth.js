(function (global) {
  'use strict';

  var SESSION_KEY = 'pericia-admin-session';

  function login(username, password, usersJsonUrl) {
    return fetch(usersJsonUrl)
      .then(function (r) {
        if (!r.ok) throw new Error('Não foi possível carregar usuários');
        return r.json();
      })
      .then(function (j) {
        return global.PericiaChain.sha256hex(password).then(function (hash) {
          var list = (j && j.usuarios) || [];
          var found = list.find(function (u) {
            return u.usuario === username && u.senha === hash;
          });
          if (!found) return false;
          sessionStorage.setItem(SESSION_KEY, JSON.stringify({ u: username, t: Date.now() }));
          return true;
        });
      });
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function isLoggedIn() {
    return !!sessionStorage.getItem(SESSION_KEY);
  }

  global.PericiaAuth = {
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    SESSION_KEY: SESSION_KEY,
  };
})(typeof window !== 'undefined' ? window : globalThis);
