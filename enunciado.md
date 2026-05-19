# Desafio Final — Desenvolvimento de Aplicações com IA

> **Curso:** MBA em Desenvolvimento de Aplicações com IA
> **Projeto:** `mba-ia-greenfield-project` (StreamTube)
> **Stack:** NestJS · TypeORM · PostgreSQL
> **Esforço estimado:** **até 3 dias** (~12–15h)

---

## 🎬 A história

Sexta-feira, 17h47. Você está fechando o notebook quando uma mensagem cai do **Tech Lead da StreamTube**:

> *"Fala! Tô precisando de uma força. O dev que tava no projeto saiu e deixou a feature de **Reações** pela metade. Vídeo sem reação não engaja, e marketing tá em cima. Você consegue fechar a **Phase 03** até segunda na boa? Mas faz **direito**, viu? Já fechamos as Phases 01 (config base) e 02 (auth) seguindo o processo do MBA — não me faça quebrar a cadência agora. Confio no processo que você aprendeu."*

A **StreamTube** é uma plataforma de streaming de vídeo. Usuários têm **canais**, autenticam, e agora precisam conseguir **reagir aos vídeos** (`like, love, laugh, sad, angry`) com contagem agregada por tipo.

O projeto já tem o workflow de skills `research → plan → implement` rodando (veja `docs/diagrams/skills-workflow.mermaid`). **Use-o.**

---

## 🎯 Os 3 pilares avaliados
1. **Spec Driven Development** — documentar a Phase 03 antes de codar
2. **Skills personalizadas** — governar a IA com contexto on-demand
3. **TDD + auditoria** — não inflar cobertura com testes inúteis

> Critério: **maturidade de processo**, não volume de código.

---

## 📦 O que entregar

Trabalhe direto na branch `main` do seu projeto. Não precisa abrir PR — o que conta é o **estado final do repositório** ao terminar.

| # | Artefato | Caminho |
|---|----------|---------|
| 1 | Spec da fase | `docs/phases/phase-03-reactions.md` |
| 2 | Decisões técnicas | `docs/decisions/technical-decisions-phase-03-reactions.md` |
| 3 | Skill personalizada da feature | `.claude/skills/reactions-feature/skill.md` |
| 4 | Módulo NestJS implementado | `nestjs-project/src/reactions/` |
| 5 | Migration TypeORM | `nestjs-project/src/database/migrations/<timestamp>-CreateReactions.ts` |
| 6 | Testes (unit + integration + e2e) | `*.spec.ts` · `*.integration-spec.ts` · `test/reactions.e2e-spec.ts` |
| 7 | Auditoria final | `docs/phases/phase-03-reactions.progress.md` |
| 8 | `CLAUDE.md` raiz e `nestjs-project/CLAUDE.md` atualizados | (existentes) |
| 9 | Sessão de Claude arquivada | `_claude-sessions/11-fase03-reactions.txt` |

### Estrutura final esperada (só o que muda)

```
mba-ia-greenfield-project/
├── _claude-sessions/
│   └── 11-fase03-reactions.txt                       ← NOVO
├── docs/
│   ├── decisions/
│   │   └── technical-decisions-phase-03-reactions.md ← NOVO
│   └── phases/
│       ├── phase-03-reactions.md                     ← NOVO (spec)
│       └── phase-03-reactions.progress.md            ← NOVO (auditoria)
└── nestjs-project/
    └── src/
        ├── reactions/                                ← NOVO módulo
        │   ├── reactions.module.ts
        │   ├── reactions.module.spec.ts
        │   ├── reactions.service.ts
        │   ├── reactions.service.spec.ts
        │   ├── reactions.service.integration-spec.ts
        │   ├── reactions.controller.ts
        │   ├── dto/
        │   │   ├── create-reaction.dto.ts
        │   │   └── remove-reaction.dto.ts
        │   └── entities/
        │       ├── reaction.entity.ts
        │       └── reaction.entity.integration-spec.ts
        ├── database/migrations/
        │   └── <timestamp>-CreateReactions.ts        ← NOVO
        └── test/
            └── reactions.e2e-spec.ts                 ← NOVO
```

---

## 📅 Dia 1 — Spec + Skill (≈ 4h)

