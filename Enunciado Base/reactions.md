# Spec-Driven Development com IA: Fechando uma Phase de um Projeto Real

## Descrição

Sexta-feira, 17h47. Você está fechando o notebook quando uma mensagem cai do **Tech Lead da StreamTube**:

> *"Fala! Tô precisando de uma força. O dev que tava no projeto saiu e deixou a feature de **Reações** pela metade. Vídeo sem reação não engaja, e marketing tá em cima. Você consegue fechar a **Phase 03** até segunda? Mas faz **direito**, viu? Já fechamos as Phases 01 (config base) e 02 (auth) seguindo o processo do MBA — não me faça quebrar a cadência agora. Confio no processo que você aprendeu."*

A **StreamTube** é uma plataforma de streaming de vídeo. Usuários têm canais, autenticam, e agora precisam conseguir **reagir aos vídeos** (`like, love, laugh, sad, angry`) com contagem agregada por tipo.

Sua missão neste desafio é fechar a Phase 03 inteira **usando IA como ferramenta principal de produção**, seguindo o ciclo `research → plan → implement → audit` com **rastreabilidade ponta a ponta** entre spec, plan, código e testes. Uma skill criada por você gera um relatório de integridade do processo que compõe um dos critérios de aprovação.

## Sobre o uso de IA

A IA é a ferramenta de produção principal e obrigatória deste desafio. **Todo artefato entregue precisa ter sido produzido com orquestração de IA**, sem exceção:

- A **spec** é escrita a partir do output da skill `research`.
- O **plano técnico** é gerado pela skill `plan-phase`.
- A **implementação** do módulo NestJS é conduzida pela skill `implement-phase` em ciclos TDD.
- Os **testes** seguem as guidelines geradas por `generate-test-guide` e aplicadas via `testing-guide-nestjs-project`.
- A **auditoria de integridade** é executada pela skill `phase-audit` (que você cria neste desafio).
- O **relatório final** (`progress.md`) é gerado pela própria skill `phase-audit`, não escrito à mão.
- Os **CLAUDE.md** são atualizados com apoio da IA a partir do estado real do repositório.

Seu papel é de **maestro do processo**: invocar as skills na ordem certa, revisar criticamente cada output, refinar prompts quando o resultado vier raso ou genérico, e manter a rastreabilidade entre os artefatos via IDs estáveis. A presença de IA precisa ser observável no repositório — skills invocadas, prompts refinados, transcript arquivado.

A aprovação depende do conjunto completo de critérios listado na seção "Critérios de Aceite" mais abaixo, que cobre:

1. Spec rastreável com IDs estáveis
2. Plano gerado pela skill `plan-phase` com refs à spec
3. Implementação que segue o plano e tem suíte verde
4. Rastreabilidade ponta a ponta (IDs em commits e testes)
5. Skill `phase-audit` funcional, agnóstica de phase, com frontmatter correto
6. Integrity Score ≥ 80% no relatório gerado pela skill
7. `CLAUDE.md` (raiz e `nestjs-project/`) refletindo o estado real do código
8. Sessão de Claude arquivada

Cada item da seção "Critérios de Aceite" precisa estar marcado.

## Objetivo

Você deve entregar, em um repositório público no GitHub (fork do repositório base), o seguinte pacote:

- Spec rastreável da Phase 03 (com IDs estáveis para Requisitos Funcionais, Regras de Negócio e Edge Cases)
- Plano de execução técnico gerado pela skill `plan-phase` (linkando cada item ao ID correspondente da spec)
- Módulo NestJS `reactions/` implementado via TDD, com cada commit e cada teste referenciando os IDs da spec
- Migration TypeORM criando a tabela `reactions`
- **Skill nova `phase-audit`** que lê o repositório e gera um relatório de integridade do processo
- Relatório de integridade do processo gerado pela skill (`phase-03-reactions.progress.md`) com **Integrity Score ≥ 80%**
- `CLAUDE.md` raiz e `nestjs-project/CLAUDE.md` atualizados com a seção de Reactions
- Sessão de Claude arquivada em `_claude-sessions/11-fase03-reactions.txt`

Toda informação registrada nos documentos deve ser rastreável à spec ou ao código. Não é permitido inventar requisitos, decisões ou testes sem origem identificável por ID.

