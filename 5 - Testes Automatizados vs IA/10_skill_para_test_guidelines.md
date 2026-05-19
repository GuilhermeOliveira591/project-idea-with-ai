# Skill para Test Guidelines

Nesta aula, é apresentada uma abordagem estruturada para **planejar, auditar e evoluir testes automatizados** em aplicações de software, utilizando inteligência artificial e boas práticas de engenharia como suporte ao processo de qualidade. O professor demonstra que a criação e manutenção de testes não deve ocorrer de forma aleatória, mas sim baseada em **critérios claros** que orientem decisões sobre quais testes devem existir e quais devem ser removidos.

Inicialmente, é recomendado que o desenvolvedor execute esse processo **manualmente** para compreender os conceitos envolvidos, organizando um plano de testes e interagindo com a inteligência artificial de forma incremental. A ideia é permitir que o profissional entenda o racional por trás das decisões, antes de automatizar o processo por meio de uma *skill* ou comando específico. Com o tempo, essa estrutura pode evoluir para soluções mais previsíveis e reutilizáveis, que podem ser ajustadas conforme o contexto do projeto.

O professor sugere a criação de uma *skill* denominada ***Test Guide***, que atua como um guia para a criação, auditoria e manutenção de testes. Essa *skill* não precisa ser perfeita desde o início, pois deve ser tratada como um **artefato em evolução contínua**. A principal função desse recurso é fornecer uma linha de raciocínio consistente para avaliar a qualidade dos testes existentes e orientar a criação de novos testes com base em critérios claros e estruturados.

Nesse contexto, são apresentados **dois aspectos fundamentais** relacionados aos testes:

- **Auditoria dos testes existentes**: cujo objetivo é identificar se os testes atuais são adequados, se existem testes sem valor prático ou se há lacunas importantes que precisam ser cobertas.
- **Definição de diretrizes para a criação de novos testes**: não do ponto de vista técnico da linguagem ou ferramenta utilizada, mas sim do raciocínio que justifica a existência de cada teste no sistema.

Essa abordagem reforça a importância de compreender **o motivo pelo qual um teste deve existir** e como manter a base de testes ao longo do tempo. Isso inclui remover testes inadequados ou redundantes e adicionar testes que realmente agreguem valor ao projeto. A manutenção contínua dos testes, incluindo refatoração e revisão periódica, é apresentada como parte essencial da qualidade do software e da evolução sustentável do sistema.

O professor também demonstra que esse processo pode ser estruturado de forma automatizada por meio de **agentes, comandos ou *skills* integradas** às ferramentas modernas de desenvolvimento, como editores e plataformas que utilizam inteligência artificial. Essas ferramentas podem executar análises automáticas de testes e apoiar a tomada de decisão, mas ainda dependem de critérios bem definidos e de uma estratégia clara de qualidade de software.

Em seguida, são apresentados critérios práticos para classificar testes em duas categorias: ***Worth Testing*** e ***Not Worth Testing***, ou seja, testes que realmente valem a pena e testes que não agregam valor significativo. Entre os testes considerados importantes estão aqueles relacionados à **lógica de negócio, segurança, integridade de dados, tratamento de erros, fluxos críticos do usuário e cenários de concorrência**, como *race conditions* e *deadlocks*. Esses testes são essenciais porque lidam com situações que podem comprometer o funcionamento do sistema ou gerar impactos relevantes para o usuário.

Por outro lado, são apresentados exemplos de testes que normalmente não justificam esforço adicional, como testar comportamentos já garantidos por *frameworks* ou bibliotecas, validações triviais, utilitários simples ou operações básicas já cobertas por testes de integração. A orientação é **confiar na confiabilidade das ferramentas utilizadas** e concentrar os esforços de teste em áreas que realmente representam risco ou complexidade para o sistema.

Por fim, o professor destaca que a definição desses critérios cria uma **base sólida para decisões mais consistentes** sobre qualidade de software, permitindo que a equipe mantenha uma estratégia de testes eficiente e alinhada aos objetivos do projeto. Essa abordagem reduz desperdício de esforço, aumenta a confiabilidade do sistema e facilita a evolução contínua da base de código ao longo do tempo.
