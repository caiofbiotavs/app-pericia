# Workflow padrão App Perícia

Este documento define o processo padrão de trabalho para o projeto App Perícia, com foco em validação orientada por usuário, feedback real, planejamento colaborativo e evolução por sprints.

## 1. Perfil do agente user
- Criar um agente com perfil de usuário puro e não técnico.
- O agente deve usar somente a documentação de ajuda/manual do usuário (`site/help/index.html`) como fonte de verdade para testar o sistema.
- O objetivo é reproduzir a experiência real de um perito, auditor ou administrador sem conhecimento técnico profundo.
- O feedback deve ser honesto, claro e apontar dificuldades, dúvidas e bloqueios.

## 2. Bateria de testes do usuário
- Executar testes de usabilidade e funcionalidade conforme a documentação.
- Verificar se cada etapa descrita no manual é fácil de localizar e compreender.
- Anotar pontos de fricção, termos difíceis, passos confusos e telas pouco claras.
- Nunca inventar comportamentos além do que o manual descreve.

## 3. Brainstorm com a squad
- Usar o feedback do usuário como entrada para uma sessão de brainstorming com toda a squad.
- Avaliar quais dores são reais, quais ajustes são mais importantes e quais melhorias são viáveis no contexto estático do app.
- Gerar um roadmap de melhorias e ajustes com base nas dificuldades do usuário.

## 4. Roadmap e divisão em sprints
- Traduzir as melhorias em itens de roadmap claros e mensuráveis.
- Dividir o roadmap em sprints pequenos e entregáveis, alinhados com `ROADMAP.md` e `SQUAD.md`.
- Cada sprint deve ter objetivos, critérios de aceitação e testes associados.

## 5. Execução do sprint
- Implementar as mudanças seguindo as diretrizes do projeto:
  - manter o app estático
  - preservar textos em português
  - usar caminhos relativos
  - evitar dependências externas desnecessárias
- Atualizar ou criar testes no `site/test/` para validar o fluxo alterado.
- Atualizar a documentação de ajuda quando houver mudanças de fluxo ou comportamento.

## 6. Validação posterior com o usuário
- Após cada sprint, chamar novamente o usuário para retestar apenas as funcionalidades alteradas.
- O usuário deve ter na memória apenas a documentação anterior e os testes que realizou.
- Registrar o feedback do usuário de forma objetiva.
- Avançar apenas se o feedback for positivo e a dor relatada anteriormente estiver sanada.

## 7. Uso contínuo do workflow
- Este fluxo deve ser adotado como padrão em todos os projetos e sprints seguintes.
- O agente assistente deve seguir este comportamento sempre que operar neste repositório.
- Os artefatos principais deste processo são:
  - `site/help/index.html`
  - `ROADMAP.md`
  - `SQUAD.md`
  - `site/test/`
  - `WORKFLOW.md`
