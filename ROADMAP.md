# Roadmap — App Perícia

## Visão
Transformar um protótipo de cadeia local em uma ferramenta de gestão de perícia judicial robusta, focada em integridade probatória, usabilidade e portabilidade sem servidor.

## Objetivo principal
Oferecer um sistema estático que permita ao perito registrar evidências, validar cadeias, exportar/importar provas e gerar relatórios confiáveis a partir do navegador.

## Funcionalidades existentes
- Captura de registro de evidência com metadados.
- Cadeia armazenada em `localStorage` com hash SHA-256 encadeado.
- Exportação/importação JSON de cadeia.
- Validação local e de arquivo exportado.
- Autenticação administrativa em cliente para operações de importação e limpeza.
- Suíte de testes de comportamento no navegador.

## Features que fazem sentido e não constam no roadmap atual
- Gerador de hash SHA-256 para artefatos e arquivos.
- Visão resumida / explorador de blocos com detalhes clicáveis.
- Exportar relatório de auditoria ou documento técnico para caso pericial.
- Agrupamento por caso/processo e filtro de evidências.
- Suporte a múltiplos casos em uma mesma instância local.
- Verificação pública de prova via QR code ou token de integridade.
- Registro de timestamp legível e histórico de validações.
- Estrutura de permissões e funções além de admin demo.

## Roadmap por temas

### Tema 1: Base sólida
- Estabilidade da cadeia local.
- UX de registro e visualização de evidências.
- Suite de testes como qualidade mínima.
- Documentação de operação e planejamento.

### Tema 2: Usabilidade e confiança
- Explorar blocos com resumos e detalhes.
- Ferramenta de hash de artefatos.
- Mensagens de validação claras.
- Relatório de integridade legível.

### Tema 3: Portabilidade e casos de uso
- Múltiplos casos/processos.
- Filtros e busca por referência/processo.
- Exportação de relatório e pacote de prova.

### Tema 4: Publicação de prova e confiança distribuída
- Ancoragem em IPFS ou referência pública.
- QR code para verificação externa.
- Integração com serviços de prova pública.

## Sprints Atuais

### Sprint 1: Melhorias de Usabilidade (Concluído)
**Objetivo:** Resolver dores críticas de navegação e clareza identificadas na validação de usuário não-técnico.

**Tarefas Concluídas:**
- ✅ Separar menu de navegação em categorias claras (Informações vs App Perícia)
- ✅ Renomear "Verificação Pública" para "Verificação Externa" para evitar confusão
- ✅ Adicionar indicador visual de página ativa no menu
- ✅ Implementar breadcrumbs em todas as páginas
- ✅ Adicionar guia passo-a-passo na página de Verificação Externa
- ✅ Padronizar layout de páginas institucionais com sidebar e tema consistente

**Resultado:** Navegação mais intuitiva, redução de confusão entre seções, melhor orientação do usuário.

### Sprint 2: Expansão de Conteúdo Institucional (Próximo)
**Objetivo:** Tornar páginas institucionais mais informativas e motivadoras para usuários não-técnicos.

**Tarefas Planejadas:**
- Expandir Manifesto Técnico com explicações mais acessíveis
- Adicionar seção "Por que usar?" no Framework Pericial
- Criar página de FAQ ou glossário de termos técnicos
- Melhorar apresentação visual com ícones e diagramas simplificados

## Sprints

### Status atual
- Sprint 1 concluído: gerador de hash de artefatos, explorador de blocos e teste de comportamento implementados.
- Sprint 2 em andamento: campo de processo, filtro de evidências e exportação de relatório técnico.
- Sprint 4 em progresso: UI/UX e usabilidade, orientações inline no Dashboard, Validação e Verificação pública.
- Sprint 5 concluído: documentação operacional e ajuda passo a passo para usuário não técnico.
- Revisão do Product Owner, UX/Design e DevOps em progresso para ajustar os próximos refinamentos.

### Sprint 1 — MVP aprimorado (1-2 semanas)
- Implementar gerador de hash de artefatos no dashboard. ✅
- Adicionar visão resumida de blocos com detalhes clicáveis. ✅
- Atualizar documentação: roadmap, squad, stories. ✅
- Manter TDD: criar e/ou atualizar testes de comportamento. ✅
- Ajustar UX de validação e feedback. ✅

### Sprint 2 — Caso e relatório (2 semanas)
- Adicionar campo de caso/processo por registro.
- Implementar filtro de blocos por processo/referência.
- Criar exportação de relatório técnico (JSON+metadata ou PDF futuro).
- Revisar fluxo administrativo de importação.
- Atualizar documentação de uso e ajuda como última tarefa do sprint.

### Sprint 3 — Verificação pública e confiança (2 semanas)
- Gerar prova pública simples (token/QR básico).
- Criar página de verificação pública ou instruções de verificação.
- Documentar ancoragem futura em IPFS.
- Preparar transição para backend seguro se houver demanda.
- Atualizar manual e sessão de ajuda como última tarefa do sprint.

### Sprint 4 — UI/UX premium e identidade visual (2 semanas)
- Definir um sistema de design moderno: paleta premium, tipografia refinada, sombras suaves e componentes consistentes.
- Refatorar cabeçalho e navegação para um menu claro, fixo e responsivo em todas as páginas.
- Aplicar cards, botões e formulários com estados de foco, hover e feedback visual consistente.
- Melhorar fluxo de usuário para ações principais: criar registro, validar cadeia, publicar prova e gerir administração.
- Garantir acessibilidade básica: contraste, labels visíveis, foco por teclado, tamanho de alvo e leitura mobile.
- Atualizar o dashboard para exibir status de cadeia, ações rápidas e resumo de integridade em destaque.
- Criar um protótipo visual premium para relatórios, validação e verificação pública.
- Incluir checklist de QA visual e regressão no final da sprint.
- Atualizar documentação de uso e ajuda como última tarefa do sprint.

### Sprint 5 — Documentação operacional e usabilidade (1-2 semanas)
- Expandir o manual de ajuda com instruções passo a passo para Dashboard, Validação, Verificação pública e Admin.
- Clarificar os fluxos de ação: gerar hash, exportar/importar cadeia, gerar/verificar token público e limpar cadeia.
- Atualizar `site/test/ui.test.js` para validar a presença de orientações operacionais no manual.
- Garantir que a documentação seja o ponto único de referência para um usuário não técnico.
- Registrar o feedback do usuário e ajustar o roadmap com base nas dores identificadas.

## Critérios de sucesso
- Usuário consegue criar, ver e validar a cadeia sem ler JSON bruto.
- Auditor consegue importar e validar um arquivo exportado.
- O aplicativo continua 100% estático e operativo em navegador.
- O processo de desenvolvimento segue TDD e testes automatizados.
