# Histórias de usuário para suíte de gestão de perícia judicial

## Visão geral
Estas histórias expandem o app demo para um sistema robusto de gestão de casos de perícia judicial. O foco é garantir integridade probatória, rastreabilidade e suporte prático ao perito.

## Histórias

1. Como perito, quero registrar cada evidência em uma cadeia imutável de blocos para manter uma trilha de auditoria confiável.
   - Critério de aceitação: cada registro deve receber um hash dependente do bloco anterior.
   - Qualidade: a validação deve detectar alterações no conteúdo do bloco.

2. Como gestor de caso, quero importar e exportar a cadeia de evidências em JSON para transferir casos entre máquinas e auditores.
   - Critério de aceitação: o arquivo exportado deve ter formato `{ "chain": [...] }` e ser recarregável.
   - Qualidade: importação deve validar o formato antes de substituir a cadeia local.

3. Como auditor, quero verificar a integridade da cadeia local ou de um arquivo importado para comprovar que não houve adulteração.
   - Critério de aceitação: a funcionalidade de validação deve relatar falhas de hash e quebras de elo.
   - Qualidade: erros devem ser exibidos em linguagem clara e vinculados ao bloco afetado.

4. Como administrador, quero autenticar-me com credenciais seguras para impedir acesso não autorizado à importação e limpeza da cadeia.
   - Critério de aceitação: o painel administrativo só deve permitir operações avançadas após login.
   - Qualidade: a sessão deve ser mantida em `sessionStorage` e removida no logout.

5. Como perito, quero acionar a criação automática do bloco gênese quando não há dados locais nem seed disponível.
   - Critério de aceitação: na primeira inicialização o sistema deve criar um bloco gênese válido.
   - Qualidade: o bloco gênese deve ter `previousHash: '0'` e índice 0.

6. Como desenvolvedor, quero uma suíte de testes de comportamento para garantir que mudanças no código não quebrem regras de cadeia nem autenticação.
   - Critério de aceitação: testes devem cobrir geração de hash, adição de blocos, validação de cadeia, importação/exportação e login/logout.
   - Qualidade: os testes devem ser executáveis em um navegador a partir de `site/test/index.html`.

7. Como usuário do sistema, quero ter navegação clara entre Dashboard, Validação e Admin para operar casos de perícia sem confusão.
   - Critério de aceitação: a barra de navegação existente mantém links corretos para as três áreas principais.
   - Qualidade: qualquer nova página deve seguir as rotas relativas usadas em `site/`.

8. Como perito, quero calcular o hash SHA-256 de documentos no próprio navegador para registrar a prova digital de artefatos.
   - Critério de aceitação: o dashboard deve permitir carregar um arquivo e exibir seu hash SHA-256.
   - Qualidade: o hash deve ser mostrado em formato hexadecimal válido de 64 caracteres.

9. Como perito, quero uma lista resumida dos blocos existentes para revisar evidências sem precisar ler JSON cru.
   - Critério de aceitação: o dashboard deve mostrar um explorador de blocos com detalhes clicáveis.
   - Qualidade: cada bloco deve exibir índice, referência/processo e timestamp.

10. Como gestor de caso, quero poder associar um registro a um processo/caso e filtrar blocos por esse caso.
   - Critério de aceitação: os campos do formulário devem permitir referência ao caso e o explorador deve suportar filtragem.
   - Qualidade: a pesquisa deve ser simples e responsiva.

11. Como auditor, quero exportar um relatório de integridade da cadeia para apresentar em audiência.
   - Critério de aceitação: o app deve poder gerar um pacote de prova legível ou instruções de exportação.
   - Qualidade: o relatório deve conter número de blocos, status de validação e referências de evidências.
