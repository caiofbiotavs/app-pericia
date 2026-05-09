# Squad Ágil — App Perícia

## Papéis

### Product Owner
- Define a visão do produto e prioriza o backlog.
- Valida critérios de aceitação e garante que as stories estejam alinhadas com casos de perícia judicial.
- Responsável por `ROADMAP.md` e `STORIES.md`.

### Scrum Master
- Mantém o ritmo dos sprints.
- Remove impedimentos e garante que a equipe foque nas entregas do sprint.
- Revê o progresso com base em `ROADMAP.md`.

### Desenvolvedor
- Implementa as melhorias e mantém a base estática leve.
- Escreve e atualiza testes de comportamento em `site/test/`.
- Trabalha nos recursos de `site/dashboard`, `site/validacao` e `site/painel_admin`.

### QA
- Executa a suíte de testes no navegador.
- Valida critérios de aceitação das stories.
- Reporta regressões e garante que o app continue estático.

### UX / Design
- Torna a interface clara para peritos, auditores e administradores.
- Sugere melhorias de navegação e apresentação de blocos.

### DevOps / Operações
- Mantém o deploy estável via `deploy.sh` e `Caddyfile`.
- Garante que o app funcione em ambiente estático e que o fluxo localStorage permaneça seguro.

## Tarefas por sprint

### Sprint 1
- Product Owner: confirmar visão do MVP aprimorado.
- Desenvolvedor: implementar gerador de hash e explorador de blocos.
- QA: validar `site/test/index.html` e atualizar `site/test/README.md`.
- Scrum Master: conduzir revisão e demo.

### Sprint 2 (em andamento)
- Product Owner: revisar roadmap após Sprint 1 e priorizar filtros e relatórios.
- UX/Design: validar refinamentos do dashboard e do explorador de blocos.
- DevOps: garantir que o app continue 100% estático e que exportação de relatório funcione em navegadores.
- Desenvolvedor: implementar campo de caso/processo, filtro por referência/processo e exportação de relatório técnico.
- QA: criar testes de comportamento para relatório de integridade e validar o novo fluxo.
- Product Owner: priorizar casos/processos e relatório técnico.
- Desenvolvedor: adicionar filtro e metadados de processo.
- QA: criar novos testes de fluxo de case management.
- UX: melhorar formas de visualização de evidências.

### Sprint 3
- Product Owner: avaliar prova pública e ancoragem.
- Desenvolvedor: preparar integração de prova pública/QR.
- DevOps: validar implantação estática e ancoragem futura.
- QA: verificar fluxo de verificação externa.

## Modo de trabalho
- Usar TDD para cada história implementada.
- Priorizar mudanças leves e funcionais, evitando dependências externas.
- Documentar cada sprint no repositório.
