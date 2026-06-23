# Continuando o StreamTube com IA — Fase 06: Inscrição em Canais

## Descrição

O **StreamTube** é a plataforma de compartilhamento de vídeos que você acompanhou sendo construída ao longo do curso. O professor entregou as **Fases 01 (configuração base)** e **02 (cadastro, login e canais)** seguindo um workflow de desenvolvimento orientado por IA — `research → plan → implement` — apoiado por uma fundação de IA (CLAUDE.md, rules e skills) e pelos servidores MCP do projeto.

Seu desafio é **dar continuidade ao projeto entregando uma fatia da Fase 06 — Interações Sociais: a inscrição em canais** (seguir e deixar de seguir um canal), usando exatamente o mesmo método e as mesmas skills do curso. Além de implementar a feature, você vai **criar uma skill nova de verificação de fase** que audita a integridade do seu próprio processo e gera um relatório com uma nota de integridade.

Este é um desafio **de backend**: a entrega é a API e os artefatos do processo, sem parte de frontend.

> **Por que este desafio vai direto para a Fase 06, pulando a 03, 04 e 05?**
> O plano do projeto (`docs/project-plan.md`) define sete fases. As Fases 03 (upload de vídeos), 04 (gerenciamento) e 05 (página de visualização) giram em torno de vídeo, e a 03 em especial depende de infraestrutura pesada — object storage, fila de mensagens e um worker de processamento (FFmpeg) — que não existe no repositório base e fugiria do foco aqui, que é operar o workflow de IA de ponta a ponta. A Fase 06 (Interações Sociais) tem uma parte que **não depende de vídeo**: a inscrição em canais, que se apoia inteiramente em usuários e canais, prontos desde a Fase 02. Este desafio recorta exatamente essa parte — é a fatia da continuidade do projeto que dá para construir sobre o que já está pronto, sem te prender em infraestrutura.
>
> Dentro da própria Fase 06, ficamos só com a inscrição em canais (e não com likes e comentários) porque likes e comentários incidem sobre *vídeos*, que ainda não existem no projeto. Se você abrir o `project-plan.md`, vai notar que a Fase 06 aparece como "Depende de: Fase 02, Fase 05" — essa dependência da Fase 05 vem exatamente dos likes e comentários em vídeo. A inscrição em canais não depende de nenhuma fase de vídeo: ela se apoia só na Fase 02, que já está pronta.

## Sobre o uso de IA

A IA é a ferramenta de produção principal e obrigatória. Seu papel é de **maestro do processo**: conduzir as skills do projeto na ordem certa, revisar criticamente cada saída, refinar prompts quando o resultado vier raso, e manter os artefatos coerentes entre si.

Na prática:

- A investigação técnica sai da skill **`research`**.
- O plano de implementação sai da skill **`plan-phase`**.
- A implementação é conduzida pela skill **`implement-phase`**, em ciclos com teste.
- As diretrizes de teste vêm das skills **`generate-test-guide`** / **`testing-guide-nestjs-project`**.
- A verificação de integridade roda na skill **`verify-phase`**, que **você cria neste desafio**.
- Os **CLAUDE.md** são atualizados a partir do estado real do repositório.

> As skills `research`, `plan-phase`, `implement-phase`, `generate-test-guide` e `testing-guide-nestjs-project` **já vêm no projeto e são de uso obrigatório — não as recrie**. A única skill que você cria é a `verify-phase`.

A presença da IA precisa ser observável no repositório: skills invocadas, decisões e plano gerados, commits granulares e a sessão de Claude arquivada.

## Objetivo

Entregar, em um fork público do repositório base, dando continuidade ao projeto `mba-ia-greenfield-project`:

- **Decisões técnicas** da fase, geradas pela `research` (`docs/decisions/technical-decisions-phase-06-subscriptions.md`)
- **Plano de implementação** da fase, gerado pela `plan-phase` (`docs/phases/phase-06-subscriptions.md`), no mesmo formato da `phase-02-auth.md`
- **Módulo `subscriptions/`** implementado, espelhando o módulo `auth/`, com migration, testes e suíte verde
- **Skill nova `verify-phase`** que lê o repositório e gera um relatório de integridade do processo
- **Relatório de verificação** gerado pela skill (`docs/phases/phase-06-subscriptions.verification.md`), com nota **≥ 85%**
- **CLAUDE.md** (raiz e `nestjs-project/`) atualizados com a seção de Subscriptions
- **Sessão de Claude** arquivada em `_claude-sessions/11-fase06-subscriptions.txt`