### O que entregar
- `docs/phases/phase-03-reactions.md` (espelhe o padrão de `phase-02-auth.md`)
- `docs/decisions/technical-decisions-phase-03-reactions.md`
- `.claude/skills/reactions-feature/skill.md`

### Como fazer
Use as skills `research` e `plan` já existentes no projeto para gerar a spec. **Não pule essa etapa.** A spec é a base de tudo — sem ela, as fases seguintes desandam.

A spec da Phase 03 deve cobrir, no mínimo:

```markdown
## Objetivo de negócio
[1 parágrafo]

## Casos de uso
1. Usuário autenticado reage a um vídeo
2. Usuário troca a reação anterior
3. Usuário remove a reação
4. GET de vídeo retorna agregação por tipo

## Regras de negócio
- 1 reação por (user_id, video_id)
- Reagir novamente substitui a anterior
- Usuário banido não pode reagir
- Tipos válidos: like, love, laugh, sad, angry

## Modelo de dados
- Tabela `reactions` (user_id, video_id, type, created_at)
- Unique constraint em (user_id, video_id)
- FK com cascade no delete de video/user

## Edge cases
- Reagir em vídeo deletado entre GET e POST
- Dupla submissão concorrente
- Tipo inválido vindo da request

## Critérios de aceite (testáveis)
- [ ] POST /videos/:id/reactions retorna 201
- [ ] GET /videos/:id inclui `{ reactions: { like: 12, love: 3, ... } }`
- [ ] Reagir em vídeo inexistente retorna 404
- [ ] Reagir já reagido sobrescreve, não duplica
```

A skill `reactions-feature` (frontmatter obrigatório):

```markdown
---
name: reactions-feature
description: Guia para implementar a Phase 03 de Reações em vídeos da StreamTube seguindo TDD e as regras do PRD. Use quando o usuário pedir implementação, teste ou refatoração relacionada a reactions, react ou reagir.
keywords: [reactions, react, reagir, like, phase-03]
---

# Quando aplicar
Implementação ou ajuste em qualquer arquivo de `src/reactions/`.

# Workflow
1. Ler `docs/phases/phase-03-reactions.md` antes de qualquer ação
2. Seguir o padrão dos módulos `auth/` e `channels/` (TypeORM + DTO + Service + Controller)
3. Para cada caso de uso: Red → Green → Refactor
4. Não escrever implementação sem teste falhando antes

# Regras
- Máximo 3 mocks por teste
- Testes nomeados de forma descritiva
- Integration tests usam Postgres real (não mockar TypeORM)
```

### ⚠️ Pontos de atenção
- Critérios de aceite devem ser **testáveis**
- Skill com `description` ruim **não é carregada** — invista nela
- Mantenha o `skill.md` **curto** (< 100 linhas)
- Siga o padrão de nomenclatura já existente no projeto (`*.integration-spec.ts`, `*.module.spec.ts`)

### 📚 Para consultar
**Spec / SDD:**
- Módulo 1 (Introdução) - aula nº 1 - Introdução
- Módulo 1 (Introdução) - aula nº 4 - Documentação e Artefatos
- Módulo 1 (Introdução) - aula nº 6 - SDD
- Módulo 1 (Introdução) - aula nº 7 - Pilares do Desenvolvimento com IA

**`CLAUDE.md` / `agents.md`:**
- Módulo 2 (Quick Start) - aula nº 4 - Diferença do README
- Módulo 2 (Quick Start) - aula nº 6 - Arquivo de Inicialização do Agente
- Módulo 2 (Quick Start) - aula nº 7 - Conteúdo de Inicialização
- Módulo 2 (Quick Start) - aula nº 8 - O que não deve ter

**Skills:**
- Módulo 3 (Skills) - aula nº 2 - Os Problemas que as Skills Resolvem
- Módulo 3 (Skills) - aula nº 3 - Mapeamento de Skills em um Projeto
- Módulo 3 (Skills) - aula nº 9 - Frontmatter
- Módulo 3 (Skills) - aula nº 10 - Skills e Arquivos de Referência
- Módulo 3 (Skills) - aula nº 14 - Progressive Disclosure
- Módulo 3 (Skills) - aula nº 15 - Conditional Details
- Módulo 3 (Skills) - aula nº 17 - Criando Nossa Primeira Skill
- Módulo 3 (Skills) - aula nº 19 - Skill como Comando e Formatos de Invocação

