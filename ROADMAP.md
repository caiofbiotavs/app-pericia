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

## Sprints

### Sprint 1 — MVP aprimorado (1-2 semanas)
- Implementar gerador de hash de artefatos no dashboard.
- Adicionar visão resumida de blocos com detalhes clicáveis.
- Atualizar documentação: roadmap, squad, stories.
- Manter TDD: criar e/ou atualizar testes de comportamento.
- Ajustar UX de validação e feedback.

### Sprint 2 — Caso e relatório (2 semanas)
- Adicionar campo de caso/processo por registro.
- Implementar filtro de blocos por processo/referência.
- Criar exportação de relatório técnico (JSON+metadata ou PDF futuro).
- Revisar fluxo administrativo de importação.

### Sprint 3 — Verificação pública e confiança (2 semanas)
- Gerar prova pública simples (token/QR básico).
- Criar página de verificação pública ou instruções de verificação.
- Documentar ancoragem futura em IPFS.
- Preparar transição para backend seguro se houver demanda.

## Critérios de sucesso
- Usuário consegue criar, ver e validar a cadeia sem ler JSON bruto.
- Auditor consegue importar e validar um arquivo exportado.
- O aplicativo continua 100% estático e operativo em navegador.
- O processo de desenvolvimento segue TDD e testes automatizados.