Toda informação registrada nos artefatos deve ser rastreável ao plano ou ao código. Não invente requisitos, decisões ou testes sem origem identificável.

## Contexto

### O que já existe no projeto

O repositório base contém o StreamTube com as Fases 01 e 02 fechadas:

- Backend **NestJS + TypeORM + PostgreSQL** em `nestjs-project/`, que sobe via `compose.yaml`.
- Módulo **`auth/`** completo (Module + Controller + DTOs + Service + entities + guards + e2e em `test/`) — é o seu **espelho arquitetural**: o módulo de subscriptions deve seguir esse mesmo formato.
- Módulos **`users/`** e **`channels/`** com Service + entidade (sem controller HTTP).
- Entidades **`User`** e **`Channel`** com relação 1:1 (cada usuário tem um canal, criado no cadastro).
- Guard JWT global (`JwtAuthGuard`) com decorators `@Public()` e `@CurrentUser()`, filtro de exceção de domínio, `ValidationPipe` global, rate limiting e migrations versionadas.

O que **não** existe (e por isso está fora deste desafio): vídeos, upload, comentários, likes. Não há entidade, tabela ou módulo de vídeo — as Fases 03 a 05 não foram implementadas.

### O workflow e os artefatos do curso

O projeto adota o ciclo `research → plan → implement`, e você deve segui-lo:

| Etapa | Skill | Artefato gerado |
|---|---|---|
| Investigar o código e decidir a abordagem | `research` | `docs/decisions/technical-decisions-phase-NN-*.md` |
| Gerar o plano executável (passos, contratos, dados) | `plan-phase` | `docs/phases/phase-NN-*.md` |
| Implementar passo a passo, rodando os testes | `implement-phase` | código + `docs/phases/phase-NN-*.progress.md` |

Convenções do projeto que o seu trabalho precisa respeitar:

- O plano (`phase-NN-*.md`) é organizado em **Step Implementations** com IDs no formato **`SI-NN.x`** (ex.: `SI-06.1`, `SI-06.2`), além das seções **Data Model**, **API Contracts**, **Authorization Matrix**, **Error Catalog**, **Dependency Map** e **Deliverables**. Use a `phase-02-auth.md` como referência de formato.
- Os **commits são granulares por SI**, no formato real do projeto: `Implementando SI-06.x: <descrição>`.
- O **`phase-NN-*.progress.md`** é o log de progresso por SI (status, testes que passaram, observações), mantido durante a implementação.
- As skills ficam em **`.claude/skills/<nome>/SKILL.md`** (maiúsculo), com frontmatter `name`, `description` e `disable-model-invocation: true`.

> **Atenção a um detalhe que reprova:** o `progress.md` já tem um significado no projeto (log de SIs). O relatório da sua skill de verificação é um arquivo **diferente** (`.verification.md`) — não sobrescreva nem reaproveite o `progress.md`.

## Escopo da feature — Inscrição em Canais

Você vai implementar o seguinte, e nada além disso:

**Comportamento**

- Um usuário autenticado pode **se inscrever** em um canal e **cancelar a inscrição**.
- Um usuário pode **listar os canais que segue**.
- Um canal expõe a sua **contagem de inscritos**.

**Endpoints** (todos autenticados, reusando o `JwtAuthGuard` global)

- `POST   /channels/:channelId/subscription` — inscrever-se
- `DELETE /channels/:channelId/subscription` — cancelar inscrição
- `GET    /me/subscriptions` — listar canais que o usuário segue
- contagem de inscritos exposta na resposta do canal (defina a forma exata no plano)

**Regras de negócio e edge cases** (refine e numere no plano via `plan-phase`)