---

## 📅 Dia 2 — Implementação via TDD (≈ 6h)

### O que entregar
- Módulo `reactions/` completo em `nestjs-project/src/reactions/`
- Migration TypeORM criando tabela `reactions`
- Suíte verde (`npm test` + `npm run test:integration`)
- Histórico Git mostrando o ciclo

### Como fazer

Para **cada caso de uso** do PRD:

```
1. RED      → escrever teste; ele falha
2. GREEN    → implementar o mínimo para passar
3. REFACTOR → limpar sem quebrar
4. COMMIT   → registrar a etapa
```

**Histórico esperado:**
```
test(reactions): add failing test for create reaction         [RED]
feat(reactions): implement create reaction usecase            [GREEN]
refactor(reactions): extract reaction type to value object    [REFACTOR]
test(reactions): add failing test for replace existing        [RED]
feat(reactions): handle replace on duplicate                  [GREEN]
test(reactions): add integration test with real postgres      [RED]
feat(reactions): wire repository with typeorm                 [GREEN]
...
```

Pirâmide de testes esperada (já é o padrão do projeto):
- `reactions.service.spec.ts` — unit (mocks pontuais)
- `reaction.entity.integration-spec.ts` — entidade contra Postgres real
- `reactions.service.integration-spec.ts` — service contra DB
- `test/reactions.e2e-spec.ts` — endpoint via Supertest

### ⚠️ Pontos de atenção
- **Anti-pattern proibido:** *horizontal slicing* (todos os testes antes de toda implementação)
- **Refactor após cada ciclo**, não no final
- Não mockar TypeORM em integration test — use o Postgres do `compose.yaml`
- Não testar getter/construtor — testes triviais reprovam

### 📚 Para consultar
**Fundamentos de teste com IA:**
- Módulo 2 (Quick Start) - aula nº 10 - Testabilidade
- Módulo 5 (Testes Automatizados vs IA) - aula nº 1 - Testes no Dia ZERO
- Módulo 5 (Testes Automatizados vs IA) - aula nº 2 - Falsa Sensação de Segurança
- Módulo 5 (Testes Automatizados vs IA) - aula nº 3 - Definição e Categorização de Testes
- Módulo 5 (Testes Automatizados vs IA) - aula nº 4 - Cobertura de Código pode ser um Vilão
- Módulo 5 (Testes Automatizados vs IA) - aula nº 5 - Testes Desnecessários
- Módulo 5 (Testes Automatizados vs IA) - aula nº 11 - Worth vs NOT Worth Testing

**TDD com IA:**
- Módulo 5 (Testes Automatizados vs IA) - aula nº 18 - TDD - Test Driven Developement com IA
- Módulo 5 (Testes Automatizados vs IA) - aula nº 19 - TDD na Prática e Análise de Edge Cases
- Módulo 5 (Testes Automatizados vs IA) - aula nº 20 - Case - Reescrita do Next.js através de Testes

---

## 📅 Dia 3 — Auditoria + Fechamento (≈ 4h)

### O que entregar
- `docs/phases/phase-03-reactions.progress.md` (auditoria)
- Correções dos achados HIGH
- `CLAUDE.md` raiz **e** `nestjs-project/CLAUDE.md` atualizados
- `_claude-sessions/11-fase03-reactions.txt` (export da sessão principal)
- Commit final com tudo na `main`

### Como fazer

**1. Auditoria.** Peça ao agente:

> *"Analise os testes em `src/reactions/` e classifique em **keep / remove / refactor** considerando: triviais, testes de framework e mocks excessivos (> 3). Liste **5 edge cases** dos critérios do PRD que não estão cobertos."*

Salve em `docs/phases/phase-03-reactions.progress.md`:

```markdown
# Phase 03 — Progress & Audit

## Status
✅ Concluída

## Testes classificados
- ✅ KEEP: should reject invalid reaction type
- ❌ REMOVE: should construct reaction (trivial)
- 🔧 REFACTOR: should react with 4 mocks → virar integration test

## Edge cases descobertos vs implementados
1. [HIGH] Reagir em vídeo deletado entre GET e POST → ✅ tratado
2. [HIGH] Dupla submissão concorrente → ✅ unique constraint cobre
3. [MED] Usuário banido tentando reagir → ✅ tratado em guard
4. [MED] Tipo inválido na request → ✅ DTO validation
5. [LOW] Contagem zerada em vídeo sem reações → ✅ default 0

## Decisões revisadas
- Optei por unique constraint no banco em vez de check em código
- Reuso da `DomainException` já existente no projeto
```

