# Fase <NN>: Relatório de Integridade do Processo

## Nota de Integridade
<SCORE>%  STATUS: <APROVADO|REPROVADO>  (corte: ≥ 85%)

## Matriz de Cobertura
| Dimensão                       | Cobertura   | Detalhe                          |
|--------------------------------|-------------|----------------------------------|
| Plano → Commits (SI)           | <x/y>       | <✓ | ⚠ detalhe>                  |
| SI → Progress                  | <x/y>       | <✓ | ⚠ detalhe>                  |
| Arquivos previstos             | <x/y>       | <✓ | ⚠ qual falta>               |
| Suíte de testes                | <verde|...> | <✓ | ⚠ detalhe>                  |
| Refs órfãos (SI fora do plano) | <n>         | <✓ | ⚠ quais>                    |

## Gaps detectados
<um item por gap, com severidade [LOW] | [MED] | [HIGH]; se nenhum, escreva "- Nenhum gap detectado.">
- [<SEV>] <descrição objetiva do gap>

## Recomendações
<ações concretas para subir a nota corrigindo o repositório; se nenhuma, escreva "1. Nenhuma ação necessária.">
1. <recomendação>

---
<!-- Cálculo:
Score = (PlanCommits*0.25 + SIProgress*0.20 + Files*0.25 + SuiteGreen*0.20 + (1-OrphanRatio)*0.10) * 100
PlanCommits=<...> SIProgress=<...> Files=<...> SuiteGreen=<...> OrphanRatio=<...>
-->