- Inscrição é única por par **(usuário, canal)** — garantida por *unique constraint* no banco.
- Um usuário **não pode se inscrever no próprio canal**.
- **Inscrição duplicada** e **cancelamento de inscrição inexistente**: defina o comportamento (idempotente vs. conflito/erro) na `research` e justifique.
- **Canal inexistente** → 404.
- Comportamento para **usuário não confirmado** (`is_confirmed = false`): decida e documente.
- A listagem de inscrições **não pode ter problema de N+1** (carregue o canal junto) — alinhado à rule `db-avoid-n-plus-one`.

**Persistência**

- Nova entidade **`Subscription`** → tabela **`subscriptions`**: `id` (uuid), `user_id` (uuid, FK → users), `channel_id` (uuid, FK → channels), `created_at`. *Unique* em `(user_id, channel_id)`; índices em `user_id` e `channel_id`.
- **Migration TypeORM** criando a tabela, no padrão das migrations existentes.

> Esse recorte mapeia direto em três entregáveis da Fase 06 do plano original: *"inscrição em canais (seguir/deixar de seguir)"*, *"área de canais seguidos"* e *"contagem de inscritos na página do canal"*.

## Requisitos

### 1. Decisões técnicas (via `research`)

Rode a skill **`research`** sobre o código existente para mapear os pontos de integração (entidades `User`/`Channel`, guard JWT, padrão de service/repository, filtro de exceções) e decidir a abordagem da feature. Salve o resultado em `docs/decisions/technical-decisions-phase-06-subscriptions.md`.

As decisões em aberto do escopo (inscrição duplicada, cancelamento inexistente, usuário não confirmado, forma de expor a contagem) devem ser **decididas e justificadas aqui** — é esse documento que alimenta o plano.

### 2. Plano de implementação (via `plan-phase`)

Invoque a skill **`plan-phase`** a partir das decisões. Salve em `docs/phases/phase-06-subscriptions.md`, **espelhando o formato da `phase-02-auth.md`**:

- Objetivo
- **Step Implementations** (`SI-06.1`, `SI-06.2`, …) com ações e arquivos a criar/tocar
- **Data Model** (tabela `subscriptions`, constraints, índices)
- **API Contracts** (cada endpoint com payload de exemplo e status codes)
- **Authorization Matrix**
- **Error Catalog**
- **Dependency Map** e **Deliverables**

> Revise criticamente a saída crua da skill. Normalmente são necessárias 1–2 iterações: contratos vagos, SIs grandes demais ou dependências fora de ordem envenenam a implementação.

### 3. Implementação (via `implement-phase` + testes)

Implemente o módulo em `nestjs-project/src/subscriptions/`, **espelhando o módulo `auth/`** e conduzido pela skill **`implement-phase`** (que executa SI a SI e só avança com os testes do SI passando).

A organização concreta de arquivos é **decisão do seu plano** (saída da `plan-phase`), não algo que este enunciado entrega pronto — definir a estrutura faz parte do que o desafio avalia. A regra é **consistência arquitetural com o `auth/`**: a mesma divisão em camadas (Module, Controller, Service, DTOs, entidade) e os mesmos tipos de teste que o `auth/` tem — unit (`.spec`), integração (`.integration-spec`) e e2e em `test/`. Investigue o `auth/` na etapa de research e deixe o plano definir os arquivos exatos. Siga também as convenções do projeto para onde vivem a migration (`src/database/migrations/`) e o teste e2e (`test/`).

Independentemente da estrutura que o plano definir, estes artefatos são **inegociáveis** (e cobrados nos Critérios de Aceite): o módulo registrado, um controller com os endpoints, um service com testes unit e de integração, a entidade `Subscription`, o teste e2e da feature e a migration criando a tabela `subscriptions` com *unique* em `(user_id, channel_id)`.

Disciplina de implementação (a mesma do projeto do professor):

- **Commits granulares por SI**, no formato `Implementando SI-06.x: <descrição>`. Um commit único gigante (`feat: subscriptions`) reprova.
- Cada SI com comportamento testável tem **testes** (unit no `.spec`, integração no `.integration-spec`), registrados no `progress.md`.
- **Testes de integração e e2e usam o PostgreSQL real** do `compose.yaml` — **não mocke o TypeORM** em teste de integração.
- Aplique TDD dentro de cada SI (escreva o teste que falha antes de implementar). A boa prática de testes vem das skills de teste do projeto.
- Mantenha o **`docs/phases/phase-06-subscriptions.progress.md`** atualizado (status + testes por SI), como na Fase 02.

