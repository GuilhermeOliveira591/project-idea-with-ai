# Da Reunião ao Documento: Design Docs Gerados por IA

## Descrição

Você acabou de entrar como Engenheiro(a) Sênior no time de plataforma de uma empresa que opera um Order Management System (OMS) em produção. A primeira tarefa que cai no seu colo é produzir o pacote de Design Docs de uma nova feature: um Sistema de Webhooks de Notificação de Pedidos.

A boa notícia é que a discussão técnica já aconteceu. A tech lead conduziu uma reunião com PM, engenheiros e segurança onde tudo foi debatido e decidido. A má notícia é que ninguém escreveu nada além da transcrição da call. Quem fica responsável por transformar aquilo em documentação técnica é você.

Sua missão é, usando IA como ferramenta principal de produção, transformar essa transcrição em um pacote de design docs de qualidade industrial. O resultado precisa estar bom o suficiente para servir ao time de engenharia como ponto de partida real da implementação.

## Sobre o uso de IA

A IA é sua ferramenta principal de produção neste desafio. Você vai usá-la para ler o código, analisar a transcrição, estruturar os documentos e gerar o conteúdo final. O que se espera de você é o papel de maestro: definir o que precisa ser feito, formular bons prompts, revisar criticamente o que a IA entrega, corrigir e refinar até o resultado ficar consistente.

## Objetivo

Entregar, em um repositório público no GitHub (fork do repositório base), o seguinte pacote de documentação:

- PRD (Product Requirement Document) da feature
- FDD (Feature Design Document) da feature
- Entre 5 e 8 ADRs (Architecture Decision Records) das decisões discutidas
- Tracker de rastreabilidade ligando cada item à origem na transcrição ou no código
- README atualizado documentando o processo de produção

Toda informação registrada nos documentos deve ser rastreável à transcrição ou ao código fonte da aplicação. Não é permitido inventar requisitos, decisões ou restrições sem origem identificável.

## Contexto

### A aplicação existente

O repositório base contém uma aplicação Node.js + TypeScript funcional: um Order Management System com módulos de autenticação, usuários, clientes, produtos e pedidos. Banco MySQL via Prisma. O ciclo de vida do pedido tem máquina de estados controlada, controle transacional de estoque e auditoria de mudanças de status.

A aplicação não tem nenhum mecanismo de notificação externa, eventos, filas ou webhooks. Esse vácuo é proposital. É exatamente o que a feature discutida na reunião pretende preencher.

Seus documentos vão precisar referenciar componentes do código existente, como a estrutura modular, a máquina de estados, a transação do `changeStatus`, as classes de erro, o padrão de códigos de erro, o middleware `requireRole`, o error middleware centralizado e o logger Pino. Use a IA para mapear esses pontos a partir do código.

### A transcrição

O arquivo `TRANSCRICAO.md` contém a gravação literal da reunião técnica. Cinco participantes discutem por aproximadamente 55 minutos no formato `[hh:mm] Nome: fala`.

A transcrição inclui decisões fechadas, requisitos funcionais explícitos, restrições, ganchos com o código existente, pontos descartados ou adiados para fases futuras e detalhes técnicos secundários. Nem tudo que foi mencionado vira requisito. Algumas coisas foram explicitamente descartadas, outras foram adiadas. Identificar o que NÃO entra é tão importante quanto identificar o que entra. Use a IA com prompts dirigidos para fazer essa filtragem, não pedidos genéricos.

## Tecnologias e ferramentas

Liberdade total na escolha de ferramentas de IA. Você pode usar qualquer combinação de Claude, ChatGPT, Cursor, Copilot Chat, Gemini, agentes, prompts customizados, skills ou plugins. Aproveite os prompts e plugins disponibilizados pelo professor durante o curso como ponto de partida.

Os documentos devem ser entregues em formato Markdown.

A entrega é puramente documental. Você não deve mexer no código da aplicação (`src/`, `prisma/`, `tests/`, configurações).

## Requisitos

### 1. PRD da feature