## Contexto

### A aplicação existente

O repositório base contém o projeto `mba-ia-greenfield-project` (StreamTube): uma aplicação NestJS + TypeORM + PostgreSQL com Phases 01 (config base) e 02 (auth) já fechadas seguindo o processo do curso. O módulo `auth/` serve de espelho arquitetural para `reactions/` — ele tem o padrão completo que você vai reproduzir (Module + Controller + DTO + Service com testes unit/integration + entities + e2e em `test/`). O módulo `channels/` também ajuda como referência, mas só na parte de Service + entidade (não tem endpoint HTTP).

### As skills que já vêm prontas no projeto

O projeto já tem o workflow `research → plan → implement → audit` parcialmente montado. **Essas skills são pré-requisito de uso obrigatório** — não recrie, use:

| Skill | O que faz | Quando invocar |
|---|---|---|
| `research` | Investiga o código e produz contexto técnico | Antes de qualquer planejamento |
| `plan-phase` | Gera plano executável a partir da spec | Após a spec estar pronta |
| `implement-phase` | Conduz a implementação seguindo o plano | Durante o TDD |
| `generate-test-guide` | Gera guideline de testes | Antes de escrever a primeira suite |
| `testing-guide-nestjs-project` | Aplica o guideline ao módulo | Durante o TDD |

A skill que **você vai criar** é a `phase-audit` — ela não duplica nenhuma das anteriores, ela **mede o processo** que você executou com elas.

### Os 3 pilares avaliados

1. **Spec Driven Development com rastreabilidade** — toda implementação volta para um ID da spec
2. **Skills personalizadas** — criação da `phase-audit` para governar a qualidade do processo
3. **TDD com integridade auditável** — não basta verde; tem que ser provadamente verde a partir de Red

> O critério não é cobertura de código. É **maturidade de processo verificável pela própria IA**.

## Tecnologias obrigatórias

- **Ferramenta de IA:** Claude Code (o projeto base usa `.claude/skills/`)
- **Stack:** NestJS, TypeORM, PostgreSQL
- **Banco de dados:** PostgreSQL local via `compose.yaml` (já incluso)
- **Formato de skills:** Markdown com frontmatter
- **Formato dos relatórios:** Markdown

## Requisitos

### 1. Spec rastreável da Phase 03

Produza `docs/phases/phase-03-reactions.md` espelhando o padrão de `phase-02-auth.md`. **Use a skill `research`** para mapear o código existente antes de escrever a spec — é ela que vai te dar o vocabulário do domínio e os pontos de integração.

A spec deve cobrir, no mínimo:

- **Objetivo de negócio** — 1 parágrafo
- **Casos de uso** — numerados (UC-01, UC-02, ...)
- **Requisitos funcionais** — numerados (FR-01, FR-02, ...). Mínimo 6.
- **Regras de negócio** — numeradas (RN-01, RN-02, ...). Mínimo 4.
- **Modelo de dados** — tabela `reactions`, constraints, índices
- **Edge cases** — numerados (EC-01, EC-02, ...). Mínimo 5.
- **Critérios de aceite testáveis** — cada um amarrado a um FR

**Formato obrigatório dos IDs:** prefixo + hífen + 2 dígitos (`FR-01`, `RN-03`, `EC-05`). Esses IDs são a espinha dorsal de tudo que vem depois — a skill `phase-audit` vai procurar por esses padrões em commits e testes.

> **Tudo na spec começa com um ID.** Sem ID estável, a auditoria não consegue cruzar a informação e o item conta como inválido no Integrity Score.

### 2. Plano de execução técnico

Invoque a skill `plan-phase` passando a spec como input. O resultado deve ser salvo em `docs/phases/phase-03-reactions.plan.md`.

O plano deve:

- Listar tarefas numeradas com prefixo `PLAN-` (`PLAN-01`, `PLAN-02`, ...)
- Cada item do plano deve referenciar pelo menos um ID da spec (`PLAN-04 → FR-02, RN-01`)
- Definir a ordem de implementação dos ciclos TDD
- Identificar arquivos novos e arquivos existentes a tocar

> **Dica:** o output cru da skill normalmente precisa de 1-2 iterações de refinamento. Revise os refs criticamente — refs errados envenenam o resto da auditoria.