### 4. Skill nova: `verify-phase`

**Por que você cria essa skill.** Num workflow tocado por IA, o agente produz muito e rápido, e é fácil um passo escapar sem ninguém perceber: um SI planejado que nunca foi implementado, código que subiu sem teste, um commit citando um passo que não existe, ou o `progress.md` dizendo uma coisa e o código outra. Conferir isso na mão, no fim de cada fase, é lento e sujeito a erro. A `verify-phase` é um **portão de QA reutilizável**: cruza as fontes de verdade do processo (plano, commits, progress e código/testes) e responde, de forma objetiva, se o que você entregou bate com o que você planejou — e onde estão os furos. Com isso, ela fecha o pilar de **Skills** do curso: você usou skills que *produzem* o trabalho (research, plan, implement) e agora cria uma que *governa a qualidade* dele. Repare que ela não duplica a `implement-phase`: aquela executa pra frente, garantindo teste verde enquanto avança; a `verify-phase` audita o estado final pra trás, plano contra entregue.

Crie a skill em **`.claude/skills/verify-phase/SKILL.md`** (na raiz do projeto, não dentro de `nestjs-project/`). Ela **não duplica** nenhuma skill existente: enquanto as outras *produzem* a fase, esta **mede a integridade do processo** que você executou.

Invocação:

```bash
claude "/verify-phase phase-06-subscriptions"
```

A skill **lê o repositório (somente leitura)** e cruza as fontes da fase:

1. O **plano** (`docs/phases/<fase>.md`) — extrai os `SI-NN.x`, os arquivos esperados e os critérios de aceite.
2. O **git log** da fase — extrai os `SI-NN.x` referenciados nos commits.
3. O **progress.md** (`docs/phases/<fase>.progress.md`) — status e testes por SI.
4. O **código e os testes** em disco — confere se os arquivos previstos pelo plano existem.
5. O **estado da suíte** — se os SIs com testes estão verdes (lê o `progress.md`; opcionalmente executa a suíte).

E gera **`docs/phases/<fase>.verification.md`** neste formato:

```markdown
# Fase 06 — Relatório de Integridade do Processo

## Nota de Integridade
88%  STATUS: APROVADO  (corte: ≥ 85%)

## Matriz de Cobertura
| Dimensão                       | Cobertura | Detalhe                      |
|--------------------------------|-----------|------------------------------|
| Plano → Commits (SI)           | 7/7       | ✓                            |
| SI → Progress                  | 7/7       | ✓                            |
| Arquivos previstos             | 11/12     | ⚠ falta o e2e do unsubscribe |
| Suíte de testes                | verde     | ✓                            |
| Refs órfãos (SI fora do plano) | 0         | ✓                            |

## Gaps detectados
- [MED] SI-06.5 sem teste e2e correspondente

## Recomendações
1. Adicione o e2e do cancelamento de inscrição
```

**Cálculo da nota** (defina os pesos em um arquivo de referência da skill; sugestão):

```
Nota = (
    Plano_Commits   * 0.25 +
    SI_Progress     * 0.20 +
    Arquivos        * 0.25 +
    Suite_verde     * 0.20 +
    (1 - Refs_orfaos_ratio) * 0.10
) * 100
```

Requisitos da skill:

- **Frontmatter** com `name`, `description` e `disable-model-invocation: true` (padrão das skills do projeto).
- **Agnóstica de fase**: recebe o nome da fase como argumento e funciona para `phase-02-auth`, `phase-06-subscriptions` etc.
- **Somente leitura** sobre o repositório — só escreve o `.verification.md`.
- Detecta IDs com regex robusto: `\bSI-\d{2}\.\d+\b`.
- O `SKILL.md` **é um prompt, não um programa**: descreva o procedimento e a ordem, e use arquivos de referência (template do relatório, regex, pesos) para ancorar o comportamento.