Produza o arquivo `docs/PRD.md` cobrindo a feature de Sistema de Webhooks de Notificação de Pedidos. O PRD deve seguir o formato apresentado no curso e incluir, no mínimo, as seguintes seções:

- Resumo e contexto da feature
- Problema e motivação
- Público-alvo e cenários de uso
- Objetivos e métricas de sucesso
- Escopo (incluso e fora de escopo)
- Requisitos funcionais
- Requisitos não funcionais
- Decisões e trade-offs principais
- Dependências
- Riscos e mitigação
- Critérios de aceitação
- Estratégia de testes e validação

A seção "Fora de escopo" deve listar explicitamente pelo menos 2 itens descartados ou adiados durante a reunião.

### 2. FDD da feature

Produza o arquivo `docs/FDD.md` detalhando o "como implementar" da feature. O FDD é o documento mais técnico e precisa estar acionável o suficiente para um desenvolvedor pegar e começar a codar. Deve seguir o formato apresentado no curso e incluir, no mínimo:

- Contexto e motivação técnica
- Objetivos técnicos
- Escopo e exclusões
- Fluxos detalhados (criação do evento na outbox, processamento pelo worker, retry, DLQ)
- Contratos públicos (endpoints HTTP com payloads de exemplo, headers, status codes, semântica)
- Matriz de erros previstos com códigos no padrão `WEBHOOK_*`
- Estratégias de resiliência (timeouts, retries, backoff, fallback)
- Observabilidade (métricas, logs, tracing)
- Dependências e compatibilidade
- Critérios de aceite técnicos
- Riscos e mitigação

Seção obrigatória adicional, específica deste desafio: **"Integração com o sistema existente"**. Esta seção deve nomear pelo menos 4 caminhos de arquivo reais do código base e descrever como o módulo de webhooks vai se integrar com cada um (por exemplo, como o método `changeStatus` será estendido, como as classes de erro existentes serão reutilizadas).

### 3. ADRs

Produza entre 5 e 8 ADRs em arquivos separados dentro de `docs/adrs/`, nomeados no formato `ADR-NNN-titulo-em-kebab-case.md` (ex: `ADR-001-outbox-no-mysql.md`).

Cada ADR deve seguir o formato MADR (ou variante padrão) com no mínimo as seções: Status, Contexto, Decisão, Alternativas Consideradas (pelo menos 1 alternativa real discutida ou plausível), Consequências (positivas e negativas, com trade-off explícito).

Pelo menos 1 ADR deve referenciar explicitamente arquivos, módulos ou padrões do código existente.

O conjunto de ADRs deve cobrir, no mínimo, 5 das 6 decisões principais discutidas na reunião:

- Padrão Outbox no MySQL
- Política de retry com backoff e DLQ
- Autenticação HMAC-SHA256 com secret por endpoint
- Garantia at-least-once com `X-Event-Id`
- Worker em processo separado em polling
- Reuso dos padrões existentes do projeto

Decisões técnicas secundárias (formato de payload, timeouts, headers, entre outras) podem virar ADRs adicionais ou ficar apenas no FDD, conforme você considerar mais adequado.

### 4. Tracker de Rastreabilidade

Produza o arquivo `docs/TRACKER.md`, uma tabela markdown que mapeia cada item registrado nos seus documentos à origem na transcrição ou no código. O tracker funciona como uma referência cruzada: permite que qualquer leitor entenda de onde veio cada decisão, requisito ou restrição, e garante que a documentação está alinhada com o que foi efetivamente discutido e com o que existe no código.

O tracker não é um conceito padrão do mercado nem é um documento abordado diretamente no curso. É uma exigência específica deste desafio que ajuda a manter a integridade da documentação contra alucinações da IA.

Formato obrigatório da tabela:

| ID | Documento | Tipo | Conteúdo (resumo) | Fonte | Localização |
| -- | --------- | ---- | ----------------- | ----- | ----------- |

Onde:

- **ID**: identificador único do item (ex: PRD-FR-01, FDD-CONTRATO-03, ADR-002)
- **Documento**: arquivo onde o item aparece (`docs/PRD.md`, `docs/FDD.md`, `docs/adrs/ADR-002-...md`)
- **Tipo**: Requisito Funcional, Requisito Não Funcional, Decisão, Restrição, Trade-off, entre outros
- **Conteúdo (resumo)**: descrição de uma linha do item
- **Fonte**: `TRANSCRICAO` ou `CODIGO`
- **Localização**: para `TRANSCRICAO`, timestamp + nome do falante (ex: `[09:17] Diego`). Para `CODIGO`, caminho do arquivo (ex: `src/modules/orders/order.service.ts`).

Cobertura mínima: pelo menos 80% dos itens identificáveis nos seus documentos devem ter linha correspondente no tracker.

### 5. README com o processo

O `README.md` na raiz do repositório base contém este enunciado. Substitua o conteúdo dele pela documentação do seu processo de produção. Você pode manter um link ou seção fazendo referência ao enunciado original se quiser, mas o foco do novo conteúdo é descrever sua jornada.

Estrutura obrigatória do novo README:

- **Sobre o desafio**: 1-2 parágrafos descrevendo a tarefa em suas palavras
- **Ferramentas de IA utilizadas**: lista das ferramentas que você usou, com breve nota sobre o papel de cada uma
- **Workflow adotado**: como você organizou o trabalho. Em que ordem produziu os documentos, como organizou a interação com a IA
- **Prompts customizados**: pelo menos 2 prompts relevantes que você escreveu ou adaptou, mostrados em blocos de código
- **Iterações e ajustes**: descreva os principais momentos em que a IA gerou algo errado ou superficial e você teve que corrigir. Quantas iterações principais até chegar ao resultado final
- **Como navegar a entrega**: caminho dos arquivos entregues e ordem sugerida de leitura

## Critérios de Aceite

A entrega é avaliada contra os critérios abaixo. Todos são obrigatórios.

### PRD (`docs/PRD.md`)

- [ ] Arquivo existe e está em Markdown
- [ ] Contém todas as seções obrigatórias listadas no requisito 1
- [ ] Identifica no mínimo 8 requisitos funcionais discutidos na reunião
- [ ] Inclui pelo menos 1 objetivo com métrica e meta quantitativa
- [ ] Seção "Fora de escopo" lista pelo menos 2 itens explicitamente descartados ou adiados na reunião
- [ ] Seção "Riscos" inclui pelo menos 2 riscos com probabilidade, impacto e mitigação

### FDD (`docs/FDD.md`)

- [ ] Arquivo existe e está em Markdown
- [ ] Contém todas as seções obrigatórias listadas no requisito 2
- [ ] Seção "Contratos públicos" inclui pelo menos 4 endpoints HTTP com payload de exemplo (request e response) e status codes
- [ ] Matriz de erros usa códigos com prefixo `WEBHOOK_`
- [ ] Seção "Integração com o sistema existente" referencia pelo menos 4 caminhos de arquivo reais do código base
- [ ] Seção "Observabilidade" cita métricas, logs e tracing

### ADRs (`docs/adrs/ADR-NNN-*.md`)

- [ ] Pasta `docs/adrs/` contém entre 5 e 8 arquivos no formato `ADR-NNN-titulo-em-kebab-case.md`
- [ ] Cada ADR contém as seções Status, Contexto, Decisão, Alternativas Consideradas, Consequências
- [ ] O conjunto cobre pelo menos 5 das 6 decisões principais listadas no requisito 3
- [ ] Pelo menos 1 ADR referencia explicitamente arquivos, módulos ou classes do código base

### Tracker (`docs/TRACKER.md`)

- [ ] Arquivo existe e segue o formato de tabela definido no requisito 4
- [ ] Pelo menos 80% dos itens identificáveis dos documentos têm linha correspondente
- [ ] Pelo menos 70% das linhas têm Fonte = `TRANSCRICAO` com timestamp válido no formato `[hh:mm] Nome`
- [ ] Pelo menos 5 linhas têm Fonte = `CODIGO` com caminho de arquivo real

### README (`README.md`)