### 3. Implementação via TDD com rastreabilidade

Implemente o módulo `reactions/` em `nestjs-project/src/reactions/` seguindo o padrão de `auth/` (espelho completo: Module + Controller + DTO + Service + entities + e2e em `test/`) e usando a skill `implement-phase` para conduzir o ciclo.

**Estrutura esperada:**

```
nestjs-project/src/reactions/
├── reactions.module.ts
├── reactions.module.spec.ts
├── reactions.service.ts
├── reactions.service.spec.ts
├── reactions.service.integration-spec.ts
├── reactions.controller.ts
├── dto/
│   ├── create-reaction.dto.ts
│   └── remove-reaction.dto.ts
└── entities/
    ├── reaction.entity.ts
    └── reaction.entity.integration-spec.ts

nestjs-project/src/database/migrations/
└── <timestamp>-CreateReactions.ts

nestjs-project/test/
└── reactions.e2e-spec.ts
```

**Regras de rastreabilidade obrigatórias:**

- **Commits:** cada commit deve referenciar pelo menos um ID da spec ou do plano, no formato `[ID]` no início da mensagem após o tipo. Exemplos:

```
test(reactions): [FR-02][EC-01] add failing test for replace existing reaction
feat(reactions): [FR-02] implement upsert on duplicate user+video
refactor(reactions): [PLAN-04] extract reaction type to value object
```

- **Testes:** cada `it(...)` ou `describe(...)` deve incluir pelo menos um ID no nome, entre colchetes:

```ts
it('[FR-02][EC-01] should replace previous reaction when user reacts again', ...)
```

- **Ciclo TDD obrigatório por caso de uso:** `RED → GREEN → REFACTOR`, cada etapa em commit separado. Squash do histórico reprova.

**Anti-patterns que reprovam automaticamente:**

- Commit gigante único (`feat: implement reactions`)
- Testes sem ID no nome
- Commits sem ID na mensagem
- Mockar TypeORM em integration test (use o Postgres do `compose.yaml`)
- Pular o RED (commitar implementação antes do teste falhando)
- Testes triviais (getter, construtor, framework)

### 4. Skill `phase-audit`

Crie a skill em `.claude/skills/phase-audit/skill.md` (raiz do projeto base, não dentro de `nestjs-project/`).

A skill deve ser invocável por:

```bash
claude "/phase-audit phase-03-reactions"
```

E deve **ler 5 fontes** do repositório e cruzá-las:

1. A spec (`docs/phases/<nome>.md`) — extrai todos os IDs (`FR-*`, `RN-*`, `EC-*`)
2. O plano (`docs/phases/<nome>.plan.md`) — extrai IDs `PLAN-*` e os refs que cada um faz à spec
3. O git log do escopo da feature — extrai todos os IDs referenciados em commits
4. Os arquivos de teste (`*.spec.ts`, `*.integration-spec.ts`, `*.e2e-spec.ts`) — extrai IDs dos nomes dos testes
5. O estado do código (`src/reactions/`) — verifica existência dos arquivos esperados pelo plano

**Output obrigatório:** um relatório em Markdown salvo em `docs/phases/<nome>.progress.md` contendo:

```markdown
# Phase 03 — Process Integrity Report

## Integrity Score
84%   STATUS: APROVADO  (corte: ≥ 80%)

## Coverage Matrix
| Dimensão                  | Cobertura | Detalhes             |
|---------------------------|-----------|----------------------|
| Spec → Plan               | 8/8       | ✓                    |
| Plan → Commits            | 7/8       | ⚠ PLAN-04 sem commit |
| Commits → Testes          | 12/12     | ✓                    |
| Edge Cases → Testes       | 4/5       | ⚠ EC-03 sem cobertura |
| Refs órfãos em testes     | 1         | ⚠ FR-99 não existe   |

## Gaps detectados
- [HIGH] EC-03 (reagir em vídeo deletado) sem teste correspondente
- [MED] PLAN-04 (extrair value object) sem commit refactor
- [LOW] Teste `should_handle_ban` referencia FR-99 inexistente

## Recomendações
1. Adicione teste para EC-03
2. Renomeie o ref órfão para o ID correto
3. Execute o refactor planejado em PLAN-04
```