> **Teste a skill com o repo "vazio" também.** Ela tem que rodar mesmo antes da implementação — a nota é que vai ser baixa. Se ela quebra sem implementação, o bug é na skill, não no repo.

### 5. Verificação e correção de gaps

Depois de implementar, rode `claude "/verify-phase phase-06-subscriptions"`. **Se a nota ficar abaixo de 85%, corrija os gaps no repositório e rode de novo** — é esperado iterar 2–3 vezes. A versão final do `.verification.md` commitada é o relatório avaliado.

> A nota sobe **corrigindo o repositório**, não editando o relatório à mão. O avaliador pode re-rodar a sua skill; se o relatório no repo divergir do que a skill produz, reprova.

### 6. Atualização dos CLAUDE.md

Atualize `CLAUDE.md` (raiz) e `nestjs-project/CLAUDE.md` com a seção de Subscriptions, refletindo o estado real do código:

```markdown
## Subscriptions (Fase 06 — recorte)
- Endpoints: POST/DELETE /channels/:id/subscription, GET /me/subscriptions
- Regra: 1 inscrição por (usuário, canal); sem auto-inscrição
- Plano: docs/phases/phase-06-subscriptions.md
- Verificação: docs/phases/phase-06-subscriptions.verification.md
- Testes: src/subscriptions/**/*.spec.ts + test/subscriptions.e2e-spec.ts
```

`CLAUDE.md` que cite arquivos ou comportamentos inexistentes reprova.

### 7. Sessão arquivada

Exporte a sessão principal de Claude Code para `_claude-sessions/11-fase06-subscriptions.txt` (bruto serve). É evidência secundária, usada pelo avaliador em caso de divergência entre o repositório e o relatório.

## Critérios de Aceite

Todos obrigatórios. Esta é a lista única de avaliação — os requisitos não se repetem em outra seção.

**Decisões e plano**

- [ ] `technical-decisions-phase-06-subscriptions.md` gerado pela `research`, com as decisões em aberto resolvidas e justificadas
- [ ] `phase-06-subscriptions.md` gerado pela `plan-phase`, no formato da `phase-02-auth.md` (SIs `SI-06.x`, Data Model, API Contracts, Authorization Matrix, Error Catalog, Deliverables)

**Implementação**

- [ ] Módulo `subscriptions/` no padrão de `auth/` (Module + Controller + DTO + Service + entities + e2e)
- [ ] Migration cria a tabela `subscriptions` com *unique* em `(user_id, channel_id)`
- [ ] Endpoints de inscrever, cancelar, listar inscrições e contagem de inscritos funcionando, todos protegidos por autenticação
- [ ] Regras cobertas: auto-inscrição bloqueada; canal inexistente → 404; duplicada e cancelamento inexistente conforme decidido
- [ ] `npm test` e `npm run test:e2e` verdes; sobe via `docker compose -f nestjs-project/compose.yaml up -d`

**Rastreabilidade e processo**

- [ ] Commits granulares por SI no formato `Implementando SI-06.x: ...` (sem commit único gigante)
- [ ] Testes de integração/e2e usam Postgres real (sem mock de TypeORM)
- [ ] `phase-06-subscriptions.progress.md` reflete os SIs e seus testes

**Skill `verify-phase`**

- [ ] `.claude/skills/verify-phase/SKILL.md` com frontmatter (`name`, `description`, `disable-model-invocation`)
- [ ] Recebe o nome da fase como argumento (funciona para qualquer fase)
- [ ] Lê plano + git log + progress.md + arquivos + suíte e gera o `.verification.md` no formato definido
- [ ] É somente leitura sobre o repositório

**Relatório e fundação**

- [ ] `phase-06-subscriptions.verification.md` gerado pela skill (não escrito à mão), com nota **≥ 85%** e STATUS APROVADO
- [ ] `CLAUDE.md` raiz e `nestjs-project/` com a seção Subscriptions, coerentes com o código
- [ ] `_claude-sessions/11-fase06-subscriptions.txt` presente

## Reprova automática

