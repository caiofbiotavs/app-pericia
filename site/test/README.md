# Testes do App Perícia

Abra `site/test/index.html` em um navegador compatível ou sirva o diretório `site/` por um servidor local.

## O que é testado
- Criação de bloco gênese
- Adição de blocos à cadeia
- Validação de integridade da cadeia
- Exportação e importação de JSON de cadeia
- Autenticação de administrador (login/logout)

## Como usar
1. Sirva o diretório `site/` com um servidor estático simples.
2. Abra `site/test/index.html` no navegador.
3. Verifique o resultado dos testes na página.

## O que há de novo
- A suíte valida o gerador de hash de arquivo e o explorador de blocos adicionados ao dashboard.
- Testes de UI agora verificam navegação entre páginas, página de ajuda e painel Admin.
- Adicionada verificação de orientações passo a passo no manual de ajuda para assegurar usabilidade não técnica.
