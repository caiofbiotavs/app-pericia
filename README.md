# App Perícia

App Perícia é um app estático de perícia judicial que roda no navegador, com blockchain local para registro de evidências, validação de integridade, painel administrativo e páginas institucionais.

## O que existe neste repositório

- `site/` — aplicação principal do App Perícia, incluindo Dashboard, Validação, Verificação, Ajuda e Painel Admin.
- `site/css/pericia.css` — estilos globais e layout de navegação responsiva.
- `site/js/chain.js` — lógica de criação, validação e manipulação da cadeia de blocos no browser.
- `site/js/auth.js` — autenticação de administrador no cliente.
- `Framework-Pericial/` e `Manifesto_Ipfs/` — páginas institucionais integradas à navegação do app.
- `site/test/` — suíte de testes de regressão cliente para verificação de cadeia, UI e fluxo de uso.

## Atualizações recentes

- Navegação lateral categorizada em `Informações` e `App Perícia`.
- Integração das páginas institucionais no fluxo de navegação do site.
- Breadcrumbs adicionadas nas páginas de app para melhorar a orientação do usuário.
- Indicador de menu ativo implementado em todas as páginas.
- Botão de menu expandível para sidebar em telas menores.
- Documentação de ajuda e testes de regressão atualizados para refletir o fluxo atual.

## Como rodar localmente

1. Sirva o diretório `site/` com um servidor HTTP simples:

```sh
cd site
python3 -m http.server 8000
```

2. Acesse o app em `http://localhost:8000/`.
3. Abra `http://localhost:8000/test/index.html` para executar os testes de regressão.

## Credenciais de Admin

Para acessar o painel administrativo (`/painel_admin/admin.html`):
- **Usuário**: `caiotavares`
- **Senha**: `admin`

⚠️ **Nota**: Esta é uma demonstração com autenticação cliente-side. Não use como modelo de segurança em produção.

## Objetivo do app

- Registrar evidências na cadeia local usando SHA-256.
- Validar integridade da cadeia e detectar alterações.
- Permitir importação/exportação de JSON de cadeia.
- Oferecer um painel Admin para administração local e importação de cadeias.
- Exibir conteúdo institucional e manual de uso integrado ao fluxo do app.