**Cálculo do Integrity Score:**

```
Score = (
    Spec_Plan_coverage * 0.20 +
    Plan_Commits_coverage * 0.20 +
    Commits_Tests_coverage * 0.20 +
    EdgeCases_Tests_coverage * 0.30 +
    (1 - Orphan_refs_ratio) * 0.10
) * 100
```

**Requisitos da skill:**

- Frontmatter completo (`name`, `description`, `keywords`) — sem isso a skill não carrega
- Skill agnóstica do nome da phase — deve funcionar para Phase 02, 03, 04 etc., recebendo o nome como argumento
- Não modificar nenhum arquivo do código — a skill é **somente leitura** sobre o repo, apenas escreve o `progress.md`
- Skill < 150 linhas no `skill.md` (use arquivos de referência se precisar de mais)
- Detectar IDs via regex robusto (`\[(FR|RN|EC|PLAN|UC)-\d{2}\]`)

> **Dica:** o `skill.md` é um prompt, não um programa. Não tente escrever lógica condicional complexa — descreva o que o agente deve fazer e em que ordem, e deixe arquivos de referência fornecerem os templates e regex.

### 5. Execução da auditoria e correção dos gaps

Depois de implementar o módulo, rode a skill:

```bash
claude "/phase-audit phase-03-reactions"
```

A skill vai gerar `docs/phases/phase-03-reactions.progress.md`. **Se o Integrity Score estiver abaixo de 80%, corrija os gaps e rode de novo.** É esperado iterar 2-3 vezes. Commits de correção também devem ter ID.

A versão final do `progress.md` (commitada no repo) é o relatório que será avaliado.

### 6. Atualização dos `CLAUDE.md`

Atualize `CLAUDE.md` (raiz) e `nestjs-project/CLAUDE.md` adicionando a seção de Reactions:

```markdown
## Reactions (Phase 03)
- Endpoints: POST /videos/:id/reactions, DELETE /videos/:id/reactions
- Tipos: like, love, laugh, sad, angry
- Regras: 1 reação por (user, video); banidos bloqueados; reagir novamente substitui
- Spec: docs/phases/phase-03-reactions.md
- Plano: docs/phases/phase-03-reactions.plan.md
- Audit: docs/phases/phase-03-reactions.progress.md
- Testes: src/reactions/**/*.spec.ts + test/reactions.e2e-spec.ts
```

`CLAUDE.md` inconsistente com o estado do código reprova.

### 7. Sessão arquivada

Exporte a sessão principal de Claude Code usada no desafio para `_claude-sessions/11-fase03-reactions.txt`. Não precisa editar — bruto serve. Esse arquivo é evidência secundária; usado pelo avaliador apenas em caso de inconsistência detectada entre o repo e o relatório.

## Critérios de Aceite

Todos os itens abaixo são obrigatórios.

### Spec (`docs/phases/phase-03-reactions.md`)

- [ ] Arquivo existe e segue o padrão de `phase-02-auth.md`
- [ ] Contém no mínimo 6 FR, 4 RN e 5 EC, todos com ID no formato `XX-NN`
- [ ] Critérios de aceite são testáveis e amarrados a IDs de FR
- [ ] Tipos de reação cobertos: `like, love, laugh, sad, angry`

### Plano (`docs/phases/phase-03-reactions.plan.md`)

- [ ] Gerado a partir da skill `plan-phase`
- [ ] Cada item tem ID `PLAN-NN` e referencia pelo menos um ID da spec
- [ ] Cobre 100% dos FR e RN da spec

### Implementação (`nestjs-project/src/reactions/`)

- [ ] Estrutura segue o padrão de `auth/`
- [ ] Migration cria a tabela `reactions` com unique constraint em `(user_id, video_id)`
- [ ] `npm test` e `npm run test:e2e` passam verdes
- [ ] Sobe via `docker compose -f nestjs-project/compose.yaml up -d` sem erros

### Rastreabilidade

- [ ] 100% dos commits da feature têm ID na mensagem
- [ ] 100% dos testes têm ID no nome
- [ ] Histórico Git mostra ciclo `RED → GREEN → REFACTOR` (sem squash)
- [ ] Integration tests usam Postgres real (não mockam TypeORM)

### Skill `phase-audit` (`.claude/skills/phase-audit/skill.md`)

