# Report dos testes que poderiam ser removidos

Nesta aula, é apresentado o resultado da **análise automatizada de testes** em um projeto de software, demonstrando como a inteligência artificial pode apoiar a auditoria e a otimização da estratégia de testes. O objetivo é avaliar a qualidade e o valor dos testes existentes, identificando redundâncias e oportunidades de simplificação sem comprometer a confiabilidade do sistema.

O professor mostra que o projeto possui centenas de testes distribuídos entre *back-end* e *front-end*, muitos deles focados em validar comportamentos já garantidos por bibliotecas externas, como **Pydantic, Zod e SQLAlchemy**, ou repetindo verificações já cobertas por testes de integração. Nesse cenário, a análise indica que uma parcela significativa desses testes poderia ser removida sem gerar impacto negativo, evidenciando que **alta cobertura não necessariamente significa qualidade** ou eficiência na estratégia de testes.

Para contextualizar essa avaliação, é revisado o conceito da **pirâmide de testes**, que organiza os testes em três níveis principais:

- **Testes de unidade**: mais rápidos e econômicos, pois funcionam de forma desacoplada e permitem identificar com precisão a origem de falhas em regras de negócio.
- **Testes de integração**: validam o funcionamento conjunto dos componentes.
- **Testes end-to-end**: verificam o comportamento completo do sistema, sendo mais lentos e custosos por envolver múltiplas camadas e dependências externas.

O conteúdo destaca que a escolha da estratégia de testes depende da abordagem do time e do contexto do projeto. Uma prática comum é utilizar testes de integração para validar os principais casos de uso e complementar essa cobertura com testes de unidade em pontos críticos da lógica de negócio, garantindo maior precisão na detecção de regressões e efeitos colaterais. Essa combinação permite equilibrar **custo, velocidade e confiabilidade** na execução da esteira de integração contínua.

Também é enfatizado que nem todos os testes precisam ser mantidos quando determinadas validações já são realizadas por bibliotecas confiáveis ou *frameworks* consolidados. A análise automatizada deve ser interpretada como um **suporte à tomada de decisão**, e não como uma regra absoluta. Cabe ao desenvolvedor ou arquiteto avaliar quais testes realmente agregam valor à aplicação e quais apenas aumentam a complexidade e o custo de manutenção do código.

Por fim, a aula reforça a importância de **revisar periodicamente a estratégia de testes** e utilizar ferramentas de automação para identificar excessos, redundâncias e inconsistências. Essa prática contribui para manter a base de código sustentável, reduzir o tempo de execução da esteira de integração contínua e garantir que os testes estejam alinhados com os objetivos reais de qualidade e estabilidade do software.