**2. Corrija os HIGH.** Cada edge case marcado como HIGH não tratado vira commit antes de fechar.

**3. Atualize os `CLAUDE.md`** (raiz e nestjs-project) adicionando a seção de Reactions:

```markdown
## Reactions (Phase 03)
- Endpoint: POST /videos/:id/reactions, DELETE /videos/:id/reactions
- Tipos: like, love, laugh, sad, angry
- Regras: 1 reação por usuário, banidos bloqueados, troca substitui
- Spec: docs/phases/phase-03-reactions.md
- Testes: src/reactions/**/*.spec.ts + test/reactions.e2e-spec.ts
```

**4. Garanta que o projeto sobe e os testes passam:**

```bash
docker compose -f nestjs-project/compose.yaml up -d
cd nestjs-project && npm run migration:run
npm test && npm run test:e2e
```

Tudo verde = entrega fechada.

### ⚠️ Pontos de atenção
- **Cobertura % é traiçoeira** — alta com testes triviais é pior que baixa honesta
- `CLAUDE.md` não pode **mentir**
- Não invente edge case para inflar relatório — só vale o que veio do PRD

### 📚 Para consultar
**Auditoria e edge cases:**
- Módulo 5 (Testes Automatizados vs IA) - aula nº 6 - Criando na Prática Planejamento para Remoção de Testes sem Valor
- Módulo 5 (Testes Automatizados vs IA) - aula nº 7 - Report dos Testes que Poderiam ser Removidos
- Módulo 5 (Testes Automatizados vs IA) - aula nº 8 - Caminho Feliz vs Caminho Teste e Edge Cases
- Módulo 5 (Testes Automatizados vs IA) - aula nº 9 - Gerando Report de Edge Cases
- Módulo 5 (Testes Automatizados vs IA) - aula nº 10 - Skill para Test Guidelines
- Módulo 5 (Testes Automatizados vs IA) - aula nº 12 - Explorando Modos de Criação e de Auditoria
- Módulo 5 (Testes Automatizados vs IA) - aula nº 13 - Executando Skill e Recebendo Report

**Evolução de `CLAUDE.md` e fechamento:**
- Módulo 2 (Quick Start) - aula nº 11 - Gotchas e Policies
- Módulo 2 (Quick Start) - aula nº 12 - Evolução
- Módulo 2 (Quick Start) - aula nº 13 - Otimizando Arquivos Existentes
- Módulo 2 (Quick Start) - aula nº 14 - Dica Final

---

## 📏 Como será avaliado

| Critério | Peso | O que se avalia |
|----------|-----:|-----------------|
| **Spec da Phase 03** | 25% | `phase-03-reactions.md` no mesmo padrão da Phase 02, testável |
| **Skill personalizada** | 20% | Frontmatter dispara automática, < 100 linhas, padrão da casa |
| **Disciplina TDD** | 30% | Histórico Git mostra Red→Green→Refactor real |
| **Auditoria honesta** | 15% | `progress.md` com classificação justificada |
| **`CLAUDE.md` íntegro** | 10% | Reflete o estado real do código (raiz + nestjs-project) |

**Notas de corte:** ≥ 80% excelente · 65–79% aprovado · < 65% refazer.

---

## 🚫 Reprova automática

- ❌ Pedir tudo de uma vez à IA sem rodar `research` + `plan`
- ❌ 1 commit gigante `feat: implement reactions`
- ❌ Não seguir o padrão dos módulos existentes (`auth/`, `channels/`)
- ❌ Mockar TypeORM em integration test
- ❌ Skill com `description` genérica ou ausente
- ❌ Testes triviais inflando cobertura
- ❌ `CLAUDE.md` mentindo

---

## 💡 Dica final

**Não é entregar código. É entregar processo.** Se em 3 dias você fechou só 2 dos 4 casos de uso, mas todos com spec + TDD + audit reais — vale mais que 4 casos sem governança.

Spec curta. Skill enxuta. Testes que importam. Repositório honesto.
