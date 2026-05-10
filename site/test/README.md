# Testes do App Perícia

Este documento descreve como validar o App Perícia e as principais rotinas de regressão.

## Objetivo dos testes

- Verificar criação do bloco gênese e adição de blocos à cadeia.
- Confirmar validação de integridade da cadeia.
- Testar exportação e importação de JSON de cadeia.
- Validar autenticação administrativa.
- Garantir navegação consistente no app e integração das páginas institucionais.
- Checar breadcrumbs, menu ativo e comportamento do botão de menu.

## Como executar

1. Sirva o diretório `site/` com um servidor HTTP simples:

```sh
cd site
python3 -m http.server 8000
```

2. Abra `http://localhost:8000/test/index.html` no navegador.
3. Confirme que os testes terminam sem erros e que o relatório na página está verde.

## Fluxos validados

- Criação e registro de bloco no Dashboard.
- Visualização clara do estado da cadeia e do último hash.
- Navegação entre as páginas `Início`, `Dashboard`, `Validação`, `Verificação Local`, `Ajuda` e `Admin`.
- Acesso às páginas institucionais via menu lateral.
- Breadcrumbs presentes nas páginas de app.
- Sidebar expansível com overlay em telas menores.

## Notas importantes

- O app é estático; todo comportamento roda no browser.
- Use caminhos relativos para não quebrar o hosting estático.
- Atualize a documentação de ajuda sempre que o fluxo de navegação ou os textos de operação mudarem.