- [ ] Existe com frontmatter completo (name, description, keywords)
- [ ] `skill.md` < 150 linhas
- [ ] Recebe nome da phase como argumento (funciona pra qualquer phase)
- [ ] Lê as 5 fontes (spec, plan, commits, testes, código)
- [ ] Gera o `progress.md` no formato definido no requisito 4
- [ ] Calcula o Integrity Score conforme a fórmula
- [ ] Não modifica código (somente leitura sobre o repo)

### Process Integrity Report (`docs/phases/phase-03-reactions.progress.md`)

- [ ] Gerado pela skill (não escrito à mão)
- [ ] Integrity Score ≥ 80%
- [ ] Status APROVADO
- [ ] Gaps listados (mesmo que vazios)

### CLAUDE.md

- [ ] Seção Reactions adicionada na raiz e em `nestjs-project/`
- [ ] Caminhos referenciados existem no repo
- [ ] Não menciona arquivos ou comportamentos que não existem

### Sessão arquivada

- [ ] `_claude-sessions/11-fase03-reactions.txt` presente

## Estrutura obrigatória do entregável

O desafio é executado **dentro do projeto existente** `mba-ia-greenfield-project/` (fornecido como repositório base). A tree abaixo mostra apenas os arquivos novos/alterados em relação ao estado inicial do repo:

```
mba-ia-greenfield-project/
├── .claude/
│   └── skills/
│       └── phase-audit/                              ← SUA SKILL
│           ├── skill.md
│           └── (arquivos de referência, se precisar)
├── _claude-sessions/
│   └── 11-fase03-reactions.txt                       ← export bruto
├── docs/
│   └── phases/
│       ├── phase-03-reactions.md                     ← spec (você escreve, guiado pela research)
│       ├── phase-03-reactions.plan.md                ← output de /plan-phase
│       └── phase-03-reactions.progress.md            ← output de /phase-audit
├── nestjs-project/
│   ├── CLAUDE.md                                     ← atualizado
│   ├── src/
│   │   ├── reactions/                                ← novo módulo
│   │   │   ├── reactions.module.ts
│   │   │   ├── reactions.module.spec.ts
│   │   │   ├── reactions.service.ts
│   │   │   ├── reactions.service.spec.ts
│   │   │   ├── reactions.service.integration-spec.ts
│   │   │   ├── reactions.controller.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-reaction.dto.ts
│   │   │   │   └── remove-reaction.dto.ts
│   │   │   └── entities/
│   │   │       ├── reaction.entity.ts
│   │   │       └── reaction.entity.integration-spec.ts
│   │   └── database/
│   │       └── migrations/
│   │           └── <timestamp>-CreateReactions.ts
│   └── test/
│       └── reactions.e2e-spec.ts                     ← e2e fica em test/ (irmão de src/)
└── CLAUDE.md                                          ← atualizado
```

> **Importante:** todos os caminhos acima são **relativos à raiz do `mba-ia-greenfield-project/`**. O fork do repositório base é a sua estrutura de trabalho — você não cria um repositório novo, apenas adiciona/edita os arquivos listados acima dentro dele.

## Repositório base

`<link-do-repositorio-base-aqui>`

O repositório já contém:

- Phases 01 e 02 fechadas (use como espelho de processo)
- Módulo `auth/` (modelo arquitetural completo a seguir) e `channels/` (referência secundária)
- Skills `research`, `plan-phase`, `implement-phase`, `generate-test-guide`, `testing-guide-nestjs-project`, `nestjs-best-practices`, `typeorm` — todas em `.claude/skills/`
- `compose.yaml` com Postgres pronto pra subir

## Ordem de execução sugerida

**Esforço estimado: 3 dias (~12–15h)**

### Dia 1 — Spec + Skill (≈ 5h)

1. **Setup e exploração:** rode o projeto base local, suba o compose, abra o módulo `auth/` (e secundariamente `channels/`) e leia. Entenda o padrão antes de qualquer coisa.
2. **Research:** invoque a skill `research` apontando para o domínio de Reactions. Use o output como insumo da spec.
3. **Spec:** escreva `docs/phases/phase-03-reactions.md` com todos os IDs estáveis. **Esse documento é a base de tudo** — invista nele.
4. **Skill `phase-audit`:** crie o `skill.md` e os arquivos de referência. Teste rodando a skill no repositório base (sem ter implementado nada ainda) — o Integrity Score deve estar baixíssimo, mas a skill já deve rodar sem erros.