- [ ] Contém todas as seções obrigatórias listadas no requisito 5
- [ ] Lista pelo menos 1 ferramenta de IA utilizada
- [ ] Mostra pelo menos 2 prompts customizados em blocos de código
- [ ] Descreve pelo menos 2 iterações ou ajustes concretos feitos durante a produção

### Consistência geral

- [ ] Nenhum requisito, decisão ou restrição registrada nos documentos contradiz a transcrição ou o código
- [ ] Nenhum arquivo de código mencionado nos documentos é inexistente no repositório

## Estrutura obrigatória do entregável

```
.
├── README.md                              (substituído pelo aluno)
├── TRANSCRICAO.md                         (não alterar)
├── docs/
│   ├── PRD.md                             (preenchido pelo aluno)
│   ├── FDD.md                             (preenchido pelo aluno)
│   ├── TRACKER.md                         (preenchido pelo aluno)
│   └── adrs/
│       ├── ADR-001-titulo-curto.md
│       ├── ADR-002-titulo-curto.md
│       ├── ADR-003-titulo-curto.md
│       ├── ADR-004-titulo-curto.md
│       ├── ADR-005-titulo-curto.md
│       └── ... (até 8 ADRs)
├── src/                                   (não alterar)
├── prisma/                                (não alterar)
├── tests/                                 (não alterar)
└── ... (demais arquivos do boilerplate, não alterar)
```

A entrega deve ser feita como repositório público no GitHub, a partir de fork do repositório base do desafio.

## Repositório base

O repositório base do desafio contém a aplicação completa, a transcrição e a estrutura de pastas pra você preencher:

`<link-do-repositorio-base-aqui>`

## Ordem de execução sugerida

1. **Fork e setup**: faça o fork do repositório base e clone localmente.
2. **Contextualização com IA**: forneça à IA acesso ao código (via Claude Code, Cursor lendo o repo, ou colando trechos relevantes) e à transcrição. Peça uma exploração inicial para entender estrutura, padrões e o que a feature precisa endereçar.
3. **ADRs primeiro**: identifique e produza as decisões principais antes do FDD. As decisões formam o esqueleto do "como implementar".
4. **FDD**: agora que as decisões estão formalizadas, o desenho técnico se constrói em cima delas. Lembre da seção obrigatória "Integração com o sistema existente".
5. **PRD**: produza o PRD por último entre os três grandes documentos. Como ele é mais alto nível, com FDD e ADRs em mãos vira praticamente uma consolidação.
6. **Tracker**: monte em paralelo com os outros documentos ou no fim, varrendo os documentos prontos.
7. **README do processo**: deixe por último, quando o processo já está completo e você pode documentá-lo com clareza.
8. **Revisão final**: passe pela checklist de critérios de aceite item por item antes do push final.
9. **Itere**: é esperado que o processo demande 3-5 ciclos de geração, revisão crítica, ajuste de prompt e nova geração. Se você gerou tudo de primeira sem ajustes, os documentos provavelmente estão genéricos demais.

## Dicas Finais

A qualidade do prompt determina a qualidade do documento. Prompts vagos do tipo "gere um PRD a partir dessa transcrição" produzem documentos vazios e genéricos. Aproveite os prompts disponibilizados pelo professor no curso como base e adapte-os ao contexto deste desafio.

O tracker é seu melhor aliado contra alucinações da IA. Se você não consegue preencher a coluna "Localização" para uma linha do PRD ou do FDD, é sinal de que aquela informação não tem origem identificável e provavelmente foi inventada pela IA. Ajuste ou remova.

Cuidado com o que NÃO entra na documentação. A reunião descarta explicitamente algumas ideias. Se essas coisas aparecerem como requisito nos seus documentos, é sinal de que a IA não está sendo cuidadosa com o que você pediu.

A restrição de não alterar o código é absoluta. O código serve de contexto e referência. O entregável é puramente documental.

Itere bastante. Os primeiros documentos que a IA gerar provavelmente serão superficiais ou redundantes. Volte com correções, peça refinamento de pontos específicos, peça para remover trechos vagos, peça exemplos concretos. O resultado final deve parecer escrito por alguém que pensou no problema com a IA ao lado, não por alguém que copiou e colou da transcrição.