- ❌ Implementar sem usar as skills `research`, `plan-phase` e `implement-phase`
- ❌ Commit único gigante ou sem referência ao SI
- ❌ Plano que não segue o formato da `phase-02-auth.md` (sem SIs, sem contratos)
- ❌ Mockar o TypeORM em teste de integração
- ❌ Skill `verify-phase` sem frontmatter, que não roda, ou que escreve fora do `.verification.md`
- ❌ Reaproveitar/sobrescrever o `progress.md` como relatório de verificação
- ❌ Nota de integridade < 85%, ou `.verification.md` escrito à mão
- ❌ `CLAUDE.md` inconsistente com o código
- ❌ Inventar vídeos, likes ou comentários — fora do escopo (não existem no projeto)

## Estrutura do entregável

Tudo dentro do fork do `mba-ia-greenfield-project`. Abaixo, apenas o que é novo/alterado:

```
mba-ia-greenfield-project/
├── .claude/skills/verify-phase/
│   ├── SKILL.md                                          ← SUA SKILL
│   └── (arquivos de referência: template, regex, pesos)
├── _claude-sessions/
│   └── 11-fase06-subscriptions.txt                       ← export bruto
├── docs/
│   ├── decisions/
│   │   └── technical-decisions-phase-06-subscriptions.md ← /research
│   └── phases/
│       ├── phase-06-subscriptions.md                     ← /plan-phase
│       ├── phase-06-subscriptions.progress.md            ← /implement-phase
│       └── phase-06-subscriptions.verification.md        ← /verify-phase
├── nestjs-project/
│   ├── CLAUDE.md                                         ← atualizado
│   ├── src/
│   │   ├── subscriptions/                                ← novo módulo (espelha auth/)
│   │   │   └── ...
│   │   └── database/migrations/
│   │       └── <timestamp>-CreateSubscriptions.ts
│   └── test/
│       └── subscriptions.e2e-spec.ts
└── CLAUDE.md                                             ← atualizado
```

## Repositório base

`<link-do-repositorio-base-aqui>`

O fork do repositório base é a sua estrutura de trabalho — você não cria um repositório novo, apenas adiciona/edita os arquivos acima dentro dele. O repositório já contém as Fases 01 e 02, os módulos `auth/`, `users/` e `channels/`, as skills `research`, `plan-phase`, `implement-phase`, `generate-test-guide`, `testing-guide-nestjs-project`, `nestjs-best-practices` e `typeorm`, e o `compose.yaml` com o PostgreSQL.

## Ordem de execução sugerida

1. **Fork e setup.** Faça o fork, suba o backend (`docker compose -f nestjs-project/compose.yaml up -d`) e rode a suíte atual para confirmar que está verde.
2. **Research.** Rode a `research` sobre o código e feche as decisões em aberto do escopo.
3. **Plano.** Rode a `plan-phase` a partir das decisões. Revise contratos e SIs criticamente (1–2 iterações).
4. **Implementação.** Conduza a `implement-phase` SI a SI, com testes, commitando por SI e mantendo o `progress.md`.
5. **Skill `verify-phase`.** Crie a skill (comece testando-a com o repo ainda incompleto — a nota baixa é esperada).
6. **Verificar e corrigir.** Rode a skill, corrija os gaps no repo e re-rode até a nota ≥ 85%.
7. **Fundação e sessão.** Atualize os CLAUDE.md e arquive a sessão.
8. **Revisão final.** Passe pela lista de Critérios de Aceite item a item antes do push.

## Dicas finais

- **Continuidade real, não retrabalho.** O valor do desafio é mostrar que você sabe operar o workflow do curso em uma feature nova e coerente — não reescrever o que o professor já fez. Reuse os padrões existentes (guard, filtro de exceções, repository, migrations).
- **O plano é o contrato.** Se os SIs e contratos estiverem frouxos, a implementação e a verificação desandam. Gaste tempo no plano.
- **A skill é um prompt.** Não tente codar lógica complexa no `SKILL.md`; descreva o procedimento e ancore com arquivos de referência (template, regex, pesos).
- **Repositório honesto.** A nota sobe corrigindo o repo, não o relatório. O avaliador pode re-rodar a sua skill.
- **Itere.** É normal precisar de 1–2 iterações no plano e 2–3 no ciclo verificar → corrigir → re-verificar.