### Dia 2 — Plan + Implementação TDD (≈ 7h)

5. **Plan:** invoque `plan-phase` passando a spec. Revise o output, ajuste os refs se precisar.
6. **Implementação TDD:** para cada item do plano, invoque `implement-phase` e siga `RED → GREEN → REFACTOR`. Cada etapa é um commit com ID na mensagem.
7. **Migration:** crie e rode.
8. **Suíte completa:** `npm test && npm run test:e2e`. Verde antes de seguir.

### Dia 3 — Auditoria + Fechamento (≈ 3h)

9. **Rode `/phase-audit`:** veja o score. Provavelmente vai estar abaixo de 80% na primeira rodada.
10. **Corrija gaps:** cada gap HIGH ou MED vira commit (com ID).
11. **Re-rode `/phase-audit`:** até passar de 80%.
12. **Atualize `CLAUDE.md`:** raiz e `nestjs-project/`.
13. **Exporte a sessão:** salve em `_claude-sessions/11-fase03-reactions.txt`.
14. **Revisão final:** passe o checklist de critérios de aceite item por item.

## Reprova automática

- ❌ Codar o módulo sem invocar as skills `research`, `plan-phase` e `implement-phase`
- ❌ 1 commit gigante (`feat: implement reactions`) — squash reprova
- ❌ Testes ou commits sem ID
- ❌ Spec sem IDs estáveis
- ❌ Skill `phase-audit` sem frontmatter ou que não roda
- ❌ Integrity Score < 80%
- ❌ `progress.md` escrito à mão (não gerado pela skill)
- ❌ `CLAUDE.md` inconsistente com o estado do código
- ❌ Mockar TypeORM em integration test
- ❌ Edge cases sem origem rastreável na regra de negócio

## Como será avaliado

| Critério | Peso | O que se avalia |
|----------|-----:|-----------------|
| **Spec rastreável** | 20% | IDs estáveis, critérios testáveis, mesmo padrão da Phase 02 |
| **Skill `phase-audit`** | 25% | Frontmatter, agnóstica de phase, calcula score corretamente, gera relatório válido |
| **Disciplina TDD com rastreabilidade** | 30% | Commits granulares com ID, testes com ID, ciclo RED→GREEN→REFACTOR visível |
| **Integrity Score final** | 15% | ≥ 80% (gerado pela própria skill) |
| **`CLAUDE.md` íntegro** | 10% | Reflete o estado real do código (raiz + nestjs-project) |

**Notas de corte:** ≥ 80% excelente · 65–79% aprovado · < 65% refazer.

## Dicas Finais

- **A spec é a fundação.** Se os IDs estiverem errados ou inconsistentes, todo o resto desanda. Gaste tempo aqui.
- **A skill `phase-audit` é um prompt, não um programa.** Não tente codar lógica complexa no `skill.md`. Descreva o procedimento, deixe a IA executar, e use arquivos de referência (templates, regex, exemplos) pra ancorar o comportamento.
- **Teste a skill com o repo vazio.** Ela tem que rodar mesmo quando ainda não há implementação — o score só vai ser baixo. Se ela quebrar, tem bug na skill, não no repo.
- **Não confie na primeira saída da IA.** O output da `plan-phase` provavelmente vai ter refs vagos ou errados. Refine. Revise. Re-rode.
- **Codar à mão é mais trabalho.** Manter IDs consistentes em spec, plano, commits e testes manualmente é mais lento que usar as skills do projeto. Use-as.
- **O relatório final é gerado pela skill, não escrito à mão.** Não edite o `progress.md` manualmente — a skill lê o estado real do repo, e o avaliador pode re-rodar a skill a qualquer momento. Se o relatório no repo divergir do que a skill produz, reprova.
- **Itere bastante.** É esperado 2-3 ciclos de audit → fix gaps → re-audit. Subir o Integrity Score acontece corrigindo os gaps no repo, não editando o relatório.
- **Spec curta. Skill enxuta. Testes que importam. Repositório honesto.**
